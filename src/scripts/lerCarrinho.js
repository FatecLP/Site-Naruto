function estaLogado() {
    return !!sessionStorage.getItem("usuario"); // false se não estiver logado
}

document.addEventListener('DOMContentLoaded', function() {
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
    totalElement.innerHTML = `<h3 style="color: white;">Total: R$ ${total.toFixed(2).replace('.', ',')}</h3>`; // formata o total para duas casas decimais e substitui o ponto por vírgula
    totalElement.style.marginTop = '20px'; // adiciona uma margem superior
    lista.appendChild(totalElement); // adiciona o total ao final da lista

    // cria o botão de finalizar compra
    const botaoFinalizar = document.createElement('button'); // cria um botão para finalizar a compra
    botaoFinalizar.innerHTML = 'Finalizar Compra'; // define o texto do botão
    botaoFinalizar.classList.add('btn', 'btn-success'); // adiciona as classes btn e btn-success
    botaoFinalizar.addEventListener('click', function() {
        // verifica se ta logado
        if (estaLogado()) { 
            alert('Compra finalizada com sucesso!');
        } else {
            alert('Você precisa estar logado para finalizar a compra!');
            window.location.href = "../pages/login.html"; // redireciona para a página de login
        }
    });
    lista.appendChild(botaoFinalizar);

    // cria o botão de limpar carrinho
    const botaoLimpar = document.createElement('button'); // cria um botão para limpar o carrinho
    botaoLimpar.innerHTML = 'Limpar Carrinho'; // define o texto do botão
    botaoLimpar.classList.add('btn', 'btn-danger'); // adiciona as classes btn e btn-danger
    botaoLimpar.addEventListener('click', function() { // adiciona o evento de click no botão
        localStorage.removeItem('carrinhoDados'); // remove os dados do carrinho do localStorage
        location.reload(); // recarrega a página para atualizar a lista
    });
    lista.appendChild(botaoLimpar);
});