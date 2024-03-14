const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateInvoicePDF(salesData) {
    const doc = new PDFDocument();
    const fileName = `invoice_${salesData._id}.pdf`; // nombre con el id de la venta

    // Creamos el PDF
    doc.pipe(fs.createWriteStream(fileName));

    // Añadimos el contenido de la factura
    doc
        .fontSize(25)
        .text('Factura Electrónica', { align: 'center' })
        .fontSize(12)
        .text(`ID de Venta: ${salesData._id}`)
        .text(`Fecha de Venta: ${salesData.date}`)
        .text(`Vendedor: ${salesData.salesman}`)
        .text(`Cliente: ${salesData.client}`)
        .text('Productos:', { underline: true });

    salesData.salesInfo.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.product_name} - Cantidad: ${item.quantity}`);
    });

    // Cerramos el PDF
    doc.end();

    // Devolvemos el contenido del archivo PDF en lugar del nombre del archivo
    return doc;
}

module.exports = {
    generateInvoicePDF
};
