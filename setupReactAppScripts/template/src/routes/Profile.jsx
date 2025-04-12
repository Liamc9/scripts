import React, { useState } from "react";
import ProfileView from "../views/ProfileView"; // Adjust the path as necessary
import { useAuth } from "../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase-config";

const Profile = () => {
  const { currentUser, userData, updateUserData } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const storage = getStorage();
  const navigate = useNavigate();

  const handleSaveChanges = async ({ firstName, newProfilePicFile, profilePic }) => {
    if (!firstName.trim()) {
      toast.error("First name cannot be empty.");
      return;
    }

    try {
      setIsSaving(true);

      let downloadURL = userData?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

      // If a new profile picture is selected, upload it to Firebase Storage
      if (newProfilePicFile) {
        const storageRef = ref(storage, `profile_pictures/${currentUser.uid}/${newProfilePicFile.name}`);
        await uploadBytes(storageRef, newProfilePicFile);
        downloadURL = await getDownloadURL(storageRef);
      }

      const docRef = doc(db, "users", currentUser.uid);

      // Determine if profile is complete
      const isProfileComplete = firstName.trim() !== "" && downloadURL !== "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

      // Update Firestore document
      await updateDoc(docRef, {
        displayName: firstName,
        photoURL: downloadURL,
        profileComplete: isProfileComplete,
      });

      // Update user data in context
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

  return (
    <ProfileView
      handleSaveChanges={handleSaveChanges}
      isSaving={isSaving}
      currentUser={currentUser}
      userData={userData} // Pass user data for initializing state in ProfileView
    />
  );
};

export default Profile;
