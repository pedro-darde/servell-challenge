import {Collection} from "mongodb";
import {MongoHelper} from "../../../helpers/mongo-helper";
import {UserMongoRepository} from "./user-mongo-repository";

let userCollection: Collection

const makeSut = (): UserMongoRepository => {
    return new UserMongoRepository()
}

describe('User account mongo repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        userCollection = await MongoHelper.getCollection('users')
        await userCollection.deleteMany({})
    })

    describe('add()', () => {
        test('Should return an UserModel on success', async () => {
            const sut = makeSut()
            const user = await sut.add({
                cargo: 'any_cargo',
                nome: 'any_nome',
                idade: 10,
            })
            expect(user).toBeTruthy()
            expect(user.id).toBeTruthy()
        })
    })

    describe('edit()', () => {
        test('Should return an UserModel on edit success', async () => {
            const sut = makeSut();

            const {insertedId} = await userCollection.insertOne({
                cargo: 'any_cargo',
                nome: 'any_nome',
                idade: 10
            })
            const account = await sut.edit(insertedId.toHexString(), {nome: 'outro_nome'})
            expect(account.id).toBeTruthy()
            expect(account.nome).toBe('outro_nome')
        })
    })

    describe('load()', () => {
        test('should return an userModel list on success', async () => {
            const sut = makeSut();
            await userCollection.insertMany([
                {
                    cargo: 'any_cargo',
                    nome: 'any_nome',
                    idade: 10
                },
                {
                    cargo: 'any_cargo',
                    nome: 'any_nome',
                    idade: 10
                }
            ])

            const users = await sut.load();
            expect(users.length).toBe(2)
        })
    })

    describe('remove()', () => {
        test('should remove an account on success', async () => {
            const sut = makeSut()
            const {insertedId} = await userCollection.insertOne({
                nome: 'any_nome',
                cargo: 'any_cargo',
                idade: 10
            })

            await sut.remove(insertedId.toHexString())

            const user = await userCollection.findOne({_id: insertedId})
            expect(user).toBeFalsy()
        })
    })
})
