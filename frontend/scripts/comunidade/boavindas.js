document.addEventListener('DOMContentLoaded', function () {
    const nomeUsuario = sessionStorage.getItem('usuarioLogado');
    const contentBoasVindas = document.getElementById('content-boas-vindas');

    if (nomeUsuario) {
        
        const nomeTruncado = nomeUsuario.length > 15 
            ? nomeUsuario.substring(0, 15) + '...' 
            : nomeUsuario;

        contentBoasVindas.innerHTML = `<p>Seja bem-vindo, <strong>${nomeTruncado}</strong>! Este é um espaço seguro onde você pode compartilhar suas emoções e experiências. Estamos aqui para ouvir você e apoiar seu bem-estar. 💙</p>`;
    } else {
        contentBoasVindas.innerHTML = `<p>Seja bem-vindo à nossa comunidade! Aqui, você encontrará um espaço acolhedor para desabafar, compartilhar sentimentos e se conectar com pessoas que entendem o que você está passando. Juntos, somos mais fortes! 🌱</p>`;
    }
});
