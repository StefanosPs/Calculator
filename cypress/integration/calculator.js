/// <reference types="cypress" />

before(() => {
	cy.visit('http://localhost:3000');
});

context('Calculator tests', () => {
	it('Calculate a mathematical expression online', () => {
		cy.get('#number-key-7').click();
		cy.get('#operation-key-plus').click();
		cy.get('#number-key-8').click();
		cy.get('#number-key-8').click();
		cy.get('#operation-key-result').click();
		cy.get('#mathfn').should('have.value', '95');


		cy.get('#operation-key-plus').click();
		cy.get('#number-key-5').click();
		cy.get('#operation-key-result').click();
		cy.get('#mathfn').should('have.value', '100');

		cy.get('.display-history').then((el) => {
			const row = el.find('.row'); 
			cy.wrap(row).should('have.length', 2);
		});

		cy.get('#operation-key-multiplication').click();
		cy.get('#operation-key-multiplication').click();
		cy.get('#operation-key-result').click();
		cy.get('#mathfn').should('have.value', '10000');

		cy.get('#operation-key-squared').click();
		cy.get('#operation-key-result').click();
		cy.get('#mathfn').should('have.value', '100000000');

		cy.get('#operation-key-multiplication').click();
		cy.get('#numID-10').click();
		cy.get('#number-key-0').click();
		cy.get('#number-key-0').click();
		cy.get('#number-key-1').click();
		cy.get('#operation-key-result').click();
		cy.get('#mathfn').should('have.value', '100000');

		cy.get('#operation-key-clearDisplay').click();
		cy.get('#mathfn').should('be.empty')  
	});
	it('error', () => {
		cy.get('#number-key-0').click();
		cy.get('#operation-key-divide').click();
		cy.get('#number-key-0').click();
		cy.get('#operation-key-result').click();
		cy.get('.toast-body').invoke('text')
		.then((text)=>{ 
		    expect(text).to.equal("Fail to exec function");
		})
		cy.wait(4000).then(() => {
			cy.get('#operation-key-result').click();
			cy.get('.toast-body').invoke('text')
			.then((text)=>{ 
				expect(text).to.equal("Fail to exec function");
			})
		})
	});
});
