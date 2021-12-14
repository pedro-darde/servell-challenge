import {UserModel} from "../models/user-result";

export interface LoadUsers {
    load: () => Promise<UserModel[]>;
    loadById: (id: string) => Promise<UserModel | undefined>;
}
