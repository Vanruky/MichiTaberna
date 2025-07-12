describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/login');
    cy.url().should('include', '/login');
  });

  it('debería navegar a home si el login es exitoso y mostrar menú principal', () => {
    cy.get('[data-cy="input-usuario"]').shadow().find('input').type('MichiTabernaADM');
    cy.get('[data-cy="input-password"]').shadow().find('input').type('8989');
    cy.contains('Ingresar').click();

    cy.url({ timeout: 5000 }).should('include', '/home');

    cy.get('body').should(($body) => {
      const text = $body.text();
      const found =
        text.includes('Mis datos') ||
        text.includes('Catálogo') ||
        text.includes('Mis tarjetas') ||
        text.includes('Mis pedidos') ||
        text.includes('Reseñas') ||
        text.includes('Ajustes') ||
        text.includes('Nosotros');

      expect(found).to.be.true;
    });
  });
});
