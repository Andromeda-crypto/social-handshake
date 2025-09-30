import { useState, useEffect } from 'react';
console.log('App.jsx is loaded!');
import './index.css';
import FileUpload from './components/FileUpload';
import SearchBar from './components/SearchBar';
import StatsCards from './components/StatsCards';
import FilterBar from './components/FilterBar';
import UserTable from './components/UserTable';
import { InstagramParser } from './utils/instagramParser';



function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyUnchecked, setShowOnlyUnchecked] = useState(false);
  const [sortBy, setSortBy] = useState('alphabetical');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Load checked status from localStorage
  useEffect(() => {
    const savedChecked = localStorage.getItem('checkedUsers');
    if (savedChecked && users.length > 0) {
      const checkedIds = JSON.parse(savedChecked);
      setUsers(prevUsers => 
        prevUsers.map(user => ({
          ...user,
          checked: checkedIds.includes(user.id)
        }))
      );
    }
  }, [users.length]);

  // Save checked status to localStorage
  const saveCheckedStatus = (updatedUsers) => {
    const checkedIds = updatedUsers.filter(u => u.checked).map(u => u.id);
    localStorage.setItem('checkedUsers', JSON.stringify(checkedIds));
  };

  const handleFileProcessed = (data) => {
    const parser = new InstagramParser();
    const parsedUsers = parser.parse(data);
    
    // Load saved checked status
    const savedChecked = localStorage.getItem('checkedUsers');
    if (savedChecked) {
      const checkedIds = JSON.parse(savedChecked);
      parsedUsers.forEach(user => {
        user.checked = checkedIds.includes(user.id);
      });
    }
    
    setUsers(parsedUsers);
    setSearchTerm('');
    setSelectedUsers([]);
  };

  const handleToggleCheck = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, checked: !user.checked } : user
    );
    setUsers(updatedUsers);
    saveCheckedStatus(updatedUsers);
  };

  const handleToggleSelect = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    const filteredUserIds = getFilteredAndSortedUsers().map(u => u.id);
    setSelectedUsers(filteredUserIds);
  };

  const handleDeselectAll = () => {
    setSelectedUsers([]);
  };

  const handleBulkOpen = () => {
    const selectedUserObjects = users.filter(u => selectedUsers.includes(u.id));
    
    if (selectedUserObjects.length > 20) {
      if (!confirm(`You're about to open ${selectedUserObjects.length} tabs. This might slow down your browser. Continue?`)) {
        return;
      }
    }

    selectedUserObjects.forEach((user, index) => {
      setTimeout(() => {
        const searchUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(user.username)}`;
        window.open(searchUrl, '_blank');
      }, index * 200); // Delay each by 200ms to avoid browser blocking
    });

    // Show notification
    alert(`Opening ${selectedUserObjects.length} LinkedIn searches!`);
  };

  const getFilteredAndSortedUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Show only unchecked filter
    if (showOnlyUnchecked) {
      filtered = filtered.filter(user => !user.checked);
    }

    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.username.localeCompare(b.username);
        case 'reverse':
          return b.username.localeCompare(a.username);
        case 'checked-first':
          return b.checked - a.checked;
        case 'unchecked-first':
          return a.checked - b.checked;
        default:
          return 0;
      }
    });

    return sorted;
  };

  const filteredUsers = getFilteredAndSortedUsers();
  const checkedCount = users.filter(u => u.checked).length;

  return (
    <div className="container">
      <div className="header">
        <h1>🤝 Social Handshake</h1>
        <p className="subtitle">Connect your Instagram following with LinkedIn</p>
      </div>

      <FileUpload onFileProcessed={handleFileProcessed} />

      {users.length > 0 && (
        <>
          <StatsCards
            total={users.length}
            filtered={filteredUsers.length}
            checked={checkedCount}
          />

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <FilterBar
            showOnlyUnchecked={showOnlyUnchecked}
            onToggleUnchecked={setShowOnlyUnchecked}
            sortBy={sortBy}
            onSortChange={setSortBy}
            selectedCount={selectedUsers.length}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onBulkOpen={handleBulkOpen}
          />

          <UserTable
            users={filteredUsers}
            onToggleCheck={handleToggleCheck}
            onToggleSelect={handleToggleSelect}
            selectedUsers={selectedUsers}
          />
        </>
      )}
    </div>
  );
}

export default App;
