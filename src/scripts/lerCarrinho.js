function estaLogado() {
    return !!sessionStorage.getItem("usuario"); // false se não estiver logado
}

document.addEventListener('DOMContentLoaded', function() {
    const user = sessionStorage.getItem('usuario') || 'usuário';
    document.getElementById("nome-usuario").innerText = user;
    
    const lista = document.getElementById('lista-carrinho'); // seleciona o elemento onde os produtos do carrinho serão exibidos
    const carrinho = JSON.parse(localStorage.getItem('carrinhoDados')) || [];

    if (carrinho.length === 0) {
        lista.innerHTML = '<p style="color: white;">O carrinho está vazio.</p>';
        return;
    }

    let html = '<h2 style="color: white;">Produtos no Carrinho</h2><div class="row">';
    carrinho.forEach((produto, idx) => { // percorre todos os produtos do carrinho
        // adiciona o HTML para cada produto
        html += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card mb-3">
                    <img src="${produto.img}" class="card-img-top" alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">${produto.valor}</p>
                        <div class="qtd-container" style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;">
                            <button class="btn btn-diminuir" data-idx="${idx}">-</button>
                            <span class="qtd-span" id="qtd-span-${idx}">${produto.qtd || 1}</span>
                            <button class="btn btn-aumentar" data-idx="${idx}">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    lista.innerHTML = html; // insere o HTML gerado na lista

    // calcula o total
    const total = carrinho.reduce((acc, produto) => {
        const valor = parseFloat(produto.valor.replace('R$', '').replace(',', '.')); // remove o R$ e substitui a vírgula por ponto
        return acc + (valor * (produto.qtd || 1)); // calcula o total
    }, 0);

    // exibe o total
    const totalElement = document.createElement('div'); // cria um elemento div para o total
    totalElement.classList.add('total'); // adiciona a classe total
    totalElement.style.textAlign = 'center'; // centraliza o texto
    totalElement.innerHTML = `
            <h3>Total: R$ ${total
                .toFixed(2)
                .replace(".", ",")}
            </h3>
            <h4>Métodos de pagamento:</h4>
            <form>
                <label>
                    <input type="radio" name="pagamento">
                    <img src="https://img.icons8.com/?size=100&id=Dk4sj0EM4b20&format=png&color=000000">
                </label>
                <label>
                    <input type="radio" name="pagamento">
                    <img src="https://cdn-icons-png.flaticon.com/512/893/893081.png">
                </label>
                <label>
                    <input type="radio" name="pagamento">
                    <img src="https://logodownload.org/wp-content/uploads/2019/09/boleto-logo.png">
                </label>
            </form>
            `; // formata o total para duas casas decimais e substitui o ponto por vírgula
    totalElement.style.marginTop = '20px'; // adiciona uma margem superior
    lista.appendChild(totalElement); // adiciona o total ao final da lista

    // container para os botões
    const botoesContainer = document.createElement('div');
    botoesContainer.className = 'botoes-carrinho';

    // finalizar compra
    const botaoFinalizar = document.createElement('button'); // cria um botão para finalizar a compra
    botaoFinalizar.innerHTML = 'Finalizar Compra'; // define o texto do botão
    botaoFinalizar.classList.add('btn', 'btn-success'); // adiciona as classes btn e btn-success
    botaoFinalizar.addEventListener('click', function(e) {
        // verifica se algum método de pagamento foi selecionado
        const metodoSelecionado = document.querySelector('input[name="pagamento"]:checked');
        if (!metodoSelecionado) {
            e.preventDefault(); // impede o comportamento padrão
            if (window.mostrarPopup) {
                window.mostrarPopup('Selecione uma forma de pagamento!');
            } else {
                alert('Selecione uma forma de pagamento!');
            }
            return;
        }
        if (estaLogado()) { 
            alert('Compra finalizada com sucesso!');
            localStorage.removeItem('carrinhoDados'); // limpa o carrinho
            location.reload(); // recarrega a página para atualizar a lista
        } else {
            alert('Você precisa estar logado para finalizar a compra!');
            window.location.href = "../pages/login.html"; // redireciona para a página de login
        }
    });
    botoesContainer.appendChild(botaoFinalizar);

    // adicionar evento para popup ao selecionar método de pagamento
    setTimeout(() => {
        const radiosPagamento = document.querySelectorAll('input[name="pagamento"]');
        radiosPagamento.forEach((radio, idx) => {
            radio.onclick = function() {
                if (window.mostrarPopup) {
                    if (idx === 0) window.mostrarPopup('Método selecionado: Pix');
                    else if (idx === 1) window.mostrarPopup('Método selecionado: Cartão');
                    else if (idx === 2) window.mostrarPopup('Método selecionado: Boleto');
                }
            };
        });
    }, 0);

    // limpar carrinho
    const botaoLimpar = document.createElement('button'); // cria um botão para limpar o carrinho
    botaoLimpar.innerHTML = 'Limpar Carrinho'; // define o texto do botão
    botaoLimpar.classList.add('btn', 'btn-danger'); // adiciona as classes btn e btn-danger
    botaoLimpar.addEventListener('click', function() { // adiciona o evento de click no botão
        localStorage.removeItem('carrinhoDados'); // remove os dados do carrinho do localStorage
        location.reload();
    });
    botoesContainer.appendChild(botaoLimpar);

    lista.appendChild(botoesContainer);

    // adiciona eventos para os botões de aumentar/diminuir quantidade
    setTimeout(() => {
        const botoesAumentar = document.querySelectorAll('.btn-aumentar');
        const botoesDiminuir = document.querySelectorAll('.btn-diminuir');
        botoesAumentar.forEach(btn => {
            btn.onclick = function(e) {
                e.preventDefault();
                const idx = parseInt(this.getAttribute('data-idx')); // obtém o índice do produto
                let carrinho = JSON.parse(localStorage.getItem('carrinhoDados')) || [];
                if (carrinho[idx]) { // verifica se o item existe no carrinho
                    carrinho[idx].qtd = (carrinho[idx].qtd || 1) + 1;
                    localStorage.setItem('carrinhoDados', JSON.stringify(carrinho));
                    document.getElementById('qtd-span-' + idx).textContent = carrinho[idx].qtd; // atualiza o span de quantidade
                    atualizarTotal();
                    if (window.mostrarPopup) {
                        window.mostrarPopup(`Item adicionado: ${carrinho[idx].nome}`);
                    }
                }
            };
        });
        botoesDiminuir.forEach(btn => {
            btn.onclick = function(e) {
                e.preventDefault();
                let carrinho = JSON.parse(localStorage.getItem('carrinhoDados')) || [];
                const span = this.parentElement.querySelector('.qtd-span');
                const nome = this.closest('.card').querySelector('.card-title').textContent;
                const valor = this.closest('.card').querySelector('.card-text').textContent;
                const realIdx = carrinho.findIndex(item => item.nome === nome && item.valor === valor); // encontra o índice real do item no carrinho
                if (realIdx !== -1) { // verifica se o item existe no carrinho
                    carrinho[realIdx].qtd = (carrinho[realIdx].qtd || 1) - 1;
                    if (carrinho[realIdx].qtd <= 0) { // se a quantidade for menor ou igual a zero, remove o item do carrinho
                        const nomeRemovido = carrinho[realIdx].nome;
                        carrinho.splice(realIdx, 1);
                        localStorage.setItem('carrinhoDados', JSON.stringify(carrinho));
                        this.closest('.col-12').remove();
                        atualizarTotal();
                        if (window.mostrarPopup) {
                            window.mostrarPopup(`Item removido: ${nomeRemovido}`);
                        }
                        return;
                    } else { // se a quantidade for maior que zero, atualiza o carrinho
                        localStorage.setItem('carrinhoDados', JSON.stringify(carrinho));
                        span.textContent = carrinho[realIdx].qtd;
                        atualizarTotal();
                        if (window.mostrarPopup) {
                            window.mostrarPopup(`Item removido: ${carrinho[realIdx].nome}`);
                        }
                    }
                }
            };
        });

        // função para atualizar o total
        function atualizarTotal() {
            let carrinho = JSON.parse(localStorage.getItem('carrinhoDados')) || [];
            if (carrinho.length === 0) {
                lista.innerHTML = '<p style="color: white;">O carrinho está vazio.</p>';
                return;
            }
            const total = carrinho.reduce((acc, produto) => {
                const valor = parseFloat(produto.valor.replace('R$', '').replace(',', '.'));
                return acc + (valor * (produto.qtd || 1)); // calcula o total
            }, 0);
            const totalH3 = document.querySelector('.total h3');
            if (totalH3) {
                // efeito de dissolver
                totalH3.style.transition = 'opacity 0.3s';
                totalH3.style.opacity = '0';
                setTimeout(() => {
                    totalH3.innerHTML = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
                    totalH3.style.opacity = '1';
                }, 300);
            }
        }
    }, 0);
});