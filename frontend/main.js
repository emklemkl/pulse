// router import
import Router from "./router.js";
customElements.define('router-outlet', Router);

import LoginForm from "./components/login-form.js";
import LoginView from "./views/login-view.js";
customElements.define('login-form', LoginForm);
customElements.define('login-view', LoginView);

import NotFound  from "./components/not-found.js";
customElements.define('not-found', NotFound );

import UserInfo from './components/user-info.js';
customElements.define("user-info", UserInfo)

import ShowProjects from "./components/show-projects.js";
import ProjectsView from "./views/projects-view.js";
customElements.define('show-projects', ShowProjects);
customElements.define('projects-view', ProjectsView);

import LoggedIn  from "./components/logged-in.js";
import LoggedInView  from "./views/logged-view.js";
customElements.define('logged-in', LoggedIn );
customElements.define('logged-view', LoggedInView );

import Navigation from "./navigation.js";
customElements.define("navigation-outlet", Navigation);