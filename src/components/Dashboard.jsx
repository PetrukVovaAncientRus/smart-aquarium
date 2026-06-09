import React from 'react';
import SensorCard from './SensorCard';

const Dashboard = ({
  temperature, ph, filterWear, lightOn,
  tempStatus, phStatus, toggleLight,
  feedingCountdown, nextFeeding
}) => {
  const isFilterDanger = filterWear >= 80;
  const nextFeedTime = nextFeeding ? nextFeeding.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';

  return (
    <section id="dashboard" className="screen desktop-grid">
      <SensorCard
        title="Water Temperature"
        value={temperature}
        unit="°C"
        status={tempStatus.status}
        color={tempStatus.color}
        className="left-[130px] top-[56px] w-[296px] h-36"
      />

      <SensorCard
        title="Acidity of the pH"
        value={ph}
        unit="pH"
        status={phStatus.status}
        color={phStatus.color}
        className="left-[710px] top-[56px] w-[296px] h-36"
      />

      <article className="desktop-position absolute left-[130px] top-[360px] flex h-[104px] w-[max] whitespace-nowrap items-center gap-6 rounded-2xl border border-coralDark bg-tealDark p-6 shadow-figma">
        <span className="h-4 w-4 rounded-full" style={{ backgroundColor: isFilterDanger ? "#FF0000" : "#39FF14" }}></span>
        <h2 className="text-base font-normal leading-6">
          {isFilterDanger ? "Need to clean the filter" : "Filter is good"}
        </h2>
      </article>

      <article
        onClick={toggleLight}
        className="light-card cursor-pointer select-none absolute left-[712px] top-[360px] flex h-[104px] w-[209px] items-center gap-6 rounded-2xl border border-coralDark bg-tealDark p-6 shadow-figma"
      >
        <span className={`light-dot h-4 w-4 rounded-full shrink-0 ${lightOn ? 'is-on' : ''}`}></span>
        <h2 className="text-base font-normal leading-6 text-gray-200">Light:</h2>
        <p className="font-display text-[32px] font-bold leading-none text-white/70">{lightOn ? 'ON' : 'OFF'}</p>
      </article>

      <article className="hover-card desktop-position absolute left-[348px] top-[624px] h-64 w-[480px] rounded-2xl border border-coralDark bg-tealDark px-9 py-6 shadow-figma">
        <h1 className="font-display text-[32px] font-bold leading-tight">Feeding schedule:</h1>
        <div className="mt-6 grid grid-cols-[1fr_200px] items-center">
          <p className="text-base font-normal leading-6">To the next feeding left:</p>
          <div className="flex h-16 w-56 items-center justify-center rounded-lg border border-coralDark bg-tealDark shadow-figma">
            <p className="soft-value font-display text-[32px] font-bold leading-none text-white">{feedingCountdown}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-6">
          <p className="w-[124px] text-base font-normal leading-6">Next feeding at:</p>
          <div className="flex h-10 w-[55px] items-center justify-center rounded-lg border border-coralDark bg-tealDark shadow-figma">
            <p className="text-base font-normal leading-6">{nextFeedTime}</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
