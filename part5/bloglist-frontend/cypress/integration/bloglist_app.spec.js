describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username-input').should('be.visible')
    cy.get('#password-input').should('be.visible')
    cy.get('#login-button').should('be.visible')
  })
})