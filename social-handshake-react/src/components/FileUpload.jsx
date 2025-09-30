import { useState } from 'react';

export default function FileUpload({ onFileProcessed }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        onFileProcessed(data);
      } catch (error) {
        alert('Error reading file. Make sure it\'s a valid JSON file.');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="glass-card">
      <div style={{
        textAlign: 'center',
        padding: '70px 40px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '20px',
        border: '2px dashed rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
        e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
      }}>
        <label htmlFor="fileInput" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '15px',
          padding: '20px 45px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          borderRadius: '16px',
          cursor: 'pointer',
          fontSize: '1.15em',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <span>📁</span>
          <span>Choose Instagram Data File</span>
        </label>
        <input
          type="file"
          id="fileInput"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {fileName && (
          <div style={{
            marginTop: '25px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1em'
          }}>
            Selected: {fileName}
          </div>
        )}
      </div>
    </div>
  );
}