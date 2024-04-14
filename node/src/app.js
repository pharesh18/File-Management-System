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

app.use('/v1', require('./v1'));
// app.use('/v2', require('./v2'));
// app.use('/v3', require('./v3'));

module.exports = app;
