import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('CHAROL app error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', padding: '15vh 8vw', background: '#0a0909', color: '#f7f3ed' }}>
          <p>CHAROL KARAOKE RESTOBAR</p>
          <h1>Estamos afinando el escenario.</h1>
          <p>Recarga la página o reserva directamente con nuestro equipo.</p>
          <a href="https://wa.me/51919736348" style={{ color: '#d8a33b' }}>Reservar por WhatsApp</a>
        </main>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);
