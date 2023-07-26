const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const app = express();


const result = dotenv.config({ path: path.join(__dirname, '../', '.env') });
if (result.error) {
    throw result.error;
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    return console.log(`Server running at PORT : ${PORT}`);
});

// const versions = ['v1', 'v2', 'v3', 'v4', 'v5']
// const returnVersion = (req, res) => {
//     let v = versions[(versions.indexOf(req.originalUrl.split('/')[1]))];
//     console.log('/' + v);
// }

app.use('/v1', require('./v1'));
// app.use('/v2', require('./v2'));
// app.use('/v3', require('./v3'));
// const re = new RegExp('v[0-9]+');

// app.use(async (req, res, next) => {
//     // const version = req.originalUrl.match(re)[0];
//     // const file = `./${version}`;

//     // Asynchronously load the file.
//     const module = await require('./v1');

//     // Call the next middleware.
//     next(module);
// });
module.exports = app;
