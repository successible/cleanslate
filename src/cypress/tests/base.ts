/// <reference types="cypress" />

export const localUser = 'cef434cf-17a1-4c99-9974-4f64a3c03f48'
describe('Is Clean Slate working?', () => {
  it('Add a log', () => {
    cy.visit('http://localhost:3000')
    cy.get('#token').type(localUser)
    cy.get('#login-button').click()
    cy.get('#BottomBarSearchButton').should('be.visible').click()
    cy.get('#StandardAdderSearchbar').should('be.visible').type('Sage')
    cy.get('#StandardAdderSearchResult-0').should('be.visible').click()
    cy.get('#StandardAdderMetaName').should('be.visible').contains('Sage')
    cy.get('#FractionInputInput').should('be.visible').type('100')
    cy.get('#SubmitButton')
      .should('be.visible')
      .should('have.class', 'success')
      .click()
    cy.get('#MetaItemName').should('contain', 'Sage')
  })
})
