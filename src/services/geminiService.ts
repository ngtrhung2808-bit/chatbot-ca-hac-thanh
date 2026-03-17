import { GoogleGenAI, Type, Modality, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Document {
  id: string;
  title: string;
  content: string;
}

export interface GeminiResponse {
  display_text: string;
  voice_text: string;
}

export async function* askGeminiStream(question: string, documents: Document[]) {
  const context = documents.map(doc => `TÀI LIỆU: ${doc.title}\nNỘI DUNG: ${doc.content}`).join("\n\n---\n\n");
  
  const systemInstruction = `
Bạn là Trợ lý ảo thông minh của Công an phường Hạc Thành, chuyên giải đáp về thủ tục hành chính, cư trú và căn cước.
NHIỆM VỤ:
1. Cung cấp thông tin chính xác, chuyên nghiệp và tận tâm dựa trên TÀI LIỆU được cung cấp.
2. TÀI LIỆU:
${context || "Không có tài liệu."}

QUY TẮC TRẢ LỜI:
1. NGUYÊN TẮC CỐT LÕI: Chỉ được sử dụng thông tin có trong TÀI LIỆU được cung cấp để trả lời. Tuyệt đối không sử dụng kiến thức bên ngoài, không tự ý bổ sung hoặc bịa đặt thêm các thành phần hồ sơ hay quy định không có trong tài liệu.
2. Nếu câu hỏi yêu cầu thông tin không có trong tài liệu, hãy trả lời: "Xin lỗi, hiện tại tôi chưa có thông tin cụ thể về vấn đề này trong hệ thống tài liệu được cung cấp. Vui lòng liên hệ trực tiếp Công an phường Hạc Thành để được hỗ trợ chính xác nhất."
3. Sử dụng định dạng Markdown (in đậm, danh sách, bảng) để câu trả lời rõ ràng, dễ đọc.
4. Giọng văn lịch sự, chuyên nghiệp nhưng gần gũi với người dân.
5. Định dạng đầu ra bắt buộc:
[VĂN BẢN] {nội dung hiển thị cho người dùng, sử dụng Markdown}
[GIỌNG NÓI] {nội dung ngắn gọn, súc tích để AI đọc cho người dân nghe}
`;

  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      },
    });

    let fullText = "";
    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        yield fullText;
      }
    }
  } catch (error) {
    console.error("Streaming Error:", error);
    yield "[VĂN BẢN] Lỗi kết nối. [GIỌNG NÓI] Lỗi kết nối.";
  }
}

export async function textToSpeech(text: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
}
