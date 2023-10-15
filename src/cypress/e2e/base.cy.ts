/// <reference types="cypress" />

export const localUser = '22140ebd-0d06-46cd-8d44-aff5cb7e7101'
describe('Is Clean Slate working?', () => {
  it('Is Clean Slate working', () => {
    cy.visit('http://localhost:3000')
    cy.get('#token').type(localUser)
    cy.get('#login-button').click()

    // Add a log
    cy.get('#openModal').should('be.visible').click()
    cy.get('#StandardAdderSearchbar').should('be.visible').type('Sage')
    cy.get('#StandardAdderSearchResult-0').should('be.visible').click()
    cy.get('#StandardAdderMetaName').should('be.visible').contains('Sage')
    cy.get('#FractionInputInput').should('be.visible').type('100')
    cy.get('#SubmitButton')
      .should('be.visible')
      .should('have.class', 'success')
      .click()
    cy.get('#MetaItemName').should('contain', 'Sage')
    cy.get('.frc > img').click()

    // Add a custom food (Nutella) and log with the barcode
    cy.get('#footer > :nth-child(4)').click()
    cy.get('#FractionInputInput').clear()
    cy.get('#FractionInputInput').type('100')
    cy.get('#customFood').check()
    cy.get('#SubmitButton > img').click()
    cy.get('#MacrosCalories').should('have.text', '540')
    cy.get('#TopBarCalories .green').should('have.text', '1460')
    cy.get('#TopBarProtein .blue').should('have.text', '93')

    // Double the amount
    cy.get('[data-id=update-button]').click()
    cy.get('#FractionInputInput').click()
    cy.get('#FractionInputInput').type('200')
    cy.get('#SubmitButton').click()
    cy.get('#MacrosCalories').should('have.text', '1080')
    cy.get('#TopBarCalories .green').should('have.text', '920')
    cy.get('#TopBarProtein .blue').should('have.text', '87')
  })
})
