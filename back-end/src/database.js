const Mongoose = require("mongoose");

// const DB_HOST = "127.0.0.1";
// const DB_PORT = 27017;
// const DB_USERNAME = "admin";
// const DB_PASSWORD = "admin123";
// const DB_NAME = "An";

const DB_HOST = "112.213.91.209";
const DB_PORT = 27070;
const DB_USERNAME = "admin";
const DB_PASSWORD = "Abc12345";
const DB_NAME = "An";

//export const DB_CONN_STRING = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
export const DB_CONN_STRING = "mongodb+srv://admin:123@cluster0-obkrz.mongodb.net/test?retryWrites=true&w=majority"

Mongoose.connect(DB_CONN_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

export default Mongoose;
