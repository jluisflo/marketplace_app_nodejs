//imports
const http = require('http');
const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', expressHbs({ extname: '.hbs', layoutsDir: 'views/layouts', defaultLayout: 'main', partialsDir: 'views/layouts/partials' }));
app.set('view engine', 'hbs');
app.set('views', 'views');

//routes
const shopRoute = require('./routes/shop.route');
const adminRoute = require('./routes/admin.route');
// const User = require('./models/user.model');
//end routes

app.use((request, response, next) => {

    request.user = '6026fb87a2bcba418028c48c';
    next();
});

app.use('/', shopRoute);
app.use('/admin', adminRoute);

app.use((request, response) => {
    response.status(404).render('404');
});


//creating and configuration server
const server = http.createServer(app);
//end creating and configuration server


//opening connection mongoDB
mongoose.connect('mongodb+srv://node_app:admin@cluster0.n0fny.mongodb.net/shop?retryWrites=true&w=majority')
    .then(res => {
        console.log('Connected to database!');
        server.listen(3000);
    })
    .catch(err => {
        console.log(err)
    });
//end opening connection mongoDB