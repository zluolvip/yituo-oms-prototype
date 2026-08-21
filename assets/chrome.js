(function () {
  const screen = document.querySelector(".phone-screen");
  if (!screen) return;

  const time = screen.dataset.time || "9:41";
  const battery = Number(screen.dataset.battery || 100);

  const island = document.createElement("div");
  island.className = "ios-island";

  const status = document.createElement("div");
  status.className = "ios-status";
  status.innerHTML =
    "<span>" + time + "</span>" +
    '<div class="ios-status-icons">' +
      '<div class="ios-signal"><i style="height:4px"></i><i style="height:6px"></i><i style="height:9px"></i><i style="height:11px"></i></div>' +
      '<svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 11.5a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/><path d="M3 7.5a7 7 0 0110 0" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M1 4.5a11 11 0 0114 0" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.7"/></svg>' +
      '<div class="ios-battery"><span style="width:' + battery + '%"></span></div>' +
    "</div>";

  const capsule = document.createElement("div");
  capsule.className = "wx-capsule";
  capsule.innerHTML =
    '<div class="wx-more"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>' +
    '<div class="split"></div>' +
    '<div class="wx-close"><span class="ring"></span></div>';

  const home = document.createElement("div");
  home.className = "ios-home";

  screen.prepend(status);
  screen.prepend(island);
  screen.appendChild(capsule);
  screen.appendChild(home);

  const app = screen.querySelector(".app");
  if (!app) return;

  if (screen.dataset.nav) {
    const nav = document.createElement("div");
    nav.className = "navbar";
    const back = screen.dataset.back === "true"
      ? '<div class="navbar-left"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
      : '<div class="navbar-left"></div>';
    const right = screen.dataset.navRight
      ? '<div class="navbar-right">' + screen.dataset.navRight + "</div>"
      : '<div class="navbar-right"></div>';
    nav.innerHTML = back + '<div class="navbar-title">' + screen.dataset.nav + "</div>" + right;
    app.prepend(nav);
    if (screen.dataset.backHref) {
      const backEl = nav.querySelector(".navbar-left");
      backEl.style.cursor = "pointer";
      backEl.addEventListener("click", function () {
        location.href = screen.dataset.backHref;
      });
    }
  }

  if (screen.dataset.tab) {
    const active = screen.dataset.tab;
    const items = [
      { id: "home", label: "首页", icon: "home" },
      { id: "orders", label: "订单", icon: "order" },
      { id: "messages", label: "消息", icon: "chat", badge: "3" },
      { id: "profile", label: "我的", icon: "user" },
    ];
    const icons = {
      home: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
      order: '<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      chat: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 18.5l1.6-3.2A7.5 7.5 0 1112 19.5H7.2L5 18.5z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
      user: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.2" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 19c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    };
    const bar = document.createElement("div");
    bar.className = "tabbar";
    bar.innerHTML = items.map(function (t) {
      return (
        '<div class="tab-item' + (t.id === active ? " active" : "") + '">' +
          icons[t.icon] +
          (t.badge ? '<span class="tab-dot">' + t.badge + "</span>" : "") +
          "<span>" + t.label + "</span>" +
        "</div>"
      );
    }).join("");
    app.appendChild(bar);
  }
})();
