import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import { EditSettingsTemplate } from 'liamc9npm'; // Adjust the import path as needed

const LoadingMessage = styled.div`
  padding: 16px;
  font-size: 1.25rem;
  color: #666;
  text-align: center;
`;

// Define default values for the form
const defaultFormState = {
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
  const { userData, updateUserData } = useAuth();

  // Wait until userData is loaded
  if (!userData) {
    return <LoadingMessage>Loading user data...</LoadingMessage>;
  }

  // Use firebase data if available; otherwise, fallback to default values
  const initialFormState = {
    emailNotifications:
      userData.emailNotifications !== undefined
        ? userData.emailNotifications
        : defaultFormState.emailNotifications,
    pushNotifications:
      userData.pushNotifications !== undefined
        ? userData.pushNotifications
        : defaultFormState.pushNotifications,
    smsAlerts:
      userData.smsAlerts !== undefined
        ? userData.smsAlerts
        : defaultFormState.smsAlerts,
    newsletterSubscription:
      userData.newsletterSubscription !== undefined
        ? userData.newsletterSubscription
        : defaultFormState.newsletterSubscription,
  };

  const handleSave = async (formData) => {
    try {
      // Update the user data in Firestore with the new notification settings
      await updateUserData(formData);
      console.log('Notification settings updated successfully:', formData);
    } catch (error) {
      console.error('Failed to update notification settings:', error);
    }
  };

  return (
    <EditSettingsTemplate
      headerTitle="Notification Settings"
      sections={sections}
      initialValues={initialFormState}
      onSave={handleSave}
      toggleColor="#00e48b"
    />
  );
};

export default ManageNotifications;
