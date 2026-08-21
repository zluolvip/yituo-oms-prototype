# 设计方向确认

- 日期：2026-08-21
- 来源：用户本次会话原话，已指定设计方向，跳过三方向门

## 用户原话

> 请你根据该需求文档，帮我在 prototype 中实现该小程序的原型图。
> 样式：使用 HTML + Tailwind CSS（或 Bootstrap）开发所有原型界面。并且使用 TDesgin 的设计风格
> 代码结构：每个界面以独立 HTML 文件形式存储……index.html 作为主入口……通过 iframe 嵌入各界面文件，并在 index 页面中平铺展示所有页面，避免使用链接跳转。
> 真实感增强：界面尺寸需模拟 iPhone 15 Pro 的屏幕规格，并应用圆角设计，以贴近真实移动设备的外观。

## 执行决定

- 视觉：TDesign Original（品牌色 `#0052D9`，中性灰阶、语义色、圆角 token 对齐腾讯 TDesign 小程序规范）
- 结构：独立 HTML + `index.html` iframe 平铺概览墙
- 设备：iPhone 15 Pro 逻辑分辨率 393×852，设备框规格对齐 `ios_frame.jsx`（灵动岛 124×36 / 状态栏 54 / Home Indicator）
- 气质：企业级移动 OMS，冷静、高信息密度，不做消费级渐变 slop
