// Importar librerías
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

// Esta línea crea el servidor
const app = express();

// Esta línea escuchará y convertirá en archivos JSON
app.use(bodyParser.json());

// Usamos try-catch para manejar errores al leer el archivo
const readData = () => {
    try {
        const data = fs.readFileSync("./DB/recursos.json");
        // Convertimos el archivo a JSON
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

// Usamos try-catch para manejar errores al escribir el archivo
const writeData = (data) => {
    try {
        fs.writeFileSync("./DB/recursos.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

// Cuando alguien llegue a la ruta "/", le devolveremos un mensaje
app.get("/", (req, res) => {
    res.send("Hola mundo, mi primer servidor con Node.js");
});

// Función para escuchar el puerto 3000 ("Arranque")
app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});

// Obtener todos los recursos
app.get("/recursos", (req, res) => {
    const data = readData();
    res.json(data.recursos);
});

// Obtener un recurso por ID
app.get("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recurso = data.recursos.find((recurso) => recurso.recursos_id === id);
    res.json(recurso);
});

// Crear un nuevo recurso
app.post("/recursos", (req, res) => {
    const data = readData();
    const body = req.body;
    // Agregar nuevo recurso con ID autoincremental
    const newRecurso = {
        recursos_id: data.recursos.length > 0 ? data.recursos[data.recursos.length - 1].recursos_id + 1 : 1,
        ...body,
    };
    data.recursos.push(newRecurso);
    writeData(data);
    res.json(newRecurso);
});

// Actualizar un recurso existente
app.put("/recursos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.recursos_id === id);
    if (recursoIndex !== -1) {
        data.recursos[recursoIndex] = {
            ...data.recursos[recursoIndex],
            ...body,
        };
        writeData(data);
        res.json({ message: "Recurso actualizado correctamente" });
    } else {
        res.status(404).json({ message: "Recurso no encontrado" });
    }
});

// Eliminar un recurso
app.delete("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.recursos_id === id);
    if (recursoIndex !== -1) {
        data.recursos.splice(recursoIndex, 1);
        writeData(data);
        res.json({ message: "Recurso eliminado correctamente" });
    } else {
        res.status(404).json({ message: "Recurso no encontrado" });
    }
});
