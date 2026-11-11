'use client';

export interface PdfExportPayload {
  calculatorTitle: string;
  currency: string;
  dateStr: string;
  summaryItems: { label: string; value: string; isHighlight?: boolean }[];
  breakdownItems: { label: string; value: string; percent?: string }[];
  inputParameters: { label: string; value: string }[];
}

/**
 * Client-side dynamic PDF generator using jsPDF.
 * Loaded dynamically on demand with 0 server computation.
 */
export async function generateCalculationPdf(elementId: string, filename: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule.default || html2canvasModule;

    const jspdfModule = await import('jspdf');
    const { jsPDF } = jspdfModule;

    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      console.error(`Target element #${elementId} not found for PDF export.`);
      return false;
    }

    // Capture DOM element at high resolution
    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 24;
    const printableWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * printableWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, printableWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, printableWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

