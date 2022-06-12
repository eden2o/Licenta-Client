import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Comenzi from './pages/Comenzi';
import Componente from './pages/Componente';
import Masini from './pages/Masini';
import Produse from './pages/Produse';
import Masina from './pages/Masina';
import Acasa from './pages/Acasa';
import './styles.css';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Acasa />} />
          <Route path='/comenzi' element={<Comenzi />} />
          <Route path='/masini' element={<Masini />} />
          <Route path='/componente' element={<Componente />} />
          <Route path='/produse' element={<Produse />} />
          <Route path='/masini/:id' element={<Masina />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
