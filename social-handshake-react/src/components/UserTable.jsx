export default function UserTable({ users, onToggleCheck, onToggleSelect, selectedUsers }) {
  const searchLinkedIn = (username) => {
    const searchUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(username)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="glass-card">
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr>
              <th style={headerStyle}>Select</th>
              <th style={headerStyle}>#</th>
              <th style={headerStyle}>Username</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '1.1em'
                }}>
                  No users found. Try adjusting your filters.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  style={{
                    transition: 'all 0.2s ease',
                    background: selectedUsers.includes(user.id) ? 'rgba(34, 197, 94, 0.1)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = selectedUsers.includes(user.id) 
                      ? 'rgba(34, 197, 94, 0.15)' 
                      : 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = selectedUsers.includes(user.id) 
                      ? 'rgba(34, 197, 94, 0.1)' 
                      : 'transparent';
                  }}
                >
                  <td style={cellStyle}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => onToggleSelect(user.id)}
                      style={{
                        cursor: 'pointer',
                        width: '18px',
                        height: '18px'
                      }}
                    />
                  </td>
                  <td style={cellStyle}>{index + 1}</td>
                  <td style={cellStyle}>
                    <span style={{ fontWeight: '500' }}>@{user.username}</span>
                  </td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => onToggleCheck(user.id)}
                      style={{
                        padding: '6px 16px',
                        background: user.checked 
                          ? 'rgba(34, 197, 94, 0.3)' 
                          : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid ' + (user.checked 
                          ? 'rgba(34, 197, 94, 0.5)' 
                          : 'rgba(255, 255, 255, 0.2)'),
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.85em',
                        fontWeight: '600',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      {user.checked ? '✓ Checked' : 'Mark as Checked'}
                    </button>
                  </td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => searchLinkedIn(user.username)}
                      style={{
                        padding: '10px 24px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '0.9em',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(34, 197, 94, 0.3)';
                        e.target.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Search on LinkedIn
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const headerStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#ffffff',
  padding: '22px 28px',
  textAlign: 'left',
  fontWeight: '700',
  textTransform: 'uppercase',
  fontSize: '0.85em',
  letterSpacing: '2px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
};

const cellStyle = {
  padding: '22px 28px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '1em'
};