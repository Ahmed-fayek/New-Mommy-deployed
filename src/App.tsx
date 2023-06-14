import MainRouer from "./roots";
import "./assets/all/all.min.css";
import { AuthProvider } from "./conrext/AuthProvider";
import useAccessToken from "./token";

function App() {
  useAccessToken();

  return (
    <div className="App">
      <AuthProvider>
        <MainRouer />
      </AuthProvider>
    </div>
  );
}

export default App;
