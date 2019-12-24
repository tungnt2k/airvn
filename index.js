const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const homeRoutes = require('./routes/home.routes');
const aboutRoutes = require('./routes/about.routes');

app.set('views','./views');
app.set('view engine','ejs');

app.use('/',express.static('./public'));

app.use('/',homeRoutes);
app.use('/about',aboutRoutes);

app.listen(PORT,(err)=>{
    if(err){
        console.log('something error !');
        console.log(err);
    };
    console.log('App listen on port : '+PORT);

})