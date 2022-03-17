import Layout from '@/layout'

export const routerList = [
  {
    path: '/workOrder',
    component: Layout,
    meta: {
      title: '工单中心',
      icon: 'icon-chanpinPIguanli-01'
    },
    children: [
      {
        path: '/workOrder/create',
        component: () => import('@/views/WorkOrder/Update'),
        name: 'WorkOrderCreate',
        meta: { title: '新建工单', affix: false }
      },
      {
        path: '/workOrder/assign',
        component: () => import('@/views/WorkOrder/Assign'),
        name: 'WorkOrderAssign',
        meta: { title: '指派工单', affix: false }
      },
      {
        path: '/workOrder/detail/:id',
        component: () => import('@/views/WorkOrder/Detail'),
        name: 'WorkOrderDetail',
        hidden: true,
        meta: { title: '工单详情', affix: false }
      }
    ]
  }
]
