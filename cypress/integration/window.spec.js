/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top')
  })

  it('cy.document() - get the document object', () => {
    // https://on.cypress.io/document
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  })

  it('cy.title() - get the title', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'Calculator')
  })

  // it('.each() - iterate over an array of elements', () => {
  //   // https://on.cypress.io/each
  //   cy.get('.connectors-each-ul>li')
  //     .each(($el, index, $list) => {
  //       console.log($el, index, $list)
  //     })
  // })
})

context('Theme', () => {
  // beforeEach(() => {
  //   cy.visit('http://localhost:3000')
  // })
  it('dark theme', () => {
    cy.visit('http://localhost:3000?theme=dark').then(() => {
      // cy.screenshot('dark')
      cy.get('.bg-dark').then(($main) => {
        expect($main, '1 items').to.have.length(1)
      })
    })

  });
  
  it('light theme', () => {
    cy.visit('http://localhost:3000?theme=light').then(() => {
      // cy.screenshot('light') 
      cy.get('.bg-light').then(($main) => {
        expect($main, '1 items').to.have.length(1)
      });
      
    })

  });
})