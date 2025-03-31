import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 24px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #555;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 16px 0;
`;

const FAQTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
`;

const FAQContent = styled.div`
  margin-top: 12px;
  padding-left: 8px;
  color: #555;
`;

const FAQs = [
  {
    category: 'Returns',
    questions: [
      "What is Nike's return policy?",
      'How do I return my Nike order?',
      'Where is my refund?',
    ],
  },
  { category: 'Dispatch & Delivery', questions: [] },
  { category: 'Orders & Payment', questions: [] },
  { category: 'Shopping', questions: [] },
  { category: 'Nike Membership & Apps', questions: [] },
  { category: 'Company Info', questions: [] },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQContainer>
      <Header>
        <Title>Frequently Asked Questions</Title>
        <Subtitle>
          Answers to our most frequently asked questions are just one click away.
        </Subtitle>
      </Header>

      {FAQs.map((faq, index) => (
        <FAQItem key={index}>
          <FAQTitle onClick={() => handleToggle(index)}>
            {faq.category}
            {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
          </FAQTitle>

          {openIndex === index && faq.questions.length > 0 && (
            <FAQContent>
              {faq.questions.map((question, qIndex) => (
                <div key={qIndex}>{question}</div>
              ))}
              <div style={{ marginTop: '8px', fontWeight: 'bold', cursor: 'pointer' }}>View all</div>
            </FAQContent>
          )}
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQ;
