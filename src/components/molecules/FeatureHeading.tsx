import React from 'react';
import { GradientText } from '../atoms/GradientText';

interface FeatureHeadingProps {
  number: string;
  title: string;
}

export const FeatureHeading: React.FC<FeatureHeadingProps> = ({ number, title }) => {
  return (
    <div className="space-y-2">
      <span className="text-blue-400 font-bold text-lg">{number}</span>
      <h3 className="text-2xl font-bold text-white">
        <GradientText>{title}</GradientText>
      </h3>
    </div>
  );
};
