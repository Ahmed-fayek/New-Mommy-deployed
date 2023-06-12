import MainRouer from "./roots";
import "./assets/all/all.min.css";
import { AuthProvider } from "./conrext/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MainRouer />
      </AuthProvider>
    </div>
  );
}

export default App;
