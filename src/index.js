const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes')

const app = express();
mongoose.connect('mongodb+srv://production_user:j1eYHJiAJPliprvz@cluster0-fqnja.mongodb.net/findme?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/products", require("./middlewares/auth"));

app.listen(3000);