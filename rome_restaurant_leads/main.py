import json
from pathlib import Path
from search_rome import main as collect_google
from website_checker import audit_many
from lead_scoring import score_all
from export_excel import export_excel
from api_usage import USAGE

RAW = Path("data/raw")
INPUT = RAW / "restaurants_google.json"


def run():
    USAGE.start()

    # Always collect fresh Google data for a normal run so API_USAGE reflects
    # the current run. If you want crawler-only reruns later, we can add a flag.
    rows = collect_google()

    print(f"Loaded {len(rows)} restaurants.")
    print("Auditing websites...")
    rows = audit_many(rows)

    print("Scoring leads...")
    rows = score_all(rows)

    out_json = RAW / "restaurants_scored.json"
    out_json.write_text(
        json.dumps(rows, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    USAGE.finish()
    usage_path = USAGE.save_json()
    excel = export_excel(rows, USAGE)

    print("\n=== API USAGE SUMMARY ===")
    print(f"Text Search calls:       {USAGE.text_search_calls}")
    print(f"Place Details calls:     {USAGE.place_details_calls}")
    print(f"Total Google API calls:  {USAGE.total_google_calls}")
    print(f"Raw places returned:     {USAGE.raw_places_returned}")
    print(f"Unique places:           {USAGE.unique_places_found}")
    print(f"Duplicates removed:      {USAGE.duplicate_places_removed}")
    print(f"Calls / unique place:    {USAGE.google_calls_per_unique_place}")
    print(f"Google API errors:       {USAGE.google_api_errors}")
    print(f"Usage JSON:              {usage_path}")
    print(f"Excel:                   {excel}")


if __name__ == "__main__":
    run()
