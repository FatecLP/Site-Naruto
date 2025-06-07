function mostrarPopup(mensagem) {
    const popup = document.createElement('div'); // cria um elemento div para o popup
    popup.textContent = mensagem;
    popup.style.position = 'fixed';
    popup.style.bottom = '30px';
    popup.style.right = '30px';
    popup.style.background = 'rgba(40,40,40,0.95)';
    popup.style.color = '#fff';
    popup.style.padding = '16px 28px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
    popup.style.fontSize = '1.1rem';
    popup.style.zIndex = '9999';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.4s, transform 0.4s';
    popup.style.transform = 'translateY(30px)';
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)'; // animação de entrada
    }, 10);

    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(30px)'; // animação de saída
        setTimeout(() => {
            popup.remove();
        }, 400);
    }, 2000);
}

function adicionarCarrinho() {
    const botoes = document.getElementsByClassName('btn btn-primary'); // seleciona os botões de adicionar ao carrinho
    const botoesArray = Array.from(botoes); // converte a coleção HTML em um array (para iterar)
    botoesArray.forEach(botao => {
        // substitui o botão atual por uma cópia dele mesmo, pois o evento de clique não é mantido
        botao.replaceWith(botao.cloneNode(true));
    });
    const novosBotoes = document.getElementsByClassName('btn btn-primary'); // seleciona novamente os botões, agora com os eventos de clique mantidos
    Array.from(novosBotoes).forEach(botao => {
        botao.addEventListener('click', function() {
            const divProduto = this.closest('.card'); // encontra o elemento pai mais próximo com a classe 'card'
            if (divProduto) {
                const imagem = divProduto.querySelector('.card-img-top');
                const nome = divProduto.querySelector('.card-title');
                const valor = divProduto.querySelector('.card-text');
                if (imagem && nome && valor) {
                    const imagemSrc = imagem.src;
                    const nomeContent = nome.textContent;
                    const valorContent = valor.textContent;

                    let carrinho = JSON.parse(localStorage.getItem('carrinhoDados')) || []; // recupera o carrinho do localStorage ou inicializa como um array vazio

                    const index = carrinho.findIndex(
                        item => item.nome === nomeContent && item.valor === valorContent // verifica se o item já existe no carrinho
                    );

                    if (index !== -1) {
                        carrinho[index].qtd = (carrinho[index].qtd || 1) + 1; // se já existe, incrementa a quantidade
                    } else {
                        carrinho.push({ // se não, adiciona um novo item
                            img: imagemSrc,
                            nome: nomeContent,
                            valor: valorContent,
                            qtd: 1
                        });
                    }

                    localStorage.setItem('carrinhoDados', JSON.stringify(carrinho));
                    mostrarPopup(`"${nomeContent}" adicionado ao carrinho!`);
                } else {
                    console.error('não foram encontradas os atributos dos elementos.');
                }
            } else {
                console.error('não foi encontrada a divProduto.');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    adicionarCarrinho();
});

// expondo as funções para que possam ser usadas em outros scripts
window.adicionarCarrinho = adicionarCarrinho;
window.mostrarPopup = mostrarPopup;