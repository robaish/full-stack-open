describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'miyazaki',
      name: 'Hayao Miyazaki',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  describe('Login', function() {
    it('Login form is shown', function() {
      cy.get('#username-input').should('be.visible')
      cy.get('#password-input').should('be.visible')
      cy.get('#login-button').should('be.visible')
    })

    it('Valid login succeeds', function() {
      cy.get('#username-input').type('miyazaki')
      cy.get('#password-input').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Hayao Miyazaki logged in')
    })

    it('Invalid login fails', function() {
      cy.get('#username-input').type('miyazaki')
      cy.get('#password-input').type('notgonnawork')
      cy.get('#login-button').click()

      cy.get('.danger').contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username-input').type('miyazaki')
      cy.get('#password-input').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog post can be created', function() {
      cy.get('#toggleable-button-show').click()
      cy.get('#title').type('Be here now')
      cy.get('#author').type('Ram Dass')
      cy.get('#url').type('ramdass.org/bhn')
      cy.get('#add-blog-button').click()

      cy.get('.bloglist-container').contains('Be here now')
    })
  })
})