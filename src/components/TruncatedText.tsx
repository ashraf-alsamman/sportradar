import React, { FC } from 'react';

interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

const TruncatedText: FC<TruncatedTextProps> = ({ text, maxLength }) => {
  const truncatedText = text.slice(0, maxLength);

  return (
    <p>{truncatedText}</p>
  );
};

export default TruncatedText;
