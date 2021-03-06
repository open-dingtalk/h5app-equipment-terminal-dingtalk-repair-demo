const getters = {
  baseUrl: state => state.config.baseUrl,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => [], // state.user.roles
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  visitedRoutes: state => state.tabsBar.visitedRoutes,
  orderStatus: state => state.config.orderStatus,
  orderList: state => state.demo.orderList,
  assignPerson: state => state.demo.assignPerson,
  logObj: state => state.demo.logObj,
  userInfo: state => state.demo.userInfo,
  corpId: state => state.demo.corpId,
  agentId: state => state.demo.agentId,
  deviceList: state => state.demo.deviceList,
  deviceLogObj: state => state.demo.deviceLogObj,
}
export default getters
