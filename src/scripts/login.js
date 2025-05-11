function data_base() {
  let db = [
    { id: 1, usuario: "Konan", email: "konan@mail", senha: 1234 },
    { id: 2, usuario: "Pain", email: "pain@mail", senha: 1212 },
    { id: 3, usuario: "Itachi", email: "itachi@mail", senha: 1111 },
  ];
  let json = JSON.stringify(db);
  localStorage.setItem("bancodedados", json);
}
function logar(event){
  event.preventDefault()
  let mail = document.querySelector("#email").value;
  let sn = document.querySelector("#senha").value;
  let dados = JSON.parse(localStorage.getItem("bancodedados"));
  for (let i = 0; i < dados.length; i++) {
    if (mail == dados[i].email && sn == dados[i].senha){
      window.location.href = "carrinho.html";
      sessionStorage.setItem("usuario", dados[i].usuario)
    }
  }
}
function logado(){
    const user = sessionStorage.getItem("usuario")
    document.querySelector("#nome-usuario").innerHTML = user
}