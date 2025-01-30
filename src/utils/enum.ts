/**
 * Enum.ts
 * This component is used to define common variables that will be utilized throughout the project.
 */
// Enums for Widget Signature
export enum eWidgetSignature {
  VALUE_TYPE = 1,
  ANCHOR_TYPE = 2,
}

// Enums for Parameter Type
export enum eParameterType {
  INSTANTENOUSES = 1,
  INCREMENTAL = 2,
}
// Enums for Table Type
export enum eTableType {
  ROW = 1,
  COLUMN = 2,
}
// Enums for Tag IDs
export enum eTagId {
  TAG_1 = 1,
  TAG_2 = 2,
  TAG_3 = 3,
  TAG_4 = 4,
  TAG_5 = 5,
  TAG_6 = 6,
  TAG_7 = 7,
  TAG_8 = 8,
  TAG_9 = 9,
}
// Enums for Info IDs
export enum eInfoId {
  NAME = 1,
  DESCRIPTION = 4,
  VALUE = 2,
  UNIT = 3,
  AVG = 5,
  MAX = 6,
  MIN = 7,
  RANGE = 8,
  RANGEMIN = 9,
}

// Enums for Operation Types
export enum eOperationType {
  DIRECT = 1,
  BOOLEAN = 2,
  PERCENTAGE = 3,
  FORMULA = 4,
  EVENT = 5,
  CUSTOM = 6,
}
// Enums for Operation Types
export enum eDataNodeType {
  NONANIMATENODE = 1,
  ANIMATENODE = 2,
}
// Enums for Operation Types
export enum eEventPerformType {
  BOOLEAN = 1,
  CUSTOM = 2,
  DIRECT = 3,
}
// Enums for Operation Types
export enum eMimicNodeType {
  HTMLNODE = 1,
  SVGNODE = 2,
}
// Enums for Designer Property Tab
export enum eDesignerPropertyTab {
  WIDGET = 0,
  PROPERTY = 1,
}
// Constants for Input Lengths
export const INPUT_LENGTH = {
  PASSWORD_LENGTH: 50,
  EMAIL_LENGTH: 40,
  BASIC_LENGTH: 30,
  DISPLAY_LENGTH: 15,
  ADDRESS_LENGTH: 80,
  PINCODE_LENGTH: 10,
};
// Enums for Result Codes
export enum eResultCode {
  SUCCESS = 0,
  DB_ERROR = 1,
  NO_DATA_FOUND = 2,
  AUTHENTICATION_FAILED = 3,
  UNAUTHORIZED = 4,
  UNKNOWN = 5,
  INVALID_LOGIN_ID = 6,
  INVALID_PASSWORD = 7,
  SERVICE_ERROR = 8,
  INVALID_REQUEST = 9,
  NOT_FOUND = 10,
  NETWORK_ERRORSERVEERROR = 11,
  CREATED = 12,
  INTERNAL_SERVEERROR = 13,
  UNUSED = 14,
  MULTIPLE_RECORDS = 15,
  BAD_REQUEST = 16,
  R_DUPLICATE = 25,
}
// Enums for Designer Mode
export enum eDesignerMode {
  CONFIGURE = 1,
  CONFIGURE_PLAY = 2,
  RUNNING = 3,
}
// Enums for Fetch Policy
export enum eFetchPolicy {
  CACHE_FIRST = "cache-first",
  NETWORK_ONLY = "network-only",
  CACHE_ONLY = "cache-only",
  NO_CACHE = "no-cache",
  STANDBY = "standby",
  CACHE_AND_NETWORK = "cache-and-network",
}
// Enums for HTTP Status Codes
export enum eHTTPStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

// Enums for Parameter IDs
export enum eParameterId {
  UNITTYPE = 2,
  SCALEUNIT = 3,
  TARGETTYPE = 4,
  SIGNALTYPE = 5,
  SIGNALNAME = 6,
  PROFILE = 7,
  ACTIONSTATUS = 9,
  PAYLOADTYPE = 10,
  PRIORITY = 11,
  END_DEVICE_ASSET = 12,
  ACCOUNT_TYPE = 13,
  ACCOUNT_REMARK = 14,
  CURRENCY_VALUE = 15,
  TEMPERATURE_VALUE = 16,
}
// Enums for JSON Types
export enum eJsonType {
  DESIGNER = 1,
  MIMIC = 2,
}
// Enums for Group IDs
export enum eGroupId {
  ITEM_TYPE_GROUP_ID = 1,
  UNIT_GROUP_ID = 2,
  CATEGORY_TYPE_GROUP_ID = 3,
  SHELFLIFE_TYPE_GROUP_ID = 4,
  SUPERVISOR_ID = 13,
  DEFECT_TYPE_ID = 5,
  OUTPUT_SHEET = 6,
  APPLICATION_TYPE = 7,
  PRE_CLEANING_TYPE = 8,
  SURF_PREP_METHOD = 9,
  IMPREGNATION_TYPE = 10,
  PEEL_PLY = 11,
  PRODUCT_MIXING = 12,
}
// Enums for Group Unique IDs
export enum eGroupUniqueId {
  ITEM_TYPE_GROUP = "ITEMTYPE",
  ATTRIBUTETYPES = "ATTRIBUTETYPES",
  MANDATORYTYPES = "MANDATORYTYPES",
  UOMTYPES = "UOMTYPES",
  DATATYPES = "DATATYPES",
  TAGTYPES = "TAGTYPES",
  SUPERVISOR = "USERTYPE",
  STATUS = "WORKFLOWSTATUS",
  FREQUENCY = "FREQUENCY",
  SECTIONDEFECTTYPE = "SECTIONDEFECTTYPE",
  RESOLUTION = "RESOLUTION",
}
// Enums for Login Modes
export enum eLoginMode {
  PASSWORD = 1,
  OTP = 2,
}
// Enums for User Types
export enum eUserTypeId {
  ADMIN = "ADMIN",
}
// Enums for Status IDs
export enum eStatusId {
  DRAFT = 1,
  SUBMIT = 2,
  APPROVED = 3,
  REVERT = 4,
}
// Enums for Status Labels
export enum eStatus {
  DRAFT = "Draft",
  SUBMIT = "Submitted",
  APPROVED = "Approved",
  REVERT = "Revert",
}
// Enums for File Types
export enum eFileType {
  JPEG = ".jpeg",
  PNG = ".png",
  PDF = ".pdf",
  JPG = ".jpg",
}
// Enums for Content Types
export enum eContentType {
  IMAGE = "image/jpeg",
  PDF = "application/pdf",
  OCTETSTREAM = "application/octet-stream",
}
// Enums for Privileges
export enum ePrivileges {
  ADD_PRODUCT = "ADDPRODUCT",
  ADD_ROLE = "ADDROLE",
  EDIT_ROLE = "EDITROLE",
  DELETE_ROLE = "DELETEROLE",
  ADD_CONFIG_PARAM = "ADDCONFIGPARAM",
  EDIT_CONFIG_PARAM = "EDITCONFIGPARAM",
  EDIT_SUPERVISOR = "EDITSUPERVISOR",
  ADD_SUPERVISOR = "ADDSUPERVISOR",
  ADD_ADMIN = "ADDADMIN",
  EDIT_ADMIN = "EDITADMIN",
  DELETE_ADMIN = "DELETEADMIN",
  ADD_EMPLOYEE = "ADDEMPLOYEE",
  EDIT_EMPLOYEE = "EDITEMPLOYEE",
  DELETE_EMPLOYEE = "DELETEEMPLOYEE",
  DELETE_CONFIG_PARAM = "DELETECONFIGPARAM",
  ADD_CONFIG_GROUP = "ADDCONFIGGROUP",
  EDIT_CONFIG_GROUP = "EDITCONFIGGROUP",
  VIEW_DASHBOARD = "VIEWDASHBOARD",
  VIEW_AUDITOR = "VIEWAUDITOR",
  ADD_AUDITOR = "ADDAUDITOR",
  EDIT_AUDITOR = "EDITAUDITOR",
  DELETE_AUDITOR = "DELETEAUDITOR",
  ADD_PROCESS_TAG = "ADDPROCESSTAG",
  EDIT_PROCESS_TAG = "EDITPROCESSTAG",
  DELETE_PROCESS_TAG = "DELETEPROCESSTAG",
  ADD_LINES = "ADDLINES",
  EDIT_LINES = "EDITLINES",
  DELETE_LINES = "DELETELINES",
  ADD_AUDITS = "ADDAUDITS",
  EDIT_AUDITS = "EDITAUDITS",
  DELETE_AUDITS = "DELETEAUDITS",
  ADD_PLANT = "ADDPLANT",
  EDIT_PLANT = "EDITPLANT",
  DELETE_PLANT = "DELETEPLANT",
  ADD_CUSTOMERS = "ADDCUSTOMERS",
  EDIT_CUSTOMERS = "EDITCUSTOMERS",
  DELETE_CUSTOMERS = "DELETECUSTOMERS",
  ADD_SBU = "ADDSBU",
  EDIT_SBU = "EDITSBU",
  DELETE_SBU = "DELETESBU",
  ADD_COUNTRY = "ADDCOUNTRY",
  EDIT_COUNTRY = "EDITCOUNTRY",
  DELETE_COUNTRY = "DELETECOUNTRY",
  ADD_TEMPLATE_TAG = "ADDTEMPLATETAG",
  EDIT_TEMPLATE_TAG = "EDITTEMPLATETAG",
  DELETE_TEMPLATE_TAG = "DELETETEMPLATETAG",
  ADD_PROCESS = "ADDPROCESS",
  EDIT_PROCESS = "EDITPROCESS",
  DELETE_PROCESS = "DELETEPROCESS",
  ADD_AUDIT_TEMPLATE = "ADDAUDITTEMPLATE",
  EDIT_AUDIT_TEMPLATE = "EDITAUDITTEMPLATE",
  DELETE_AUDIT_TEMPLATE = "DELETEAUDITTEMPLATE",
  ADD_TEMPLATE_SECTION = "ADDTEMPLATESECTION",
  EDIT_TEMPLATE_SECTION = "EDITTEMPLATESECTION",
  DELETE_TEMPLATE_SECTION = "DELETETEMPLATESECTION",
  DELETE_CONFIG_GROUP = "DELETECONFIGGROUP",
  VIEW_COUNTRY = "VIEWCOUNTRY",
  VIEW_SUPERVISOR = "VIEWSUPERVISOR",
  DELETE_SUPERVISOR = "DELETESUPERVISOR",
  DELETE_PRODUCTION_ITEM = "DELETEPRODUCTIONITEM",
  DELETE_STOCK_ITEM = "DELETESTOCKITEM",
  ADD_HENKEL = "ADDHENKEL",
  EDIT_HENKEL = "EDITHENKEL",
  DELETE_HENKEL = "DELETEHENKEL",
  VIEW_HENKEL = "VIEWHENKEL",
  VIEW_LINES = "VIEWLINES",
  LINE_TICKET = "LINETICKET",
  LINE_CONSUMPTION = "LINECONSUMPTION",
  LINE_PRODUCTION = "LINEPRODUCTION",
  LINE_PARAMETER = "LINEPARAMETER",
  ADD_HOLIDAY = "ADDHOLIDAY",
  EDIT_HOLIDAY = "EDITHOLIDAY",
  DELETE_HOLIDAY = "DELETEHOLIDAY",
  VIEW_HOLIDAY = "VIEWHOLIDAY",
}
export enum eSearchType {
  All = "0",
  CustomerName = "1",
  ApplicatorName = "2",
  SupervisorName = "3",
  JCRRefNo = "4",
  PORef = "5",
  CertificateId = "6",
  StatusName = "7",
}

export enum eUserType {
  ADMIN = "ADMIN",
  SUPERVISOR = "SUPERVISOR",
}

export enum eCustomDropdownType {
  SCROLLER = "SCROLLER",
  BUTTON = "BUTTON",
}

export enum eLANGUAGE {
  ENGLISH = "en",
  FRENCH = "fr",
  HINDI = "hi",
}

export enum eWORKFLOWSTATUS {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  REVIEWED = "REVIEWED",
  APPROVED = "APPROVED",
}
export enum eType {
  SHIFT = "SHIFT",
  PRODUCT = "PRODUCT",
  CONSUMABLE = "CONSUMABLE",
}
