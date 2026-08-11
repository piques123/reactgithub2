const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let nextAlunoId = 1;
const alunos = [
    { id: nextAlunoId++, nome: 'João Silva', curso: 'Engenharia' },
    { id: nextAlunoId++, nome: 'Maria Souza', curso: 'Administração' }
];

const cursos = [
    { id: 1, nome: 'Engenharia' },
    { id: 2, nome: 'Administração' },
    { id: 3, nome: 'Direito' },
    { id: 4, nome: 'Ciências da Computação' }
];

app.get('/', (req, res) => {
    res.json({ message: 'API do backend funcionando!' });
});

app.get('/alunos', (req, res) => {
    res.json(alunos);
});

app.post('/alunos', (req, res) => {
    try {
        const { nome, curso } = req.body;

        if (!nome || !curso) {
            return res.status(400).json({ message: 'Nome e curso são obrigatórios' });
        }

        const novoAluno = {
            id: nextAlunoId++,
            nome,
            curso
        };

        alunos.push(novoAluno);
        res.status(201).json(novoAluno);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar aluno', error: error.message });
    }
});

app.delete('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = alunos.findIndex((aluno) => aluno.id === id);

    if (index === -1) {
        return res.status(404).json({ message: `Aluno ${id} não encontrado` });
    }

    alunos.splice(index, 1);
    res.json({ message: `Aluno ${id} removido` });
});

app.get('/cursos', (req, res) => {
    res.json(cursos);
});

app.get('/status', (req, res) => {
    res.json({ status: 'online', servidor: 'Node.js + Express' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
