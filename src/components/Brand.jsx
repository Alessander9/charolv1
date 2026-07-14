export function Brand({ className = '' }) {
  return (
    <span className={`brand-word ${className}`.trim()}>
      <img src="/charol-blanco-sin-fondo.png" alt="Charol" />
    </span>
  );
}
