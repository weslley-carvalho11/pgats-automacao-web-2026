/// <reference types="cypress" />

function fazerInscrição(email) {
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();

    cy.get('#success-subscribe')
        .invoke('removeClass', 'hide')
        .should('be.visible');
};

module.exports = {
    fazerInscrição
}