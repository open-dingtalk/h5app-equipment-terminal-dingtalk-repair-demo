import Layout from '@/layout'

export const routerList = [
  {
    path: '/devices',
    component: Layout,
    meta: {
      title: '设备管理',
      icon: 'icon-chanpinPIguanli-01'
    },
    children: [
      {
        path: '/devices/list',
        component: () => import('@/views/Device/Index'),
        name: 'deviceList',
        meta: { title: '设备列表', affix: false }
      },
      {
        path: '/devices/detail/:id',
        component: () => import('@/views/Device/Detail'),
        name: 'deviceDetail',
        hidden: true,
        meta: { title: '设备详情', affix: false }
      },
    ]
  }
]
