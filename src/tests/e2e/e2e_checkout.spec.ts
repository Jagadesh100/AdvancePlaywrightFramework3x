import { test , expect } from "@fixtures/test-base";
import { DataGenerator } from "@utils/DataGenerators";
import { createLogger } from "@utils/logger";

const URL = "https://app.thetestingacademy.com/playwright/ttacart/";
const userName = "standard_user";
const password = "tta_secret";
const Credentials = DataGenerator.credentials();

// First product card on the TTACart inventory page.
const FIRST_ITEM_ID = 'test-allthethings-tshirt-red';
const log = createLogger('e2e-checkout');

test.describe(`E2E Test Scenarios`, async()=>{
    test(`Valid User name and password`, async({loginPage})=>{
        await loginPage.open();
        await loginPage.loginAs(userName,password);
        await loginPage.clickOnLoginButton();
    });

    test(`Invalid User name and password`, async({loginPage})=>{
        await loginPage.open();
        await loginPage.loginAs(Credentials.userName,Credentials.password);
        await loginPage.clickOnLoginButton();
    });

    test('should complete checkout successfully', async ({
        loginPage,
        inventoryPage,
        cartPage,
        checkputPageone,
        checkoutPageTwo,
        orderCompletionPage,
    }) => {
        await loginPage.open();
        await loginPage.loginAs(userName,password);
        await loginPage.clickOnLoginButton();
        const customer = DataGenerator.checkOutCustomer();
       
       
        await inventoryPage.open();
        await inventoryPage.addToCart(FIRST_ITEM_ID);
        await cartPage.open();
        expect(await cartPage.rowCount()).toBe(1);
        await cartPage.checkout();
        await checkputPageone.assertLoaded();
        await checkputPageone.fillGuest(customer);
        await checkputPageone.continue();
        await checkoutPageTwo.assertLoaded();
        await checkoutPageTwo.finish();
        await orderCompletionPage.assertOrderComplete();

    });
})