import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePdfFromElement = async (elementRef, fileName = 'invoice.pdf', shouldDownload = false) => {
  if (!elementRef?.current) return null;

  const canvas = await html2canvas(elementRef.current, {
    scale: 1.5,
    useCORS: true,
    backgroundColor: '#fff'
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.6);
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 5;
  const contentWidth = pageWidth - margin * 2;
  const contentHeight = pageHeight - margin * 2;

  const labels = ['Original Copy', 'Duplicate Copy', 'Triplicate Copy', 'Extra Copy'];

  labels.forEach((label, index) => {
    if (index > 0) pdf.addPage();

    pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, contentHeight);

    pdf.setFontSize(16);
    pdf.setTextColor(0);
    pdf.setFont('helvetica', 'bold');
    const labelWidth = pdf.getTextWidth(label);
    pdf.text(label, pageWidth - margin - labelWidth - 10, margin + 15); // top-right corner
  });

  if (shouldDownload) {
    pdf.save(fileName);
    return;
  }

  return pdf.output('blob'); // Used for sending via email
};
