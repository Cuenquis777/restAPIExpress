var coches = [
    ["seat","Codoba",1997,10000],
    ["Kia","Sorento",1994,1000],
    ["seat","Todelo",2000,10000],
    ["Fiat","Bravo",2010,10200],
    ["Fiat","500",2010,10000],
    ["Mercedes","Calse B",2001,39000],  
    ["seat","Ibiza",1993,10100],
    ["Alfa Romeo","Julieta",2002,10000],
    ["Alfa Romeo","159",2002,10400],
    ["Mercedes","Calse C",2001,1000],  
    ["Alfa Romeo","147",1990,10500],
    ["Fiat","Punto",1990,999],
    ["Citroen","Saxo",1980,10300],
    ["Renault","Superc 5",1980,12000],
    ["BWM","M3",2020,1000],
    ["Kia","Picanto",1990,1000],
    ["Alfa Romeo","spider",1970,14500],
    ["Mercedes","Calse A",1994,60100],  
    ["Mercedes","Calse D",2011,21221]  
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

let notas = [3.4,7.9,4,8.0,2.5,5.6,5.4,9.0]

//Calculamos la nota media
let media = notas.reduce( (suma,notas) => suma+= notas*notas,0)/notas.length
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

