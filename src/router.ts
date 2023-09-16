import { createRouter, createWebHistory } from 'vue-router';

import ViewHome from './components/views/ViewHome.vue';
import ViewAbout from './components/views/ViewAbout.vue';
import ViewLogin from './components/views/ViewLogin.vue';

const routes = {
  home: {
    component: ViewHome,
    path: '/',
  },
  about: {
    component: ViewAbout,
    path: '/about',
  },
  login: {
    component: ViewLogin,
    path: '/login',
  },
  // health: {
  //   component: ViewAbout,
  //   path: '/health',
  // },
};

export function makeRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: Object.entries(routes).map(([name, config]) => ({
      name,
      ...config,
    })),
  });
}
