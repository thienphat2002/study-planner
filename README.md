# Study Planner System 🎓

> Hệ thống hỗ trợ lập kế hoạch học tập dành cho sinh viên (Dự án NCKH - ĐH Mở TP.HCM).

## Giới thiệu
**Study Planner System** là một ứng dụng Web (được tối ưu hóa theo tiêu chuẩn PWA) giúp sinh viên dễ dàng quản lý thời gian, lập kế hoạch học tập, theo dõi tiến độ và quản lý các công việc/bài tập một cách khoa học. 

Dự án được chia thành 2 phần chính:
- **Client (Frontend):** Giao diện người dùng hiện đại, tương tác mượt mà.
- **Server (Backend):** Xử lý logic nghiệp vụ, quản lý cơ sở dữ liệu và xác thực người dùng.

---

## Tính năng nổi bật (Dự kiến)
- **PWA (Progressive Web App):** Hỗ trợ cài đặt và trải nghiệm như một ứng dụng gốc trên Desktop/Mobile.
- **Quản lý lịch học/Công việc:** Kéo thả (Drag & Drop) mượt mà để sắp xếp lịch trình.
- **Thống kê & Biểu đồ:** Trực quan hóa dữ liệu học tập, tiến độ hoàn thành mục tiêu.
- **Bảo mật & Xác thực:** Đăng nhập an toàn với JWT và mã hóa mật khẩu bcrypt.
- **Nhắc nhở tự động:** Hỗ trợ lên lịch công việc tự động (Cron jobs).

---

## Công nghệ sử dụng (Tech Stack)

### Frontend (Client)
- **Core:** React 18, Vite.
- **UI/UX & Styling:** Tailwind CSS v4, Radix UI, Material UI, Lucide React (Icons).
- **Tính năng nâng cao:** 
  - `react-dnd` (Kéo thả UI).
  - `recharts` (Vẽ biểu đồ thống kê).
  - `react-hook-form` (Quản lý form).
  - `vite-plugin-pwa` (Hỗ trợ PWA).
- **Call API:** Axios.

### Backend (Server)
- **Core:** Node.js, Express.js.
- **Database & ORM:** PostgreSQL, Prisma ORM.
- **Authentication:** JSON Web Token (JWT), bcrypt.
- **Khác:** `node-cron` (Lên lịch tác vụ), `express-validator` (Kiểm tra dữ liệu đầu vào), `helmet` & `cors` (Bảo mật bảo vệ API).

---

## Cấu trúc thư mục

```text
Study-planner-system/
│
├── Client/                 # Toàn bộ mã nguồn giao diện Frontend
│   ├── src/                # Code React (Components, Pages, Hooks...)
│   ├── public/             # Tài sản tĩnh (Hình ảnh, Icons cho PWA)
│   ├── package.json        # Danh sách thư viện FE
│   └── vite.config.ts      # Cấu hình Vite & PWA
│
├── Server/                 # Toàn bộ mã nguồn API Backend
│   ├── src/                # Code xử lý logic (Controllers, Routes, Middleware...)
│   ├── prisma/             # Cấu hình Database & Schema ORM
│   ├── server.js           # File khởi chạy server
│   └── package.json        # Danh sách thư viện BE
│
├── Database/               # Chứa các file/tài liệu liên quan database (nếu có)
├── Docs/                   # Tài liệu thiết kế hệ thống, API docs
└── README.md               # File giới thiệu dự án này
```

---

## Hướng dẫn cài đặt và chạy nội bộ (Local Development)

### 1. Yêu cầu hệ thống (Prerequisites)
- [Node.js](https://nodejs.org/) (Khuyến nghị bản LTS)
- [PostgreSQL](https://www.postgresql.org/) (Hoặc có chuỗi kết nối Database URL).

### 2. Khởi chạy Backend (Server)
Mở một cửa sổ Terminal mới và chạy các lệnh sau:
```bash
cd Server
npm install
# Tạo file .env và cấu hình DATABASE_URL, JWT_SECRET...
npx prisma generate
npx prisma db push
npm run dev
```
> Server sẽ chạy tại: `http://localhost:5000` (hoặc cổng cấu hình trong `.env`).

### 3. Khởi chạy Frontend (Client)
Mở một cửa sổ Terminal khác và chạy:
```bash
cd Client
npm install
npm run dev
```
> Giao diện sẽ chạy tại: `http://localhost:5173`. Bạn nhấn Ctrl + Click vào link để mở trình duyệt.

---

## 👨‍💻 Nhóm phát triển
- **Đơn vị:** Nhóm Nghiên cứu khoa học - Đại học Mở TP.HCM.
- **Thành viên:**
  - Nguyễn Phan Thiên Phát 
  - Nguyễn Quốc Bảo
  - Từ Ngọc Anh Khoa
  - Võ Châu Anh Kiệt
  - Nguyễn Trung Kiên
