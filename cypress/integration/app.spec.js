describe('The Home Page', () => {
    beforeEach(() => {

        // load example.json fixture file and store
        // in the test context object
        cy.fixture('links.json').as('links')
    })

    it('successfully loads links', () => {
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

    it('fails to load links. show error', () => {
        cy.visit('/');
        // cy.intercept('GET', 'https://api.bely.me/links', { fixture: 'links.json' }).as('getLinks');
        cy.intercept('https://api.bely.me/links', {
            statusCode: 500,
            delayMs: 100
        }).as('addLink');

        cy.get('[data-cy=shortened-url-table-loading]').should('be.visible');
        cy.wait('@addLink');

        cy.get('[data-cy=shortened-url-list-error]').should('be.visible');
        cy.get('[data-cy=shortened-url-item]').should('not.exist');
        cy.get('[data-cy=shortened-url-table-loading]').should('not.exist');
    })

    it('shows a new link in the link list when user adds it', () => {
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

    it('should show the error messages when adding new link fails', () => {
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

    it('should show the required url error message when adding new link without URL', () => {
        cy.visit('/');
        cy.intercept('GET', 'https://api.bely.me/links', { fixture: 'links.json' }).as('getLinks');

        cy.get('[data-cy=add-link-button]').click();
        cy.get('[data-cy=url-input-required]').should('be.visible');
        
    })

    it('should remove link from list when removing a link succeeds', () => {
        cy.visit('/');
        cy.intercept('GET', 'https://api.bely.me/links', { fixture: 'links.json' }).as('getLinks');

        cy.contains('td', 'test-1').should('be.visible');

        cy.intercept('DELETE', 'https://api.bely.me/links/test-1', {
            statusCode: 200,
        }).as('deleteLink');

        cy.contains('td', 'test-1')
        .parent()
        .within($tr => {
            cy.get('[data-cy=delete-url-icon]').click();
        });

        cy.contains('td', 'test-1').should('not.exist');
    })

    it('should show error notification when removing a link fails', () => {
        cy.visit('/');
        cy.intercept('GET', 'https://api.bely.me/links', { fixture: 'links.json' }).as('getLinks');

        cy.intercept('DELETE', 'https://api.bely.me/links/test-1', {
            statusCode: 500,
        }).as('deleteLink');

        cy.contains('td', 'test-1')
        .parent()
        .within($tr => {
            cy.get('[data-cy=delete-url-icon]').click();
        });

        cy.get('.Toastify__toast--error').should('be.visible');
    })
})