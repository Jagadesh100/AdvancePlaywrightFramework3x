import { test, expect } from '@fixtures/test-base';
import { DataGenerator } from '@utils/DataGenerators';
import { visualStep } from '@utils/visualSteps';

const USERNAME = 'standard_user';
const PASSWORD = 'tta_secret';
const LOCKED_OUT_USERNAME = 'locked_out_user';
const FIRST_ITEM_ID = 'test-allthethings-tshirt-red';

test.describe('E2E checkout scenarios with visual steps', () => {
    test('valid user can log in', async ({ page, loginPage }) => {
        await visualStep(page, 'Log in as a valid user', async () => {
            await loginPage.open();
            await loginPage.loginAs(USERNAME, PASSWORD);
            await loginPage.clickOnLoginButton();
        });
    });

    test('locked-out user cannot log in', async ({ page, loginPage }) => {
        await visualStep(page, 'Attempt login as a locked-out user', async () => {
            await loginPage.open();
            await loginPage.loginAs(LOCKED_OUT_USERNAME, PASSWORD);
            await loginPage.clickOnLoginButton();
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });
    });

    test('user can complete checkout', async ({
        page,
        loginPage,
        inventoryPage,
        cartPage,
        checkputPageone,
        checkoutPageTwo,
        orderCompletionPage,
    }) => {
        const customer = DataGenerator.checkOutCustomer();

        await visualStep(page, 'Log in as a valid user', async () => {
            await loginPage.open();
            await loginPage.loginAs(USERNAME, PASSWORD);
            await loginPage.clickOnLoginButton();
        });

        await visualStep(page, 'Add the first item to the cart', async () => {
            await inventoryPage.open();
            await inventoryPage.addToCart(FIRST_ITEM_ID);
        });

        await visualStep(page, 'Verify the cart contains one item', async () => {
            await cartPage.open();
            await expect.poll(() => cartPage.rowCount()).toBe(1);
        });

        await visualStep(page, 'Enter checkout customer details', async () => {
            await cartPage.checkout();
            await checkputPageone.assertLoaded();
            await checkputPageone.fillGuest(customer);
        });

        await visualStep(page, 'Review the order', async () => {
            await checkputPageone.continue();
            await checkoutPageTwo.assertLoaded();
        });

        await visualStep(page, 'Complete the order', async () => {
            await checkoutPageTwo.finish();
            await orderCompletionPage.assertOrderComplete();
        });
    });
});
