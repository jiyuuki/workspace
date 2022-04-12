import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/views/layouts/DefaultLayout.vue'
import WorkSpaceView from '@/views/WorkSpaceView.vue'

const routes = [
  {
    path: '/',
    name: 'DefaultLayout',
    component: DefaultLayout,
    children: [
      {
        path: '/',
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
