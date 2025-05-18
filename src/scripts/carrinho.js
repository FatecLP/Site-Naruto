const botoes = document.getElementsByClassName('btn btn-primary') // seleciona todos os botões com a classe 'btn btn-primary'
const botoesArray = Array.from(botoes) // converte a coleção HTML em um array

function adicionarCarrinho() {
    botoesArray.forEach(botao => { // percorre todos os botões
        botao.addEventListener('click', function() { // adiciona o evento de click no botão
            const divProduto = this.closest('.card') // procura o elemento pai mais próximo com a classe card
            if (divProduto) {
                const imagem = divProduto.querySelector('.card-img-top')
                const nome = divProduto.querySelector('.card-title')
                const valor = divProduto.querySelector('.card-text')
                if (imagem && nome && valor) {
                    const imagemSrc = imagem.src
                    const nomeContent = nome.textContent
                    const valorContent = valor.textContent

                    let carrinho = JSON.parse(localStorage.getItem('carrinhoDados')) || []

                    // verifica se o produto já existe no carrinho
                    const index = carrinho.findIndex( // procura o índice do produto no carrinho
                        item => item.nome === nomeContent && item.valor === valorContent // se o nome e valor do produto são iguais
                    );

                    if (index !== -1) { // se o produto já existe no carrinho
                        carrinho[index].qtd = (carrinho[index].qtd || 1) + 1; // incrementa a quantidade
                    } else { // se o produto não existe no carrinho
                        // adiciona o produto ao carrinho
                        carrinho.push({
                            img: imagemSrc,
                            nome: nomeContent,
                            valor: valorContent,
                            qtd: 1 // adiciona o produto ao carrinho com quantidade 1
                        });
                    }

                    localStorage.setItem('carrinhoDados', JSON.stringify(carrinho));
                }
                else {
                    console.error('não foram encontradas os atributos dos elementos.')
                }
            } else {
                console.error('não foi encontrada a divProduto.')
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    adicionarCarrinho();
});