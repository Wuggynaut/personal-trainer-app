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
}

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
}

export type Training = {
    date: Dayjs;
    duration: number;
    activity: string;
    _links: TrainingResponse['_links'];
}