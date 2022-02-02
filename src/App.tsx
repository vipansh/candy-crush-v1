import "./App.css";
import StartGamePage from "./components/StartGamePage";
import { GameDataProvider } from "./context/GameDataContext";
function App() {
  return (
    <div className="App">
      <GameDataProvider>
        <StartGamePage />
      </GameDataProvider>
    </div>
  );
}

export default App;
