export default function FilterBar({ 
  showOnlyUnchecked, 
  onToggleUnchecked, 
  sortBy, 
  onSortChange,
  selectedCount,
  onSelectAll,
  onDeselectAll,
  onBulkOpen
}) {
  return (
    <div className="glass-card" style={{ padding: '30px' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left side - filters */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            padding: '10px 20px',
            background: showOnlyUnchecked ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid ' + (showOnlyUnchecked ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255, 255, 255, 0.2)'),
            transition: 'all 0.3s ease'
          }}>
            <input
              type="checkbox"
              checked={showOnlyUnchecked}
              onChange={(e) => onToggleUnchecked(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span>Show Only Unchecked</span>
          </label>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.95em',
              outline: 'none'
            }}
          >
            <option value="alphabetical">Sort A-Z</option>
            <option value="reverse">Sort Z-A</option>
            <option value="checked-first">Checked First</option>
            <option value="unchecked-first">Unchecked First</option>
          </select>
        </div>

        {/* Right side - bulk actions */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onSelectAll}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.9em',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(34, 197, 94, 0.2)';
              e.target.style.borderColor = 'rgba(34, 197, 94, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Select All
          </button>

          <button
            onClick={onDeselectAll}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.9em',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            Deselect All
          </button>

          {selectedCount > 0 && (
            <button
              onClick={onBulkOpen}
              style={{
                padding: '10px 20px',
                background: 'rgba(34, 197, 94, 0.3)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9em',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(34, 197, 94, 0.5)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(34, 197, 94, 0.3)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Open {selectedCount} in LinkedIn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}