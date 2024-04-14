// const mongoose = require('mongoose');
// // , { useNewUrlParser: true }
// mongoose.connect(process.env.DBSTR).then(() => {
//     console.log('Database connected!');
// }).catch((err) => {
//     console.log("Error in connection");
//     console.log(err)
// });

const mongoose = require('mongoose');

mongoose.connect(process.env.DBSTR, { useNewUrlParser: true });
mongoose.connection.on("connected", () => { console.log("Database connected!") });
mongoose.connection.on("disconnected", () => { console.log("Database disconnected!") });
mongoose.connection.on("error", () => { console.log("Connection error!") });