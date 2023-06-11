const routes = {
  login: '/login',

  dashboard: '/',

  stockManage: '/stock',
  stockManageWithFistSubPage: '/stock/all',
  stockIntoManage: '/stock/into',
  historyStockManage: '/stock/history',
  stockIntoDetail: '/stock/invoice/:id',

  medicineManage: '/medicines',
  medicineManageWithFistSubPage: '/medicines/all',
  medicineCreate: '/medicines/add',

  productManage: '/products',
  productCreate: '/products/add',
  productManageWithFistSubPage: '/products/all',

  doseManage: '/doses',

  categoryManage: '/category',

  accountManage: '/accounts',

  billManage: '/bills',
  billCreate: '/bills/create',
  billCreateWithNoPrescription: '/bills/create/no-prescription',

  profile: '/profile',
};

export default routes;
