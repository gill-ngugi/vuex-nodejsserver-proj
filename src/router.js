import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Auth/Dashboard';
import Briefcase from './components/Briefcase';
import MeetingPacks from './components/MeetingPacks';
import Meetings from './components/Meetings';
import Resources from './components/Resources';
import Approvals from './components/Approvals';
import Compliance from './components/Compliance';
import Evaluation from './components/Evaluation';
import Discussion from './components/Discussion';
import Plans from './components/Plans';
import Conference from './components/Conference';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login',
    },
    {
      path: '/register',
      component: Register,
      name: 'register'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'dashboard',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Briefcase',
      component: Briefcase,
      name: 'Briefcase',
    },  
    {
      path: '/Meeting Packs',
      component: MeetingPacks,
      name: 'Meeting Packs',
    },  
    {
      path: '/Meetings',
      component: Meetings,
      name: 'Meetings',
    },  
    {
      path: '/Resources',
      component: Resources,
      name: 'Resources',
    },  
    {
      path: '/Approvals',
      component: Approvals,
      name: 'Approvals',
    },  
    {
      path: '/Compliance',
      component: Compliance,
      name: 'Compliance',
    },
    {
      path: '/Evaluation',
      component: Evaluation,
      name: 'Evaluation',
    },
    {
      path: '/Discussion',
      component: Discussion,
      name: 'Discussion'
    },
    {
      path: '/Plans',
      component: Plans,
      name: 'Plans'
    },
    {
      path: '/Conference',
      component: Conference,
      name: 'Conference'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router