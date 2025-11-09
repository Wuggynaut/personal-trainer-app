import { Dayjs } from "dayjs";

export type Customer = {
    id: string;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        }
        customer: {
            href: string;
        }
        trainings: {
            href: string;
        }
    }
};

export type CustomerResponse = {
    _embedded: {
        customers: Array<Omit<Customer, 'id'>>; // Customer without 'id'
    }
};

export type TrainingResponse = {
    id: string;
    date: string;
    duration: number;
    activity: string;
    customer: Customer;
};

export type Training = {
    id: string;
    date: Dayjs;
    duration: number;
    activity: string;
    customer: Customer;
};

export type NewTraining = {
    date: string;
    duration: string;
    activity: string;
    customer: string; // Customer URL
};