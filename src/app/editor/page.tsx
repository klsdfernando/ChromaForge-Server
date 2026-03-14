'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './page.module.css';

// Pre-built filters with their settings
const PRESET_FILTERS = [
    { id: 'original', name: 'Original', settings: { brightness: 100, contrast: 100, saturation: 100, hue: 0, blur: 0, sepia: 0, grayscale: 0, invert: 0 } },
    { id: 'vintage', name: 'Vintage', settings: { brightness: 110, contrast: 90, saturation: 60, hue: 20, blur: 0, sepia: 40, grayscale: 0, invert: 0 } },
    { id: 'noir', name: 'Noir', settings: { brightness: 100, contrast: 130, saturation: 0, hue: 0, blur: 0, sepia: 0, grayscale: 100, invert: 0 } },
    { id: 'vivid', name: 'Vivid', settings: { brightness: 105, contrast: 120, saturation: 150, hue: 0, blur: 0, sepia: 0, grayscale: 0, invert: 0 } },
    { id: 'muted', name: 'Muted', settings: { brightness: 105, contrast: 90, saturation: 50, hue: 0, blur: 0, sepia: 10, grayscale: 0, invert: 0 } },
    { id: 'warm', name: 'Warm', settings: { brightness: 105, contrast: 105, saturation: 110, hue: 15, blur: 0, sepia: 20, grayscale: 0, invert: 0 } },
    { id: 'cool', name: 'Cool', settings: { brightness: 100, contrast: 105, saturation: 100, hue: 180, blur: 0, sepia: 0, grayscale: 0, invert: 0 } },
    { id: 'fade', name: 'Fade', settings: { brightness: 115, contrast: 85, saturation: 80, hue: 0, blur: 0, sepia: 15, grayscale: 0, invert: 0 } },
    { id: 'drama', name: 'Drama', settings: { brightness: 95, contrast: 150, saturation: 110, hue: 0, blur: 0, sepia: 0, grayscale: 0, invert: 0 } },
    { id: 'sunset', name: 'Sunset', settings: { brightness: 105, contrast: 110, saturation: 130, hue: 340, blur: 0, sepia: 25, grayscale: 0, invert: 0 } },
    { id: 'arctic', name: 'Arctic', settings: { brightness: 110, contrast: 120, saturation: 80, hue: 200, blur: 0, sepia: 0, grayscale: 0, invert: 0 } },
    { id: 'retro', name: 'Retro', settings: { brightness: 100, contrast: 95, saturation: 70, hue: 30, blur: 0, sepia: 35, grayscale: 0, invert: 0 } },
    { id: 'cinematic', name: 'Cinematic', settings: { brightness: 95, contrast: 115, saturation: 85, hue: 200, blur: 0, sepia: 10, grayscale: 0, invert: 0 } },
];

const DEFAULT_SETTINGS = { brightness: 100, contrast: 100, saturation: 100, hue: 0, blur: 0, sepia: 0, grayscale: 0, invert: 0 };

type FilterSettings = typeof DEFAULT_SETTINGS;

export default function EditorPage() {
    const [image, setImage] = useState<string | null>(null);
    const [settings, setSettings] = useState<FilterSettings>(DEFAULT_SETTINGS);
    const [activeFilter, setActiveFilter] = useState('original');
    const [customFilters, setCustomFilters] = useState<Array<{ id: string; name: string; settings: FilterSettings }>>([]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [exportFormat, setExportFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
    const [exportQuality, setExportQuality] = useState(90);
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    // Generate CSS filter string
    const getFilterString = useCallback((s: FilterSettings) => {
        return `
      brightness(${s.brightness}%)
      contrast(${s.contrast}%)
      saturate(${s.saturation}%)
      hue-rotate(${s.hue}deg)
      blur(${s.blur}px)
      sepia(${s.sepia}%)
      grayscale(${s.grayscale}%)
      invert(${s.invert}%)
    `.trim();
    }, []);

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setSettings(DEFAULT_SETTINGS);
                setActiveFilter('original');
            };
            reader.readAsDataURL(file);
        }
    };

    // Apply preset filter
    const applyFilter = (filter: typeof PRESET_FILTERS[0]) => {
        setActiveFilter(filter.id);
        setSettings(filter.settings);
    };

    // Update individual setting
    const updateSetting = (key: keyof FilterSettings, value: number) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setActiveFilter('custom');
    };

    // Reset to original
    const resetFilters = () => {
        setSettings(DEFAULT_SETTINGS);
        setActiveFilter('original');
    };

    // Save custom filter
    const saveCustomFilter = () => {
        if (!filterName.trim()) return;

        const newFilter = {
            id: `custom-${Date.now()}`,
            name: filterName,
            settings: { ...settings }
        };

        setCustomFilters(prev => [...prev, newFilter]);
        setFilterName('');
        setShowSaveModal(false);
    };

    // Delete custom filter
    const deleteCustomFilter = (id: string) => {
        setCustomFilters(prev => prev.filter(f => f.id !== id));
    };

    // Export image
    const exportImage = useCallback(() => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx || !imageRef.current) return;

        // Set canvas size to image size
        canvas.width = imageRef.current.naturalWidth;
        canvas.height = imageRef.current.naturalHeight;

        // Apply filter and draw
        ctx.filter = getFilterString(settings);
        ctx.drawImage(imageRef.current, 0, 0);

        // Get data URL
        const mimeType = `image/${exportFormat}`;
        const quality = exportFormat === 'png' ? undefined : exportQuality / 100;
        const dataUrl = canvas.toDataURL(mimeType, quality);

        // Download
        const link = document.createElement('a');
        link.download = `chromaforge-edit.${exportFormat}`;
        link.href = dataUrl;
        link.click();

        setShowExportModal(false);
    }, [image, settings, exportFormat, exportQuality, getFilterString]);

    // Load image ref
    useEffect(() => {
        if (image) {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                imageRef.current = img;
            };
        }
    }, [image]);

    // Load custom filters from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('chromaforge-custom-filters');
        if (saved) {
            try {
                setCustomFilters(JSON.parse(saved));
            } catch (e) {
                console.error('Error loading custom filters:', e);
            }
        }
    }, []);

    // Save custom filters to localStorage
    useEffect(() => {
        localStorage.setItem('chromaforge-custom-filters', JSON.stringify(customFilters));
    }, [customFilters]);

    return (
        <div className={styles.editor}>
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.toolbarLeft}>
                    <button
                        className={`btn btn-secondary ${styles.uploadBtn}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="17,8 12,3 7,8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        Upload Photo
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    {image && (
                        <button className="btn btn-ghost" onClick={resetFilters}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                            </svg>
                            Reset
                        </button>
                    )}
                </div>

                <div className={styles.toolbarRight}>
                    {image && (
                        <>
                            <button
                                className="btn btn-ghost"
                                onClick={() => setShowSaveModal(true)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                    <path d="M17 21v-8H7v8" />
                                    <path d="M7 3v5h8" />
                                </svg>
                                Save Filter
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowExportModal(true)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                    <polyline points="7,10 12,15 17,10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Export
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Main Editor Area */}
            <div className={styles.editorMain}>
                {/* Canvas Area */}
                <div className={styles.canvasArea}>
                    {image ? (
                        <div className={styles.imageContainer}>
                            <img
                                src={image}
                                alt="Editing"
                                className={styles.editImage}
                                style={{ filter: getFilterString(settings) }}
                            />
                        </div>
                    ) : (
                        <div
                            className={styles.dropzone}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className={styles.dropzoneContent}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                                <h3>Drop your photo here</h3>
                                <p>or click to browse</p>
                                <span className={styles.dropzoneHint}>Supports JPG, PNG, WebP</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    {/* Tabs */}
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${!isBuilderOpen ? styles.active : ''}`}
                            onClick={() => setIsBuilderOpen(false)}
                        >
                            Filters
                        </button>
                        <button
                            className={`${styles.tab} ${isBuilderOpen ? styles.active : ''}`}
                            onClick={() => setIsBuilderOpen(true)}
                        >
                            Adjust
                        </button>
                    </div>

                    {!isBuilderOpen ? (
                        /* Filter Panel */
                        <div className={styles.filterPanel}>
                            {/* Preset Filters */}
                            <div className={styles.filterSection}>
                                <h4>Preset Filters</h4>
                                <div className={styles.filterGrid}>
                                    {PRESET_FILTERS.map(filter => (
                                        <button
                                            key={filter.id}
                                            className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
                                            onClick={() => applyFilter(filter)}
                                        >
                                            <div
                                                className={styles.filterPreview}
                                                style={{
                                                    background: filter.id === 'original' ? 'var(--bg-tertiary)' : 'var(--gradient-primary)',
                                                    filter: filter.id !== 'original' ? getFilterString(filter.settings) : undefined
                                                }}
                                            />
                                            <span>{filter.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Filters */}
                            {customFilters.length > 0 && (
                                <div className={styles.filterSection}>
                                    <h4>My Filters</h4>
                                    <div className={styles.filterGrid}>
                                        {customFilters.map(filter => (
                                            <button
                                                key={filter.id}
                                                className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
                                                onClick={() => applyFilter(filter)}
                                            >
                                                <div
                                                    className={styles.filterPreview}
                                                    style={{
                                                        background: 'var(--gradient-secondary)',
                                                        filter: getFilterString(filter.settings)
                                                    }}
                                                />
                                                <span>{filter.name}</span>
                                                <button
                                                    className={styles.deleteBtn}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteCustomFilter(filter.id);
                                                    }}
                                                >×</button>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Adjustment Panel */
                        <div className={styles.adjustPanel}>
                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabel}>
                                    <span>Brightness</span>
                                    <span>{settings.brightness}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={settings.brightness}
                                    onChange={(e) => updateSetting('brightness', Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>

                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabel}>
                                    <span>Contrast</span>
                                    <span>{settings.contrast}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={settings.contrast}
                                    onChange={(e) => updateSetting('contrast', Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>

                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabel}>
                                    <span>Saturation</span>
                                    <span>{settings.saturation}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={settings.saturation}
                                    onChange={(e) => updateSetting('saturation', Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>

                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabel}>
                                    <span>Hue Rotate</span>
                                    <span>{settings.hue}°</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={settings.hue}
                                    onChange={(e) => updateSetting('hue', Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>

                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabel}>
                                    <span>Blur</span>
                                    <span>{settings.blur}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="20"
                                    value={settings.blur}
                                    onChange={(e) => updateSetting('blur', Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>

                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabel}>
                                    <span>Sepia</span>
                                    <span>{settings.sepia}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={settings.sepia}
                                    onChange={(e) => updateSetting('sepia', Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>

                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabel}>
                                    <span>Grayscale</span>
                                    <span>{settings.grayscale}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={settings.grayscale}
                                    onChange={(e) => updateSetting('grayscale', Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>

                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabel}>
                                    <span>Invert</span>
                                    <span>{settings.invert}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={settings.invert}
                                    onChange={(e) => updateSetting('invert', Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>
                        </div>
                    )}
                </aside>
            </div>

            {/* Save Filter Modal */}
            {showSaveModal && (
                <div className={styles.modalOverlay} onClick={() => setShowSaveModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <h3>Save Custom Filter</h3>
                        <p>Give your filter preset a name to save it for later use.</p>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Filter name..."
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                            autoFocus
                        />
                        <div className={styles.modalActions}>
                            <button className="btn btn-ghost" onClick={() => setShowSaveModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={saveCustomFilter} disabled={!filterName.trim()}>
                                Save Filter
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {showExportModal && (
                <div className={styles.modalOverlay} onClick={() => setShowExportModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <h3>Export Photo</h3>
                        <p>Choose your export settings.</p>

                        <div className={styles.exportOptions}>
                            <label>Format</label>
                            <div className={styles.formatBtns}>
                                {(['png', 'jpeg', 'webp'] as const).map(format => (
                                    <button
                                        key={format}
                                        className={`${styles.formatBtn} ${exportFormat === format ? styles.active : ''}`}
                                        onClick={() => setExportFormat(format)}
                                    >
                                        {format.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {exportFormat !== 'png' && (
                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabel}>
                                    <span>Quality</span>
                                    <span>{exportQuality}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={exportQuality}
                                    onChange={(e) => setExportQuality(Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>
                        )}

                        <div className={styles.modalActions}>
                            <button className="btn btn-ghost" onClick={() => setShowExportModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={exportImage}>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
