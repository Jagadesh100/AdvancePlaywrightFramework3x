import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const URL = "https://app.thetestingacademy.com/playwright/ttacart/";
const userName = "standard_user";
const password = "tta_secret";

test.describe(`Login Tests`, async()=>{
    test(`Login`, async({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(URL);
        await loginPage.enterLoginCredentials(userName,password);
        await loginPage.clickOnLoginButton();
        await page.pause();
    });
});