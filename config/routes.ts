export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ path: '/user/login', component: './user/Login' }] },
      { path: '/user', routes: [{ path: '/user/register', component: './user/register' }] },
      { component: './404' },
    ],
  },
  { path: '/welcome',name:'欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name:"管理页",
    icon: 'crown',
    access: 'canAdmin',   //判断权限是否通过,通过canadmin为true,可以进入惨admin查看判断详情
    component: './Admin',
    routes: [
      { path: '/user/user-manage',name:'用户管理', component: './Admin/UserManage' },
      { component: './404' },
    ],
  },
  {name: "表格查询", icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
