// A variável 'dados' já está disponível aqui porque importamos o dados.js no HTML

function realizarBusca() {
    // Seleciona os elementos do HTML
    const timeContainer = document.querySelector(".time-container");
    const inputBusca = document.querySelector("header input");
    const welcomeScreen = document.getElementById('welcome-screen');

    const termoBusca = inputBusca.value.toLowerCase().trim();

    // Se o campo estiver vazio, não faz nada
    if (termoBusca === "") {
        return;
    }

    // 1. Esconde a tela de boas-vindas
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
    }

    // 2. Filtra os dados (que agora vêm do arquivo dados.js)
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descrição.toLowerCase().includes(termoBusca)
    );

    // 3. Renderiza os resultados
    renderizarTimes(dadosFiltrados, timeContainer);
}

function renderizarTimes(listaDeTimes, container) {
    container.innerHTML = ""; // Limpa o conteúdo anterior
    container.style.display = 'grid'; // Garante o layout em grade

    if (listaDeTimes.length === 0) {
        container.innerHTML = `
            <div class="welcome-container">
                <p style="color: #a1a1aa;">Nenhum time encontrado. Tente outro nome!</p>
            </div>
        `;
        return;
    }

    for (let time of listaDeTimes) {
        let card = document.createElement("article");
        card.classList.add("time");
        card.innerHTML = `
            <h2>${time.nome}</h2>
            <p><strong>Fundação:</strong> ${time.ano}</p>
            <p>${time.descrição}</p>
            <a href="${time.link}" target="_blank">Saiba mais</a>
        `;
        container.appendChild(card);
    }
}

// Adiciona o evento de clique ao botão quando a página carrega
document.getElementById('botao-busca').addEventListener('click', realizarBusca);

// Opcional: Permitir buscar apertando ENTER no teclado
document.querySelector("header input").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        realizarBusca();
    }
});