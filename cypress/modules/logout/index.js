/// <reference types="cypress" />

function logout() {
    cy.contains('.shop-menu a', 'Logged in as testevaldo', {timeout: 10000}).should('be.visible');
    cy.get('li a[href="/logout"]').click();
};

module.exports = {
    logout
}