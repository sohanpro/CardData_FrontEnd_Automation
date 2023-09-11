describe("Card Data Functionality", () => {
    beforeEach("Go to the link and pay every time before transaction", () => {
      cy.visit('https://securedev.aamarpay.com/test1.php');
      cy.get("input[value='Pay Now']").click();
    });
  
    it("Card Number ALL test cases!!!", function () {
      
      // Get the transaction parameter from API in the future!!!!!!!!!!
      const AllCard = [
        {   // Visa
          CardNumber: "423424234321234",
          CardSVG: "/assets/visa_front-e75cb520.svg"
        },
        {   // American
          CardNumber: "343424234321234",
          CardSVG: "/assets/american_express_front-667b3ce2.svg"
        },
        {   // China
          CardNumber: "623424234321234",
          CardSVG: "/assets/unionPay_front-ba810de9.svg"
        },
        {   // Master
          CardNumber: "513424234321234",
          CardSVG: "/assets/master_front-a5fe2d02.svg"
        },
        {   // Diner Club
          CardNumber: "300424234321234",
          CardSVG: "/assets/diners_club_front-c6d5523d.svg"
        },
        {   // JCB
          CardNumber: "352824234321234",
          CardSVG: "/assets/jcb_front-19015666.svg"
        },
        {   // Other
          CardNumber: "501924234321234",
          CardSVG: "/assets/random_card_front-9542228a.svg"
        }
      ];
  
      cy.origin('https://checkout.aamarpay.dev', { args: { AllCard } }, ({ AllCard }) => {
        AllCard.forEach((data) => {
          // Click On the card option and iterate through all cards using forEach loop
          
          cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2)").click();
          cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)").scrollIntoView().clear();
          cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)").scrollIntoView().type(data.CardNumber);
  
          cy.get("div[class='swiper-slide swiper-slide-visible swiper-slide-active'] div[class='card-front'] img").should('have.attr', 'src', data.CardSVG);
        });
      });
    });
    it("Input Validation using Space And hyphens!!!",function()
    {
      cy.origin('https://checkout.aamarpay.dev',function()
      {
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2)").click();
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)").type(' ').should('not.have.value',' ');
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)").type('-').should('not.have.value','-');
      })
    })
    it("Bin Number Response from backend",function()
    {
      cy.origin('https://checkout.aamarpay.dev',function()
      {

     
      cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2)").click();
      const binNumber = '342113';
      cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)").type(`${binNumber}`)
      
      const authToken = 'Token 8dd64b3455bd40b73d5e143c53b87fa25458aec7';
      cy.request(
      {
        method: 'GET',
        url: `https://bindb.aamarpay.com/api/v1/bin/info/${binNumber}`, 
        headers: {
          'Authorization': `${authToken}`,
        },
      }).as('binInfo');
      cy.get('@binInfo').should(function(Response)
      {
        
        expect(Response.status).to.eq(200);
        
      })
      cy.get("@binInfo").should(function(response)
      {
        const BinData = response.body.data;
        expect(BinData.bin).to.eq(binNumber);
        //const CardType = response.body.data.scheme;
        //Hello
        
        expect(BinData.scheme).to.eq('AMERICAN EXPRESS');
      expect(binData.type).to.eq('CREDIT');
      })
      cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)").type(' ').should('not.have.value',' ');
    })
  })

  });
  