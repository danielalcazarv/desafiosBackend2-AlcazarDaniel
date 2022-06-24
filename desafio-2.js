var fs = require('fs');
let currentId = 1;

class Contenedor {
    constructor(nombre, precio, thumbnail){
        this.nombre=nombre;
        this.precio=precio;
        this.thumbnail=thumbnail;
        this.id="";
    };
}

const save = (object) => {
    object.forEach(element => {
        element.id=currentId;
        currentId+=1;
    });
    const objectJson = JSON.stringify(object)
    fs.writeFileSync('productos.txt', objectJson, function(err){
        if (err) throw err;
        console.log("Archivos guardados.");
    })
};

const getById = () => {

};

/*
getAll(){

};

deleteById(){

};

deleteAll(){

}*/

const productos = [];
productos.push(new Contenedor("lapiz",45.68,"link/adfjalkfjasñ"))
productos.push(new Contenedor("goma",22.28,"link/brrardasgaasñ"))
productos.push(new Contenedor("resma",422.28,"link/asd2345adfsa"))
save(productos);
console.log(productos);
