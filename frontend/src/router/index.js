import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
// 模块引入
const modulesFiles = require.context('./modules', true, /\.js$/)

const originalPush = Router.prototype.push;
// 重复路由点击报错处理
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

/**
 * 参数说明
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
// 模块数据集成
let modulesArr = [];
modulesFiles.keys().forEach((modules) => {
  // const moduleName = modules.replace(/^\.\/(.*)\.\w+$/, '$1');
  const moduleContent = modulesFiles(modules);
  Object.keys(moduleContent).forEach((key) => {
    let list = moduleContent[key] || [];
    modulesArr.push(...list)
  });
})

export const constantRoutes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/Login.vue'),
  //   name: 'login',
  //   meta: { title: '登录' },
  //   hidden: true
  // },
  {
    path: '/',
    redirect: '/workOrder/assign',
    component: Layout,
    children: [
      // {
      //   path: '/index',
      //   component: () => import('@/views/Home'),
      //   name: 'index',
      //   meta: { title: '首页', affix: false }
      // }
    ]
  },
  ...modulesArr,
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]
// 加权限处理
// 循环后台权限id树 扁平化路由数据
// function getRouterList(list) {
//   let arr = []
//   list.forEach(ele => {
//     if ( ele && ele.children ) {
//       let chilren = getRouterList(ele.children)
// arr.push(...chilren)
//     }
//     ele.children = [];
//     arr.push(ele)
//   })
//   return arr;
// }
// // 比较找到对应的权限路由
// let routerList = getRouterList();
// let resultRouter = [];
// for(let i = 0; i < menuList.length; i++) {
//   routerList.forEach(ele => {
//     if ( menuList[i].id == ele.id ) {
//       resultRouter.push(ele);
//     }
//   })
// }

// function makeTreeData(arr, parentId) {
//   let temp = []
//   for (let i = 0; i < arr.length; i++) {
//       if (arr[i].parentId === parentId) {
//           temp.push(arr[i])
//           arr[i].children = makeTreeData(navData, arr[i].id)
//       }
//   }
//   return temp
// }
// let result = makeTreeData(resultRouter,null);

const createRouter = () => new Router({
  mode: 'hash',
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
