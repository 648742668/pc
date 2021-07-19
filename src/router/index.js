import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
/* Router Modules */

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/forget_pwd',
    component: () => import('@/views/forget_pwd/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人信息', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    alwaysShow: true, // will always show the root menu
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'peoples',
      roles: ['admin', 'ums'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/index'),
        name: 'UserList',
        meta: {
          title: '用户管理',
          roles: ['admin', 'ums'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'role_user',
        component: () => import('@/views/role_user/index'),
        name: 'RoleUser',
        hidden: true,
        meta: {
          title: '关联用户',
          roles: ['admin', 'ums']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role_resource',
        component: () => import('@/views/role_resource/index'),
        name: 'RoleResource',
        hidden: true,
        meta: {
          title: '关联权限',
          roles: ['admin', 'ums']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role_list',
        component: () => import('@/views/role/index'),
        name: 'RoleList',
        meta: {
          title: '角色管理',
          roles: ['admin', 'ums']
          // if do not set roles, means: this page does not require permission
        }
      }, {
        path: 'resource_list',
        component: () => import('@/views/resource/index'),
        name: 'ResourceList',
        meta: {
          title: '权限管理',
          roles: ['admin', 'ums']
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  // 商品模块
  {
    path: '/product',
    component: Layout,
    redirect: '/product/product',
    alwaysShow: true, // will always show the root menu
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'product', // asd
      roles: ['admin', 'pms'] // you can set roles in root nav
    },
    children: [
      {
        path: 'product',
        name: 'ProductList',
        component: () => import('@/views/product'),
        meta: {
          title: '商品管理',
          roles: ['admin', 'pms']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'brand',
        name: 'BrandList',
        component: () => import('@/views/brand'),
        meta: {
          title: '品牌管理',
          roles: ['admin', 'pms']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'category',
        name: 'CategoryList',
        component: () => import('@/views/category'),
        meta: {
          title: '分类管理',
          roles: ['admin', 'pms']
          // if do not set roles, means: this page does not require permission
        }},
      {
        path: 'order_list',
        component: () => import('@/views/order/index'),
        name: 'OrderList',
        meta: {
          title: '订单管理',
          roles: ['admin', 'pms'] // or you can only set roles in sub nav
        }},
      {
        path: 'spu',
        name: 'SpuList',
        component: () => import('@/views/spu'),
        hidden: true,
        meta: {
          title: 'spu管理',
          roles: ['admin', 'pms']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'sku',
        name: 'SkuList',
        hidden: true,
        component: () => import('@/views/sku'),
        meta: {
          title: 'sku管理',
          roles: ['admin', 'pms']
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/lxdorder',
    alwaysShow: true, // will always show the root menu
    name: 'Data',
    meta: {
      title: '数据查看',
      icon: 'table',
      roles: ['admin', 'dms'] // you can set roles in root nav
    },
    children: [
      {
        path: 'lxdorder',
        name: 'LxdOrderList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/lxdorder'),
        meta: {
          title: '订单信息',
          roles: ['admin', 'dms'] // you can set roles in root nav
        }
      },
      {
        path: 'lxdstock',
        name: 'LxdStockList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/lxdstock'),
        meta: {
          title: '库存信息',
          roles: ['admin', 'dms'] // you can set roles in root nav
        }
      },
      {
        path: 'lxduser',
        name: 'LxdUserList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/lxduser'),
        meta: {
          title: '用户访问',
          roles: ['admin', 'dms'] // you can set roles in root nav
        }
      },
      {
        path: 'lxdconsumer',
        name: 'LxdConsumerList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/lxdconsumer'),
        meta: {
          title: '消费者访问',
          roles: ['admin', 'dms'] // you can set roles in root nav
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
