import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MemoryCard from "./games/memory-card/MemoryCard";
import TicTacToe from "./games/tic-tac-toe/TicTacToe";
import TypingGame from "./games/typing-game/TypingGame";
import Game2048 from "./games/game-2048/Game2048";
import FlappyBird from "./games/flappy-bird/FlappyBird";
import Minesweeper from "./games/minesweeper/Minesweeper";
import NotFound from "./pages/NotFound";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/memory-card" element={<MemoryCard />} />
          <Route path="/game/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/game/typing" element={<TypingGame />} />
          <Route path="/game/2048" element={<Game2048 />} />
          <Route path="/game/flappy-bird" element={<FlappyBird />} />
          <Route path="/game/minesweeper" element={<Minesweeper />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
