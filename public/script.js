document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const container = document.getElementById('song-container');

    const fetchSongs = (query = '') => {
        fetch(`/api/songs${query ? `?search=${query}` : ''}`)
            .then(response => response.json())
            .then(songs => {
                container.innerHTML = '';
                songs.forEach(song => {
                    const songElement = document.createElement('div');
                    songElement.className = 'song';
                    songElement.innerHTML = `
                        <h2>${song.title}</h2>
                        <h3>${song.artist}</h3>
                        <pre>${song.lyrics}</pre>
                        <pre>${song.chords}</pre>
                    `;
                    container.appendChild(songElement);
                });
            });
    };

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        fetchSongs(query);
    });

    // Fetch all songs on initial load
    fetchSongs();
});
