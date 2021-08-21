const express = require("express");
const app = express();

const port = 3000;
app.use(express.json());

const movies = [
  {
      id: 1,
      nome: "Crônicas de Nárnia",
      urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9u27L25JoZdlfEAuxaXgfqtZF1O4f-lCgDjyE3zlvBDNTgT6IJ7Ah9MC2NZ1haN91A4&usqp=CAU"
  },

  {
      id: 2,
      nome: "Titanic",
      urlImg: "https://aventurasnahistoria.uol.com.br/media/_versions/legacy/2018/04/11/titanic2-0349859403-2203948..capa_widexl.jpg"
  },

  {
    id: 3,
    nome: "Constatine",
    urlImg: "https://br.web.img2.acsta.net/pictures/210/163/21016319_20130627174102758.jpg"
  },

  {
      id: 4,
      nome: "Planeta dos Macacos",
      urlImg: "https://cdn.tlc-massive.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27246590.jpg%27&ImageUrl=%27246590.jpg%27&EntityType=%27Item%27&EntityId=%277919%27&device=web_browser&subscriptions=Anonymous&Width=360&Height=540"
  },

  {
      id: 5,
      nome:  "Interstellar",
      urlImg: "https://br.web.img3.acsta.net/pictures/14/10/31/20/39/476171.jpg"
  }
];

//O filter Boolean só irá retornar o que for True
const getMoviesValidate = () => movies.filter(Boolean);

const getMoviesById = (id) => {
    getMoviesValidate().find((movie) => {
        movie.id == id;
    });
}

const getIndexByMovie = (id) => {
  getMoviesValidate().findIndex((movie) => movie.id == id);
}

// Método GET - Home
app.get("/", (req, res) => {
  res.send("Bem vindos !");
});

// Método GET - Filmes
app.get("/filmes", (req, res) => {
  res.send(getMoviesValidate()); 
});

app.get("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = getMoviesById(id);

  if (!movie) {
    res.send("Filme não encontrado");
  }

  res.send(movie);
});

// Método POST - Criar filme
app.post("/filmes", (req, res) => {
  const movie = req.body;

  if(!movie || !movie.nome ||!movie.urlImg){
    res.status(400).send({
      message: "Filme inválido, tente novamente."
    });
    return;
  }

  const lastMovie = movies[movies.length -1];

  if(movies.length){
    movie.id = lastMovie.id +1;
    movies.push(movie);
  
  }else {
    movie.id = 1;
    movies.push(movie);
  }
  
  res.send(`Filme adicionado com sucesso: ${movie}.
    O id do Filme é: ${id}.`);
});

// Método PUT - Atualizar itens
app.put("/filmes/:id", (req, res) => {
  const id = req.params.id - 1;
  const movieIndex = getIndexByMovie(id);

  if(movieIndex < 0){
    res.status(400).send({
      message: "Filme não encontrado, tente novamente."
    })
    return;
  }

  const newMovie = req.body;

  if(!Object.keys(newMovie).length){
    res.status(400).send({
      message: "O body está vazio !"
    })
    return;
  }

  if(!newMovie || !newMovie.nome || !newMovie.urlImg) {
    res.status(400).send({
      message: "Filme inválido, tente novamente."
    })
    return;
  }

  const movie = getMoviesById(id);

  console.log(movieIndex);
  movies[movieIndex] = {
    ... movie,
    ... newMovie,
  };

  res.send(movies[movieIndex]);
});

// Método DELETE - Excluir item
app.delete("/filmes/:id", (req, res) => {
  const id = req.params.id - 1;
  const movie = movies[id];

  if (!movie) {
    res.send("Filme não encontrado");
  }

  delete movies[id];
  res.send("Filme excluído com sucesso!");
});

app.listen(port, () => {
  console.info(`App está rodando em: http://localhost:${port}/`);
});
