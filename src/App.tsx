import { useNavigate } from "react-router-dom";
import "./assets/all/all.min.css";
import RefreshToken from "./services/refreshToken";
import { useEffect } from "react";
function App() {
  const navigator = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigator("/");
    }
  }, [localStorage.getItem("token")]);

  return RefreshToken();
}

export default App;
