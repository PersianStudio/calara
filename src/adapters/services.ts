/**
 * shared-services stubs.
 */
export type CollaborationSidebarMenuItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: CollaborationSidebarMenuItem[];
};

export type UploadFileResultDto = { id: string; url: string };
export type UploadFileTypeEnum = string;
