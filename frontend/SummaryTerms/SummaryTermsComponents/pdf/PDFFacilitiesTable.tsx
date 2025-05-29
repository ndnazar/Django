
import jsPDF from 'jspdf';

export class PDFFacilitiesTable {
  static render(pdf: jsPDF, facilities: any[], pageWidth: number, pageHeight: number, margin: number, yPosition: number): number {
    yPosition += 10;

    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = margin;
    }

    // Facilities section header
    pdf.setFillColor(191, 219, 254);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'F');
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(30, 64, 175);
    pdf.text('Facilities Breakdown', margin + 5, yPosition + 10);
    yPosition += 20;

    // Facilities table headers
    pdf.setFillColor(239, 246, 255);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 12, 'F');
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(30, 64, 175);
    pdf.text('Type', margin + 5, yPosition + 8);
    pdf.text('Amount', margin + 60, yPosition + 8);
    pdf.text('Currency', margin + 100, yPosition + 8);
    pdf.text('Spread %', margin + 130, yPosition + 8);
    yPosition += 15;

    // Facilities data
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(31, 41, 55);
    facilities.forEach((facility: any, index: number) => {
      if (index % 2 === 0) {
        pdf.setFillColor(248, 250, 252);
        pdf.rect(margin, yPosition - 2, pageWidth - 2 * margin, 12, 'F');
      }

      pdf.text(facility.type || '', margin + 5, yPosition + 6);
      pdf.text(facility.amount ? `${parseFloat(facility.amount).toLocaleString()}` : '', margin + 60, yPosition + 6);
      pdf.text(facility.currency || '', margin + 100, yPosition + 6);
      pdf.text(facility.spread || '', margin + 130, yPosition + 6);
      yPosition += 12;
    });

    return yPosition;
  }
}