
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
        const data = fs.readFileSync("./db.json");
        // Convertimos el archivo a json
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};



// Usamos try catch para manejar errores a la hora de escribir el archivo
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
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

app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books);
});

app.get("/books/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requests
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.json(book);
});

//Creem un endpoint del tipus post per afegir un llibre

app.post("/books", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newBook = {
        id: data.books.length + 1,
        ...body,
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Book updated successfully" });
});


//Creem un endpoint per eliminar un llibre
app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    //splice esborra a partir de bookIndex, el número de elements
    // que li indiqui al segon argument, en aquest cas 1
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({ message: "Book deleted successfully" });
});

