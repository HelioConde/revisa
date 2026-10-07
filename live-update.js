(() => {
  "use strict";
  const CHECK_INTERVAL_MS = 12000;
  const VERSION_URL = "version.json";
  const CACHE_BUST_PARAM = "__v";
  const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
  if (LOCAL_HOSTS.has(window.location.hostname)) return;

  let currentVersion = null;
  let checking = false;
  let reloading = false;

  const versionValue = payload => String(payload?.sha || payload?.version || "").trim();

  async function fetchVersion() {
    const response = await fetch(VERSION_URL + "?_=" + Date.now(), { cache: "no-store", credentials: "same-origin" });
    if (!response.ok) throw new Error("version-check-" + response.status);
    return versionValue(await response.json());
  }

  function showNotice() {
    if (document.getElementById("live-update-notice")) return;
    const notice = document.createElement("div");
    notice.id = "live-update-notice";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    notice.textContent = "Nova versão publicada. Atualizando automaticamente…";
    Object.assign(notice.style, { position:"fixed", left:"50%", bottom:"18px", transform:"translateX(-50%)", zIndex:"2147483647", maxWidth:"calc(100vw - 24px)", padding:"10px 14px", borderRadius:"999px", background:"#171717", color:"#fff", font:"600 12px/1.35 system-ui,sans-serif", boxShadow:"0 10px 35px rgba(0,0,0,.25)", textAlign:"center" });
    document.body.appendChild(notice);
  }

  async function reloadFresh(nextVersion) {
    if (reloading) return;
    reloading = true;
    showNotice();
    try {
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.allSettled(keys.map(key => caches.delete(key)));
      }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 650));
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set(CACHE_BUST_PARAM, nextVersion.slice(0, 16) || Date.now().toString());
    window.location.replace(nextUrl.toString());
  }

  async function checkVersion() {
    if (checking || reloading) return;
    checking = true;
    try {
      const nextVersion = await fetchVersion();
      if (!nextVersion) return;
      if (currentVersion === null) currentVersion = nextVersion;
      else if (nextVersion !== currentVersion) await reloadFresh(nextVersion);
    } catch {} finally {
      checking = false;
    }
  }

  const url = new URL(window.location.href);
  if (url.searchParams.has(CACHE_BUST_PARAM)) {
    url.searchParams.delete(CACHE_BUST_PARAM);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }

  checkVersion();
  window.setInterval(checkVersion, CHECK_INTERVAL_MS);
  window.addEventListener("focus", checkVersion);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkVersion();
  });
})();
