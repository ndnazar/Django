import fitz  # PyMuPDF
import openai

# Set your OpenAI API key
openai.api_key = 'your_openai_api_key'

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    doc = fitz.open(pdf_path)
    text = ""
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text()
    return text

def summarize_text(text, max_tokens=150):
    """Summarize text using OpenAI's GPT model."""
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Summarize the following text:\n\n{text}",
        max_tokens=max_tokens,
        n=1,
        stop=None,
        temperature=0.5,
    )
    summary = response.choices[0].text.strip()
    return summary

def summarize_pdf(pdf_path):
    """Extract text from a PDF and summarize it."""
    text = extract_text_from_pdf(pdf_path)
    summary = summarize_text(text)
    return summary

# Example usage
if __name__ == "__main__":
    pdf_path = 'path_to_your_pdf_file.pdf'
    summary = summarize_pdf(pdf_path)
    print(summary)