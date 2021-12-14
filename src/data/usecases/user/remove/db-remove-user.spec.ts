
import {RemoveUserRepository} from "../../../protocols/db/users/remove-user-repository";
import {DbRemoveUser} from "./db-remove-user";

interface SutTypes {
    sut: DbRemoveUser;
    removeUserRepositoryStub: RemoveUserRepository;
}


const makeRemoveUserRepository = (): RemoveUserRepository => {
    class RemoveUserRepositoryStub implements RemoveUserRepository {
        async remove(id: string): Promise<void> {
        }
    }

    return new RemoveUserRepositoryStub();
};

const makeSut = (): SutTypes => {
    const removeUserRepositoryStub = makeRemoveUserRepository();
    const sut = new DbRemoveUser(removeUserRepositoryStub);

    return {
        sut,
        removeUserRepositoryStub,
    };
};

describe("DbRemoveUser usecases", () => {
    test('Should call userRemoveRepository with correct values', async () => {
        const {sut, removeUserRepositoryStub} = makeSut()
        const removeUserRepositorySpy = jest.spyOn(removeUserRepositoryStub, 'remove')
        await sut.remove('any_id')
        expect(removeUserRepositorySpy).toHaveBeenCalledWith('any_id')
    })

    test('Should throws if userRemoveRepository throws', () => {
        const {sut, removeUserRepositoryStub} = makeSut()
        jest.spyOn(removeUserRepositoryStub, 'remove').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.remove('any_id')
        expect(promise).rejects.toThrow()
    })
    //todo fazer o teste para quando não achar a conta com aquele id passado
});
