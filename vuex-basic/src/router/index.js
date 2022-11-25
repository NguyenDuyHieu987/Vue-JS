import HelloWorld from '../components/HelloWorld.vue';
import MyMovie from '../components/MyMovie.vue';
import DetailMovie from '../components/DetailMovie.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/movie/:page', name: 'MyMovie', component: MyMovie },
    { path: '/detail-movie/:id', name: 'DetailMovie', component: DetailMovie },
  ],
});

export default router;
