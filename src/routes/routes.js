import routes from '../config/routes.js';

// Layouts
// import { DefaultLayout } from '../layouts';

// General Page
import Login from '../pages/Login.jsx';

// Private Page
import { Dashboard } from '../features/dashboard/pages';

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
import { MedicineCreate, MedicineUpdate } from '../features/medicine/pages';

import { Product } from '../features/product/pages';
import { ProductCreate, ProductUpdate } from '../features/product/pages';

import { Dose } from '../features/dose/pages';

import { Category } from '../features/category/pages';

import { ManageAccount } from '../features/account/pages';

// Bill
import { Bill } from '../features/selling/pages';
import { BillCreate } from '../features/selling/pages';
import { Profile } from '../features/profile/pages';
import { AddProduct, AddMedicine, AddDose, AddAvailableDose } from '../features/selling/pages/TabsBillCreate';
import { BillDetail } from '../features/selling/pages';

// Checkin
import { CheckinPage } from '../features/checkin/pages';
// Time keeping
import { TimeKeepingPage } from '../features/timeKeeping/pages';

// Blog
import { BlogManagePage, BlogCreatePage, BlogUpdatePage } from '../features/blog/pages';
import { AllPostPanel, PublicPostPanel, PrivatePostPanel } from '../features/blog/pages/subPages';

// Chat
import { ChatPage } from '../features/chat/pages';

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
  { path: routes.medicineUpdate, component: MedicineUpdate },
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

  // profile
  { path: routes.profile, component: Profile },

  // checkin
  { path: routes.checkin, component: CheckinPage },
  { path: routes.timeKeeping, component: TimeKeepingPage },

  // chat
  { path: routes.chat, component: ChatPage },

  // blog manage
  {
    path: routes.blog,
    component: BlogManagePage,
    children: [
      { path: 'all', component: AllPostPanel },
      { path: 'public', component: PublicPostPanel },
      { path: 'private', component: PrivatePostPanel },
    ],
  },
  { path: routes.blogCreate, component: BlogCreatePage },
  { path: routes.blogUpdate, component: BlogUpdatePage },
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
