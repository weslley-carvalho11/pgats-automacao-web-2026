function visitarTelaDeCadastro() {
    cy.visit('/login');
}

function iniciarCadastro(signupName, email) {
    cy.get('[data-qa="signup-name"]').type(signupName);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
}

function preencherCadastro(
    genero, 
    senha, 
    diaNascimento, 
    mesNascimento, 
    anoNascimento, 
    primeiroNome, 
    sobrenome, 
    empresa, 
    rua, 
    pais, 
    estado, 
    cidade, 
    zipCode, 
    numeroDeTelefone) {

    const generoFormatado = genero.toLowerCase();
    const selecionarGenero = (
        generoFormatado === 'homem' || 
        generoFormatado === 'male' || 
        generoFormatado === 'mr') ? '#id_gender1' : '#id_gender2';
    
    cy.get(selecionarGenero).check();
    cy.get('[data-qa="password"]').type(senha);
    cy.get('[data-qa="days"]').select(diaNascimento);
    cy.get('[data-qa="months"]').select(mesNascimento);
    cy.get('[data-qa="years"]').select(anoNascimento);
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type(primeiroNome);
    cy.get('[data-qa="last_name"]').type(sobrenome);
    cy.get('[data-qa="company"]').type(empresa);
    cy.get('[data-qa="address"]').type(rua);
    cy.get('[data-qa="country"]').select(pais);
    cy.get('[data-qa="state"]').type(estado);
    cy.get('[data-qa="city"]').type(cidade);
    cy.get('[data-qa="zipcode"]').type(zipCode);
    cy.get('[data-qa="mobile_number"]').type(numeroDeTelefone);

    cy.get('[data-qa="create-account"]').click();
}

module.exports = {
    visitarTelaDeCadastro,
    iniciarCadastro,
    preencherCadastro
}