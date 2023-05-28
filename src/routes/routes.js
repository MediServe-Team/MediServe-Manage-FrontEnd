import routes from '../config/routes.js';

// Layouts
// import { DefaultLayout } from '../layouts';

// General Page
import Login from '../pages/Login.jsx';

// Private Page
import Dashboard from '../pages/Dashboard.jsx';

// Stock
import { Stock } from '../features/stock/pages';
import { HistoryStock } from '../features/stock/pages';
import { StockInto } from '../features/stock/pages';
import { StockIntoDetail } from '../features/stock/pages';
// Sub in Stock inventory
import {
  AllProduct,
  PrepareOutOfProduct,
  PrepareExpiredProduct,
  ExpiredProduct,
} from '../features/stock/pages/inventoryStock';

import { Medicine } from '../features/medicine/pages';
import { MedicineCreate } from '../features/medicine/pages';

import { Product } from '../features/product/pages';
import { ProductCreate } from '../features/product/pages';

import { Dose } from '../features/dose/pages';

import { Category } from '../features/category/pages';

import { Account, AccountCustomer, AccountStaff, ManageAccount } from '../features/account/pages';

import { Bill } from '../features/selling/pages';
import { BillCreate } from '../features/selling/pages';
import { Profile } from '../features/profile/pages';
import { NoPrescription, Prescription, AvailableDose } from '../features/selling/pages/TabsBillCreate';

const publicRouters = [{ path: routes.login, component: Login, layout: null }];

const privateRouters = [
  { path: routes.dashboard, component: Dashboard },
  {
    path: routes.stockManage,
    component: Stock,
    children: [
      {
        path: 'all',
        component: AllProduct,
      },
      {
        path: 'prepare-out-of-stock',
        component: PrepareOutOfProduct,
      },
      {
        path: 'prepare-expired',
        component: PrepareExpiredProduct,
      },
      {
        path: 'expired',
        component: ExpiredProduct,
      },
    ],
  },
  { path: routes.stockIntoManage, component: StockInto },
  { path: routes.stockIntoDetail, component: StockIntoDetail },
  { path: routes.historyStockManage, component: HistoryStock },
  { path: routes.medicineManage, component: Medicine },
  { path: routes.medicineCreate, component: MedicineCreate },
  { path: routes.productManage, component: Product },
  { path: routes.productCreate, component: ProductCreate },
  { path: routes.doseManage, component: Dose },
  { path: routes.categoryManage, component: Category },
  { path: routes.accountManage, component: ManageAccount },
  { path: routes.billManage, component: Bill },
  {
    path: routes.billCreate,
    component: BillCreate,
    children: [
      { path: 'no-prescription', component: NoPrescription },
      { path: 'prescription', component: Prescription },
      { path: 'available-dose', component: AvailableDose },
    ],
  },
  { path: routes.profile, component: Profile },
];

export { publicRouters, privateRouters };

// stockManage
// stockIntoManage
// historyStockManage

// medicineManage
// medicineCreate

// productManage
// productCreate

// doseManage

// categoryManage

// accountManage

// billManage
// billCreate
