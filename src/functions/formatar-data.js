function formatarData(dataOriginal) {
    const [ano, mes, dia] = dataOriginal.split('-');
    
    const meses = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    const nomeMes = meses[parseInt(mes, 10) - 1];
    return `${dia} de ${nomeMes} de ${ano}`;
}

export default formatarData;