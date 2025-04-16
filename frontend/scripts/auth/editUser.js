// consts
const form = document.forms[0]
const alert = document.getElementById("alert")
const success = document.getElementById("success")
const fileInput = document.getElementById("file-input")
const btnUpload = document.getElementById("btnUpload")
const btnEdit = document.getElementById("btnEdit")

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

const token = localStorage.getItem('token')
const userData = parseJwt(token)
addInfo(userData, form)

// utils
function showAlert(box, message) {
    box.innerHTML = message
    box.classList.add('error')
    box.classList.remove("hide")
    success.classList.add('hide')
}

function showSucess(box, message) {
    box.innerHTML = message
    box.classList.add('success')
    box.classList.remove("hide")
    alert.classList.add('hide')
}

function addInfo(userData, form) {
    form.name.value = userData.name
    form.email.value = userData.email
}

// updates data
async function update(form) {
    const formData = new FormData()

    // Dados de texto
    formData.append('name', form.name.value)
    formData.append('email', form.email.value)
    formData.append('password', form.password.value)
    formData.append('newPassword', form.newPassword.value)
    formData.append('confirmPassword', form.confirmPassword.value)

    // Imagem
    if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0])
    }

    const req = await fetch('http://localhost:3000/user/update', {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    })

    const response = await req.json()

    if (response.error) {
        return showAlert(alert, response.msg)
    }

    btnEdit.disabled = true
    return showSucess(success, 'Sucesso, relogue para aplicar!')
}

// eventos
btnEdit.addEventListener('click', async (e) => {
    e.preventDefault()
    await update(form)
})

form.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        await update(form)
    }
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    await update(form)
})
