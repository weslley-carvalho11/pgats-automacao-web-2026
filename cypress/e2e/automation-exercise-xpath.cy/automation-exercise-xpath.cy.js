/// <reference types="cypress" />

require('cypress-xpath');

describe('Automation Exercise - Usando XPath', () => {

    it('deve cadastrar usuário com sucesso', () => {
        cy.visit('https://automationexercise.com/login')

        cy.xpath('//*[@data-qa="signup-name"]').type('Testevaldo');
        cy.xpath('//*[@data-qa="signup-email"]').type(`testevaldo${Date.now()}@email.com`);
        cy.xpath('//*[@data-qa="signup-button"]').click();

        cy.xpath('//*[@id="id_gender1"]').check();
        cy.xpath('//*[@data-qa="password"]').type('123456789');
        cy.xpath('//*[@data-qa="days"]').select('1');
        cy.xpath('//*[@data-qa="months"]').select('January');
        cy.xpath('//*[@data-qa="years"]').select('2000');
        cy.xpath('//*[@id="newsletter"]').check();
        cy.xpath('//*[@id="optin"]').check();
        cy.xpath('//*[@data-qa="first_name"]').type('Testevaldo');
        cy.xpath('//*[@data-qa="last_name"]').type('Silva');
        cy.xpath('//*[@data-qa="company"]').type('Testevaldo Corporation');
        cy.xpath('//*[@data-qa="address"]').type('Rua dos Bobos');
        cy.xpath('//*[@data-qa="country"]').select('United States');
        cy.xpath('//*[@data-qa="state"]').type('California');
        cy.xpath('//*[@data-qa="city"]').type('Los Angeles');
        cy.xpath('//*[@data-qa="zipcode"]').type('12345');
        cy.xpath('//*[@data-qa="mobile_number"]').type('99926091333');

        cy.xpath('//*[@data-qa="create-account"]').click();

        cy.xpath('//*[@data-qa="account-created"]').should('contain.text', 'Account Created!');
    });

    it('deve efetuar o login de usuário com e senha corretos', () => {
        cy.visit('https://automationexercise.com/login');

        cy.xpath('//*[@data-qa="login-email"]').type('testevaldo.principal@email.com');
        cy.xpath('//*[@data-qa="login-password"]').type('teste@valdo');

        cy.xpath('//*[@data-qa="login-button"]').click();

        // Substituído o .get().contains() por busca direta de texto no XPath
        cy.xpath('//*[contains(@class, "shop-menu")]//a[contains(., "Logged in as testevaldo")]')
          .should('be.visible');
    });

    it('deve efetuar o login de usuário com email e senha incorretos', () => {
        cy.visit('https://automationexercise.com/login');

        cy.xpath('//*[@data-qa="login-email"]').type('testevaldo.incorreto@email.com');
        cy.xpath('//*[@data-qa="login-password"]').type('teste@incorreto');
        cy.xpath('//*[@data-qa="login-button"]').click();

        cy.xpath('//form[@action="/login"]//p').should('contain.text', 'Your email or password is incorrect!');
    });

    it('deve efetuar o logout', () => {
        cy.visit('https://automationexercise.com/login');

        cy.xpath('//*[@data-qa="login-email"]').type('testevaldo.principal@email.com');
        cy.xpath('//*[@data-qa="login-password"]').type('teste@valdo');
        cy.xpath('//*[@data-qa="login-button"]').click();

        cy.xpath('//li//a[contains(., "Logout")]').click();

        cy.xpath('//li/a[@href="/login"]').should('contain.text', 'Signup / Login');
    });

    it('deve tentar cadastrar um usuário com e-mail já cadastrado', () => {
        cy.visit('https://automationexercise.com/login');

        cy.xpath('//*[@data-qa="signup-name"]').type('Testevaldo');
        cy.xpath('//*[@data-qa="signup-email"]').type('testevaldo.principal@email.com');
        cy.xpath('//*[@data-qa="signup-button"]').click();

        cy.xpath('//form[@action="/signup"]//p').should('contain.text', 'Email Address already exist!');
    });
});