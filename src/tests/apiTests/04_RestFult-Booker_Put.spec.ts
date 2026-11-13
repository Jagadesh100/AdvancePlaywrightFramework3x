import {test, expect} from "@playwright/test";

test(`Put Request`, async({request})=>{
    // Create Auth
    // Create Booking
    // Update booking
         const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        };

    const authPayload ={
        username: 'admin',
        password: 'password123'
    }

    const authResponse = await request.post("https://restful-booker.herokuapp.com/auth",{
        headers,
        data: authPayload
    });

    expect(authResponse.status()).toBe(200);
    const authData = await authResponse.json();
    const tokenId = authData.token;
    console.log(tokenId)

    // Create Booking
    const payload = {
                firstname: 'Jim',
                lastname: 'Brown',
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                        checkin: '2018-01-01',
                        checkout: '2019-01-01',
                },
                additionalneeds: 'Breakfast',
        }

  const responseData = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      headers,
      data: payload,
    },
  );
  expect(responseData.status()).toBe(200);
  const data = await responseData.json();
  console.log(data);
  
  expect(data.booking.firstname).toBe(payload.firstname);
  const bookingId = data.bookingid;

const updatePayload = {
                firstname: 'Updated',
                lastname: 'Updated',
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                        checkin: '2018-01-01',
                        checkout: '2019-01-01',
                },
                additionalneeds: 'Breakfast',
        }
  const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
   { 
    headers: {
      ...headers,
      Cookie: `token=${tokenId}`,
    },
    data: updatePayload
    }
  );
  expect(updateResponse.status()).toBe(200);
  const dataUpdated = await updateResponse.json();
  console.log(dataUpdated);
  
  expect(dataUpdated.firstname).toBe(updatePayload.firstname);
  expect(dataUpdated.lastname).toBe(updatePayload.lastname);
});

