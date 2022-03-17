import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 获取token
import getPageTitle from '@/utils/get-page-title'
import { authorityControl } from './settings'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // 重定向白名单

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title);
  NProgress.done();
  if (to.matched.length == 0) {
    next({ path: '/404' });
  } 
  next();
  // determine whether the user has logged in
  // const hasToken = getToken();
  // console.log(hasToken);

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       // 如果 无效地址
//       if (to.matched.length == 0) {
//         next({ path: '/404' });
//       } else {
//         // 判断是否需要权限控制
//         if (!authorityControl) {
//           next();
//           NProgress.done()
//           return;
//         }
// 
//         if (store.state.menuList.length == 0) {
//           store.dispatch('getMenuList').then(res => {
//             if (store.state.menuList.indexOf(to.meta.originalUrl) != -1) {
//               next();
//             } else {
//               next({ path: '/403', replace: true });
//             }
//           });
//         } else {
//           if (store.state.menuList.indexOf(to.meta.originalUrl) != -1) {
//             next();
//           } else {
//             next({ path: '/403', replace: true });
//           }
//         }
//       }
// 
//       // // determine whether the user has obtained his permission roles through getInfo
//       // const hasRoles = store.getters.roles && store.getters.roles.length > 0
//       // if (hasRoles) {
//       //   next()
//       // } else {
//       //   try {
//       //     // get user info
//       //     // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
//       //     const { roles } = await store.dispatch('user/getInfo')
// 
//       //     // generate accessible routes map based on roles
//       //     const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
// 
//       //     // dynamically add accessible routes
//       //     router.addRoutes(accessRoutes)
//       //     // console.log(accessRoutes);
//       //     // hack method to ensure that addRoutes is complete
//       //     // set the replace: true, so the navigation will not leave a history record
//       //     next({ ...to, replace: true })
//       //   } catch (error) {
//       //     // remove token and go to login page to re-login
//       //     await store.dispatch('user/resetToken')
//       //     Message.error(error || 'Has Error')
//       //     next(`/login?redirect=${to.path}`)
//       //     NProgress.done()
//       //   }
//       // }
//     }
//   } else {
//     /* has no token*/
//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
