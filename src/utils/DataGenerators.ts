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
}