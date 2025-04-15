const form = document.forms[0]
const btnRegister = document.getElementById("btnRegister")
const alert = document.getElementById("alert")

function showAlert(box, message) {
    box.innerHTML = message

    box.classList.add('error')
    box.classList.remove("hide")
}

async function register(form) {
        //enviar dados para API
        const req = await fetch('http://localhost:3000/user/register',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: form.name.value,
                email: form.email.value,
                password: form.password.value,
                confirmPassword: form.confirmPassword.value
            })
        })

        if(!req.error) {
            const response = await req.json()
            
            if(response.error) {
                return showAlert(alert, response.msg)
            } 

            window.location.href = "login.html"
        }
}

form.onsubmit = (e) => {
    e.preventDefault()
    register(form)
}
