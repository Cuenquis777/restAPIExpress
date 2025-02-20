// Importar librerias
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

// Esta linia crea el servidor
const app = express();

// Esta linia escuchara y convertira en archivos json
app.use(bodyParser.json());


// Usamos try catch para manejar errores a la hora de leer el archivo
const readData = () => {
    try {
        const data = fs.readFileSync("./DB/usuaris.json");  // Convertimos el archivo a json
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};



// Usamos try catch para manejar errores a la hora de escribir el archivo
const writeData = (data) => {
    try {
        fs.writeFileSync("./DB/usuaris.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};


// Cuando alguien llegue a la ruta "/", le devolveremos un mensaje
app.get("/", (req, res) => {
    res.send("Hola mundo mi primer servidor con Node.js");
});

// Funcio escoltar puerto 3000 ("Arranque")
app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});

app.get("/usuaris", (req, res) => {
    const data = readData();
    res.json(data.usuaris);
});

app.get("/usuaris/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requests
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const user = data.usuarios.find((usuario) => usuario.user_id === id);
    res.json(user);
});

//Creem un endpoint del tipus post per afegir un nou usuari
app.post("/usuaris", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo usuario
    const nuevouser = {
        user_id: data.usuarios.length + 1,
        ...body,
    };
    data.usuarios.push(nuevouser);
    writeData(data);
    res.json(nuevouser);
});

app.put("/usuaris/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    console.log("ID",id)
    const userIndex = data.usuarios.findIndex((usuarios) => usuarios.user_id === id);
    data.usuarios[userIndex] = {
        ...data.usuarios[userIndex],
        ...body,
    };
    console.log("!!!!!!!",data)
    writeData(data);
    res.json({ message: "usuaris updated successfully" });
});


//Creem un endpoint per eliminar un usuari
app.delete("/usuaris/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const userIndex = data.usuarios.findIndex((usuarios) => usuarios.user_id === id);
    //splice esborra a partir de userIndex, el número de elements
    // que li indiqui al segon argument, en aquest cas 1
    data.usuarios.splice(userIndex, 1);
    writeData(data);
    res.json({ message: "usuaris deleted successfully" });
});