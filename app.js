const express = require('express');

const app = express();
app.use(express.json());
let port = 8080;

// arreglo vacio para almacenar
const task=[];

//ruta/metodo para mostrar tareas
app.get('/tasks', (req, res) => {
    res.json(task)
    
})

//ruta/metodo para agregar tarea 
app.post('/tasks', (req, res) => {
    const newtask =req.body;
    task.push(newtask);
    res.json(newtask);

});


app.listen(port,()=>console.log("server up en http://localhost:" + port));