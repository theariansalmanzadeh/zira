'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@components/ui/Dialog';
import { useModalStore } from '@shared/store/modal-store';
import { ModalTypes, type ModalType } from './types';
import type { BaseModalProps } from './types';

const DepartmentSetting = dynamic(
  () => import('./components/departmentSetting').then((mod) => mod.DepartmentSetting),
  { ssr: false }
);
const GroupSetting = dynamic(
  () => import('./components/groupSetting').then((mod) => mod.GroupSetting),
  { ssr: false }
);
const InventorySettings = dynamic(
  () => import('./components/inventorySettings').then((mod) => mod.InventorySettings),
  { ssr: false }
);
const SelectUserAndGroups = dynamic(
  () => import('./components/selectUserAndGroups/SelectUserAndGroups'),
  { ssr: false }
);
const DeletePermission = dynamic(
  () => import('./components/DeletePermission'),
  { ssr: false }
);
const ConfirmAccess = dynamic(
  () => import('./components/ConfirmAccess'),
  { ssr: false }
);
const TableSettings = dynamic(
  () => import('./components/tableSettings').then((mod) => mod.TableSettings),
  { ssr: false }
);
const LocationGoods = dynamic(
  () => import('./components/locationGoods').then((mod) => mod.LocationGoods),
  { ssr: false }
);
const SellInvoice = dynamic(
  () => import('./components/sellInvoice').then((mod) => mod.SellInvoice),
  { ssr: false }
);
const EditCustomer = dynamic(
  () => import('./components/EditCustomer'),
  { ssr: false }
);
const ChangeCustomerLevel = dynamic(
  () => import('./components/ChangeCustomerLevel'),
  { ssr: false }
);
const CustomerChangeCredit = dynamic(
  () => import('./components/CustomerChangeCredit'),
  { ssr: false }
);
const AddCustomer = dynamic(
  () => import('./components/addCustomer/AddCustomer'),
  { ssr: false }
);
const AddCustomerDocuments = dynamic(
  () => import('./components/addCustomerDocuments/AddCustomerDocuments'),
  { ssr: false }
);
const AddCustomerGuarantee = dynamic(
  () => import('./components/addCustomerGuarantee/AddCustomerGuarantee'),
  { ssr: false }
);
const AddNewFaq = dynamic(
  () => import('./components/addNewFaq'),
  { ssr: false }
);
const AddAndEditBanner = dynamic(
  () => import('./components/addBanner'),
  { ssr: false }
);
const AddAndEditBrand = dynamic(
  () => import('./components/addBrand'),
  { ssr: false }
);
const AddProductByCategory = dynamic(
  () => import('./components/addProductByCategory'),
  { ssr: false }
);
const AddProduct = dynamic(
  () => import('./components/addProduct'),
  { ssr: false }
);
const CategoryDetail = dynamic(
  () => import('./components/CategoryDetail'),
  { ssr: false }
);
const ChangeWarehouseGrade = dynamic(
  () => import('./components/ChangeWarehouseGrade'),
  { ssr: false }
);
const InventoryProducts = dynamic(
  () =>
    import('./components/inventoryProducts').then(
      (mod) => mod.InventoryProducts
    ),
  { ssr: false }
);
const GoodEntryDetails = dynamic(
  () => import('./components/GoodEntryDetails'),
  { ssr: false }
);
const ProductDetails = dynamic(
  () => import('./components/ProductDetails'),
  { ssr: false }
);
const BranchAllowance = dynamic(
  () => import('./components/branchAllowance'),
  { ssr: false }
);
const AllowedProducts = dynamic(
  () => import('./components/allowedProducts'),
  { ssr: false }
);
const PosBranchDetails = dynamic(
  () => import('./components/posBranchDetails'),
  { ssr: false }
);
const RelatedWarehouses = dynamic(
  () => import('./components/relatedWarehouses'),
  { ssr: false }
);
const SizeGuidness = dynamic(
  () => import('./components/sizeGuidness'),
  { ssr: false }
);
const NotifAvailableProduct = dynamic(
  () => import('./components/NotifAvailableProduct'),
  { ssr: false }
);
const ExcelOutput = dynamic(
  () => import('./components/ExcelOutput'),
  { ssr: false }
);
const SelectBasedOnRole = dynamic(
  () => import('./components/selectBasedOnRole'),
  { ssr: false }
);
const SelectUsers = dynamic(
  () => import('./components/selectUsers'),
  { ssr: false }
);

const MODAL_COMPONENTS: Record<
  ModalType,
  React.ComponentType<BaseModalProps>
> = {
  [ModalTypes.DELETE_PERMISSION]: DeletePermission,
  [ModalTypes.CONFIRM_ACCESS]: ConfirmAccess,
  [ModalTypes.DEPARTMENT_SETTINGS]: DepartmentSetting,
  [ModalTypes.GROUP_SETTINGS]: GroupSetting,
  [ModalTypes.INVENTORY_SETTINGS]: InventorySettings,
  [ModalTypes.SELECT_USER_AND_GROUPS]: SelectUserAndGroups,
  [ModalTypes.ADD_EMPLOYEE]: SelectUserAndGroups,
  [ModalTypes.TABLE_SETTINGS]: TableSettings,
  [ModalTypes.LOCATION_GOODS]: LocationGoods,
  [ModalTypes.SELL_INVOICE]: SellInvoice,
  [ModalTypes.EDIT_CUSTOMER]: EditCustomer,
  [ModalTypes.CHANGE_CUSTOMER_LEVEL]: ChangeCustomerLevel,
  [ModalTypes.CUSTOMER_CHANGE_CREDIT]: CustomerChangeCredit,
  [ModalTypes.ADD_CUSTOMER]: AddCustomer,
  [ModalTypes.ADD_CUSTOMER_DOCUMENTS]: AddCustomerDocuments,
  [ModalTypes.ADD_CUSTOMER_GUARANTEE]: AddCustomerGuarantee,
  [ModalTypes.ADD_NEW_FAQ]: AddNewFaq,
  [ModalTypes.ADD_BANNER]: AddAndEditBanner,
  [ModalTypes.ADD_BRAND]: AddAndEditBrand,
  [ModalTypes.ADD_PRODUCT_BY_CATEGORY]: AddProductByCategory,
  [ModalTypes.ADD_PRODUCT]: AddProduct,
  [ModalTypes.CATEGORY_DETAIL]: CategoryDetail,
  [ModalTypes.CHANGE_WAREHOUSE_GRADE]: ChangeWarehouseGrade,
  [ModalTypes.INVENTORY_PRODUCTS]: InventoryProducts,
  [ModalTypes.GOOD_ENTRY_DETAILS]: GoodEntryDetails,
  [ModalTypes.PRODUCT_DETAILS]: ProductDetails,
  [ModalTypes.BRANCH_ALLOWANCE]: BranchAllowance,
  [ModalTypes.ALLOWED_PRODUCTS]: AllowedProducts,
  [ModalTypes.POS_BRANCH_DETAILS]: PosBranchDetails,
  [ModalTypes.RELATED_WAREHOUSES]: RelatedWarehouses,
  [ModalTypes.SIZE_GUIDNESS]: SizeGuidness,
  [ModalTypes.NOTIF_AVAILABLE_PRODUCT]: NotifAvailableProduct,
  [ModalTypes.EXCEL_OUTPUT]: ExcelOutput,
  [ModalTypes.SELECT_BASED_ON_ROLE]: SelectBasedOnRole,
  [ModalTypes.SELECT_USERS]: SelectUsers,
};

const MODAL_CONFIG: Record<
  ModalType,
  {
    title?: string
    description?: string
    showCloseButton: boolean
    className?: string
  }
> = {

  [ModalTypes.DELETE_PERMISSION]: {
    title: 'حذف دپارتمان',
    showCloseButton: true,
    className: 'max-h-[90vh]  w-full min-w-[722px] max-w-[722px] overflow-y-auto border-0 sm:max-w-[722px]',
  },
  [ModalTypes.CONFIRM_ACCESS]: {
    title: 'دسترسی‌های نقش',
    showCloseButton: true,
    className: 'max-h-[90vh] max-w-full overflow-y-auto border-0 sm:max-w-[640px]',
  },
  [ModalTypes.DEPARTMENT_SETTINGS]: {
    title: 'تنظیمات',
    showCloseButton: true,
    className: 'max-h-[90vh] max-w-full overflow-y-auto border-0 sm:max-w-[900px]',
  },
  [ModalTypes.GROUP_SETTINGS]: {
    title: 'تنظیمات',
    showCloseButton: true,
    className: 'max-h-[90vh] max-w-full overflow-y-auto border-0 sm:max-w-[900px]',
  },
  [ModalTypes.INVENTORY_SETTINGS]: {
    title: 'تنظیمات',
    showCloseButton: true,
    className: 'max-h-[90vh] max-w-full overflow-y-auto border-0 sm:max-w-[900px]',
  },
  [ModalTypes.SELECT_USER_AND_GROUPS]: {
    title: 'انتخاب کارشناسان',
    showCloseButton: true,
    className: 'max-h-[90vh] max-w-full overflow-y-auto border-0 sm:max-w-[900px]',
  },
  [ModalTypes.ADD_EMPLOYEE]: {
    title: 'افزودن کارمند',
    showCloseButton: true,
    className: 'max-h-[90vh] max-w-full overflow-y-auto border-0 sm:max-w-[900px]',
  },
  [ModalTypes.TABLE_SETTINGS]: {
    showCloseButton: true,
    className: 'max-h-[90vh] max-w-full overflow-y-auto border-0 sm:max-w-[700px]',
  },
  [ModalTypes.LOCATION_GOODS]: {
    showCloseButton: true,
    className:
      'max-h-[90vh] w-[1270px]! min-w-[1270px]! max-w-[1270px]! overflow-y-auto border-0 sm:max-w-[1270px]!',
  },
  [ModalTypes.SELL_INVOICE]: {
    title: 'فاکتور فروش',
    showCloseButton: true,
    className:
      'max-h-[90vh] w-full min-w-[720px] max-w-[820px] overflow-y-auto border-0 sm:max-w-[920px]',
  },
  [ModalTypes.EDIT_CUSTOMER]: {
    title: 'ویرایش پروفایل',
    showCloseButton: true,
    className:
      'max-h-[90vh] w-full min-w-[640px] max-w-[720px] overflow-y-auto border-0 sm:max-w-[720px]',
  },
  [ModalTypes.CHANGE_CUSTOMER_LEVEL]: {
    title: 'تغییر سطح کاربر',
    showCloseButton: true,
    className:
      'min-w-[480px]! max-h-[90vh] w-full max-w-[520px]! overflow-y-auto border-0 sm:max-w-[520px]!',
  },
  [ModalTypes.CUSTOMER_CHANGE_CREDIT]: {
    title: 'تغییر اعتبار کاربر',
    showCloseButton: true,
    className:
      'min-w-[480px]! max-h-[90vh] w-full max-w-[520px]! overflow-y-auto border-0 sm:max-w-[520px]!',
  },
  [ModalTypes.ADD_CUSTOMER]: {
    title: 'افزودن کاربر',
    showCloseButton: true,
    className:
      'min-w-[1060px]! max-h-[90vh] w-full max-w-[1060px]! overflow-y-auto border-0 sm:max-w-[1060px]!',
  },
  [ModalTypes.ADD_CUSTOMER_DOCUMENTS]: {
    title: 'افزودن مدرک',
    showCloseButton: true,
    className:
      'min-w-[520px]! max-h-[90vh] w-full max-w-[560px]! overflow-y-auto border-0 sm:max-w-[560px]!',
  },
  [ModalTypes.ADD_CUSTOMER_GUARANTEE]: {
    title: 'افزودن ضمانت',
    showCloseButton: true,
    className:
      'min-w-[640px]! max-h-[90vh] w-full max-w-[760px]! overflow-y-auto border-0 sm:max-w-[760px]!',
  },
  [ModalTypes.ADD_NEW_FAQ]: {
    title: 'ثبت سوال جدید',
    showCloseButton: true,
    className:
      'min-w-[540px]! max-h-[90vh] w-full max-w-[540px]! overflow-y-auto border-0 sm:max-w-[540px]!',
  },
  [ModalTypes.ADD_BANNER]: {
    title: 'افزودن بنر',
    showCloseButton: true,
    className:
      'min-w-[640px]! max-h-[90vh] w-full max-w-[720px]! overflow-y-auto border-0 sm:max-w-[720px]!',
  },
  [ModalTypes.ADD_BRAND]: {
    title: 'افزودن برند',
    showCloseButton: true,
    className:
      'min-w-[640px]! max-h-[90vh] w-full max-w-[720px]! overflow-y-auto border-0 sm:max-w-[720px]!',
  },
  [ModalTypes.ADD_PRODUCT_BY_CATEGORY]: {
    title: 'افزودن کالا بر اساس دسته‌بندی',
    showCloseButton: true,
    className:
      'min-h-[60%]! min-w-[720px]! max-h-[90vh] w-full max-w-[840px]! overflow-y-auto border-0 sm:max-w-[840px]!',
  },
  [ModalTypes.ADD_PRODUCT]: {
    title: 'افزودن محصول',
    showCloseButton: true,
    className:
      'min-w-[1060px]! max-h-[90vh] w-full max-w-[1060px]! overflow-y-auto border-0 sm:max-w-[1060px]!',
  },
  [ModalTypes.CATEGORY_DETAIL]: {
    showCloseButton: true,
    className:
      'min-w-[720px]! max-h-[90vh] w-full max-w-[780px]! overflow-y-auto border-0 sm:max-w-[780px]!',
  },
  [ModalTypes.CHANGE_WAREHOUSE_GRADE]: {
    showCloseButton: true,
    className:
      'min-w-[640px]! max-h-[90vh] w-full max-w-[720px]! overflow-y-auto border-0 sm:max-w-[720px]!',
  },
  [ModalTypes.INVENTORY_PRODUCTS]: {
    title: 'انتخاب از موجودی انبار',
    showCloseButton: true,
    className:
      'min-w-[1200px]! max-h-[90vh] w-full max-w-[1200px]! overflow-y-auto border-0 sm:max-w-[1200px]!',
  },
  [ModalTypes.GOOD_ENTRY_DETAILS]: {
    title: 'جزئیات ورود کالا',
    showCloseButton: true,
    className:
      'min-w-[720px]! max-h-[90vh] w-full max-w-[780px]! overflow-y-auto border-0 sm:max-w-[780px]!',
  },
  [ModalTypes.PRODUCT_DETAILS]: {
    title: 'مشخصات کالا',
    showCloseButton: true,
    className:
      'min-w-[640px]! max-h-[90vh] w-full max-w-[720px]! overflow-y-auto border-0 sm:max-w-[720px]!',
  },
  [ModalTypes.BRANCH_ALLOWANCE]: {
    title: 'مجوزهای شعبه',
    showCloseButton: true,
    className:
      'min-w-[520px]! max-h-[90vh] w-full max-w-[560px]! overflow-y-auto border-0 sm:max-w-[560px]!',
  },
  [ModalTypes.ALLOWED_PRODUCTS]: {
    title: 'کالاهای مجاز',
    showCloseButton: true,
    className:
      'min-w-[1060px]! max-h-[90vh] w-full max-w-[1060px]! overflow-y-auto border-0 sm:max-w-[1060px]!',
  },
  [ModalTypes.POS_BRANCH_DETAILS]: {
    title: 'دستگاه‌های POS',
    showCloseButton: true,
    className:
      'min-w-[1180px]! max-h-[90vh] w-full max-w-[1180px]! overflow-y-auto border-0 sm:max-w-[1180px]!',
  },
  [ModalTypes.RELATED_WAREHOUSES]: {
    title: 'انبارهای مربوطه',
    showCloseButton: true,
    className:
      'min-w-[1180px]! max-h-[90vh] w-full max-w-[1180px]! overflow-y-auto border-0 sm:max-w-[1180px]!',
  },
  [ModalTypes.SIZE_GUIDNESS]: {
    title: '',
    showCloseButton: false,
    className:
      'min-w-0! max-h-[90vh] w-full max-w-[720px]! overflow-y-auto border-0 px-5 py-6 sm:max-w-[720px]!',
  },
  [ModalTypes.NOTIF_AVAILABLE_PRODUCT]: {
    title: 'اطلاع‌رسانی موجودی',
    showCloseButton: true,
    className:
      'min-w-0! max-h-[90vh] w-full max-w-[420px]! overflow-y-auto border-0 sm:max-w-[420px]!',
  },
  [ModalTypes.EXCEL_OUTPUT]: {
    title: 'خروجی اکسل',
    showCloseButton: true,
    className:
      'min-w-0! max-h-[90vh] w-full max-w-[640px]! overflow-y-auto border-0 sm:max-w-[640px]!',
  },
  [ModalTypes.SELECT_BASED_ON_ROLE]: {
    showCloseButton: false,
    className:
      'min-w-0! max-h-[90vh] w-full max-w-[560px]! overflow-y-auto border-0 sm:max-w-[560px]!',
  },
  [ModalTypes.SELECT_USERS]: {
    title: 'انتخاب کاربران منتخب',
    description:
      'فقط کاربران سیستمی (کارمند و مدیر ارشد) در این فهرست هستند.',
    showCloseButton: true,
    className:
      'min-w-0! max-h-[90vh] w-full max-w-[720px]! overflow-y-auto border-0 sm:max-w-[720px]!',
  },
};

const Modal = () => {
  const activeModal = useModalStore((state) => state.activeModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const data = useModalStore((state) => state.data);
  const isOpen = activeModal !== null;
  const ModalComponent = activeModal ? MODAL_COMPONENTS[activeModal] : null;
  const modalConfig = activeModal ? MODAL_CONFIG[activeModal] : null;

  if (!ModalComponent || !activeModal || !modalConfig) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogContent
        dir='rtl'
        showCloseButton={modalConfig.showCloseButton}
        className={`min-w-240.5 w-full px-6 py-4.5 rounded-card-lg! ${modalConfig.className ?? ''}`}
        onEscapeKeyDown={closeModal}
      >
        {modalConfig.title && (
          <DialogTitle>
            {activeModal === ModalTypes.ADD_NEW_FAQ &&
              (data as { id?: string } | null)?.id
              ? 'ویرایش سوال'
              : modalConfig.title}
          </DialogTitle>
        )}
        {modalConfig.description && (
          <DialogDescription>{modalConfig.description}</DialogDescription>
        )}
        <ModalComponent closeModal={closeModal} data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
