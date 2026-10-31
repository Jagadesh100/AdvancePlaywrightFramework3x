import { Locator, Page} from "@playwright/test";

export class LoginPage {
    readonly page:Page;
    readonly userNameInput : Locator;
    readonly passwordInput : Locator;
    readonly loginButton : Locator;
    readonly titleofThePage : Locator;

    constructor(page : Page){
        this.page = page;
        this.userNameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.getByRole('button', {name:'Login', exact:true});
        this.titleofThePage = page.locator(".tta-brand-title");
    }

    async gotoLoginPage(url:string){
        await this.page.goto(url);
    }

    async enterLoginCredentials(userName:string, password: string){
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
    }

    async clickOnLoginButton(){
        await this.loginButton.click();
    }    
}