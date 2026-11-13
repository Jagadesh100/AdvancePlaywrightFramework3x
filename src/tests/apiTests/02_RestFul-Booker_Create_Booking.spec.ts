import { test, expect } from "@playwright/test";

test(`Create Booking`, async ({ request }) => {
     const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        };

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
  console.log(responseData);
  const data = await responseData.json();
  console.log(data);
  
  expect(data.booking.firstname).toBe(payload.firstname);
});
