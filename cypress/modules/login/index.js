/// <reference types="cypress" />

function visitarTelaDeLogin() {
    cy.visit('/login');
};

function fazerLogin(email, senha) {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha);

    cy.get('[data-qa="login-button"]').click();
};

module.exports = {
    visitarTelaDeLogin,
    fazerLogin
}