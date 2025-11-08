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

export type TrainingResponse = {
    id: string;
    date: string;
    duration: number;
    activity: string;
    _links: {
        self: {
            href: string;
        }
        training: {
            href: string;
        }
        customer: {
            href: string;
        }
    }
};

export type Training = {
    id: string;
    date: Dayjs;
    duration: number;
    activity: string;
    customer: Customer;
    _links: TrainingResponse['_links'];
};

export type NewTraining = {
    date: string;
    duration: string;
    activity: string;
    customer: string; // Customer URL
};