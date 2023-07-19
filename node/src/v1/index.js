const express = require('express');
// const dotenv = require('dotenv');
// const path = require('path');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const app = express();
// const { documents, folders } = require('./library/schema.js');

// { path: path.join(__dirname, '.env') }
// const result = dotenv.config();
// if (result.error) {
//     throw result.error;
// }

const { validateSchema, checkAccess } = require('./library/controlAccess.js');
const userRoute = require('./routers/userRoute.js');
const docsRoute = require('./routers/docsRoute.js');
const folderRoute = require('./routers/folderRoute.js');
const { documents, folders } = require('./library/schema.js');

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use('/public', express.static('public'));
// app.use(fileUpload({
//     useTempFiles: true,
// }));

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     return console.log(`Server running at PORT : ${PORT}`);
// });

require('./library/db.js');
app.use(validateSchema);
app.use(checkAccess);
app.use('/api/users', userRoute);
app.use('/api/doc', docsRoute);
app.use('/api/folder', folderRoute);

// const deleteAll = async () => {
//     await documents.deleteMany();
// }

// deleteAll();

module.exports = app;
