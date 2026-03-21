from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO

def generate_pdf(data):
    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)
    styles = getSampleStyleSheet()
    content = []

    content.append(Paragraph("FactForge Report", styles["Title"]))
    content.append(Spacer(1, 10))

    ai_prob = data.get("aiProbability", 0)
    content.append(Paragraph(f"AI Probability: {ai_prob}%", styles["Normal"]))
    content.append(Spacer(1, 10))

    for i, claim in enumerate(data.get("claims", []), start=1):
        content.append(Paragraph(f"<b>Claim {i}:</b> {claim['claim']}", styles["Normal"]))
        content.append(Paragraph(f"<b>Verdict:</b> {claim['verdict']}", styles["Normal"]))
        content.append(Paragraph(f"<b>Confidence:</b> {claim['confidence']}%", styles["Normal"]))
        content.append(Paragraph(f"<b>Explanation:</b> {claim['explanation']}", styles["Normal"]))
        content.append(Spacer(1, 10))

    doc.build(content)
    buffer.seek(0)

    return buffer