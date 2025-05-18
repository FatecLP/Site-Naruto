if (!localStorage.getItem("bancodedados")) {
  data_base();
}

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
    if (mail == dados[i].email && sn == String(dados[i].senha)){
      sessionStorage.setItem("usuario", dados[i].usuario);
      window.location.href = "carrinho.html";
      return
    }
  }
  alert("E-mail ou senha incorretos!");
}

function logado(){
    const user = sessionStorage.getItem("usuario")
    document.querySelector("#nome-usuario").innerHTML = user
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('login.html')) {
      const usuario = sessionStorage.getItem("usuario");
      if (usuario) {
          const main = document.querySelector('main');
          if (main) {
              main.innerHTML = `
                  <div class="alert alert-info" style="margin-top:40px;">
                      Você já está logado como <strong>${usuario}</strong>.<br>
                      <button id="logoutBtn" class="btn btn-danger" style="margin-top:10px;">Fazer logout</button>
                  </div>
              `;
              document.getElementById('logoutBtn').onclick = function() {
                  sessionStorage.removeItem("usuario");
                  window.location.reload();
              }
          }
      }
    }
});