const lista_produto = []
function add_cart(ind){
    const img = document.querySelectorAll('.card img')[ind].getAttribute('src')
    const nome_produto = document.querySelectorAll('.card .card-title')[ind].innerHTML
    const preco_produto = document.querySelectorAll('.card .card-text')[ind].innerHTML
    let produto = {id:ind, image:img, nome:nome_produto, preco:preco_produto}
    lista_produto.push(produto)
    const dados = JSON.stringify(lista_produto)
    sessionStorage.setItem('produtos', dados)
    
}

function show_products(){
    let elementos = JSON.parse(sessionStorage.getItem('produtos'))
    sessionStorage.setItem('dados_prod', elementos.image)
    let vitrine = document.querySelector('.show-products')
    console.log(elementos)

}
