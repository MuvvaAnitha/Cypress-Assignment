


describe("Demoblaze page Tests", () =>{
    
    beforeEach("Before",() =>{
        cy.viewport(1920,1280);
        cy.visit('https://demoblaze.com/');
    })
   
   it("Purchasing The Apple Monitor",() => {

       cy.intercept("POST", "/bycat").as("waitforMonitors");
       cy.get(".list-group").find('a').eq(3).click();
       cy.wait("@waitForMonitors");
       cy.intercept("POST", "/view").as("waitforAppleMonitor");
       cy.xpath("//a[text()='Apple monitor 24']").click();
       cy.wait("@waitforAppleMonitor");
       cy.get('h2').should("have.text", "Apple monitor 24")
       cy.xpath("//a[text()='Add to cart']").click();
       cy.xpath("//a[contains(text(), 'Home')]").click();
       cy.intercept("POST", "/bycat").as("waitforLaptops");
       cy.get(".list-group").find('a').eq(2).click();
       cy.wait("@waitforLaptops");
       cy.xpath("//a[text()='MacBook air']").click();
       cy.xpath("//a[text()='Add to cart']").click();
       cy.intercept("POST", "/viewcart").as("viewcart");
       cy.xpath("//a[text()='cart']").click();
       cy.wait("@viewcart");
       cy.xpath("//button[text()='place order']").click(); 
       cy.get("#name").type("TestName");
       cy.get("#card").type("1234567898");
       cy.xpath("//button[text()='Purchase']").click(); 
       cy.get('.sweet-alert > h2').should("have.text", "Thank you for your purchase!");


   })

})
