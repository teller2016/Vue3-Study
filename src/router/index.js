import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', //url
            name: 'Home',
            component: Home,
        }, // 객체 하나가 하나의 route를 의미
        {
            path: '/todos',
            name: 'Todos',
            component: Todos,
        },
        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo,
        },
    ]
});

// 1: home, 2: todos, 3:/todos/create, 4: /todos/:id

export default router;