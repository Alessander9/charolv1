import { useState, useEffect, useCallback, useRef } from 'react';
import { Icon } from '../components/Icon';

function buildCalendar(year, month, eventDates) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks = [];
  let day = 1;
  // Convert event dates to a set of day numbers for quick lookup
  const eventSet = new Set(
    eventDates
      .filter(d => d.getMonth() === month && d.getFullYear() === year)
      .map(d => d.getDate())
  );
  // If partial first week, fill from prev month
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon first
  for (let r = 0; r < 6; r++) {
    const row = [];
    for (let c = 0; c < 7; c++) {
      if ((r === 0 && c < startOffset) || day > daysInMonth) {
        row.push(null);
      } else {
        row.push({ day, isEvent: eventSet.has(day) });
        day++;
      }
    }
    weeks.push(row);
    if (day > daysInMonth) break;
  }
  return { weeks, month, year };
}

const MONTHS = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SETIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
];

const DAYS = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

// Sample upcoming events
const UPCOMING_EVENTS = [
  { date: new Date(2026, 7, 8), title: '🎸 Noche de Rock', desc: 'Tributo a Queen + bandas invitadas' },
  { date: new Date(2026, 7, 15), title: '🇵🇪 Música Criolla', desc: 'Guitarras y jarana con Los Criollos' },
  { date: new Date(2026, 7, 22), title: '🎤 Shows Tributo', desc: 'Homenaje a Soda Stereo' },
  { date: new Date(2026, 7, 29), title: '🎶 Artistas Invitados', desc: 'Noche de talento emergente' },
  { date: new Date(2026, 8, 5), title: '🥁 Noche de Rock', desc: 'Bandas locales en vivo' },
];

// Build a day -> event lookup: key = "{month}-{day}"
const DAY_EVENTS_MAP = {};
UPCOMING_EVENTS.forEach(ev => {
  const key = `${ev.date.getMonth()}-${ev.date.getDate()}`;
  DAY_EVENTS_MAP[key] = { title: ev.title, desc: ev.desc };
});

export function Event() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const today = new Date(2026, 6, 14); // per system date
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const closeTimerRef = useRef(null);

  const closeCalendar = useCallback(() => {
    setShowCalendar(false);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setShowCalendar(false), 400);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Close on scroll
  useEffect(() => {
    if (!showCalendar) return;
    const handler = () => closeCalendar();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [showCalendar, closeCalendar]);

  // Close on Escape
  useEffect(() => {
    if (!showCalendar) return;
    const handler = (e) => { if (e.key === 'Escape') closeCalendar(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showCalendar, closeCalendar]);

  const eventDates = UPCOMING_EVENTS.map(e => e.date);
  const { weeks } = buildCalendar(calYear, calMonth, eventDates);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const goToday = () => {
    setCalMonth(today.getMonth());
    setCalYear(today.getFullYear());
  };

  return (
    <section id="eventos" className="event section">
      <div className="event-image">
        <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1800&q=90" alt="Show musical con luces rojas" />
      </div>
      <div className="event-overlay" />
      <div className="wrap event-content">
        <div className="event-eyebrow">
          <span className="event-dash">—</span>
          <span className="event-dash">—</span>
          PRÓXIMAMENTE
          <span className="event-dash">—</span>
          <span className="event-dash">—</span>
        </div>
        <div className="event-subtitle">AGENDA EN PREPARACIÓN</div>
        <h2>LA PRÓXIMA <em>NOCHE ES TUYA.</em></h2>
        <p>Shows tributo, noches de rock, música criolla y artistas invitados. Conoce la próxima fecha en nuestras redes.</p>

        {/* Calendar trigger button */}
        <button
          className="event-btn"
          type="button"
          onMouseEnter={() => setShowCalendar(true)}
          aria-haspopup="dialog"
          aria-expanded={showCalendar}
        >
          <span>VER MÁS</span>
          <Icon name="arrow-right" size={18} />
        </button>

        {/* Calendar Modal */}
        {showCalendar && (
          <div
            className="event-cal-modal"
            onMouseLeave={scheduleClose}
            onMouseEnter={cancelClose}
            role="dialog"
            aria-label="Calendario de eventos"
          >
            <div className="event-cal-backdrop" />
            <div className="event-cal-card">
              {/* Header */}
              <div className="event-cal-header">
                <button className="event-cal-nav" onClick={prevMonth} aria-label="Mes anterior">
                  <Icon name="arrow-left" size={18} />
                </button>
                <button className="event-cal-title-btn" onClick={goToday} title="Ir al mes actual">
                  <span className="event-cal-month">{MONTHS[calMonth]}</span>
                  <span className="event-cal-year">{calYear}</span>
                </button>
                <button className="event-cal-nav" onClick={nextMonth} aria-label="Mes siguiente">
                  <Icon name="arrow-right" size={18} />
                </button>
              </div>

              {/* Day names */}
              <div className="event-cal-days">
                {DAYS.map(d => <span key={d} className="event-cal-day-name">{d}</span>)}
              </div>

              {/* Calendar grid */}
              <div className="event-cal-grid">
                {weeks.flat().map((cell, i) => {
                  const evKey = cell ? `${calMonth}-${cell.day}` : null;
                  const evData = evKey && DAY_EVENTS_MAP[evKey];
                  return cell ? (
                    <span
                      key={i}
                      className={`event-cal-cell${cell.isEvent ? ' has-event' : ''}${cell.day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear() ? ' is-today' : ''}`}
                      onMouseEnter={() => cell.isEvent && setHoveredDay(cell.day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {cell.day}
                      {cell.isEvent && <span className="event-cal-dot" />}
                      {hoveredDay === cell.day && evData && (
                        <div className="event-cal-tooltip">
                          <strong>{evData.title}</strong>
                          <span>{evData.desc}</span>
                        </div>
                      )}
                    </span>
                  ) : (
                    <span key={i} className="event-cal-cell empty" />
                  );
                })}
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
