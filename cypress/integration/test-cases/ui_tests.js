///<reference types="Cypress"/>

describe('Functional UI tests',()=>{


    it('Verifying that all hyperlinks on page are valid',()=>{
     
        cy.visit('http://uitestingplayground.com/home')
        cy.wrap('passed').as('ctrl')
       
        cy.get("a").each($el => {
 
            if ($el.prop('href').length > 0) {
            const message = $el.text()
            expect($el, message).to.have.attr("href").not.contain("undefined")
            cy.log($el.attr('href'))                       
             }
        })      
    })

    it("Verify page title", () => {
      cy.visit('http://uitestingplayground.com/home')
      cy.title().should("eq", "UI Test Automation Playground");
    })
})