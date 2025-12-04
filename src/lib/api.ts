// ALEF-DELTA SACCO API Client & Mock Data
import type {
    Member,
    Account,
    Transaction,
    Loan,
    LoanScheduleItem,
    Request,
    Notification,
    KPISummary,
    AuthResponse,
  } from '@/types';
  
  const API_BASE = '/api';
  
  // Helper to get auth token
  const getToken = () => localStorage.getItem('accessToken');
  
  // Base fetch with auth
  async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = getToken();
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    });
  
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message);
    }
  
    return response.json();
  }
  
  // ============= MOCK DATA =============
  
  export const mockMember: Member = {
    id: '1',
    member_id: 'MEM-2024-001',
    first_name: 'Abebe',
    middle_name: 'Kebede',
    last_name: 'Tadesse',
    phone: '+251911234567',
    email: 'abebe.tadesse@email.com',
    gender: 'MALE',
    date_of_birth: '1985-03-15',
    national_id: 'ETH-1234567890',
    address: 'Addis Ababa, Bole Sub-city, Woreda 03',
    status: 'ACTIVE',
    telegram_chat_id: '123456789',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-12-01T14:30:00Z',
  };
  
  export const mockAccounts: Account[] = [
    {
      id: '1',
      account_number: 'SAV-2024-001-01',
      account_type: 'COMPULSORY',
      balance: 45000.00,
      lien_amount: 4500.00,
      available_balance: 40500.00,
      status: 'ACTIVE',
      interest_rate: 5.0,
      last_transaction_date: '2024-12-01T09:00:00Z',
      created_at: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      account_number: 'SAV-2024-001-02',
      account_type: 'VOLUNTARY',
      balance: 125000.00,
      lien_amount: 0,
      available_balance: 125000.00,
      status: 'ACTIVE',
      interest_rate: 7.0,
      last_transaction_date: '2024-11-28T15:30:00Z',
      created_at: '2024-02-01T10:00:00Z',
    },
    {
      id: '3',
      account_number: 'SAV-2024-001-03',
      account_type: 'SHARE_CAPITAL',
      balance: 10000.00,
      lien_amount: 0,
      available_balance: 10000.00,
      status: 'ACTIVE',
      interest_rate: 0,
      created_at: '2024-01-15T10:00:00Z',
    },
  ];
  
  export const mockTransactions: Transaction[] = [
    {
      id: '1',
      transaction_id: 'TXN-2024-120101',
      account_id: '1',
      type: 'DEPOSIT',
      amount: 5000.00,
      balance_after: 45000.00,
      reference: 'Monthly contribution',
      performed_by: 'Teller: Marta G.',
      created_at: '2024-12-01T09:00:00Z',
    },
    {
      id: '2',
      transaction_id: 'TXN-2024-112801',
      account_id: '2',
      type: 'DEPOSIT',
      amount: 25000.00,
      balance_after: 125000.00,
      reference: 'Business savings',
      performed_by: 'Teller: Dawit K.',
      created_at: '2024-11-28T15:30:00Z',
    },
    {
      id: '3',
      transaction_id: 'TXN-2024-112501',
      account_id: '1',
      type: 'INTEREST',
      amount: 187.50,
      balance_after: 40000.00,
      reference: 'November 2024 Interest',
      performed_by: 'System',
      created_at: '2024-11-25T00:00:00Z',
    },
    {
      id: '4',
      transaction_id: 'TXN-2024-111501',
      account_id: '1',
      type: 'DEPOSIT',
      amount: 5000.00,
      balance_after: 39812.50,
      reference: 'Monthly contribution',
      performed_by: 'Teller: Marta G.',
      created_at: '2024-11-15T10:30:00Z',
    },
    {
      id: '5',
      transaction_id: 'TXN-2024-110101',
      account_id: '1',
      type: 'DEPOSIT',
      amount: 5000.00,
      balance_after: 34812.50,
      reference: 'Monthly contribution',
      performed_by: 'Teller: Marta G.',
      created_at: '2024-11-01T09:15:00Z',
    },
  ];
  
  export const mockLoans: Loan[] = [
    {
      id: '1',
      loan_id: 'LOAN-2024-001',
      product_name: 'Business Loan',
      applied_amount: 50000,
      approved_amount: 45000,
      interest_rate: 12,
      interest_type: 'DECLINING',
      term_months: 12,
      repayment_frequency: 'MONTHLY',
      monthly_installment: 4012.50,
      outstanding_balance: 32100.00,
      total_paid: 16090.00,
      total_interest: 2700.00,
      total_penalty: 0,
      status: 'APPROVED',
      purpose: 'Business expansion - purchasing new equipment',
      next_payment_date: '2025-01-03',
      days_overdue: 0,
      disbursed_at: '2024-09-03T10:00:00Z',
      created_at: '2024-08-25T14:00:00Z',
    },
    {
      id: '2',
      loan_id: 'LOAN-2024-002',
      product_name: 'Emergency Loan',
      applied_amount: 15000,
      approved_amount: 15000,
      interest_rate: 10,
      interest_type: 'FLAT',
      term_months: 6,
      repayment_frequency: 'MONTHLY',
      monthly_installment: 2750.00,
      outstanding_balance: 0,
      total_paid: 16500.00,
      total_interest: 1500.00,
      total_penalty: 0,
      status: 'FULLY_PAID',
      purpose: 'Medical emergency',
      days_overdue: 0,
      disbursed_at: '2024-03-15T10:00:00Z',
      created_at: '2024-03-10T09:00:00Z',
    },
  ];
  
  export const mockLoanSchedule: LoanScheduleItem[] = [
    { period: 1, due_date: '2024-10-03', principal: 3750.00, interest: 450.00, total_payment: 4200.00, balance_after: 41250.00, status: 'PAID' },
    { period: 2, due_date: '2024-11-03', principal: 3787.50, interest: 412.50, total_payment: 4200.00, balance_after: 37462.50, status: 'PAID' },
    { period: 3, due_date: '2024-12-03', principal: 3825.38, interest: 374.63, total_payment: 4200.00, balance_after: 33637.12, status: 'PAID' },
    { period: 4, due_date: '2025-01-03', principal: 3863.63, interest: 336.37, total_payment: 4200.00, balance_after: 29773.49, status: 'PENDING' },
    { period: 5, due_date: '2025-02-03', principal: 3902.27, interest: 297.73, total_payment: 4200.00, balance_after: 25871.22, status: 'PENDING' },
    { period: 6, due_date: '2025-03-03', principal: 3941.29, interest: 258.71, total_payment: 4200.00, balance_after: 21929.93, status: 'PENDING' },
    { period: 7, due_date: '2025-04-03', principal: 3980.71, interest: 219.30, total_payment: 4200.00, balance_after: 17949.23, status: 'PENDING' },
    { period: 8, due_date: '2025-05-03', principal: 4020.51, interest: 179.49, total_payment: 4200.00, balance_after: 13928.71, status: 'PENDING' },
    { period: 9, due_date: '2025-06-03', principal: 4060.72, interest: 139.29, total_payment: 4200.00, balance_after: 9867.99, status: 'PENDING' },
    { period: 10, due_date: '2025-07-03', principal: 4101.33, interest: 98.68, total_payment: 4200.00, balance_after: 5766.66, status: 'PENDING' },
    { period: 11, due_date: '2025-08-03', principal: 4142.34, interest: 57.67, total_payment: 4200.00, balance_after: 1624.32, status: 'PENDING' },
    { period: 12, due_date: '2025-09-03', principal: 1624.32, interest: 16.24, total_payment: 1640.56, balance_after: 0, status: 'PENDING' },
  ];
  
  export const mockRequests: Request[] = [
    {
      id: '1',
      request_id: 'REQ-2024-001',
      type: 'DEPOSIT',
      status: 'APPROVED',
      amount: 5000,
      description: 'Monthly contribution deposit',
      staff_notes: 'Verified and processed.',
      processed_by: 'Teller: Marta G.',
      created_at: '2024-12-01T08:30:00Z',
      processed_at: '2024-12-01T09:00:00Z',
    },
    {
      id: '2',
      request_id: 'REQ-2024-002',
      type: 'REPAYMENT',
      status: 'PENDING',
      amount: 4200,
      description: 'December loan repayment',
      created_at: '2024-12-02T10:00:00Z',
    },
  ];
  
  export const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Deposit Processed',
      message: 'Your deposit of ETB 5,000 has been processed to your Compulsory Savings account.',
      type: 'SUCCESS',
      read: false,
      resource_type: 'transaction',
      resource_id: '1',
      created_at: '2024-12-01T09:00:00Z',
    },
    {
      id: '2',
      title: 'Loan Payment Reminder',
      message: 'Your next loan payment of ETB 4,200 is due on January 3, 2025.',
      type: 'INFO',
      read: false,
      resource_type: 'loan',
      resource_id: '1',
      created_at: '2024-12-01T06:00:00Z',
    },
    {
      id: '3',
      title: 'Interest Posted',
      message: 'Monthly interest of ETB 187.50 has been credited to your Compulsory Savings account.',
      type: 'SUCCESS',
      read: true,
      resource_type: 'transaction',
      resource_id: '3',
      created_at: '2024-11-25T00:00:00Z',
    },
  ];
  
  export const mockKPISummary: KPISummary = {
    total_savings: 180000.00,
    loan_outstanding: 32100.00,
    next_payment_amount: 4200.00,
    next_payment_date: '2025-01-03',
    savings_change_percent: 8.5,
    total_accounts: 3,
    active_loans: 1,
  };
  
  // Chart data for sparklines
  export const mockSavingsHistory = [
    { month: 'Jul', amount: 140000 },
    { month: 'Aug', amount: 148000 },
    { month: 'Sep', amount: 155000 },
    { month: 'Oct', amount: 162000 },
    { month: 'Nov', amount: 172000 },
    { month: 'Dec', amount: 180000 },
  ];
  
  // ============= API ENDPOINTS (Mock implementations) =============
  
  export const api = {
    auth: {
      login: async (phone: string, password: string): Promise<AuthResponse> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (phone === '+251911234567' && password === 'password123') {
          return {
            accessToken: 'mock-jwt-token',
            refreshToken: 'mock-refresh-token',
            member: mockMember,
          };
        }
        throw new Error('Invalid phone number or password');
      },
      
      requestOtp: async (email: string): Promise<{ otp_req_id: string }> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return { otp_req_id: 'otp-123' };
      },
      
      changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        if (currentPassword !== 'password123') {
          throw new Error('Current password is incorrect');
        }
      },
    },
    
    client: {
      getMe: async (): Promise<Member> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockMember;
      },
      
      getKPISummary: async (): Promise<KPISummary> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockKPISummary;
      },
      
      getAccounts: async (): Promise<Account[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockAccounts;
      },
      
      getAccountTransactions: async (accountId: string, page = 1): Promise<{ data: Transaction[]; hasMore: boolean }> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockTransactions.filter(t => t.account_id === accountId || !accountId), hasMore: page < 3 };
      },
      
      getLoans: async (): Promise<Loan[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockLoans;
      },
      
      getLoanDetail: async (loanId: string): Promise<Loan & { schedule: LoanScheduleItem[] }> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const loan = mockLoans.find(l => l.id === loanId) || mockLoans[0];
        return { ...loan, schedule: mockLoanSchedule };
      },
      
      getRequests: async (): Promise<Request[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockRequests;
      },
      
      createRequest: async (data: { type: string; amount?: number; description: string }): Promise<Request> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          id: Date.now().toString(),
          request_id: `REQ-${Date.now()}`,
          type: data.type as Request['type'],
          status: 'PENDING',
          amount: data.amount,
          description: data.description,
          created_at: new Date().toISOString(),
        };
      },
      
      getNotifications: async (): Promise<Notification[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockNotifications;
      },
      
      markNotificationRead: async (id: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    
    uploads: {
      upload: async (file: File): Promise<{ url: string }> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { url: `https://placeholder.com/uploads/${file.name}` };
      },
    },
  };
  
  export default api;
  