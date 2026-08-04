// Type Imports
import { ThemeColor } from '../designSystem/src/materio/@core/types';
import {
  AttachmentMessage,
  GetThreadsChatThreadsGetData,
  GroupItem,
  MemberInfo,
  Message,
  SchemaContact1,
  SchemaThreadsResponse1,
  SchemaUserInfo3,
  Topic,
  Zone,
} from '../services/hey-api-client/types.gen';

/** Query params for get-threads (query is optional on GetThreadsChatThreadsGetData) */
type ThreadsQuery = NonNullable<GetThreadsChatThreadsGetData['query']>;

export type StatusType = 'busy' | 'away' | 'online' | 'offline';

export type StatusObjType = Record<StatusType, ThemeColor>;

export type ContactType = SchemaContact1;

export type GroupType = GroupItem;

export type AttachmentType = AttachmentMessage;

export type TopicType = Topic;

export type ThreadsType = SchemaThreadsResponse1['data'][0] & {
  info?: SchemaUserInfo3;
  members?: PaginationState<MemberInfo>;
  isFakeThread?: boolean;
  /** When isFakeThread: the other participant's userId (for backend to add as member) */
  otherUserId?: string;
};

export type UserChatType = Message;

export type ChatType = {
  threadId: string;
  chat: UserChatType[];
};

export type ChatDataType = {
  contacts: ThreadsType[];
  chats: ChatType[];
  activeUser?: ThreadsType;
};

// Base async state type
export interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

// Pagination state (cursor-based)
export interface PaginationState<T> {
  data: T[];
  next_cursor?: string | null;
  has_next?: boolean;
  loading: boolean;
}

// pagination state (Page-based)
export interface PagePaginationState<T> {
  data: T[];
  page: number;
  pagesCount: number;
  loading: boolean;
  error: string | null;
}

// Threads Store State
export interface ThreadsState {
  // Threads data cached by zone and filter type
  threads?: Record<string, PaginationState<ThreadsType>>;
  activeThread?: ThreadsType;
  activeTopic?: TopicType | null;
  loadedMemberThreads: { name: string; page: number }[];

  // Filter Threads and Zones
  threadsFilterType?: ThreadsQuery['filter'];
  activeZone?: ThreadsQuery['zone'];
  zones?: AsyncState<Zone[]>;

  // Contacts and groups
  contacts?: Record<string, PaginationState<ContactType>>;
  groups?: Record<string, PaginationState<GroupType>>;

  // Actions
  setActiveThread: (thread: ThreadsType) => void;
  setActiveTopic: (topic: TopicType | null) => void;
  getThreads: () => Promise<void>;
  getThread: (threadId: string) => Promise<void>;
  setActiveZone: (zone: ThreadsQuery['zone']) => void;
  getZones: () => Promise<void>;
  getContacts: (search?: string) => Promise<void>;
  getGroups: (search?: string) => Promise<void>;
  getMembers: (threadId: string) => Promise<void>;
  setThreadFilterType: (type: ThreadsQuery['filter']) => void;

  // Thread actions
  addNewChat: (contact: ContactType) => Promise<void>;
  createGroup: (file: File, groupName: string, memberIds: string[]) => Promise<void>;
  editGroup: (groupId: string, groupName: string, file?: File | null) => Promise<void>;
  pinThreadToggle: (threadId: string) => Promise<void>;
  muteThreadToggle: (
    threadId: string[],
    time: 'HOURS_4' | 'HOURS_8' | 'HOURS_24' | 'ALWAYS' | 'NEVER',
  ) => Promise<void>;
  toggleReadThreads: (threadId: string[], status: 'READ' | 'UNREAD', showToast?: boolean) => Promise<void>;
  deleteThreads: (threadIds: string[]) => Promise<void>;
  addMemberGroup: (groupId: string, memberIds: MemberInfo[]) => Promise<void>;
  deleteMemberGroup: (groupId: string, memberIds: string[]) => Promise<void>;
}

// Messages Store State (Normalized)
export interface MessagesState {
  // Messages data cached by threadId
  messagesByThread?: Record<string, PaginationState<UserChatType>>;

  // Message operations state
  sendingMessage?: boolean;
  editingMessage?: boolean;
  deletingMessage?: boolean;
  files?: File[];
  audios?: File[];
  uploadProgress?: Record<string, number>;
  uploadError?: string | null;
  initialMsg?: string | null | undefined;
  editingMsgId?: string;
  forwardDrawer?: boolean;

  // Optimistic updates
  optimisticMessages?: Record<string, UserChatType>;

  // Actions
  getActiveThreadData: (threadId: string, topic?: TopicType | null) => Promise<void>;

  // Message actions
  sendMsg: (msg: string, attachFile?: boolean) => Promise<void>;
  editMsg: (text: string, id: string) => Promise<void>;
  deleteMsg: (ids: string[], threadId?: string) => Promise<void>;
  setReactionMsg: (id: string, emoji: string) => void;
}

// UI Store State
export interface UIState {
  // Drawer states
  drawers: {
    editGroupDrawer: boolean;
    forwardDrawer: boolean;
    infoDirectDrawer: boolean;
    infoGroupDrawer: boolean;
    sharingFileDrawer: boolean;
  };

  // Mode states
  modes: {
    editMode: boolean;
    replyMode: boolean;
    forwardMode: boolean;
    selectMode: boolean;
  };

  // Misc UI state
  infoGroupDrawerStep: 'DETAILS' | 'ADD_MEMBER' | 'EDIT';
  unseenMsgs: number;

  // Message context
  editingMsgId?: string;
  replyingMsg?: UserChatType;
  forwardingMsg?: UserChatType[];
  selectedMsg: UserChatType[];
  initialMsg: string | null | undefined;

  // Actions
  addSelectMsg: (messages?: UserChatType[]) => void;
  removeSelectMsg: (message?: UserChatType) => void;
  toggleDrawer: (drawer: keyof UIState['drawers']) => void;
  toggleMode: (mode: keyof UIState['modes'], msg?: UserChatType) => void;
  setInfoGroupDrawerStep: (step: 'DETAILS' | 'ADD_MEMBER' | 'EDIT') => void;
  setForwardingMsg: (messages?: UserChatType[]) => void;
  setReplyingMsg: (message?: UserChatType) => void;
}

// Files Store State
export interface FilesState {
  // Attachments data cached by threadId
  attachmentsByThread: Record<
    string,
    {
      attachmentsFile?: PaginationState<AttachmentType>;
      attachmentsAudio?: PaginationState<AttachmentType>;
      attachmentsImage?: PaginationState<AttachmentType>;
      attachmentsVideo?: PaginationState<AttachmentType>;
    }
  >;

  getAttachmentsFile: (threadId: string, topicId?: string) => Promise<void>;
  getAttachmentsAudio: (threadId: string, topicId?: string) => Promise<void>;
  getAttachmentsImage: (threadId: string, topicId?: string) => Promise<void>;
  getAttachmentsVideo: (threadId: string, topicId?: string) => Promise<void>;

  // File data
  files: { file: File; isMedia: boolean }[];
  audios: File[];

  // Upload state
  uploadProgress: Record<string, number>;
  uploadError: string | null;

  // Actions
  addFiles: (files: { file: File; isMedia: boolean }[]) => void;
  removeFile: (index: number) => void;
  removeAllFiles: () => void;
  addAudio: (newAudio: File) => void;
  removeAudio: (index?: number) => void;
  removeAllAudios: () => void;
  setUploadProgress: (fileId: string, progress: number) => void;
  clearUploadProgress: (fileId?: string) => void;
  setUploadError: (error: string | null) => void;
  clearAll: () => void;
}
