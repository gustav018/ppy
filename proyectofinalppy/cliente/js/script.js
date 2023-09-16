// Esperar a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
 
  

    // Referencia a la colección 'reservas' en Firebase Firestore
    var db = firebase.firestore().collection("reservas");

    // Función que se ejecuta cuando se envía el formulario
    function submitForm(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        var fecha = document.getElementsByName("Fecha")[0].value;
        var horario = document.getElementsByName("Horario")[0].value;
        var nombre = document.getElementsByName("Nombre")[0].value;
        var numeroDeContacto = document.getElementsByName("Numero de Contacto")[0].value;
        var servicios = document.getElementsByName("Servicios")[0].value;

        // Guardar los datos en Firebase
        db.add({
            fecha: fecha,
            horario: horario,
            nombre: nombre,
            numero_de_contacto: numeroDeContacto,
            servicios: servicios
        })
            .then(function (docRef) {
                // Mostrar un alerta de Bootstrap 4 para confirmar que los datos se han guardado
                form.reset();
                var alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success';
                alertDiv.innerHTML = 'Reserva de turno guardada con éxito!';

                var formContainer = document.querySelector(".contact-form");
                formContainer.insertBefore(alertDiv, formContainer.firstChild);

                // Remover el alerta después de 3 segundos
                setTimeout(function () {
                    alertDiv.remove();
                }, 6000);
            })
            .catch(function (error) {
                console.error("Error al agregar el documento: ", error);

                // Mostrar un alerta de Bootstrap 4 para indicar que hubo un error
                var alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-danger';
                alertDiv.innerHTML = 'Hubo un error al guardar la reserva de turno.';
                document.body.appendChild(alertDiv);

                // Remover el alerta después de 3 segundos
                setTimeout(function () {
                    alertDiv.remove();
                }, 3000);
            });

    }

    // Añadir un event listener para el evento 'submit' del formulario
    document.querySelector("form").addEventListener("submit", submitForm);
});
