import { useNavigate } from "react-router-dom";
import "./assets/all/all.min.css";
import RefreshToken from "./services/refreshToken";
import { useEffect } from "react";
function App() {
  
   function dtt(){
    const httx = new XMLHttpRequest();
    httx.open("GET","https://jsonplaceholder.typicode.com/posts",true);
    httx.send();
    httx.onreadystatechange=function(){
      if(httx.readyState==4&& this.status==200){
                console.log(JSON.parse(this.responseText))
      }
    }  
   }

   dtt();

  const navigator = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigator("/");
    }
  }, [localStorage.getItem("token")]);

  return RefreshToken();

}

export default App;
