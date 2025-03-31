import React from 'react';
import { FiPhone, FiHelpCircle } from 'react-icons/fi';
import { SettingsTemplate } from 'liamc9npm';

const HelpAndFAQs = () => {

  const settings = [
    {
      category: 'Support Options',
      icon: FiPhone,
      text: 'Contact Us',
      link: './contactus',
    },
    {
      category: 'Support Options',
      icon: FiHelpCircle,
      text: 'Browse FAQs',
      link: './faqs',
    },
  ];

  return (
    <SettingsTemplate
      headerTitle="Get Support"
      settings={settings}
    />
  );
};

export default HelpAndFAQs;
