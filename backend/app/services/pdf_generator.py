from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from io import BytesIO
from datetime import datetime

# ── Brand palette ──────────────────────────────────────────────
PRIMARY     = colors.HexColor("#1E3A5F")   # deep navy
ACCENT      = colors.HexColor("#2E86DE")   # bright blue
LIGHT_BG    = colors.HexColor("#F4F7FB")   # card background
BORDER      = colors.HexColor("#D0D9E8")   # subtle border
MUTED       = colors.HexColor("#7A8A9A")   # secondary text

VERDICT_COLOR = {
    "true":    colors.HexColor("#1DB954"),  # green
    "false":   colors.HexColor("#E63946"),  # red
    "partial": colors.HexColor("#F4A261"),  # orange
}
VERDICT_BG = {
    "true":    colors.HexColor("#EAF9F0"),
    "false":   colors.HexColor("#FDF0F1"),
    "partial": colors.HexColor("#FEF5EC"),
}

def _header_footer(canvas, doc):
    """Draw page number footer on every page."""
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    page_num = f"Page {doc.page}"
    canvas.drawRightString(doc.pagesize[0] - 20*mm, 12*mm, page_num)
    # thin top rule
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(2)
    canvas.line(20*mm, doc.pagesize[1] - 18*mm,
                doc.pagesize[0] - 20*mm, doc.pagesize[1] - 18*mm)
    canvas.restoreState()

def generate_pdf(data):
    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=20*mm, rightMargin=20*mm,
        topMargin=28*mm, bottomMargin=22*mm,
    )

    # ── Styles ─────────────────────────────────────────────────
    title_style = ParagraphStyle(
        "Title",
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=30,
        alignment=1,
        textColor=PRIMARY,
        spaceAfter=4,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle",
        fontName="Helvetica",
        fontSize=9,
        alignment=1,
        textColor=MUTED,
        spaceAfter=2,
    )
    section_label_style = ParagraphStyle(
        "SectionLabel",
        fontName="Helvetica-Bold",
        fontSize=10,
        textColor=MUTED,
        spaceBefore=8,
        spaceAfter=2,
    )
    body_style = ParagraphStyle(
        "Body",
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        textColor=colors.HexColor("#2C2C2C"),
    )
    claim_title_style = ParagraphStyle(
        "ClaimTitle",
        fontName="Helvetica-Bold",
        fontSize=11,
        textColor=PRIMARY,
        spaceAfter=4,
    )
    verdict_style = ParagraphStyle(
        "Verdict",
        fontName="Helvetica-Bold",
        fontSize=13,
        spaceAfter=2,
    )
    meta_style = ParagraphStyle(
        "Meta",
        fontName="Helvetica",
        fontSize=9,
        textColor=MUTED,
        spaceAfter=3,
    )
    explanation_style = ParagraphStyle(
        "Explanation",
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#3A3A3A"),
    )

    content = []

    # ── Header ─────────────────────────────────────────────────
    content.append(Spacer(1, 4*mm))
    content.append(Paragraph("FactForge Report", title_style))
    content.append(Paragraph(
        f"Generated on {datetime.now().strftime('%B %d, %Y at %H:%M')}",
        subtitle_style
    ))
    content.append(Spacer(1, 3*mm))
    content.append(HRFlowable(
        width="100%", thickness=1.5,
        color=ACCENT, spaceAfter=6*mm
    ))

    # ── AI Probability badge ────────────────────────────────────
    ai_prob = data.get("aiProbability", 0)
    prob_color = (colors.HexColor("#E63946") if ai_prob >= 70
                  else colors.HexColor("#F4A261") if ai_prob >= 40
                  else colors.HexColor("#1DB954"))

    badge = Table(
        [[Paragraph(f"<b>AI-Generated Probability</b>", body_style),
          Paragraph(f"<font color='#{prob_color.hexval()[2:]}'><b>{ai_prob}%</b></font>", body_style)]],
        colWidths=["75%", "25%"],
    )
    badge.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, -1), LIGHT_BG),
        ("ROUNDEDCORNERS", [4]),
        ("BOX",         (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING",  (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING",(0,0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING",(0, 0), (-1, -1), 10),
        ("ALIGN",       (1, 0), (1, 0), "RIGHT"),
        ("VALIGN",      (0, 0), (-1, -1), "MIDDLE"),
    ]))
    content.append(badge)
    content.append(Spacer(1, 6*mm))

    # ── Claims ─────────────────────────────────────────────────
    content.append(Paragraph("Claims Analysis", section_label_style))
    content.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=4*mm))

    def get_verdict_color(v):
        return VERDICT_COLOR.get(v.lower(), MUTED)

    def get_verdict_bg(v):
        return VERDICT_BG.get(v.lower(), LIGHT_BG)

    for i, claim in enumerate(data.get("claims", []), start=1):
        verdict = claim.get("verdict", "unknown").lower()
        v_color = get_verdict_color(verdict)
        v_bg    = get_verdict_bg(verdict)

        # Build inner content for the card
        inner = [
            [Paragraph(f"Claim {i}", meta_style),
             Paragraph(f"Confidence: {claim['confidence']}%", meta_style)],
            [Paragraph(claim["claim"], claim_title_style), ""],
            [Paragraph(
                f"<font color='#{v_color.hexval()[2:]}'>"
                f"{verdict.upper()}</font>",
                verdict_style
             ), ""],
            [Paragraph(claim["explanation"], explanation_style), ""],
        ]

        # conflict row
        if claim.get("conflict", {}).get("exists"):
            conflict_txt = Paragraph(
                f"<font color='#E63946'><b>Conflict:</b></font> "
                f"{claim['conflict']['summary']}",
                explanation_style
            )
            inner.append([conflict_txt, ""])

        card = Table(inner, colWidths=["85%", "15%"])
        card.setStyle(TableStyle([
            ("BACKGROUND",   (0, 0), (-1, -1), v_bg),
            ("BOX",          (0, 0), (-1, -1), 0.5, BORDER),
            ("LINEBEFORE",   (0, 0), (0, -1), 4, v_color),   # colored left stripe
            ("TOPPADDING",   (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING",(0, 0), (-1, -1), 6),
            ("LEFTPADDING",  (0, 0), (-1, -1), 12),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("SPAN",         (0, 1), (1, 1)),   # claim text spans full width
            ("SPAN",         (0, 2), (1, 2)),   # verdict spans full width
            ("SPAN",         (0, 3), (1, 3)),   # explanation spans full width
            ("VALIGN",       (0, 0), (-1, -1), "TOP"),
            ("ALIGN",        (1, 0), (1, 0), "RIGHT"),
        ]))

        # add conflict span if needed
        if claim.get("conflict", {}).get("exists"):
            card._tblstyle.add("SPAN", (0, 4), (1, 4))

        content.append(card)
        content.append(Spacer(1, 5*mm))

    doc.build(content, onFirstPage=_header_footer, onLaterPages=_header_footer)
    buffer.seek(0)
    return buffer