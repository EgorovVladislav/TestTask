import React, { useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css';

interface ModalProps {
    post: { title: string; body: string };
    comments: { id: number; name: string; body: string; email: string }[];
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ post, comments, onClose }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    Close
                </button>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <h2>Comments</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={styles.commentsContainer}>
                        {comments.map(comment => (
                            <div key={comment.id} className={styles.comment}>
                                <h3>{comment.name}</h3>
                                <p>{comment.body}</p>
                                <p><strong>{comment.email}</strong></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
