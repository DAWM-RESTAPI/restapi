$(document).ready(function() {
    // Modal logic
    var modal = document.getElementById("tokenModal");
    var span = document.getElementsByClassName("close")[0];
  
    // Cuando el usuario hace clic en el botón de submit, obtiene el token y cierra el modal
    document.getElementById("submitToken").onclick = function() {
      var token = document.getElementById("tokenInput").value;
      sessionStorage.setItem('apiToken', token);
      modal.style.display = "none";
      addTokenToRequests(token);
    };
  
    // Añadir el token a la cabecera de cada solicitud
    function addTokenToRequests(token) {
      const auth = {
        name: "Bearer",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization"
        },
        value: "Bearer " + token // Asegúrate de tener el formato "Bearer <token>"
      };
      window.ui.authActions.authorize({ Bearer: auth });
    }
  
    // Mostrar modal si no hay token y se intenta ejecutar una operación
    $(document).on('click', '.try-out__btn', function() {
      const token = sessionStorage.getItem('apiToken');
      if (!token) {
        modal.style.display = "block";
      }
    });
  
    // Cerrar el modal
    span.onclick = function() {
      modal.style.display = "none";
    };
  });
  