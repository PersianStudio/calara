import { ReactElement } from 'react';
import { PermissionKeyEnum } from './permissionKey';

export interface ApiError {
  code: string;
  message: string | string[];
  path: string;
  statusCode: number;
  timestamp: string;
}

export interface IdTitleNumber {
  id: number;
  title: string;
}
export interface IdTitleString {
  id: string;
  title: string;
}

export interface SubMenuItem {
  title: string;
  path: string;
  permissions?: PermissionKeyEnum;
  badge?: number;
  disabled?: boolean;
  icon?: ReactElement;
}

export interface SidebarMenuItem {
  title: string;
  path: string;
  icon?: ReactElement;
  submenu?: SubMenuItem[];
  permissions?: PermissionKeyEnum;
  badge?: number;
  disabled?: boolean;
}

export interface SetupStepItem {
  title: string;
  path: string;
  pathEndpoint: string;
  component: JSX.Element;
  icon: ReactElement;
  status: 'completed' | 'in_process' | 'pending';
  type?: 'text' | 'button';
}

export interface SetupStepRouting {
  path: string;
  pathEndpoint: string;
  component: JSX.Element;
}

export interface Module {
  title: string;
  name: string;
}

export interface CountryCode {
  id?: string;
  code: number | string;
  name: string;
  abbreviation: string;
}

export interface CurrentUserType {
  id: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  roles?:
    | {
        id: number;
        title: string;
        userRolePermissions?:
          | {
              roleId: number;
              permissionId: number;
              hasPermission: boolean;
              permission: {
                id: number;
                title: string;
              };
            }[]
          | null
          | undefined;
      }[]
    | null
    | undefined;
  activeModules: Module[];
}

export interface Zone {
  name?:
    | 'schoolZone'
    | 'collaborationZone'
    | 'contentZone'
    | 'communicationZone'
    | 'workflowZone'
    | 'managementInformationZone'
    | 'timeTableZone'
    | 'challengeZone'
    | 'commsZone'
    | 'contactZone';
  title?: string;
  id?: string;
  url?: string;
}

// required fields types, /registration/csv/required-fields?ecosystem
export interface IRequiredFields {
  configuration: {
    registration: {
      userEntityTypes: IdTitleString[];
      userIndividualTypes: IdTitleString[];
      userPronouns: IdTitleString[];
      userTitles: IdTitleString[];
      countryCodes: CountryCode[];
    };
  };
}

export interface EntityType {
  id: string;
  title: string;
}

export interface UserPronoun {
  id: string;
  title: string;
}

export interface IndividualTypes {
  id: string;
  title: string;
}

export interface LegalsTypes {
  content: string;
  title: string;
}

export type SetUpProcessStatusAPI =
  | 'INITIAL_SETUP'
  | 'AP_REGISTERED_SUCCESSFULLY'
  | 'ADMIN_CONTROLLER_SELECTED'
  | 'ORGANISATION_SETUP'
  | 'ONE_CSV_FILE_STAFF'
  | 'MULTI_CSV_FILES_STAFF'
  | 'ONE_CSV_FILE_SPONSORED'
  | 'MULTI_CSV_FILES_SPONSORED'
  | 'INVITING_ADMIN_CONTROLLER'
  | 'ONE_CSV_FILE_STAFF_UPLOADED'
  | 'ONE_CSV_FILE_STAFF_MISSING'
  | 'ONE_CSV_FILE_STAFF_EMAIL_DUP'
  | 'ONE_CSV_FILE_STAFF_EMAIL_CONF'
  | 'ONE_CSV_FILE_STAFF_MEMBER_DUP'
  | 'MULTI_CSV_FILES_STAFF_UPLOADED'
  | 'MULTI_CSV_FILE_STAFF_MISSING'
  | 'MULTI_CSV_FILE_STAFF_EMAIL_DUP'
  | 'MULTI_CSV_FILE_STAFF_EMAIL_CONF'
  | 'MULTI_CSV_FILE_STAFF_MEMBER_DUP'
  | 'ONE_CSV_FILE_SPONSORED_UPLOADED'
  | 'ONE_CSV_FILE_SPONSORED_MISSING'
  | 'ONE_CSV_FILE_SPONSORED_EMAIL_DUP'
  | 'ONE_CSV_FILE_SPONSORED_EMAIL_CONF'
  | 'ONE_CSV_FILE_SPONSORED_MEMBER_DUP'
  | 'MULTI_CSV_FILE_SPONSORED_UPLOADED'
  | 'MULTI_CSV_FILE_SPONSORED_MISSING'
  | 'MULTI_CSV_FILE_SPONSORED_EMAIL_DUP'
  | 'MULTI_CSV_FILE_SPONSORED_EMAIL_CONF'
  | 'MULTI_CSV_FILE_SPONSORED_MEMBER_DUP';

export type UserTypesAPI =
  'NOMAD' | 'MEMBER' | 'AUTHORIZED_PERSON' | 'NON_AUTHORIZED_PERSON' | 'GUEST' | 'ADMIN_CONTROLLER' | 'SPONSORED';

export interface UserMicrosystemAPI {
  id: string;
  name: string;
  logo: string;
  position: string;
  userTypes: string[];
  zones: {
    apiEndpoint: string;
    id: string;
    title: string;
    version: string;
  }[];
}

export interface UserEcosystemAPI {
  ecosystem: 'eco_innovation' | 'eco_school' | 'nomad';
  microsystems: UserMicrosystemAPI[];
}

export interface Language {
  createdAt: string;
  disabled: boolean;
  displayName: string;
  icon: string;
  id: string;
  isDefault: boolean;
  isRightToLeft: boolean;
  name: string;
  updatedAt: string;
}

export enum SystemConfigurationEnum {
  THEME = 'THEME',
  TIME_ZONE = 'TIME_ZONE',
  NOTIFICATION = 'NOTIFICATION',
  SIDEBAR = 'SIDEBAR',
  QUICK_LINK = 'QUICK_LINK',
  LANGUAGE = 'LANGUAGE',
}

export interface LoggedInUserAPI {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  languages: Language[];
  ecosystems: UserEcosystemAPI[];
  userConfiguration: {
    // notification: {
    //   Desktop.Message: boolean,
    //   Desktop.Call: boolean
    // },
    language: string;
    sidebar: {
      title: string;
      url: string;
      icon: string;
    }[];
    quickLink: {
      title: string;
      url: string;
      icon: string;
    }[];
    timeZone: {
      countryCode: string;
      tz: string;
      UtcOffset: string;
    };
  };
}
