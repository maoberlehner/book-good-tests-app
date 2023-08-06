import { createRouter, createWebHistory } from 'vue-router';

import ViewHome from './components/views/ViewHome.vue';
import ViewAbout from './components/views/ViewAbout.vue';

const routes = {
  home: {
    component: ViewHome,
    path: '/',
  },
  about: {
    component: ViewAbout,
    path: '/about',
  },
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
