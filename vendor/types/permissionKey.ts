export const PermissionKey = {
  general: {
    calendar: {
      show: 'General.Calendar.Show',
    },
  },
  collaboration: {
    dataContact: {
      show: 'Collaboration.DataContact.Show',
      create: 'Collaboration.DataContact.Create',
      update: 'Collaboration.DataContact.Update',
      delete: 'Collaboration.DataContact.Delete',
    },
    messaging: {
      show: 'Collaboration.Messaging.Show',
      sendMessage: 'Collaboration.Messaging.SendMessage',
      createGroup: 'Collaboration.Messaging.CreateGroup',
    },
    iceContact: {
      show: 'Collaboration.IceContact.Show',
      sendRequest: 'Collaboration.IceContact.SendRequest',
      createCard: 'Collaboration.IceContact.CreateCard',
    },
    collabGroup: {
      show: 'Collaboration.CollabGroup.Show',
      createGroup: 'Collaboration.CollabGroup.CreateGroup',
      invitation: 'Collaboration.CollabGroup.Invitation',
      joinRequest: 'Collaboration.CollabGroup.JoinRequest',
    },
    email: {
      show: 'Collaboration.Email.Show',
      sendEmail: 'Collaboration.Email.SendEmail',
    },
    mi: {
      show: 'Collaboration.MI.Show',
    },
  },
  workflow: {
    itemxxx: {
      show: 'workflow.itemxxx.show',
    },
  },
};

// Create enum from PermissionKey object
export enum PermissionKeyEnum {
  // General
  GENERAL_CALENDAR_SHOW = 'General.Calendar.Show',

  // Collaboration - DataContact
  COLLABORATION_DATA_CONTACT_SHOW = 'Collaboration.DataContact.Show',
  COLLABORATION_DATA_CONTACT_CREATE = 'Collaboration.DataContact.Create',
  COLLABORATION_DATA_CONTACT_UPDATE = 'Collaboration.DataContact.Update',
  COLLABORATION_DATA_CONTACT_DELETE = 'Collaboration.DataContact.Delete',

  // Collaboration - Messaging
  COLLABORATION_MESSAGING_SHOW = 'Collaboration.Messaging.Show',
  COLLABORATION_MESSAGING_SEND_MESSAGE = 'Collaboration.Messaging.SendMessage',
  COLLABORATION_MESSAGING_CREATE_GROUP = 'Collaboration.Messaging.CreateGroup',

  // Collaboration - IceContact
  COLLABORATION_ICE_CONTACT_SHOW = 'Collaboration.IceContact.Show',
  COLLABORATION_ICE_CONTACT_SEND_REQUEST = 'Collaboration.IceContact.SendRequest',
  COLLABORATION_ICE_CONTACT_CREATE_CARD = 'Collaboration.IceContact.CreateCard',

  // Collaboration - CollabGroup
  COLLABORATION_COLLAB_GROUP_SHOW = 'Collaboration.CollabGroup.Show',
  COLLABORATION_COLLAB_GROUP_CREATE_GROUP = 'Collaboration.CollabGroup.CreateGroup',
  COLLABORATION_COLLAB_GROUP_INVITATION = 'Collaboration.CollabGroup.Invitation',
  COLLABORATION_COLLAB_GROUP_JOIN_REQUEST = 'Collaboration.CollabGroup.JoinRequest',

  // Collaboration - Email
  COLLABORATION_EMAIL_SHOW = 'Collaboration.Email.Show',
  COLLABORATION_EMAIL_SEND_EMAIL = 'Collaboration.Email.SendEmail',

  // Collaboration - MI
  COLLABORATION_MI_SHOW = 'Collaboration.MI.Show',

  // Workflow
  WORKFLOW_ITEMXXX_SHOW = 'workflow.itemxxx.show',
}

// Function to flatten user permissions structure
export const flattenUserPermissions = (permissions: any) => {
  const flattened: Record<string, { description: string; reason: string; status: string; value: 'show' | 'disable' }> =
    {};

  // Dynamically flatten all top-level sections
  Object.entries(permissions).forEach(([sectionKey, sectionValue]: [string, any]) => {
    if (typeof sectionValue === 'object' && sectionValue !== null) {
      Object.entries(sectionValue).forEach(([permissionKey, permissionValue]: [string, any]) => {
        flattened[permissionKey] = permissionValue;
      });
    }
  });

  return flattened;
};
