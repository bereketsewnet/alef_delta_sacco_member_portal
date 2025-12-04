// ALEF-DELTA SACCO Member Mini-App Types

export interface Member {
    id: string;
    member_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    phone: string;
    email?: string;
    gender: 'MALE' | 'FEMALE';
    date_of_birth?: string;
    national_id?: string;
    address?: string;
    status: MemberStatus;
    telegram_chat_id?: string;
    profile_photo?: string;
    created_at: string;
    updated_at: string;
  }
  
  export type MemberStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'CLOSED';
  
  export interface Account {
    id: string;
    account_number: string;
    account_type: AccountType;
    balance: number;
    lien_amount: number;
    available_balance: number;
    status: AccountStatus;
    interest_rate: number;
    last_transaction_date?: string;
    created_at: string;
  }
  
  export type AccountType = 'COMPULSORY' | 'VOLUNTARY' | 'FIXED' | 'SHARE_CAPITAL';
  export type AccountStatus = 'ACTIVE' | 'FROZEN' | 'CLOSED';
  
  export interface Transaction {
    id: string;
    transaction_id: string;
    account_id: string;
    type: TransactionType;
    amount: number;
    balance_after: number;
    reference?: string;
    description?: string;
    receipt_url?: string;
    performed_by?: string;
    created_at: string;
  }
  
  export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'INTEREST' | 'TRANSFER' | 'LOAN_DISBURSEMENT' | 'LOAN_REPAYMENT' | 'FEE' | 'PENALTY';
  
  export interface Loan {
    id: string;
    loan_id: string;
    product_name: string;
    applied_amount: number;
    approved_amount?: number;
    interest_rate: number;
    interest_type: 'FLAT' | 'DECLINING';
    term_months: number;
    repayment_frequency: 'MONTHLY' | 'WEEKLY' | 'QUARTERLY';
    monthly_installment: number;
    outstanding_balance: number;
    total_paid: number;
    total_interest: number;
    total_penalty: number;
    status: LoanStatus;
    purpose?: string;
    next_payment_date?: string;
    days_overdue: number;
    disbursed_at?: string;
    created_at: string;
  }
  
  export type LoanStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'FULLY_PAID';
  
  export interface LoanScheduleItem {
    period: number;
    due_date: string;
    principal: number;
    interest: number;
    total_payment: number;
    balance_after: number;
    status: 'PENDING' | 'PAID' | 'OVERDUE' | 'PARTIAL';
  }
  
  export interface Request {
    id: string;
    request_id: string;
    type: RequestType;
    status: RequestStatus;
    amount?: number;
    description?: string;
    staff_notes?: string;
    processed_by?: string;
    created_at: string;
    processed_at?: string;
  }
  
  export type RequestType = 'DEPOSIT' | 'REPAYMENT' | 'PROFILE_UPDATE' | 'PASSWORD_RESET' | 'DOCUMENT_UPLOAD';
  export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
  
  export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    read: boolean;
    resource_type?: string;
    resource_id?: string;
    created_at: string;
  }
  
  export interface KPISummary {
    total_savings: number;
    loan_outstanding: number;
    next_payment_amount: number;
    next_payment_date?: string;
    savings_change_percent: number;
    total_accounts: number;
    active_loans: number;
  }
  
  export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    member: Member;
  }
  
  export interface ApiError {
    message: string;
    code?: string;
  }
  