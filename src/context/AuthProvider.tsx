import { createContext, useState } from "react";
const AuthContext = createContext({});
export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [EmailCon, SetemailCon] = useState<string>("");
  const [CodeCon, setCodeCon] = useState<string>("");
  const [communitytab, setCommunitytab] = useState<string>("Friends");
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
        communitytab,
        setCommunitytab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
