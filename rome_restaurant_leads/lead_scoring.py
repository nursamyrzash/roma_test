from config import SCORING, TOURIST_AREAS


def first_matching_score(value, brackets):
    value = value or 0
    for threshold, score in brackets:
        if value >= threshold:
            return score
    return 0


def contains_tourist_area(address):
    a = (address or "").lower()
    return any(x in a for x in TOURIST_AREAS)


def score_lead(row):
    score = 0
    reasons = []

    score += first_matching_score(row.get("review_count"), SCORING["reviews"])
    score += first_matching_score(row.get("rating"), SCORING["rating"])

    if not row.get("website_url"):
        score += SCORING["no_website"]
        reasons.append("no website")
    else:
        status = str(row.get("website_status", ""))
        if status.startswith(("4", "5")):
            score += SCORING["broken_website"]
            reasons.append("website unavailable")
        if not row.get("https"):
            score += 5
            reasons.append("no HTTPS")
        if not row.get("mobile_ready"):
            score += SCORING["no_mobile"]
            reasons.append("not mobile-ready")
        if not row.get("english_version"):
            score += SCORING["no_english"]
            reasons.append("no obvious English content")
        if not row.get("online_booking"):
            score += SCORING["no_booking"]
            reasons.append("no booking detected")
        if row.get("menu_pdf_only") and not row.get("menu_online"):
            score += SCORING["pdf_menu_only"]
            reasons.append("PDF menu")
        if not row.get("whatsapp"):
            score += SCORING["no_whatsapp"]
        if not row.get("google_maps_on_site"):
            score += SCORING["no_maps"]
        if row.get("response_time_ms") and row["response_time_ms"] > 2500:
            score += SCORING["slow_site"]
            reasons.append("slow response")

        if (
            row.get("mobile_ready")
            and row.get("online_booking")
            and row.get("english_version")
            and row.get("menu_online")
        ):
            score -= SCORING["good_site_penalty"]

    if contains_tourist_area(row.get("address")):
        score += SCORING["tourist_area"]
        reasons.append("tourist-heavy area")

    primary = (row.get("primary_type") or "").lower()
    if "fine_dining" in primary:
        score += SCORING["fine_dining"]
    elif "restaurant" in primary or "italian" in primary or "pizza" in primary:
        score += SCORING["restaurant_type"]

    score = max(0, min(100, round(score)))

    if score >= 80:
        priority = "HOT"
    elif score >= 60:
        priority = "WARM"
    elif score >= 40:
        priority = "MEDIUM"
    else:
        priority = "LOW"

    row["lead_score"] = score
    row["lead_priority"] = priority
    row["reason"] = "; ".join(dict.fromkeys(reasons))
    return row


def score_all(rows):
    return [score_lead(r) for r in rows]
