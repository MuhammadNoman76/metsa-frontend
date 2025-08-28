export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  CUSTOMER = "customer",
}

// Remove the enum and use string type instead
export type DocumentCategory = string;

export enum DocumentVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
  INTERNAL = "internal",
}

export enum ApprovalStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface CustomerInfo {
  company?: string;
  phone?: string;
  address?: string;
  [key: string]: string | undefined;
}

export interface Category {
  id: string;
  name: string;
  label: string;
  description?: string;
  color?: string;
  icon?: string;
  is_active: boolean;
  is_default: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  permissions: string[];
  customer_info?: CustomerInfo;
  is_active: boolean;
  is_verified: boolean;
  is_super_admin?: boolean;
  approval_status?: ApprovalStatus;
  approved_by?: string | null;
  approved_at?: string | null;
  rejection_reason?: string | null;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  category: string; // Changed from DocumentCategory enum to string
  visibility: DocumentVisibility;
  is_viewable_only: boolean;
  assigned_customers: string[];
  tags: string[];
  file_name: string;
  file_size: number;
  mime_type: string;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  document_id?: string;
  user_id: string;
  is_read: boolean;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  role: UserRole.CUSTOMER | UserRole.EDITOR;
  customer_info?: CustomerInfo;
}
