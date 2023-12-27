const routes = {
  login: '/login',

  dashboard: '/',

  stockManage: '/stock',
  stockManageWithFistSubPage: '/stock/all',
  stockIntoManage: '/stock/into',
  historyStockManage: '/stock/history',
  stockIntoDetail: '/stock/invoice/:id',

  medicineManage: '/medicines/:categoryId',
  medicineManageWithFistSubPage: '/medicines/all',
  medicineCreate: '/medicines/add',
  medicineUpdate: '/medicines/update/:medicineId',

  productManage: '/products/:categoryId',
  productCreate: '/products/add',
  productUpdate: '/products/update/:productId',
  productManageWithFistSubPage: '/products/all',

  doseManage: '/doses',

  categoryManage: '/category',

  accountManage: '/accounts',

  billManage: '/bills',
  billCreate: '/bills/create',
  billCreateWithFirstPage: '/bills/create/product',
  billDetail: '/bills/:id',

  profile: '/profile',

  checkin: '/checkin',
  timeKeeping: '/time-keeping',
  chat: '/chat',
  blog: '/blog',
  blogCreate: '/blog/create',
  blogUpdate: '/blog/update/:blogId',
};

export default routes;
