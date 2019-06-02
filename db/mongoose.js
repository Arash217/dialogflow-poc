const mongoose = require('mongoose');
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}}/${DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    user: DB_USERNAME,
    pass: DB_PASSWORD,
    auth: { authSource: 'admin' },
});