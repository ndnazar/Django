
import jsPDF from 'jspdf';

export class PDFHeader {
  static render(pdf: jsPDF, formTitle: string, pageWidth: number, margin: number): number {
    // Add header background - darker blue
    pdf.setFillColor(29, 78, 216); // Blue-700
    pdf.rect(0, 0, pageWidth, 40, 'F');

    // Title
    pdf.setTextColor(255, 255, 255); // White text
    pdf.setFontSize(22);
    pdf.setFont(undefined, 'bold');
    pdf.text(formTitle || 'Term Sheet', margin, 28);

    // Reset text color for body
    pdf.setTextColor(0, 0, 0);

    return 55; // Return new Y position
  }
}