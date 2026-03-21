from urllib.parse import urlparse
from datetime import datetime


class CredibilityService:

    # 🔥 Trusted sources with strong scores
    TRUSTED_SOURCES = {
        "who.int": 10,
        "reuters.com": 9.5,
        "bbc.com": 9,
        "nytimes.com": 9,
        "nature.com": 9.5,
        "sciencedirect.com": 9
    }

    @staticmethod
    def get_domain_score(url: str) -> float:
        domain = urlparse(url).netloc.replace("www.", "")

        # ✅ Check trusted sources first
        for trusted in CredibilityService.TRUSTED_SOURCES:
            if trusted in domain:
                return CredibilityService.TRUSTED_SOURCES[trusted]

        # ✅ General rules
        if ".gov" in domain:
            return 9.5
        elif ".edu" in domain:
            return 9
        elif "news" in domain:
            return 7.5
        else:
            return 5.5  # better baseline (not too harsh)

    @staticmethod
    def get_recency_score(published_date: datetime) -> float:
        if not published_date:
            return 6  # slightly better default

        days_old = (datetime.utcnow() - published_date).days

        if days_old < 1:
            return 10
        elif days_old < 7:
            return 9
        elif days_old < 30:
            return 8
        elif days_old < 180:
            return 6.5
        else:
            return 5

    @staticmethod
    def get_agreement_score(claim, sources: list) -> float:
        count = len(sources)

        if count >= 5:
            return 9
        elif count >= 3:
            return 7.5
        elif count >= 2:
            return 6.5
        else:
            return 5.5

    @staticmethod
    def score_source(url, published_date, claim, sources) -> float:
        domain_score = CredibilityService.get_domain_score(url)
        recency_score = CredibilityService.get_recency_score(published_date)
        agreement_score = CredibilityService.get_agreement_score(claim, sources)

        final_score = (domain_score + recency_score + agreement_score) / 3

        return round(final_score, 2)