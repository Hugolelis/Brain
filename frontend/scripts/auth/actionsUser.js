// elements
const userBox = document.getElementById('user')
const userMenu = document.getElementById('menu-drop')
const voluntaryBtn = document.getElementById('voluntary')
const btnAcc = document.getElementById('btnAcc')

// funcs
addInfosUser()

// decodificar token
function parseJwt(token) {
    if (!token) return null

    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
}

// logout
function logoutUser() {
    localStorage.removeItem('token');
}

// add infos
function addInfosUser() {
    const token = localStorage.getItem('token')
    const userData = parseJwt(token)

    if (userData) {
        userBox.innerHTML = userData.name
        userMenu.innerHTML = `
            <li><a class="dropdown-item" href="editar.html">Editar</a></li>
            <li><a class="dropdown-item" href="login.html" onclick="logoutUser()">Sair</a></li>
        `

        if (userData.image) {
            btnAcc.innerHTML = `<img src="../backend/public/imgs/users/${userData.image}" id="perfil-img" alt="perfil-image">`
        } else {
            btnAcc.innerHTML = '<i class="bi bi-person-circle"></i>'
        }

        voluntaryBtn.addEventListener('click', () => window.location.href = 'voluntariar.html')
    } else {
        userBox.innerHTML = ''
        userMenu.innerHTML = `
            <li><a class="dropdown-item" href="login.html">Entrar</a></li>
        `
        btnAcc.innerHTML = '<i class="bi bi-person-circle"></i>'
        voluntaryBtn.disabled = true
    }
}