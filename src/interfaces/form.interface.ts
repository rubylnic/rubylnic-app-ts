import { Dispatch, SetStateAction } from "react";

export interface IFormStep {
    setActiveFormStep: Dispatch<SetStateAction<number>>;
}
export type FormDataType = {
    firstName?: string,
    lastName?: string,
    email?: string,
    gender?: string,
    hobbies?: {
        coding: boolean,
        reading: boolean,
        surfing: boolean,
    }
}