import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div style={styles.container}>
            <UserList users={users} onUserSelect={setSelectedUserId} />
            {selectedUserId && <AlbumView userId={selectedUserId} />}
        </div>
    );
};

const UserList = ({ users, onUserSelect }) => (
    <div style={styles.userList}>
        <h2>USERS</h2>
        {users.map(user => (
            <div key={user.id} style={styles.userCard}>
                <h3>{user.name}</h3>
                <button style={styles.button} onClick={() => onUserSelect(user.id)}>
                    View Albums
                </button>
            </div>
        ))}
    </div>
);

const AlbumView = ({ userId }) => {
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
            .then(response => setAlbums(response.data))
            .catch(error => console.error('Error fetching albums:', error));
    }, [userId]);

    const fetchPhotos = (albumId) => {
        setSelectedAlbumId(albumId);
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then(response => setPhotos(response.data))
            .catch(error => console.error('Error fetching photos:', error));
    };

    return (
        <div style={styles.albumList}>
            <h2>ALBUMS</h2>
            {albums.map(album => (
                <div key={album.id} style={styles.albumCard}>
                    <h4>{album.title}</h4>
                    <button style={styles.button} onClick={() => fetchPhotos(album.id)}>
                        View Album
                    </button>
                </div>
            ))}
            {selectedAlbumId && (
                <div style={styles.photoList}>
                    <h2>PHOTOS</h2>
                    <div style={styles.photoGrid}>
                        {photos.map(photo => (
                            <div key={photo.id} style={styles.photoCard}>
                                <img src={photo.thumbnailUrl} alt={photo.title} style={styles.photo} />
                                <p>{photo.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        background: 'linear-gradient(135deg, #f7c8cf, #ff42a1)',
        color: '#333',
        minHeight: '100vh',
    },
    userList: {
        flex: 1,
        padding: '20px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        marginRight: '10px',
        overflowY: 'auto',
    },
    albumList: {
        flex: 1,
        padding: '20px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
    },
    userCard: {
        background: '#f7f7f7',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '12px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    },
    albumCard: {
        background: '#f7f7f7',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '12px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    },
    photoList: {
        flex: 2,
        padding: '20px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
    },
    photoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '10px',
    },
    photoCard: {
        background: '#f7f7f7',
        padding: '10px',
        borderRadius: '12px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
    },
    photo: {
        width: '100%',
        borderRadius: '8px',
    },
    button: {
        backgroundColor: '#ff84c2',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);