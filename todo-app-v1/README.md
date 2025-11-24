# 📝 Todo App - Version 1 (Basic)

## 🎯 Giới thiệu

Đây là **phiên bản cơ bản** của Todo App - phiên bản trước khi nâng cấp.

### Đặc điểm Version 1:
- ✅ Code đơn giản, dễ hiểu
- ✅ Tất cả logic trong 1 component
- ✅ Sử dụng useState và useEffect cơ bản
- ✅ LocalStorage persistence
- ✅ CRUD operations đầy đủ

### Không có trong V1:
- ❌ Custom hooks
- ❌ Context API (theme)
- ❌ Component tách nhỏ
- ❌ Performance optimization (useMemo, useCallback)
- ❌ Filter và Search
- ❌ Dark/Light theme

## 📂 Cấu trúc

```
src/
├── components/
│   ├── TodoApp.jsx         # Tất cả logic ở đây
│   └── TodoApp.module.css  # Styles
├── App.jsx                 # Root component
└── main.jsx               # Entry point
```

## 🚀 Chạy dự án

```bash
cd todo-app-v1

# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
```

App sẽ chạy tại: http://localhost:5173

## ✨ Tính năng

- ✅ Thêm task mới
- ✅ Sửa task (double click hoặc Edit button)
- ✅ Xóa task
- ✅ Đánh dấu completed/incomplete
- ✅ Hiển thị thống kê (Total, Done, Not Done)
- ✅ Lưu vào localStorage tự động

## 📖 Học từ V1

### React Hooks được dùng:
1. **useState** - Quản lý state
2. **useEffect** - Load và save từ localStorage

### Pattern:
- Component đơn giản, tất cả ở 1 file
- Props không cần truyền
- Logic gần UI

### Ưu điểm:
- ✅ Dễ hiểu cho người mới
- ✅ Code ngắn gọn
- ✅ Nhanh để prototype

### Nhược điểm:
- ❌ Component quá dài
- ❌ Khó maintain khi scale
- ❌ Không reusable
- ❌ Không tối ưu performance

## 🎓 So sánh với V2

| Khía cạnh | V1 | V2 |
|-----------|----|----|
| Components | 1 | 8 |
| Custom Hooks | 0 | 3 |
| Lines of Code | ~180 | ~500+ |
| Features | 5 | 15+ |
| Performance | Basic | Optimized |
| Maintainability | Low | High |
| Learning Curve | Easy | Medium |

## 📚 Đọc code

Bắt đầu từ `src/components/TodoApp.jsx` - tất cả logic ở đây!

### Flow đơn giản:
1. Load tasks từ localStorage (useEffect)
2. Hiển thị UI với tasks
3. User thao tác → Update state
4. Save vào localStorage (useEffect)

## 💡 Khi nào dùng pattern V1?

✅ **Nên dùng khi:**
- Dự án nhỏ, prototype
- Học React cơ bản
- Solo project, không cần maintain lâu
- Deadline gấp

❌ **Không nên dùng khi:**
- Dự án lớn, production
- Team nhiều người
- Cần scale về sau
- Performance quan trọng

## 🚀 Nâng cấp lên V2

Xem folder `todo-app-v2` để thấy phiên bản nâng cấp với:
- Custom hooks
- Component architecture
- Performance optimization
- Theme system
- Filter & Search
- Và nhiều hơn nữa!

---

**V1 là nền tảng tốt để học React basics! 🎓**

*Sau khi hiểu V1, chuyển sang V2 để học advanced patterns.*

