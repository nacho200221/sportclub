const users = [
    { user: "usuario1@sportclub.cl", password: "123", role: "usuario", nombre: "Juan Pérez" },
    { user: "usuario2@sportclub.cl", password: "123", role: "usuario", nombre: "María Gómez" },
    { user: "coach1@sportclub.cl", password: "123", role: "coach", nombre: "Prof. Carlos Silva" },
    { user: "coach2@sportclub.cl", password: "123", role: "coach", nombre: "Prof. Ana Rojas" },
    { user: "admin1@sportclub.cl", password: "123", role: "admin", nombre: "Admin Principal" },
    { user: "admin2@sportclub.cl", password: "123", role: "admin", nombre: "Admin Soporte" }
];
const formLogin = document.getElementById('form-login');
const inputCorreo = document.getElementById('correo');
const inputPassword = document.getElementById('password');
const mensajeError = document.getElementById('mensaje-error');

formLogin.addEventListener('submit', function(event) {
    event.preventDefault();

    const correoIngresado = inputCorreo.value;
    const passwordIngresada = inputPassword.value;

    const usuarioEncontrado = users.find(u => u.user === correoIngresado && u.password === passwordIngresada);

    if (usuarioEncontrado) {
        mensajeError.style.display = 'none';

        localStorage.setItem("user", JSON.stringify(usuarioEncontrado));

        if (usuarioEncontrado.role === "usuario") {
            window.location.href = "dashboard-usuario.html";
        } else if (usuarioEncontrado.role === "coach") {
            window.location.href = "dashboard-coach.html";
        } else if (usuarioEncontrado.role === "admin") {
            window.location.href = "dashboard-admin.html";
        }

    } else {
        mensajeError.textContent = "Credenciales incorrectas. Inténtalo de nuevo.";
        mensajeError.style.display = 'block';
    }
});