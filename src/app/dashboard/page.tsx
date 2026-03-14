'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};

type CustomFilter = {
    id: string;
    name: string;
    settings: {
        brightness: number;
        contrast: number;
        saturation: number;
        hue: number;
        blur: number;
        sepia: number;
        grayscale: number;
        invert: number;
    };
};

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [customFilters, setCustomFilters] = useState<CustomFilter[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingFilter, setEditingFilter] = useState<string | null>(null);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        // Check if user is logged in
        const currentUser = localStorage.getItem('chromaforge-current-user');
        if (!currentUser) {
            router.push('/login');
            return;
        }

        setUser(JSON.parse(currentUser));

        // Load custom filters
        const filters = localStorage.getItem('chromaforge-custom-filters');
        if (filters) {
            setCustomFilters(JSON.parse(filters));
        }

        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('chromaforge-current-user');
        router.push('/login');
    };

    const deleteFilter = (id: string) => {
        const updated = customFilters.filter(f => f.id !== id);
        setCustomFilters(updated);
        localStorage.setItem('chromaforge-custom-filters', JSON.stringify(updated));
    };

    const startRename = (filter: CustomFilter) => {
        setEditingFilter(filter.id);
        setEditName(filter.name);
    };

    const saveRename = (id: string) => {
        if (!editName.trim()) return;

        const updated = customFilters.map(f =>
            f.id === id ? { ...f, name: editName } : f
        );
        setCustomFilters(updated);
        localStorage.setItem('chromaforge-custom-filters', JSON.stringify(updated));
        setEditingFilter(null);
        setEditName('');
    };

    const getFilterCss = (settings: CustomFilter['settings']) => {
        return `
      brightness(${settings.brightness}%)
      contrast(${settings.contrast}%)
      saturate(${settings.saturation}%)
      hue-rotate(${settings.hue}deg)
      blur(${settings.blur}px)
      sepia(${settings.sepia}%)
      grayscale(${settings.grayscale}%)
      invert(${settings.invert}%)
    `.trim();
    };

    if (loading) {
        return (
            <main className={styles.dashboard}>
                <div className={styles.loading}>
                    <div className="spinner"></div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.dashboard}>
            {/* Background */}
            <div className={styles.bgGradient}></div>

            <div className="container">
                {/* Header */}
                <div className={styles.dashHeader}>
                    <div>
                        <h1>Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span></h1>
                        <p>Manage your custom filters and account settings</p>
                    </div>
                    <div className={styles.headerActions}>
                        <Link href="/editor" className="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            New Edit
                        </Link>
                        <button className="btn btn-ghost" onClick={handleLogout}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                <polyline points="16,17 21,12 16,7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                            </svg>
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>{customFilters.length}</span>
                            <span className={styles.statLabel}>Custom Filters</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>13</span>
                            <span className={styles.statLabel}>Preset Filters</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>Pro</span>
                            <span className={styles.statLabel}>Account Type</span>
                        </div>
                    </div>
                </div>

                {/* Custom Filters Section */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>My Custom Filters</h2>
                        <Link href="/editor" className="btn btn-secondary">
                            Create New
                        </Link>
                    </div>

                    {customFilters.length > 0 ? (
                        <div className={styles.filtersGrid}>
                            {customFilters.map(filter => (
                                <div key={filter.id} className={styles.filterCard}>
                                    <div
                                        className={styles.filterPreview}
                                        style={{
                                            background: 'var(--gradient-primary)',
                                            filter: getFilterCss(filter.settings)
                                        }}
                                    />
                                    <div className={styles.filterInfo}>
                                        {editingFilter === filter.id ? (
                                            <div className={styles.renameForm}>
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className={styles.renameInput}
                                                    autoFocus
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') saveRename(filter.id);
                                                        if (e.key === 'Escape') setEditingFilter(null);
                                                    }}
                                                />
                                                <button
                                                    className={styles.saveBtn}
                                                    onClick={() => saveRename(filter.id)}
                                                >
                                                    ✓
                                                </button>
                                            </div>
                                        ) : (
                                            <h3>{filter.name}</h3>
                                        )}
                                        <div className={styles.filterMeta}>
                                            <span>B: {filter.settings.brightness}%</span>
                                            <span>C: {filter.settings.contrast}%</span>
                                            <span>S: {filter.settings.saturation}%</span>
                                        </div>
                                    </div>
                                    <div className={styles.filterActions}>
                                        <button
                                            className={styles.actionBtn}
                                            onClick={() => startRename(filter)}
                                            title="Rename"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>
                                        <button
                                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                            onClick={() => deleteFilter(filter.id)}
                                            title="Delete"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3,6 5,6 21,6" />
                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                            </svg>
                            <h3>No custom filters yet</h3>
                            <p>Start editing photos and save your favorite filter combinations</p>
                            <Link href="/editor" className="btn btn-primary">
                                Start Editing
                            </Link>
                        </div>
                    )}
                </section>

                {/* Account Info */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Account Information</h2>
                    </div>

                    <div className={styles.accountCard}>
                        <div className={styles.accountRow}>
                            <span className={styles.accountLabel}>Name</span>
                            <span className={styles.accountValue}>{user?.name}</span>
                        </div>
                        <div className={styles.accountRow}>
                            <span className={styles.accountLabel}>Email</span>
                            <span className={styles.accountValue}>{user?.email}</span>
                        </div>
                        <div className={styles.accountRow}>
                            <span className={styles.accountLabel}>Member since</span>
                            <span className={styles.accountValue}>
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'N/A'}
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
