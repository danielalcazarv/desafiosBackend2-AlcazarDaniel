import fs from 'fs'

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    async getAll() {
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf-8');
            if (contenido===""){
                const datos = [];
                return datos;
            }else{
                const datos2 = JSON.parse(contenido);
                return datos2;
            }
        }
        catch (error){
            console.log('Error al leer archivo. No se encontraron los productos. Tipo de error: ' + error);
        }
    }

    async save (objeto) {
        const objsCollection = await this.getAll();
        let newId;
        if (objsCollection.length == 0) {
            newId = 1;
        } else {
            newId = objsCollection[objsCollection.length - 1].id + 1;
        }
        const newProducto = {id:newId, ...objeto};
        objsCollection.push(newProducto);
        const objsJson = JSON.stringify(objsCollection);
        try {
            await fs.promises.writeFile(this.archivo,objsJson);
            console.log("Producto guardado.");
        }
        catch (error){
            console.log("Error al guardar el producto. Tipo de error: "+ error);
        }
    }

    async getById (id){
        try{
            const objsCollection = await this.getAll();
            const idFiltrado = objsCollection.find(obj => obj.id === id);
            if (idFiltrado===undefined){
                console.log("Producto no encontrado.");
                const notFound = null;
                return notFound;
            }else{
                console.log(idFiltrado);
                return idFiltrado;
            }
        }
        catch (error){
            console.log('Error al leer archivo. No se encontró producto. Tipo de error: ' + error);
        }
    }

    async deleteById (id){
        try{
            const objsCollection = await this.getAll();
            const objsCollectionFiltrado = objsCollection.filter(obj => obj.id!=id);
            const objsJson = JSON.stringify(objsCollectionFiltrado);
            await fs.promises.writeFile(this.archivo,objsJson);
            console.log("Producto eliminado.");
        }
        catch(error){
            console.log('Error al leer archivo. No se pudo eliminar el producto. Tipo de error: ' + error);
        }
    }

    async deleteAll (){
        try{
            const arrVacio = "";
            await fs.promises.writeFile(this.archivo,arrVacio);
            console.log("Todos los productos fueron eliminados");
        }
        catch(error){
            console.log(error);
        }
    }
}

const productos = new Contenedor ('productos.txt')



export {productos};

/********Los productos se ingresan de uno a la vez.*******/
//productos.save({titulo:"tijera",precio:123,url:"https/www.librería.com.ar/asdfasfasfas"})
//productos.save({titulo:"escuadra",precio:200,url:"https/www.librería.com.ar/134123asfas"})
//productos.save({titulo:"lapicera",precio:354,url:"https/www.librería.com.ar/145dsaafj89a"})


