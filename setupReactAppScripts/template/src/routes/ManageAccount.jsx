/***************************************
 * src/components/ManageAccount.js
 ***************************************/
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import { EditSettingsTemplate, Modal, DeleteCard } from 'liamc9npm';
import { toast } from 'react-toastify';

const LoadingMessage = styled.div`
  padding: 16px;
  font-size: 1.25rem;
  color: #666;
  text-align: center;
`;

// We’ll reuse the same button style from your ProfileView for Delete.
const DeleteButton = styled.button`
  padding: 10px;
  font-size: 1rem;
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 400px;

  &:hover {
    background-color: #c0392b;
  }
`;

/** Define default values for the account settings form */
const defaultAccountState = {
  email: 'user@example.com',
  language: 'English',
  notifications: true,
};

/** The sections for EditSettingsTemplate */
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
  // Pull userData, the updateUserData function, currentUser, and logout from Auth
  const { currentUser, userData, updateUserData, logout } = useAuth();

  // Local state to control the delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Display a loading message until userData is loaded
  if (!userData) {
    return <LoadingMessage>Loading user data...</LoadingMessage>;
  }

  // Use Firestore data if available; otherwise, fallback to default values.
  const initialAccountState = {
    email: userData.email || defaultAccountState.email,
    language: userData.language || defaultAccountState.language,
    notifications:
      userData.notifications !== undefined
        ? userData.notifications
        : defaultAccountState.notifications,
  };

  // Handle form save action and update the Firestore data using the firebase hook.
  const handleSave = async (formData) => {
    try {
      await updateUserData(formData);
      console.log('Account data updated successfully:', formData);
      toast.success('Account settings saved!');
    } catch (error) {
      console.error('Failed to update account settings:', error);
      toast.error('Failed to update account settings.');
    }
  };

  // Display the Delete Account modal
  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  // Cancel account deletion (close modal)
  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  /**
   * confirmDeleteAccount
   * 
   * This is copied from your Profile code so the same re-auth + delete logic is used.
   * You can also call a custom "deleteAccount" method from the context if you prefer.
   */
  const confirmDeleteAccount = async () => {
    try {
      // Re-auth logic and actual deletion
      const user = currentUser;
      if (!user) {
        throw new Error('No authenticated user found.');
      }

      const providerData = user.providerData;
      if (providerData.length === 0) {
        throw new Error('No provider data available.');
      }

      const providerId = providerData[0].providerId;

      // Re-authenticate the user based on their sign-in provider
      if (providerId === 'google.com') {
        // If using Google, do a popup reauth. Import from 'firebase/auth' if needed
        // e.g., new GoogleAuthProvider(), reauthenticateWithPopup(...)
        throw new Error('Sample code – implement your re-auth logic here');
      } else {
        // If using email/password, do reauthenticate with credential
        throw new Error(`Unsupported provider: ${providerId}`);
      }

      // Once re-auth is successful, delete the user
      // e.g., await deleteUser(user);

      // Then log out the user (optional), toast, and redirect
      await logout();
      toast.success('Account deleted successfully.');
      // navigate('/login'); // If you need to redirect, import/use React Router
    } catch (error) {
      console.error('Failed to delete account:', error);
      if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/requires-recent-login') {
        toast.error('Please re-authenticate to delete your account.');
      } else if (error.message.includes('Unsupported provider')) {
        toast.error(error.message);
      } else {
        toast.error('Failed to delete account. Please try again later.');
      }
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      {/* The EditSettingsTemplate for updating basic account info */}
      <EditSettingsTemplate
        headerTitle="Manage Account"
        sections={sections}
        initialValues={initialAccountState}
        onSave={handleSave}
      />

      {/* New Delete Account button */}
      <DeleteButton onClick={handleDeleteAccount}>
        Delete Account
      </DeleteButton>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          isModalOpen={showDeleteModal}
          closeModal={cancelDeleteAccount}
          animate={true}
        >
          <DeleteCard
            onCancel={cancelDeleteAccount}
            onConfirm={confirmDeleteAccount}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageAccount;
