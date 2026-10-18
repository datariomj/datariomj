describe("Home Page & Deployment Architecture", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads proper home page metadata", () => {
    cy.title().should("include", "MJ Datario");
  });

  it("renders deployment architecture section and overhead cost breakdown", () => {
    cy.get("app-deployment-architecture").scrollIntoView();
    cy.contains("h2", "Deployment Architecture").should("be.visible");
    cy.contains("Monthly Infrastructure Overhead").should("be.visible");
    cy.contains("~$0.60 USD / month").should("be.visible");
    cy.contains("AWS Route 53").should("be.visible");
    cy.contains("$0.54").should("be.visible");
  });

  it("expands node details when clicking diagram blocks on desktop", () => {
    cy.viewport(1280, 800);
    cy.get("app-deployment-architecture").scrollIntoView();

    cy.get("g.diagram-node").contains("text", "datariomj-sentry").click({ force: true });

    cy.contains("h3", "datariomj-sentry").should("be.visible");
    cy.contains("PRIVATE").should("be.visible");
    cy.contains("Pulumi Stack for Sentry Projects").should("be.visible");

    cy.get("button[aria-label*='Revert']").click({ force: true });

    cy.contains("h3", "datariomj-sentry").should("not.exist");
    cy.get("div.diagram-viewport").should("be.visible");
  });

  it("expands ACM node details when clicking ACM block in AWS section", () => {
    cy.viewport(1280, 800);
    cy.get("app-deployment-architecture").scrollIntoView();

    cy.get("g.diagram-node").contains("text", "ACM (SSL)").click({ force: true });

    cy.contains("h3", "ACM (AWS Certificate Manager)").should("be.visible");
    cy.contains("AWS Infrastructure / SSL/TLS Certificates").should("be.visible");

    cy.get("button[aria-label*='Revert']").click({ force: true });
    cy.get("div.diagram-viewport").should("be.visible");
  });

  it("displays responsive mobile stack view on mobile viewport", () => {
    cy.viewport("iphone-x");
    cy.get("app-deployment-architecture").scrollIntoView();

    cy.contains("MOBILE PIPELINE FLOW").should("be.visible");
    cy.contains("SOURCE CONTROL (5 REPOS)").should("be.visible");

    cy.contains("datariomj-infra").click();

    cy.contains("h3", "datariomj-infra").should("be.visible");
    cy.contains("AWS CDK Monorepo").should("be.visible");

    cy.get("button[aria-label*='Revert']").click({ force: true });
    cy.contains("MOBILE PIPELINE FLOW").should("be.visible");
  });
});
