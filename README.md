# 🚔 Dự án Chatbot Công an phường Hạc Thành
Dự án chatbot hỗ trợ thủ tục hành chính, cư trú và PCCC.

**GitHub Repository:** [https://github.com/ngtrhung2808-bit/chatbot-ca-hac-thanh](https://github.com/ngtrhung2808-bit/chatbot-ca-hac-thanh)
Dự án này là một Trợ lý ảo AI thông minh giúp giải đáp các thủ tục hành chính, cư trú và PCCC cho công dân phường Hạc Thành, tỉnh Thanh Hóa.

## 🚀 Công nghệ sử dụng
- **Frontend:** React + Vite + Tailwind CSS
- **AI Engine:** Google Gemini SDK (`@google/genai`)
- **Deployment:** Vercel

## 📁 Cấu trúc quan trọng
1. `src/data/defaultKnowledge.ts`: **KHO KIẾN THỨC VĨNH VIỄN**. 
   - Đây là nơi AI lấy dữ liệu để trả lời dân. 
   - Thêm đối tượng mới vào mảng `DEFAULT_KNOWLEDGE` để bổ sung kiến thức.
2. `src/App.tsx`: **GIAO DIỆN**. Chỉnh sửa Logo, Tên đơn vị.
3. `src/services/geminiService.ts`: **CẤU HÌNH AI**. Sửa cách xưng hô của AI (System Instruction).
4. `.env`: **CHÌA KHÓA**. Chứa `GEMINI_API_KEY`. (Lưu ý: Không đẩy file này lên GitHub).

## 🛠 Cách bổ sung kiến thức cho người mới
1. Mở file `src/data/defaultKnowledge.ts`.
2. Thêm một cụm `{ id: '...', title: '...', content: '...' }` vào mảng.
3. Lưu file và chạy lệnh `npx vercel --prod` để cập nhật lên web.

---
*Dự án được bàn giao từ Antigravity AI Assistant.*

