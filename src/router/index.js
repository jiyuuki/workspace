import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/views/layouts/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'
import WorkSpaceView from '@/views/WorkSpaceView.vue'

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
      {
        path: '/workspace',
        name: 'WorkSpaceView',
        component: WorkSpaceView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
