import React from 'react';
import SensorCard from './SensorCard';

const PhScreen = ({ ph, phStatus }) => {
  const totalCells = 15;
  const targetPercent = ((ph + 0.5) / totalCells) * 100;

  return (
    <section id="ph" className="screen desktop-grid">
      <article className="desktop-position absolute left-[130px] top-[56px] flex h-[314px] w-[376px] flex-col items-center justify-center gap-10 rounded-2xl border border-coralDark bg-tealDark p-10 shadow-figma">
        <h2 className="text-center text-base font-normal leading-6">Ideal pH value:</h2>
        <p className="font-display text-[32px] font-bold leading-none">6.8 - 7.5 pH</p>
        <div className="h-24 w-[296px] rounded-2xl border border-coralDark bg-tealDark p-6 shadow-figma">
          <div className="flex h-6 overflow-hidden rounded-xl">
            <span className="w-[34%] bg-bad"></span>
            <span className="w-[28%] bg-good"></span>
            <span className="w-[38%] bg-bad"></span>
          </div>
          <div className="mt-2 flex justify-around text-base font-normal">
            <span>Acidic</span><span>Neutral</span><span>Alkaline</span>
          </div>
        </div>
      </article>

      <SensorCard
        title="Acidity of the pH now"
        value={ph}
        unit="pH"
        status={phStatus.status}
        color={phStatus.color}
        className="left-[632px] top-[144px] w-[296px] h-36"
      />

      <article className="desktop-position absolute left-[130px] top-[512px] h-[352px] w-[752px] rounded-2xl border border-coralDark bg-tealDark p-8 shadow-figma">
        <p className="whitespace-pre-line text-base font-normal leading-6">
          Normal (Ideal Balance): 6.8 - 7.5 pH. This is a neutral, slightly alkaline environment that most fish and plants thrive in.
          Critical pH (Acidosis): 6.0 pH and below, where the scale is on the left. The water becomes too acidic, and the protective mucus on the fish is destroyed.
          Critical Alkalinity (Alkalosis): 8.5 pH and above, where the scale is on the right. The water is too alkaline, causing gill damage.
        </p>
        <div className="relative mx-auto mt-10 h-20 w-[640px] max-w-full">
          <div className="absolute left-0 right-0 top-6 h-8 rounded-2xl border border-coralDark bg-tealBase shadow-figma"></div>
          <div
            className="pHPointer absolute top-0 text-xl text-coral leading-none z-10"
            style={{ transition: 'left 0.3s ease', transform: 'translateX(-50%)', left: `${targetPercent}%` }}
          >
            ▼
          </div>
          <div className="absolute left-0 right-0 top-6 h-8 rounded-2xl border border-coralDark bg-tealBase shadow-figma overflow-hidden">
            <div className="grid h-full grid-cols-14 text-center pointer-events-none">
              {[...Array(13)].map((_, i) => (
                <div key={i} className="h-full border-r border-coralDark/40"></div>
              ))}
              <div className="h-full"></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-center text-base font-normal leading-none px-1 text-gray-300">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(val => (
              <span key={val} className="w-4 text-center">{val}</span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

export default PhScreen;
