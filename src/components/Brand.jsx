export function Brand({ className = '' }) {
  return (
    <span className={`brand-word ${className}`.trim()}>
      <img src="/charol.png" alt="Charol" />
    </span>
  );
}
