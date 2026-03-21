from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(data, filename="fact_report.pdf"):
    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()
    content = []

    # Title
    content.append(Paragraph("FactForge Report", styles["Title"]))
    content.append(Spacer(1, 10))

    # AI Detection
    ai_prob = data.get("ai_detection", {}).get("ai_probability", 0)
    content.append(Paragraph(f"AI Probability: {ai_prob}%", styles["Normal"]))
    content.append(Spacer(1, 10))

    # Claims
    for i, claim in enumerate(data.get("claims", []), start=1):
        content.append(Paragraph(f"<b>Claim {i}:</b> {claim['claim']}", styles["Normal"]))
        content.append(Paragraph(f"<b>Verdict:</b> {claim['verdict']}", styles["Normal"]))
        content.append(Paragraph(f"<b>Confidence:</b> {claim['confidence']}%", styles["Normal"]))
        content.append(Paragraph(f"<b>Explanation:</b> {claim['explanation']}", styles["Normal"]))

        content.append(Paragraph("<b>Sources:</b>", styles["Normal"]))
        for src in claim.get("sources", []):
            content.append(Paragraph(f"- {src['label']} ({src['url']})", styles["Normal"]))

        content.append(Spacer(1, 15))

    doc.build(content)
    return filename