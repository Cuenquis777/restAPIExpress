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
        const data = fs.readFileSync("./DB/reserves.json");
        // Convertimos el archivo a json
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

// Usamos try catch para manejar errores a la hora de escribir el archivo
const writeData = (data) => {
    try {
        fs.writeFileSync("./DB/reserves.json", JSON.stringify(data));
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

app.get("/reserves", (req, res) => {
    const data = readData();
    res.json(data.reserves);
});

app.get("/reserves/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requests
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const reserva = data.reserves.find((reserva) => reserva.id_reserva === id);
    res.json(reserva);
});

//Creem un endpoint del tipus post per afegir una nova reserva
app.post("/reserves", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega a la nueva reserva
    const novaReserva = {
        id_reserva: data.reserves.length + 1,
        ...body,
    };
    data.reserves.push(novaReserva);
    writeData(data);
    res.json(novaReserva);
});

app.put("/reserves/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    console.log("ID", id);
    const reservaIndex = data.reserves.findIndex((reserva) => reserva.id_reserva === id);
    data.reserves[reservaIndex] = {
        ...data.reserves[reservaIndex],
        ...body,
    };
    console.log("!!!!!!!", data);
    writeData(data);
    res.json({ message: "reserva updated successfully" });
});

//Creem un endpoint per eliminar una reserva
app.delete("/reserves/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reservaIndex = data.reserves.findIndex((reserva) => reserva.id_reserva === id);
    //splice esborra a partir de reservaIndex, el número de elements
    // que li indiqui al segon argument, en aquest cas 1
    data.reserves.splice(reservaIndex, 1);
    writeData(data);
    res.json({ message: "reserva deleted successfully" });
});