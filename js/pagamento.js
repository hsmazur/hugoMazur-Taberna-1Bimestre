document.addEventListener('DOMContentLoaded', () => {
    const total = localStorage.getItem('valorTotal');
    document.getElementById('valor-total').textContent = total ? `Total: R$ ${parseFloat(total).toFixed(2)}` : 'Valor não disponível';

    const opcoes = document.querySelectorAll('input[name="pagamento"]');
    const formularios = {
        dinheiro: criarFormularioDinheiro(),
        pix: criarFormularioPix(),
        debito: criarFormularioDebito(),
        local: criarFormularioLocal()
    };

    const container = document.getElementById('opcoes-pagamento');

    const areaFormularios = document.createElement('div');
    areaFormularios.id = 'area-formularios';
    container.after(areaFormularios);

    opcoes.forEach(opcao => {
        opcao.addEventListener('change', () => {
            areaFormularios.innerHTML = '';
            const escolhido = opcao.value;
            if (formularios[escolhido]) {
                areaFormularios.appendChild(formularios[escolhido]);
            }
        });
    });
});

function criarBotaoVoltarConfirmar() {
    const botoes = document.createElement('div');
    botoes.classList.add('botoes-final');

    const btnVoltar = document.createElement('a');
    btnVoltar.href = "carrinho.html";
    btnVoltar.textContent = "Voltar";
    btnVoltar.classList.add('botao_carrinho');

    const btnConfirmar = document.createElement('button');
    btnConfirmar.textContent = "Confirmar";
    btnConfirmar.classList.add('botao_confirmar');

    btnConfirmar.addEventListener('click', (event) => {
        event.preventDefault();  // Impede o comportamento padrão, como a navegação
        alert('Pedido confirmado!');
    });

    botoes.appendChild(btnVoltar);
    botoes.appendChild(btnConfirmar);
    return botoes;
}

function criarFormularioDinheiro() {
    const div = document.createElement('div');
    div.classList.add('formulario');

    const pergunta = document.createElement('p');
    pergunta.textContent = 'Precisa de troco?';

    const sim = document.createElement('input');
    sim.type = 'radio';
    sim.name = 'troco';
    sim.id = 'troco-sim';

    const simLabel = document.createElement('label');
    simLabel.textContent = 'Sim';

    const nao = document.createElement('input');
    nao.type = 'radio';
    nao.name = 'troco';
    nao.id = 'troco-nao';

    const naoLabel = document.createElement('label');
    naoLabel.textContent = 'Não';

    const inputTroco = document.createElement('input');
    inputTroco.type = 'number';
    inputTroco.placeholder = 'Troco para quanto?';
    inputTroco.style.display = 'none';

    sim.addEventListener('change', () => {
        inputTroco.style.display = 'block';
    });

    nao.addEventListener('change', () => {
        inputTroco.style.display = 'none';
    });

    div.appendChild(pergunta);
    div.appendChild(sim); div.appendChild(simLabel);
    div.appendChild(nao); div.appendChild(naoLabel);
    div.appendChild(inputTroco);
    div.appendChild(criarBotaoVoltarConfirmar());
    return div;
}

function criarFormularioPix() {
    const div = document.createElement('div');
    div.classList.add('formulario');

    const chave = document.createElement('p');
    chave.textContent = 'Chave Pix: taverna@gmail.com';

    const btnQR = document.createElement('button');
    btnQR.textContent = 'Gerar QR Code';

    const img = document.createElement('img');
    img.src = 'img/qrcode.png';
    img.alt = 'QR Code';
    img.style.display = 'none';
    img.style.maxWidth = '200px';
    img.style.margin = '10px 0';

    btnQR.addEventListener('click', () => {
        img.style.display = 'block';
    });

    div.appendChild(chave);
    div.appendChild(btnQR);
    div.appendChild(img);
    div.appendChild(criarBotaoVoltarConfirmar());
    return div;
}

function criarFormularioDebito() {
    const div = document.createElement('div');
    div.classList.add('formulario');

    const num = document.createElement('input');
    num.type = 'text';
    num.placeholder = 'Número do Cartão';

    const validade = document.createElement('input');
    validade.type = 'text';
    validade.placeholder = 'Validade (MM/AA)';

    const cvc = document.createElement('input');
    cvc.type = 'text';
    cvc.placeholder = 'CVC';

    div.appendChild(num);
    div.appendChild(validade);
    div.appendChild(cvc);
    div.appendChild(criarBotaoVoltarConfirmar());
    return div;
}

function criarFormularioLocal() {
    const div = document.createElement('div');
    div.classList.add('formulario');

    const aviso = document.createElement('p');
    aviso.textContent = 'O pagamento será feito presencialmente no balcão da Taberna.';

    div.appendChild(aviso);
    div.appendChild(criarBotaoVoltarConfirmar());
    return div;
}
