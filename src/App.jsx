import { useGlobalContext } from "./Hook/useGlobalContext";
import HomePage from "./Pages/HomePage/HomePage";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";

function App() {
  const { showHome } = useGlobalContext();

  return <div className="w-full">{showHome ? <HomePage /> : <WelcomePage />}</div>;
}

export default App;
