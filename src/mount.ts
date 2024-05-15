import { createApp } from 'vue';
import { type Router } from 'vue-router';

import App from './components/App.vue';

export function mount({ router }: { router: Router }): void {
  const app = createApp(App);
  app.use(router);
  app.mount(`#app`);
}
