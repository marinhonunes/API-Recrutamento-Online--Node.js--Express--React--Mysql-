import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormCandidatar from "./components/formularios/FormCandidatar";
import CadastroCandidato from './components/formularios/FormCadCandidato.jsx'
import CadastroVaga from './components/formularios/FormCadVaga.jsx'
import MenuBar from "./components/menu/MenuBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <MenuBar path='/home'/>
        <Routes>
          <Route path='/candidato' element={<CadastroCandidato/>} />
          <Route path="/inscricoes" element={<FormCandidatar />} />
          <Route path="/vaga" element={<CadastroVaga />} />
        </Routes>
      </>
    </BrowserRouter>  
  );
}

export default App;
