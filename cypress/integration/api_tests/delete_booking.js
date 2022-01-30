///<reference types="Cypress"/>

describe('Deleting a booking',()=>{

    let BaseURL = 'https://restful-booker.herokuapp.com'
    
    it('User should be able to delete an already exisitng booking',()=>{

        cy.request({
            //Getting the Auth token
            method:'POST',
            url: BaseURL + '/auth',
            failOnStatusCode: false,
            headers:{
                'Content-Type': 'application/json'
            },
            body:{
                "username" : "admin",
                "password" : "password123"
            }
        }).then((res)=>{
            expect(res.status).to.equal(200)
            const authtoken = res.body.token
            cy.log('Token is ' + authtoken)
            cy.request({
                method:'GET',
                url: BaseURL + '/booking',
                failOnStatusCode: false,
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                 //Getting one bookingid and then using it to delete that booking
                const bookingID = res.body[2].bookingid
                cy.request({
                    method:'DELETE',
                    url: BaseURL + '/booking/' + bookingID,
                    failOnStatusCode: false,
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Cookie': 'token=' + authtoken
                    }
                }).then((res)=>{
                    expect(res.status).to.equal(201)
                })
            })
            
        })
    })

    it('User should not be able to delete without authorisation',()=>{
        cy.request({
            method:'GET',
            url: BaseURL + '/booking',
            failOnStatusCode: false,
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
             //Getting one bookingid and then using it to delete that booking
            const bookingID = res.body[2].bookingid
            cy.request({
                method:'DELETE',
                url: BaseURL + '/booking/' + bookingID,
                failOnStatusCode: false,
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }).then((res)=>{
                expect(res.status).to.equal(403)
            })
        })
    })

    it('User should not be able to delete a non existent booking',()=>{

        cy.request({
            //Getting the Auth token
            method:'POST',
            url: BaseURL + '/auth',
            failOnStatusCode: false,
            headers:{
                'Content-Type': 'application/json'
            },
            body:{
                "username" : "admin",
                "password" : "password123"
            }
        }).then((res)=>{
            expect(res.status).to.equal(200)
            const authtoken = res.body.token
            cy.log('Token is ' + authtoken)
            cy.request({
                method:'DELETE',
                url: BaseURL + '/booking/0' ,
                failOnStatusCode: false,
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': 'token=' + authtoken
                }
            }).then((res)=>{
                    expect(res.status).to.equal(405)
                })
            })
            
        
    })
})