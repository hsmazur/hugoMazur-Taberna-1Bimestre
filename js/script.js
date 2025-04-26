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
const bebidas = [
    new Bebida("img/bebida1.png", "Hidromel do Rei", 500, 14.90),
    new Bebida("img/bebida2.png", "Poção de Energia", 300, 9.50),
    new Bebida("img/bebida3.png", "Cerveja Anã", 600, 12.00),
    new Bebida("img/bebida4.png", "Água Sagrada", 350, 6.00),
    new Bebida("img/bebida5.png", "Suco da Floresta", 400, 10.00), 
]

function exibirProdutos(lista) {
    const container = document.getElementById("produtosContainer");
    container.innerHTML = ""; 

    lista.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="card-info">
                <h3>${item.nome}</h3>
                <p>${item.ingredientes}</p>
            </div>
            <div class="card-preco">R$ ${item.preco.toFixed(2)}</div>
        `;

        container.appendChild(card);
    });
}
function exibirBebidas(lista) {
    const container = document.getElementById("bebidasContainer");
    container.innerHTML = ""; 

    lista.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="card-info">
                <h3>${item.nome}</h3>
                <p>${item.ml} ml</p>
            </div>
            <div class="card-preco">R$ ${item.preco.toFixed(2)}</div>
        `;

        container.appendChild(card);
    });
}

window.onload = () => {
    exibirProdutos(produtos);
    exibirBebidas(bebidas)
};
