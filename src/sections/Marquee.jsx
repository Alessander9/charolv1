import { Icon } from '../components/Icon';

export function Marquee() {
  const icons = ['mic', 'flame', 'utensils', 'glass', 'sparkle', 'users'];
  return <div className="marquee" aria-label="Karaoke, brasas, piqueos, tragos, shows y celebraciones"><div className="marquee-track" aria-hidden="true">{[...icons, ...icons].map((icon, i) => <span key={i}><Icon name={icon} size={36} /><b>+</b></span>)}</div></div>;
}
