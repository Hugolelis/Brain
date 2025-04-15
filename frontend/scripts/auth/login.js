const form = document.forms[0]
const btnLogin = document.getElementById("btnLogin")
const alert = document.getElementById("alert")

function showAlert(box, message) {
    box.innerHTML = message

    box.classList.add('error')
    box.classList.remove("hide")
}

async function register(form) {
        //enviar dados para API
        const req = await fetch('http://localhost:3000/user/login',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: form.email.value,
                password: form.password.value,

            })
        })

        if(!req.error) {
            const response = await req.json()
            
            if(response.error) {
                return showAlert(alert, response.msg)
            } 
            
            localStorage.setItem('token', response.token)

            window.location.href = "index.html"
        }
}

form.onsubmit = (e) => {
    e.preventDefault()
    register(form)
}
