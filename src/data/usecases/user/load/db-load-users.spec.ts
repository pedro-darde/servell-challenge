
import {LoadUsersRepository} from "../../../protocols/db/users/load-users-repository";
import {UserModel} from "../../../../domain/models/user-result";
import {DbLoadUsers} from "./db-load-users";

interface SutTypes {
    sut: DbLoadUsers;
    loadUserRepositoryStub: LoadUsersRepository;
}

const usersModelsFakes = (): UserModel[] => ([{
    id: 'any_id',
    cargo: "any_cargo",
    idade: 20,
    nome: "any_nome",
}, {
    id: 'another_id',
    cargo: "another_cargo",
    idade: 25,
    nome: "another_nome",
}])


const makeLoadUserRepository = (): LoadUsersRepository => {
    class LoadUserRepositoryStub implements LoadUsersRepository {
        async load(): Promise<UserModel[]> {
            return usersModelsFakes();
        }
    }
    return new LoadUserRepositoryStub();
};

const makeSut = (): SutTypes => {
    const loadUserRepositoryStub = makeLoadUserRepository();
    const sut = new DbLoadUsers(loadUserRepositoryStub);

    return {
        sut,
        loadUserRepositoryStub,
    };
};

describe("DbLoadUsers usecases", () => {
    test("Should call loadUserRepository", async () => {
        const {sut, loadUserRepositoryStub} = makeSut()
        const loadUsersRepositorySpy = jest.spyOn(loadUserRepositoryStub, 'load')
        await sut.load()
        expect(loadUsersRepositorySpy).toHaveBeenCalled()
    });

    test('Should returns an list of UserModel on success', async () => {
        const {sut} = makeSut()
        const result = await sut.load()
        expect(result).toEqual(usersModelsFakes())
    })

    test('Should returns empty if no results is found', async () => {
        const {sut, loadUserRepositoryStub} = makeSut()
        jest.spyOn(loadUserRepositoryStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
        const result = await sut.load()
        expect(result).toEqual([])
    })

    test('Should throws if loadUsersRepository throws', () => {
        const {sut, loadUserRepositoryStub} = makeSut()
        jest.spyOn(loadUserRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.load()
        expect(promise).rejects.toThrow()
    })
});











