describe('Terminal Hero Component', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for initial typing sequence to finish
    cy.wait(3000);
  });

  it('renders the terminal successfully', () => {
    cy.get('app-terminal-hero').should('exist');
    cy.get('.terminal-window').should('be.visible');
    
    // Check boot sequence output
    cy.get('.terminal-content').should('contain', 'STATUS: Loaded /');
    cy.get('.terminal-content').should('contain', 'Type "help" to view available commands.');
  });

  it('handles basic commands and routing', () => {
    // Test help command
    cy.get('.terminal-input').type('help{enter}', { force: true });
    cy.get('.terminal-content').should('contain', 'Available commands:');
    cy.get('.terminal-content').should('contain', 'ls');

    // Test routing via cd
    cy.get('.terminal-input').type('cd experience{enter}', { force: true });
    cy.url().should('include', '/experience');
    
    // Test clearing history
    cy.get('.terminal-input').type('clear{enter}', { force: true });
    cy.get('.terminal-content').should('not.contain', 'Available commands:');
  });

  it('executes cat commands properly', () => {
    cy.get('.terminal-input').type('cat experience.md{enter}', { force: true });
    cy.get('.terminal-content').should('contain', 'Experience Summary');
    cy.get('.terminal-content').should('contain', 'DevOps Engineer Lead');

    // Test invalid command error message
    cy.get('.terminal-input').type('invalidcmd{enter}', { force: true });
    cy.get('.terminal-content').should('contain', 'invalidcmd: command not found. Type "help" for a list of commands.');
    cy.get('.terminal-content').should('not.contain', 'bash:');
  });

  it('provides auto-suggestions and handles tab completion', () => {
    // Type 'cat ab' which should suggest 'out.md'
    cy.get('.terminal-input').type('cat ab', { force: true });
    cy.get('.terminal-content').should('contain', 'out.md');
    
    // Trigger right arrow for auto-completion (mapped to same handler as tab)
    cy.get('.terminal-input').type('{rightarrow}', { force: true });
    
    // The input should now be 'cat about.md'
    cy.get('.terminal-input').should('have.value', 'cat about.md');
    cy.get('.terminal-input').type('{enter}', { force: true });
    cy.get('.terminal-content').should('contain', 'Marc Joseph Datario');
  });

  it('handles terminal close and reboot state', () => {
    // Click the red close dot
    cy.get('.red-dot').click();

    // Verify terminal empty state
    cy.get('.terminal-content').should('contain', 'Connection Terminated');
    cy.get('.terminal-content').should('contain', 'The session to datariomj@dev has been closed by the user.');
    cy.get('button').contains('[ REBOOT_SESSION ]').should('be.visible');

    // Click reboot
    cy.get('button').contains('[ REBOOT_SESSION ]').click();

    // Verify it restores
    cy.get('.terminal-content').should('contain', 'STATUS: Loaded /');
    cy.get('.red-dot').should('be.visible');
  });
});
