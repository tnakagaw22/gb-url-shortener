describe('The Home Page', () => {
    beforeEach(() => {

        // load example.json fixture file and store
        // in the test context object
        cy.fixture('links.json').as('links')
    })

    it('successfully loads', () => {
        cy.visit('/');
        // cy.intercept('GET', 'https://api.bely.me/links', { fixture: 'links.json' }).as('getLinks');
        cy.intercept('https://api.bely.me/links', {
            statusCode: 200,
            fixture: 'links.json',              
            delayMs: 100
        }).as('addLink');

        cy.get('[data-cy=shortened-url-table-loading]').should('be.visible');
        cy.wait('@addLink');

        cy.get('[data-cy=shortened-url-item]').should('be.visible');
        cy.get('[data-cy=shortened-url-table-loading]').should('not.exist');
    })

    it('when adding new link, new link should be shown up in the link list', () => {
        cy.visit('/');
        cy.intercept('GET', 'https://api.bely.me/links', { fixture: 'links.json' }).as('getLinks');
        cy.wait('@getLinks');

        cy.intercept('POST', 'https://api.bely.me/links', {
            statusCode: 200,
            body: {
                "url": "test-4",
                "slug": "test-4",
                "short_url": "http://bely.me/test-4"
            },
            delayMs: 100
        }).as('addLink');

        cy.get('[data-cy=url-input]').type('test-4');
        cy.get('[data-cy=add-link-button]').click();
        cy.get('[data-cy=add-link-button]').should('be.disabled');
        cy.wait('@addLink');

        cy.get('[data-cy=add-link-button]').not('be.disabled');
        cy.get('[data-cy=shortened-url-list]').find('tbody > tr').should('have.length', 4)
    })

    it('when adding new link fails with 422, it should show the error messages', () => {
        cy.visit('/');
        cy.intercept('GET', 'https://api.bely.me/links', { fixture: 'links.json' }).as('getLinks');
        cy.wait('@getLinks');

        cy.intercept('POST', 'https://api.bely.me/links', {
            statusCode: 422,
            body: {
                "errors": {
                    "url": [
                        "has already been taken"
                    ]
                }
            },
            delayMs: 100
        }).as('addLink');

        cy.get('[data-cy=url-input]').type('test-4');
        cy.get('[data-cy=add-link-button]').click();
        cy.get('[data-cy=add-link-button]').should('be.disabled');
        cy.wait('@addLink');

        cy.get('[data-cy=add-link-button]').not('be.disabled');
        cy.get('[data-cy=error-save-item]').should('be.visible');
    })
})