import React, { useState, useEffect, useCallback } from 'react';
import './InfiniteScrollFeed.css'; // Import the CSS file for styling

const InfiniteScrollFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const getInformation = useCallback(() => {
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            const newPosts = Array.from({ length: 10 }, (_, i) => {
                switch (i) {
                    case 0:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/50',
                            username: 'John Doe',
                            text: 'Just finished a morning jog and feeling great!',
                        };
                    case 1:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/51',
                            username: 'Jane Smith',
                            text: 'Just baked a delicious cake for my friend\'s birthday!',
                        };
                    case 2:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/52',
                            username: 'Bob Johnson',
                            text: 'Just got back from an amazing vacation in Hawaii!',
                        };
                    case 3:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/53',
                            username: 'Alice Brown',
                            text: 'Just started learning how to play the guitar!',
                        };
                    case 4:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/54',
                            username: 'Mike Davis',
                            text: 'Just finished reading a great book!',
                        };
                    case 5:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/55',
                            username: 'Emily Taylor',
                            text: 'Just went to a great concert last night!',
                        };
                    case 6:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/56',
                            username: 'David Lee',
                            text: 'Just tried a new restaurant and it was amazing!',
                        };
                    case 7:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/57',
                            username: 'Sarah Kim',
                            text: 'Just got a new puppy and he\'s so cute!',
                        };
                    case 8:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/58',
                            username: 'Kevin White',
                            text: 'Just went on a great hike!',
                        };
                    case 9:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/59',
                            username: 'Olivia Martin',
                            text: 'Just learned how to cook a new recipe!',
                        };
                    default:
                        return {
                            id: i,
                            imageUrl: 'https://picsum.photos/50/50',
                            username: `User ${i}`,
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
                        };
                }
            });

            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            setLoading(false);

            // If fewer posts are returned, we assume there are no more posts to load
            if (newPosts.length < 10) {
                setHasMore(false);
            }
        }, 1000);
    }, [loading]);

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
            getInformation();
        }
    }, [loading, hasMore, getInformation]);

    useEffect(() => {
        getInformation();
    }, [getInformation]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="feed-container">
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <div className="post-header">
                        <img src={post.imageUrl} alt="Profile" className="avatar" />
                        <span className="username">{post.username}</span>
                    </div>
                    <p className="post-text">{post.text}</p>
                </div>
            ))}
            {loading && <div className="loading">Loading more posts...</div>}
            {!hasMore && <div className="end">No more posts to load</div>}
        </div>
    );
};

export default InfiniteScrollFeed;
