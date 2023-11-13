const express = require('express');

const app = express();
app.use(express.json());
let port = 8080;

// arreglo vacio para almacenar
const task=[1,2,3,4];

//ruta/metodo para mostrar tareas
app.get('/tasks', (req, res) => {
    res.send(task)
    
})

//ruta/metodo para agregar tarea 
app.post('/tasks/:nt', (req, res) => {
    const newtask =req.body;
    task.push(newtask);
    res.json(newtask);

});

app.delete('/tasks/:id', (req,res) => {
   const taskId = req.params.id;
   const indextask =task.findIndex(p=> p.id === taskId);
   if (indextask===-1) {
    res.send("task not found ")
   } else {
    task.splice(indextask, 1);
   }


});

app.listen(port,()=>console.log("server up en http://localhost:" + port));