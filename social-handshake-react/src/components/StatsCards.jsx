export default function StatsCards({ total, filtered, checked }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '25px',
      marginBottom: '40px'
    }}>
      <StatCard number={total} label="Total Following" />
      <StatCard number={filtered} label="Filtered Results" />
      <StatCard number={checked} label="Checked Off" />
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      padding: '40px',
      borderRadius: '20px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
      e.currentTarget.style.boxShadow = '0 12px 40px rgba(34, 197, 94, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{
        fontSize: '3.5em',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '12px',
        textShadow: '0 0 30px rgba(34, 197, 94, 0.5)'
      }}>
        {number}
      </div>
      <div style={{
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.95em',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontWeight: '600'
      }}>
        {label}
      </div>
    </div>
  );
}