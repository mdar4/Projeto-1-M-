const express = require('express');
const app = express();

const port = 3000;
app.use(express.json());

const movies = [
    'Crônicas de Nárnia',
    'Titanic',
    'Constatine',
    'Planeta dos Macacos'
];

// Método GET - Home
app.get('/', (req, res) => {
    res.send("Bem vindos !");
});

// Método GET - Filmes
app.get('/filmes', (req, res) => {
    res.send(movies);
});

app.get('/filmes/:id', (req,res) => {
    const id = req.params.id -1;
    const movie = movies[id];

    if(!movie) {
        res.send('Filme não encontrado')
    }

    res.send(movie);
});

// Método POST - Criar filme
app.post('/filmes', (req, res) => {
    const movie = req.body.movie;
    const id = movies.length;
    movies.push(movie);

    res.send(`Filme adicionado com sucesso: ${movie}.
    O id do Filme é: ${id}.`);
});

// Método PUT - Atualizar itens
app.put('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const movie = req.body.movie;
    movies[id] = movie;

    res.send(`Filme atualizado com sucesso: ${movie}.
    O id do Filme é: ${id}.`)
});

// Método DELETE - Excluir item
app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const movie = movies[id];

    if(!movie) {
        res.send('Filme não encontrado')
    }
    
    delete movies[id];
    res.send("Filme excluído com sucesso!") 
});

app.listen(port, () => {
    console.info(`App está rodando em: http://localhost:${port}/`);
});