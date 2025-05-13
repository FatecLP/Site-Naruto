const botoes = document.getElementsByClassName('btn btn-primary')
const botoesArray = Array.from(botoes)

function adicionarCarrinho() {
    botoesArray.forEach(botao => {
        botao.addEventListener('click', function() {
            const divProduto = this.closest('.card')
            if (divProduto) {
                const imagem = divProduto.querySelector('.card-img-top')
                const nome = divProduto.querySelector('.card-title')
                const valor = divProduto.querySelector('.card-text')
                if (imagem && nome && valor) {
                    const imagemSrc = imagem.src
                    const nomeContent = nome.textContent
                    const valorContent = valor.textContent

                    const carrinhoStorage = {
                        img : imagemSrc,
                        nome : nomeContent,
                        valor : valorContent
                    };

                    let json = JSON.stringify(carrinhoStorage)

                    localStorage.setItem('carrinhoDados', json)
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