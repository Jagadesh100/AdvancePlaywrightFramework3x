import { test, expect } from "@playwright/test";

interface BookingDates {
  checkin: string;
  checkout: string;
}

interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

interface AuthTokenResponse {
  token: string;
}

interface CreateBookingResponse {
  bookingid: number;
  booking: BookingPayload;
}

interface BookingFlowState {
  token?: string;
  bookingId?: number;
}

interface AuthPayload {
  username: string;
  password: string;
}

test.describe.serial(`Restful Booker CRUD APIT test`, async () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // Create Booking
  const createBookingPayload: BookingPayload = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  const bookingFlowState: BookingFlowState = {};

  test(`TC1 Create token`, async ({ request }) => {
    await test.step(`Create Token`, async () => {
      const authPayload: AuthPayload = {
        username: "admin",
        password: "password123",
      };

      const responseData = await request.post(
        "https://restful-booker.herokuapp.com/auth",
        {
          headers,
          data: authPayload,
        },
      );

      expect(responseData.status()).toBe(200);
      const data = (await responseData.json()) as AuthTokenResponse;
      expect(data.token).toBeTruthy();
      bookingFlowState.token = data.token;
    });
  });

  test(`TC2 Create Booking`, async ({ request }) => {
    await test.step(`Create Booking`, async () => {
      const responseData = await request.post(
        "https://restful-booker.herokuapp.com/booking",
        {
          headers,
          data: createBookingPayload,
        },
      );
      expect(responseData.status()).toBe(200);
      const data = (await responseData.json()) as CreateBookingResponse;
      console.log(data);

      expect(data.booking.firstname).toBe(createBookingPayload.firstname);
      bookingFlowState.bookingId = data.bookingid;
    });
  });

  test(`TC3 Update Booking`, async ({ request }) => {
    await test.step(`Update Booking`, async () => {
      const token = bookingFlowState.token;
      const bookingId = bookingFlowState.bookingId;
      expect(token, "TC1 must create the auth token before TC3 runs").toBeTruthy();
      expect(bookingId, "TC2 must create the booking before TC3 runs").toBeDefined();
      const updatePayload: BookingPayload = {
        firstname: "Updated",
        lastname: "Updated",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      };

      console.log(`Booking id: ${bookingFlowState.bookingId}`);
      const updateResponse = await request.put(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
          headers: {
            ...headers,
            Cookie: `token=${token}`,
          },
          data: updatePayload,
        },
      );

      expect(updateResponse.status()).toBe(200);
      const dataUpdated = (await updateResponse.json()) as BookingPayload;
      console.log(dataUpdated);

      expect(dataUpdated.firstname).toBe(updatePayload.firstname);
      expect(dataUpdated.lastname).toBe(updatePayload.lastname);
    });
  });
});
