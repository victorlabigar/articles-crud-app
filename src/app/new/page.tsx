'use client';
import { useState } from "react";
import { useRouter } from "next/router";
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
                    <Link href={'/'} className={`${styles.btn} ${styles.btnPrimary}`}>Home</Link>
                </header>

                <div className={styles.intro}>
                    <h1>Create New Article</h1>
                </div>

                <form className={styles.form} action="">
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" placeholder="Write title here"/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="body">Body</label>
                        <textarea id="body" rows={20} placeholder="Write article here"></textarea>
                    </div>
                    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Create Article</button>
                </form>
            
            </main>
        </div>
    )
}