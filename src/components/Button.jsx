import { WA } from '../data/contact';
import { Icon } from './Icon';

export function Button({ children, href = WA, kind = 'red' }) {
  return (
    <a
      className={`button button-${kind}`}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
    >
      {children}
      <Icon name="arrow" />
    </a>
  );
}
