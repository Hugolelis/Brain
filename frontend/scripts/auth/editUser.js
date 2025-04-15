// consts
const form = document.forms[0]
const alert = document.getElementById("alert")
const success = document.getElementById("success")

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

async function update(form) {
    //enviar dados para API
    const req = await fetch('http://localhost:3000/user/update',{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            newPassword: form.newPassword.value,
            confirmPassword: form.confirmPassword.value
        })
    })

    if(!req.error) {
        const response = await req.json()
        
        if(response.error) {
            return showAlert(alert, response.msg)
        } 

        document.getElementById('btnEdit').disabled = true
        return showSucess(success, 'Sucesso, relogue para aplicar!')
    }
}

form.onsubmit = (e) => {
    e.preventDefault()
    update(form)
}