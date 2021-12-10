import { UserModel } from "../models/user-result";

export type UserEditModel = Partial<UserModel>;
export interface EditUser {
  edit: (id: string, newUserInfo: UserEditModel) => Promise<UserModel>;
}
