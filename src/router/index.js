import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/login',
    name: 'Login',
    components: {
        default: () => import(/* webpackChunkName: "Login" */ '../views/users/login.vue')
    }
  }, 
  {
      path: '/register',
      name: 'Register',
      components: {
          default: () => import(/* webpackChunkName: "Register" */ '../views/users/register.vue')
      }
  },
  //找回密码
  {
    path: '/retrievepwd',
    name: 'RetrievePwd',
    components: {
        default: () => import(/* webpackChunkName: "RetrievePwd" */ '../views/safe/retrievePwd')
    },
    meta: {
        title: '找回密码'
    }
  },
  //我的主页
  {
      path: '/mine',
      name: 'Mine',
      components: {
          default: () => import(/* webpackChunkName: "Register" */ '../views/users/mine.vue')
      },
      meta: {
        requireAuth: true
      }
  },
  // 修改头像
  {
    path: '/avatar',
    name: 'Avatar',
    components: {
        default: () => import(/* webpackChunkName: "Avatar" */ '../views/users/avatar.vue')
    },
    meta: {
      requireAuth: true
    }
  },
  // 基本信息
  {
    path: '/base',
    name: 'Base',
    components: {
        default: () => import(/* webpackChunkName: "Base" */ '../views/safe/base.vue')
    },
    meta: {
        title: '基本资料',
        requireAuth: true
    }
  },
  //安全中心
  {
    path: '/safe',
    name: 'Safe',
    components: {
        default: () => import(/* webpackChunkName: "Safe" */ '../views/safe/index')
    },
    meta: {
        title: '安全中心',
        requireAuth: true
    }
  },
  //修改密码
  {
    path: '/password',
    name: 'Password',
    components: {
        default: () => import(/* webpackChunkName: "Pwd" */ '../views/safe/password')
    },
    meta: {
        title: '登录密码',
        requireAuth: true
    }
  },
  //修改手机
  {
    path: '/modifyPhone',
    name: 'ModifyPhone',
    components: {
        default: () => import(/* webpackChunkName: "ModifyPhone" */ '../views/safe/modifyPhone')
    },
    meta: {
        title: '修改手机',
        requireAuth: true
    }
  },
  //修改邮箱
  {
    path: '/email',
    name: 'Email',
    components: {
        default: () => import(/* webpackChunkName: "Email" */ '../views/safe/email')
    },
    meta: {
        title: '邮箱验证',
        requireAuth: true
    }
  },
  //
  {
    path: '/auth',
    name: 'Auth',
    components: {
        default: () => import(/* webpackChunkName: "Auth" */ '../views/safe/auth')
    },
    meta: {
        title: '身份验证',
        requireAuth: true
    }
  },
  {
    path: '/privacyset',
    name: 'Privacyset',
    components: {
        default: () => import(/* webpackChunkName: "Auth" */ '../views/safe/privacyset')
    },
    meta: {
        title: '隐私设置',
        requireAuth: true
    }
  },
  //个人主页
  {
    path: '/userinfo/:user_uid',
    name: 'userinfo',
    components: {
        default: () => import(/* webpackChunkName: "UserInfo" */ '../views/users/info/index.vue')
    },
    meta: {
      requireAuth: true
    }
  },
  //关于我们
  {
    path: '/aboutus',
    name: 'Aboutus',
    components: {
        default: () => import(/* webpackChunkName: "AboutUs" */ '../views/other/aboutus')
    },
    meta: {
        title: '关于我们'
    }
  },
  //用户协议
  {
    path: '/agreement',
    name: 'Agreement',
    components: {
        default: () => import(/* webpackChunkName: "Agreement" */ '../views/other/agreement')
    },
    meta: {
        title: '用户协议'
    }
  },
  //在线客服
  {
    path: '/online',
    name: 'Online',
    components: {
        default: () => import(/* webpackChunkName: "Online" */ '../views/other/onlineService')
    },
    meta: {
        title: '在线客服'
        // noLogin: true
    }
  },
  //问题
  {
    path: '/problem',
    name: 'Problem',
    components: {
        default: () => import(/* webpackChunkName: "Problem" */ '../views/other/problem')
    },
    meta: {
        title: '常见问题'
        // noLogin: true
    }
  }, 
  {
    path: '/problemdetail',
    name: 'problemdetail',
    components: {
        default: () => import(/* webpackChunkName: "ProblemDetail" */ '../views/other/problemDetail')
    },
    meta: {
        title: ''
        // noLogin: true
    }
  }, 
  {
    path: '/publish',
    name: 'publish',
    meta: {
      title: '发表帖子',
      back:'forum',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/publish.vue')
  },
  {//搜索历史
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/search/search.vue')
  },
  {//搜索结果
    path: '/searchresult',
    name: 'Searchresult',
    component: () => import(/* webpackChunkName: "about" */ '../views/search/searchResult.vue')
  },
  {//关注圈子
    path: '/attention',
    name: 'Attention',
    component: () => import(/* webpackChunkName: "about" */ '../views/attention/attention.vue')
  },
  {//发帖选择圈子
    path: '/postattention',
    name: 'PostAttention',
    component: () => import(/* webpackChunkName: "about" */ '../views/attention/postattention.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: '/user/',
  routes
})

export default router
