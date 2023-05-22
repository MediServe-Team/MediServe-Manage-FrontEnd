import routes from '../config/routes.js';

// Layouts
// import { DefaultLayout } from '../layouts';

// General Page
import Login from '../pages/Login.jsx';

// Private Page
import Dashboard from '../pages/Dashboard.jsx';

import { Stock } from '../features/stock/pages';
import { HistoryStock } from '../features/stock/pages';
import { StockInto } from '../features/stock/pages';

import { Medicine } from '../features/medicine/pages';
import { MedicineCreate } from '../features/medicine/pages';

import { Product } from '../features/product/pages';
import { ProductCreate } from '../features/product/pages';

import { Dose } from '../features/dose/pages';

import { Category } from '../features/category/pages';

import { Account } from '../features/account/pages';

import { Bill } from '../features/selling/pages';
import { BillCreate } from '../features/selling/pages';
import { Profile } from '../features/profile/pages';

const publicRouters = [{ path: routes.login, component: Login, layout: null }];

const privateRouters = [
  { path: routes.dashboard, component: Dashboard },
  { path: routes.stockManage, component: Stock },
  { path: routes.stockIntoManage, component: StockInto },
  { path: routes.historyStockManage, component: HistoryStock },
  { path: routes.medicineManage, component: Medicine },
  { path: routes.medicineCreate, component: MedicineCreate },
  { path: routes.productManage, component: Product },
  { path: routes.productCreate, component: ProductCreate },
  { path: routes.doseManage, component: Dose },
  { path: routes.categoryManage, component: Category },
  { path: routes.accountManage, component: Account },
  { path: routes.billManage, component: Bill },
  { path: routes.billCreate, component: BillCreate },
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
