// router import
import Router from "./router.js";
customElements.define('router-outlet', Router);

// Start page where your log in, yiu cant pass this unless you log in.
import LoginForm from "./components/login-form.js";
import LoginView from "./views/login-view.js";
customElements.define('login-form', LoginForm);
customElements.define('login-view', LoginView);

// Unused so far
import NotFound  from "./components/not-found.js";
customElements.define('not-found', NotFound );

// Main (4) pages when logged in
import ShowTeam from "./components/show-team.js"
import TeamView from "./views/team-view.js";
customElements.define('show-team', ShowTeam );
customElements.define('team-view', TeamView );

import ShowProjects from "./components/show-projects.js";
import ProjectsView from "./views/projects-view.js";
import ReadReportView from "./views/read-report-view.js";
import ReadReport from "./components/read-report.js";
customElements.define('show-projects', ShowProjects);
customElements.define('read-report', ReadReport);
customElements.define('projects-view', ProjectsView);
customElements.define('read-report-view', ReadReportView);

import CreateProject from "./components/create-project.js";
import CreateProjectView from "./views/create-project-view.js";
customElements.define('create-project-view', CreateProjectView);
customElements.define('create-project', CreateProject);

import ShowTMReports from "./components/tm-components/show-tm-reports.js";
customElements.define('show-tm-reports', ShowTMReports);
import WriteReport from "./components/tm-components/write-tm-reports.js";
customElements.define('write-tm-report', WriteReport);

import ResetPw from "./components/reset-pw.js";
customElements.define('reset-pw', ResetPw);

import ShowReports from "./components/show-reports.js";
import ReportsView from "./views/reports-view.js";
customElements.define('show-reports', ShowReports);
customElements.define('reports-view', ReportsView);

import LoggedIn  from "./components/logged-in.js";
import LoggedInView  from "./views/logged-view.js";
customElements.define('logged-in', LoggedIn );
customElements.define('logged-view', LoggedInView );

// The navigation bar
import Navigation from "./navigation.js";
customElements.define("navigation-outlet", Navigation);

// Dummyroute used to refresh JS on pages without reloading the page. 
import DummyRefresh from "./components/dummy-refresh.js";
customElements.define("dummy-refresh", DummyRefresh);

// Sidebars
import UserInfo from './components/sidebars/user-info.js';
customElements.define("user-info", UserInfo)
import UserAdd from './components/sidebars/user-add.js';
customElements.define("user-add", UserAdd)
import ProjectAdd from './components/sidebars/project-add.js';
customElements.define("project-add", ProjectAdd)