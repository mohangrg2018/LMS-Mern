import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const value = { navigate };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
