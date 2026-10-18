describe('Lighthouse Performance & SEO Audits', () => {
  const routes = [
    { name: 'Home Page', path: '/' },
    { name: 'About Page', path: '/about' },
    { name: 'Experience Page', path: '/experience' },
    { name: 'Stack Page', path: '/stack' },
    { name: 'Contact Page', path: '/contact' },
  ];

  const thresholds = {
    performance: 75,
    accessibility: 85,
    'best-practices': 85,
    seo: 85,
  };

  routes.forEach((route) => {
    it(`passes Lighthouse thresholds on ${route.name} (${route.path})`, () => {
      cy.visit(route.path);
      cy.lighthouse(thresholds);
    });
  });
});
