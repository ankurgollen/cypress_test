///<reference types="Cypress"/>

describe('Get Details about bookings testcases',()=>{
    
    let BaseURL = 'https://restful-booker.herokuapp.com'

    it('User should be able to get details about any random booking',()=>{
        cy.request({
            //Getting some random booking ids
            method:'GET',
            url: BaseURL + '/booking',
            failOnStatusCode: false,
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            //Getting one bookingid and then using it to get details of that booking
            const bookingID = res.body[0].bookingid
            expect(res.status).to.equal(200)
            cy.log(bookingID)
            cy.request({
                method:'GET',
                url: BaseURL + '/booking/' + bookingID,
                failOnStatusCode: false,
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                //Verifying booking details exist
                expect(res.status).to.equal(200)
                expect(res.body.firstname).to.exist
                expect(res.body.lastname).to.exist
                expect(res.body.totalprice).to.exist
                expect(res.body.depositpaid).to.exist
                expect(res.body.bookingdates.checkin).to.exist
                expect(res.body.bookingdates.checkout).to.exist
            })
        })
    })

    it('User should not be getting any data with wrong booking id',()=>{
        cy.request({
            //Getting details of a non existent booking
            method:'GET',
            url: BaseURL + '/booking/0',
            failOnStatusCode: false,
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            //Verfiying that error 404 is thrown in case of non existent booking id
            expect(res.status).to.equal(404)
        })
    })

    it('User should be getting data without any header types',()=>{
        cy.request({
            //Getting details of a booking
            method:'GET',
            url: BaseURL + '/booking/8',
            failOnStatusCode: false,
            // headers:{
            //     'Content-Type': 'text/xml'
            // }
        }).then((res)=>{
            //Verifying the details exist
            expect(res.status).to.equal(200)
            expect(res.body.firstname).to.exist
            expect(res.body.lastname).to.exist
            expect(res.body.totalprice).to.exist
            expect(res.body.depositpaid).to.exist
            expect(res.body.bookingdates.checkin).to.exist
            expect(res.body.bookingdates.checkout).to.exist
        })
    })

})