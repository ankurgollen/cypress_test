///<reference types="Cypress"/>

const payload = require('../../fixtures/bookingDetails') //Fetching booking details from this file.

describe('Create Booking cases',()=>{
    
    let BaseURL = 'https://restful-booker.herokuapp.com'

    it('User should be able to create a new booking',()=>{
        cy.request({
            //Creating a new booking
            method:'POST',
            url: BaseURL + '/booking',
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
            //Verifying the response of POST call with data file
            expect(res.status).to.equal(200)
            expect(res.body.booking.firstname).to.equal(payload.firstname)
            expect(res.body.booking.lastname).to.equal(payload.lastname)
            expect(res.body.booking.totalprice).to.equal(payload.totalprice)
            expect(res.body.booking.depositpaid).to.equal(payload.depositpaid)
            expect(res.body.booking.bookingdates.checkin).to.equal(payload.bookingdates.checkin)
            expect(res.body.booking.bookingdates.checkout).to.equal(payload.bookingdates.checkout)
            expect(res.body.booking.additionalneeds).to.equal(payload.additionalneeds)
        }).then((res)=>{
            //Verifying the response of POST call by fetching the created booking
            const bookingID = res.body.bookingid
            cy.log("Booking id is " + bookingID)
            cy.request({
                method:'GET',
                url: BaseURL + '/booking/' + bookingID,
                failOnStatusCode: false,
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                expect(res.status).to.equal(200)
                expect(res.body.firstname).to.equal(payload.firstname)
                expect(res.body.lastname).to.equal(payload.lastname)
                expect(res.body.totalprice).to.equal(payload.totalprice)
                expect(res.body.depositpaid).to.equal(payload.depositpaid)
                expect(res.body.bookingdates.checkin).to.equal(payload.bookingdates.checkin)
                expect(res.body.bookingdates.checkout).to.equal(payload.bookingdates.checkout)
                expect(res.body.additionalneeds).to.equal(payload.additionalneeds)
            })
        })
    })

    it('User should not be able to book with any value null',()=>{
        cy.request({
            //Creating a new booking
            method:'POST',
            url: BaseURL + '/booking',
            failOnStatusCode: false,
            headers:{
                'Content-Type': 'application/json'
            },
            body:{
                    "firstname" : null,
                    "lastname" : payload.lastname,
                    "totalprice" : payload.totalprice,
                    "depositpaid" : payload.depositpaid,
                    "bookingdates" : payload.bookingdates,
                    "additionalneeds" : payload.additionalneeds
            }
        }).then((res)=>{
            expect(res.status).to.equal(500)
        })
    })

    it('User should not be able to book with checkin date > checkout date',()=>{
        cy.request({
            //Creating a new booking
            method:'POST',
            url: BaseURL + '/booking',
            failOnStatusCode: false,
            headers:{
                'Content-Type': 'application/json'
            },
            body:{
                    "firstname" : payload.firstname,
                    "lastname" : payload.lastname,
                    "totalprice" : payload.totalprice,
                    "depositpaid" : payload.depositpaid,
                    "bookingdates" : {
                        "checkin" : "2020-01-01",
                        "checkout" : "2019-01-01"
                      },
                    "additionalneeds" : payload.additionalneeds
            }
        }).then((res)=>{
            //Asserting that status should be 500, currently user is able to create a booking with checkin date > checkout date'
            expect(res.status).to.equal(500)
        })
    })

    it('User should be able to book with additional field added',()=>{
        cy.request({
            //Creating a new booking
            method:'POST',
            url: BaseURL + '/booking',
            failOnStatusCode: false,
            headers:{
                'Content-Type': 'application/json'
            },
            body:{
                    "firstname" : payload.firstname,
                    "lastname" : payload.lastname,
                    "totalprice" : payload.totalprice,
                    "depositpaid" : payload.depositpaid,
                    "bookingdates" : {
                        "checkin" : "2020-01-01",
                        "checkout" : "2019-01-01"
                      },
                    "additionalneeds" : payload.additionalneeds,
                    "randomKey": payload.firstname
            }
        }).then((res)=>{
            //Asserting that status should be 200, currently user is able to create a booking with additional field in body of post'
            expect(res.status).to.equal(200)
        })
    })
})
