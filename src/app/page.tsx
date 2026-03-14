import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Animated Background */}
      <div className={styles.bgGradient}></div>
      <div className={styles.bgOrbs}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              Professional Photo Editing Made Simple
            </div>

            <h1 className={styles.heroTitle}>
              Transform Your Photos with{" "}
              <span className="gradient-text">ChromaForge</span>
            </h1>

            <p className={styles.heroDescription}>
              Unleash your creativity with powerful filters, intuitive controls, and
              the ability to create your own custom presets. No experience required.
            </p>

            <div className={styles.heroCta}>
              <Link href="/editor" className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Start Creating
              </Link>
              <Link href="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>12+</span>
                <span className={styles.statLabel}>Pro Filters</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>∞</span>
                <span className={styles.statLabel}>Custom Presets</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3</span>
                <span className={styles.statLabel}>Export Formats</span>
              </div>
            </div>
          </div>

          {/* Hero Preview */}
          <div className={styles.heroPreview}>
            <div className={styles.previewWindow}>
              <div className={styles.windowBar}>
                <div className={styles.windowDots}>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.windowTitle}>ChromaForge Editor</span>
              </div>
              <div className={styles.previewContent}>
                <div className={styles.previewImage}>
                  <div className={styles.imagePlaceholder}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span>Your Photo Here</span>
                  </div>
                </div>
                <div className={styles.previewSidebar}>
                  <div className={styles.filterGrid}>
                    {['Vintage', 'Noir', 'Vivid', 'Muted', 'Warm', 'Cool'].map((filter, i) => (
                      <div key={filter} className={styles.filterItem} style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className={styles.filterThumb}></div>
                        <span>{filter}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Everything You Need to Create <span className="gradient-text">Stunning Photos</span></h2>
            <p>Professional-grade tools without the complexity</p>
          </div>

          <div className={styles.featureGrid}>
            {/* Feature 1 */}
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                </svg>
              </div>
              <h3>Pre-built Filters</h3>
              <p>Choose from 12+ professionally crafted filters including Vintage, Noir, Cinematic, and more.</p>
            </div>

            {/* Feature 2 */}
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20V10M6 20V4M18 20v-6" />
                </svg>
              </div>
              <h3>Custom Filter Builder</h3>
              <p>Create your signature look with adjustable brightness, contrast, saturation, curves, and more.</p>
            </div>

            {/* Feature 3 */}
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <path d="M17 21v-8H7v8M7 3v5h8" />
                </svg>
              </div>
              <h3>Save & Reuse</h3>
              <p>Save your custom filters with personalized names. Access them anytime from your dashboard.</p>
            </div>

            {/* Feature 4 */}
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </div>
              <h3>Multi-Format Export</h3>
              <p>Download your edited photos in PNG, JPG, or WebP format with customizable quality settings.</p>
            </div>

            {/* Feature 5 */}
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3>Cloud Sync</h3>
              <p>Your filters are saved to the cloud. Access them from any device, anytime.</p>
            </div>

            {/* Feature 6 */}
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <h3>Real-time Preview</h3>
              <p>See your edits instantly as you adjust sliders. No waiting, no lag.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Ready to Transform Your Photos?</h2>
            <p>Join thousands of creators using ChromaForge to bring their vision to life.</p>
            <Link href="/register" className="btn btn-primary">
              Get Started Free
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <span className={styles.footerLogo}>ChromaForge</span>
              <p>Professional photo editing for everyone.</p>
            </div>
            <div className={styles.footerLinks}>
              <Link href="/editor">Editor</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 ChromaForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
