# PROJECT: dex-monitor

## Vision
Tạo một trang cho mục đích cá nhân để theo dõi dữ liệu và chỉ số của một số crypto coin.

## Goals
- Theo dõi biến động giá và các chỉ số quan trọng của token.
- Hệ thống cảnh báo giá tự động.
- Tích hợp thông báo qua Telegram.

## Core Features
1. **Theo dõi dữ liệu (View):** Hiển thị giá và các chỉ số liên quan của token được chọn.
2. **Cảnh báo giá (Price Alerts):** Thiết lập ngưỡng giá để nhận thông báo.
3. **Thông báo Telegram (Telegram Notifications):** Gửi cảnh báo trực tiếp qua bot Telegram.

## Technical Context
- Frontend: Vue 3 (Vite, TypeScript, Tailwind/Vanilla CSS - following existing structure).
- Backend: API tích hợp hoặc Serverless functions (tùy thuộc vào thiết kế cụ thể).
- Integration: Telegram Bot API.
