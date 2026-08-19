import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY", "")

# Start with 1,000. Raise later after checking API_USAGE in the Excel output.
MAX_RESULTS = int(os.getenv("MAX_RESULTS", "1000"))
SEARCH_PAGE_SIZE = int(os.getenv("SEARCH_PAGE_SIZE", "20"))
SEARCH_MAX_PAGES = int(os.getenv("SEARCH_MAX_PAGES", "3"))

CRAWL_TIMEOUT = int(os.getenv("CRAWL_TIMEOUT", "12"))
CRAWL_WORKERS = int(os.getenv("CRAWL_WORKERS", "12"))
MAX_PAGES_PER_SITE = int(os.getenv("MAX_PAGES_PER_SITE", "4"))

SEARCH_QUERIES = [
    "restaurant",
    "Italian restaurant",
    "trattoria",
    "osteria",
    "pizzeria",
    "Roman restaurant",
    "seafood restaurant",
    "fine dining restaurant",
]

# Initial grid covering central and urban Rome. It intentionally overlaps:
# duplicates are removed by Place ID. Expand later if we need wider coverage.
ROME_GRID = [
    (41.9028, 12.4964, 2500),
    (41.8955, 12.4820, 2200),
    (41.9100, 12.4760, 2200),
    (41.9100, 12.5150, 2200),
    (41.8950, 12.5150, 2200),
    (41.8850, 12.4900, 2200),
    (41.8850, 12.5200, 2200),
    (41.9200, 12.5000, 2200),
    (41.9200, 12.5350, 2200),
    (41.8750, 12.5150, 2200),
]

# Cost-optimized discovery pass. Google documents these as Text Search
# Essentials (IDs Only) fields.
SEARCH_FIELD_MASK = "places.id,nextPageToken"

# We still need Enterprise-level fields such as rating/userRatingCount/websiteUri
# for lead qualification, so the details pass retrieves them only once per unique
# Place ID rather than during every overlapping search.
DETAIL_FIELD_MASK = ",".join([
    "id",
    "displayName",
    "formattedAddress",
    "googleMapsUri",
    "location",
    "primaryType",
    "types",
    "businessStatus",
    "nationalPhoneNumber",
    "internationalPhoneNumber",
    "rating",
    "userRatingCount",
    "websiteUri",
    "priceLevel",
    "regularOpeningHours",
])

SCORING = {
    "reviews": [(2000, 15), (1000, 12), (500, 9), (200, 5), (0, 2)],
    "rating": [(4.6, 15), (4.3, 12), (4.0, 8), (0, 3)],
    "no_website": 50,
    "broken_website": 45,
    "no_mobile": 15,
    "no_english": 8,
    "no_booking": 10,
    "pdf_menu_only": 8,
    "no_whatsapp": 4,
    "no_maps": 3,
    "slow_site": 8,
    "old_design": 15,
    "tourist_area": 10,
    "restaurant_type": 5,
    "fine_dining": 8,
    "good_site_penalty": 20,
    "good_booking_penalty": 15,
}

TOURIST_AREAS = [
    "trastevere", "centro storico", "monti", "prati",
    "vaticano", "testaccio", "campo de' fiori", "navona",
    "trevi", "pantheon", "colosseo", "colosseum", "ostiense"
]
