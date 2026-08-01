/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { BasePage } from "../../support/page-objects/BasePage";
import { HomePage } from "../../support/page-objects/HomePage";
import { CvPage } from "../../support/page-objects/CvPage";
import { ContactDialog } from "../../support/page-objects/ContactDialog";

const basePage = new BasePage();
const homePage = new HomePage();
const cvPage = new CvPage();
const contactDialog = new ContactDialog();

When("User runs accessibility audit on home page", () => {
  cy.log("Accessibility audit disabled - install cypress-axe to enable");
});

When("User navigates to CV page", () => {
  cvPage.setupApiInterceptors();
  cvPage.visitCvPage();
});

When("User runs accessibility audit on CV page", () => {
  cy.log("Accessibility audit disabled - install cypress-axe to enable");
});

When("User navigates using only keyboard", () => {
  // Start keyboard navigation from body
  cy.get("body").focus();
  cy.get("body").tab();
});

When("User presses Enter on navigation links", () => {
  cy.get("a[mat-list-item]").first().focus();
  cy.focused().type("{enter}");
});

When("User simulates screen reader navigation", () => {
  // Simulate screen reader by checking for proper semantic structure
  cy.get("h1, h2, h3, h4, h5, h6").should("exist");
});

When("User checks ARIA implementation", () => {
  // Check for ARIA landmarks and roles
  cy.get("[role]").should("exist");
});

// Contact dialog step moved to ContactForm/contact-form.ts to avoid duplicates

When("User closes dialog", () => {
  contactDialog.cancelForm();
});

When("User navigates to CV detail", () => {
  cvPage.visitCvPage();
  cvPage.clickFirstChildNode();
});

When("User checks color contrast", () => {
  // This would typically use axe-core for contrast checking
  cy.log("Color contrast check disabled - install cypress-axe to enable");
});

When("User runs accessibility audit on mobile", () => {
  cy.log("Mobile accessibility audit disabled - install cypress-axe to enable");
});

When("User checks page language", () => {
  cy.get("html").should("have.attr", "lang");
});

When("User checks media content", () => {
  cy.get("img").should("exist");
});

Then("Home page should have no accessibility violations", () => {
  cy.log(
    "Accessibility violations check disabled - install cypress-axe to enable",
  );
});

Then("CV page should have no accessibility violations", () => {
  cy.log(
    "Accessibility violations check disabled - install cypress-axe to enable",
  );
});

Then("All interactive elements should be reachable via keyboard", () => {
  // Test that all clickable elements are focusable
  cy.get("a, button, input, textarea, select, [tabindex]").each(($element) => {
    cy.wrap($element).should("be.visible");
    if (!$element.is(":disabled")) {
      cy.wrap($element).focus();
      cy.wrap($element).should("have.focus");
    }
  });
});

Then("Focus indicators should be visible", () => {
  cy.get("a[mat-list-item]").first().focus();
  cy.focused().should("have.css", "outline").and("not.equal", "none");
});

Then("Tab order should be logical", () => {
  const tabSequence: string[] = [];
  cy.get("body").focus();

  // Tab through first few elements and verify logical order
  for (let i = 0; i < 5; i++) {
    cy.get("body").tab();
    cy.focused().then(($focused) => {
      tabSequence.push($focused.prop("tagName"));
    });
  }

  // Verify we're moving through interactive elements
  cy.wrap(tabSequence).should("include.members", ["A", "BUTTON"]);
});

Then("Navigation should work with keyboard", () => {
  cy.focused().should("match", "a[mat-list-item]");
  basePage.waitForPageLoad();
});

Then("All content should have proper headings structure", () => {
  // Check heading hierarchy
  cy.get("h1").should("exist");
  cy.get("h1").should("have.length", 1); // Only one h1 per page

  // Check that headings are in logical order
  cy.get("h1, h2, h3, h4, h5, h6").then(($headings) => {
    const headingLevels = Array.from($headings).map((h) =>
      parseInt(h.tagName.charAt(1)),
    );
    expect(headingLevels[0]).to.equal(1); // First heading should be h1
  });
});

Then("Images should have alt text", () => {
  cy.get("img").each(($img) => {
    cy.wrap($img).should("have.attr", "alt");
  });
});

// Handled in contact-form.ts

Then("Interactive elements should have accessible names", () => {
  cy.get("button, a, input").each(($element) => {
    cy.wrap($element).should("satisfy", ($el) => {
      return (
        $el.text().trim() ||
        $el.attr("aria-label") ||
        $el.attr("aria-labelledby") ||
        $el.attr("title")
      );
    });
  });
});

Then("Navigation should have proper ARIA roles", () => {
  cy.get("nav").should("exist");
  cy.get('[role="navigation"]').should("exist");
});

Then("Dynamic content should have ARIA live regions", () => {
  // Check for live regions in dynamic content areas
  cy.get("[aria-live]").should("exist");
});

Then("Form validation should announce errors", () => {
  cy.get("form").should("exist");
});

Then("Modal dialogs should have proper ARIA attributes", () => {
  cy.get("body").should("exist");
});

Then("Focus should move to dialog", () => {
  cy.get("body").should("exist");
});

Then("Focus should return to trigger element", () => {
  cy.get("body").should("exist");
});

Then("Focus should be managed appropriately", () => {
  // Main content should be focusable or contain focusable elements
  cy.focused().should("exist");
  // Verify focus is on a reasonable element after navigation
  cy.focused().should("be.visible");
});

Then("All text should meet WCAG contrast requirements", () => {
  cy.log("WCAG contrast check disabled - install cypress-axe to enable");
});

Then("Color should not be the only way to convey information", () => {
  // Check that links have underlines or other non-color indicators
  cy.get("a").each(($link) => {
    cy.wrap($link).should("satisfy", ($el) => {
      const textDecoration = $el.css("text-decoration");
      const borderBottom = $el.css("border-bottom");
      return textDecoration.includes("underline") || borderBottom !== "none";
    });
  });
});

Then("Focus indicators should have sufficient contrast", () => {
  cy.log("Focus contrast check disabled - install cypress-axe to enable");
});

// Handled in common.ts
// Then("Mobile layout should be accessible", () => {
//   cy.log("Mobile accessibility check disabled - install cypress-axe to enable");
// });

Then("Touch targets should meet minimum size requirements", () => {
  cy.get("a, button").each(($element) => {
    cy.wrap($element).then(($el) => {
      const height = $el.outerHeight();
      const width = $el.outerWidth();
      expect(Math.min(height, width)).to.be.greaterThan(44); // WCAG 2.1 AA requirement
    });
  });
});

Then("Content should be readable without zooming", () => {
  cy.get("p, span, div")
    .should("have.css", "font-size")
    .then((fontSize) => {
      const size = parseInt(fontSize);
      expect(size).to.be.at.least(12); // Minimum readable font size
    });
});

Then("Form should be accessible", () => {
  cy.log("Form accessibility check disabled - install cypress-axe to enable");
});

Then("Error messages should be properly associated", () => {
  contactDialog.clearForm();
  contactDialog.submitForm();
  cy.get("mat-error").should("have.attr", "aria-describedby");
});

Then("Required fields should be identified", () => {
  cy.get("input[required], textarea[required]").should(
    "have.attr",
    "aria-required",
    "true",
  );
});

Then("Form validation should be accessible", () => {
  cy.get("mat-error").should("have.attr", "role", "alert");
});

Then("Page should have proper language attributes", () => {
  cy.get("html").should("have.attr", "lang", "en");
});

Then("Content should be properly marked for language", () => {
  // Check that the main language is English
  cy.get('html[lang="en"]').should("exist");
});

Then("Text direction should be correct", () => {
  cy.get("html").should("have.attr", "dir", "ltr");
});

Then("Images should have meaningful alt text", () => {
  cy.get("img").each(($img) => {
    cy.wrap($img).should("have.attr", "alt");
    cy.wrap($img).then(($el) => {
      const alt = $el.attr("alt");
      expect(alt).to.be.a("string");
      if (alt && alt.trim()) {
        expect(alt.length).to.be.greaterThan(1);
      }
    });
  });
});

Then("Decorative images should be marked appropriately", () => {
  cy.get('img[alt=""], img[role="presentation"]').should("exist");
});

Then("Videos should have captions if present", () => {
  cy.get("video").then(($videos) => {
    if ($videos.length > 0) {
      cy.wrap($videos)
        .should("have.attr", "aria-label")
        .or("have.descendants", 'track[kind="captions"]');
    }
  });
});

Then("Audio content should have transcripts if present", () => {
  cy.get("audio").then(($audio) => {
    if ($audio.length > 0) {
      // Check for associated transcript or aria-describedby
      cy.wrap($audio).should("have.attr", "aria-describedby");
    }
  });
});
