from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from io import BytesIO
from datetime import datetime
import pytz

PRIMARY = colors.HexColor("#1E3A5F")
ACCENT = colors.HexColor("#2E86DE")
LIGHT_BG = colors.HexColor("#F4F7FB")
BORDER = colors.HexColor("#D0D9E8")
MUTED = colors.HexColor("#7A8A9A")

VERDICT_COLOR = {
    "true": colors.HexColor("#1DB954"),
    "false": colors.HexColor("#E63946"),
    "partial": colors.HexColor("#F4A261"),
}
VERDICT_BG = {
    "true": colors.HexColor("#EAF9F0"),
    "false": colors.HexColor("#FDF0F1"),
    "partial": colors.HexColor("#FEF5EC"),
}

def _header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(doc.pagesize[0] - 20*mm, 12*mm, f"Page {doc.page}")
    canvas.restoreState()

def generate_pdf(data):
    buffer = BytesIO()
    ist = pytz.timezone("Asia/Kolkata")
    current_time = datetime.now(pytz.utc).astimezone(ist)

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=20*mm, rightMargin=20*mm,
        topMargin=28*mm, bottomMargin=22*mm,
    )

    title_style = ParagraphStyle(
        "Title", fontName="Helvetica-Bold", fontSize=24,
        alignment=1, textColor=PRIMARY
    )

    subtitle_style = ParagraphStyle(
        "Subtitle", fontSize=9, alignment=1, textColor=MUTED
    )

    body_style = ParagraphStyle(
        "Body", fontSize=10, textColor=colors.black
    )

    claim_style = ParagraphStyle(
        "Claim", fontName="Helvetica-Bold", fontSize=11,
        textColor=PRIMARY
    )

    verdict_style = ParagraphStyle(
        "Verdict", fontName="Helvetica-Bold", fontSize=12
    )

    explanation_style = ParagraphStyle(
        "Explanation", fontSize=10, leading=14
    )

    content = []

    # Header
    content.append(Paragraph("FactForge Report", title_style))
    content.append(Paragraph(
        f"Generated on {current_time.strftime('%B %d, %Y')}",
        subtitle_style
    ))
    content.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT))
    content.append(Spacer(1, 10))

    # Claims
    for i, claim in enumerate(data.get("claims", []), start=1):
        verdict = claim.get("verdict", "unknown").lower()
        v_color = VERDICT_COLOR.get(verdict, MUTED)
        v_bg = VERDICT_BG.get(verdict, LIGHT_BG)

        inner = []

        # Claim title
        inner.append([Paragraph(f"Claim {i}", body_style), ""])

        # Claim text
        inner.append([Paragraph(claim.get("claim", ""), claim_style), ""])

        # Verdict + Confidence
        inner.append([
            Paragraph(
                f"<font color='#{v_color.hexval()[2:]}'><b>{verdict.upper()}</b></font> "
                f"<b>• {claim['confidence']}%</b>",
                verdict_style
            ),
            ""
        ])

        # Confidence bar
        bar_width = int((claim["confidence"] / 100) * 300)

        bar = Table([[""]], colWidths=[bar_width], rowHeights=[6])
        bar.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), v_color),
        ]))

        inner.append([bar, ""])

        # Bullet explanation
        explanation = claim.get("explanation", "")
        points = explanation.split(". ")

        bullet_text = "<br/>".join([
            f"• {p.strip()}" for p in points if p.strip()
        ])

        inner.append([
            Paragraph(bullet_text, explanation_style),
            ""
        ])

        card = Table(inner, colWidths=["100%", "0%"])
        card.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), v_bg),
            ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]))

        content.append(card)
        content.append(Spacer(1, 10))

    doc.build(content, onFirstPage=_header_footer, onLaterPages=_header_footer)

    buffer.seek(0)
    return buffer