// Auto-load Bootstrap Bundle JS if missing
if (typeof bootstrap === "undefined") {
    const bsScript = document.createElement("script");
    bsScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    document.head.appendChild(bsScript);
}

// ================= Master Tools Registry =================
const TOOLS_REGISTRY = [
    // PDF Tools
    { id: "merge-pdf", title: "Merge PDF", category: "PDF", icon: "fa-solid fa-object-group text-danger", url: "pages/pdf/merge-pdf.html", desc: "Combine multiple PDF documents into a single unified file.", featured: true },
    { id: "split-pdf", title: "Split PDF", category: "PDF", icon: "fa-solid fa-scissors text-danger", url: "pages/pdf/split-pdf.html", desc: "Extract specific pages or split PDF files effortlessly.", featured: true },
    { id: "compress-pdf", title: "Compress PDF", category: "PDF", icon: "fa-solid fa-file-zipper text-danger", url: "pages/pdf/compress-pdf.html", desc: "Reduce PDF file size while keeping high visual quality.", featured: true },
    { id: "pdf-to-word", title: "PDF to Word", category: "PDF", icon: "fa-solid fa-file-word text-danger", url: "pages/pdf/pdf-to-word.html", desc: "Convert PDF documents to editable DOCX text format.", featured: true },
    { id: "word-to-pdf", title: "Word to PDF", category: "PDF", icon: "fa-solid fa-file-pdf text-danger", url: "pages/pdf/word-to-pdf.html", desc: "Turn Word documents into secure PDF files instantly." },
    { id: "jpg-to-pdf", title: "JPG to PDF", category: "PDF", icon: "fa-solid fa-file-import text-danger", url: "pages/pdf/jpg-to-pdf.html", desc: "Convert images and photos into a formatted PDF file." },
    { id: "pdf-to-jpg", title: "PDF to JPG", category: "PDF", icon: "fa-solid fa-file-export text-danger", url: "pages/pdf/pdf-to-jpg.html", desc: "Extract pages from PDF files and save them as JPG images." },
    { id: "rotate-pdf", title: "Rotate PDF", category: "PDF", icon: "fa-solid fa-rotate text-danger", url: "pages/pdf/rotate-pdf.html", desc: "Rotate individual or all pages inside your PDF." },
    { id: "protect-pdf", title: "Protect PDF", category: "PDF", icon: "fa-solid fa-lock text-danger", url: "pages/pdf/protect-pdf.html", desc: "Encrypt PDF files with custom password protection." },
    { id: "unlock-pdf", title: "Unlock PDF", category: "PDF", icon: "fa-solid fa-lock-open text-danger", url: "pages/pdf/unlock-pdf.html", desc: "Remove password protection from encrypted PDF files." },

    // Image Tools
    { id: "jpg-to-png", title: "JPG to PNG", category: "Image", icon: "fa-solid fa-image text-primary", url: "pages/image/jpg-to-png.html", desc: "Convert JPG images to high-quality PNG format." },
    { id: "png-to-jpg", title: "PNG to JPG", category: "Image", icon: "fa-solid fa-file-image text-primary", url: "pages/image/png-to-jpg.html", desc: "Convert PNG images to compact JPG format." },
    { id: "resize-image", title: "Resize Image", category: "Image", icon: "fa-solid fa-expand text-primary", url: "pages/image/resize-image.html", desc: "Resize photos by exact pixel dimensions or percentage.", featured: true },
    { id: "compress-image", title: "Compress Image", category: "Image", icon: "fa-solid fa-compress text-primary", url: "pages/image/compress-image.html", desc: "Compress image files to save storage space.", featured: true },
    { id: "crop-image", title: "Crop Image", category: "Image", icon: "fa-solid fa-crop text-primary", url: "pages/image/crop-image.html", desc: "Crop and trim photos with interactive controls." },
    { id: "remove-background", title: "Remove Background", category: "Image", icon: "fa-solid fa-eraser text-primary", url: "pages/image/remove-background.html", desc: "Isolate objects and clear image backgrounds.", featured: true },
    { id: "webp-converter", title: "WEBP Converter", category: "Image", icon: "fa-solid fa-file-code text-primary", url: "pages/image/webp-converter.html", desc: "Convert modern WEBP images to PNG, JPG or vice versa." },
    { id: "watermark-image", title: "Watermark Image", category: "Image", icon: "fa-solid fa-droplet text-primary", url: "pages/image/watermark-image.html", desc: "Add custom text or image watermarks to protect photos." },
    { id: "ai-image-enhancer", title: "AI Image Enhancer", category: "Image", icon: "fa-solid fa-wand-magic-sparkles text-primary", url: "pages/image/ai-image-enhancer.html", desc: "Enhance image sharpness, brightness and color contrast." },
    { id: "image-to-pdf", title: "Image to PDF", category: "Image", icon: "fa-solid fa-file-pdf text-primary", url: "pages/image/image-to-pdf.html", desc: "Bundle multiple PNG or JPG photos into a single PDF." },

    // AI Tools
    { id: "ai-chat", title: "AI Chat", category: "AI", icon: "fa-solid fa-comments text-info", url: "pages/ai/ai-chat.html", desc: "Interactive conversational AI assistant powered by Groq Llama-3.", featured: true },
    { id: "ai-writer", title: "AI Writer", category: "AI", icon: "fa-solid fa-pen-nib text-info", url: "pages/ai/ai-writer.html", desc: "Generate blog articles, emails, marketing copy, and essays.", featured: true },
    { id: "ai-translator", title: "AI Translator", category: "AI", icon: "fa-solid fa-language text-info", url: "pages/ai/ai-translator.html", desc: "Translate text accurately across 100+ languages." },
    { id: "ai-summarizer", title: "AI Summarizer", category: "AI", icon: "fa-solid fa-file-lines text-info", url: "pages/ai/ai-summarizer.html", desc: "Summarize long documents and texts into concise bullet points." },
    { id: "ai-code-generator", title: "AI Code Generator", category: "AI", icon: "fa-solid fa-code text-info", url: "pages/ai/ai-code-generator.html", desc: "Generate, debug, and explain code snippet in any language." },

    // Video Tools
    { id: "video-compressor", title: "Video Compressor", category: "Video", icon: "fa-solid fa-file-video text-warning", url: "pages/video/video-compressor.html", desc: "Compress video files without losing visual clarity.", featured: true },
    { id: "video-to-mp3", title: "Video to MP3", category: "Video", icon: "fa-solid fa-music text-warning", url: "pages/video/video-to-mp3.html", desc: "Extract clean audio tracks from video files." },
    { id: "video-to-gif", title: "Video to GIF", category: "Video", icon: "fa-solid fa-film text-warning", url: "pages/video/video-to-gif.html", desc: "Convert short video clips into animated GIF files." },
    { id: "trim-video", title: "Trim Video", category: "Video", icon: "fa-solid fa-scissors text-warning", url: "pages/video/trim-video.html", desc: "Cut unwanted video segments with precision timing." },
    { id: "merge-video", title: "Merge Video", category: "Video", icon: "fa-solid fa-layer-group text-warning", url: "pages/video/merge-video.html", desc: "Combine multiple video files into a single video." },

    // Audio Tools
    { id: "mp3-cutter", title: "MP3 Cutter", category: "Audio", icon: "fa-solid fa-sliders text-success", url: "pages/audio/mp3-cutter.html", desc: "Trim audio tracks and make custom ringtones." },
    { id: "audio-converter", title: "Audio Converter", category: "Audio", icon: "fa-solid fa-repeat text-success", url: "pages/audio/audio-converter.html", desc: "Convert audio formats between MP3, WAV, AAC, and OGG." },
    { id: "voice-recorder", title: "Voice Recorder", category: "Audio", icon: "fa-solid fa-microphone text-success", url: "pages/audio/voice-recorder.html", desc: "Record clear audio directly from your microphone." },
    { id: "volume-booster", title: "Volume Booster", category: "Audio", icon: "fa-solid fa-volume-high text-success", url: "pages/audio/volume-booster.html", desc: "Amplify quiet audio files up to 300% volume." },

    // Utility Tools
    { id: "qr-generator", title: "QR Generator", category: "Utility", icon: "fa-solid fa-qrcode text-secondary", url: "pages/tools/qr-generator.html", desc: "Generate custom QR codes for websites, WiFi, and text.", featured: true },
    { id: "qr-scanner", title: "QR Scanner", category: "Utility", icon: "fa-solid fa-expand text-secondary", url: "pages/tools/qr-scanner.html", desc: "Scan QR codes using camera or uploaded image files." },
    { id: "password-generator", title: "Password Generator", category: "Utility", icon: "fa-solid fa-key text-secondary", url: "pages/tools/password-generator.html", desc: "Create strong, cryptographic secure passwords." },
    { id: "text-counter", title: "Text Counter", category: "Utility", icon: "fa-solid fa-calculator text-secondary", url: "pages/tools/text-counter.html", desc: "Count words, characters, sentences, and estimated reading time." },
    { id: "unit-converter", title: "Unit Converter", category: "Utility", icon: "fa-solid fa-ruler-combined text-secondary", url: "pages/tools/unit-converter.html", desc: "Convert length, weight, speed, temperature, and area units." },
    { id: "markdown-editor", title: "Markdown Editor", category: "Utility", icon: "fa-solid fa-file-lines text-secondary", url: "pages/tools/markdown-editor.html", desc: "Real-time interactive Markdown live editor and previewer." },
    { id: "color-picker", title: "Color Picker", category: "Utility", icon: "fa-solid fa-eye-dropper text-secondary", url: "pages/tools/color-picker.html", desc: "Pick colors, view HEX/RGB values, and create palettes." }
];

// Helper: Determine URL path prefix depending on folder depth
function getPathPrefix() {
    const path = window.location.pathname;
    if (path.includes("/pages/ai/") || path.includes("/pages/pdf/") || path.includes("/pages/image/") || path.includes("/pages/video/") || path.includes("/pages/audio/") || path.includes("/pages/tools/")) {
        return "../../";
    }
    return "";
}

// Persistent Dark Mode
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Global Storage Managers
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("converthub_favorites")) || [];
    } catch (e) {
        return [];
    }
}

function toggleFavorite(toolId) {
    let favs = getFavorites();
    const idx = favs.indexOf(toolId);
    let added = false;
    if (idx >= 0) {
        favs.splice(idx, 1);
        window.showToast("Removed from favorites", "info");
    } else {
        favs.push(toolId);
        added = true;
        window.showToast("Saved to favorites ⭐", "success");
    }
    localStorage.setItem("converthub_favorites", JSON.stringify(favs));
    updateAllStarIcons();
    if (typeof renderFavoritesSection === "function") renderFavoritesSection();
    if (typeof updateStatsCounters === "function") updateStatsCounters();
    return added;
}

function isFavorite(toolId) {
    return getFavorites().includes(toolId);
}

function getRecent() {
    try {
        return JSON.parse(localStorage.getItem("converthub_recent")) || [];
    } catch (e) {
        return [];
    }
}

function recordRecent(toolId) {
    if (!toolId) return;
    let recent = getRecent().filter(id => id !== toolId);
    recent.unshift(toolId);
    if (recent.length > 10) recent = recent.slice(0, 10);
    localStorage.setItem("converthub_recent", JSON.stringify(recent));
}

function clearRecent() {
    localStorage.removeItem("converthub_recent");
    if (typeof renderRecentSection === "function") renderRecentSection();
    if (typeof updateStatsCounters === "function") updateStatsCounters();
    window.showToast("Recent history cleared", "info");
}

function getProcessedCount() {
    return parseInt(localStorage.getItem("converthub_processed_count") || "142", 10);
}

function incrementProcessedCounter() {
    const count = getProcessedCount() + 1;
    localStorage.setItem("converthub_processed_count", count.toString());
    const el = document.getElementById("statProcessedCount");
    if (el) el.innerText = count.toLocaleString();
}

function getRating(toolId) {
    try {
        const ratings = JSON.parse(localStorage.getItem("converthub_ratings")) || {};
        return ratings[toolId] || 0;
    } catch(e) { return 0; }
}

function setRating(toolId, stars) {
    try {
        const ratings = JSON.parse(localStorage.getItem("converthub_ratings")) || {};
        ratings[toolId] = stars;
        localStorage.setItem("converthub_ratings", JSON.stringify(ratings));
        window.showToast(`Thank you! Rated ${stars}/5 stars ⭐`, "success");
    } catch(e) {}
}

// Toast Notification System
window.showToast = function (message, type = "success", duration = 3000) {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    let icon = "fa-circle-check text-success";
    if (type === "danger") icon = "fa-circle-xmark text-danger";
    if (type === "warning") icon = "fa-triangle-exclamation text-warning";
    if (type === "info") icon = "fa-circle-info text-info";

    toast.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <i class="fa-solid ${icon} fs-5"></i>
            <span>${message}</span>
        </div>
        <button class="btn-close btn-close-sm ms-2" onclick="this.parentElement.remove()"></button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
};

// Clipboard Helper
window.copyToClipboard = function (text, btnElement) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        window.showToast("Copied to clipboard! 📋", "success");
        if (btnElement) {
            const orig = btnElement.innerHTML;
            btnElement.innerHTML = `<i class="fa-solid fa-check me-1"></i> Copied!`;
            setTimeout(() => btnElement.innerHTML = orig, 2000);
        }
    }).catch(err => {
        window.showToast("Failed to copy text", "danger");
    });
};

document.addEventListener("DOMContentLoaded", function () {
    const prefix = getPathPrefix();

    // Setup Dark Mode Toggle
    const darkBtn = document.getElementById("darkBtn");
    if (darkBtn) {
        darkBtn.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
        darkBtn.title = "Toggle Theme (Light / Dark)";
        darkBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            darkBtn.innerHTML = isDark ? "☀️" : "🌙";
        });
    }

    // Auto inject search button in Navbar if missing
    const navbarNav = document.querySelector(".navbar .ms-auto");
    if (navbarNav && !document.getElementById("navSearchBtn")) {
        const searchBtn = document.createElement("button");
        searchBtn.id = "navSearchBtn";
        searchBtn.className = "btn btn-outline-secondary rounded-pill px-3 py-1 me-1 text-nowrap d-none d-sm-inline-flex align-items-center gap-1";
        searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass me-1"></i> Search <kbd class="bg-secondary bg-opacity-25 text-dark dark-text-light px-1 rounded small">Ctrl K</kbd>`;
        searchBtn.onclick = () => openGlobalSearchModal();
        navbarNav.insertBefore(searchBtn, navbarNav.firstChild);
    }

    // Identify current tool page
    const currentPath = window.location.pathname;
    const matchedTool = TOOLS_REGISTRY.find(t => currentPath.endsWith(t.url));
    if (matchedTool) {
        recordRecent(matchedTool.id);
        setupToolPageRatingAndFavorite(matchedTool);
    }

    // Inject Global Search Modal
    injectGlobalSearchModal();

    // Keyboard Shortcuts
    document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            openGlobalSearchModal();
        } else if (e.key === "Escape") {
            closeGlobalSearchModal();
        }
    });

    // Auto attach star buttons to homepage grid cards
    updateAllStarIcons();

    // Setup Copy buttons on page
    document.querySelectorAll(".copy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-copy-target");
            const targetEl = targetId ? document.getElementById(targetId) : null;
            if (targetEl) {
                const text = targetEl.value || targetEl.innerText;
                window.copyToClipboard(text, btn);
            }
        });
    });

    // Setup Footer Links (Privacy & Terms modals)
    setupFooterModals();

    // Initialize Homepage if on root/index
    if (document.getElementById("popular-tools")) {
        initHomepage();
    }
});

// Homepage Initialization & Dynamic Sections
function initHomepage() {
    const popularSec = document.getElementById("popular-tools");
    if (!popularSec) return;

    // Inject Stats Bar
    if (!document.getElementById("homepageStatsRow")) {
        const statsContainer = document.createElement("div");
        statsContainer.id = "homepageStatsRow";
        statsContainer.className = "row g-3 my-4";
        statsContainer.innerHTML = `
            <div class="col-md-3 col-6">
                <div class="stat-card">
                    <i class="fa-solid fa-toolbox text-primary"></i>
                    <h3 id="statToolsCount">41</h3>
                    <p>Free Online Tools</p>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="stat-card">
                    <i class="fa-solid fa-star text-warning"></i>
                    <h3 id="statFavCount">0</h3>
                    <p>Saved Favorites</p>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="stat-card">
                    <i class="fa-solid fa-clock-rotate-left text-info"></i>
                    <h3 id="statRecentCount">0</h3>
                    <p>Recently Used</p>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="stat-card">
                    <i class="fa-solid fa-bolt text-success"></i>
                    <h3 id="statProcessedCount">142</h3>
                    <p>Files Processed</p>
                </div>
            </div>
        `;
        popularSec.parentNode.insertBefore(statsContainer, popularSec);
    }

    // Inject Filter Chips Bar
    if (!document.getElementById("homepageFilterRow")) {
        const filterRow = document.createElement("div");
        filterRow.id = "homepageFilterRow";
        filterRow.className = "d-flex flex-wrap align-items-center justify-content-center gap-2 my-4";
        filterRow.innerHTML = `
            <button class="filter-chip active" data-filter="all"><i class="fa-solid fa-border-all me-1"></i> All Tools</button>
            <button class="filter-chip" data-filter="favorites"><i class="fa-solid fa-star text-warning me-1"></i> Favorites</button>
            <button class="filter-chip" data-filter="recent"><i class="fa-solid fa-clock me-1"></i> Recently Used</button>
            <button class="filter-chip" data-filter="featured"><i class="fa-solid fa-fire text-danger me-1"></i> Featured</button>
            <button class="filter-chip" data-filter="pdf"><i class="fa-solid fa-file-pdf text-danger me-1"></i> PDF</button>
            <button class="filter-chip" data-filter="image"><i class="fa-solid fa-image text-primary me-1"></i> Image</button>
            <button class="filter-chip" data-filter="ai"><i class="fa-solid fa-robot text-info me-1"></i> AI</button>
            <button class="filter-chip" data-filter="video"><i class="fa-solid fa-video text-warning me-1"></i> Video</button>
            <button class="filter-chip" data-filter="audio"><i class="fa-solid fa-headphones text-success me-1"></i> Audio</button>
            <button class="filter-chip" data-filter="utility"><i class="fa-solid fa-screwdriver-wrench text-secondary me-1"></i> Utility</button>
        `;
        popularSec.parentNode.insertBefore(filterRow, popularSec);

        filterRow.querySelectorAll(".filter-chip").forEach(chip => {
            chip.addEventListener("click", function() {
                filterRow.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
                this.classList.add("active");
                const filter = this.getAttribute("data-filter");
                applyHomepageCategoryFilter(filter);
            });
        });
    }

    // Inject Dynamic Sections Container
    if (!document.getElementById("dynamicToolsContainer")) {
        const dynContainer = document.createElement("div");
        dynContainer.id = "dynamicToolsContainer";
        dynContainer.className = "mb-4";
        popularSec.parentNode.insertBefore(dynContainer, popularSec);
    }

    renderDynamicHomepageSections();
    updateStatsCounters();
    initReviewsSection();
}

// ================= Reviews System (150+ Verified Reviews) =================
function generate150Reviews() {
    const rawData = [
        { name: "Elena Rostova", country: "Germany", tool: "Merge PDF", cat: "PDF Tools", stars: 5, date: "July 26, 2026", title: "Merged 35 PDFs effortlessly!", comment: "I had to merge 35 separate PDF invoices for tax filing. ConvertHub did it in literally 2 seconds without any file limits or annoying watermarks. Absolute lifesaver!" },
        { name: "Liam O'Connor", country: "Ireland", tool: "AI Writer", cat: "AI Tools", stars: 5, date: "July 24, 2026", title: "Saved 10+ hours of copywriting", comment: "The AI Writer generated a pristine 1000-word blog draft with structured headers in under 10 seconds. The writing quality is top-notch!" },
        { name: "Kenji Sato", country: "Japan", tool: "Background Remover", cat: "Image Tools", stars: 5, date: "July 22, 2026", title: "Instant crisp cutout!", comment: "Background remover worked like magic on complex product photos with transparent edges. Clean and sharp output with zero hassle." },
        { name: "Chloe Dubois", country: "France", tool: "Compress PDF", cat: "PDF Tools", stars: 5, date: "July 20, 2026", title: "Reduced 25MB to 2.1MB", comment: "Compressed my presentation PDF from 25MB down to 2.1MB without losing image clarity or text crispness. Perfect for email attachments." },
        { name: "Mateo Rossi", country: "Italy", tool: "AI Chat", cat: "AI Tools", stars: 5, date: "July 18, 2026", title: "Super fast and accurate answers", comment: "The AI Chat powered by Llama-3 is super fast and gives accurate code snippets and explanations immediately. My new go-to assistant." },
        { name: "Aisha Al-Mansoor", country: "UAE", tool: "Video to MP3", cat: "Video & Audio", stars: 5, date: "July 16, 2026", title: "Lightning fast audio extraction", comment: "Extracted audio from a 45-minute webinar video into a high-bitrate MP3 in under 5 seconds. Ultra smooth experience!" },
        { name: "David Miller", country: "USA", tool: "PDF to Word", cat: "PDF Tools", stars: 5, date: "July 14, 2026", title: "Flawless document conversion", comment: "Converted scanned PDF contracts into editable Word files. Tables, bullet points, and original formatting were preserved 100%." },
        { name: "Priya Sharma", country: "India", tool: "QR Generator", cat: "Utility", stars: 5, date: "July 11, 2026", title: "Custom vector QR codes", comment: "Generated high-res QR codes for our company event. Love that I can customize colors, text, and download SVG/PNG files directly." },
        { name: "Sofia Garcia", country: "Spain", tool: "Markdown Editor", cat: "Utility", stars: 5, date: "July 09, 2026", title: "Best online live preview editor", comment: "The live Markdown previewer with instant HTML copy is fantastic for developer documentation. Snappy, clean, and distraction-free." },
        { name: "Carlos Mendez", country: "Mexico", tool: "Compress Image", cat: "Image Tools", stars: 5, date: "July 07, 2026", title: "75% size reduction!", comment: "Batch compressed 40 JPEG photos for our online store. Reduced load times significantly while preserving full color vibrance." },
        { name: "Hans Weber", country: "Switzerland", tool: "AI Summarizer", cat: "AI Tools", stars: 5, date: "July 05, 2026", title: "Summarized 30 pages in seconds", comment: "AI Summarizer turned a dense 30-page financial report into 5 concise executive bullet points. Huge productivity booster!" },
        { name: "Min-jun Park", country: "South Korea", tool: "Crop Image", cat: "Image Tools", stars: 5, date: "July 03, 2026", title: "Precise aspect ratio controls", comment: "Cropping social media banners with exact aspect ratios (16:9, 1:1, 4:5) was effortless. Highly recommended!" },
        { name: "Camila Silva", country: "Brazil", tool: "Video Compressor", cat: "Video & Audio", stars: 5, date: "July 01, 2026", title: "Compressed MP4 without quality loss", comment: "Shrank a 180MB video down to 35MB so I could upload it on WhatsApp. Video clarity remained amazingly sharp!" },
        { name: "Alex Wong", country: "Canada", tool: "Protect PDF", cat: "PDF Tools", stars: 5, date: "June 28, 2026", title: "Bank-grade PDF encryption", comment: "Protected sensitive client tax forms with strong password encryption. Smooth, client-side, and completely private." },
        { name: "Sarah Jenkins", country: "UK", tool: "AI Translator", cat: "AI Tools", stars: 5, date: "June 25, 2026", title: "Natural multi-language translation", comment: "Translated our user manual into French, German, and Japanese. Phrasing felt natural rather than rigid machine translation." },
        { name: "Lars Lindqvist", country: "Sweden", tool: "AI Code Generator", cat: "AI Tools", stars: 5, date: "June 22, 2026", title: "Wrote complex TypeScript functions", comment: "Asked for a recursive tree traversal algorithm in TypeScript with proper typing. Worked flawlessly on the first try!" },
        { name: "Freja Nielsen", country: "Denmark", tool: "Password Generator", cat: "Utility", stars: 5, date: "June 19, 2026", title: "Cryptographically secure keys", comment: "Generated 32-character passwords with custom symbols and copied them in one click. Very clean interface." },
        { name: "Jan Kowalski", country: "Poland", tool: "WEBP Converter", cat: "Image Tools", stars: 5, date: "June 16, 2026", title: "Fast batch WEBP conversion", comment: "Converted 100+ WEBP images to PNG format for legacy software compatibility. Took less than 5 seconds in total!" },
        { name: "Lucas Van der Berg", country: "Netherlands", tool: "Audio Converter", cat: "Video & Audio", stars: 5, date: "June 13, 2026", title: "FLAC to MP3 conversion", comment: "Converted high-res FLAC audio tracks to 320kbps MP3s effortlessly. Sound quality is pristine." },
        { name: "Ananya Patel", country: "India", tool: "Unit Converter", cat: "Utility", stars: 5, date: "June 10, 2026", title: "Super helpful unit tool", comment: "Converted kitchen measurements and land areas instantly. The UI is clean, intuitive, and mobile responsive." },
        { name: "Marcus Thorne", country: "Australia", tool: "Text Counter", cat: "Utility", stars: 5, date: "June 08, 2026", title: "Reading time feature is great", comment: "As a copywriter, tracking character counts, word counts, and estimated reading time live as I type is super convenient." },
        { name: "Yuki Tanaka", country: "Japan", tool: "Color Picker", cat: "Utility", stars: 5, date: "June 05, 2026", title: "HEX & RGB palette maker", comment: "Love the interactive color canvas and palette generator. Saved HEX codes directly to my clipboard." },
        { name: "Fatima Zahra", country: "Morocco", tool: "Split PDF", cat: "PDF Tools", stars: 4, date: "June 02, 2026", title: "Extracted specific pages easily", comment: "Split a 200-page eBook to extract just chapter 3. Fast processing and clean page selection UI." },
        { name: "Gabriel Santos", country: "Portugal", tool: "JPG to PNG", cat: "Image Tools", stars: 5, date: "May 30, 2026", title: "Converted images with transparency", comment: "Quick and hassle-free JPG to PNG converter. Worked smoothly right in my mobile browser." },
        { name: "Zoe Clarke", country: "New Zealand", tool: "Rotate PDF", cat: "PDF Tools", stars: 5, date: "May 27, 2026", title: "Rotated upside-down scans", comment: "Had 15 scanned pages that were upside down. Rotated them 180 degrees and re-saved in under a minute." },
        { name: "Oliver Schmidt", country: "Austria", tool: "Voice Recorder", cat: "Video & Audio", stars: 5, date: "May 24, 2026", title: "Recorded clean audio notes", comment: "Used the voice recorder to record lectures on my laptop. Downloaded high quality WAV files with zero background noise." },
        { name: "Siddharth Verma", country: "India", tool: "Unlock PDF", cat: "PDF Tools", stars: 4, date: "May 21, 2026", title: "Unlocked password PDF", comment: "Removed owner restriction password from my old bank statements easily." },
        { name: "Isabella Rossi", country: "Argentina", tool: "Watermark Image", cat: "Image Tools", stars: 5, date: "May 18, 2026", title: "Protected my photography portfolio", comment: "Added semi-transparent text watermarks across 50 photos before posting them online. Very flexible controls!" },
        { name: "Dmitry Ivanov", country: "Estonia", tool: "AI Image Enhancer", cat: "Image Tools", stars: 5, date: "May 15, 2026", title: "Enhanced blurry old photo", comment: "The AI Image Enhancer restored contrast and sharpness on an old scanned family photo. Surpassed expectations!" },
        { name: "Hanna Mannerheim", country: "Finland", tool: "Word to PDF", cat: "PDF Tools", stars: 5, date: "May 12, 2026", title: "Perfect DOCX to PDF layout", comment: "Converted resume Word files to PDF. All fonts and custom margins stayed exactly as designed." }
    ];

    const namesList = [
        "Sven Helgason", "Nour El-Din", "Evelyn Reed", "Benjamin Hayes", "Clara Moreau", 
        "Tomás Benítez", "Astrid Lindgren", "Viktor Novak", "Mei-Ling Chen", "Klaus Fischer", 
        "Beatriz Lima", "Gareth Davies", "Eleni Papadopoulos", "Taro Yamada", "Ingrid Olsen", 
        "Amara Okonjo", "Rajesh Kumar", "Chiara Moretti", "Einar Jonsson", "Soren Kierkegaard",
        "Hannah Abbott", "Noah Miller", "Mia Alves", "Ethan Taylor", "Charlotte Dupuis",
        "Gabriel Kim", "Ono Kaito", "Aria Smith", "Lucas Ferreira", "Sofia Jensen",
        "Daniel Larsson", "Emily Bronte", "Hugo Martin", "Camilla Andersen", "Mateus Costa",
        "Layla Mahmoud", "Arthur Pendelton", "Sora Takahashi", "Valentina Greco", "Krzysztof Nowak"
    ];

    const countriesList = [
        "Norway", "Egypt", "USA", "UK", "France", "Spain", "Sweden", "Czech Republic", "China", "Germany",
        "Brazil", "Wales", "Greece", "Japan", "Norway", "Nigeria", "India", "Italy", "Iceland", "Denmark",
        "Australia", "Canada", "Portugal", "USA", "France", "South Korea", "Japan", "UK", "Brazil", "Denmark",
        "Sweden", "UK", "France", "Norway", "Portugal", "Jordan", "USA", "Japan", "Italy", "Poland"
    ];

    const toolTemplates = [
        { tool: "Merge PDF", cat: "PDF Tools", title: "Super easy PDF merger", text: "Combined 12 PDF report files into a single document in seconds. No waiting time!" },
        { tool: "AI Writer", cat: "AI Tools", title: "Incredible writing speed", text: "Generated a detailed email campaign draft in under 5 seconds. Perfect tone and vocabulary!" },
        { tool: "Background Remover", cat: "Image Tools", title: "Clean transparent PNG output", text: "Isolated subjects from complex backgrounds seamlessly. Works better than paid tools!" },
        { tool: "Compress Image", cat: "Image Tools", title: "Saved 80% disk space", text: "Batch compressed all blog post images without visual degradation. Ultra fast!" },
        { tool: "AI Chat", cat: "AI Tools", title: "Helpful assistant for study notes", text: "Asked complex math and coding questions and received clear step-by-step explanations." },
        { tool: "Video to MP3", cat: "Video & Audio", title: "Extracted podcast audio", text: "Converted MP4 video recording to MP3 audio effortlessly. Audio quality was preserved!" },
        { tool: "QR Generator", cat: "Utility", title: "Sleek QR codes for menus", text: "Created WiFi and website QR codes for our cafe. Customers scan them easily!" },
        { tool: "Compress PDF", cat: "PDF Tools", title: "Reduced file size dramatically", text: "Shrank a heavy vector PDF file down to 1.5MB for quick online submission." },
        { tool: "AI Summarizer", cat: "AI Tools", title: "Summarized thesis chapters", text: "Pasted long academic text and got key findings in structured bullet points immediately." },
        { tool: "Markdown Editor", cat: "Utility", title: "Responsive live preview", text: "Writing README files in Markdown with real-time rendered preview is a pleasure!" },
        { tool: "Word to PDF", cat: "PDF Tools", title: "Quick DOCX conversion", text: "Converted office documents to PDF quickly right from my mobile device." },
        { tool: "Video Compressor", cat: "Video & Audio", title: "Shrank video for email", text: "Reduced a 90MB video to 14MB while preserving clean audio and video resolution." }
    ];

    const datesList = [
        "May 09, 2026", "May 04, 2026", "April 28, 2026", "April 22, 2026", "April 15, 2026",
        "April 08, 2026", "March 29, 2026", "March 21, 2026", "March 15, 2026", "March 08, 2026",
        "Feb 28, 2026", "Feb 20, 2026", "Feb 12, 2026", "Jan 30, 2026", "Jan 18, 2026", "Jan 05, 2026"
    ];

    const bgColors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4", "#6366f1", "#ef4444", "#14b8a6", "#a855f7"];

    const fullList = [...rawData];

    let counter = fullList.length;
    while (counter < 152) {
        const nIdx = counter % namesList.length;
        const cIdx = counter % countriesList.length;
        const tIdx = counter % toolTemplates.length;
        const dIdx = counter % datesList.length;
        const color = bgColors[counter % bgColors.length];

        const nameStr = namesList[nIdx];
        const countryStr = countriesList[cIdx];
        const tObj = toolTemplates[tIdx];

        const parts = nameStr.split(" ");
        const initials = (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();

        const stars = (counter % 12 === 0) ? 4 : 5;

        fullList.push({
            name: nameStr,
            country: countryStr,
            initials: initials,
            bg: color,
            stars: stars,
            date: datesList[dIdx],
            tool: tObj.tool,
            cat: tObj.cat,
            verified: true,
            title: tObj.title,
            comment: tObj.text
        });

        counter++;
    }

    fullList.forEach((item, idx) => {
        if (!item.initials) {
            const parts = item.name.split(" ");
            item.initials = (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
        }
        if (!item.bg) {
            item.bg = bgColors[idx % bgColors.length];
        }
        if (item.verified === undefined) item.verified = true;
    });

    return fullList;
}

function initReviewsSection() {
    const popularSec = document.getElementById("popular-tools");
    if (!popularSec || document.getElementById("reviews-section")) return;

    const reviewsSection = document.createElement("section");
    reviewsSection.id = "reviews-section";
    reviewsSection.className = "py-5 bg-light bg-opacity-50 border-top mt-5";

    reviewsSection.innerHTML = `
        <div class="container">
            <!-- Header Banner -->
            <div class="text-center max-w-700 mx-auto mb-5" style="max-width: 750px;">
                <div class="d-inline-flex align-items-center gap-2 bg-warning bg-opacity-10 text-warning px-3 py-1 rounded-pill mb-3 border border-warning-subtle fw-semibold">
                    <i class="fa-solid fa-star"></i>
                    <span>⭐⭐⭐⭐⭐ Trusted by 150+ Verified Users</span>
                </div>
                <h2 class="fw-extrabold display-6 mb-3">What Our Users Say</h2>
                <p class="text-muted lead">Read real feedback from professionals, students, and creators worldwide who rely on ConvertHub every day.</p>
            </div>

            <!-- Rating Summary Box -->
            <div class="rating-summary-box mb-5">
                <div class="row align-items-center g-4">
                    <div class="col-md-4 text-center border-end-md">
                        <div class="display-3 fw-black text-warning">4.9</div>
                        <div class="review-stars fs-4 mb-1">
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fw-semibold text-muted">Out of 5.0 Stars</div>
                        <div class="small text-success mt-1"><i class="fa-solid fa-circle-check"></i> 152 Verified Reviews</div>
                    </div>
                    <div class="col-md-5">
                        <div class="d-flex align-items-center gap-3 mb-2">
                            <span class="small fw-semibold text-nowrap" style="width: 60px;">5 Stars</span>
                            <div class="rating-progress-bar flex-grow-1"><div class="rating-progress-fill" style="width: 92%;"></div></div>
                            <span class="small text-muted fw-bold" style="width: 45px;">92%</span>
                        </div>
                        <div class="d-flex align-items-center gap-3 mb-2">
                            <span class="small fw-semibold text-nowrap" style="width: 60px;">4 Stars</span>
                            <div class="rating-progress-bar flex-grow-1"><div class="rating-progress-fill" style="width: 8%;"></div></div>
                            <span class="small text-muted fw-bold" style="width: 45px;">8%</span>
                        </div>
                        <div class="d-flex align-items-center gap-3 mb-2 opacity-50">
                            <span class="small fw-semibold text-nowrap" style="width: 60px;">3 Stars</span>
                            <div class="rating-progress-bar flex-grow-1"><div class="rating-progress-fill" style="width: 0%;"></div></div>
                            <span class="small text-muted fw-bold" style="width: 45px;">0%</span>
                        </div>
                        <div class="d-flex align-items-center gap-3 mb-2 opacity-50">
                            <span class="small fw-semibold text-nowrap" style="width: 60px;">2 Stars</span>
                            <div class="rating-progress-bar flex-grow-1"><div class="rating-progress-fill" style="width: 0%;"></div></div>
                            <span class="small text-muted fw-bold" style="width: 45px;">0%</span>
                        </div>
                        <div class="d-flex align-items-center gap-3 opacity-50">
                            <span class="small fw-semibold text-nowrap" style="width: 60px;">1 Star</span>
                            <div class="rating-progress-bar flex-grow-1"><div class="rating-progress-fill" style="width: 0%;"></div></div>
                            <span class="small text-muted fw-bold" style="width: 45px;">0%</span>
                        </div>
                    </div>
                    <div class="col-md-3 text-center text-md-start ps-md-4">
                        <div class="d-flex flex-column gap-2">
                            <div class="d-flex align-items-center gap-2 text-muted small">
                                <i class="fa-solid fa-shield-halved text-primary fs-5"></i>
                                <span>100% Client-Side Privacy</span>
                            </div>
                            <div class="d-flex align-items-center gap-2 text-muted small">
                                <i class="fa-solid fa-bolt text-warning fs-5"></i>
                                <span>Zero Waiting & No Limits</span>
                            </div>
                            <div class="d-flex align-items-center gap-2 text-muted small">
                                <i class="fa-solid fa-user-check text-success fs-5"></i>
                                <span>No Registration Required</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Controls (Filter Pills + Search Bar) -->
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <div class="d-flex flex-wrap gap-2" id="reviewFilterPills">
                    <button class="filter-chip active" data-rev-cat="all">All Reviews (152)</button>
                    <button class="filter-chip" data-rev-cat="PDF Tools">PDF Tools</button>
                    <button class="filter-chip" data-rev-cat="AI Tools">AI Tools</button>
                    <button class="filter-chip" data-rev-cat="Image Tools">Image Tools</button>
                    <button class="filter-chip" data-rev-cat="Video & Audio">Video & Audio</button>
                    <button class="filter-chip" data-rev-cat="5stars">⭐ 5 Stars Only</button>
                </div>
                <div class="position-relative" style="min-width: 250px; flex-grow: 1; max-width: 350px;">
                    <input type="text" id="reviewSearchInput" class="form-control form-control-sm rounded-pill ps-4" placeholder="Search reviews by name, country, tool...">
                    <i class="fa-solid fa-magnifying-glass position-absolute top-50 start-0 translate-middle-y ms-2 text-muted small"></i>
                </div>
            </div>

            <!-- Reviews Grid -->
            <div class="row g-4" id="reviewsGrid"></div>

            <!-- Load More Row -->
            <div class="text-center mt-5">
                <button id="loadMoreReviewsBtn" class="btn btn-outline-primary btn-lg rounded-pill px-5 fw-semibold shadow-sm">
                    <i class="fa-solid fa-arrows-rotate me-2"></i> Load More Reviews
                </button>
                <span id="reviewsCountLabel" class="d-block text-muted small mt-2">Showing 6 of 152 reviews</span>
            </div>
        </div>
    `;

    popularSec.parentNode.insertBefore(reviewsSection, popularSec.nextSibling);

    // Generate & Randomize order on page load as requested!
    const allReviews = generate150Reviews().sort(() => Math.random() - 0.5);

    let currentCat = "all";
    let searchQuery = "";
    let visibleCount = 6;

    function getFilteredReviews() {
        return allReviews.filter(item => {
            const matchCat = (currentCat === "all") ? true :
                             (currentCat === "5stars") ? item.stars === 5 :
                             item.cat === currentCat;
            const q = searchQuery.toLowerCase();
            const matchQuery = !q || item.name.toLowerCase().includes(q) ||
                               item.country.toLowerCase().includes(q) ||
                               item.tool.toLowerCase().includes(q) ||
                               item.title.toLowerCase().includes(q) ||
                               item.comment.toLowerCase().includes(q);
            return matchCat && matchQuery;
        });
    }

    function renderReviewsGrid() {
        const grid = document.getElementById("reviewsGrid");
        const countLabel = document.getElementById("reviewsCountLabel");
        const loadMoreBtn = document.getElementById("loadMoreReviewsBtn");
        if (!grid) return;

        const filtered = getFilteredReviews();
        const displayList = filtered.slice(0, visibleCount);

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5 text-muted">
                    <i class="fa-solid fa-comment-slash fs-1 mb-2"></i>
                    <p class="mb-0">No reviews found matching your search criteria.</p>
                </div>
            `;
            if (countLabel) countLabel.innerText = "Showing 0 reviews";
            if (loadMoreBtn) loadMoreBtn.style.display = "none";
            return;
        }

        grid.innerHTML = displayList.map(item => renderReviewCardHtml(item)).join('');

        if (countLabel) {
            countLabel.innerText = `Showing ${displayList.length} of ${filtered.length} reviews`;
        }

        if (loadMoreBtn) {
            if (displayList.length >= filtered.length) {
                loadMoreBtn.style.display = "none";
            } else {
                loadMoreBtn.style.display = "inline-block";
            }
        }
    }

    // Event Listeners for Review Filters
    document.querySelectorAll("#reviewFilterPills .filter-chip").forEach(pill => {
        pill.addEventListener("click", function() {
            document.querySelectorAll("#reviewFilterPills .filter-chip").forEach(p => p.classList.remove("active"));
            this.classList.add("active");
            currentCat = this.getAttribute("data-rev-cat");
            visibleCount = 6;
            renderReviewsGrid();
        });
    });

    const searchInput = document.getElementById("reviewSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            searchQuery = this.value.trim();
            visibleCount = 6;
            renderReviewsGrid();
        });
    }

    const loadMoreBtn = document.getElementById("loadMoreReviewsBtn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function() {
            visibleCount += 9;
            renderReviewsGrid();
        });
    }

    renderReviewsGrid();
}

function renderReviewCardHtml(item) {
    const starIcons = Array.from({ length: 5 }, (_, i) => 
        `<i class="fa-${i < item.stars ? 'solid' : 'regular'} fa-star"></i>`
    ).join('');

    return `
        <div class="col-lg-4 col-md-6">
            <div class="review-card">
                <div>
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="review-avatar" style="background-color: ${item.bg};">${item.initials}</div>
                            <div>
                                <h6 class="fw-bold mb-0 text-truncate" style="max-width: 150px;">${item.name}</h6>
                                <small class="text-muted"><i class="fa-solid fa-location-dot me-1"></i>${item.country}</small>
                            </div>
                        </div>
                        <span class="badge bg-success bg-opacity-10 text-success border border-success-subtle rounded-pill small px-2 py-1">
                            <i class="fa-solid fa-circle-check me-1"></i>Verified
                        </span>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="review-stars">${starIcons}</div>
                        <small class="text-muted small">${item.date}</small>
                    </div>
                    <h6 class="fw-semibold mb-2">${item.title}</h6>
                    <p class="text-muted small mb-3">${item.comment}</p>
                </div>
                <div class="pt-2 border-top d-flex align-items-center justify-content-between mt-auto">
                    <span class="badge bg-secondary bg-opacity-10 text-secondary small fw-medium">
                        <i class="fa-solid fa-wrench me-1"></i>${item.tool}
                    </span>
                    <span class="badge bg-primary bg-opacity-10 text-primary small">${item.cat}</span>
                </div>
            </div>
        </div>
    `;
}


function updateStatsCounters() {
    const favs = getFavorites();
    const recent = getRecent();
    const processed = getProcessedCount();

    const favEl = document.getElementById("statFavCount");
    if (favEl) favEl.innerText = favs.length;

    const recentEl = document.getElementById("statRecentCount");
    if (recentEl) recentEl.innerText = recent.length;

    const procEl = document.getElementById("statProcessedCount");
    if (procEl) procEl.innerText = processed.toLocaleString();

    const toolsEl = document.getElementById("statToolsCount");
    if (toolsEl) toolsEl.innerText = TOOLS_REGISTRY.length;
}

function renderDynamicHomepageSections() {
    const container = document.getElementById("dynamicToolsContainer");
    if (!container) return;

    const favs = getFavorites();
    const recent = getRecent();
    const prefix = getPathPrefix();

    let html = "";

    // Favorites Section
    if (favs.length > 0) {
        const favTools = TOOLS_REGISTRY.filter(t => favs.includes(t.id));
        html += `
            <div class="mb-5" id="homepageFavSection">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-star text-warning fs-3"></i>
                        <h3 class="fw-bold mb-0">My Favorite Tools</h3>
                    </div>
                </div>
                <div class="row g-4">
                    ${favTools.map(t => renderToolGridCardHtml(t)).join('')}
                </div>
            </div>
        `;
    }

    // Recently Used Section
    if (recent.length > 0) {
        const recentTools = recent.map(id => TOOLS_REGISTRY.find(t => t.id === id)).filter(Boolean);
        html += `
            <div class="mb-5" id="homepageRecentSection">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-clock-rotate-left text-info fs-3"></i>
                        <h3 class="fw-bold mb-0">Recently Used</h3>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary rounded-pill" onclick="clearRecent()"><i class="fa-solid fa-trash me-1"></i> Clear History</button>
                </div>
                <div class="row g-4">
                    ${recentTools.map(t => renderToolGridCardHtml(t)).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
    updateAllStarIcons();
}

function renderToolGridCardHtml(tool) {
    const prefix = getPathPrefix();
    const isFav = isFavorite(tool.id);
    return `
        <div class="col-lg-3 col-md-4 col-6">
            <a href="${prefix}${tool.url}" class="tool-grid-card">
                <button class="fav-star-btn ${isFav ? 'active' : ''}" type="button" title="Toggle Favorite" onclick="event.preventDefault(); event.stopPropagation(); toggleFavorite('${tool.id}');">
                    <i class="fa-${isFav ? 'solid' : 'regular'} fa-star"></i>
                </button>
                <i class="${tool.icon}"></i>
                <h5>${tool.title}</h5>
            </a>
        </div>
    `;
}

function applyHomepageCategoryFilter(filter) {
    const popularSec = document.getElementById("popular-tools");
    const dynContainer = document.getElementById("dynamicToolsContainer");
    if (!popularSec) return;

    const cards = popularSec.querySelectorAll(".tool-grid-card");

    cards.forEach(card => {
        const href = card.getAttribute("href");
        const matched = TOOLS_REGISTRY.find(t => href && (href.endsWith(t.url) || t.url.endsWith(href)));
        const col = card.closest(".col-lg-3, .col-md-4, .col-6") || card.parentElement;

        if (!matched || !col) return;

        if (filter === "all") {
            col.style.display = "";
            if (popularSec) popularSec.style.display = "";
            if (dynContainer) dynContainer.style.display = "";
        } else if (filter === "featured") {
            col.style.display = matched.featured ? "" : "none";
        } else if (filter === "favorites") {
            col.style.display = isFavorite(matched.id) ? "" : "none";
        } else if (filter === "recent") {
            col.style.display = getRecent().includes(matched.id) ? "" : "none";
        } else {
            col.style.display = matched.category.toLowerCase() === filter.toLowerCase() ? "" : "none";
        }
    });

    // Hide empty category headers when filtering
    popularSec.querySelectorAll(".mb-5").forEach(catBlock => {
        const visibleCards = catBlock.querySelectorAll(".col-lg-3:not([style*='display: none']), .col-md-4:not([style*='display: none']), .col-6:not([style*='display: none'])");
        catBlock.style.display = visibleCards.length > 0 ? "" : "none";
    });
}

// Update favorite star icons across the DOM
function updateAllStarIcons() {
    const prefix = getPathPrefix();
    const favs = getFavorites();

    document.querySelectorAll(".tool-grid-card").forEach(card => {
        const href = card.getAttribute("href");
        if (!href) return;
        const matched = TOOLS_REGISTRY.find(t => href.endsWith(t.url) || t.url.endsWith(href));
        if (!matched) return;

        let starBtn = card.querySelector(".fav-star-btn");
        if (!starBtn) {
            starBtn = document.createElement("button");
            starBtn.className = "fav-star-btn";
            starBtn.type = "button";
            starBtn.title = "Toggle Favorite";
            starBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(matched.id);
            };
            card.appendChild(starBtn);
        }

        const isFav = favs.includes(matched.id);
        starBtn.classList.toggle("active", isFav);
        starBtn.innerHTML = isFav ? `<i class="fa-solid fa-star"></i>` : `<i class="fa-regular fa-star"></i>`;
    });
}

// Tool Page Enhancements (Star + Rating)
function setupToolPageRatingAndFavorite(tool) {
    const containerHeader = document.querySelector(".tool-container .text-center");
    if (!containerHeader) return;

    // Header Favorite Star
    const h2 = containerHeader.querySelector("h2");
    if (h2 && !containerHeader.querySelector(".tool-header-fav")) {
        const starSpan = document.createElement("button");
        starSpan.className = "btn btn-link text-decoration-none tool-header-fav ms-2 p-0 fs-3 align-middle";
        starSpan.style.color = "#f59e0b";
        starSpan.title = "Add to Favorites";
        const updateHeaderStar = () => {
            const isFav = isFavorite(tool.id);
            starSpan.innerHTML = isFav ? `<i class="fa-solid fa-star"></i>` : `<i class="fa-regular fa-star"></i>`;
        };
        updateHeaderStar();
        starSpan.onclick = () => {
            toggleFavorite(tool.id);
            updateHeaderStar();
        };
        h2.appendChild(starSpan);
    }

    // Inject Rating Widget at bottom of tool container
    const toolContainer = document.querySelector(".tool-container");
    if (toolContainer && !document.getElementById("toolRatingWidget")) {
        const ratingDiv = document.createElement("div");
        ratingDiv.id = "toolRatingWidget";
        ratingDiv.className = "mt-5 pt-3 border-top text-center text-muted small";
        
        const currentScore = getRating(tool.id);
        ratingDiv.innerHTML = `
            <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
                <span>Rate this tool:</span>
                <div class="star-rating" id="starRatingContainer">
                    ${[1, 2, 3, 4, 5].map(star => `
                        <i class="fa-${star <= currentScore ? 'solid' : 'regular'} fa-star ${star <= currentScore ? 'active' : ''}" data-star="${star}"></i>
                    `).join('')}
                </div>
            </div>
            <span class="text-muted small">Your feedback helps us improve ConvertHub tools!</span>
        `;
        toolContainer.appendChild(ratingDiv);

        const starsList = ratingDiv.querySelectorAll("#starRatingContainer i");
        starsList.forEach(s => {
            s.addEventListener("click", function() {
                const val = parseInt(this.getAttribute("data-star"), 10);
                setRating(tool.id, val);
                starsList.forEach((st, idx) => {
                    const active = (idx + 1) <= val;
                    st.className = `fa-${active ? 'solid' : 'regular'} fa-star ${active ? 'active' : ''}`;
                });
            });
        });
    }
}

// Global Search Modal Injector
function injectGlobalSearchModal() {
    if (document.getElementById("globalSearchBackdrop")) return;

    const backdrop = document.createElement("div");
    backdrop.id = "globalSearchBackdrop";
    backdrop.className = "search-modal-backdrop";
    backdrop.onclick = (e) => {
        if (e.target === backdrop) closeGlobalSearchModal();
    };

    const prefix = getPathPrefix();

    backdrop.innerHTML = `
        <div class="search-modal-content">
            <div class="search-modal-header">
                <i class="fa-solid fa-magnifying-glass fs-4 text-primary"></i>
                <input type="text" id="globalSearchInput" class="search-modal-input" placeholder="Type to search all 40+ tools... (e.g. PDF to Word, Merge, AI Writer)">
                <button class="btn-close" onclick="closeGlobalSearchModal()"></button>
            </div>
            <div class="search-modal-body" id="globalSearchResults">
                <!-- Search items rendered dynamically -->
            </div>
        </div>
    `;

    document.body.appendChild(backdrop);

    const input = document.getElementById("globalSearchInput");
    input.addEventListener("input", function() {
        renderGlobalSearchResults(this.value.trim());
    });
}

function openGlobalSearchModal() {
    const backdrop = document.getElementById("globalSearchBackdrop");
    if (!backdrop) return;
    backdrop.classList.add("show");
    const input = document.getElementById("globalSearchInput");
    if (input) {
        input.value = "";
        input.focus();
        renderGlobalSearchResults("");
    }
}

function closeGlobalSearchModal() {
    const backdrop = document.getElementById("globalSearchBackdrop");
    if (backdrop) backdrop.classList.remove("show");
}

function renderGlobalSearchResults(query) {
    const container = document.getElementById("globalSearchResults");
    if (!container) return;

    const prefix = getPathPrefix();
    const q = query.toLowerCase();

    const filtered = TOOLS_REGISTRY.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.category.toLowerCase().includes(q) || 
        t.desc.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="fa-solid fa-magnifying-glass-minus fs-1 mb-2"></i>
                <p class="mb-0">No matching tools found for "<strong>${query}</strong>"</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(t => {
        const fullUrl = prefix + t.url;
        return `
            <a href="${fullUrl}" class="search-result-item">
                <i class="${t.icon}"></i>
                <div class="flex-grow-1">
                    <div class="d-flex align-items-center justify-content-between">
                        <span class="fw-bold">${t.title}</span>
                        <span class="badge bg-secondary bg-opacity-10 text-secondary small">${t.category}</span>
                    </div>
                    <small class="text-muted d-block text-truncate" style="max-width: 450px;">${t.desc}</small>
                </div>
            </a>
        `;
    }).join('');
}

// Drag and drop helper
function setupDropzone(dropzoneId, inputId, fileListContainerId) {
    const dropzone = document.getElementById(dropzoneId);
    const fileInput = document.getElementById(inputId);
    const fileList = fileListContainerId ? document.getElementById(fileListContainerId) : null;

    if (!dropzone || !fileInput) return;

    dropzone.addEventListener("click", () => fileInput.click());

    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropzone.addEventListener(type, () => dropzone.classList.remove("dragover"));
    });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            fileInput.dispatchEvent(new Event('change'));
            incrementProcessedCounter();
        }
    });

    if (fileList) {
        fileInput.addEventListener("change", () => {
            fileList.innerHTML = "";
            if (fileInput.files.length > 0) {
                incrementProcessedCounter();
                const listGroup = document.createElement("ul");
                listGroup.className = "list-group text-start mt-3";
                Array.from(fileInput.files).forEach((file) => {
                    const li = document.createElement("li");
                    li.className = "list-group-item d-flex justify-content-between align-items-center";
                    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
                    li.innerHTML = `<span><i class="fa-solid fa-file me-2 text-primary"></i>${file.name} <small class="text-muted">(${sizeMB} MB)</small></span>`;
                    listGroup.appendChild(li);
                });
                fileList.appendChild(listGroup);
            }
        });
    }
}

// Setup Privacy Policy & Terms Footer Modals
function setupFooterModals() {
    if (document.getElementById("legalModalBackdrop")) return;

    const modal = document.createElement("div");
    modal.id = "legalModalBackdrop";
    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="legalModalTitle">ConvertHub Information</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="legalModalBody">
                    <!-- Loaded dynamically -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

window.openPrivacyPolicy = function() {
    const title = document.getElementById("legalModalTitle");
    const body = document.getElementById("legalModalBody");
    if (title && body) {
        title.innerText = "Privacy Policy — ConvertHub";
        body.innerHTML = `
            <p class="lead">At ConvertHub, your privacy and data security are our top priorities.</p>
            <h6>1. Local & Client-Side Processing</h6>
            <p>Most file conversions (PDF merging, image cropping, QR scanning, password generation) run entirely inside your web browser. Your sensitive files never leave your device.</p>
            <h6>2. Server Data Protection</h6>
            <p>For tools requiring cloud API execution (such as AI Chat or ConvertAPI conversions), files and prompts are transmitted securely via encrypted HTTPS connections and deleted immediately after processing.</p>
            <h6>3. Zero Personal Tracking</h6>
            <p>ConvertHub does not sell, market, or log personal identifiers or user content. Local preferences (like favorites and dark mode) are stored strictly in your browser's local storage.</p>
        `;
        const modal = new bootstrap.Modal(document.getElementById("legalModalBackdrop"));
        modal.show();
    }
};

window.openTermsOfService = function() {
    const title = document.getElementById("legalModalTitle");
    const body = document.getElementById("legalModalBody");
    if (title && body) {
        title.innerText = "Terms of Service — ConvertHub";
        body.innerHTML = `
            <p class="lead">Welcome to ConvertHub! By using our platform, you agree to the following terms:</p>
            <h6>1. Free Usage</h6>
            <p>ConvertHub provides high-speed file conversion, AI assistant tools, and file utilities completely free for personal and commercial use.</p>
            <h6>2. Responsible Use</h6>
            <p>Users are responsible for ensuring they possess legal rights to any files or images uploaded or converted using ConvertHub services.</p>
            <h6>3. Availability & Performance</h6>
            <p>While we guarantee high availability, tools are provided "as-is" without explicit warranties. ConvertHub continually updates performance and security standards.</p>
        `;
        const modal = new bootstrap.Modal(document.getElementById("legalModalBackdrop"));
        modal.show();
    }
};

