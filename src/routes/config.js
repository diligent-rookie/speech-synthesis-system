
import Login from '../pages/Login';
import Speech from '../pages/Speech';

const routes = [
  {
    path:'/',
    name:'登录',
    component: Login
  },
  {
    path:'/login',
    name:'登录',
    component: Login
  },
  {
    path:'/speech',
    name:'语音',
    component: Speech
  }
]

export default routes