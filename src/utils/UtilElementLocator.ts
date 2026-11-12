import { expect, Locator , Page } from "@playwright/test";
import { createLogger, Logger } from "@utils/logger";

export const DEFAULT_ACTION_TIMEOUT_MS = 15_000;

export type Flex = string | Locator;

export class UtilElementLocator{
    private readonly page : Page;
    private readonly log : Logger;

    constructor(page: Page, scope : string = 'UtilElementLocator'){
        this.page = page;
        this.log = createLogger(scope);
    }

    private toLocator(target : Flex): Locator{
        return typeof target === 'string' ? this.page.locator(target): target;
    }

    private describe(target: Flex) : string{
        return typeof target === 'string' ? target:target.toString();
    }

    // ---------- Mouse Actions ------------
    async click(target: Flex, timeout : number = DEFAULT_ACTION_TIMEOUT_MS) : Promise<void>{
        const loc = this.toLocator(target);
        this.log.debug(`Clicking ${this.describe(target)}`);
        await loc.click({ timeout: timeout });
    }

    async doubleClick(target: Flex, timeout : number = DEFAULT_ACTION_TIMEOUT_MS) : Promise<void>{
        const loc = this.toLocator(target);
        this.log.debug(`Double Click ${this.describe(target)}`);
        await loc.dblclick({ timeout: timeout });
    }

    async rightClick(target: Flex, timeout : number = DEFAULT_ACTION_TIMEOUT_MS) : promise<void>{
        const loc = this.toLocator(target);
        this.log.debug(`Right Click on ${this.describe(target)}`);
        await loc.click({button:'right', timeout: timeout});
    }

    async hover(target : Flex, timeout : number = DEFAULT_ACTION_TIMEOUT_MS) : Promise<void>{
        const loc = this.toLocator(target);
        this.log.debug(`Hover on ${this.describe(target)}`);
        await loc.hover({timeout:timeout});
    }

    async clear(target: Flex, timeout : number = DEFAULT_ACTION_TIMEOUT_MS) : Promise<void>{
        const loc = this.toLocator(target);
        this.log.debug(`Clicking ${this.describe(target)}`);
        await loc.clear({ timeout: timeout });
    }

    // ------- Input Actions ---------

    async fill(target: Flex, value: string,  timeout:number = DEFAULT_ACTION_TIMEOUT_MS) : Promise<void>{
        const loc = this.toLocator(target);
        this.log.debug(`Fill the content in ${this.describe(target)}`);
        await loc.fill(value, {timeout : timeout});
    }

    async pressSequentially(target: Flex, value: string , timeout:number = DEFAULT_ACTION_TIMEOUT_MS) : Promise<void>{
        const loc = this.toLocator(target);
        this.log.debug(`Press the Characters One by One in ${this.describe(target)}`);
        await loc.pressSequentially(value, {timeout : timeout});
    }

    // Text & Content getters

    // usage for <div>, <span>, <p>
    async getText(target : Flex) : Promise<string>{
        const loc = this.toLocator(target);
        const text = await loc.textContent() ?? '';
        return text.trim();
    }

     // usage for <div>, <span>, <p>
    async getInnerText(target : Flex) : Promise<string> {
        const loc = this.toLocator(target);
        const text = await loc.innerText() ?? '';
        return text.trim();
    }

    async getAllTexts(target : Flex) : Promise<string[]>{
        const loc = this.toLocator(target);
        const texts = await loc.allTextContents() ?? '';
        return texts.map((text)=>text.trim());
    }

    async getAttribute(target : Flex, attributeName: string) : Promise<string>{
        const loc = this.toLocator(target);
        const attributValue = await loc.getAttribute(attributeName) ?? '';
        return attributValue.trim();
    }

     // usage for <input>, <textarea>, <select>
    async getValue(target : Flex) : Promise<string> {
        const loc = this.toLocator(target);
        const inputValue = await loc.inputValue();
        return inputValue;
    }

    // ----- Count ------
    async count(target : Flex) : Promise<number>{
        const loc = this.toLocator(target);
        return await loc.count();
    }

    // ------ State Checks -------
    async isVisible(target : Flex) : Promise<boolean>{
        const loc = this.toLocator(target);
        return await loc.isVisible();
    }

    async isEnabled(target : Flex) : Promise<boolean> {
        const loc = this.toLocator(target);
        return await loc.isEnabled();
    }

    async isDisabled(target : Flex) : Promise<boolean> {
        const loc = this.toLocator(target);
        return await loc.isDisabled();
    }

    async isChecked(target : Flex) : Promise<boolean> {
        const loc = this.toLocator(target);
        return await loc.isChecked();
    }

    async isEditable(target : Flex) : Promise<boolean> {
        const loc = this.toLocator(target);
        return await loc.isEditable();
    }

    async isHidden(target : Flex) : Promise<boolean> {
        const loc = this.toLocator(target); 
        return await loc.isHidden();
    }

    // ------- Waits --------
    async waitForVisible(target : Flex, timeout : number = DEFAULT_ACTION_TIMEOUT_MS) : Promise <void> {
        const loc = this.toLocator(target);
        this.log.debug(`Wait for ${this.describe(target)} the element to be Visible`);
        await expect(loc).toBeVisible({timeout: timeout});
    }

    async waitForHidden(target : Flex, timeout : number = DEFAULT_ACTION_TIMEOUT_MS) : Promise<void>{
        const loc = this.toLocator(target);
        this.log.debug(`Wait for ${this.describe(target)} the element to be Hidden`);
        await expect(loc).toBeHidden({timeout: timeout});
    }

    async waitForPageToLoad() : Promise<void> {
        this.log.debug(`Wait For Page to Load`);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // --------- Selects ----------
    async selectByIndex(target : Flex, indexNumber : number) : Promise<void> {
        const loc = this.toLocator(target);
        await loc.selectOption({ index: indexNumber})
    }

    async selectByValue(target : Flex, value : string) : Promise<void> {
        const loc = this.toLocator(target);
        await loc.selectOption({ value: value})
    }

    async selectByTextOrLabel(target : Flex, label : string) : Promise<void>{
        const loc = this.toLocator(target);
        await loc.selectOption({ label : label });
    }

}