import React from 'react';
import { EditSettingsTemplate } from 'liamc9npm'; // Adjust the import path as needed

const initialFormState = {
  emailNotifications: true,
  pushNotifications: false,
  smsAlerts: false,
  newsletterSubscription: true,
};

const sections = [
  {
    title: 'Notification Preferences',
    fields: [
      { name: 'Email Notifications', type: 'ToggleField', fieldName: 'emailNotifications' },
      { name: 'Push Notifications', type: 'ToggleField', fieldName: 'pushNotifications' },
      { name: 'SMS Alerts', type: 'ToggleField', fieldName: 'smsAlerts' },
      { name: 'Newsletter Subscription', type: 'ToggleField', fieldName: 'newsletterSubscription' },
    ],
  },
];

const ManageNotifications = () => {
  const handleSave = (formData) => {
    console.log('Saving notification settings:', formData);
    alert('Notification settings updated!');
  };

  return (
    <EditSettingsTemplate
      headerTitle="Notification Settings"
      sections={sections}
      initialValues={initialFormState}
      onSave={handleSave}
    />
  );
};

export default ManageNotifications;