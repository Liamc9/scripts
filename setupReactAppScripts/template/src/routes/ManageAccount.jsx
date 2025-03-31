import React from 'react';
import { EditSettingsTemplate } from 'liamc9npm';

const initialAccountState = {
  email: 'user@example.com',
  language: 'English',
  notifications: true,
};

const sections = [
  {
    title: 'Account Information',
    fields: [
      { name: 'Email Address', type: 'EditableTextField', fieldName: 'email' },
      {
        name: 'Language',
        type: 'SelectField',
        fieldName: 'language',
        options: ['English', 'Spanish', 'French'],
      },
      { name: 'Enable Notifications', type: 'ToggleField', fieldName: 'notifications' },
    ],
  },
];

const ManageAccount = () => {
  const handleSave = (formData) => {
    console.log('Saving account data:', formData);
    alert('Account settings saved!');
  };

  return (
    <EditSettingsTemplate
      headerTitle="Manage Account"
      sections={sections}
      initialValues={initialAccountState}
      onSave={handleSave}
    />
  );
};

export default ManageAccount;