import React from 'react';

const FeedingScreen = ({ feedingCountdown, nextFeeding, foodLevel }) => {
  const nextFeedTime = nextFeeding ? nextFeeding.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
  const daysLeft = Math.floor((100 * foodLevel / 100) / 4.5);
  const isFoodCritical = foodLevel < 20;

  const options = { day: 'numeric', month: 'short' };
  const today = new Date().toLocaleDateString('en-US', options);
  const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('en-US', options);
  const dayAfter = new Date(Date.now() + 172800000).toLocaleDateString('en-US', options);

  return (
    <section id="feeding" className="screen desktop-grid">
      <article className="hover-card desktop-position absolute left-[130px] top-[56px] h-64 w-[480px] rounded-2xl border border-coralDark bg-tealDark px-9 py-6 shadow-figma">
        <h1 className="font-display text-[32px] font-bold leading-tight">To the next feeding left:</h1>
        <div className="mt-8 grid grid-cols-[1fr_200px] items-center">
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

      <article className="desktop-position absolute left-[626px] top-[56px] h-64 w-[456px] rounded-2xl border border-coralDark bg-tealDark px-10 py-6 shadow-figma">
        <h1 className="text-center font-display text-[32px] font-bold leading-tight text-white">Feed dispenser level:</h1>
        <div className="mt-6 flex items-center justify-center gap-8">
          <div className="relative h-20 w-12 rounded-lg border-2 border-coralDark bg-tealBase p-1 overflow-hidden">
            <div
              className="absolute bottom-1 left-1 right-1 rounded-md transition-all duration-500"
              style={{ height: `calc(${foodLevel}% - 8px)`, backgroundColor: isFoodCritical ? '#8B3A1E' : '#FF7F50' }}
            ></div>
          </div>
          <p className="font-display soft-value text-[64px] font-bold leading-none text-white select-none">{foodLevel} %</p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6 text-base font-normal leading-6 text-white">
          <span>Status:</span>
          <span>{isFoodCritical ? `Critical! Only ${daysLeft} days left` : `Enough for ${daysLeft} days`}</span>
        </div>
      </article>

      <article className="desktop-position absolute left-[130px] top-[368px] h-[600px] w-[952px] rounded-2xl border border-coralDark bg-tealDark p-8 shadow-figma">
        <h1 className="text-center font-display text-[32px] font-bold leading-tight">Feeding schedule</h1>
        <div className="relative mx-auto mt-14 h-[430px] w-[800px]">
          <div className="absolute left-[72px] top-0 h-[360px] w-1 bg-white"></div>
          <div className="absolute bottom-[70px] left-[72px] h-1 w-[730px] bg-white"></div>
          <div className="absolute left-0 top-[-10px] w-14 text-right text-base font-normal">2.0 g</div>
          <div className="absolute left-0 top-[88px] w-14 text-right text-base font-normal">1.5 g</div>
          <div className="absolute left-0 top-[188px] w-14 text-right text-base font-normal">1.0 g</div>
          <div className="absolute left-0 top-[288px] w-14 text-right text-base font-normal">0.5 g</div>

          {[
            { left: 120, top: 180, h: 180 }, { left: 200, top: 0, h: 360 }, { left: 280, top: 90, h: 270 },
            { left: 360, top: 180, h: 180 }, { left: 440, top: 0, h: 360 }, { left: 520, top: 90, h: 270 },
            { left: 600, top: 180, h: 180 }, { left: 680, top: 0, h: 360 }, { left: 760, top: 90, h: 270 }
          ].map((bar, i) => (
            <div key={i} className="absolute w-6 bg-coral" style={{ left: `${bar.left}px`, top: `${bar.top}px`, height: `${bar.h}px`, boxShadow: '4px -4px 4px rgba(0, 0, 0, 0.25)' }}></div>
          ))}

          <div className="absolute bottom-0 left-[96px] grid w-[720px] grid-cols-9 text-center text-base font-normal leading-6">
            <span>11:00<br />{today}</span><span>16:00<br />{today}</span><span>21:00<br />{today}</span>
            <span>11:00<br />{tomorrow}</span><span>16:00<br />{tomorrow}</span><span>21:00<br />{tomorrow}</span>
            <span>11:00<br />{dayAfter}</span><span>16:00<br />{dayAfter}</span><span>21:00<br />{dayAfter}</span>
          </div>
        </div>
      </article>
    </section>
  );
};

export default FeedingScreen;
