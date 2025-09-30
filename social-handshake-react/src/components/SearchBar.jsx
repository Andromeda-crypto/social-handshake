export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="glass-card">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="🔍 Search usernames..."
        style={{
          width: '100%',
          padding: '20px 28px',
          fontSize: '1.15em',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          color: '#ffffff',
          outline: 'none',
          transition: 'all 0.3s ease'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(34, 197, 94, 0.5)';
          e.target.style.background = 'rgba(255, 255, 255, 0.08)';
          e.target.style.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}