document.addEventListener("DOMContentLoaded", function() {
    // Dias y horarios disponibles inicialmente
    const diasLaborables = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
 
    
    // Configuración inicial del input de fecha
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero=0
    const yyyy = today.getFullYear();
    
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    const dateInput = document.getElementsByName("Fecha")[0];
    dateInput.setAttribute("min", todayFormatted);
    
    // Deshabilitar el menú desplegable de horarios hasta que se seleccione una fecha
    const selectHorarios = document.getElementsByName("Horario")[0];
    selectHorarios.disabled = true;

    // Referencia a la colección 'reservas' en Firebase Firestore
    var db = firebase.firestore().collection("reservas");
    
    // Consultar las reservas en tiempo real
    db.onSnapshot((querySnapshot) => {
      const reservas = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reservas.push(data);
      });

      // Actualizar horarios cuando se selecciona una fecha
      dateInput.addEventListener("change", function() {
        const selectedDate = new Date(this.value);
        const dayName = selectedDate.toLocaleString("es-ES", { weekday: 'long' });

        // Habilitar el menú desplegable de horarios
        selectHorarios.disabled = false;

        // Filtrar las reservas para la fecha seleccionada
        const reservasParaFechaSeleccionada = reservas.filter(reserva => reserva.fecha === this.value);
        const horariosReservadosParaFechaSeleccionada = reservasParaFechaSeleccionada.map(reserva => reserva.horario);

        // Filtrar los horarios disponibles
        const horariosParaMostrar = horariosDisponibles.filter(horario => !horariosReservadosParaFechaSeleccionada.includes(horario));
        
        // Actualizar el menú desplegable de horarios
        selectHorarios.innerHTML = '<option value="" disabled selected>Selecciona un horario</option>' + horariosParaMostrar.map(horario => `<option value="${horario}">${horario}</option>`).join("");
      });
    });
});
