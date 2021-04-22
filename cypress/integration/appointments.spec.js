

describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");
    cy.visit("/");
  });

  // BOOKING
    // Visits the root of our web server
    // Clicks on the "Add" button in the second appointment
    // Enters their name
    // Chooses an interviewer
    // Clicks the save button
    // Sees the booked appointment
    it("should book an interview", () => {
      cy.visit("/");
      cy.contains("Tuesday");

      cy.get("[alt=Add]")
        .first()
        .click({force: true});

      cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
      cy.get("[alt='Sylvia Palmer']").click();
  
      cy.contains("Save").click();
  
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Sylvia Palmer");

    });

    it("should edit an interview", () => {
      cy.get("[alt=Edit]")
        .first()
        .click({ force: true });
    
      cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
      cy.get("[alt='Tori Malcolm']").click();
    
      cy.contains("Save").click();
    
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Tori Malcolm");
    });

  // EDITING
    // Visits the root of our web server
    // Clicks the edit button for the existing appointment
    // Changes the name and interviewer
    // Clicks the save button
    // Sees the edit to the appointment

    it("should cancel an interview", () => {
      cy.get("[alt=Delete]")
        .click({ force: true });
    
      cy.contains("Confirm").click();
    
      cy.contains("Deleting").should("exist");
      cy.contains("Deleting").should("not.exist");
    
      cy.contains(".appointment__card--show", "Archie Cohen")
        .should("not.exist");
    });
  // CANCELING
    // Visits the root of our web server
    // Clicks the delete button for the existing appointment
    // Clicks the confirm button
    // Sees that the appointment slot is empty


});
