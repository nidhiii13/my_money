import React from "react";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// components
import Loadable from "./Loadable";

// constants
import { routes } from "../../../constants/routes";
import BodyLayout from "../../../layouts/BodyLayout";
import { signedIn } from "../../../constants/navbar.constants";

export default function SignedInRouter() {
  return useRoutes([
    {
      path: routes.BASE,
      element: <BodyLayout navLinks={signedIn} />,
      children: [
        { element: <Dashboard />, index: true },
        {
          path: routes.GROUPS,
          element: <Groups />,
        },
        {
          path: routes.GROUP_PAGE,
          element: <Group />,
        },
        {
          path: routes.TRANSACTIONS,
          element: <Transactions />,
        },
        {
          path: routes.TRANSACTION,
          element: <Transaction />,
        },
        {
          path: routes.LOGOUT,
          element: <Signout />,
        },
      ],
    },
  ]);
}

const Dashboard = Loadable(lazy(() => import("../../../pages/Dashboard")));

const Groups = Loadable(lazy(() => import("../../../pages/Groups")));

const Group = Loadable(lazy(() => import("../../../pages/Group")));

const Transactions = Loadable(
  lazy(() => import("../../../pages/Transactions"))
);

const Transaction = Loadable(lazy(() => import("../../../pages/Transaction")));

const Signout = Loadable(lazy(() => import("../../../pages/Auth/Signout")));
