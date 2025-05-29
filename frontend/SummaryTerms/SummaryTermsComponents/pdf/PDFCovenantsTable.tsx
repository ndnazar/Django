
import jsPDF from 'jspdf';

export class PDFCovenantsTable {
  static render(pdf: jsPDF, covenants: any[], pageWidth: number, pageHeight: number, margin: number, yPosition: number): number {
    yPosition += 10;

    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = margin;
    }

    // Covenants section header
    pdf.setFillColor(191, 219, 254);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'F');
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(30, 64, 175);
    pdf.text('Financial Covenants', margin + 5, yPosition + 10);
    yPosition += 20;

    // Covenants table headers
    pdf.setFillColor(239, 246, 255);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 12, 'F');
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(30, 64, 175);
    pdf.text('Covenant Type', margin + 5, yPosition + 8);
    pdf.text('Threshold', margin + 90, yPosition + 8);
    pdf.text('Testing Frequency', margin + 130, yPosition + 8);
    yPosition += 15;

    // Covenants data
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(31, 41, 55);
    covenants.forEach((covenant: any, index: number) => {
      if (index % 2 === 0) {
        pdf.setFillColor(248, 250, 252);
        pdf.rect(margin, yPosition - 2, pageWidth - 2 * margin, 12, 'F');
      }

      pdf.text(covenant.type || '', margin + 5, yPosition + 6);
      pdf.text(covenant.value || '', margin + 90, yPosition + 6);
      pdf.text(covenant.frequency || '', margin + 130, yPosition + 6);
      yPosition += 12;
    });

    return yPosition;
  }
}