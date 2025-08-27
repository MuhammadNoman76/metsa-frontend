export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  CUSTOMER = "customer",
}

export enum DocumentCategory {
  COMMERCIAL = "commercial",
  QUALITY = "quality",
  SAFETY = "safety",
  COMPLIANCE = "compliance",
  CONTRACTS = "contracts",
  SPECIFICATIONS = "specifications",
  OTHER = "other",
}

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
  [key: string]: any;
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
  category: DocumentCategory;
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
