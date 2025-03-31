import React from 'react';
import {EditSettingsTemplate} from 'liamc9npm';

const initialPrivacyState = {
  twoFactorAuth: true,
  locationTracking: false,
  dataSharing: false,
  adPersonalization: true,
  password: '',
};

const sections = [
  {
    title: 'Privacy Settings',
    fields: [
      {
        name: 'Two-Factor Authentication',
        type: 'ToggleField',
        fieldName: 'twoFactorAuth',
      },
      {
        name: 'Allow Location Tracking',
        type: 'ToggleField',
        fieldName: 'locationTracking',
      },
      {
        name: 'Share Usage Data',
        type: 'ToggleField',
        fieldName: 'dataSharing',
      },
      {
        name: 'Personalized Ads',
        type: 'ToggleField',
        fieldName: 'adPersonalization',
      },
    ],
  },
  {
    title: 'Security',
    fields: [
      {
        name: 'Change Password',
        type: 'EditableTextField',
        fieldName: 'password',
        inputType: 'password',
        placeholder: 'Enter new password',
      },
    ],
  },
];

const PrivacyAndSecurity = () => {
  const handleSave = (formData) => {
    const updatedForm = {
      ...formData,
      password: formData.password ? '(Updated)' : '(Unchanged)',
    };
    console.log('Saving Privacy & Security Settings:', updatedForm);
    alert('Privacy & Security settings updated.');
  };

  return (
    <EditSettingsTemplate
      headerTitle="Privacy & Security"
      sections={sections}
      initialValues={initialPrivacyState}
      onSave={handleSave}
    />
  );
};

export default PrivacyAndSecurity;