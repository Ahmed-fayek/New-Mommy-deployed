import { createContext, useState } from "react";
const AuthContext = createContext({});
export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [myuser, setmyUser] = useState();
  const [EmailCon, SetemailCon] = useState<string>("");
  const [CodeCon, setCodeCon] = useState<string>("");
  const [Refresh, setRefresh] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        EmailCon,
        SetemailCon,
        CodeCon,
        setCodeCon,
        user,
        setUser,
        Refresh,
        setRefresh,
        myuser,
        setmyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
