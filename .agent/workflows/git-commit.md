---
description: Commit và push code lên GitHub theo chuẩn Conventional Commits
---

# 🚀 Git Commit & Push Workflow

## Quy trình thực hiện

// turbo-all

### 1. Kiểm tra trạng thái hiện tại

```bash
git status
```

- Xem các file đã thay đổi, file mới, file đã xóa.
- Nếu không có thay đổi nào → dừng lại, thông báo cho user.

### 2. Kiểm tra branch hiện tại

```bash
git branch --show-current
```

- Xác nhận đang ở đúng branch cần commit.

### 3. Stage các file thay đổi

```bash
git add -A
```

- Mặc định stage **tất cả** thay đổi.
- Nếu user yêu cầu commit file cụ thể, chỉ `git add <file1> <file2>`.

### 4. Commit với Conventional Commits format

```bash
git commit -m "<type>(<scope>): <description>"
```

**Commit types:**

| Type       | Khi nào dùng                              |
|------------|-------------------------------------------|
| `feat`     | Thêm tính năng mới                       |
| `fix`      | Sửa bug                                  |
| `refactor` | Tái cấu trúc code (không thêm/sửa logic) |
| `style`    | Format, sửa CSS, không ảnh hưởng logic   |
| `docs`     | Thay đổi tài liệu                        |
| `test`     | Thêm/sửa test                            |
| `chore`    | Cập nhật config, dependencies, tooling    |
| `perf`     | Cải thiện performance                     |

**Quy tắc viết commit message:**
- `<scope>` là tên module/feature (ví dụ: `auth`, `dashboard`, `api`). Có thể bỏ nếu thay đổi chung.
- `<description>` viết bằng **tiếng Anh**, lowercase, không dấu chấm cuối, tối đa 72 ký tự.
- Ví dụ: `feat(auth): add login with Google OAuth`

### 5. Push lên remote

```bash
git push origin <branch-name>
```

- Nếu branch chưa có trên remote:

```bash
git push -u origin <branch-name>
```

### 6. Xác nhận kết quả

```bash
git log -1 --oneline
```

- Hiển thị commit vừa tạo để xác nhận thành công.
- Thông báo cho user commit hash và message.

---

## ⚠️ Lưu ý quan trọng

- **KHÔNG** commit file nhạy cảm (`.env`, secrets, tokens). Kiểm tra `.gitignore` trước.
- **KHÔNG** force push (`git push -f`) trừ khi user yêu cầu rõ ràng.
- Nếu có conflict khi push → thông báo user, **không tự resolve**.
- Nếu chưa có `.gitignore`, tạo file `.gitignore` phù hợp với tech stack (Vue 3, Node.js, Vite) trước khi commit lần đầu.
