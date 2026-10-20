export type BaseModalProps = {
  closeModal: () => void;
  data?: unknown;
};

export type {
  SelectUserAndGroupsModalData,
  SelectUserItem,
  SelectGroupItem,
} from '../components/selectUserAndGroups/types'

import type { SelectUserAndGroupsModalData } from '../components/selectUserAndGroups/types'

export type SelectUserAndGroupsModalProps = {
  closeModal: () => void;
  data?: SelectUserAndGroupsModalData | null;
};

export type AddEmployeeModalData = SelectUserAndGroupsModalData

export type AddEmployeeModalProps = {
  closeModal: () => void;
  data?: AddEmployeeModalData | null;
};

export type { TableHeaderItem, TableSettingsModalData } from '../components/tableSettings/types'

export type {
  LocationGoodsModalData,
  LocationGoodsRowData,
} from '../components/locationGoods/types'

export type {
  SelectBasedOnRoleModalData,
  SelectRoleItem,
} from '../components/selectBasedOnRole/types'

export type {
  SelectAnnouncementUserItem,
  SelectUsersModalData,
} from '../components/selectUsers/types'

export type TableSettingsModalProps = {
  closeModal: () => void;
  data?: import('../components/tableSettings/types').TableSettingsModalData | null;
};

export const ModalTypes = {
  // ADDED_TO_CART: "ADDED_TO_CART",
  // LOGOUT: "LOGOUT",
  DEPARTMENT_SETTINGS: "DEPARTMENT_SETTINGS",
  GROUP_SETTINGS: "GROUP_SETTINGS",
  INVENTORY_SETTINGS: "INVENTORY_SETTINGS",
  SELECT_USER_AND_GROUPS: "SELECT_USER_AND_GROUPS",
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  DELETE_PERMISSION: "DELETE_PERMISSION",
  CONFIRM_ACCESS: "CONFIRM_ACCESS",
  TABLE_SETTINGS: "TABLE_SETTINGS",
  LOCATION_GOODS: "LOCATION_GOODS",
  SELL_INVOICE: "SELL_INVOICE",
  EDIT_CUSTOMER: "EDIT_CUSTOMER",
  CHANGE_CUSTOMER_LEVEL: "CHANGE_CUSTOMER_LEVEL",
  CUSTOMER_CHANGE_CREDIT: "CUSTOMER_CHANGE_CREDIT",
  NEW_CREDIT: "NEW_CREDIT",
  ADD_CUSTOMER: "ADD_CUSTOMER",
  ADD_CUSTOMER_DOCUMENTS: "ADD_CUSTOMER_DOCUMENTS",
  ADD_CUSTOMER_GUARANTEE: "ADD_CUSTOMER_GUARANTEE",
  ADD_NEW_FAQ: "ADD_NEW_FAQ",
  ADD_BANNER: "ADD_BANNER",
  ADD_BRAND: "ADD_BRAND",
  ADD_PRODUCT_BY_CATEGORY: "ADD_PRODUCT_BY_CATEGORY",
  ADD_PRODUCT: "ADD_PRODUCT",
  CATEGORY_DETAIL: "CATEGORY_DETAIL",
  CHANGE_WAREHOUSE_GRADE: "CHANGE_WAREHOUSE_GRADE",
  INVENTORY_PRODUCTS: "INVENTORY_PRODUCTS",
  GOOD_ENTRY_DETAILS: "GOOD_ENTRY_DETAILS",
  PRODUCT_DETAILS: "PRODUCT_DETAILS",
  BRANCH_ALLOWANCE: "BRANCH_ALLOWANCE",
  ALLOWED_PRODUCTS: "ALLOWED_PRODUCTS",
  POS_BRANCH_DETAILS: "POS_BRANCH_DETAILS",
  RELATED_WAREHOUSES: "RELATED_WAREHOUSES",
  SIZE_GUIDNESS: "SIZE_GUIDNESS",
  NOTIF_AVAILABLE_PRODUCT: "NOTIF_AVAILABLE_PRODUCT",
  EXCEL_OUTPUT: "EXCEL_OUTPUT",
  SELECT_BASED_ON_ROLE: "SELECT_BASED_ON_ROLE",
  SELECT_USERS: "SELECT_USERS",
  NEW_COLLEAGUE_MESSAGE: "NEW_COLLEAGUE_MESSAGE",
  ADD_UNIT: "ADD_UNIT",
} as const;

export type ModalType = (typeof ModalTypes)[keyof typeof ModalTypes];