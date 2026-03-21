import uvicorn
import os

from flask import Flask, request, send_file
from pdf_generator import generate_pdf
import json

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)


app = Flask(__name__)
@app.route("/generate-pdf", methods=["POST"])
def generate_pdf_route():
    data = request.json

    file_path = generate_pdf(data)

    return send_file(file_path, as_attachment=True)