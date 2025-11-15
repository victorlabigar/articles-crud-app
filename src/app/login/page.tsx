'use client'; // This creates a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import styles from '../page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError('');

    const result = await signIn('credentials', {email, password, redirect: false});

    if(result?.ok) {
        router.push('/');
        router.refresh(); // Tell Next.js to re-fetch data (e.g. user info)
    } else {
      // Failed login
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }


  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className={styles.intro}>
          <h1>Login</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
            {error && <p className={styles.error}>{error}</p>}
            
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    autoComplete='yes'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6} // Add some basic client-side validation
                    required
                />
            </div>

            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading}>
                {loading ? 'Please wait...' : 'Sign in'}
            </button>

            <p style={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <Link href="/signup" className={styles.link}>
                    Sign up
                </Link>
            </p>
        </form>
       
      </main>
    </div>
  );
}