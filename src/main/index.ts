import env from './config/env'
import {MongoHelper} from "../infra/helpers/mongo-helper";

MongoHelper.connect(env.mongoUrl)
    .then(async () => {
        const app = (await import('./config/app')).default
        app.listen(env.port, () => console.log(`SERVER RUNNING AT ${env.port}`))
    })
    .catch(err => {
        console.log(err)
    })
