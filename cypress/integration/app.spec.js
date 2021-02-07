describe('The Home Page', () => {
    beforeEach(() => {
        cy.visit('/');
    
        // load example.json fixture file and store
        // in the test context object
        cy.fixture('links.json').as('links')
    })

    it('successfully loads', () => {
        cy.intercept('GET', 'https://api.bely.me/links', { fixture: 'links.json' }).as('getLinks');

        cy.get('[data-cy=shortened-url-item]').should('be.visible');
    })

    it('add new link', () => {
        cy.intercept('GET', 'https://api.bely.me/links', { fixture: 'links.json' }).as('getLinks');
        cy.wait('@getLinks');

        cy.intercept('POST', 'https://api.bely.me/links', {
            "url": "test-4",
            "slug": "test-4",
            "short_url": "http://bely.me/test-4"
        }).as('addLink');

        cy.get('[data-cy=url-input]').type('test-4');
        cy.get('[data-cy=add-link-button]').click();
        cy.wait('@addLink');
        cy.get('[data-cy=shortened-url-list]').find('tr').should('have.length', 4)
    })
})