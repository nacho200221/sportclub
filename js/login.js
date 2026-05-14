// Capturamos los elementos del HTML
const formLogin = document.getElementById('form-login');
const inputCorreo = document.getElementById('correo');
const inputPassword = document.getElementById('password');
const mensajeError = document.getElementById('mensaje-error');

formLogin.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que la página recargue
    mensajeError.style.display = 'none';

    // Preparamos los datos tal cual los pide la API del profe
    const credenciales = {
        email: inputCorreo.value,
        password: inputPassword.value
    };

    try {
        const respuesta = await fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credenciales)
        });

        // Convertimos la respuesta a JSON
        const resultado = await respuesta.json();

        // La API del profe usa "ok: true" para confirmar el éxito
        if (resultado.ok === true) {
            
            // ¡OJO AQUÍ! Sacamos el token y user desde resultado.data
            localStorage.setItem("token", resultado.data.token);
            localStorage.setItem("user", JSON.stringify(resultado.data.user));

            // Redirección según el rol exacto que viene de la base de datos
            const rolUsuario = resultado.data.user.role;
            
            if (rolUsuario === "admin") {
                window.location.href = "dashboard-admin.html";
            } else if (rolUsuario === "coach") {
                window.location.href = "dashboard-coach.html";
            } else {
                window.location.href = "dashboard-usuario.html";
            }

        } else {
            // Error de credenciales (correo o clave mal)
            mensajeError.textContent = resultado.message || "Credenciales incorrectas.";
            mensajeError.style.display = 'block';
            inputCorreo.style.borderColor = "red"; // Le damos el borde rojo que pide la rúbrica
            inputPassword.style.borderColor = "red";
        }

    } catch (error) {
        console.error("Error en la petición:", error);
        mensajeError.textContent = "Error al conectar con el servidor. ¿Está encendida la API?";
        mensajeError.style.display = 'block';
    }
});