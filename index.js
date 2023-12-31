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
    const nuevo = true;
    const product= null;
    res.render("registro", { product, nuevo});
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

//new code to edit database elements

app.get("/mostraru/:id", function(req,res){

    const id = req.params.id;
    const nuevo = isNew(id)
    const sql = "SELECT * FROM productosdisponibles where IdProducto =" + id ;
    
    conexion.query(sql,function(error, resultsudp, fields){
        if (error){
            throw error;
        }
        console.log(resultsudp)
        res.render("registro", {product:resultsudp[0],nuevo});
        
    });
        

});
//end of edit

function isNew (id) {
    return id===null || id==="" || id ===" "
};


app.post("/validar", function(req,res){
    const datos = req.body;
    const id=datos.idp;
    const producto=datos.np;
    const valor=datos.precio;
    const descrip=datos.descripcion;

    let registrar = null;
    const nuevo = isNew(id)
    if (nuevo){
        registrar ="INSERT INTO productosdisponibles ( NombreProducto, precio, Descripcion) VALUES ('"+producto+"', '"+valor+"', '"+descrip+"')"
    }else{
        registrar = `UPDATE tablaprueba.productosdisponibles SET NombreProducto = '${producto}', precio =${valor}, Descripcion ='${descrip}' where IdProducto=${id}` 
    };
    console.log(registrar);

    
    conexion.query(registrar,function(error){
        if (error){
            throw error;
        }
        res.redirect("/mostrar")
        console.log("datos almacenados en una base de datos ");
        
    })
    console.log(datos)
});


app.post("/delete/:id", function(req,res){
    const id = req.params.id;
    const msql = "DELETE  FROM productosdisponibles where IdProducto =" + id;
    conexion.query(msql,[id],function(error, results, fields){
        if (error){ 
            throw error;
        }
        
        const sql2 = "SELECT * FROM productosdisponibles";
        conexion.query(sql2,function(error, results2, fields2){
            if (error){
                throw error;
            }
            
            res.render("mostrar", {products:results2});
            
        });
            
    });
        

});



app.listen(3000, function () {
    console.log("corriendo en http://localhost:3000")
});

