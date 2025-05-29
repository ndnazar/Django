
import jsPDF from 'jspdf';

export class PDFAmortizationTable {
  static render(pdf: jsPDF, amortizationSchedule: number[], pageWidth: number, pageHeight: number, margin: number, yPosition: number, facilityType?: string): number {
    yPosition += 10;

    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = margin;
    }

    // Amortization section header
    pdf.setFillColor(191, 219, 254);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'F');
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(30, 64, 175);
    const headerText = facilityType ? `${facilityType} Amortization Schedule` : 'Amortization Schedule';
    pdf.text(headerText, margin + 5, yPosition + 10);
    yPosition += 20;

    // Schedule table headers
    pdf.setFillColor(239, 246, 255);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 12, 'F');
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(30, 64, 175);
    pdf.text('Year', margin + 30, yPosition + 8);
    pdf.text('Amortization %', margin + 80, yPosition + 8);
    yPosition += 15;

    // Schedule data
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(31, 41, 55);
    amortizationSchedule.forEach((percentage, index) => {
      if (index % 2 === 0) {
        pdf.setFillColor(248, 250, 252);
        pdf.rect(margin, yPosition - 2, pageWidth - 2 * margin, 12, 'F');
      }

      pdf.text(`Year ${index + 1}`, margin + 30, yPosition + 6);
      pdf.text(`${percentage.toFixed(1)}%`, margin + 80, yPosition + 6);
      yPosition += 12;
    });

    return yPosition;
  }
}