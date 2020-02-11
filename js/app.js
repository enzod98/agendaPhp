const formularioContactos = document.querySelector('#contacto');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecute
    formularioContactos.addEventListener('submit', leerFormulario)
}

function leerFormulario(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const empresa = document.querySelector('#empresa').value;
    const telefono = document.querySelector('#telefono').value;

    if (nombre === '' || empresa === '' || telefono === '') {
        console.log('Al menos un campo está vacío')
    } else {
        console.log('Usted ingresó el nombre ' + nombre);
    }

}