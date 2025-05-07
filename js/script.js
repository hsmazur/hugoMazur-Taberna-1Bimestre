// Array de produtos disponíveis no cardápio
const produtos = [
    new Lanche("img/lanche1.png", "Burger do Camponês", "Pão rústico, hambúrguer bovino, queijo curado", 21.90),
    new Lanche("img/lanche2.png", "Burger do Cavaleiro", "Pão, hambúrguer duplo, bacon defumado, queijo cheddar", 28.50),
    new Lanche("img/lanche3.png", "Burger da Donzela", "Pão, hambúrguer de frango grelhado, maionese de alho", 23.00),
    new Lanche("img/lanche4.png", "Burger do Bardo", "Pão, hambúrguer de bovino, cebola caramelizada", 26.90),
    new Lanche("img/lanche5.png", "Burger do Ferreiro", "Pão australiano, hambúrguer robusto, queijo fundido, molho de pimenta", 29.00),
    new Lanche("img/lanche6.png", "Burger do Alquimista", "Pão de especiarias, hambúrguer vegetal, cogumelos mágicos, molho especial", 25.50),
    new Lanche("img/lanche7.png", "Burger do Rei", "Pão dourado, hambúrguer de picanha, folhas nobres, queijo brie", 34.90),
    new Lanche("img/lanche8.png", "Burger do Dragão", "Pão de carvão, hambúrguer picante, queijo defumado, pimenta vermelha", 31.00),
    new Lanche("img/lanche9.png", "Burger do Monge", "Pão, hambúrguer bovino, alface romana, azeite sagrado", 22.00),
    new Lanche("img/lanche10.png", "Burger da Feiticeira", "Pão roxo, hambúrguer bovino, molho de ervas místicas", 24.50),
    new Lanche("img/lanche11.png", "Burger do Arqueiro", "Pão rústico, hambúrguer de frango grelhado, folhas frescas da floresta, queijo de cabra", 27.90),
    new Lanche("img/lanche12.png", "Burger do Necromante", "Pão escuro, hambúrguer duplo, cebola roxa em conserva, molho escuro de alho", 26.40)
];

// Carrinho de compras inicializado com os itens salvos no localStorage ou vazio
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

/**
 * Cria um card de produto para exibição na página
 * @param {Object} item - Objeto contendo os dados do produto
 * @returns {HTMLElement} Elemento HTML do card criado
 */
function criarCard(item) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="card-info">
            <h3>${item.nome}</h3>
            <p>${item.ingredientes}</p>
            <div class="quantidade">
                <button class="btn-menos" onclick="atualizarQuantidade('${item.nome}', -1)">-</button>
                <span class="contador">${carrinho[item.nome] || 0}</span>
                <button class="btn-mais" onclick="atualizarQuantidade('${item.nome}', 1)">+</button>
            </div>
        </div>
        <div class="card-preco">R$ ${item.preco.toFixed(2)}</div>
    `;

    return card;
}

/**
 * Atualiza a quantidade de um item no carrinho
 * @param {string} nomeProduto - Nome do produto a ser atualizado
 * @param {number} alteracao - Valor a ser adicionado/subtraído (+1 ou -1)
 */
function atualizarQuantidade(nomeProduto, alteracao) {
    const novoValor = (carrinho[nomeProduto] || 0) + alteracao;
    
    // Garante que a quantidade não seja negativa
    if (novoValor >= 0) {
        carrinho[nomeProduto] = novoValor;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        
        // Atualiza o contador na interface
        const contadores = document.querySelectorAll(`.contador`);
        contadores.forEach(contador => {
            if (contador.closest('.card').querySelector('h3').textContent === nomeProduto) {
                contador.textContent = novoValor;
            }
        });
    }
}

/**
 * Exibe a lista de produtos no container especificado
 * @param {Array} lista - Lista de produtos a serem exibidos
 * @param {string} containerId - ID do elemento HTML onde os produtos serão renderizados
 */
function exibirProdutos(lista, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    
    lista.forEach(item => {
        container.appendChild(criarCard(item));
    });
}

// Quando a página carrega, exibe os produtos e cria o botão do carrinho
window.onload = function() {
    exibirProdutos(produtos, "produtosContainer");
    criarBotaoCarrinho();
};