function calcularDomingoDePascua(anio) {
    const a = anio % 19;
    const b = anio % 4;
    const c = anio % 7;
    const d = (19 * a + 24) % 30;
    const dias = (d + (2 * b + 4 * c + 6 * d + 5) % 7);
    let mes = 3;
    let dia = 15 + dias;
    if (dia > 31) {
        mes = 4;
        dia = dia - 31;
    }
    const fechaPascua = new Date(anio, mes - 1, dia);
    return fechaPascua;
}

function calcularFechaDesdePascua(domingoPascua, diasDesdePascua) {
    const fecha = new Date(domingoPascua);
    fecha.setDate(fecha.getDate() + diasDesdePascua);
    return fecha;
}

function ajustarFestivoALunes(fechaFestivo) {
    const diaSemana = fechaFestivo.getDay();
    if (diaSemana >= 2 && diaSemana <= 6) {
        fechaFestivo.setDate(fechaFestivo.getDate() + (8 - diaSemana)); 
    }
    return fechaFestivo;
}

module.exports = {
    calcularDomingoDePascua,
    calcularFechaDesdePascua,
    ajustarFestivoALunes
};
