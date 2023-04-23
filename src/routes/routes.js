import routes from '../config/routes.js';

// Layouts
import { DefaultLayout } from '../layouts';

// General Page
import Login from '../pages/Login.jsx';

// Private Page
import Dashboard from '../pages/Dashboard.jsx';
import Profile from '../pages/Profile.jsx';

const publicRouters = [{ path: routes.login, component: Login, layout: null }];

const privateRouters = [
  { path: routes.dashboard, component: Dashboard },
  { path: routes.profile, component: Profile, layout: DefaultLayout },
];

export { publicRouters, privateRouters };
