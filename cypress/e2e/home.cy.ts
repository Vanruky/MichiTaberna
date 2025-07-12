describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/home');
  });

  it('debe mostrar título y botones principales', () => {
    cy.contains('MichiTaberna').should('exist');
    cy.contains('Meramente Prrrrrrfecto').should('exist');
    cy.contains('Mis datos').should('exist');
    cy.contains('Catálogo').should('exist');
    cy.contains('Nosotros').should('exist');
  });

  it('debe abrir modal de mis datos al hacer click', () => {
    cy.contains('Mis datos').click();

    cy.get('ion-modal').should('exist');

    cy.get('ion-modal').contains('Mis Datos').should('be.visible');
  });

  it('debe navegar a Catálogo', () => {
    cy.contains('Catálogo').click();
    cy.url().should('include', '/catalogo');
  });

  it('debe navegar a Nosotros', () => {
    cy.contains('Nosotros').click();
    cy.url().should('include', '/michitaberna');
  });
});
