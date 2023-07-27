export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    sex: string,
    id: string,
    fav: boolean,
    hobbies: {
        label: string,
        value: string | boolean
    }[],
}
