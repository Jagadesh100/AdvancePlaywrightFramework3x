import { test as base , expect} from "@playwright/test";

import { LoginPage } from "@pages/LoginPage";
import { InventoryPage } from "@pages/InventoryPage";
import { CartPage } from "@pages/CartPage";
import { CheckoutStepOnePage } from "@pages/CheckoutPageOne";
import { CheckoutStepTwoPage } from "@pages/CheckoutPageTwo";
import { OrderCompletePage } from "@pages/OrderCompletePage";

import LoginData  from "@testdata/logintestData.json";

export type LoginRecord = {
    username : string;
    password : string;
};

export type InvalidLoginState = {
    loginPage : LoginPage;
    username: string;
};

const users = LoginData as LoginRecord[];
const validUser = users.find(({username})=> username === 'standard_user');
const invaliduser = users.find(({username})=> username === 'locked_out_user');


if(!validUser || ! invaliduser) {
    throw new Error(`Required valid and invalid usernames are missing`);
}

export type TestFixture = {
    // Page Objects
    loginPage : LoginPage;
    inventoryPage : InventoryPage;
    cartPage : CartPage;
    checkputPageone : CheckoutStepOnePage;
    checkoutPageTwo : CheckoutStepTwoPage;
    orderCompletionPage : OrderCompletePage;

    // Ready to use application states
    invalidLogin : InvalidLoginState;
    validLogin : LoginPage;
}

export const test = base.extend<TestFixture> ({
    loginPage: async ({page}, use)=>{
        await use(new LoginPage(page));
    },


    inventoryPage: async ({page}, use)=>{
        await use(new InventoryPage(page));
    },

    cartPage : async({page}, use)=>{
        await use(new CartPage(page));
    },

    checkputPageone : async({page}, use)=>{
        await use(new CheckoutStepOnePage(page));
    },

    checkoutPageTwo : async({page}, use)=>{
        await use(new CheckoutStepTwoPage(page));
    },

    orderCompletionPage : async({page}, use)=>{
        await use(new OrderCompletePage(page));
    },

    // Successfull authentication state
    validLogin: async({loginPage, baseURL}, use)=>{
        if (!baseURL){
            throw new Error("BASE_URL is not configured");
        }
        await loginPage.gotoLoginPage(baseURL);
        await loginPage.loginAs(validUser.username,validUser.password);
        await loginPage.clickOnLoginButton();
        await use(loginPage);
    },

    // Negative Login => Locked out Account
    invalidLogin: async({page, loginPage, baseURL}, use)=>{
        if(!baseURL){
            throw new Error("Base URL is not configured");
        }
        await loginPage.gotoLoginPage(baseURL);
        await loginPage.loginAs(invaliduser.username,invaliduser.password);
        await loginPage.clickOnLoginButton();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await use({loginPage, username: invaliduser.username});
    }
});

export { expect };