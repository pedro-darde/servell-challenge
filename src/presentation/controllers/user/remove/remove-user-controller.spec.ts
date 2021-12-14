import {RemoveUserController} from "./remove-user-controller";
import {serverError} from "../../../../infra/helpers/http-helper";
import {RemoveUser} from "../../../../domain/usecase/remove-user";


const makeRemoveUser = (): RemoveUser => {
    class RemoveUserStub implements RemoveUser {
        async remove(id: string): Promise<void> {

        }
    }

    return new RemoveUserStub()
}

interface SutTypes {
    removeUserStub: RemoveUser,
    sut: RemoveUserController
}

const makeSut = (): SutTypes => {
    const removeUserStub = makeRemoveUser()
    const sut = new RemoveUserController(removeUserStub);

    return {
        removeUserStub,
        sut
    }

}
describe('EditUserController', () => {
    test('Should call remove user with correct values', async () => {
        const {sut, removeUserStub} = makeSut()
        const removeUserSpy = jest.spyOn(removeUserStub, 'remove')
        await sut.handle({params: {id: 'any_id'}})

        expect(removeUserSpy).toHaveBeenCalledWith('any_id')
    })

    test('Should return 500 if remove user throws', async () => {
        const {sut, removeUserStub} = makeSut()
        jest.spyOn(removeUserStub, 'remove').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const httpResponse = await sut.handle({
            params: {id: 'any_id'}
        })
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
