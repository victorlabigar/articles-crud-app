'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../page.module.css";
import { useSession } from 'next-auth/react';
import * as React from 'react';

// get 'params' from the url `like {id: '1'}`
export default function EditArticlePage( {params}: {params: { id: string}} ) {

    // define state variables that contains the form data
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    //  loading and error
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [originalAuthorId, setOriginalAuthorId] = useState<number | null>(null);

    // 1. Add session check
    const router = useRouter();

    const { data: session, status } = useSession(); // Get user session

        // 2. useEffect to fetch the article data on page load
    useEffect(() => {
        const { id } = params;

        if (id) {
            setLoading(true);
            fetch(`/api/articles/${id}`, { method: 'GET' }) // We need a GET route!
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch article');
                }
                return res.json();
            })
            .then((data) => {
                setTitle(data.title);
                setBody(data.body);
                setOriginalAuthorId(data.authorId);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        }
    }, [params]);

    // 3. Authorization Check (Client-side)
    // Check if user is logged in and if they are the original author
    const currentUserId = (session?.user as any)?.id;
    
    if (status === 'loading' || loading) {
        return <main className={styles.main}><p>Loading...</p></main>;
    }

    if (status === 'unauthenticated') {
        router.push('/login'); // Not logged in
        return null;
    }

    if (status === 'authenticated' && currentUserId !== originalAuthorId) {
        // Logged in, but NOT the author
        setError('You are not authorized to edit this article.');
    }

    // 4. Handle the form submission (UPDATE)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Send a PUT request to our update API
            const res = await fetch(`/api/articles/${params.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
                credentials: 'include', // Send cookies for auth
            });

            if (res.ok) {
                // Redirect back to the article page
                router.push(`/articles/${params.id}`);
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
                    {error &&<p className={styles.error}>{error}</p>}

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
                    </div>
                    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading || !!error}>
                        {loading ? 'Submitting...' : 'Create Article'}
                    </button>
                </form>
            
            </main>
        </div>
    )
}