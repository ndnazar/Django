
import * as jsPDF from 'jspdf';

export class PDFMetadata {
  static render(pdf: jsPDF, formTitle: string, pageWidth: number, pageHeight: number, margin: number, yPosition: number): number {
    // Date and document info with light background
    pdf.setFillColor(239, 246, 255); // Light blue background
    pdf.rect(margin, yPosition - 8, pageWidth - 2 * margin, 16, 'F');

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(30, 64, 175); // Blue-800 text
    pdf.text(`Generated: ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, margin + 5, yPosition);
    pdf.text(`Document: ${formTitle}`, pageWidth - margin - 80, yPosition);

    return yPosition + 25; // Return new Y position
  }
}