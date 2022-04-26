import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/IndexView'
import Articles from '../views/ArticlesView'
import ArticleType from '../views/ArticleType'
import Article from '../views/ArticleView'
import Login from '../views/LoginView'
import Register from '../views/RegisterView'
import UserInfo from '../views/UserInfo'
import Mails from '../views/MailsView'
import Mail from '../views/MailView'
import Admin from '../views/admin/AdminView'
import WriterArticle from '../views/admin/WriterArticle'
import AdminArticles from '../views/admin/AdminArticles'
import AdminUsers from '../views/admin/AdminUsers'
import Collections from '../views/CollectionsView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/articletype',
    name: 'ArticleType',
    component: ArticleType
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/userinfo/:username',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/mail',
    name: 'Mails',
    component: Mails
  },
  {
    path: '/mailgetter/:id',
    name: 'Mail',
    component: Mail
  },
  {
    path: '/admin', 
    name: 'Admin',
    component: Admin,
    children: [
      // 当 /admin 匹配成功再进行匹配
      {
        path: 'article',
        component: WriterArticle
      },
      {
        path: 'articles',
        component: AdminArticles
      },
      {
        path: 'users',
        component: AdminUsers
      }
    ]
  },
  {
    path: '/collections',
    name: 'Collections',
    component: Collections
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router