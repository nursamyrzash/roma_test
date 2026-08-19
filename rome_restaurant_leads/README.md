# Rome Restaurant Leads v2

Pipeline:

**Google Places IDs-only discovery -> pagination -> Place ID deduplication -> Place Details -> website audit -> lead scoring -> Excel + API usage report**

## Why v2 is cheaper and broader

The discovery pass requests only:

```text
places.id,nextPageToken
```

Google documents these as Text Search Essentials (IDs Only) fields. The code then calls Place Details once for each **unique** Place ID, so overlapping grid/query searches do not repeatedly request the expensive restaurant fields.

Each Text Search page contains up to 20 results. `SEARCH_MAX_PAGES=3` lets one grid/query combination collect up to 60 results when Google supplies page tokens.

## Install

Python 3.10+ recommended.

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```

## Configure

```bash
cp .env.example .env
```

Then put your key in `.env`:

```text
GOOGLE_MAPS_API_KEY=...
```

Recommended first v2 run:

```text
MAX_RESULTS=1000
SEARCH_PAGE_SIZE=20
SEARCH_MAX_PAGES=3
```

## Run

```bash
python3 main.py
```

## Output

```text
data/output/rome_restaurant_leads.xlsx
data/output/api_usage.json
```

Excel sheets:

- `ALL_RESTAURANTS`
- `HOT_LEADS`
- `WARM_LEADS`
- `SITE_AUDIT`
- `API_USAGE`
- `CONFIG`

## API_USAGE

The program records:

- Text Search API calls
- Place Details API calls
- total Google API calls
- raw places returned
- unique places found
- duplicates removed
- Google calls per unique place
- Google API errors
- number of website audits

The website crawler does **not** call Google APIs.

## Scale only after checking usage

Start at 1,000 restaurants. Check the `API_USAGE` sheet, then increase `MAX_RESULTS` to 2,500 or 5,000 and/or expand `ROME_GRID`.

Do not assume the current grid is a mathematically complete census of every restaurant in Rome. Search ranking, overlapping cells, query vocabulary, and Google result availability all affect coverage.

## Google billing note

Billing is based on the highest SKU represented by the requested FieldMask. The search step is deliberately IDs-only. The details step includes rating, user rating count, website URI and phone/opening fields because they matter for lead qualification. Review current Google Maps Platform pricing before very large runs.
