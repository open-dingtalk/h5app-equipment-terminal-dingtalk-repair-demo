/*
 * @Author: huangyh
 * @Date: 2022-01-04 13:51:07
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-07 14:29:18
 */
// /biz/getDepartmentUserBasicInfo  获取部门用户基础信息  post请求，无参
// 今天 15:23

// /biz/sendWorkNotification 发送工作通知 post请求 参数 {"userIdList":"1,2,3","content":"发送的内容"}
const state = {
  orderList: [],
  assignPerson: [
    {
      id: 1,
      name: '张三',
      distance: '160.8km(三个月前)',
      phone: '13312345678',
      team: 'A团队',
      incompleteNum: 2,
      assign: true,
      coordination: false,
    },
    {
      id: 2,
      name: '李四',
      distance: '10.8km(一个月前)',
      phone: '18812345678',
      team: '同城维修',
      incompleteNum: 0,
      assign: true,
      coordination: false,
    },
    {
      id: 3,
      name: '王五',
      distance: '<3km',
      phone: '15912345678',
      team: 'A团队',
      incompleteNum: 4,
      assign: true,
      coordination: false,
    },
    {
      id: 4,
      name: '马六',
      distance: '-',
      phone: '16012345678',
      team: '同城维修',
      incompleteNum: 5,
      assign: true,
      coordination: false,
    },
  ],
  logObj: {},
  userInfo: {},
  corpId: '',
  agentId: '',
  // 设备列表
  //  state: 1:正常 2：检修中 3： 异常
  deviceList: [
    {
      name: 'PCB直线分割机',
      id: 'KtDZsWYHSd',
      state: 1,
      type: '分板机',
      position: '1栋厂房PCB生产部',
      contacts: '张先生',
      contactsNum: '133xxxxxxxx',
      imgs: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.smtcw.com%2Fuploadfile%2Fimage%2F20150513%2F2015051314150874874.jpg&refer=http%3A%2F%2Fwww.smtcw.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649216977&t=5bd693cca007b02110ad7afcbcf0faf7',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg007.hc360.cn%2Fm7%2FM0E%2F04%2F59%2FwKhQpFY1-W6Ef8uXAAAAACw2rxM620.jpg&refer=http%3A%2F%2Fimg007.hc360.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649217111&t=c32fbd0253b308df5e5097830fc97a46'
      ]
    },
    {
      name: 'PCB走板式分板机',
      id: 'MbgIZnXH31',
      state: 2,
      type: '分板机',
      position: '1栋厂房PCB生产部',
      contacts: '张先生',
      contactsNum: '133xxxxxxxx',
      imgs: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F142%2F226%2F4633622241_1917811968.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649217111&t=c0391ebf405e9a6dde2cca322759b5e0',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.99114.com%2Fgroup10%2FM00%2FB1%2F65%2FrBADs1n7SQmAD9SnAACzZXBanLM749.jpg&refer=http%3A%2F%2Fimg.99114.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649217111&t=da9f58624e7c80b56430ffcc8c960090'
      ]
    },
    {
      name: '半自动PCB分板机',
      id: 'FXIaofY05I',
      state: 3,
      type: '分板机',
      position: '1栋厂房PCB生产部',
      contacts: '张先生',
      contactsNum: '133xxxxxxxx',
      imgs: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN013l96HZ1DdxiTl1Feb_%21%213962120240-0-cib.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649217111&t=6d59a493e28fb3d251ed36e07c6a6c2a',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs10.sinaimg.cn%2Fmw690%2F004amwhjgy6DSl7gzvH89%26690&refer=http%3A%2F%2Fs10.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649217111&t=8f86e8cd3d5a79522d548afadfd80f8d'
      ]
    },
    {
      name: 'PCB激光分板机',
      id: 'iYpFcqFaNG',
      state: 1,
      type: '分板机',
      position: '1栋厂房PCB生产部',
      contacts: '张先生',
      contactsNum: '133xxxxxxxx',
      imgs: [
        'https://img1.baidu.com/it/u=1685176391,1536698431&fm=26&fmt=auto',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpro.img.51sole.com%2FproductImages3%2F20100324%2F20100324164033.jpg&refer=http%3A%2F%2Fpro.img.51sole.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649217111&t=8f3474ba3335dc867fac76ef2f075060'
      ]
    }
  ],
  deviceLogObj:{}
}
const mutations = {
  SET_CORPID: (state, data) => {
    state.corpId = data
  },
  SET_AGENTID: (state, data) => {
    state.agentId = data
  },
  SET_ORDERLIST: (state, orderList) => {
    state.orderList = orderList
  },
  PUSH_ORDERLIST: (state, orderItem) => {
    state.orderList.push(orderItem)
    saveData('orderList', state.orderList)
  },
  UPDATE_ORDERLIST: (state, orderItem) => {
    let index = state.orderList.findIndex((i) => i.id == orderItem.id)
    state.orderList.splice(index, 1, orderItem)
    saveData('orderList', state.orderList)
  },
  SET_LOGOBJ: (state, logObj) => {
    state.logObj = logObj
  },
  UPDATE_LOGOBJ: (state, logObj) => {
    if (state.logObj[logObj.orderId] != undefined) {
      state.logObj[logObj.orderId].push(logObj)
    } else {
      state.logObj[logObj.orderId] = []
      state.logObj[logObj.orderId].push(logObj)
    }
    saveData('logObj', state.logObj)
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_DEVICELIST: (state, deviceList) => {
    state.deviceList = deviceList;
  },
  UPDATE_DEVICELIST: (state, device) => {
    let index = state.deviceList.findIndex(i=> i.id == device.id);
    state.deviceList[index].state = device.state;
    saveData('deviceList', state.deviceList);
  },
  SET_DEVICELOGOBJ: (state, deviceLog) => {
    state.deviceLogObj = deviceLog
  },
  UPDATE_DEVICELOGOBJ: (state, deviceLog) => {
    if (state.deviceLogObj[deviceLog.deviceId] != undefined) {
      state.deviceLogObj[deviceLog.deviceId].push(deviceLog)
    } else {
      state.deviceLogObj[deviceLog.deviceId] = []
      state.deviceLogObj[deviceLog.deviceId].push(deviceLog)
    }
    saveData('deviceLogObj', state.deviceLogObj)
  },
}
const actions = {}
function saveData(type, data) {
  localStorage.setItem(type, JSON.stringify(data))
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
