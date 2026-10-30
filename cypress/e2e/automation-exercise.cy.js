/// <reference types="cypress" />

const cadastro = require('../modules/cadastro/index.js');
const dadosCadastro = require('../fixtures/usuarioCadastrado.json');
const login = require('../modules/login/index.js');
const dadosUsuarioLogin = require('../fixtures/usuarioLogin.json');
const logout = require('../modules/logout/index.js');
const produtos = require('../modules/produtos/index.js');
const footer = require('../components/footer/index.js');
const carrinho = require('../modules/carrinho/index.js');
const pagamento = require('../modules/pagamento/index.js');
const dadosCartao = require('../fixtures/cartao.json');

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.intercept('GET', { hostname: 'pagead2.googlesyndication.com' }, { statusCode: 204, body: '' });
        cy.intercept('GET', { hostname: 'adtrafficquality.google' }, { statusCode: 204, body: '' });
    });

    it('ct1 - deve cadastrar usuário com sucesso', () => {
        cadastro.visitarTelaDeCadastro();

        const email = `${dadosCadastro.nome}${Date.now()}@email.com`
        cadastro.iniciarCadastro(dadosCadastro.nome, email);
        cadastro.preencherCadastro(
            dadosCadastro.genero,
            dadosCadastro.senha,
            dadosCadastro.diaNascimento,
            dadosCadastro.mesNascimento,
            dadosCadastro.anoNascimento,
            dadosCadastro.nome,
            dadosCadastro.sobrenome,
            dadosCadastro.empresa,
            dadosCadastro.rua,
            dadosCadastro.pais,
            dadosCadastro.estado,
            dadosCadastro.cidade,
            dadosCadastro.zipCode,
            dadosCadastro.numeroTelefone
        );

        cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
    });

    it('ct2 - deve efetuar o login de usuário com e senha corretos', () => {
        login.visitarTelaDeLogin();
        login.fazerLogin(dadosUsuarioLogin.valido.email, dadosUsuarioLogin.valido.senha);


        cy.contains('.shop-menu a', 'Logged in as testevaldo', { timeout: 10000 }).should('be.visible');
    });

    it('ct 3 - deve efetuar o login de usuário com email e senha incorretos', () => {
        login.visitarTelaDeLogin();
        login.fazerLogin(dadosUsuarioLogin.invalido.email, dadosUsuarioLogin.invalido.senha);

        cy.get('form[action="/login"] p').should('have.text', 'Your email or password is incorrect!');
    });

    it('ct 4 - deve efetuar o logout', () => {
        login.visitarTelaDeLogin();
        login.fazerLogin(dadosUsuarioLogin.valido.email, dadosUsuarioLogin.valido.senha);
        logout.logout();

        cy.get('li a[href="/login"]').should('have.text', ' Signup / Login');
    });

    it('ct 5 - deve tentar cadastrar um usuário com e-mail já cadastrado', () => {
        login.visitarTelaDeLogin();
        cadastro.iniciarCadastro(dadosCadastro.nome, dadosUsuarioLogin.valido.email);

        cy.get('form[action="/signup"]  p').should('have.text', 'Email Address already exist!');
    });

    it('ct 8 - deve mostrar os detalhes de um produto', () => {
        produtos.visitarTelaDeProduto();
        produtos.selecionarPrimeiroProduto();

        cy.get('div[class="product-information"] h2').should('have.text', 'Blue Top');
        cy.get('div[class="product-information"] p').should('include.text', 'Category: Women > Tops');
        cy.get('div[class="product-information"] span').should('include.text', 'Rs. 500');
        cy.get('div[class="product-information"] p').should('include.text', ' In Stock');
        cy.get('div[class="product-information"] p').should('include.text', ' New');
        cy.get('div[class="product-information"] p').should('include.text', ' Polo');
    });

    it('ct 9 - deve pesquisar o produto', () => {
        produtos.visitarTelaDeProduto();
        produtos.pesquisar('Sleeveless Unicorn Patch Gown - Pink');
        produtos.selecionarPrimeiroProduto();

        cy.get('div[class="product-information"] h2').should('have.text', 'Sleeveless Unicorn Patch Gown - Pink');
        cy.get('div[class="product-information"] p').should('include.text', 'Category: Kids > ');
        cy.get('div[class="product-information"] span').should('include.text', 'Rs. 1050');
        cy.get('div[class="product-information"] p').should('include.text', ' In Stock');
        cy.get('div[class="product-information"] p').should('include.text', ' New');
        cy.get('div[class="product-information"] p').should('include.text', 'Allen Solly Junior');
    });

    it('ct 10 - deve realizar a inscrição da página home', () => {
        login.visitarTelaDeLogin();
        footer.fazerInscrição(dadosUsuarioLogin.valido.email);

        cy.get('#success-subscribe')
            .should('be.visible')
            .and('contain', 'You have been successfully subscribed!');
    });

    it('ct 15 - deve fazer um pedido depois de fazer login', () => {
        produtos.visitarTelaDeProduto();
        produtos.pesquisar('Sleeveless Unicorn Patch Gown - Pink');
        carrinho.adicionarNoCarrinho();
        carrinho.fazerProcessoDeCheckout();
        carrinho.fazerLoginAposAdicionarNoCarrinho();
        login.fazerLogin(dadosCadastro.nome, dadosUsuarioLogin.valido.email);
        carrinho.visitarTelaDeCarrinho();
        carrinho.fazerProcessoDeCheckout();
        carrinho.fazerPedido();
        pagamento.prencherFormaDePagemento(
            dadosCartao.nomeCartao,
            dadosCartao.numeroCartao,
            dadosCartao.cvc,
            dadosCartao.mesExpiracao,
            dadosCartao.anoExpiracao
        );

        cy.contains('[data-qa="order-placed"]  b', 'Order Placed!').should('be.visible');
        cy.contains('.container p', 'Congratulations! Your order has been confirmed!').should('be.visible');
    });

    it('ct 16 - deve fazer um pedido antes de fazer login', () => {
        login.visitarTelaDeLogin();
        login.fazerLogin(dadosCadastro.nome, dadosUsuarioLogin.valido.email);
        produtos.visitarTelaDeProduto();
        produtos.pesquisar('Sleeveless Unicorn Patch Gown - Pink');
        produtos.selecionarPrimeiroProduto();
        carrinho.adicionarNoCarrinho();
        carrinho.fazerProcessoDeCheckout();
        carrinho.fazerPedido();
        pagamento.prencherFormaDePagemento(
            dadosCartao.nomeCartao,
            dadosCartao.numeroCartao,
            dadosCartao.cvc,
            dadosCartao.mesExpiracao,
            dadosCartao.anoExpiracao);

        cy.contains('[data-qa="order-placed"]  b', 'Order Placed!').should('be.visible');
        cy.contains('.container p', 'Congratulations! Your order has been confirmed!').should('be.visible');
    });

});