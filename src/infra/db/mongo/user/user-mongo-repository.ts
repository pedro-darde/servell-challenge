import {AddUserRepository} from "../../../../data/protocols/db/users/add-user-repository";
import {EditUserRepository} from "../../../../data/protocols/db/users/edit-user-repository";
import {RemoveUserRepository} from "../../../../data/protocols/db/users/remove-user-repository";
import {LoadUsersRepository} from "../../../../data/protocols/db/users/load-users-repository";
import {UserModel} from "../../../../domain/models/user-result";
import {AddUserModel} from "../../../../domain/usecase/add-user";
import {UserEditModel} from "../../../../domain/usecase/edit-user";
import {MongoHelper} from "../../../helpers/mongo-helper";
import {ObjectId} from "mongodb";

export class UserMongoRepository implements AddUserRepository, EditUserRepository, RemoveUserRepository, LoadUsersRepository {
    async add(user: AddUserModel): Promise<UserModel> {
        const userCollection = await MongoHelper.getCollection('users')
        const {insertedId} = await userCollection.insertOne(user)
        const result = await userCollection.findOne(insertedId)
        return MongoHelper.map(result)
    }

    async edit(id: string, newUserData: UserEditModel): Promise<UserModel> {
        const userCollection = await MongoHelper.getCollection('users')
        await userCollection.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                ...newUserData
            }
        })
        const result = await userCollection.findOne(new ObjectId(id))
        return MongoHelper.map(result)
    }

    async load(): Promise<UserModel[]> {
        const userCollection = await MongoHelper.getCollection('users')
        const accounts = await userCollection.find()
        return accounts.toArray() as unknown as UserModel[]
    }

    async remove(id: string): Promise<void> {
        const userCollection = await MongoHelper.getCollection('users')
        await userCollection.deleteOne({_id: new ObjectId(id)})
    }

}
