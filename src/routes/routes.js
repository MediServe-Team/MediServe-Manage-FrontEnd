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
import { ProductCreate, ProductUpdate } from '../features/product/pages';

import { Dose } from '../features/dose/pages';

import { Category } from '../features/category/pages';

import { Account, AccountCustomer, AccountStaff, ManageAccount } from '../features/account/pages';

// Bill
import { Bill } from '../features/selling/pages';
import { BillCreate } from '../features/selling/pages';
import { Profile } from '../features/profile/pages';
import { AddProduct, AddMedicine, AddDose, AddAvailableDose } from '../features/selling/pages/TabsBillCreate';
import { BillDetail } from '../features/selling/pages';

const publicRouters = [{ path: routes.login, component: Login, layout: null }];

const privateRouters = [
  { path: routes.dashboard, component: Dashboard },
  //* stocks
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
  //* medicines
  { path: routes.medicineCreate, component: MedicineCreate },
  { path: routes.medicineManage, component: Medicine },
  //* products
  { path: routes.productManage, component: Product },
  { path: routes.productCreate, component: ProductCreate },
  { path: routes.productUpdate, component: ProductUpdate },
  { path: routes.doseManage, component: Dose },
  { path: routes.categoryManage, component: Category },
  { path: routes.accountManage, component: ManageAccount },
  //* bills
  { path: routes.billManage, component: Bill },
  {
    path: routes.billCreate,
    component: BillCreate,
    children: [
      { path: 'product', component: AddProduct },
      { path: 'medicine', component: AddMedicine },
      { path: 'new-dose', component: AddDose },
      { path: 'available-dose', component: AddAvailableDose },
    ],
  },
  { path: routes.billDetail, component: BillDetail },

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
