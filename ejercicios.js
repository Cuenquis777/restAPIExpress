var coches = [
    ["seat", "Codoba", 1997, 10000],
    ["Kia", "Sorento", 1994, 1000],
    ["seat", "Todelo", 2000, 10000],
    ["Fiat", "Bravo", 2010, 10200],
    ["Fiat", "500", 2010, 10000],
    ["Mercedes", "Calse B", 2001, 39000],
    ["seat", "Ibiza", 1993, 10100],
    ["Alfa Romeo", "Julieta", 2002, 10000],
    ["Alfa Romeo", "159", 2002, 10400],
    ["Mercedes", "Calse C", 2001, 1000],
    ["Alfa Romeo", "147", 1990, 10500],
    ["Fiat", "Punto", 1990, 999],
    ["Citroen", "Saxo", 1980, 10300],
    ["Renault", "Superc 5", 1980, 12000],
    ["BWM", "M3", 2020, 1000],
    ["Kia", "Picanto", 1990, 1000],
    ["Alfa Romeo", "spider", 1970, 14500],
    ["Mercedes", "Calse A", 1994, 60100],
    ["Mercedes", "Calse D", 2011, 21221]
];
/*
let cochesAprovadosAlfa = coches.filter (coches => coches[0] !== 'Alfa Romeo' || coches[0] !== 'Kia')

console.log(cochesAprovadosAlfa)
*/

/*
function newCoches (coches){

    //Creamos un nuevo array
    let newCoches = [];

    //Hacemos un bucle para entrar al array
    for (coche of coches) {
        //Hacemos un condicional en la posicion cero para ver los nombres
        if (coches[0] !== 'Alfa Romeo' || coches[0] !== 'Kia' && 2025 - coches[2] >= 20){
            newCoches.push(coches)
        }
    }
    return newCoches
}

let cochesAprobdos = newCoches
console.log(cochesAprobdos)
*/

/*-------------------------------------*/

let notas = [3.4, 7.9, 4, 8.0, 2.5, 5.6, 5.4, 9.0]

//Calculamos la nota media
let media = notas.reduce((suma, notas) => suma += notas * notas, 0) / notas.length
console.log(media);

//Obtenemos la primera nota superior a 5
let nota5 = notas.find(nota => nota >= 5);
console.log(nota5);


//Cambiar las notas de 10 a 20
let nuevaNota = notas.map(notas => notas * 2);
console.log(nuevaNota);

/*
function reduceMio (notas,suma) {
    for (nota of notas) {
        suma = suma +nota;
    }
    return suma
}
*/

// EJ 1

//Creamos una funcion que reciba como entrada un array

const numeros = [1, 2, 3, 4, 4, 5, 6, 6, 7];

function eliminarDuplicados(numeros) {

    let nuevoArray = new Set(numeros);
    console.log([...nuevoArray]); //Lo convertimos en un array
}

eliminarDuplicados(numeros); //Llamamos a la funcion para que se ejecute

// EJ 1.2

const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];

function comprobacionArrays(array1, array2) {

    //Convertimos los 2 arrays en sets
    const set1 = new Set(array1);
    const set2 = new Set(array2);

    //Hacemos un bucle para comprobar si hay numeros parecidos
    for (let num of set1) {
        if (set2.has(num)) {
            return true; //Devolvemos true si hay algun nombre en comun
        }
    }
    return false; //False si no

}
console.log(comprobacionArrays(array1, array2));


// EJ 2

const modulos = ["m02", "m03", "m04", "m05", "m06", "m07", "m08", "FOL"]
const alumnoNotas = [[8, 9, 4], [9, 10], [6, 8, 10], [4], [8, 4, 7], [], [7, 5, 9, 10], [10]]

const map1 = new Map([
    ['m02', new Set([8, 9, 4])],
    ['m03', new Set([9, 10])],
    ['m04', new Set([6, 8, 10])],
    ['m05', new Set([4])],
    ['m06', new Set([8, 4, 7])],
    ['m07', new Set([])],
    ['m08', new Set([7, 5, 9, 10])],
    ['FOL', new Set([10])]
]);

console.log(map1);

map1.set('m07', new Set([7.5, 6])) //Modificamos las notas de m07

let claves = new Set(map1.keys());
console.log(claves);

