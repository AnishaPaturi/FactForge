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

    # Styles
    title_style = ParagraphStyle(
        "Title", fontName="Helvetica-Bold", fontSize=24,
        alignment=1, textColor=PRIMARY, spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        "Subtitle", fontSize=9, alignment=1, textColor=MUTED, spaceAfter=10
    )

    claim_style = ParagraphStyle(
        "Claim", fontName="Helvetica-Bold", fontSize=11,
        textColor=PRIMARY, spaceAfter=6
    )

    verdict_style = ParagraphStyle(
        "Verdict", fontName="Helvetica-Bold", fontSize=12, spaceAfter=6
    )

    explanation_style = ParagraphStyle(
        "Explanation", fontSize=10, leading=15, spaceAfter=6
    )

    section_style = ParagraphStyle(
        "Section", fontName="Helvetica-Bold", fontSize=11,
        textColor=MUTED, spaceAfter=6
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

    # 🔥 AI Probability (RESTORED)
    ai_prob = data.get("aiProbability", 0)

    ai_table = Table(
        [[
            Paragraph("<b>AI-Generated Probability</b>", explanation_style),
            Paragraph(f"<b>{ai_prob}%</b>", explanation_style)
        ]],
        colWidths=["75%", "25%"]
    )

    ai_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
    ]))

    content.append(ai_table)
    content.append(Spacer(1, 12))

    # Section title
    content.append(Paragraph("Claims Analysis", section_style))
    content.append(HRFlowable(width="100%", thickness=0.5, color=BORDER))
    content.append(Spacer(1, 8))

    # Claims
    for i, claim in enumerate(data.get("claims", []), start=1):
        verdict = claim.get("verdict", "unknown").lower()
        v_color = VERDICT_COLOR.get(verdict, MUTED)
        v_bg = VERDICT_BG.get(verdict, LIGHT_BG)

        # Progress bar (background + fill)
        total_width = 400
        filled_width = int((claim["confidence"] / 100) * total_width)

        bar = Table([["", ""]], colWidths=[filled_width, total_width - filled_width], rowHeights=[6])
        bar.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (0, 0), v_color),
            ("BACKGROUND", (1, 0), (1, 0), colors.lightgrey),
        ]))

        # Bullet explanation
        explanation = claim.get("explanation", "")
        points = explanation.split(". ")

        bullet_text = "<br/>".join([
            f"• {p.strip()}" for p in points if p.strip()
        ])

        inner = [
            [Paragraph(f"Claim {i}", explanation_style), ""],
            [Paragraph(claim.get("claim", ""), claim_style), ""],
            [Paragraph(
                f"<font color='#{v_color.hexval()[2:]}'><b>{verdict.upper()}</b></font> "
                f"<b>• {claim['confidence']}%</b>",
                verdict_style
            ), ""],
            [bar, ""],
            [Paragraph(bullet_text, explanation_style), ""]
        ]

        card = Table(inner, colWidths=["100%", "0%"])
        card.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), v_bg),
            ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
            ("LINEBEFORE", (0, 0), (0, -1), 4, v_color),  # 🔥 left color strip
            ("LEFTPADDING", (0, 0), (-1, -1), 12),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ]))

        content.append(card)
        content.append(Spacer(1, 12))

    doc.build(content, onFirstPage=_header_footer, onLaterPages=_header_footer)

    buffer.seek(0)
    return buffer