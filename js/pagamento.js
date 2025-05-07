/**
 * Configura o sistema de pagamento na página
 */
function configurarPagamento() {
    // Mostra valor total
    const total = localStorage.getItem('valorTotal');
    document.getElementById('valor-total').textContent = total ? 
        `Total: R$ ${parseFloat(total).toFixed(2)}` : 'Valor não disponível';

    // Referências aos elementos
    const opcoesPagamento = document.querySelectorAll('input[name="pagamento"]');
    const areaFormularios = document.getElementById('area-formularios');

    // Event listeners para as opções de pagamento
    opcoesPagamento.forEach(opcao => {
        opcao.onchange = () => mostrarFormularioPagamento(opcao.value);
    });

    // Mostra o formulário inicial se já houver uma opção selecionada
    const opcaoSelecionada = document.querySelector('input[name="pagamento"]:checked');
    if (opcaoSelecionada) {
        mostrarFormularioPagamento(opcaoSelecionada.value);
    }
}

/**
 * Mostra o formulário de pagamento correspondente à opção selecionada
 * @param {string} tipoPagamento - Tipo de pagamento ('dinheiro', 'pix' ou 'debito')
 */
function mostrarFormularioPagamento(tipoPagamento) {
    const areaFormularios = document.getElementById('area-formularios');
    const total = localStorage.getItem('valorTotal');
    const valorFormatado = total ? `R$ ${parseFloat(total).toFixed(2)}` : '';

    // Templates dos formulários
    const formularios = {
        dinheiro: `
            <div class="formulario">
                <p>Valor a pagar: <span>${valorFormatado}</span></p>
                <p>Precisa de troco?</p>
                <label><input type="radio" name="troco" value="sim"> Sim</label>
                <label><input type="radio" name="troco" value="nao"> Não</label>
                <input type="number" id="valor-troco" placeholder="Troco para quanto?" style="display:none;">
                ${criarBotoesFormulario()}
            </div>
        `,
        pix: `
            <div class="formulario">
                <p>Valor a pagar: <span>${valorFormatado}</span></p>
                <p>Chave Pix: <strong>taverna@gmail.com</strong></p>
                <button id="gerar-qrcode">Gerar QR Code</button>
                <img id="qr-code" src="img/qrcode.png" alt="QR Code" style="display: none; width: 200px; margin-top: 10px;">
                <p>Após o pagamento, clique em confirmar.</p>
                ${criarBotoesFormulario()}
            </div>
        `,
        debito: `
            <div class="formulario">
                <p>Valor a pagar: <span>${valorFormatado}</span></p>
                <input type="text" id="numero-cartao" placeholder="XXXX XXXX XXXX XXXX" maxlength="19">
                <input type="text" id="validade-cartao" placeholder="MM/AA" maxlength="5">
                <input type="text" id="cvc-cartao" placeholder="XXX" maxlength="3">
                ${criarBotoesFormulario()}
            </div>
        `
    };

    areaFormularios.innerHTML = formularios[tipoPagamento];
    configurarEventosFormulario(tipoPagamento);
}

/**
 * Cria os botões padrão para os formulários
 * @returns {string} HTML dos botões
 */
function criarBotoesFormulario() {
    return `
        <div class="botoes-final">
            <a href="carrinho.html" class="botao_carrinho">Voltar</a>
            <button class="botao_confirmar">Confirmar</button>
        </div>
    `;
}

/**
 * Configura eventos específicos para cada tipo de formulário
 * @param {string} tipoPagamento - Tipo de pagamento selecionado
 */
function configurarEventosFormulario(tipoPagamento) {
    switch (tipoPagamento) {
        case 'dinheiro':
            configurarFormularioDinheiro();
            break;
        case 'pix':
            configurarFormularioPix();
            break;
        case 'debito':
            configurarFormularioDebito();
            break;
    }

    // Configura evento do botão Confirmar
    document.querySelector('.botao_confirmar').onclick = (event) => {
        event.preventDefault();
        if (validarFormulario(tipoPagamento)) {
            alert('Pedido confirmado!');
            window.location.href = 'index.html';
        }
    };
}

/**
 * Configura eventos específicos para o formulário de dinheiro
 */
function configurarFormularioDinheiro() {
    document.querySelector('input[name="troco"][value="sim"]').onchange = () => {
        document.getElementById('valor-troco').style.display = 'block';
    };
    
    document.querySelector('input[name="troco"][value="nao"]').onchange = () => {
        document.getElementById('valor-troco').style.display = 'none';
    };
}

/**
 * Configura eventos específicos para o formulário de PIX
 */
function configurarFormularioPix() {
    document.getElementById('gerar-qrcode').onclick = () => {
        document.getElementById('qr-code').style.display = 'block';
    };
}

/**
 * Configura eventos específicos para o formulário de débito
 */
function configurarFormularioDebito() {
    const numeroCartao = document.getElementById('numero-cartao');
    const validadeCartao = document.getElementById('validade-cartao');
    const cvcCartao = document.getElementById('cvc-cartao');

    // Formatação do número do cartão (4444 4444 4444 4444)
    numeroCartao.oninput = function(e) {
        e.target.value = formatarNumeroCartao(e.target.value);
    };

    // Formatação da validade (MM/AA)
    validadeCartao.oninput = function(e) {
        e.target.value = formatarValidadeCartao(e.target.value);
    };

    // Validação do CVC (apenas números, máximo 3 dígitos)
    cvcCartao.oninput = function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 3);
    };
}

/**
 * Formata o número do cartão (XXXX XXXX XXXX XXXX)
 * @param {string} value - Valor atual do campo
 * @returns {string} Valor formatado
 */
function formatarNumeroCartao(value) {
    return value.replace(/\s+/g, '')
                .replace(/[^0-9]/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim()
                .substring(0, 19);
}

/**
 * Formata a validade do cartão (MM/AA)
 * @param {string} value - Valor atual do campo
 * @returns {string} Valor formatado
 */
function formatarValidadeCartao(value) {
    return value.replace(/[^0-9]/g, '')
                .replace(/^(\d{2})/, '$1/')
                .substring(0, 5);
}

/**
 * Valida o formulário de acordo com o tipo de pagamento
 * @param {string} tipoPagamento - Tipo de pagamento selecionado
 * @returns {boolean} True se o formulário é válido
 */
function validarFormulario(tipoPagamento) {
    if (tipoPagamento === 'debito') {
        const numeroCartao = document.getElementById('numero-cartao').value.replace(/\s/g, '');
        const validade = document.getElementById('validade-cartao').value;
        const cvc = document.getElementById('cvc-cartao').value;
        
        if (!numeroCartao || numeroCartao.length < 16) {
            alert('Por favor, insira um número de cartão válido');
            return false;
        }
        
        if (!validade || validade.length < 5) {
            alert('Por favor, insira uma data de validade válida');
            return false;
        }
        
        if (!cvc || cvc.length < 3) {
            alert('Por favor, insira um CVC válido');
            return false;
        }
    }
    
    return true;
}

// Inicializa o sistema de pagamento quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', configurarPagamento);