'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { useSession } from 'next-auth/react';

export default function NewArticlePage() {

    // define state variables that contains the form data
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    //  loading and error
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 1. Add session check
    const { status } = useSession();
    const router = useRouter();

    // 2. Redirect if not logged in
    if (status === 'unauthenticated') {
        router.push('/login');
        return null; // Don't render anything while redirecting
    }

    // 3. Show loading while checking
    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    // form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // display a loading state
        setLoading(true);
        // clear all errors
        setError(''); 

        // send data to the API
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body}),
                credentials: 'include'
            })

            if (response.ok) {
                setTitle('');
                setBody('');
                router.push('/');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to create article');
            }
        } catch(error) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false); // Stop loading, whether success or fail
        }
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>

                <div className={styles.intro}>
                    <h1>Create New Article</h1>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input 
                            id="title" 
                            type="text" 
                            placeholder="Write title here" 
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
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
                        ></textarea>
                    </div>
                    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading}>
                        {loading ? 'Submitting...' : 'Create Article'}
                    </button>
                </form>
            
            </main>
        </div>
    )
}