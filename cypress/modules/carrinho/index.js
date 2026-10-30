/// <reference types="cypress"/>

function adicionarNoCarrinho() {
    cy.get('.single-products a i').first().click();
    cy.get('.text-center a[href="/view_cart"]').click();
};

function visitarTelaDeCarrinho() {
    cy.visit('/view_cart', { timeout: 20000 });
    cy.url().should('include', '/view_cart');
};

function fazerProcessoDeCheckout() {
    cy.contains('#do_action a', 'Proceed To Checkout').click();
};

function fazerLoginAposAdicionarNoCarrinho() {
    cy.get('.text-center a[href="/login"]').click();
};

function fazerPedido() {

    cy.get('a[href="/payment"]').click();
    cy.url().should('include', '/payment');
    cy.get('[data-qa="name-on-card"]').should('be.visible');
};

module.exports = {
    adicionarNoCarrinho,
    visitarTelaDeCarrinho,
    fazerProcessoDeCheckout,
    fazerLoginAposAdicionarNoCarrinho,
    fazerPedido
}