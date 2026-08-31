(function () {
  var ATTR_NAMES = ["颜色属性", "材质/版型", "版型", "尺码", "印花位置", "工艺"];
  var ATTR_VALUES = {
    "颜色属性": ["黑色", "白色", "灰色", "米色", "透明", "本色", "红色", "藏青"],
    "材质/版型": ["毛绒-帽子", "陶瓷-11oz", "陶瓷-15oz", "毛绒-抱枕", "TPU-轻薄", "帆布-购物袋", "抓绒-卫衣"],
    "版型": ["女T恤", "马克杯", "45×45", "iPhone 15 Pro", "中号", "女卫衣 XL"],
    "尺码": ["S", "M", "L", "XL", "XXL"],
    "印花位置": ["前胸", "后背", "袖口", "满印"],
    "工艺": ["热转印", "刺绣", "数码直喷", "烫画"]
  };

  var chevron =
    '<svg class="chev" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5 9 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var listEl = document.getElementById("attr-list");
  var picker = document.getElementById("attr-picker");
  if (!listEl || !picker) return;

  var toggleBtn = document.querySelector("[data-edit-toggle]");
  var readonlyView = document.querySelector("[data-readonly-view]");
  var editView = document.querySelector("[data-edit-view]");
  var drawingInput = document.querySelector("[data-drawing-input]");
  var drawingText = document.querySelector("[data-drawing-text]");
  var attrReadonly = document.querySelector("[data-attr-readonly]");
  var editing = !toggleBtn;

  var pickerTitle = picker.querySelector("[data-picker-title]");
  var pickerSearch = picker.querySelector("[data-picker-search]");
  var pickerList = picker.querySelector("[data-picker-list]");
  var pickerState = { options: [], current: "", onPick: null, title: "" };

  function valuesFor(name) {
    return ATTR_VALUES[name] || [];
  }

  function setSelect(el, value) {
    el.dataset.value = value;
    var label = el.querySelector(".val");
    if (label) label.textContent = value || "请选择";
  }

  function syncValueForName(row, name) {
    var valueEl = row.querySelector(".field-select.value");
    var allowed = valuesFor(name);
    var current = valueEl.dataset.value;
    if (allowed.indexOf(current) === -1) {
      setSelect(valueEl, allowed[0] || "");
    }
  }

  function openPicker(title, options, current, onPick) {
    pickerState = { options: options.slice(), current: current, onPick: onPick, title: title };
    pickerTitle.textContent = title;
    pickerSearch.value = "";
    renderPicker("");
    picker.style.display = "flex";
    setTimeout(function () { pickerSearch.focus(); }, 50);
  }

  function closePicker() {
    picker.style.display = "none";
  }

  function renderPicker(query) {
    var q = (query || "").trim();
    var matched = pickerState.options.filter(function (item) {
      return !q || item.indexOf(q) !== -1;
    });
    if (!matched.length) {
      pickerList.innerHTML = '<div class="picker-empty">无匹配项</div>';
      return;
    }
    pickerList.innerHTML = matched.map(function (item) {
      var on = item === pickerState.current ? " on" : "";
      return '<div class="picker-item' + on + '" role="button" data-item="' + item + '">' + item + "</div>";
    }).join("");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function collectAttrs() {
    return Array.prototype.map.call(listEl.querySelectorAll(".attr-row"), function (row) {
      var nameEl = row.querySelector(".field-select.name");
      var valueEl = row.querySelector(".field-select.value");
      return {
        name: nameEl ? nameEl.dataset.value || "" : "",
        value: valueEl ? valueEl.dataset.value || "" : ""
      };
    });
  }

  function renderReadonly() {
    if (drawingText && drawingInput) drawingText.textContent = drawingInput.value;
    if (!attrReadonly) return;
    attrReadonly.innerHTML = collectAttrs().map(function (item) {
      return '<div class="attr-readonly-row"><span class="attr-readonly-name">' +
        escapeHtml(item.name) + "</span>：" + escapeHtml(item.value) + "</div>";
    }).join("");
  }

  function setEditMode(on) {
    editing = on;
    if (readonlyView) readonlyView.hidden = on;
    if (editView) editView.hidden = !on;
    if (toggleBtn) toggleBtn.textContent = on ? "保存" : "编辑";
    if (!on) {
      closePicker();
      renderReadonly();
    }
  }

  function bindSelect(el) {
    el.addEventListener("click", function () {
      if (!editing) return;
      var row = el.closest(".attr-row");
      var role = el.dataset.role;
      if (role === "name") {
        openPicker("选择属性名", ATTR_NAMES, el.dataset.value, function (val) {
          setSelect(el, val);
          syncValueForName(row, val);
        });
        return;
      }
      var name = row.querySelector(".field-select.name").dataset.value;
      openPicker("选择属性值", valuesFor(name), el.dataset.value, function (val) {
        setSelect(el, val);
      });
    });
  }

  function bindDelete(btn) {
    btn.addEventListener("click", function () {
      if (!editing) return;
      if (listEl.querySelectorAll(".attr-row").length <= 1) return;
      btn.closest(".attr-row").remove();
    });
  }

  function createRow(name, value) {
    var row = document.createElement("div");
    row.className = "attr-row";
    row.innerHTML =
      '<div class="field-select name" role="button" data-role="name" data-value="' + name + '">' +
        '<span class="val">' + name + "</span>" + chevron +
      "</div>" +
      '<div class="field-select value" role="button" data-role="value" data-value="' + value + '">' +
        '<span class="val">' + value + "</span>" + chevron +
      "</div>" +
      '<button type="button" class="attr-del" aria-label="删除属性">×</button>';
    bindSelect(row.querySelector(".name"));
    bindSelect(row.querySelector(".value"));
    bindDelete(row.querySelector(".attr-del"));
    return row;
  }

  listEl.querySelectorAll(".field-select").forEach(bindSelect);
  listEl.querySelectorAll(".attr-del").forEach(bindDelete);

  var addBtn = document.getElementById("attr-add");
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      if (!editing) return;
      var used = Array.prototype.map.call(listEl.querySelectorAll(".field-select.name"), function (el) {
        return el.dataset.value;
      });
      var nextName = ATTR_NAMES.filter(function (n) { return used.indexOf(n) === -1; })[0] || ATTR_NAMES[0];
      var nextValue = valuesFor(nextName)[0] || "";
      listEl.appendChild(createRow(nextName, nextValue));
    });
  }

  pickerSearch.addEventListener("input", function () {
    renderPicker(pickerSearch.value);
  });
  pickerList.addEventListener("click", function (e) {
    var item = e.target.closest(".picker-item");
    if (!item) return;
    if (pickerState.onPick) pickerState.onPick(item.getAttribute("data-item"));
    closePicker();
  });
  picker.addEventListener("click", function (e) {
    if (e.target === picker || e.target.hasAttribute("data-picker-close")) closePicker();
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      setEditMode(!editing);
    });
    setEditMode(false);
  }
})();
