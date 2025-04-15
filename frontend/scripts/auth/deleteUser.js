const btnDelete = document.getElementById('btnDelete')

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


// action
btnDelete.addEventListener('click', () => {
    const form = document.forms[0]

    Swal.fire({
        title: "Você tem certeza?",
        text: "Essa ação não poderá ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#32909C",
        confirmButtonText: "Deletar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            del(form)
            window.location.href = 'register.html'
        }
    });
})

// delete
async function del(form) {
    //enviar dados para API
    const token = localStorage.getItem('token')

    const req = await fetch('http://localhost:3000/user/delete',{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            
        })
    })

    if(!req.error) {
        const response = await req.json()
        
        if(response.error) {
            console.log(response.error)
        } 
    }
}