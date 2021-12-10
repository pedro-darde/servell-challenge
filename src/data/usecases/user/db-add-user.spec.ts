import {AddUserRepository} from "@src/data/protocols/db/users/add-user-repository";
import {UserModel} from "@src/domain/models/user-result";
import {AddUser, AddUserModel} from "@src/domain/usecase/add-user";
import {DbAddUser} from "./db-add-user";
import exp from "constants";

interface SutTypes {
    sut: DbAddUser;
    addUserRepositoryStub: AddUserRepository;
}

const makeFakeUserData = (): AddUserModel => ({
    cargo: "any_cargo",
    idade: 20,
    nome: "any_nome",
});

const userModelFake = (): UserModel => ({
    id: 'any_id',
    cargo: "any_cargo",
    idade: 20,
    nome: "any_nome",
})

const makeAddUserRepository = (): AddUserRepository => {
    class AddUserRepositoryStub implements AddUserRepository {
        async add(userModel: AddUserModel): Promise<UserModel> {
            return userModelFake();
        }
    }

    return new AddUserRepositoryStub();
};

const makeSut = (): SutTypes => {
    const addUserRepositoryStub = makeAddUserRepository();
    const sut = new DbAddUser(addUserRepositoryStub);

    return {
        sut,
        addUserRepositoryStub,
    };
};

describe("DbAddUser usecases", () => {
    test("Should call AddUserRepository with correct values", async () => {
        const {sut, addUserRepositoryStub} = makeSut();
        const addSpy = jest.spyOn(addUserRepositoryStub, "add");

        await sut.add(makeFakeUserData());

        expect(addSpy).toHaveBeenCalledWith({
            cargo: "any_cargo",
            idade: 20,
            nome: "any_nome",
        });
    });

    test('Should return an User on success', async () => {
        const {sut} = makeSut()

        const account = await sut.add(makeFakeUserData())

        expect(account).toEqual({
            id: 'any_id',
            cargo: "any_cargo",
            idade: 20,
            nome: "any_nome",
        })
    })
   test('Should throw if addUserRepository throws', () => {
     const { sut, addUserRepositoryStub } = makeSut()
     jest.spyOn(addUserRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
     const promise = sut.add(makeFakeUserData())
     expect(promise).rejects.toThrow()
   })
});
