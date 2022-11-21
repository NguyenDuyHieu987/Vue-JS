import HelloWorld from '../components/HelloWorld.vue';
import TagMultipleSelect from '../components/TagMultipleSelect.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/tag', name: 'TagMultipleSelect', component: TagMultipleSelect },
  ],
});

export default router;
