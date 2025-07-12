describe('CatalogoPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/catalogo');
  });

  it('debe mostrar el título y categorías', () => {
    cy.contains('MichiTaberna').should('exist');
    cy.contains('Meramente Prrrrrrfecto').should('exist');

    cy.get('ion-chip').should('have.length.at.least', 3);
    cy.contains('Artículos de papelería').should('exist');
    cy.contains('Decoraciones').should('exist');
  });

  it('debe mostrar la lista de productos cargados', () => {
    cy.get('ion-list ion-item', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('ion-list ion-item').first().within(() => {
      cy.get('ion-thumbnail img').should('have.attr', 'src');
      cy.get('h2').should('not.be.empty');
      cy.get('p').should('exist');
      cy.get('ion-button').should('have.length', 2);
      cy.get('ion-icon.like-icon').should('exist');
    });
  });

  it('debe poder dar like y quitar like a un producto', () => {
    cy.get('ion-list ion-item').first().within(() => {
      cy.get('ion-icon.like-icon').as('likeIcon');

      cy.get('@likeIcon').click().should('have.class', 'active');

      cy.get('@likeIcon').click().should('not.have.class', 'active');
    });
  });

  it('debe navegar a home cuando se clickea el icono home', () => {
    cy.get('.iconos-navegacion ion-icon[name="home-outline"]').click();
    cy.url({ timeout: 10000 }).should('include', '/home');
  });
});
