export default [
  // app
  {
    path: '',
    component: '../layouts',
    routes: [
      {
        path: '/',
        name: '',
        component: './Home',
      },
      {
        path: '/GPT',
        name: '',
        component: './Unity',
      },
      {
        path: '/chatgpt',
        name: '',
        component: './ChatGPT',
      },
    ],
  },
];
