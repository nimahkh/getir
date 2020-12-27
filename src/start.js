import app from "./app"
import config from "../config";
import {connectDb} from '../models'

//Run project on port variable
connectDb().then(async () => {
    app.listen(config.port, () => {
        console.log(`listening at http://localhost:${config.port}`);
    });
})
