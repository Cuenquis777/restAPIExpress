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
        const data = fs.readFileSync("./DB/notificacions.json");
        // Convertimos el archivo a json
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

// Usamos try catch para manejar errores a la hora de escribir el archivo
const writeData = (data) => {
    try {
        fs.writeFileSync("./DB/notificacions.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

// Cuando alguien llegue a la ruta "/", le devolveremos un mensaje
app.get("/", (req, res) => {
    res.send("Hola mundo mi primer servidor con Node.js");
});

// Función para escuchar puerto 3000 ("Arranque")
app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});

// Obtener todas las notificaciones
app.get("/notificacions", (req, res) => {
    const data = readData();
    res.json(data.notificacions);
});

// Obtener una notificación por ID
app.get("/notificacions/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notification = data.notificacions.find((notif) => notif.id_notificacions === id);
    res.json(notification);
});

// Crear una nueva notificación
app.post("/notificacions", (req, res) => {
    const data = readData();
    const body = req.body;
    const newNotification = {
        id_notificacions: data.notificacions.length + 1,
        ...body,
    };
    data.notificacions.push(newNotification);
    writeData(data);
    res.json(newNotification);
});

// Actualizar una notificación
app.put("/notificacions/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificationIndex = data.notificacions.findIndex((notif) => notif.id_notificacions === id);
    data.notificacions[notificationIndex] = {
        ...data.notificacions[notificationIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Notification updated successfully" });
});

// Eliminar una notificación
app.delete("/notificacions/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notificationIndex = data.notificacions.findIndex((notif) => notif.id_notificacions === id);
    data.notificacions.splice(notificationIndex, 1);
    writeData(data);
    res.json({ message: "Notification deleted successfully" });
});
