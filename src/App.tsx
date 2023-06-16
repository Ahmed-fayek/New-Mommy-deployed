import MainRouer from "./roots";
import "./assets/all/all.min.css";
import AuthContext, { AuthProvider } from "./conrext/AuthProvider";
import { useContext } from "react";

function App() {
  const authcontext = useContext(AuthContext);
  return (
    <div className="App">
      <AuthProvider>
        <MainRouer />
      </AuthProvider>
    </div>
  );
}

export default App;
