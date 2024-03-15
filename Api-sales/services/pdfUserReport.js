const Users = require("../models/Users");
const Sales = require("../models/Sales");
const PDFDocument = require("pdfkit");
const moment = require("moment");

const generateUserReport = async (name) => {
    try {
        const user = await Users.findOne({ name });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const userId = user._id;
        const today = moment().format("YYYY-MM-DD");
        // Obtener el número de ventas y total de productos vendidos para el usuario
        const { salesCount, totalProductsSold } = await getSalesInfo(name);

        // Generar el PDF con la información obtenida
        const pdfContent = generatePDF({ userId, name, today, salesCount, totalProductsSold });
        return pdfContent;

    } catch (error) {
        throw new Error(`Ha ocurrido un error al generar el reporte del usuario: ${error.message}`);
    }
};

// Función para obtener la información de ventas del usuario
const getSalesInfo = async (userName) => {
    try{
        const sales = await Sales.find({salesman: userName});
        let salesCount = 0
        let totalProductsSold = 0
        sales.forEach(sale => {
            sale.salesInfo.forEach(info => {
                salesCount++;
                totalProductsSold += info.quantity;
            });
        });
        return {salesCount, totalProductsSold};
    }catch (error) {
        throw new Error(`Ha ocurrido un error al obtener la información de ventas del usuario: ${error.message}`);
    }
};

// Función para generar el PDF con la información del usuario
const generatePDF = ({ userId, name, today, salesCount, totalProductsSold }) => {
    const doc = new PDFDocument();
    doc.fontSize(20).text(`Reporte de rendimiento de usuario - ${today}`, { align: "center" });
    doc.fontSize(14).text(`ID del Usuario: ${userId}`);
    doc.fontSize(14).text(`Nombre del Usuario: ${name}`);
    doc.fontSize(14).text(`Número de ventas: ${salesCount}`);
    doc.fontSize(14).text(`Total de productos vendidos: ${totalProductsSold}`);
    doc.end();
    return doc;
};

module.exports = {
    generateUserReport
};
