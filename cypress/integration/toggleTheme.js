/// <reference types="cypress" />
before(() => {
	cy.visit('http://localhost:3000?theme=dark');
});
context('Toggle Theme', () => {
	it('dark theme -> light theme', () => {
		// cy.screenshot('dark')
		cy.get('.bg-dark').then($main => {
			expect($main, '1 items').to.have.length(1);
		});

		cy.get('#change-theme')
			.find('input')
			.click({ force: true });

		cy.get('.bg-light').then($main => {
			expect($main, '1 items').to.have.length(1);
		});
	});

	it('light theme => dark theme', () => {
		cy.get('.bg-light').then($main => {
			expect($main, '1 items').to.have.length(1);
		});
		cy.get('#change-theme')
			.find('input')
			.click({ force: true });

		cy.get('.bg-dark').then($main => {
			expect($main, '1 items').to.have.length(1);
		});
	});
});
