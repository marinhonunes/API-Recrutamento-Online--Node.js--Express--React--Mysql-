import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormCandidatar from "./components/formularios/FormCandidatar";
import MenuBar from "./components/menu/MenuBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <MenuBar path='/home'/>
        <Routes>
          {/* <Route path='/candidato' element={<FormCandidato />} />
          <Route path="/vaga" element={<FormVaga />} /> */}
          <Route path="/inscricoes" element={<FormCandidatar />} />
        </Routes>
      </>
    </BrowserRouter>  
  );
}

export default App;
