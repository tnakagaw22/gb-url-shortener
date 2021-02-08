describe('End to end tests', () => {
    const testUrl = 'e2e-test-1';
    const testSlug = 'e2e1';

    beforeEach(() => {
        // cy.request({
        //     method: 'DELETE',
        //     url: `https://api.bely.me/links/${testSlug}`,
        //     headers: { "GB-Access-Token": '6cd429c13bf7a5cf57cf25298b3f43eb' }
        // });
        // cy.request('POST', `https://api.bely.me/links/`, { url: testUrl, slug: testSlug });
    })

    it('load page, add, delete url', () => {
        cy.visit('/');

        // make sure that existing urls load
        cy.get('[data-cy=shortened-url-item]').should('be.visible');

        // add new url
        cy.get('[data-cy=url-input]').type(testUrl);
        cy.get('[data-cy=slug-input]').type(testSlug);
        cy.get('[data-cy=add-link-button]').click();

        // make sure the added link exists
        cy.contains('td', testSlug).should('have.length', 1)

        // remove urls
        cy.contains('td', testSlug)
            .parent()
            .within($tr => {
                cy.get('[data-cy=delete-url-icon]').click();
            });

        // make sure the added link has been deleted
        cy.contains('td', testSlug).should('have.length', 0);

    })


})