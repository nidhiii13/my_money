import React from "react";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// components
import Loadable from "./Loadable";

// constants
import { routes } from "../../../constants/routes";
import BodyLayout from "../../../layouts/BodyLayout";
import { signedOut } from "../../../constants/navbar.constants";

export default function SignedOutRouter() {
  return useRoutes([
    {
      path: routes.BASE,
      element: <BodyLayout navLinks={signedOut} />,
      children: [
        { element: <SignIn />, index: true },
        {
          path: routes.LOGIN,
          element: <SignIn />,
        },
        {
          path: routes.SIGNUP,
          element: <Signup />,
        },
      ],
    },
  ]);
}

const Signup = Loadable(lazy(() => import("../../../pages/Auth/Signup")));

const SignIn = Loadable(lazy(() => import("../../../pages/Auth/Signin")));
