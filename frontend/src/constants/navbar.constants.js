// constants
import { routes } from "./routes";

export const signedIn = [
  {
    name: "Dashboard",
    path: routes.BASE,
  },
  {
    name: "Groups",
    path: routes.GROUPS,
  },
  {
    name: "Transactions",
    path: routes.TRANSACTIONS,
  },
  {
    name:"Logout",
    path: routes.LOGOUT,
  },

];

export const signedOut = [
  {
    name: "Login",
    path: routes.LOGIN,
  },
  {
    name: "Sign Up",
    path: routes.SIGNUP,
  },
];