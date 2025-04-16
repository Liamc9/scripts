import React, { useState } from "react";
import ProfileView from "../views/ProfileView"; // Adjust the path as necessary
import { useAuth } from "../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase-config";

const Profile = () => {
  const { currentUser, userData, updateUserData } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const storage = getStorage();

  // ------------------- READ FUNCTIONS --------------------


  // ------------------- WRITE FUNCTIONS --------------------
  // This function handles profile updates, such as uploading a profile picture and updating Firestore.
  const handleSaveChanges = async ({ firstName, newProfilePicFile, profilePic }) => {
    // Validate the required first name field.
    if (!firstName.trim()) {
      toast.error("First name cannot be empty.");
      return;
    }

    try {
      setIsSaving(true);

      // Set the default download URL using the current photo or a fallback default URL.
      let downloadURL =
        userData?.photoURL ||
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

      // If a new profile picture is provided, upload it to Firebase Storage and retrieve its URL.
      if (newProfilePicFile) {
        const storageRef = ref(
          storage,
          `profile_pictures/${currentUser.uid}/${newProfilePicFile.name}`
        );
        await uploadBytes(storageRef, newProfilePicFile);
        downloadURL = await getDownloadURL(storageRef);
      }

      // Determine if the profile is complete (non-empty first name and a non-default photo).
      const isProfileComplete =
        firstName.trim() !== "" &&
        downloadURL !==
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

      // Update the authentication context with the new user data.
      await updateUserData({
        displayName: firstName,
        photoURL: downloadURL,
        profileComplete: isProfileComplete,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // ------------------- DELETE FUNCTIONS --------------------

  // ------------------- OTHER FUNCTIONS --------------------

  return (
    <ProfileView
      handleSaveChanges={handleSaveChanges}
      isSaving={isSaving}
      currentUser={currentUser}
      userData={userData} // Pass user data for initializing state in ProfileView.
    />
  );
};

export default Profile;
