import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Create from '../views/Create.vue'
import Update from '../views/Update.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Create',
    name: 'Create',
    component: Create
  },
  {
    path: '/Update/:id',
    name: 'Update',
    component: Update
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
