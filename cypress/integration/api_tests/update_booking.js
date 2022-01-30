///<reference types="Cypress"/>

const payload = require('../../fixtures/bookingDetails') //Fetching booking details from this file.

describe('Updating details of Bookings',()=>{

    let BaseURL = 'https://restful-booker.herokuapp.com'

    it('Updating a booking without auth token',()=>{

        cy.request({
            //Trying to update a booking without API call
            method:'PUT',
            url: BaseURL + '/booking/21',
            failOnStatusCode: false,
            headers:{
                'Content-Type': 'application/json'
            },
            body:{
                "firstname" : payload.firstname,
                "lastname" : payload.lastname,
                "totalprice" : payload.totalprice,
                "depositpaid" : payload.depositpaid,
                "bookingdates" : payload.bookingdates,
                "additionalneeds" : payload.additionalneeds
            }
        }).then((res)=>{
            //User should be forbidden from updating without any autherization
            expect(res.status).to.equal(403)
        })
    })

    it('Updating a booking with auth token',()=>{

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
            //
            expect(res.status).to.equal(200)
            const authtoken = res.body.token
            cy.log('Token is ' + authtoken)
            cy.request({
                method:'PUT',
                url: BaseURL + '/booking/8',
                failOnStatusCode: false,
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': 'token=' + authtoken
                },
                body:{
                        "firstname" : payload.firstname,
                        "lastname" : payload.lastname,
                        "totalprice" : payload.totalprice,
                        "depositpaid" : payload.depositpaid,
                        "bookingdates" : payload.bookingdates,
                        "additionalneeds" : payload.additionalneeds
                }
            }).then((res)=>{
                expect(res.status).to.equal(200)
            })
        })
    })

    it('Partially updating a booking with auth token',()=>{

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
            //
            expect(res.status).to.equal(200)
            const authtoken = res.body.token
            cy.log('Token is ' + authtoken)
            cy.request({
                method:'PATCH',
                url: BaseURL + '/booking/8',
                failOnStatusCode: false,
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': 'token=' + authtoken
                },
                body:{
                        "firstname" : payload.firstname,
                        "lastname" : payload.lastname,
                }
            }).then((res)=>{
                expect(res.status).to.equal(200)
            })
        })
    })
})