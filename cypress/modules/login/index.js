/// <reference types="cypress" />

function visitarTelaDeLogin() {
    cy.visit('/login');
};

function fazerLogin(email, senha) {
    cy.intercept('POST', '**/login').as('requisicaoLogin');

    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha);

    cy.get('[data-qa="login-button"]').click();

    cy.wait('@requisicaoLogin', {timeout: 20000}).its('response.statusCode').should('eq', 302);
};

module.exports = {
    visitarTelaDeLogin,
    fazerLogin
}