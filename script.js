// Lista de itens de Pesquisa
const itens = [
    "Início",
    "Repositórios",
    "Projetos",
    "Pacotes",
    "Estrelas",
    "Segurança",
    "Configurações",
    "Ajuda",
    "Sair"
];

const campoPesquisa = document.getElementById('campoPesquisa');
const resultados = document.getElementById('resultados');
let timer;

// Quando digitar no campo
campoPesquisa.addEventListener('input', function() {
    const texto = this.value.toLowerCase().trim();
    
    resultados.innerHTML = '';
    
    if (texto === '') {
        resultados.classList.remove('visivel');
        return;
    }
    
    // Filtra os itens da lista
    const encontrados = itens.filter(item =>
        item.toLowerCase().includes(texto)
    );
    
    mostrarResultados(encontrados);
    
    // 🔍 Busca usuário no GitHub — com atraso de 600ms
    clearTimeout(timer);
    timer = setTimeout(() => {
        buscarUsuarioGitHub(texto);
    }, 600);
});

// Mostrar na Tela
function mostrarResultados(lista) {
    if (lista.length === 0) {
        resultados.innerHTML = '<li>Nenhum resultado encontrado</li>';
    } else {
        lista.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            resultados.appendChild(li);
        });
    }
    resultados.classList.add('visivel');
}

// Nova Função: Buscar usuário no GitHub
async function buscarUsuarioGitHub(username) {
    try {
        const resposta = await fetch(`https://api.github.com/users/${username}`);
        
        if (!resposta.ok) return; // Não faz nada se não encontrar
        
        const dados = await resposta.json();
        
        // Adicionar o resultado do GitHub na lista
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${dados.name || dados.login}</strong>
            <small style="color: #8b949e">@${dados.login} — ${dados.public_repos} repositórios</small>
        `;
        li.style.cursor = 'pointer';
        li.onclick = () => window.open(dados.html_url, '_blank');
        resultados.appendChild(li);
        resultados.classList.add('visivel');
        
    } catch (erro) {
        console.log('Busca concluída');
    }
}

// Fecha se clicar fora — com ponto .container
document.addEventListener('click', function(e) {
    if (!e.target.closest('.container')) {
        resultados.classList.remove('visivel');
    }
});