export type UserCategory = 'official' | 'manufacturer' | 'retailer' | 'consumer';

export interface CategoryMeta {
  id: UserCategory;
  title: string;
  badge: string;
  description: string;
  roleDescription: string;
  hasGeneratedUsername: boolean;
  usernamePrefix?: string;
  identifierLabel: string;
  identifierPlaceholder: string;
}

export interface UserSession {
  category: UserCategory;
  name: string;
  identifier: string; // username (e.g. OFF-48291) or email/phone for consumer
  organization?: string;
  email?: string;
  phone?: string;
  loginTime: string;
}

export interface RegistrationResult {
  success: boolean;
  username?: string;
  message?: string;
}

export interface OfficialRegisterData {
  fullName: string;
  organization: string;
  officialEmail: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface ManufacturerRegisterData {
  companyName: string;
  authorizedPerson: string;
  businessEmail: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface RetailerRegisterData {
  businessName: string;
  authorizedPerson: string;
  businessEmail: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface ConsumerRegisterData {
  name: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
}

export type InspectionMethod = 'camera' | 'upload' | 'barcode';

export interface InspectionData {
  method: InspectionMethod;
  timestamp: string;
  imagePreview?: string;
  fileName?: string;
  barcode?: string;
  commodityName: string;
  brandName: string;
  netQuantity: string;
  mrp: string;
  mfgDate: string;
  mfrNameAddress: string;
  consumerCareDetails: string;
  countryOfOrigin: string;
  complianceScore: number;
}
