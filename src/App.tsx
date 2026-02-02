import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ActionDetail } from './pages/ActionDetail';
import { CreateAction } from './pages/CreateAction';
import { Search } from './pages/Search';
import { Favorites } from './pages/Favorites';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/action/:id" element={<ActionDetail />} />
            <Route path="/create" element={<CreateAction />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Topple — Collective action for change</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
