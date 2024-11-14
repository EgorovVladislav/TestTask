import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchPosts } from '../features/postSlice';
import Modal from './Modal';
import styles from '../styles/Home.module.css';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.posts.posts);
    const loading = useSelector((state: RootState) => state.posts.loading);
    const error = useSelector((state: RootState) => state.posts.error);

    const [selectedPost, setSelectedPost] = useState<{ title: string; body: string } | null>(null);
    const [comments, setComments] = useState<{ id: number; name: string; body: string; email: string }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handlePostClick = async (id: number) => {
        setIsModalOpen(true)
        try {
            const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if (!postResponse.ok) throw new Error('Failed to fetch post');
            const postData = await postResponse.json();
            setSelectedPost(postData);
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
            if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
            const commentsData = await commentsResponse.json();
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching post or comments:', error);
            toast.error('Ошибка при загрузке поста или комментариев')
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
        setComments([]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <ToastContainer
                position='top-center' />
            <h1>Posts</h1>
            <div className={styles.containerTable}>
                {posts.map(post => (
                    <div
                        className={styles.card}
                        key={post.id}
                        onClick={() => handlePostClick(post.id)}
                    >
                        <h2 className={styles.cardTitle}>{post.title}</h2>
                        <p className={styles.cardContent}>{post.body}</p>
                    </div>
                ))}
            </div>
            {isModalOpen && selectedPost && (
                <Modal
                    post={selectedPost}
                    comments={comments}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Home;
