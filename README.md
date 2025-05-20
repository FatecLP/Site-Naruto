# Akatsuki's Shop - README

[![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)]()
[![GitHub last commit](https://img.shields.io/github/last-commit/FatecLP/Site-Naruto)]()

<img height="275rem" src="assets/img/Akatsuki.png">

## :busts_in_silhouette: Nomes dos Integrantes
- André Diogo Melchior da Silva
- Juan Pablo Firmino Ferreira
- Michael Akira de Lima Kuwahara
- Murilo de Oliveira Sartori
- Nickolas Lopes Araújo

## 🧑🏻 Professor
- PhD - Bruno Zolotareff dos Santos (DW-I: FATEC Diadema - Luigi Papaiz)

## 📝 Descrição do Projeto

**Akatsuki's Shop** é um e-commerce temático baseado na organização Akatsuki do anime Naruto. O site oferece diversos produtos inspirados nos personagens, incluindo acessórios, roupas e itens de colecionador. <br><br>
Para acessar o projeto online <strong>clique [AQUI](https://fateclp.github.io/Site-Naruto/index.html)</strong> :point_left:

## 💻 Tecnologias Utilizadas

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white)]()
[![JavaScript](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)]()
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)]()
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?logo=font-awesome&logoColor=white)]()

- **HTML5** - Estrutura de conteúdo do site
- **CSS3** - Folha de estillos para estilização do site
- **JavaScript** - Interatividade e JSON para armazenamento de dados
- **Bootstrap 5** - Framework para design e componentes responsivos
- **Font Awesome 6** - Biblioteca para Ícones
- **Google Fonts** - Fonte Knewave e Inter


## ✨ Funcionalidades

### 🛒 Carrinho de Compras
- Adição de produtos ao carrinho com popup animado de confirmação
- Carrinho persistente usando localStorage
- Produtos não se repetem: ao adicionar o mesmo produto, a quantidade é incrementada
- Visualização do carrinho com lista de produtos, imagem, nome, valor e quantidade
- Cálculo automático do valor total do carrinho
- Finalização de compra e limpar carrinho

### 👤 Sistema de Login
- Login com validação de usuário e senha (dados simulados em localStorage)
- SessionStorage para manter o usuário logado durante a navegação
- Logout disponível na página de login

### 🔒 Proteção de Ações
- Só é possível finalizar a compra se estiver logado (verificação automática)
- Redirecionamento para login caso tente finalizar compra sem autenticação

### 🔍 Navegação
- Barra de navegação responsiva
- Links para Home, Sobre Nós e Login
- Ícone de carrinho

### 🚀 Como Executar

Clone o repositório:
```bash
git clone https://github.com/FatecLP/Site-Naruto.git
```
Abra index.html no navegador

### 📚 Dependências

Adicionadas via CDN:
```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
```

### 📜 Licença

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE.txt) para detalhes.

**Nota:** Projeto educacional. Personagens pertencem a seus criadores.
