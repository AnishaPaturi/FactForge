from app.services.search_service import search_claim

def test_search_returns_results():
    claim = "The capital of Australia is Canberra"

    results = search_claim(claim)

    assert isinstance(results, list)
    assert len(results) > 0

    for r in results:
        assert "url" in r
        assert "title" in r
        assert "snippet" in r

def test_no_bad_sources():
    claim = "The Earth is flat"

    results = search_claim(claim)

    bad_domains = ["reddit.com", "facebook.com", "youtube.com"]

    for r in results:
        assert not any(domain in r["url"] for domain in bad_domains)