import {EditUserRepository} from "../../../protocols/db/users/edit-user-repository";
import { UserEditModel} from "../../../../domain/usecase/edit-user";
import {UserModel} from "../../../../domain/models/user-result";
import {DbEditUser} from "./db-edit-user";

interface SutTypes {
    sut: DbEditUser;
    editUserRepositoryStub: EditUserRepository;
}

const userModelFake = (): UserModel => ({
    id: 'any_id',
    cargo: "any_cargo",
    idade: 20,
    nome: "any_nome",
})


const makeEditUserRepository = (): EditUserRepository => {
    class EditUserRepositoryStub implements EditUserRepository {
        async edit(id: string, newUserData: UserEditModel): Promise<UserModel> {
            return userModelFake();
        }
    }

    return new EditUserRepositoryStub();
};

const makeSut = (): SutTypes => {
    const editUserRepositoryStub = makeEditUserRepository();
    const sut = new DbEditUser(editUserRepositoryStub);

    return {
        sut,
        editUserRepositoryStub,
    };
};

describe("DbEditUser usecases", () => {
    test("Should call editUserRepository with correct values", async () => {
        const {sut, editUserRepositoryStub} = makeSut()
        const editUserRepositorySpy = jest.spyOn(editUserRepositoryStub, 'edit')

        await sut.edit('any_id', {cargo: 'diretor', nome: 'joão'})
        expect(editUserRepositorySpy).toHaveBeenCalledWith('any_id', {cargo: 'diretor', nome: 'joão'})
    });

    test('Should change userModel info passed and return it properly', async () => {
        const {sut, editUserRepositoryStub} = makeSut()
        jest.spyOn(editUserRepositoryStub, 'edit').mockReturnValueOnce(new Promise(resolve => resolve({
            id: 'any_id',
            cargo: 'diretor',
            nome: 'joão',
            idade: 20
        })))

        const editedAccount = await sut.edit('any_id', {
            cargo: 'diretor',
            nome: 'joão',
        })

        expect(editedAccount.nome).toEqual('joão')
        expect(editedAccount.cargo).toEqual('diretor')
    })

    test('Should throws if editUserRepository throws',  () => {
        const {sut, editUserRepositoryStub} = makeSut()
        jest.spyOn(editUserRepositoryStub, 'edit').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.edit('any_id', userModelFake())
        expect(promise).rejects.toThrow()
    })
    //todo fazer o teste para quando não achar a conta com aquele id passado
});
