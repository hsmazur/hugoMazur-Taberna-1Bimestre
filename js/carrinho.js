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
    new Lanche("img/lanche12.png", "Burger do Necromante", "Pão escuro, hambúrguer duplo, cebola roxa em conserva, molho escuro de alho", 26.40),
];

const todosProdutos = [...produtos];
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
const container = document.getElementById("lista-carrinho");
const totalDiv = document.getElementById("total-carrinho");
let total = 0;

/**
 * Atualiza o carrinho de compras na interface
 */
function atualizarCarrinho() {
    container.innerHTML = "";
    total = 0;

    Object.entries(carrinho).forEach(([nome, qtd]) => {
        if (qtd > 0) {
            const produto = todosProdutos.find(item => item.nome === nome);
            if (produto) {
                const itemTotal = qtd * produto.preco;
                total += itemTotal;
                criarItemCarrinho(produto, qtd, itemTotal);
            }
        }
    });

    localStorage.setItem('valorTotal', total.toFixed(2));
    totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
}

/**
 * Cria um item do carrinho na interface
 * @param {Object} produto - Objeto do produto
 * @param {number} quantidade - Quantidade do item
 * @param {number} itemTotal - Valor total do item (preço * quantidade)
 */
function criarItemCarrinho(produto, quantidade, itemTotal) {
    const card = document.createElement("div");
    card.className = "item-carrinho";

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" />
        <div class="card-info">
            <h3>${produto.nome}</h3>
            <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
            <p>Qtd: ${quantidade}</p>
            <p>Total: R$ ${itemTotal.toFixed(2)}</p>
        </div>
        <button class="remover-item">Remover</button>
    `;

    card.querySelector(".remover-item").onclick = () => {
        delete carrinho[produto.nome];
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarCarrinho();
    };

    container.appendChild(card);
}

/**
 * Cria o formulário de entrega/retirada
 * @param {string} tipo - Tipo de entrega ('entrega' ou 'retirada')
 */
function criarFormulario(tipo) {
    const formContainer = document.getElementById("formulario-entrega");
    const opcoesEntrega = document.getElementById("opcoes-entrega");
    
    formContainer.innerHTML = `
        <form id="form-dados">
            <h3>Dados para ${tipo}</h3>
            <label>Nome:<br><input type="text" name="nome" required></label><br>
            <label>Telefone:<br><input type="tel" name="telefone" required></label><br>
            ${tipo === "entrega" ? `
                <label>Endereço:<br><input type="text" name="endereco" required></label><br>
                <label>Bairro:<br><input type="text" name="bairro" required></label><br>
            ` : ""}
            <button type="button" id="voltar">Voltar</button>
            <button type="submit">Confirmar</button>
        </form>
    `;

    formContainer.style.display = "block";
    opcoesEntrega.style.display = "none";

    document.getElementById("voltar").onclick = () => {
        formContainer.style.display = "none";
        opcoesEntrega.style.display = "flex";
    };

    document.getElementById("form-dados").onsubmit = (e) => {
        e.preventDefault();
        finalizarPedido(tipo);
    };
}

/**
 * Processa o pedido finalizado
 * @param {string} tipo - Tipo de entrega ('entrega' ou 'retirada')
 */
function finalizarPedido(tipo) {
    const form = document.getElementById("form-dados");
    const dados = new FormData(form);
    const resultado = Object.fromEntries(dados.entries());
    
    const taxaEntrega = tipo === "entrega" ? 3.50 : 0;
    const precoFinal = total + taxaEntrega;

    // Atualiza o resumo do pedido
    document.getElementById("nome-usuario").textContent = `Nome: ${resultado.nome}`;
    document.getElementById("telefone-usuario").textContent = `Telefone: ${resultado.telefone}`;
    document.getElementById("endereco-usuario").textContent = `Endereço: ${resultado.endereco || "Retirada no local"}`;
    document.getElementById("bairro-usuario").textContent = `Bairro: ${resultado.bairro || "Retirada no local"}`;
    document.getElementById("modo-entrega").textContent = `Modo de entrega: ${tipo === "entrega" ? "Entrega" : "Retirada"}`;
    document.getElementById("taxa-entrega").textContent = `Taxa de entrega: R$ ${taxaEntrega.toFixed(2)}`;
    document.getElementById("preco-total").textContent = `Preço total: R$ ${precoFinal.toFixed(2)}`;

    // Exibe os itens do pedido
    const itensPedidoDiv = document.getElementById("itens-pedido");
    itensPedidoDiv.innerHTML = Object.entries(carrinho)
        .filter(([_, qtd]) => qtd > 0)
        .map(([nome, qtd]) => {
            const produto = todosProdutos.find(item => item.nome === nome);
            return produto ? `
                <div>
                    <p>${produto.nome} (x${qtd})</p>
                    <p>R$ ${(qtd * produto.preco).toFixed(2)}</p>
                </div>
            ` : "";
        }).join("");

    // Atualiza a exibição
    document.getElementById("formulario-entrega").style.display = "none";
    document.getElementById("resumo-pedido").style.display = "flex";
    document.getElementById("botoes-finalizacao").style.marginTop = "30px";

    // Salva no localStorage
    localStorage.setItem("resumoPedido", JSON.stringify({
        precoTotal: precoFinal,
        modoEntrega: tipo === "entrega" ? "Entrega" : "Retirada"
    }));
}

// Inicialização
document.querySelector(".btn-entrega").onclick = () => criarFormulario("entrega");
document.querySelector(".btn-retirada").onclick = () => criarFormulario("retirada");
atualizarCarrinho();