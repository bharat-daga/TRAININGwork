const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');

// Configuration statements
const port = 3000;
app.use(bodyParser.json());


// Routing
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


// Error Handlingpa
app.use((req, res, next) => {
    const error = new HttpError('Page not found', 404);
    throw error;
});

app.use((error, req, res, next) => {
    res.status(error.code);
    res.json({ message: error.message || 'Unknown error occured', code: error.code });
});



//  Methods
//  app.get('/about', (req, res) => {
//    res.send(JSON.stringify({page: "About", message: "This is the about page"}));
//  });

//  app.post('/login',(req, res) => {
//    res.send({page: "Login", message: "Please submit your credentials!!"});
//  });

mongoose.connect('mongodb://localhost:27017/blog_database', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    app.listen(port, () => {
        console.log(`App running on port ${port}`)
    });
}).catch(err => {
    console.log(err);
});