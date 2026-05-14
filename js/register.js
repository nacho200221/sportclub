document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.getElementById('form-register');
    const mensajeError = document.getElementById('mensaje-error');

    formRegister.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const password = document.getElementById('password').value;
        

        const nuevoUsuario = {
            full_name: nombre,
            email: correo,
            password: password
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                window.location.href = 'login.html';
            } else {
                mensajeError.style.display = 'block';
                mensajeError.textContent = data.message || "Error al registrar la cuenta.";
            }

        } catch (error) {
            console.error("Error de conexión:", error);
            mensajeError.style.display = 'block';
            mensajeError.textContent = "Error al conectar con el servidor.";
        }
    });
});