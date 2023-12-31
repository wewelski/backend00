// const http = require("http");
// const PORT = 3000;

// const app = http.createServer((req,res) => {
//   res.writeHead(200, { "Content-Type": "application/json"});
//   res.end(JSON.stringify(notes));
// });

// app.listen(PORT);
// console.log(`Now listening to port ${PORT}`);

const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can only execute JavaScript",
    import: true
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abranov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
];

app.get("/", (req,res) => {
  res.send("<h1>Hello, Express</h1>");
});

app.get("/persons", (req,res) => {
  res.status(200).json(persons);
})

// This section returns the phrase below along with the number of people in persons arr
app.get("/info", (req,res) => {
  res.send(`<p>Phonebook has info for <strong>${persons.length}</strong> people.</p>`);
})

app.get("/persons", (req,res) => {
  res.status(200).json(persons);
})

app.get("/persons/:id", (req,res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((person) => person.id === id);

  res.json(person);
})

app.post("/persons", (req,res) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({error: "Missing name or number!"})
  }

  const nameExists = persons.some((person) => person.name === name);

  if (nameExists) {
    return res.status(400).json({error: "Oops! Name must be unique!"})
  }

  const person = {
    id: uuidv4(),
    name,
    number
  }
  
  persons = persons.concat(person)
  res.status(201).json(person)
})

app.delete("/persons/:id", (req,res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
})

app.get("/api/notes", (req,res) => {
  res.status(200).json(notes);
})

app.get("/api/notes/:id", (req,res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);

  res.json(note);
})

app.delete("/api/notes/:id", (req,res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((note) => note.id === id);

  res.status(204).end();
})

app.post("/api/notes", (req,res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "Content missing!"
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: uuidv4() // This is for generating the universal unique ID using the UUID library
  }

  notes = notes.concat(note);

  res.status(201).json(note);
})

app.put("/api/notes/:id", (req,res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);
  const { content, important } = req.body

  const updateNote = {
    ...note,
    content,
    important
  }

  notes = notes.map((note) => (note.id === id ? updateNote : note));

  res.status(201).json(updateNote);
})

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});