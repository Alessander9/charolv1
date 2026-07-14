export function Marquee() {
  const w = ['Karaoke', 'Brasas', 'Piqueos', 'Tragos', 'Shows', 'Celebraciones'];
  return <div className="marquee" aria-label="Karaoke, brasas, piqueos, tragos, shows y celebraciones"><div className="marquee-track" aria-hidden="true">{[...w, ...w].map((x, i) => <span key={i}>{x}<b>\u2726</b></span>)}</div></div>;
}
