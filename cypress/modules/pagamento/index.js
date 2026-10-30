/// <reference types="cypress"/>

function prencherFormaDePagemento(nomeCartao, numeroCartao, cvc, mesExpiracao, anoExpiracao) {
    cy.get('data-qa="name-on-card"').type(nomeCartao);
    cy.get('data-qa="card-number"').type(numeroCartao);
    cy.get('data-qa="cvc"').type(cvc);
    cy.get('data-qa="expiry-month"').select(mesExpiracao);
    cy.get('data-qa="expiry-year"').select(anoExpiracao);

    cy.get('data-qa="pay-button"').click();
};

module.exports = {
    prencherFormaDePagemento
};

