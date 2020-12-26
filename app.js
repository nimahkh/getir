import express from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import routes from './routes'
import config from "./config";
import models , {connectDb} from './models'

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

/*
 * Model middleware
 */

app.use((req, res, next) => {
    req.context = {
        models,
        me: models,
    };
    next();
});

/*
 * Generating routes from routes folder
 */
Object.keys(routes).map((route) => {
    app.use(routes[route]);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

//Run project on port variable
connectDb().then(async () => {
    app.listen(config.port, () => {
        console.log(`Example app listening at http://localhost:${config.port}`);
    });
})
