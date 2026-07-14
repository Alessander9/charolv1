export function Eyebrow({ children, dark = false }) {
  return (
    <p className={`eyebrow ${dark ? 'dark' : ''}`}>
      <span />
      {children}
    </p>
  );
}
