import {createRouter, createWebHistory} from 'vue-router'
import HomeBooks from '../components/HomeBooks.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // PARTIE PUBLIQUE UTILISATEUR
        {
            path: '/',
            name: 'home',
            component: HomeBooks
        },
        {
            path: '/books',
            name: 'ListBooks',
            component: () => import('../components/ListBooks.vue')
        },
        {
            path: '/books/:id',
            name: 'DetailBooks',
            component: () => import('../components/DetailBooks.vue')       
         },
        // PARTIE ADMIN 
      {
        path: '/admin/books',
        name: 'AdminBooks',
        component: () => import('../components/admin/ListBookAdmin.vue')
      },
      {
        path: '/admin/books/create',
        name: 'CreateBook',
        component: () => import('../components/admin/CreateBooks.vue')
      },
      {
        path: '/admin/books/:id/edit',
        name: 'UpdateBook',
        component: () => import('../components/admin/UpdateBooks.vue')
      }
    ]
})

export default router