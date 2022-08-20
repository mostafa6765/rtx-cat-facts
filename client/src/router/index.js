import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/facts',
    name: 'API',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/facts/:id/edit',
    name: 'edit-fact',
    component: () => import(/* webpackChunkName: "edit-fact" */ '../views/EditFact.vue'),
  },
  {
    path: '/facts/add',
    name: 'add-fact',
    component: () => import(/* webpackChunkName: "add-fact" */ '../views/AddFact.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
