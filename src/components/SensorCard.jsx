import React from 'react';
import StatusIndicator from './StatusIndicator';

const SensorCard = ({ title, value, unit, status, color, className = '' }) => {
  return (
    <article className={`hover-card desktop-position absolute rounded-2xl border border-coralDark bg-tealDark p-4 shadow-figma ${className}`}>
      <div className="grid h-full grid-cols-[1fr_68px] gap-6">
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-base font-normal leading-6">{title}:</h2>
          <p className="soft-value mt-5 text-center font-display text-[32px] font-bold leading-none text-white">
            {value} {unit}
          </p>
        </div>
        <StatusIndicator status={status} color={color} />
      </div>
    </article>
  );
};

export default SensorCard;
