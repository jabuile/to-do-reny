const express = require('express');
const app = express();
const mysql = require('mysql2')

app.set("view engine","ejs");
app.use(express.json());

const conexion = mysql.createConnection({
    host : "localhost",
    database : "tablaprueba",
    user : "root",
    password : "jose4713",
})

app.use(express.urlencoded({ extended:false }));

app.get("/", function(req,res){
    res.render("registro");
});

app.get("/mostrarJSON", function(req,res){
    const sql = "SELECT * FROM productosdisponibles";
    conexion.query(sql,function(error, results, fields){
        if (error){
            throw error;
        }
        res.json(results);
        // console.log(results);
        // console.log(fields);
    });
    //res.send ("hola querido");
    

});

app.get("/mostrar", function(req,res){
    const sql = "SELECT * FROM productosdisponibles";
    conexion.query(sql,function(error, results, fields){
        if (error){
            throw error;
        }
        
        res.render("mostrar", {products:results});
        
    });
        

});




app.post("/validar", function(req,res){
    const datos = req.body;
    const id=datos.idp;
    const producto=datos.np;
    const valor=datos.precio;
    const descrip=datos.descripcion;

    const registrar ="INSERT INTO productosdisponibles (IDProducto, NombreProducto, precio, Descripcion) VALUES ('"+id +"', '"+producto+"', '"+valor+"', '"+descrip+"')"
    conexion.query(registrar,function(error){
        if (error){
            throw error;
        }else{
            console.log("datos almacenados en una base de datos ");
        }
    })
    console.log(datos)
});


app.post("/delete/:id", function(req,res){
    const msql = "DELETE  FROM productosdisponibles where IdProducto =" + id;
    conexion.query(msql,function(error, results, fields){
        if (error){
            throw error;
        }
        
        res.render("mostrar", {products:results});
        
    });
        

});



app.listen(3000, function () {
    console.log("corriendo en http://localhost:3000")
});

