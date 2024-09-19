const Festivo = require('../models/festivo');
const { calcularDomingoDePascua, calcularFechaDesdePascua, ajustarFestivoALunes } = require('../utils/calculoPascua');

async function esFestivo(fecha) {
    const anio = fecha.getFullYear();
    const fechaPascua = calcularDomingoDePascua(anio);

    const festivos = await Festivo.find();

    const festivosFijos = festivos.find(f => f.id === 1)?.festivos || [];
    for (const festivo of festivosFijos) {
        if (fecha.getDate() === festivo.dia && fecha.getMonth() + 1 === festivo.mes) {
            return { esFestivo: true };
        }
    }

    
    const festivosPuente = festivos.find(f => f.id === 2)?.festivos || [];
    for (const festivo of festivosPuente) {
        const fechaFestivo = new Date(anio, festivo.mes - 1, festivo.dia);
        if (fecha.getTime() === fechaFestivo.getTime()) {
            const diaSemana = fechaFestivo.getDay();
            if (diaSemana !== 0) {
                fechaFestivo.setDate(fechaFestivo.getDate() + (1 - diaSemana + 7) % 7);
            }
            if (fecha.getTime() === fechaFestivo.getTime()) {
                return { esFestivo: true };
            }
        }
    }

    const festivosPascua = festivos.find(f => f.id === 3)?.festivos || [];
    for (const festivo of festivosPascua) {
        let fechaFestivo = calcularFechaDesdePascua(fechaPascua, festivo.diasPascua);
        if (fecha.getTime() === fechaFestivo.getTime()) {
            return { esFestivo: true };
        }
    }

    const festivosPascuaAjuste = festivos.find(f => f.id === 4)?.festivos || [];
    for (const festivo of festivosPascuaAjuste) {
        let fechaFestivo = calcularFechaDesdePascua(fechaPascua, festivo.diasPascua);
        if (festivo.diasPascua === 40 || festivo.diasPascua === 61 || festivo.diasPascua === 68) {
            fechaFestivo = ajustarFestivoALunes(fechaFestivo);
        }
        if (fecha.getTime() === fechaFestivo.getTime()) {
            return { esFestivo: true };
        }
    }

    return { esFestivo: false };
}

module.exports = { esFestivo };
