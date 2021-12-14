import {HttpResponse} from "../../presentation/protocols/http";
import {ServerError} from '../../presentation/errors/server-error';

export const serverError = (e: Error): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(e.stack)
})
