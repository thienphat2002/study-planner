import { RouterProvider } from "react-router";
import { router } from "./routes";
// Import nút Install (Bạn nhớ kiểm tra lại đường dẫn file này cho khớp với thư mục của bạn nhé)
import InstallPrompt from "./components/InstallPrompt";
// Import hàm đăng ký PWA
import { registerSW } from "virtual:pwa-register";

// 1. Kích hoạt Service Worker để app chạy được Offline
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Có phiên bản mới của ứng dụng. Bạn có muốn tải lại trang?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App đã sẵn sàng hoạt động offline!");
  },
});

export default function App() {
  return (
    <>
      {/* 2. Giữ nguyên hệ thống Routing của bạn */}
      <RouterProvider router={router} />

      {/* 3. Chèn nút hiển thị Cài đặt PWA (Nút này sẽ ẩn nếu người dùng dùng web/đã cài) */}
      <InstallPrompt />
    </>
  );
}
