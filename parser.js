class InstagramParser {
    constructor() {
        this.FollowingList = [];

    }

    parse(data) {
        this.FollowingList = [];
    
        if (data.relationships_following) {
            this.parseNewFormat(data);
        } else if (data.following) {
            this.parseAlternativeFormat(data);
        } else if (Array.isArray(data)) {
            thisparseDirectArrayFormat(data);
        } else {
            throw new Error("Unrecognized data format");
        }

        return this.FollowingList

    }

    parseNewFormat(relationships) {
        relationships.forEach(item => {
            if(item.string_list_data&& item.string_list_data.length > 0) {
                const userData = item.string_list_data[0];
                if (userData.value) {
                    this.FollowingList.push({
                        username: userData.value,
                        href : userData.href || null,
                        timestamp : userData.timestamp || null


                    });
                }
            }
        });
    }


    parseAlternativeFormat(following) {
        following.forEach(item => {
            if (item.username || item.value) {
                this.FollowingList.push({
                    username : item.username || item.value,
                    href : item.href || null,
                    timestamp : item.timestamp || null
                });
            }
        });

    }


    parseDirectArray(data) {
        data.forEach(item => {
            if (typeof item === 'string') {
                this.FollowingList.push({
                    username: item.username || null,
                    href : item.href || null, 
                    timestamp : item.timestamp || null

                });
            }
        });
    }

    getFollowingList() {
        return this.FollowingList;
    }

    get Count() {
        return this.FollowingList.length;
    }

    sortByUsername() {
        this.FollowingList.sort((a,b) => 
            a.username.localecompare(b.username)
        );
        return this.FollowingList;
    
    }

    filter(searchTerm) {
        if (!searchTerm) return this.followingList;
        
        const term = searchTerm.toLowerCase();
        return this.followingList.filter(user => 
            user.username.toLowerCase().includes(term)
        );
    }
}

// Main app controller
class SocialHandshake {
    constructor() {
        this.parser = new InstagramParser();
        this.currentList = [];
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.fileInput = document.getElementById('fileInput');
        this.fileInfo = document.getElementById('fileInfo');
        this.results = document.getElementById('results');
        this.tableBody = document.getElementById('tableBody');
        this.totalCount = document.getElementById('totalCount');
        this.processedCount = document.getElementById('processedCount');
    }

    attachEventListeners() {
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.fileInfo.textContent = `Selected: ${file.name}`;
        this.processFile(file);
    }

    processFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                console.log('Raw data loaded:', data);
                
                // Parse the data
                this.currentList = this.parser.parse(data);
                
                console.log(`Parsed ${this.currentList.length} users`);
                
                // Display results
                this.displayResults();
                
            } catch (error) {
                console.error('Parse error:', error);
                alert(`Error: ${error.message}\n\nMake sure you uploaded the correct Instagram JSON file.`);
            }
        };
        
        reader.onerror = () => {
            alert('Error reading file. Please try again.');
        };
        
        reader.readAsText(file);
    }

    displayResults() {
        // Show results section
        this.results.classList.remove('hidden');

        // Update stats
        const count = this.currentList.length;
        this.totalCount.textContent = count;
        this.processedCount.textContent = count;

        // Clear table
        this.tableBody.innerHTML = '';

        // Sort alphabetically
        const sortedList = [...this.currentList].sort((a, b) => 
            a.username.localeCompare(b.username)
        );

        // Populate table
        sortedList.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>@${user.username}</td>
                <td>
                    <a href="#" 
                       class="linkedin-btn" 
                       onclick="searchLinkedIn('${user.username}'); return false;">
                        Search on LinkedIn
                    </a>
                </td>
            `;
            this.tableBody.appendChild(row);
        });

        // Smooth scroll to results
        setTimeout(() => {
            this.results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// LinkedIn search function (global scope for onclick)
function searchLinkedIn(username) {
    const searchUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(username)}`;
    window.open(searchUrl, '_blank');
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SocialHandshake();
    console.log('Social Handshake initialized!');
});


// TESTING ONLY - Remove this later
window.testWithMockData = function() {
    const mockData = {
        relationships_following: [
            { string_list_data: [{ value: "johndoe", href: "https://instagram.com/johndoe" }] },
            { string_list_data: [{ value: "janedoe", href: "https://instagram.com/janedoe" }] },
            { string_list_data: [{ value: "testuser", href: "https://instagram.com/testuser" }] }
        ]
    };
    
    window.app.currentList = window.app.parser.parse(mockData);
    window.app.displayResults();
};