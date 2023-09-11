const PESO = document.getElementById('peso');
const ERROR = document.getElementById('error');

window.addEventListener('load', () => {
    const PESO = document.getElementById('peso');
    PESO.focus();
});

PESO.addEventListener('input', () => {
    const DATO = parseInt(PESO.value);
    if (!isNaN(DATO)) {
        analizarMetodo(DATO);
    } else {
        ERROR.style.display = 'block';
    }
});


function analizarMetodo(peso) {
    if (peso > 0 && peso <= 30) {
        MetodoHollidaySegar(peso);
    } else if (peso > 30) {
        MetododeSuperficieCorporal(peso);
    } else {
        mostrarError();
    }
}

function calcFlujo(peso) {
    let flujo = 0;
    if (peso <= 10) {
        flujo = peso * 100;
    } else if (peso <= 20) {
        flujo = 1000 + (peso - 10) * 50;
    } else {
        flujo = 1500 + (peso - 20) * 20;
    }
    return flujo;
}

function MetodoHollidaySegar(peso) {
    ERROR.style.display = 'none';

    let flujo = Math.round(calcFlujo(peso));
    let mantenimiento = Math.round(flujo / 24);

    document.querySelector('tbody').innerHTML = '';

    let rowHollidaySegar = document.createElement('tr');
    rowHollidaySegar.innerHTML = `
        <td>${peso}</td>
        <td>Holliday Segar</td>
        <td>No aplica</td>
        <td>${flujo} cc</td>
        <td>${mantenimiento} cc/hr</td>
        <td>${mantenimiento * 1.5} cc/hr</td>
    `;
    document.querySelector('tbody').appendChild(rowHollidaySegar);
}

function MetododeSuperficieCorporal(peso) {

    ERROR.style.display = 'none';
    let Superficiecorporal = (((peso * 4) + 7) / (peso + 90)) * 1500;
    let flujo = parseInt(Superficiecorporal);
    let mantenimiento = Math.round(flujo / 24);


    let Superficiecorporal2000 = (((peso * 4) + 7) / (peso + 90)) * 2000;
    let flujo2000 = parseInt(Superficiecorporal2000);
    let mantenimiento2000 = Math.round(flujo2000 / 24);

    document.querySelector('tbody').innerHTML = '';

    let row1500 = document.createElement('tr');
    row1500.innerHTML = `
        <td>${peso}</td>
        <td>Superficie Corporal</td>
        <td>1500</td>
        <td>${flujo} cc</td>
        <td>${mantenimiento} cc/hr</td>
        <td>${mantenimiento * 1.5} cc/hr</td>
    `;
    document.querySelector('tbody').appendChild(row1500);

    let row2000 = document.createElement('tr');
    row2000.innerHTML = `
        <td>${peso}</td>
        <td>Superficie Corporal</td>
        <td>2000</td>
        <td>${flujo2000} cc</td>
        <td>${mantenimiento2000} cc/hr</td>
        <td>${mantenimiento2000 * 1.5} cc/hr</td>
    `;
    document.querySelector('tbody').appendChild(row2000);

}
function mostrarError() {
    ERROR.style.display = 'block';

}

