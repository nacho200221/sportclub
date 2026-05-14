document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!token) {
        alert("¡Alto ahí! Debes iniciar sesión para acceder.");
        window.location.href = 'login.html';
        return;
    }

    const nombreUsuarioDisplay = document.getElementById('nombre-usuario');
    if (nombreUsuarioDisplay && userData) {
        nombreUsuarioDisplay.textContent = userData.full_name || userData.email;
    }
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}