import './assets/style.css';

import { makeRouter } from './router';
import { mount } from './mount';

mount({ router: makeRouter() });
