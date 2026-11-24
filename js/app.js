/**
 * QUANTAMNETPRO ANDROID APK DEPLOYMENT HUB
 * Dynamic Version Sync, Mobile QR Generator, Telemetry HUD Simulator
 */

// Default Fallback Configuration (if loaded via file:// protocol without local HTTP server)
const DEFAULT_CONFIG = {
    appName: "QuantamNetPro Mobile",
    packageName: "com.quantamnetpro.mobile",
    version: "1.0.0",
    buildNumber: 100,
    releaseDate: "November 24, 2026",
    apkFileName: "QuantamNetPro-v1.0.0.apk",
    apkPath: "downloads/QuantamNetPro-v1.0.0.apk",
    fileSize: "14.8 MB",
    minAndroid: "Android 8.0 (Oreo) or higher",
    targetArchitecture: "Universal (arm64-v8a, armeabi-v7a, x86_64)",
    sha256: "a5e9f928c620ef7d6faf18f9698530bade6bedd69f2411c89acafdda35485b22",
    officialWebsite: "https://www.quantamnetpro.com",
    developer: "Shakir Hossain (Founder & Lead Systems Architect)",
    whatsNew: [
        "Official Initial Public Release of QuantamNetPro for Android",
        "Real-time RFC 3550 Jitter & Bufferbloat network telemetry engine",
        "Ultra-low latency edge server ping diagnostics across global Anycast nodes",
        "Modern dark cyber mode HUD interface with 60fps telemetry graph",
        "Zero background bloat, zero tracking, battery-optimized architecture",
        "Offline diagnostic log export and Wi-Fi / Cellular comparative benchmarks"
    ]
};

let currentConfig = { ...DEFAULT_CONFIG };

// 1. DYNAMIC VERSION LOADER (Synchronizes with version.json)
async function loadVersionData() {
    try {
        const response = await fetch('version.json?t=' + Date.now());
        if (response.ok) {
            const data = await response.json();
            currentConfig = { ...DEFAULT_CONFIG, ...data };
        }
    } catch (err) {
        console.info('Using embedded fallback release data:', err.message);
    }
    applyConfigToDOM(currentConfig);
}

function applyConfigToDOM(config) {
    // Version badges & strings
    document.querySelectorAll('.app-version').forEach(el => {
        el.textContent = 'v' + config.version;
    });

    document.querySelectorAll('.app-version-raw').forEach(el => {
        el.textContent = config.version;
    });

    document.querySelectorAll('.app-build-number').forEach(el => {
        el.textContent = '#' + config.buildNumber;
    });

    document.querySelectorAll('.app-file-size').forEach(el => {
        el.textContent = config.fileSize;
    });

    document.querySelectorAll('.app-release-date').forEach(el => {
        el.textContent = config.releaseDate;
    });

    document.querySelectorAll('.app-min-android').forEach(el => {
        el.textContent = config.minAndroid;
    });

    document.querySelectorAll('.app-arch').forEach(el => {
        el.textContent = config.targetArchitecture;
    });

    document.querySelectorAll('.app-sha256').forEach(el => {
        el.textContent = config.sha256;
    });

    // Primary Download Buttons
    document.querySelectorAll('.apk-download-btn').forEach(btn => {
        btn.setAttribute('href', config.apkPath);
        btn.setAttribute('download', config.apkFileName);
    });

    // What's New / Changelog List
    const changelogContainer = document.getElementById('changelog-items');
    if (changelogContainer && Array.isArray(config.whatsNew)) {
        changelogContainer.innerHTML = config.whatsNew.map(item => `
            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors">
                <span class="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 animate-pulse"></span>
                <span class="text-sm text-slate-300 leading-relaxed font-mono">${item}</span>
            </div>
        `).join('');
    }

    // Generate QR Code for direct mobile scan
    generateMobileQR(config.apkPath);
}

// 2. DYNAMIC QR CODE GENERATOR (For instant phone download)
function generateMobileQR(apkPath) {
    const qrContainer = document.getElementById('mobile-qr-code');
    if (!qrContainer) return;

    // Full absolute URL when hosted on domain or relative when local
    const downloadUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/') + apkPath;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(downloadUrl)}&bgcolor=4-7-17&color=0-243-255&qzone=1`;

    qrContainer.innerHTML = `
        <div class="relative group p-2 rounded-2xl bg-[#030611] border border-cyan-500/40 shadow-lg shadow-cyan-500/20">
            <img src="${qrApiUrl}" alt="Scan to Download APK on Android" class="w-36 h-36 rounded-xl mx-auto" onerror="this.parentElement.innerHTML='<div class=\'text-xs font-mono text-cyan-400 p-4\'>Scan disabled offline.<br>Direct link: ' + currentConfig.apkFileName + '</div>'">
        </div>
    `;
}

// 3. 1-CLICK SHA256 COPY
window.copySHA256 = function() {
    const shaText = currentConfig.sha256;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shaText).then(() => {
            showToast('SHA256 checksum copied to clipboard!');
        });
    } else {
        const temp = document.createElement('textarea');
        temp.value = shaText;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast('SHA256 checksum copied to clipboard!');
    }
};

// 4. TOAST NOTIFICATION
function showToast(message) {
    const toast = document.getElementById('hud-toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('flex');

    setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
    }, 3500);
}

// 5. PHONE MOCKUP SIMULATED LIVE TELEMETRY
function initPhoneMockupTelemetry() {
    const pingEl = document.getElementById('mockup-ping');
    const speedEl = document.getElementById('mockup-speed');
    const jitterEl = document.getElementById('mockup-jitter');
    if (!pingEl || !speedEl || !jitterEl) return;

    setInterval(() => {
        // Subtle realistic fluctuations
        const ping = (1.4 + Math.random() * 0.8).toFixed(1);
        const speed = (920 + Math.random() * 45).toFixed(0);
        const jitter = (0.08 + Math.random() * 0.08).toFixed(2);

        pingEl.textContent = ping + ' ms';
        speedEl.textContent = speed + ' Mbps';
        jitterEl.textContent = jitter + ' ms';
    }, 2400);
}

// 6. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    loadVersionData();
    initPhoneMockupTelemetry();

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }
});
