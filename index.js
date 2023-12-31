const express = require('express');
const hostname = 'localhost';
const port = 5000;
const exphbs = require('express-handlebars');
const routerApi = require("./routes")
const bodyParser = require('body-parser');

// const uri = "mongodb+srv://kevincastrillon31:admin123@clusterkevin.lmjqevf.mongodb.net/?retryWrites=true&w=majority";
// const res = require('express/lib/response');
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.json());

routerApi(app);


app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));

app.set('view engine', 'hbs');

app.use('*/Bootstrap-4-Multi-Select-BsMultiSelect',express.static('public/Bootstrap-4-Multi-Select-BsMultiSelect'));
app.use('*/css',express.static('public/css'));
app.use('*/js',express.static('public/js'));
app.use('*/images',express.static('public/images'));

app.get('/testhtml', (req, res) => {
    res.render('home');
});

app.listen(port,hostname, ()=>{
    console.log(`El servidor esta escuchando en http://${hostname}:${port}`)
    console.log(__dirname)
});

// app.get('/salut', (req, res) => {
//     res.send("Bonjour salut, a bientot.")
// });

// app.get('/cursos', (req, res) =>{
//     res.status(200).send(infoCursos)
// });

// app.get('/curso/:area', (req, res) =>{
//     const area= req.params.area;
//     if (area==="matematicas") {
//         res.status(200).send(infoCursos.matematicas)        
//     }else if(area==="programacion"){
//         res.status(200).send(infoCursos.programacion)
//     }else{
//         res.status(409).send("Error, no se pudo encontrar el curso");
//     }
// });



app.get("/", (req, res) =>{
    res.status(200).send("Api peliculas")
})