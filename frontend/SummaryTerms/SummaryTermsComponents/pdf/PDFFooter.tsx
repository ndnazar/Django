
import jsPDF from 'jspdf';

export class PDFFooter {
  static render(pdf: jsPDF, pageWidth: number, pageHeight: number, margin: number): void {
    // Footer
    const footerY = pageHeight - 15;
    pdf.setDrawColor(191, 219, 254);
    pdf.setLineWidth(0.5);
    pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(107, 114, 128);
    pdf.text('This document was generated automatically.', margin, footerY);
    pdf.text(`Page 1 of ${pdf.getNumberOfPages()}`, pageWidth - margin - 30, footerY);
  }
}