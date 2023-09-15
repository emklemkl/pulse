// router import
import Router from "./router.js";
customElements.define('router-outlet', Router);

import LoginForm from "./components/login-form.js";
import LoginView from "./views/login-view.js";
customElements.define('login-form', LoginForm);
customElements.define('login-view', LoginView);

import NotFound  from "./components/not-found.js";
customElements.define('not-found', NotFound );

import LoggedIn  from "./components/logged-in.js";
import LoggedInView  from "./views/logged-view.js";
customElements.define('logged-in', LoggedIn );
customElements.define('logged-view', LoggedInView );

import Navigation from "./navigation.js";
customElements.define("navigation-outlet", Navigation);