import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Projects from '@/components/Projects';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home,
    },
    {
      path: '/projects',
      name: 'HelloWorld',
      component: Projects,
    },
  ],
});
