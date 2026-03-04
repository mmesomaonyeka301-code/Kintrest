// ── KINTREST PWA HANDLER ─────────────────────────────────────
// Handles: SW registration, install prompt, splash screen, app-like UX

(function () {

  // ── 1. REGISTER SERVICE WORKER ─────────────────────────────
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => {
          console.log('[Kintrest] Service Worker registered ✓', reg.scope);

          // Check for updates every 60s
          setInterval(() => reg.update(), 60000);

          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateToast();
              }
            });
          });
        })
        .catch(err => console.log('[Kintrest] SW registration failed:', err));
    });
  }

  // ── 2. INSTALL PROMPT (Add to Home Screen banner) ──────────
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show our custom install banner after 3 seconds
    setTimeout(showInstallBanner, 3000);
  });

  window.addEventListener('appinstalled', () => {
    console.log('[Kintrest] App installed! ✓');
    hideInstallBanner();
    deferredPrompt = null;
    showToast('🎉 Kintrest installed! Find it on your home screen.');
  });

  function showInstallBanner() {
    if (!deferredPrompt) return;
    if (document.getElementById('kintrest-install-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'kintrest-install-banner';
    banner.innerHTML = `
      <div style="
        position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
        background:#fff;border-radius:20px;padding:16px 20px;
        box-shadow:0 8px 40px rgba(43,31,31,.18);
        display:flex;align-items:center;gap:14px;
        z-index:9999;max-width:340px;width:calc(100% - 48px);
        border:1.5px solid #F2E4D8;
        animation:slideUp .4s cubic-bezier(.34,1.56,.64,1) both;
      ">
        <style>
          @keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(20px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
        </style>
        <div style="
          width:46px;height:46px;background:#C0213A;border-radius:13px;
          display:flex;align-items:center;justify-content:center;
          font-family:'Playfair Display',Georgia,serif;font-style:italic;
          font-size:1.4rem;font-weight:700;color:#fff;flex-shrink:0;
          box-shadow:0 4px 12px rgba(192,33,58,.3);
        ">K</div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:700;font-size:.9rem;color:#2B1F1F;margin-bottom:2px;">Install Kintrest</div>
          <div style="font-size:.78rem;color:#9B7272;">Add to home screen for the best experience</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0;">
          <button onclick="installApp()" style="
            padding:7px 14px;background:#C0213A;color:#fff;border:none;
            border-radius:999px;font-size:.78rem;font-weight:700;cursor:pointer;
            font-family:'DM Sans',sans-serif;white-space:nowrap;
          ">Install ✦</button>
          <button onclick="dismissInstall()" style="
            padding:4px;background:none;border:none;color:#9B7272;
            font-size:.74rem;cursor:pointer;font-family:'DM Sans',sans-serif;
          ">Not now</button>
        </div>
      </div>`;
    document.body.appendChild(banner);
  }

  function hideInstallBanner() {
    const b = document.getElementById('kintrest-install-banner');
    if (b) b.remove();
  }

  window.installApp = async function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('[Kintrest] Install outcome:', outcome);
    deferredPrompt = null;
    hideInstallBanner();
  };

  window.dismissInstall = function () {
    hideInstallBanner();
    // Don't show again for 7 days
    localStorage.setItem('kintrest-install-dismissed', Date.now());
  };

  // ── 3. iOS INSTALL INSTRUCTIONS ────────────────────────────
  // Safari on iPhone doesn't support beforeinstallprompt
  // so we show manual instructions instead
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isInStandaloneMode = window.navigator.standalone === true;
  const dismissed = localStorage.getItem('kintrest-ios-dismissed');

  if (isIOS && !isInStandaloneMode && !dismissed) {
    setTimeout(showiOSBanner, 3500);
  }

  function showiOSBanner() {
    if (document.getElementById('kintrest-ios-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'kintrest-ios-banner';
    banner.innerHTML = `
      <div style="
        position:fixed;bottom:0;left:0;right:0;
        background:#fff;border-radius:24px 24px 0 0;
        padding:20px 24px 36px;
        box-shadow:0 -8px 40px rgba(43,31,31,.15);
        z-index:9999;border-top:1.5px solid #F2E4D8;
        animation:slideUpFull .4s cubic-bezier(.34,1.56,.64,1) both;
      ">
        <style>
          @keyframes slideUpFull{from{transform:translateY(100%);}to{transform:translateY(0);}}
        </style>
        <div style="width:36px;height:4px;background:#F2E4D8;border-radius:999px;margin:0 auto 20px;"></div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
          <div style="width:48px;height:48px;background:#C0213A;border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-style:italic;font-size:1.5rem;font-weight:700;color:#fff;">K</div>
          <div>
            <div style="font-weight:700;font-size:1rem;color:#2B1F1F;">Install Kintrest</div>
            <div style="font-size:.8rem;color:#9B7272;">Add to your iPhone home screen</div>
          </div>
          <button onclick="dismissiOS()" style="margin-left:auto;background:none;border:none;font-size:1.2rem;color:#9B7272;cursor:pointer;padding:4px;">✕</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#FFF6F0;border-radius:12px;">
            <div style="width:32px;height:32px;background:#F2E4D8;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">1</div>
            <div style="font-size:.85rem;color:#2B1F1F;">Tap the <strong>Share</strong> button at the bottom of Safari <span style="font-size:1rem;">⬆️</span></div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#FFF6F0;border-radius:12px;">
            <div style="width:32px;height:32px;background:#F2E4D8;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">2</div>
            <div style="font-size:.85rem;color:#2B1F1F;">Scroll down and tap <strong>"Add to Home Screen"</strong> 📲</div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#FFF6F0;border-radius:12px;">
            <div style="width:32px;height:32px;background:#F2E4D8;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">3</div>
            <div style="font-size:.85rem;color:#2B1F1F;">Tap <strong>"Add"</strong> — Kintrest appears on your home screen! 🍒</div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(banner);
  }

  window.dismissiOS = function () {
    const b = document.getElementById('kintrest-ios-banner');
    if (b) b.remove();
    localStorage.setItem('kintrest-ios-dismissed', Date.now());
  };

  // ── 4. APP-LIKE UX ENHANCEMENTS ────────────────────────────

  // Prevent pull-to-refresh on Android (feels more app-like)
  let startY = 0;
  document.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchmove', e => {
    if (window.scrollY === 0 && e.touches[0].clientY > startY) {
      // Allow only if not in a scrollable child
    }
  }, { passive: true });

  // Hide browser address bar on scroll (Android)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) window.scrollTo(0, window.scrollY);
  }, { passive: true });

  // ── 5. UPDATE TOAST ────────────────────────────────────────
  function showUpdateToast() {
    const t = document.createElement('div');
    t.innerHTML = `
      <div style="
        position:fixed;top:20px;left:50%;transform:translateX(-50%);
        background:#2B1F1F;color:#fff;padding:12px 20px;border-radius:999px;
        font-size:.85rem;font-weight:600;z-index:9999;
        display:flex;align-items:center;gap:10px;
        box-shadow:0 6px 24px rgba(0,0,0,.2);
        animation:slideDown .3s ease both;
      ">
        <style>@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-16px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}</style>
        🌸 New version available!
        <button onclick="window.location.reload()" style="
          padding:5px 12px;background:#C0213A;color:#fff;border:none;
          border-radius:999px;font-size:.78rem;font-weight:700;cursor:pointer;
        ">Update</button>
      </div>`;
    document.body.appendChild(t);
  }

  // ── 6. TOAST HELPER ────────────────────────────────────────
  window.showToast = window.showToast || function(msg) {
    const w = document.getElementById('tw') || document.body;
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#2B1F1F;color:#fff;padding:11px 24px;border-radius:999px;font-size:.87rem;font-weight:600;box-shadow:0 6px 24px rgba(0,0,0,.2);z-index:1000;white-space:nowrap;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2900);
  };

})();