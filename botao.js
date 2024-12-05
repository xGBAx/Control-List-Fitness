// Seleciona os botões
const botoes = document.querySelectorAll('#botao button');

// Adiciona um evento de clique em cada botão
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        // Remove a classe 'ativo' de todos os botões
        botoes.forEach(b => b.classList.remove('ativo'));
        // Adiciona a classe 'ativo' apenas no botão clicado
        botao.classList.add('ativo');
    });
});