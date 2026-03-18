# REQUIREMENTS: dex-monitor

## v1: MVP (Minimum Viable Product)

### Project Foundation (SETUP)
- **SETUP-01**: Cấu hình môi trường phát triển với Vue 3, Vite, TypeScript và Tailwind CSS. (Hoàn thành)
- **SETUP-02**: Thiết lập cấu trúc thư mục cho modules (watchlist, alerts, notifications).
- **SETUP-03**: Cấu hình biến môi trường cho API keys (DexScreener/GeckoTerminal, Telegram Bot Token).

### Token Data Display (DATA)
- **DATA-01**: Hiển thị danh sách các token đang theo dõi (Watchlist).
- **DATA-02**: Cập nhật giá token tự động từ nguồn dữ liệu công khai (ví dụ: DexScreener API).
- **DATA-03**: Hiển thị các chỉ số cơ bản: Giá hiện tại, Biến động % (24h), Volume.
- **DATA-04**: Cho phép người dùng thêm token vào watchlist qua địa chỉ contract.
- **DATA-05**: Cho phép người dùng xóa token khỏi watchlist.

### Price Alert System (ALERT)
- **ALERT-01**: Người dùng có thể thiết lập ngưỡng giá (Price Threshold) cho một token.
- **ALERT-02**: Hỗ trợ hai loại điều kiện: Giá tăng trên (Above) và Giá giảm dưới (Below).
- **ALERT-03**: Quản lý danh sách các cảnh báo (Xem, Xóa, Tạm dừng).
- **ALERT-04**: Hệ thống kiểm tra giá định kỳ để so sánh với các ngưỡng cảnh báo.

### Telegram Notifications (NOTIF)
- **NOTIF-01**: Tích hợp Telegram Bot API để gửi tin nhắn.
- **NOTIF-02**: Người dùng có thể cấu hình Telegram Chat ID để nhận thông báo.
- **NOTIF-03**: Gửi thông báo ngay lập tức khi một cảnh báo giá được kích hoạt.

## v2: Future Enhancements (Deferred)
- **UI-01**: Biểu đồ giá (Candlestick charts).
- **DATA-06**: Theo dõi dữ liệu On-chain (Large swaps, Liquidity changes).
- **AUTH-01**: Hệ thống đăng nhập người dùng (Hiện tại MVP dùng cho cá nhân).

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Pending |
| SETUP-02 | Phase 1 | Pending |
| SETUP-03 | Phase 1 | Pending |
| DATA-01 | Phase 2 | Pending |
| DATA-02 | Phase 2 | Pending |
| DATA-03 | Phase 2 | Pending |
| DATA-04 | Phase 2 | Pending |
| DATA-05 | Phase 2 | Pending |
| ALERT-01 | Phase 3 | Pending |
| ALERT-02 | Phase 3 | Pending |
| ALERT-03 | Phase 3 | Pending |
| ALERT-04 | Phase 3 | Pending |
| NOTIF-01 | Phase 4 | Pending |
| NOTIF-02 | Phase 4 | Pending |
| NOTIF-03 | Phase 4 | Pending |
