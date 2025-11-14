'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";

export default function NewArticlePage() {

    // define state variables that contains the form data
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    //  loading and error
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter(); 

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
                body: JSON.stringify({title, body})
            })

            if (response.ok) {
                setTitle('');
                setBody('');
                router.push('/');
                // router.refresh();
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
                <header className={styles.header}>
                    <Image
                        className={styles.logo}
                        src="/uncinc.svg"
                        alt="Unc Inc logo"
                        width={100}
                        height={20}
                        priority
                    />
                    <Link href={'/'} className={`${styles.btn} ${styles.btnPrimary}`}>View Articles</Link>
                </header>

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