type User = {
  name: string;
  email: string;
  photo: string;
};

interface UserState {
  user: User;
  updateUserState: (user: UserModel) => void;
}

type Inputs = {
  email: string;
  password: string;
};
type ForgotPasswordInputs = {
  registerEmail: string;
};
type TSaleModel = {
  id?: number;
  customerName: string;
  gstNo: string;
  address: string;
  contactPerson: string;
  contactDetail: string;
};

interface GSTDropDownOption {
  label: string;
  value: string;
  percentage: string;
}
interface DropDownCustomerOption {
  label: string;
  value: string;
  state?:string;
  address?:string;
  pincode?:string;
  gstnNo?:string;
  mobile?:string;
}
type SaleFormModel = {
  invoiceNumber: string;
  date: string;
  shipTo: DropDownCustomerOption;
  billTo: DropDownCustomerOption;
  itemArray?: InvoiceItem[]; // Optional array
  labourCharges?: number | null; // Optional and can be null
  freightCharges?: number | null; // Optional and can be null
  subTotal?: number | null; // Optional and can be null
  gst: GSTDropDownOption; // Ensure that gst is either a valid DropDownOption or null
  total: number | null;
  taxAmount?: number | null;
  totalAmount?: number | null;
};

interface InvoiceItem {
  item: DropDownOption;
  unit: DropDownOption;
  qty: number;
  hsnCode?: string;
  unitPrice: number;
  discount?: number; // Optional and can be null
  total: number;
}
type SaleIndexModel = {
  id: number;
  invoiceNumber: string;
  date: string;
  billToName?: string;
  taxAmount?: number | null;
  totalAmount?: number | null;
};
type DropDownOption = {
  label: string;
  value: string;
};
type TFilterModel = {
  id?: number;
  totalRows: number;
  pageSize: number;
  currentPage: number;
  searchText: string;
  filterRowsCount: number;
  orderType: string;
  orderBy: string;
  fromDate?: Date;
  toDate?: Date;
};
type TDropdownOption = {
  key?: string | number;
  value: any;
  text?: string;
  data?: any;
  icon?: any;
  label: string;
  paramUniqueId?: string;
};

type TCheckPrevilege = {
  id: number;
  menuid: number;
  privilegeId: number;
  privilegeName: string;
  roleId: number;
  privilegeUniqueId: string;
};

type TScreen = {
  width: number;
  height: number;
};
type TFilterModel = {
  id?: number;
  totalRows: number;
  pageSize: number;
  currentPage: number;
  searchText: string;
  filterRowsCount: number;
  orderType: string;
  orderBy: string;
  fromDate?: Date;
  toDate?: Date;
};
type TCheckPrevilege = {
  id: number;
  menuid: number;
  privilegeId: number;
  privilegeName: string;
  roleId: number;
  privilegeUniqueId: string;
};
type TDropdownOption = {
  key?: string | number;
  value: any;
  text?: string;
  data?: any;
  icon?: any;
  label: string;
  paramUniqueId?: string;
};
type TScreen = {
  width: number;
  height: number;
};
type TResetModel = {
  newPassword: string;
  confirmPassword: string;
};

interface BankDetail {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
}

interface CompanyDetails {
  id?: number;
  companyName: string;
  group: Group;
  gstinNo: string;
  contactPersonName: string;
  address: string;
  country: DropDownOption;
  state: DropDownOption;
  registrationType: string;
  pincode: string;
  bankDetail: BankDetail;
}
type TItemsListodel = {
  id: number;
  productName: string;
  hsnCode: string;
  group: string;
  unit: string;
  price: string;
};
type ItemsModel = {
  id: number;
  productName: string;
  group: DropDownOption;
  unit: DropDownOption;
  description: string;
  hsnCode: string;
  price: string;
};
type TUserBankListodel = {
  id: number;
  bankName: string;
  branchName: string;
  accountNumber: string;
  address: string;
  ifscCode: string;
  initialAmount: string;
  currentAmount: string;
  accountType: string;
};

type UserBankModel = {
  id?: number;
  bankName: string;
  accountNumber: string;
  branchName: string;
  address: string;
  ifscCode: string;
  currentAmount: string;
  initialAmount: string;
  accountType: string;
};
type UnitsModel = {
  id?: number;
  unitName: string;
  shortCode: string;
};
type UnitListModel = {
  id: number;
  unitName: string;
  shortCode: string;
};
type GSTModel = {
  id?: number;
  gstName: string;
  shortCode: string;
  percentage: string;
};
type GSTListModel = {
  id: number;
  gstName: string;
  shortCode: string;
  percentage: string;
};
