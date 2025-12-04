// i18n Setup for ALEF-DELTA SACCO
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      app_name: 'ALEF-DELTA SACCO',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      submit: 'Submit',
      save: 'Save',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      copy: 'Copy',
      share: 'Share',
      download: 'Download',
      export: 'Export CSV',
      view_all: 'View All',
      see_more: 'See More',
      no_data: 'No data available',
      
      // Currency
      currency: 'ETB',
      currency_symbol: 'ETB',
      
      // Auth
      login: 'Login',
      logout: 'Logout',
      phone: 'Phone Number',
      password: 'Password',
      current_password: 'Current Password',
      new_password: 'New Password',
      confirm_password: 'Confirm Password',
      remember_device: 'Remember this device',
      forgot_password: 'Forgot Password?',
      request_reset: 'Request Password Reset',
      reset_password: 'Reset Password',
      login_error: 'Invalid phone number or password',
      
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        accounts: 'Accounts',
        loans: 'Loans',
        requests: 'My Requests',
        profile: 'Profile',
        notifications: 'Notifications',
      },
      
      // Dashboard
      dashboard: {
        greeting: 'Hello',
        total_savings: 'Total Savings',
        loan_outstanding: 'Loan Outstanding',
        next_payment: 'Next Payment',
        due_on: 'Due on',
        recent_transactions: 'Recent Transactions',
        quick_actions: 'Quick Actions',
        view_accounts: 'View Accounts',
        view_loans: 'View Loans',
        my_requests: 'My Requests',
        trend_up: 'Up',
        trend_down: 'Down',
      },
      
      // Accounts
      accounts: {
        title: 'My Accounts',
        account_number: 'Account Number',
        balance: 'Balance',
        available_balance: 'Available Balance',
        lien_amount: 'Lien Amount',
        interest_rate: 'Interest Rate',
        last_transaction: 'Last Transaction',
        view_transactions: 'View Transactions',
        request_deposit: 'Request Deposit',
        types: {
          COMPULSORY: 'Compulsory Savings',
          VOLUNTARY: 'Voluntary Savings',
          FIXED: 'Fixed Deposit',
          SHARE_CAPITAL: 'Share Capital',
        },
      },
      
      // Transactions
      transactions: {
        title: 'Transactions',
        history: 'Transaction History',
        date: 'Date',
        type: 'Type',
        amount: 'Amount',
        reference: 'Reference',
        receipt: 'Receipt',
        performed_by: 'Processed by',
        filter_by_date: 'Filter by date',
        types: {
          DEPOSIT: 'Deposit',
          WITHDRAWAL: 'Withdrawal',
          INTEREST: 'Interest',
          TRANSFER: 'Transfer',
          LOAN_DISBURSEMENT: 'Loan Disbursement',
          LOAN_REPAYMENT: 'Loan Repayment',
          FEE: 'Fee',
          PENALTY: 'Penalty',
        },
      },
      
      // Loans
      loans: {
        title: 'My Loans',
        loan_id: 'Loan ID',
        product: 'Loan Product',
        amount: 'Loan Amount',
        approved_amount: 'Approved Amount',
        outstanding: 'Outstanding Balance',
        interest_rate: 'Interest Rate',
        interest_type: 'Interest Type',
        term: 'Loan Term',
        monthly_payment: 'Monthly Payment',
        next_payment: 'Next Payment',
        total_paid: 'Total Paid',
        total_interest: 'Total Interest',
        total_penalty: 'Total Penalty',
        purpose: 'Purpose',
        repayment_schedule: 'Repayment Schedule',
        request_repayment: 'Request Repayment',
        progress: 'Repayment Progress',
        days_overdue: 'Days Overdue',
        period: 'Period',
        due_date: 'Due Date',
        principal: 'Principal',
        interest: 'Interest',
        status: {
          PENDING: 'Pending',
          UNDER_REVIEW: 'Under Review',
          APPROVED: 'Active',
          REJECTED: 'Rejected',
          DISBURSED: 'Disbursed',
          FULLY_PAID: 'Fully Paid',
        },
        schedule_status: {
          PENDING: 'Upcoming',
          PAID: 'Paid',
          OVERDUE: 'Overdue',
          PARTIAL: 'Partial',
        },
      },
      
      // Requests
      requests: {
        title: 'My Requests',
        new_request: 'New Request',
        request_id: 'Request ID',
        type: 'Request Type',
        amount: 'Amount',
        description: 'Description',
        staff_notes: 'Staff Notes',
        processed_by: 'Processed by',
        status: 'Status',
        created_at: 'Submitted',
        processed_at: 'Processed',
        deposit_request: 'Deposit Request',
        repayment_request: 'Loan Repayment Request',
        profile_update: 'Profile Update',
        request_submitted: 'Your request has been submitted and is pending approval.',
        types: {
          DEPOSIT: 'Deposit',
          REPAYMENT: 'Loan Repayment',
          PROFILE_UPDATE: 'Profile Update',
          PASSWORD_RESET: 'Password Reset',
          DOCUMENT_UPLOAD: 'Document Upload',
        },
        status_labels: {
          PENDING: 'Pending',
          APPROVED: 'Approved',
          REJECTED: 'Rejected',
        },
      },
      
      // Profile
      profile: {
        title: 'My Profile',
        edit_profile: 'Edit Profile',
        personal_info: 'Personal Information',
        contact_info: 'Contact Information',
        security: 'Security',
        change_password: 'Change Password',
        upload_photo: 'Upload Photo',
        upload_documents: 'Upload Documents',
        member_id: 'Member ID',
        member_since: 'Member Since',
        fields: {
          first_name: 'First Name',
          middle_name: 'Middle Name',
          last_name: 'Last Name',
          phone: 'Phone Number',
          email: 'Email Address',
          gender: 'Gender',
          date_of_birth: 'Date of Birth',
          national_id: 'National ID',
          address: 'Address',
          telegram_id: 'Telegram Chat ID',
        },
      },
      
      // Notifications
      notifications: {
        title: 'Notifications',
        mark_read: 'Mark as Read',
        mark_all_read: 'Mark All as Read',
        no_notifications: 'No notifications',
        view_details: 'View Details',
      },
      
      // Validation
      validation: {
        required: 'This field is required',
        min_amount: 'Minimum amount is {{amount}}',
        max_amount: 'Maximum amount is {{amount}}',
        invalid_phone: 'Please enter a valid phone number',
        invalid_email: 'Please enter a valid email address',
        password_mismatch: 'Passwords do not match',
        password_min_length: 'Password must be at least 8 characters',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
