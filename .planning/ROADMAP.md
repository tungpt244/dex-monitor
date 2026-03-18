# ROADMAP: dex-monitor

## Phases

- [ ] **Phase 1: Foundation & Infrastructure** - Thiết lập môi trường, cấu trúc modules và API Client.
- [ ] **Phase 2: Data Service & Watchlist UI** - Tích hợp API dữ liệu token và hiển thị danh sách theo dõi.
- [ ] **Phase 3: Price Alert System** - Xây dựng logic cảnh báo giá và giao diện quản lý alert.
- [ ] **Phase 4: Telegram Notification Bot** - Tích hợp Telegram Bot API và gửi thông báo khi alert được kích hoạt.

## Phase Details

### Phase 1: Foundation & Infrastructure
**Goal**: Chuẩn bị nền tảng kỹ thuật và cấu hình cần thiết cho dự án.
**Depends on**: N/A
**Requirements**: SETUP-01, SETUP-02, SETUP-03
**Success Criteria**:
  1. Ứng dụng chạy thành công với Vite và TypeScript.
  2. Cấu trúc thư mục theo đúng module được phân chia.
  3. Các biến môi trường cho API được cấu hình và truy cập được từ ứng dụng.
**Plans**: TBD

### Phase 2: Data Service & Watchlist UI
**Goal**: Kết nối dữ liệu token thực tế và cho phép người dùng quản lý danh sách theo dõi.
**Depends on**: Phase 1
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05
**Success Criteria**:
  1. Người dùng có thể nhập địa chỉ contract để thêm token vào watchlist.
  2. Giá và các chỉ số (volume, biến động) hiển thị dữ liệu thực từ API (ví dụ: DexScreener).
  3. Danh sách watchlist được lưu trữ cục bộ (LocalStorage) hoặc state management.
**Plans**: TBD

### Phase 3: Price Alert System
**Goal**: Xây dựng hệ thống theo dõi giá và kích hoạt cảnh báo khi đạt ngưỡng.
**Depends on**: Phase 2
**Requirements**: ALERT-01, ALERT-02, ALERT-03, ALERT-04
**Success Criteria**:
  1. Người dùng có thể thiết lập ngưỡng "Above" hoặc "Below" cho bất kỳ token nào trong watchlist.
  2. Hệ thống định kỳ kiểm tra giá và đánh dấu các alert đã kích hoạt.
  3. Người dùng có thể xem danh sách các alert hiện có và xóa chúng.
**Plans**: TBD

### Phase 4: Telegram Notification Bot
**Goal**: Kết nối với Telegram để gửi thông báo tự động đến người dùng.
**Depends on**: Phase 3
**Requirements**: NOTIF-01, NOTIF-02, NOTIF-03
**Success Criteria**:
  1. Người dùng có thể cấu hình Chat ID của mình trong ứng dụng.
  2. Tin nhắn cảnh báo được gửi thành công đến Telegram khi giá đạt ngưỡng đã thiết lập.
  3. Nội dung tin nhắn chứa thông tin chi tiết: Tên token, giá hiện tại và điều kiện đã kích hoạt.
**Plans**: TBD

---

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/1 | Not started | - |
| 2. Data Service | 0/1 | Not started | - |
| 3. Price Alerts | 0/1 | Not started | - |
| 4. Telegram Bot | 0/1 | Not started | - |
