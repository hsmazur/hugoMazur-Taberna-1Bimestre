const produtos = [
    new Lanche("img/lanche1.jpg", "Dragão Burguer", "Pão, carne de dragão, queijo, alface", 29.90),
    new Lanche("img/lanche2.jpg", "Rei do Bacon", "Pão, hambúrguer duplo, bacon, cheddar", 34.50),
    new Bebida("img/suco1.jpg", "Suco de Frutas Élfico", 300, 9.99),
    new Bebida("img/cerveja.jpg", "Cerveja Anã", 500, 12.00),
    new Lanche("img/lanche3.jpg", "Místico Vegano", "Pão, falafel de grão de bico, molho especial", 27.00)
];

function exibirProdutos(lista) {
    const container = document.getElementById("produtos");

    lista.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="card-info">
                <h3>${item.nome}</h3>
                <p>${item instanceof Lanche ? item.ingredientes : item.ml + "ml"}</p>
            </div>
            <div class="card-preco">R$ ${item.preco.toFixed(2)}</div>
        `;

        container.appendChild(card);
    });
}

window.onload = () => {
    exibirProdutos(produtos);
};
