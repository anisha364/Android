import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Splash from "./components/screens/Splash";
import Onboarding from "./components/screens/Onboarding";
import Login from "./components/screens/Login";
import SignUp from "./components/screens/SignUp";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Settings from "./components/screens/Settings";
import Notifications from "./components/screens/Notifications";
import Search from "./components/screens/Search";
import Chat from "./components/screens/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Splash },
      { path: "onboarding", Component: Onboarding },
      { path: "login", Component: Login },
      { path: "signup", Component: SignUp },
      { path: "home", Component: Home },
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
      { path: "notifications", Component: Notifications },
      { path: "search", Component: Search },
      { path: "chat", Component: Chat },
    ],
  },
]);
