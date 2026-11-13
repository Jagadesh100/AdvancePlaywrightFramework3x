import { faker } from "@faker-js/faker";

export interface Credentials {
    userName :  string;
    password : string;
}

export interface CheckoutCustomer {
    firstName : string;
    lastName : string;
    postalCode : string;
}

export class DataGenerator{
    static userName() : string{
        return faker.internet.username();
    }

    static password(length=12) : string{
        return faker.internet.password();
    }

    static firstName() : string{
        return faker.person.firstName();
    }

    static lastName() : string{
        return faker.person.lastName();
    }

    static postalCode() : string{
        return faker.location.zipCode();
    }

    static credentials(): Credentials{
        return {
            userName : DataGenerator.userName(),
            password : DataGenerator.password()
        }
    }

    static checkOutCustomer() : CheckoutCustomer{
        return{
            firstName : DataGenerator.firstName(),
            lastName : DataGenerator.lastName(),
            postalCode : DataGenerator.postalCode()
        }
    }

     /**
     * Date as `YYYY-MM-DD`, offset from a reference date.
     * Pass a negative offset for the past. `from` defaults to today, so
     * generated dates move with the calendar instead of ageing into the past.
     */
    static dateOffset(days: number, from: Date = new Date()): string {
        const d = new Date(from);
        d.setUTCDate(d.getUTCDate() + days);
        return d.toISOString().slice(0, 10);
    }

     /** Pick one item from a list. Throws on an empty list rather than returning undefined. */
    static oneOf<T>(items: readonly T[]): T {
        if (items.length === 0) {
            throw new Error('[DataGenerator] oneOf() needs a non-empty list');
        }
        return faker.helpers.arrayElement(items);
    }

    // ---------- primitives ----------

    /** Whole number in an inclusive range, e.g. a price or a quantity. */
    static number(min: number, max: number): number {
        return faker.number.int({ min, max });
    }

    /** Random true/false, for flags such as depositpaid. */
    static bool(): boolean {
        return faker.datatype.boolean();
    }

}