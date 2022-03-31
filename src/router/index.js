import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DefaultLayout from '@/views/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    name: 'DefaultLayout',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'HomeView',
        component: HomeView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
