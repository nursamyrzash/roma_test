from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
import json


@dataclass
class ApiUsage:
    run_started_at: str = ""
    run_finished_at: str = ""
    text_search_calls: int = 0
    text_search_pages: int = 0
    place_details_calls: int = 0
    google_api_errors: int = 0
    raw_places_returned: int = 0
    unique_places_found: int = 0
    duplicate_places_removed: int = 0
    websites_checked: int = 0
    websites_with_url: int = 0
    websites_without_url: int = 0

    def start(self):
        self.run_started_at = datetime.now(timezone.utc).isoformat()

    def finish(self):
        self.run_finished_at = datetime.now(timezone.utc).isoformat()

    @property
    def total_google_calls(self):
        return self.text_search_calls + self.place_details_calls

    @property
    def google_calls_per_unique_place(self):
        if not self.unique_places_found:
            return 0.0
        return round(self.total_google_calls / self.unique_places_found, 3)

    def as_dict(self):
        data = asdict(self)
        data["total_google_calls"] = self.total_google_calls
        data["google_calls_per_unique_place"] = self.google_calls_per_unique_place
        return data

    def save_json(self, path="data/output/api_usage.json"):
        p = Path(path)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(json.dumps(self.as_dict(), indent=2, ensure_ascii=False), encoding="utf-8")
        return p


USAGE = ApiUsage()
