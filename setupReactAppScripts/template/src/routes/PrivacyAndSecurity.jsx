import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import { EditSettingsTemplate } from 'liamc9npm';

const LoadingMessage = styled.div`
  padding: 16px;
  font-size: 1.25rem;
  color: #666;
  text-align: center;
`;

// Define default values for the privacy settings form
const defaultPrivacyState = {
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
        name: 'Two-Factor Authentication',
        type: 'ToggleField',
        fieldName: 'twoFactorAuth',
      },
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
  const { userData, updateUserData } = useAuth();

  // Wait until userData is loaded
  if (!userData) {
    return <LoadingMessage>Loading user data...</LoadingMessage>;
  }

  // Use Firestore data if available; otherwise, fallback to default values.
  const initialPrivacyState = {
    twoFactorAuth:
      userData.twoFactorAuth !== undefined
        ? userData.twoFactorAuth
        : defaultPrivacyState.twoFactorAuth,
    locationTracking:
      userData.locationTracking !== undefined
        ? userData.locationTracking
        : defaultPrivacyState.locationTracking,
    dataSharing:
      userData.dataSharing !== undefined
        ? userData.dataSharing
        : defaultPrivacyState.dataSharing,
    adPersonalization:
      userData.adPersonalization !== undefined
        ? userData.adPersonalization
        : defaultPrivacyState.adPersonalization,
    // For security reasons, the password field is always empty initially.
    password: '',
  };

  // Handle form save action and update the settings accordingly using the firebase hook.
  const handleSave = async (formData) => {
    // Process the password field to indicate if it was updated.
    const updatedData = {
      ...formData,
      password: formData.password ? '(Updated)' : '(Unchanged)',
    };

    try {
      await updateUserData(updatedData);
      console.log('Privacy & Security settings updated successfully:', updatedData);
    } catch (error) {
      console.error('Failed to update Privacy & Security settings:', error);
    }
  };

  return (
    <EditSettingsTemplate
      headerTitle="Privacy & Security"
      sections={sections}
      initialValues={initialPrivacyState}
      onSave={handleSave}
      toggleColor="#00e48b"
    />
  );
};

export default PrivacyAndSecurity;
