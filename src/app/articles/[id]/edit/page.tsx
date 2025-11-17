'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../../../page.module.css";
import { useSession } from 'next-auth/react';
import * as React from 'react';

// get 'params' from the url `like {id: '1'}`
export default function EditArticlePage() {

    // define state variables that contains the form data
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // loading and error
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Add session check
    const router = useRouter();
    const params = useParams();

    const { data: session, status } = useSession(); // Get user session

    // useEffect to fetch the article data on page load
    useEffect(() => {
        // Get 'id' from the hook's params object.
        // It might be a string or string[], so we handle that.
        const id = Array.isArray(params.id) ? params.id[0] : params.id;

        // Don't do anything until we know the user's status
        if (status === 'loading') {
            return; // Wait for session to load
        }

        if (status === 'unauthenticated') {
            router.push('/login'); // Not logged in
            return;
        }

        // If we have an ID and the user is authenticated, fetch the data
        if (id && status === 'authenticated') {
            fetch(`/api/articles/${id}`, { method: 'GET' })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch article data');
                }
                return res.json();
            })
            .then((data) => {
                const currentUserId = (session?.user as any)?.id;

                
                if (data.authorId !== parseInt(currentUserId)) {
                    setError('You are not authorized to edit this article.');
                    setLoading(false);
                } else {
                    console.log('data.body', data.body);
                    setTitle(data.title);
                    setBody(data.body); 
                    setLoading(false); 
                }
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        }
    }, [params, status, session, router]);

    // Handle the form submission (UPDATE)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const id = Array.isArray(params.id) ? params.id[0] : params.id;

        try {
            const res = await fetch(`/api/articles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
                credentials: 'include', // Send cookies for auth
            });

            if (res.ok) {
                // Redirect back to the article page
                router.push(`/articles/${id}`);
                router.refresh(); // Tell Next.js to re-fetch data
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to update article');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>

                <div className={styles.intro}>
                    <h1>Edit Article</h1>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input 
                            id="title" 
                            type="text" 
                            placeholder="Write title here" 
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading || !!error}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="body">Body</label>
                        <textarea 
                            id="body" 
                            rows={20} 
                            placeholder="Write article here" 
                            value={body}
                            required
                            onChange={(e) => setBody(e.target.value)}
                            disabled={loading || !!error}
                        ></textarea>
                        {body}
                    </div>
                    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading || !!error}>
                        {loading ? 'Submitting...' : 'Save Article'}
                    </button>
                </form>
            
            </main>
        </div>
    )
}