import json
from pathlib import Path
from config import ROME_GRID, SEARCH_QUERIES, MAX_RESULTS
from google_places import collect_place_ids, enrich_places
from api_usage import USAGE

RAW = Path("data/raw")


def normalize(place):
    name = (place.get("displayName") or {}).get("text", "")
    loc = place.get("location") or {}
    return {
        "place_id": place.get("id"),
        "restaurant_name": name,
        "address": place.get("formattedAddress", ""),
        "google_maps_url": place.get("googleMapsUri", ""),
        "latitude": loc.get("latitude"),
        "longitude": loc.get("longitude"),
        "primary_type": place.get("primaryType", ""),
        "types": ", ".join(place.get("types", [])),
        "business_status": place.get("businessStatus", ""),
        "phone": place.get("internationalPhoneNumber") or place.get("nationalPhoneNumber", ""),
        "rating": place.get("rating"),
        "review_count": place.get("userRatingCount"),
        "website_url": place.get("websiteUri", ""),
        "price_level": place.get("priceLevel", ""),
        "hours": json.dumps(place.get("regularOpeningHours", {}), ensure_ascii=False),
    }


def main():
    RAW.mkdir(parents=True, exist_ok=True)
    print("Collecting Google Places IDs (IDs-only search + pagination)...")
    summaries = collect_place_ids(ROME_GRID, SEARCH_QUERIES, MAX_RESULTS)
    print(
        f"Unique places found: {len(summaries)} | "
        f"raw returned: {USAGE.raw_places_returned} | "
        f"duplicates removed: {USAGE.duplicate_places_removed} | "
        f"Text Search calls: {USAGE.text_search_calls}"
    )

    print("Enriching unique places with Place Details...")
    details = enrich_places(summaries)
    rows = [normalize(p) for p in details]

    out = RAW / "restaurants_google.json"
    out.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved {out}")
    return rows


if __name__ == "__main__":
    main()
