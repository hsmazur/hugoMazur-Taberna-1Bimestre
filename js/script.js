const produtos = [
    new Lanche("img/lanche1.jpg", "Burger do Camponês", "Pão rústico, hambúrguer bovino, queijo curado", 21.90),
    new Lanche("img/lanche2.jpg", "Burger do Cavaleiro", "Pão de cevada, hambúrguer duplo, bacon defumado, queijo da corte", 28.50),
    new Lanche("img/lanche3.jpg", "Burger da Donzela", "Pão de ervas, hambúrguer de frango grelhado, maionese de alho", 23.00),
    new Lanche("img/lanche4.jpg", "Burger do Bardo", "Pão doce, hambúrguer de cordeiro, geleia de cebola roxa", 26.90),
    new Lanche("img/lanche5.jpg", "Burger do Ferreiro", "Pão preto, hambúrguer robusto, queijo fundido, molho de pimenta", 29.00),
    new Lanche("img/lanche6.jpg", "Burger do Alquimista", "Pão de especiarias, hambúrguer vegetal, cogumelos mágicos, molho secreto", 25.50),
    new Lanche("img/lanche7.jpg", "Burger do Rei", "Pão dourado, hambúrguer de picanha, folhas nobres, queijo brie", 34.90),
    new Lanche("img/lanche8.png", "Burger do Dragão", "Pão de carvão, hambúrguer picante, queijo defumado, pimenta vermelha", 31.00),
    new Lanche("img/lanche9.jpg", "Burger do Monge", "Pão integral, hambúrguer de lentilha, alface romana, azeite sagrado", 22.00),
    new Lanche("img/lanche10.jpg", "Burger da Feiticeira", "Pão roxo, hambúrguer de grão-de-bico, molho de ervas místicas", 24.50),
    new Lanche("img/lanche11.jpg", "Burger do Arqueiro", "Pão de centeio, hambúrguer de javali, folhas frescas da floresta, queijo de cabra", 27.90),
    new Lanche("img/lanche12.jpg", "Burger do Necromante", "Pão escuro com carvão vegetal, hambúrguer de feijão preto, cebola roxa em conserva, molho sombrio de alho", 26.40)
];
const bebidas = [
    new Bebida("img/bebida1.jpg", "Hidromel do Rei", 500, 14.90),
    new Bebida("img/bebida2.jpg", "Poção de Energia", 300, 9.50),
    new Bebida("img/bebida3.jpg", "Cerveja Anã", 600, 12.00),
    new Bebida("img/bebida4.jpg", "Água Sagrada", 350, 6.00),
    new Bebida("img/bebida5.jpg", "Suco da Floresta", 400, 10.00), 
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
