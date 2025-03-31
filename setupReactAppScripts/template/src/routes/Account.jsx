// Account.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import AccountView from "../views/AccountView";
import { FiHelpCircle, FiBell, FiLock } from "react-icons/fi";
import { FaRegCreditCard, FaRegUser } from "react-icons/fa";

// CREATE FUNCTION
function Account() {
  const { logout, userData, currentUser } = useAuth(); // Access userData and currentUser from context

  // HTML
  return (
    <div>
      <AccountView
        userData={userData}
        logout={logout}
        currentUser={currentUser}
        settings={[
          {
            category: "Account",
            icon: FaRegUser,
            text: "Manage Account",
            link: `/account/manageaccount/${currentUser.uid}`,
          },
          {
            category: "Account",
            icon: FaRegCreditCard,
            text: "Plans & Billing",
            link: `/account/plansandbilling/${currentUser.uid}`,
          },
          {
            category: "Preferences",
            icon: FiBell,
            text: "Manage Notifications",
            link: `/account/managenotifications/${currentUser.uid}`,
          },
          {
            category: "Preferences",
            icon: FiLock,
            text: "Privacy & Security",
            link: `/account/privacyandsecurity/${currentUser.uid}`,
          },
          {
            category: "Help",
            icon: FiHelpCircle,
            text: "Help & FAQs",
            link: `/account/helpandfaqs`,
          },
        ]}
      />
    </div>
  );
}

export default Account;
