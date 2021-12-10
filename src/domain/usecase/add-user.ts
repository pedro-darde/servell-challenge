import { UserModel } from "../models/user-result";

export type AddUserModel = Omit<UserModel, "id">;

export interface AddUser {
  add: (user: AddUserModel) => Promise<UserModel>;
}
