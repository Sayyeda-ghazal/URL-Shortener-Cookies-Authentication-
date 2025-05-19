const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticrouter');
const UserRoute = require('./routes/user')

const { restrictToLoggedInUserOnly } = require('./middlewares/auth')
const {ConnectToMongoDB} = require('./connect');
const URL = require('./models/url');

const app = express();
const PORT=8080;

ConnectToMongoDB("mongodb://localhost:27017/app-1").then(() => console.log('DB connected')).catch((err) => console.error('DB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render('home', {
//         urls: allUrls,
//     });
// });

app.use('/url', restrictToLoggedInUserOnly, urlRoute);
app.use('/', staticRoute);
app.use('/user', UserRoute);

app.get('/:shortId',async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID: shortId,
    }, 
    {$push: {
        visitHistory: {
            timestamp: Date.now()
        },
    },
},
);
    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));