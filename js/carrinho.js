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


const todosProdutos = [...produtos,];

const carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
const container = document.getElementById("lista-carrinho");
const totalDiv = document.getElementById("total-carrinho");
let total = 0;

Object.entries(carrinho).forEach(([nome, qtd]) => {
    if (qtd > 0) {
        const produto = todosProdutos.find(item => item.nome === nome);
        if (produto) {
            const itemTotal = qtd * produto.preco;
            total += itemTotal;

            const card = document.createElement("div");
            card.className = "item-carrinho";

            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" />
                <div class="card-info">
                    <h3>${produto.nome}</h3>
                    <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                    <p>Qtd: ${qtd}</p>
                    <p>Total: R$ ${(itemTotal).toFixed(2)}</p>
                </div>
                <button class="remover-item">Remover</button>
            `;

            card.querySelector(".remover-item").addEventListener("click", () => {
                delete carrinho[produto.nome];
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                location.reload();
            });

            container.appendChild(card);
        }
    }
});

localStorage.setItem('valorTotal', total.toFixed(2));

const entregaBtn = document.querySelector(".btn-entrega");
const retiradaBtn = document.querySelector(".btn-retirada");
const formContainer = document.getElementById("formulario-entrega");
const opcoesEntrega = document.getElementById("opcoes-entrega");
const botoesDiv = document.getElementById("botoes-finalizacao");

function criarFormulario(tipo) {
    formContainer.innerHTML = "";
    const form = document.createElement("form");
    form.id = "form-dados";

    const camposComuns = `
        <label>Nome:<br><input type="text" name="nome" required></label><br>
        <label>Telefone:<br><input type="tel" name="telefone" required></label><br>
    `;

    const camposEntrega = `
        <label>Endereço:<br><input type="text" name="endereco" required></label><br>
        <label>Bairro:<br><input type="text" name="bairro" required></label><br>
    `;

    form.innerHTML = `
        <h3>Dados para ${tipo}</h3>
        ${camposComuns}
        ${tipo === "entrega" ? camposEntrega : ""}
        <button type="button" id="voltar">Voltar</button>
        <button type="submit">Confirmar</button>
    `;

    formContainer.appendChild(form);
    formContainer.style.display = "block";
    opcoesEntrega.style.display = "none";

    document.getElementById("voltar").addEventListener("click", () => {
        formContainer.style.display = "none";
        opcoesEntrega.style.display = "flex";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const dados = new FormData(form);
        const resultado = Object.fromEntries(dados.entries());

        const nome = resultado.nome;
        const telefone = resultado.telefone;
        const endereco = resultado.endereco || "Não há necessidade";
        const bairro = resultado.bairro || "Não há necessidade";

        const modoEntrega = tipo === "entrega" ? "Entrega" : "Retirada";
        const taxaEntrega = tipo === "entrega" ? 3.50 : 0;

        const precoItens = total;
        const precoFinal = precoItens + taxaEntrega;

        document.getElementById("nome-usuario").textContent = `Nome: ${nome}`;
        document.getElementById("telefone-usuario").textContent = `Telefone: ${telefone}`;
        document.getElementById("endereco-usuario").textContent = `Endereço: ${endereco}`;
        document.getElementById("bairro-usuario").textContent = `Bairro: ${bairro}`;

        const itensPedidoDiv = document.getElementById("itens-pedido");
        itensPedidoDiv.innerHTML = "";
        Object.entries(carrinho).forEach(([nome, qtd]) => {
            if (qtd > 0) {
                const produto = todosProdutos.find(item => item.nome === nome);
                if (produto) {
                    const itemTotal = qtd * produto.preco;
                    const itemHtml = `
                        <div>
                            <p>${produto.nome} (x${qtd})</p>
                            <p>R$ ${(itemTotal).toFixed(2)}</p>
                        </div>
                    `;
                    itensPedidoDiv.innerHTML += itemHtml;
                }
            }
        });

        document.getElementById("modo-entrega").textContent = `Modo de entrega: ${modoEntrega}`;
        document.getElementById("taxa-entrega").textContent = `Taxa de entrega: R$ ${taxaEntrega.toFixed(2)}`;
        document.getElementById("preco-total").textContent = `Preço total: R$ ${precoFinal.toFixed(2)}`;

        formContainer.style.display = "none";
        document.getElementById("resumo-pedido").style.display = "flex";
        botoesDiv.style.marginTop = "30px";

        localStorage.setItem("resumoPedido", JSON.stringify({
            precoTotal: precoFinal,
            modoEntrega: modoEntrega
        }));
    });
}

entregaBtn.addEventListener("click", () => criarFormulario("entrega"));
retiradaBtn.addEventListener("click", () => criarFormulario("retirada"));




