const express = require('express');
const req = require('express/lib/request');
const get = require('express/lib/request');
const app = express();

app.use(express.json());

const characters = [
  {
    id: "1",
    name: "Harry Potter",
    spacies: "human",
    house:  "Gryffindor",
    actor: "Daniel Redcliffe"
  },
  {
    id:"2",
    name: "Hermione Granger",
    spacies: "human",
    house:  "Gryffindor",
    actor: "Emma Watson"
  }, 
];


//rota
//GET - READ
app.get("/", (req, res) => {
    res.send(characters.filter(Boolean));
  });

  //POST - CREATE
app.post("/character", (req, res) => {
    const character = req.body;
   
    character.id = characters.length + 1; 
    characters.push(character);

    res.send({ message: "Personagem criado com sucesso!" });
});

// getBuid

app.get("/character/:id", (req,res) => {
    const id = +req.params.id;
    const character = characters.find((c) => c.id === id);

    if(!character) {
      res.status(404).send({message: "Personagem não existe!"});
      return;
    }

    res.send(character);
});

// PUT - UPDATE
app.put("/character/:id", (req, res) => {
  const id = +req.params.id;
  const character = characters.find((c) => c.id === id);

  if(!character) {
    res.status(404).send({message: "Personagem não existe!" });
    return;
  }

  const {name, spacies, house, actor} = req.body

  character.name = name
  character.spacies = spacies
  character.house = house
  character.actor = actor
  
  res.send(character)

});

// Delete = Delete

app.delete("/character/:id", (req, res) => {
  const id = +req.params.id;
  const character = characters.find((c) => c.id === id);

  if(!character) {
    res.status(404).send({message: "Personagem não existe!" });
    return;
  }

  const indexCharacter = characters.indexOf(character);
  delete characters[indexCharacter];

  res.send({message: "Personagem apagado com sucesso!"})

});
  
app.listen(3000, () => {
   console.log("Servidor rodando em http://localhost:3000");
} );