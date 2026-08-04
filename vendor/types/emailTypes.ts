// Type Imports
import {
  Email,
  EmailsResponse,
  FoldersResponse,
  GetThreadsEmailThreadsGetData,
  SchemaContact1,
  SchemaContact2,
  SchemaThreadListItem2,
  SchemaThreadsResponse2,
  SchemaUserInfo2,
} from '../services/hey-api-client/types.gen';
import { AsyncState, PaginationState } from './chatTypes';

// Re-export shared types
export type { PaginationState, AsyncState };

// Email specific enums (extracted from generated types)
export type EmailThreadType = SchemaThreadListItem2['threadType'];
export type EmailTypeFilter = GetThreadsEmailThreadsGetData['query']['type'];
export type EmailFilterType = GetThreadsEmailThreadsGetData['query']['filter'];
export type EmailReadStatus = 'READ' | 'UNREAD';

// Email Thread Item (extending generated type)
export type EmailThreadListItem = SchemaThreadListItem2;

// Email Item (directly using generated type)
export type EmailItem = Email;

// Folder Counts (using generated type)
export type EmailFolderCounts = FoldersResponse;

// User Info (using generated type - SchemaUserInfo2 has more fields like mobile, phone, website, role, companyName)
export type EmailUserInfo = SchemaUserInfo2;

// Contact Item (using generated type)
export type EmailContactItem = SchemaContact2;

// API Response for Threads (using generated type)
export type EmailThreadsResponse = SchemaThreadsResponse2;

// API Response for Emails (using generated type)
export type EmailsResponseType = EmailsResponse;

// API Response for Contacts
export interface EmailContactsResponse {
  next_cursor: string | null;
  has_next: boolean;
  data: EmailContactItem[];
}

// Store States

export interface EmailThreadsState {
  // Threads data cached by filter type (e.g. "inbox_ALL", "sent_unread")
  threads: Record<string, PaginationState<EmailThreadListItem>>;
  activeThread: EmailThreadListItem | undefined;

  // Filter state
  activeFolder: NonNullable<EmailTypeFilter>; // Replacing activeZone
  filterType: NonNullable<EmailFilterType>;

  // Folder counts
  folderCounts: AsyncState<EmailFolderCounts | null>;

  // User Info
  userInfo: SchemaUserInfo2 | null;

  // Contacts
  contacts: Record<string, PaginationState<EmailContactItem>>;

  // Active email(s) - array of email addresses, or null if not set
  activeEmail: string[] | null;

  // Actions
  setActiveThread: (thread: EmailThreadListItem | undefined) => void;
  setActiveFolder: (folder: NonNullable<EmailTypeFilter>) => void;
  setFilterType: (type: NonNullable<EmailFilterType>) => void;
  setActiveEmail: (userEmails: string[] | null) => void;

  // Data fetching
  getThreads: (forceRefresh?: boolean) => Promise<void>;
  getFolders: () => Promise<void>;
  getContacts: (search?: string, forceRefresh?: boolean) => Promise<void>;
  getUserInfo: (threadId: string) => Promise<void>;

  // Actions
  sendEmail: (
    content: string,
    subject: string,
    receiverEmail: string,
    replyEmailId?: string,
    draftThreadId?: string,
  ) => Promise<void>;
  saveDraft: (content: string, subject: string, receiverEmail: string, draftThreadId?: string) => Promise<void>;
  deleteThreads: (threadIds: string[]) => Promise<void>;
  deleteThreadsPermanently: (threadIds: string[]) => Promise<void>;
  flagThreadToggle: (threadIds: string[]) => Promise<void>;
  toggleReadThreads: (threadIds: string[], status: EmailReadStatus) => Promise<void>;
  spamThreadToggle: (threadIds: string[]) => Promise<void>;
}

export interface EmailsState {
  // Emails data cached by threadId
  emailsByThread: Record<string, PaginationState<EmailItem>>;

  // Operation states
  sendingEmail: boolean;
  savingDraft: boolean;

  // Actions
  getActiveThreadData: (threadId: string, forceRefresh?: boolean) => Promise<void>;
}
