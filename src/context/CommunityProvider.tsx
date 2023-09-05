import { createContext, useState } from "react";
const CommunityContext = createContext({});
export const CommunityProvider = ({ children }: any) => {
  const [communitytab, setCommunitytab] = useState<string>("Posts");
  const [currentChat, setcurrentChat] = useState<any>("");
  const [autherror, setautherror] = useState<any>("");
  return (
    <CommunityContext.Provider
      value={{
        communitytab,
        setCommunitytab,
        currentChat,
        setcurrentChat,
        autherror,
        setautherror,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
export default CommunityContext;
