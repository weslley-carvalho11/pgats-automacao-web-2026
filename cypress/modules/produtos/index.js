/// <reference types="cypress"/>

function visitarTelaDeProduto() {
    cy.visit('/products');
    cy.url().should('eq', 'https://automationexercise.com/products');
};

function selecionarPrimeiroProduto() {
    cy.get('div[class="choose"] ul li a').first().click();
};

function pesquisar (produto){
    cy.get('#search_product').type(produto);
    cy.get('#submit_search').click();
    cy.get('.product-image-wrapper', {timeout: 10000}).should('have.length', 1);
};

module.exports = {
    visitarTelaDeProduto,
    selecionarPrimeiroProduto,
    pesquisar
};

