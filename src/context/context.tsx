import useUser from "@/hooks/useUser";
import { createContext } from "react";
type TProps = {
  children: React.ReactNode;
};
// Define the default state
const defaultState: UserState = {
  user: {
    name: "",
    email: "",
    photo: "",
  },
  updateUserState: (user: User) => {},
};

const UserContext = createContext<UserState>(defaultState);

const UserContextProvider = (props: TProps) => {
  return (
    <UserContext.Provider value={useUser()}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
