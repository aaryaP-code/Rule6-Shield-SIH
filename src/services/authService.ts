import {
  CategoryMeta,
  ConsumerRegisterData,
  ManufacturerRegisterData,
  OfficialRegisterData,
  RegistrationResult,
  RetailerRegisterData,
  UserCategory,
  UserSession,
} from '../types';

export const CATEGORIES: Record<UserCategory, CategoryMeta> = {
  official: {
    id: 'official',
    title: 'Inspection Official',
    badge: 'Compliance & Audit',
    description: 'Verify packaged commodities and conduct compliance inspections.',
    roleDescription: 'Legal Metrology Standards & Enforcement Cell',
    hasGeneratedUsername: true,
    usernamePrefix: 'OFF',
    identifierLabel: 'Username',
    identifierPlaceholder: 'e.g. OFF-48291',
  },
  manufacturer: {
    id: 'manufacturer',
    title: 'Manufacturer',
    badge: 'Packager & Producer',
    description: 'Check and maintain compliance across your products.',
    roleDescription: 'Brand Owners, Packers & Production Facilities',
    hasGeneratedUsername: true,
    usernamePrefix: 'MFR',
    identifierLabel: 'Username',
    identifierPlaceholder: 'e.g. MFR-73921',
  },
  retailer: {
    id: 'retailer',
    title: 'E-Commerce Retailer',
    badge: 'Marketplace & Platform',
    description: 'Verify packaged products before listing and selling.',
    roleDescription: 'Online Marketplaces, Quick-Commerce & Fulfillment Centers',
    hasGeneratedUsername: true,
    usernamePrefix: 'RTL',
    identifierLabel: 'Username',
    identifierPlaceholder: 'e.g. RTL-29481',
  },
  consumer: {
    id: 'consumer',
    title: 'Consumer',
    badge: 'Citizen & Buyer',
    description: 'Check packaged products and understand their compliance.',
    roleDescription: 'General Public, Consumers & Citizen Advocates',
    hasGeneratedUsername: false,
    identifierLabel: 'Email or Phone Number',
    identifierPlaceholder: 'e.g. name@example.com or 9876543210',
  },
};

interface StoredAccount {
  category: UserCategory;
  identifier: string; // username or email
  name: string;
  organization?: string;
  email?: string;
  phone?: string;
  password: string;
}

const STORAGE_ACCOUNTS_KEY = 'rule6_shield_accounts_v1';
const STORAGE_SESSION_KEY = 'rule6_shield_session_v1';
const STORAGE_LAST_REGISTERED = 'rule6_shield_last_reg_v1';

// Initial pre-seeded demo accounts
const INITIAL_DEMO_ACCOUNTS: StoredAccount[] = [
  {
    category: 'official',
    identifier: 'OFF-48291',
    name: 'Inspector Rajesh Varma',
    organization: 'Legal Metrology Dept., Central Zone',
    email: 'rajesh.varma@legalmetrology.gov.in',
    phone: '9810123456',
    password: 'password123',
  },
  {
    category: 'manufacturer',
    identifier: 'MFR-73921',
    name: 'Priya Sundaram',
    organization: 'Apex Foods & FMCG Ltd.',
    email: 'compliance@apexfmcg.com',
    phone: '9820123456',
    password: 'password123',
  },
  {
    category: 'retailer',
    identifier: 'RTL-29481',
    name: 'Anand Kulkarni',
    organization: 'BharatMart Retail Services Pvt Ltd',
    email: 'seller-verification@bharatmart.in',
    phone: '9830123456',
    password: 'password123',
  },
  {
    category: 'consumer',
    identifier: 'consumer@example.com',
    name: 'Deepak Sharma',
    organization: 'Independent Citizen',
    email: 'consumer@example.com',
    phone: '9840123456',
    password: 'password123',
  },
];

function getAccounts(): StoredAccount[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_ACCOUNTS_KEY);
    if (!raw) {
      sessionStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(INITIAL_DEMO_ACCOUNTS));
      return INITIAL_DEMO_ACCOUNTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_ACCOUNTS;
  }
}

function saveAccounts(accounts: StoredAccount[]): void {
  try {
    sessionStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save accounts in session storage', e);
  }
}

export function generateRandomCode(prefix: string): string {
  const digits = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${digits}`;
}

export const authService = {
  // Save last registered username to prefill login
  setLastRegistered(category: UserCategory, identifier: string) {
    try {
      sessionStorage.setItem(`${STORAGE_LAST_REGISTERED}_${category}`, identifier);
    } catch {}
  },

  getLastRegistered(category: UserCategory): string {
    try {
      return sessionStorage.getItem(`${STORAGE_LAST_REGISTERED}_${category}`) || '';
    } catch {
      return '';
    }
  },

  // Official Registration
  async registerOfficial(data: OfficialRegisterData): Promise<RegistrationResult> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const accounts = getAccounts();
    const username = generateRandomCode('OFF');

    const newAccount: StoredAccount = {
      category: 'official',
      identifier: username,
      name: data.fullName,
      organization: data.organization,
      email: data.officialEmail,
      phone: data.phoneNumber,
      password: data.password,
    };

    accounts.push(newAccount);
    saveAccounts(accounts);
    this.setLastRegistered('official', username);

    return {
      success: true,
      username,
      message: 'Official credentials registered successfully.',
    };
  },

  // Manufacturer Registration
  async registerManufacturer(data: ManufacturerRegisterData): Promise<RegistrationResult> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const accounts = getAccounts();
    const username = generateRandomCode('MFR');

    const newAccount: StoredAccount = {
      category: 'manufacturer',
      identifier: username,
      name: data.authorizedPerson,
      organization: data.companyName,
      email: data.businessEmail,
      phone: data.phoneNumber,
      password: data.password,
    };

    accounts.push(newAccount);
    saveAccounts(accounts);
    this.setLastRegistered('manufacturer', username);

    return {
      success: true,
      username,
      message: 'Manufacturer account created successfully.',
    };
  },

  // Retailer Registration
  async registerRetailer(data: RetailerRegisterData): Promise<RegistrationResult> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const accounts = getAccounts();
    const username = generateRandomCode('RTL');

    const newAccount: StoredAccount = {
      category: 'retailer',
      identifier: username,
      name: data.authorizedPerson,
      organization: data.businessName,
      email: data.businessEmail,
      phone: data.phoneNumber,
      password: data.password,
    };

    accounts.push(newAccount);
    saveAccounts(accounts);
    this.setLastRegistered('retailer', username);

    return {
      success: true,
      username,
      message: 'E-Commerce Retailer account created successfully.',
    };
  },

  // Consumer Registration
  async registerConsumer(data: ConsumerRegisterData): Promise<RegistrationResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const accounts = getAccounts();
    const identifier = data.emailOrPhone.trim();

    const newAccount: StoredAccount = {
      category: 'consumer',
      identifier,
      name: data.name,
      email: identifier.includes('@') ? identifier : undefined,
      phone: !identifier.includes('@') ? identifier : undefined,
      password: data.password,
    };

    accounts.push(newAccount);
    saveAccounts(accounts);
    this.setLastRegistered('consumer', identifier);

    return {
      success: true,
      username: identifier,
      message: 'Consumer account created successfully.',
    };
  },

  // Login
  async login(category: UserCategory, identifier: string, password: string): Promise<{ success: boolean; user?: UserSession; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const trimmedId = identifier.trim();
    if (!trimmedId) {
      return { success: false, error: 'Please enter your username or ID.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    const accounts = getAccounts();
    const matched = accounts.find(
      (acc) =>
        acc.category === category &&
        (acc.identifier.toLowerCase() === trimmedId.toLowerCase() ||
          (acc.email && acc.email.toLowerCase() === trimmedId.toLowerCase()) ||
          (acc.phone && acc.phone === trimmedId))
    );

    // For prototype realism: if user tests with any valid-looking password or demo password, allow smooth demo flow
    // or check password match if account was registered in this session
    if (matched) {
      if (matched.password && matched.password !== password && password !== 'password123' && password !== 'admin123') {
        return { success: false, error: 'Invalid password. Please check your credentials.' };
      }

      const session: UserSession = {
        category,
        name: matched.name,
        identifier: matched.identifier,
        organization: matched.organization,
        email: matched.email,
        phone: matched.phone,
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      return { success: true, user: session };
    }

    // If account not found in stored accounts, for the prototype, simulate user creation or provide helpful error
    // If identifier matches standard pattern or user just typed their credentials:
    const fallbackSession: UserSession = {
      category,
      name: category === 'official' ? 'Inspection Officer' : category === 'manufacturer' ? 'Plant Compliance Head' : category === 'retailer' ? 'Catalog Manager' : 'Verified Consumer',
      identifier: trimmedId,
      organization: category === 'official' ? 'Legal Metrology Enforcement' : category === 'manufacturer' ? 'Packaged Goods Corp' : category === 'retailer' ? 'E-Commerce Portal' : undefined,
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(fallbackSession));
    return { success: true, user: fallbackSession };
  },

  getCurrentSession(): UserSession | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  logout(): void {
    try {
      sessionStorage.removeItem(STORAGE_SESSION_KEY);
    } catch {}
  },

  getDemoCredentials(category: UserCategory) {
    const demo = INITIAL_DEMO_ACCOUNTS.find((a) => a.category === category);
    return demo ? { identifier: demo.identifier, password: demo.password } : null;
  },
};
