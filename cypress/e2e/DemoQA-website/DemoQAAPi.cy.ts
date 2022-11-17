let randomUserNumber: number | undefined;
  const generateRandomNumber = function(){
    it(randomUserNumber === undefined){
      randomUserNumber = Math.floor(Math.random()* 10000);
    }
    return randomUserNumber;
  }

  describe("API Verification", () =>{
     
     it('Books Get API', () =>{
             cy.request("GET", "https://demoqa.com/BookStore/v1/Books").then(Response =>{
                expect((<any> Response).status).to.be.eq(200))
                let booksArray =Response.body.books;
                expect(booksArray.length).to.be.eq(8)
                expect(booksArray.filter((obj1:any) => obj1.title.toLowerCase().includes("javascript")).length).to.be.eq(4);
            });
        });

        it('Search with ISBN Get API', () =>{
             cy.request("GET", "https://demoqa.com/BookStore/v1/Book?ISBN=9781449365035").then(response => {
                expect((<any> Response).status).to.be.eq(200))
                cy.log(Response.body.title)
                expect(Response.body.title).to.be.eq("Speaking javascript")
                
            });
      //   });
        
        it('User Creation Post API', () =>{
           let body = {
            "userName": "dummy1" + generateRandomNumber(),
            "password": "Welcome@123"
           }
           console.log(body)
           cy.request("POST", "https://demoqa.com/Account/v1/User",body).then(response => {
            expect((<any> response).status).to.be.eq(201)
                cy.log(response.body.userID)
           });
        });
         
       
        it('User Authorization Post API', () =>{
           let body = {
            "userName": "dummy1" + generateRandomNumber(),
            "password": "Welcome@123"
           }
          
           cy.request("POST", "https://demoqa.com/Account/v1/Authorized",body).then(response => {
            expect((<any> response).status).to.be.eq(200)
               
           });
        });


    //})
