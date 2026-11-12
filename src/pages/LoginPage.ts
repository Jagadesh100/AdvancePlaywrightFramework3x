import { Locator, Page} from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{
    readonly page:Page;
    private readonly userNameInput : Locator;
    private readonly passwordInput : Locator;
    private readonly loginButton : Locator;
    private readonly titleofThePage : Locator;

    static readonly PATH = '/playwright/ttacart/index.html';

    constructor(page : Page){
        super(page, 'LoginPage');
        this.page = page;
        this.userNameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.getByRole('button', {name:'Login', exact:true});
        this.titleofThePage = page.locator(".tta-brand-title");
    }

    async open(): Promise<void> {
        this.log.info("Open login page");
        await this.goto(LoginPage.PATH);
    }

    async loginAs(userName:string, password: string){
        this.log.info("Enters the UserName in UserName textbox");
        await this.element.fill(this.userNameInput, userName)
        this.log.info("Enters the UserName in Password textbox");
        await this.element.fill(this.passwordInput,password);
    }

    async clickOnLoginButton(){
        this.log.info("Click on Login Button");
        await this.element.click(this.loginButton);
    }    
}