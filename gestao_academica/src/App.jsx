import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [alunos, setAlunos] = useState([
    { id: 1, nome: 'João Silva', curso: 'Engenharia' },
    { id: 2, nome: 'Maria Souza', curso: 'Administração' }
  ]);

  const [professores, setProfessores] = useState([
    { id: 1, nome: 'Prof. Paulo' },
    { id: 2, nome: 'Profª. Ana' }
  ]);

  return (
    <BrowserRouter basename="/reactgithub2">
      <nav className="menu">
        <Link to="/cadastrar">Cadastrar</Link>
        <Link to="/alunos">Alunos</Link>
        <Link to="/professores">Professores</Link>
      </nav>

      <Routes>
        <Route path="/cadastrar" element={<FormPage alunos={alunos} setAlunos={setAlunos} professores={professores} setProfessores={setProfessores} />} />
        <Route path="/alunos" element={<ListPage title="Alunos" items={alunos} columns={["id", "nome", "curso"]} />} />
        <Route path="/professores" element={<ListPage title="Professores" items={professores} columns={["id", "nome"]} />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="page">
      <h1>Gestão Acadêmica</h1>
      <p>Use o menu para cadastrar e consultar alunos ou professores.</p>
    </div>
  );
}

function FormPage({ alunos, setAlunos, professores, setProfessores }) {
  const campoNome = useRef();
  const campoTipo = useRef();
  const campoCurso = useRef();
  const navigate = useNavigate();

  const salvar = () => {
    const nome = campoNome.current.value.trim();
    const tipo = campoTipo.current.value;
    const curso = campoCurso.current.value.trim();

    if (!nome) return alert('Digite um nome!');
    if (tipo === 'aluno' && !curso) return alert('Digite um curso!');

    if (tipo === 'aluno') {
      const novoAluno = {
        id: alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1,
        nome,
        curso
      };
      setAlunos([...alunos, novoAluno]);
      navigate('/alunos');
    } else {
      const novoProfessor = {
        id: professores.length > 0 ? professores[professores.length - 1].id + 1 : 1,
        nome
      };
      setProfessores([...professores, novoProfessor]);
      navigate('/professores');
    }

    campoNome.current.value = '';
    campoCurso.current.value = '';
  };

  return (
    <div className="page form-page">
      <h2>Cadastrar</h2>

      <div className="form-row">
        <label>Nome</label>
        <input ref={campoNome} type="text" placeholder="Digite o nome" />
      </div>

      <div className="form-row">
        <label>Tipo</label>
        <select ref={campoTipo}>
          <option value="aluno">Aluno</option>
          <option value="professor">Professor</option>
        </select>
      </div>

      <div className="form-row">
        <label>Curso (apenas para aluno)</label>
        <input ref={campoCurso} type="text" placeholder="Digite o curso" />
      </div>

      <button onClick={salvar}>Salvar</button>
    </div>
  );
}

function ListPage({ title, items, columns }) {
  return (
    <div className="page">
      <h2>{title}</h2>
      {items.length === 0 ? (
        <p>Nenhum item cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column}>{item[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
