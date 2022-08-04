let express = require('express');
let app = express();

let router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Cherry pie');
})

app.use('/api/', router);

const server = app.listen(5000, () => {
    console.log('Node Server is running on http://localhost:5000/...');
})