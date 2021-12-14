import {Router} from "express";
import {adaptRoute} from "../adapters/express-route-adapter";
import {makeAddUserController} from "../factories/controller/user/add/add-user-controller-factory";
import {makeEditUserController} from "../factories/controller/user/edit/edit-user-controller-factory";
import {makeLoadUserController} from '../factories/controller/user/load/load-user-controller-factory';
import {makeRemoveUserController} from "../factories/controller/user/remove/remove-user-controller-factory";

export default (router: Router): void => {
    router.post('/user', adaptRoute(makeAddUserController()))
    router.get('/user', adaptRoute(makeLoadUserController()))
    router.put('/user/:id', adaptRoute(makeEditUserController()))
    router.delete('/user/:id', adaptRoute(makeRemoveUserController()))
}
