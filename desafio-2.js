var fs = require('fs');

class Contenedor {
    constructor(nombre, precio, thumbnail){
        this.nombre=nombre;
        this.precio=precio;
        this.thumbnail=thumbnail;
        this.id="";
    };
}

const save = (object) => {
    let currentId = 1;
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

const getById = (id) => {
    fs.promises.readFile('productos.txt', 'utf-8')
        .then ( contenido =>{
            const obj = JSON.parse(contenido);
            const objFiltered = obj.filter(element=>element.id===id);
            console.log(objFiltered);
        })
        .catch ( err =>{
            console.log('Error al leer archivo. No se encontró producto. Tipo de error: ' + err)
        })
};

const getAll = () => {
    fs.promises.readFile('productos.txt', 'utf-8')
        .then ( contenido =>{
            const obj = JSON.parse(contenido);
            console.log(obj);
        })
        .catch ( err =>{
            console.log('Error al leer archivo. No se encontraron los productos. Tipo de error: ' + err)
        })
};

const deleteById = (id)=>{
    fs.promises.readFile('productos.txt', 'utf-8')
        .then ( contenido =>{
            const obj = JSON.parse(contenido);
            const objFiltered = obj.filter(element=>element.id!=id);
            const objectJson = JSON.stringify(objFiltered)
            fs.writeFile('productos.txt', objectJson, error => {
                if (error) {
                    console.log(error);
                }else{
                    console.log("Producto Eliminado")
                }
            })
        })
        .catch ( err =>{
            console.log('Error al leer archivo. No se pudo eliminar el producto. Tipo de error: ' + err)
        })
};

const deleteAll = () => {
    const obj = ""
    fs.writeFile('productos.txt', obj, error => {
        if (error) {
            console.log(error);
        }else{
            console.log("Todos los productos fueron eliminados")
        }
    })
}

const productos = [];
productos.push(new Contenedor("lapiz",45.68,"link/adfjalkfjasñ"))
productos.push(new Contenedor("birome",68.28,"link/brrardasgaasñ"))
productos.push(new Contenedor("resma",422.32,"link/asd2345adfsa"))
productos.push(new Contenedor("borrador",116.28,"link/asd2345adfsa"))

save(productos);
getById(1);
getAll()
deleteById(4)
//Comente el delete para poder mostrar el resto de las funciones.
//deleteAll()