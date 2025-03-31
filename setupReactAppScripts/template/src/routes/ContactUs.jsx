import React from 'react';
import styled from 'styled-components';
import { FiMessageSquare, FiPhone, FiMapPin } from 'react-icons/fi';

const ContactContainer = styled.div`
  padding: 24px;
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: auto;
`;

const ContactOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
`;

const IconWrapper = styled.div`
  font-size: 24px;
  margin-top: 4px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const Title = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Description = styled.span`
  color: #555;
`;

const ContactUs = () => {
  return (
    <ContactContainer>
      <ContactOption>
        <IconWrapper><FiMessageSquare /></IconWrapper>
        <Info>
          <Title>Chat with us</Title>
          <Description>6:00 - 23:59<br />7 days a week</Description>
        </Info>
      </ContactOption>

      <ContactOption>
        <IconWrapper><FiPhone /></IconWrapper>
        <Info>
          <Title>Call us</Title>
          <Description>
            1800 811 6453<br />
            Products & Orders: 06:00 - 23:59, 7 days a week<br />
            Company Info & Enquiries: 10:00 - 19:00, Monday - Friday
          </Description>
        </Info>
      </ContactOption>

      <ContactOption>
        <IconWrapper><FiMapPin /></IconWrapper>
        <Info>
          <Title>Find a Store</Title>
        </Info>
      </ContactOption>
    </ContactContainer>
  );
};

export default ContactUs;
