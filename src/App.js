import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Game from './Game'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App app-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Game />
      </div>
    </BrowserRouter>
  );
}

export default App;