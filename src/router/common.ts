import layoutView from '../layout/index.vue';

export default [
  {
    path: '/complaints',
    name: '投诉管理',
    component: layoutView,
    redirect: '/complaints/list',
    children: [
      {
        path: 'list',
        name: '投诉列表',
        meta: { breadcrumb: [{ title: '投诉管理' }, { title: '投诉列表' }] },
        component: () => import('../pages/admin/complaints/list.vue'),
      },
    ],
  },
];
