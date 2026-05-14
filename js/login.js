document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mensajeError = document.getElementById('mensaje-error');

    try {
        const respuestaAPI = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: correo, password: password }) 
        });

        const resultado = await respuestaAPI.json();

        if (respuestaAPI.ok || resultado.ok === true) {
            
            alert("¡Login exitoso! Redirigiendo al dashboard...");
            
            localStorage.setItem("token", resultado.data.token);
            localStorage.setItem("user", JSON.stringify(resultado.data.user));

            const rolUsuario = resultado.data.user.role;

            if (rolUsuario === 'admin') {
                window.location.href = 'dashboard-admin.html';
            } else if (rolUsuario === 'coach') {
                window.location.href = 'dashboard-coach.html';
            } else {
                window.location.href = 'dashboard-usuario.html'; 
            }
            
        } else {
            mensajeError.style.display = 'block';
            mensajeError.textContent = resultado.message || "Credenciales incorrectas.";
        }
    } catch (error) {
        mensajeError.style.display = 'block';
        mensajeError.textContent = "Error al conectar con el servidor.";
        console.error("Detalle técnico:", error);
    }
});