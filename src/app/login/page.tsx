'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // For demo purposes, simulate login
        // In production, this would call the NextAuth signIn function
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check localStorage for registered users (demo only)
            const users = JSON.parse(localStorage.getItem('chromaforge-users') || '[]');
            const user = users.find((u: { email: string; password: string }) =>
                u.email === formData.email && u.password === formData.password
            );

            if (user) {
                localStorage.setItem('chromaforge-current-user', JSON.stringify(user));
                router.push('/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.authPage}>
            {/* Background */}
            <div className={styles.bgGradient}></div>

            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <div className={styles.authHeader}>
                        <h1>Welcome Back</h1>
                        <p>Sign in to access your saved filters</p>
                    </div>

                    <form className={styles.authForm} onSubmit={handleSubmit}>
                        {error && (
                            <div className={styles.errorAlert}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className={styles.input}
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className={styles.input}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary ${styles.submitBtn}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className={styles.authDivider}>
                        <span>or continue with</span>
                    </div>

                    <div className={styles.socialBtns}>
                        <button className={styles.socialBtn} type="button">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button className={styles.socialBtn} type="button">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    <p className={styles.authFooter}>
                        Don&apos;t have an account?{' '}
                        <Link href="/register">Create one</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
