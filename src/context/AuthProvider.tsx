import { createContext, useState } from "react";
const AuthContext = createContext({});
export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [EmailCon, SetemailCon] = useState<string>("");
  const [CodeCon, setCodeCon] = useState<string>("");
  const [communitytab, setCommunitytab] = useState<string>("Groups");
  const [currentChat, setcurrentChat] = useState<any>();
  const [autherror, setautherror] = useState<any>();

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
        currentChat,
        setcurrentChat,
        autherror,
        setautherror,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
