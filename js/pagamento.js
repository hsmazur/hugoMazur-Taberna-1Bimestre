document.addEventListener('DOMContentLoaded', () => {
    // Mostra valor total
    const total = localStorage.getItem('valorTotal');
    document.getElementById('valor-total').textContent = total ? `Total: R$ ${parseFloat(total).toFixed(2)}` : 'Valor não disponível';

    // Referências aos elementos
    const opcoes = document.querySelectorAll('input[name="pagamento"]');
    const areaFormularios = document.getElementById('area-formularios');

    // Templates dos formulários
    const formularios = {
        dinheiro: `
            <div class="formulario">
                <p>Valor a pagar: <span>${total ? `R$ ${parseFloat(total).toFixed(2)}` : ''}</span></p>
                <p>Precisa de troco?</p>
                <label><input type="radio" name="troco" value="sim"> Sim</label>
                <label><input type="radio" name="troco" value="nao"> Não</label>
                <input type="number" id="valor-troco" placeholder="Troco para quanto?" style="display:none;">
                ${criarBotoes()}
            </div>
        `,
        pix: `
            <div class="formulario">
                <p>Valor a pagar: <span>${total ? `R$ ${parseFloat(total).toFixed(2)}` : ''}</span></p>
                <p>Chave Pix: <strong>taverna@gmail.com</strong></p>
                <button id="gerar-qrcode">Gerar QR Code</button>
                <img id="qr-code" src="img/qrcode.png" alt="QR Code" style="display: none; width: 200px; margin-top: 10px;">
                <p>Após o pagamento, clique em confirmar.</p>
                ${criarBotoes()}
            </div>
        `,
        debito: `
            <div class="formulario">
                <p>Valor a pagar: <span>${total ? `R$ ${parseFloat(total).toFixed(2)}` : ''}</span></p>
                <input type="text" id="numero-cartao" placeholder="XXXX XXXX XXXX XXXX" maxlength="19">
                <input type="text" id="validade-cartao" placeholder="MM/AA" maxlength="5">
                <input type="text" id="cvc-cartao" placeholder="XXX" maxlength="3">
                ${criarBotoes()}
            </div>
        `
    };

    // Event listeners para as opções de pagamento
    opcoes.forEach(opcao => {
        opcao.addEventListener('change', () => {
            const escolhido = opcao.value;
            areaFormularios.innerHTML = formularios[escolhido];
            configurarEventosFormulario(escolhido);
        });
    });

    // Função auxiliar para criar os botões
    function criarBotoes() {
        return `
            <div class="botoes-final">
                <a href="carrinho.html" class="botao_carrinho">Voltar</a>
                <button class="botao_confirmar">Confirmar</button>
            </div>
        `;
    }

    // Configura eventos específicos de cada formulário
    function configurarEventosFormulario(tipo) {
        if (tipo === 'dinheiro') {
            document.querySelector('input[name="troco"][value="sim"]')
                .addEventListener('change', () => {
                    document.getElementById('valor-troco').style.display = 'block';
                });
            document.querySelector('input[name="troco"][value="nao"]')
                .addEventListener('change', () => {
                    document.getElementById('valor-troco').style.display = 'none';
                });
        }
        else if (tipo === 'pix') {
            document.getElementById('gerar-qrcode')?.addEventListener('click', () => {
                const qrCode = document.getElementById('qr-code');
                if (qrCode) qrCode.style.display = 'block';
            });
        }
        else if (tipo === 'debito') {
            // Formatação do número do cartão (4444 4444 4444 4444)
            document.getElementById('numero-cartao')?.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
                let formatted = '';
                
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) formatted += ' ';
                    formatted += value[i];
                }
                
                e.target.value = formatted.substring(0, 19);
            });

            // Formatação da validade (MM/AA)
            document.getElementById('validade-cartao')?.addEventListener('input', function(e) {
                let value = e.target.value.replace(/[^0-9]/g, '');
                
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                
                e.target.value = value.substring(0, 5);
            });

            // Validação do CVC
            document.getElementById('cvc-cartao')?.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 3);
            });
        }

        // Evento do botão Confirmar (para todos os formulários)
        document.querySelector('.botao_confirmar')?.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Validações adicionais podem ser adicionadas aqui
            if (tipo === 'debito') {
                const numeroCartao = document.getElementById('numero-cartao')?.value.replace(/\s/g, '');
                const validade = document.getElementById('validade-cartao')?.value;
                const cvc = document.getElementById('cvc-cartao')?.value;
                
                if (!numeroCartao || numeroCartao.length < 16) {
                    alert('Por favor, insira um número de cartão válido');
                    return;
                }
                
                if (!validade || validade.length < 5) {
                    alert('Por favor, insira uma data de validade válida');
                    return;
                }
                
                if (!cvc || cvc.length < 3) {
                    alert('Por favor, insira um CVC válido');
                    return;
                }
            }
            
            alert('Pedido confirmado!');
            window.location.href = 'index.html';
        });
    }
});