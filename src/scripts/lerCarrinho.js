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
    carrinho.forEach(produto => { // percorre todos os produtos do carrinho
        // cria o HTML para cada produto
        html += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card mb-3">
                    <img src="${produto.img}" class="card-img-top" alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">${produto.valor}</p>
                        <p class="card-text"><strong>Quantidade:</strong> ${produto.qtd || 1}</p>
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
            <h3 style="color: white; margin-top: 40px;">Total: R$ ${total
                .toFixed(2)
                .replace(".", ",")}
            </h3>
            <h4 style="color: white; margin-top: 45px; font-size: 18px;">Métodos de pagamento:</h4>
            <form style="display: flex; gap: 2rem; justify-content: center; align-items: center; margin-top: 20px;">
    
                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="radio" name="pagamento" style="margin-right: 8px;">
                    <img src="https://img.icons8.com/?size=100&id=Dk4sj0EM4b20&format=png&color=000000" style="width: 44px; height: auto;">
                </label>

                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="radio" name="pagamento" style="margin-right: 8px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/893/893081.png" style="width: 50px; height: auto;">
                </label>

                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="radio" name="pagamento" style="margin-right: 8px;">
                    <img src="https://logodownload.org/wp-content/uploads/2019/09/boleto-logo.png" style="width: 50px; height: auto;">
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
});