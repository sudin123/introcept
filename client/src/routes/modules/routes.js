import LandingPage from "../../pages/Landing"
import List from '../../pages/List';

export default [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/list',
    component: List,
  },
  {
    path: '*',
    redirect: '/',
  },
];
