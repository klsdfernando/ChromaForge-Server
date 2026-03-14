'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerInner}`}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#667eea" />
                                    <stop offset="50%" stopColor="#764ba2" />
                                    <stop offset="100%" stopColor="#f093fb" />
                                </linearGradient>
                            </defs>
                            <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#logoGradient)" />
                            <path d="M10 16C10 12.686 12.686 10 16 10C19.314 10 22 12.686 22 16C22 19.314 19.314 22 16 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="16" cy="16" r="3" fill="white" />
                        </svg>
                    </div>
                    <span className={styles.logoText}>ChromaForge</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className={`${styles.nav} hide-mobile`}>
                    <Link href="/editor" className={styles.navLink}>Editor</Link>
                    <Link href="/dashboard" className={styles.navLink}>My Filters</Link>
                    <Link href="/login" className={styles.navLink}>Login</Link>
                    <Link href="/editor" className="btn btn-primary">
                        Start Editing
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={`${styles.menuBtn} hide-desktop`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.menuLine} ${menuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.menuLine} ${menuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.menuLine} ${menuOpen ? styles.open : ''}`}></span>
                </button>

                {/* Mobile Navigation */}
                <nav className={`${styles.mobileNav} ${menuOpen ? styles.open : ''} hide-desktop`}>
                    <Link href="/editor" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Editor</Link>
                    <Link href="/dashboard" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>My Filters</Link>
                    <Link href="/login" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Login</Link>
                    <Link href="/editor" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                        Start Editing
                    </Link>
                </nav>
            </div>
        </header>
    );
}
