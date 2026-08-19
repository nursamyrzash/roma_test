import re
import time
from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from bs4 import BeautifulSoup
import tldextract

from config import CRAWL_TIMEOUT, CRAWL_WORKERS, MAX_PAGES_PER_SITE
from api_usage import USAGE

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; RestaurantLeadAudit/1.0)"
}

BOOKING_WORDS = [
    "book a table", "book now", "reservation", "reservations",
    "prenota", "prenotazione", "prenotazioni", "reserve", "booking"
]
MENU_WORDS = ["menu", "menù", "carta", "food"]
WHATSAPP_RE = re.compile(r"(wa\.me/|whatsapp\.com/)", re.I)
INSTAGRAM_RE = re.compile(r"instagram\.com/", re.I)
MAPS_RE = re.compile(r"(google\.[^/]+/maps|maps\.google\.)", re.I)
ENGLISH_WORDS = ["home", "about", "contact", "menu", "book", "reservation"]


def clean_url(url):
    if not url:
        return ""
    url = url.strip()
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    return url


def same_domain(a, b):
    ea = tldextract.extract(a)
    eb = tldextract.extract(b)
    return (ea.domain, ea.suffix) == (eb.domain, eb.suffix)


def audit_site(url):
    result = {
        "website_exists": bool(url),
        "website_status": "",
        "https": False,
        "mobile_ready": False,
        "response_time_ms": None,
        "english_version": False,
        "menu_online": False,
        "menu_pdf_only": False,
        "online_booking": False,
        "whatsapp": False,
        "google_maps_on_site": False,
        "instagram": False,
        "site_title": "",
        "pages_checked": 0,
        "site_error": "",
    }
    if not url:
        return result

    url = clean_url(url)
    session = requests.Session()
    session.headers.update(HEADERS)
    queue = [url]
    seen = set()

    try:
        while queue and len(seen) < MAX_PAGES_PER_SITE:
            current = queue.pop(0)
            if current in seen:
                continue
            seen.add(current)

            started = time.perf_counter()
            r = session.get(current, timeout=CRAWL_TIMEOUT, allow_redirects=True)
            elapsed = (time.perf_counter() - started) * 1000

            if result["pages_checked"] == 0:
                result["website_status"] = str(r.status_code)
                result["https"] = r.url.lower().startswith("https://")
                result["response_time_ms"] = round(elapsed)
                if r.status_code >= 400:
                    result["site_error"] = f"HTTP {r.status_code}"
                    return result

            result["pages_checked"] += 1

            if "text/html" not in r.headers.get("content-type", "").lower():
                continue

            soup = BeautifulSoup(r.text, "html.parser")
            if not result["site_title"] and soup.title:
                result["site_title"] = soup.title.get_text(" ", strip=True)

            text = soup.get_text(" ", strip=True).lower()
            html = r.text.lower()

            if any(w in text for w in ENGLISH_WORDS):
                result["english_version"] = True
            if any(w in text for w in MENU_WORDS):
                result["menu_online"] = True
            if any(w in text for w in BOOKING_WORDS):
                result["online_booking"] = True
            if WHATSAPP_RE.search(html):
                result["whatsapp"] = True
            if INSTAGRAM_RE.search(html):
                result["instagram"] = True
            if MAPS_RE.search(html):
                result["google_maps_on_site"] = True

            viewport = soup.find("meta", attrs={"name": re.compile("^viewport$", re.I)})
            if viewport:
                result["mobile_ready"] = True

            pdf_links = [
                a.get("href", "") for a in soup.find_all("a", href=True)
                if ".pdf" in a.get("href", "").lower()
            ]
            if pdf_links and ("menu" in text or "menù" in text):
                result["menu_pdf_only"] = True

            for a in soup.find_all("a", href=True):
                href = urljoin(r.url, a["href"])
                label = a.get_text(" ", strip=True).lower()
                haystack = href.lower() + " " + label
                if same_domain(href, r.url) and any(w in haystack for w in MENU_WORDS + BOOKING_WORDS):
                    if href not in seen:
                        queue.append(href)

            if result["online_booking"] and result["menu_online"]:
                break

    except requests.RequestException as e:
        result["site_error"] = str(e)[:250]

    return result


def audit_many(rows):
    indexed = {i: dict(row) for i, row in enumerate(rows)}
    with ThreadPoolExecutor(max_workers=CRAWL_WORKERS) as ex:
        futures = {
            ex.submit(audit_site, row.get("website_url", "")): i
            for i, row in indexed.items()
        }
        for n, fut in enumerate(as_completed(futures), 1):
            i = futures[fut]
            try:
                indexed[i].update(fut.result())
            except Exception as e:
                indexed[i]["site_error"] = str(e)[:250]
            if n % 25 == 0:
                print(f"Audited {n}/{len(rows)} websites")
    return [indexed[i] for i in sorted(indexed)]
