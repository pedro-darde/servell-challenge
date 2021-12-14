import { Request, Response } from 'express'
import {Controller} from "../../presentation/protocols/controller";
import {HttpRequest} from "../../presentation/protocols/http";
export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httRequest: HttpRequest = {
            params: req.params,
            body: req.body
        }
        const httpResponse = await controller.handle(httRequest)
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).json(httpResponse.body)
        } else {
            res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
        }
    }
}
