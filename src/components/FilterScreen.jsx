import React from 'react';

const FilterScreen = ({ filterWear, cleanFilter }) => {
  const isDanger = filterWear >= 80;
  const textColor = isDanger ? "#8B3A1E" : "#FFFFFF";
  const strokeColor = isDanger ? "#8B3A1E" : "#FF7F50";
  const maxCircleLength = 251.2;
  const offset = maxCircleLength - (filterWear / 100) * maxCircleLength;

  return (
    <section id="filter" className="screen desktop-grid">
      <article className="desktop-position absolute left-[130px] top-[56px] h-[912px] w-[1000px] overflow-hidden rounded-2xl border border-coralDark bg-tealDark/90 p-0 shadow-figma">
        <h1 className="absolute left-0 right-0 top-9 text-center font-display text-[32px] font-bold leading-tight">Filter status</h1>
        <p className="absolute left-[215px] top-[98px] text-base font-normal leading-6">Wear Filter:</p>
        <div className="absolute left-[56px] top-[140px] h-[420px] w-[420px] flex items-center justify-center">
          <div className="relative flex items-center justify-center h-[420px] w-[420px]">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#004D4D" stroke-width="8" fill="transparent" />
              <circle
                className="filterCircle" cx="50" cy="50" r="40" stroke={strokeColor} stroke-width="8" fill="transparent"
                strokeDasharray="251.2" strokeDashoffset={offset} strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease' }}
              />
            </svg>
            <p id="filterPercent" className="absolute font-display text-[64px] font-bold leading-none select-none" style={{ color: textColor }}>
              {filterWear}%
            </p>
          </div>
        </div>
        <div className="absolute left-[176px] top-[560px] flex items-center gap-6 text-base font-normal leading-6">
          <span>Status:</span>
          <span>{isDanger ? "Need to clean filter" : "Filter is good"}</span>
        </div>
        <p className="absolute left-[658px] top-[98px] text-base font-normal leading-6">Flow Rate / Pumping:</p>
        <div className="hover-card absolute left-[540px] top-[230px] h-[200px] w-[400px] rounded-2xl border border-coralDark bg-tealDark/80 px-14 py-7 shadow-figma">
          <p className="text-center text-base font-normal leading-6">Filtration speed:</p>
          <p className="soft-value mt-6 text-center font-display text-[32px] font-bold leading-tight">448.3 liters / hour</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-base font-normal leading-6 w-full">
            <span>Status:</span>
            <span>The pump works stably.</span>
          </div>
        </div>
        <button
          onClick={cleanFilter}
          className="cleanFilterBtn absolute left-[620px] top-[496px] rounded-xl bg-coral px-8 py-4 font-display text-[32px] font-bold text-verydarkCoral leading-6 shadow-figma"
        >
          Clean Filter
        </button>
        <div className="absolute left-[58px] top-[650px] grid h-[224px] w-[872px] grid-cols-[repeat(4,1fr)] grid-rows-3 rounded-2xl border border-coralDark bg-tealDark/45 shadow-figma">
          <div className="flex items-center px-4 text-base font-normal leading-6">Ceramic rings - Status:</div>
          <div className="flex items-center px-4 text-base font-normal leading-6">Maintenance-free</div>
          <div className="flex items-center px-4 text-base font-normal leading-6">Bio-Balls (Substrate) - Status:</div>
          <div className="flex items-center px-4 text-base font-normal leading-6">Biobalance Normal</div>
          <div className="flex items-center px-4 text-base font-normal leading-6">Large-pore sponge - Status:</div>
          <div className="flex items-center px-4 text-base font-normal leading-6">Maintenance-free</div>
          <div className="flex items-center px-4 text-base font-normal leading-6">Activated Carbon - Status:</div>
          <div className="flex items-center px-4 text-base font-normal leading-6">Replacement Required!</div>
          <div className="flex items-center px-4 text-base font-normal leading-6">Synthetic Pads - Status:</div>
          <div className="col-span-2 flex items-center px-4 text-base font-normal leading-6">No replacement required</div>
        </div>
      </article>
    </section>
  );
};

export default FilterScreen;
