const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const people = require("./json/people.json"); // Importa los datos iniciales (generados en https://www.mockaroo.com/)

app.get("/", (req, res) => {
  // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/people", (req, res) => {
  res.json(people); // Enviamos todo el array
});

app.get("/people/:index", (req, res) => {
  /*La propiedad "params" del request permite acceder a los parámetros de la URL 
    (importante no confundir con la "query", que serían los parámetros que se colocan 
    luego del signo "?" en la URL)
   */
  res.json(people[req.params.index]); // Enviamos el elemento solicitado por su índice
});

app.post("/people", (req, res) => {
  /* La propiedad "body" del request permite acceder a los datos 
       que se encuentran en el cuerpo de la petición */

  people.push(req.body); // Añadimos un nuevo elemento al array

  res.json(req.body); // Le respondemos al cliente el objeto añadido
});

app.put("/people/:index", (req, res) => {
  const index = req.params.index; // Obtenemos el índice de la URL
  if (index >= 0 && index < people.length) { // Comprobamos si el índice es válido
    people[index] = req.body; // Actualizamos el elemento en el índice indicado
    res.json(people[index]); // Enviamos el objeto actualizado como respuesta
  } else {
    res.status(404).json({ message: "Persona no encontrada" }); // Si el índice es inválido
  }
});

app.delete("/people/:index", (req, res) => {
  const index = req.params.index; // Obtenemos el índice de la URL
  if (index >= 0 && index < people.length) { // Comprobamos si el índice es válido
    const deletedPerson = people.splice(index, 1); // Eliminamos el elemento del array
    res.json(deletedPerson[0]); // Enviamos el objeto eliminado como respuesta
  } else {
    res.status(404).json({ message: "Persona no encontrada" }); // Si el índice es inválido
  }
});

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
