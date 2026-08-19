import time
import requests
from config import (
    GOOGLE_MAPS_API_KEY,
    SEARCH_FIELD_MASK,
    DETAIL_FIELD_MASK,
    SEARCH_PAGE_SIZE,
    SEARCH_MAX_PAGES,
)
from api_usage import USAGE

BASE_URL = "https://places.googleapis.com/v1"


def _headers(field_mask):
    if not GOOGLE_MAPS_API_KEY:
        raise RuntimeError(
            "GOOGLE_MAPS_API_KEY is missing. Copy .env.example to .env and add your key."
        )
    return {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": field_mask,
    }


def _rectangle(lat, lng, radius_meters):
    # Approximate radius -> bounding box around Rome.
    lat_delta = radius_meters / 111_000
    lng_delta = radius_meters / (111_000 * 0.75)
    return {
        "low": {
            "latitude": lat - lat_delta,
            "longitude": lng - lng_delta,
        },
        "high": {
            "latitude": lat + lat_delta,
            "longitude": lng + lng_delta,
        },
    }


def text_search_pages(query, lat, lng, radius_meters, max_pages=None):
    """Return up to SEARCH_MAX_PAGES pages for one query/grid cell.

    Discovery intentionally asks Google only for Place IDs + nextPageToken.
    This keeps overlapping search requests inexpensive and deduplicates before
    the more detailed Place Details pass.
    """
    max_pages = max_pages or SEARCH_MAX_PAGES
    url = f"{BASE_URL}/places:searchText"

    base_body = {
        "textQuery": query,
        "pageSize": min(max(SEARCH_PAGE_SIZE, 1), 20),
        "locationRestriction": {
            "rectangle": _rectangle(lat, lng, radius_meters)
        },
    }

    token = None
    for page_no in range(1, max_pages + 1):
        body = dict(base_body)
        if token:
            body["pageToken"] = token

        USAGE.text_search_calls += 1
        r = requests.post(
            url,
            json=body,
            headers=_headers(SEARCH_FIELD_MASK),
            timeout=30,
        )

        if not r.ok:
            USAGE.google_api_errors += 1
            print("Google Places Text Search error:")
            print("Status:", r.status_code)
            print(r.text)
        r.raise_for_status()

        payload = r.json()
        USAGE.text_search_pages += 1
        places = payload.get("places", [])
        USAGE.raw_places_returned += len(places)

        yield places

        token = payload.get("nextPageToken")
        if not token:
            break

        # Small delay is polite and avoids hammering the endpoint while paging.
        time.sleep(0.12)


def place_details(place_id):
    url = f"{BASE_URL}/places/{place_id}"
    USAGE.place_details_calls += 1
    r = requests.get(url, headers=_headers(DETAIL_FIELD_MASK), timeout=30)
    if not r.ok:
        USAGE.google_api_errors += 1
        print(f"Google Place Details error for {place_id}:")
        print("Status:", r.status_code)
        print(r.text)
    r.raise_for_status()
    return r.json()


def collect_place_ids(grid, queries, max_results):
    found = {}

    for grid_no, (lat, lng, radius) in enumerate(grid, 1):
        for query_no, query in enumerate(queries, 1):
            for places in text_search_pages(query, lat, lng, radius):
                for p in places:
                    pid = p.get("id")
                    if not pid:
                        continue
                    found.setdefault(pid, p)

                    if len(found) >= max_results:
                        USAGE.unique_places_found = len(found)
                        USAGE.duplicate_places_removed = max(
                            0, USAGE.raw_places_returned - len(found)
                        )
                        print(
                            f"Reached MAX_RESULTS={max_results} "
                            f"at grid {grid_no}/{len(grid)}, query {query_no}/{len(queries)}."
                        )
                        return list(found.values())

            print(
                f"Discovery: grid {grid_no}/{len(grid)} | "
                f"query {query_no}/{len(queries)} | unique={len(found)} | "
                f"raw={USAGE.raw_places_returned} | search_calls={USAGE.text_search_calls}"
            )
            time.sleep(0.08)

    USAGE.unique_places_found = len(found)
    USAGE.duplicate_places_removed = max(0, USAGE.raw_places_returned - len(found))
    return list(found.values())


def enrich_places(place_summaries):
    results = []
    for i, p in enumerate(place_summaries, 1):
        pid = p["id"]
        try:
            results.append(place_details(pid))
        except requests.HTTPError as e:
            print(f"[WARN] Details failed for {pid}: {e}")
            results.append(p)
        if i % 25 == 0 or i == len(place_summaries):
            print(
                f"Enriched {i}/{len(place_summaries)} | "
                f"Google calls total={USAGE.total_google_calls}"
            )
        time.sleep(0.05)
    return results
