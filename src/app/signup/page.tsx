'use client'; // This is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css'; // Re-use styles
import Nav from '@/components/Nav';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Send the data to our new /api/signup endpoint
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      // 2. Handle the response
      if (res.ok) {
        // If signup is successful, redirect to the login page
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.error || 'Signup failed');
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
          <h1>Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Henk Ingrid"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    autoComplete=''
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="eg. name@gmail.com"
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
                {loading ? 'Creating...' : 'Sign Up'}
            </button>
            
            <p style={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <Link href="/login" className={styles.link}>
                    Login here
                </Link>
            </p>
        </form>
       
      </main>
    </div>
  );
}