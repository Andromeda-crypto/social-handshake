export class InstagramParser {
  constructor() {
    this.followingList = [];
  }

  parse(data) {
    this.followingList = [];

    if (data.relationships_following) {
      this.parseNewFormat(data.relationships_following);
    } else if (data.following) {
      this.parseAlternativeFormat(data.following);
    } else if (Array.isArray(data)) {
      this.parseDirectArray(data);
    } else {
      throw new Error("Unrecognized data format");
    }

    return this.followingList;
  }

  parseNewFormat(relationships) {
    relationships.forEach(item => {
      if (item.string_list_data && item.string_list_data.length > 0) {
        const userData = item.string_list_data[0];
        if (userData.value) {
          this.followingList.push({
            username: userData.value,
            href: userData.href || null,
            timestamp: userData.timestamp || null,
            checked: false,
            id: userData.value
          });
        }
      }
    });
  }

  parseAlternativeFormat(following) {
    following.forEach(item => {
      if (item.username || item.value) {
        this.followingList.push({
          username: item.username || item.value,
          href: item.href || null,
          timestamp: item.timestamp || null,
          checked: false,
          id: item.username || item.value
        });
      }
    });
  }

  parseDirectArray(data) {
    data.forEach(item => {
      if (typeof item === 'string') {
        this.followingList.push({
          username: item,
          href: null,
          timestamp: null,
          checked: false,
          id: item
        });
      } else if (item.username || item.value) {
        this.followingList.push({
          username: item.username || item.value,
          href: item.href || null,
          timestamp: item.timestamp || null,
          checked: false,
          id: item.username || item.value
        });
      }
    });
  }
}