function carregarProdutos() {
    fetch('./assets/data/produtos.json') // requisita o json
        .then(resposta => resposta.json())
        .then(produtos => {
            const container = document.querySelector('.container .card-top'); // container principal
            const containerBottoms = document.querySelectorAll('.container .card-bottom'); // containers inferiores
            if (!container) return;

            // limpa os containers antes de adicionar novos produtos
            container.innerHTML = '';
            containerBottoms.forEach(c => c.innerHTML = '');

            for (let i = 0; i < produtos.length; i += 3) { // agrupa produtos em grupos de 3
                const grupo = produtos.slice(i, i + 3); // pega 3 produtos de cada vez
                let linha;
                if (i === 0) linha = container; // primeira linha vai no container principal
                else linha = containerBottoms[(i / 3) - 1]; // demais linhas vão nos containers inferiores
                if (!linha) continue;
                grupo.forEach((produto, idx) => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.style.width = '18rem';
                    card.innerHTML = `
                        <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}"/>
                        <div class="card-body">
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                            <button class="btn btn-primary">Adicionar ao carrinho</button>
                        </div>
                    `;
                    linha.appendChild(card); // adiciona o card ao container correspondente
                });
            }

            // carrossel
            const carouselInner = document.querySelector('#carousel1 .carousel-inner');
            if (carouselInner) {
                carouselInner.innerHTML = ''; // limpa o carrossel antes de adicionar novos itens
                produtos.slice(0, 3).forEach((produto, idx) => {
                    const item = document.createElement('div');
                    item.className = 'carousel-item' + (idx === 0 ? ' active' : '');
                    item.innerHTML = `
                      <div class="d-flex justify-content-center">
                        <div class="card" style="width: 18rem">
                          <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" />
                          <div class="card-body">
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                            <button class="btn btn-primary">Adicionar ao carrinho</button>
                          </div>
                        </div>
                      </div>
                    `;
                    carouselInner.appendChild(item); // adiciona o item ao carrossel
                });
            }

            if (window.adicionarCarrinho) window.adicionarCarrinho(); // chama a função para adicionar eventos aos botões de adicionar ao carrinho
        })
        .catch(e => {
            console.error('Erro ao carregar produtos:', e);
        });
}

document.addEventListener('DOMContentLoaded', carregarProdutos);