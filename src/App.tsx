/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { 
  Send, 
  Plus, 
  Trash2, 
  FileText, 
  MessageSquare, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  Volume2,
  VolumeX,
  Play,
  BookOpen,
  AlertCircle,
  Mic,
  MicOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { askGeminiStream, textToSpeech, Document } from './services/geminiService';
import { DEFAULT_KNOWLEDGE } from './data/defaultKnowledge';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  voiceText?: string;
  audioData?: string;
  timestamp: Date;
}

export default function App() {
  const [documents, setDocuments] = useState<Document[]>(() => {
    const saved = localStorage.getItem('admin_docs');
    const userDocs = saved ? JSON.parse(saved) : [];
    // Kết hợp kiến thức mặc định và kiến thức người dùng tải lên
    return [...DEFAULT_KNOWLEDGE, ...userDocs.filter((d: Document) => !DEFAULT_KNOWLEDGE.some(dk => dk.id === d.id))];
  });
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_messages');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
    }
    // Initial greeting if no history
    return [{
      id: 'greeting',
      role: 'bot',
      text: 'Chào quý công dân, tôi là AI của Công an phường Hạc Thành. Tôi có thể giúp gì được cho bạn về thủ tục hành chính?',
      voiceText: 'Chào quý công dân, tôi là AI của Công an phường Hạc Thành. Tôi có thể giúp gì được cho bạn về thủ tục hành chính?',
      timestamp: new Date()
    }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  
  // Save to localStorage whenever documents or messages change
  useEffect(() => {
    localStorage.setItem('admin_docs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Document form state
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocContent, setNewDocContent] = useState('');
  const [isAddingDoc, setIsAddingDoc] = useState(false);

  const logoSrc = "https://inhoangkien.vn/wp-content/uploads/2021/09/Logo-B%E1%BB%99-C%C3%B4ng-an-vector-01-e1632909148729.jpg";

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = true; // Cho phép nói liên tục, không tự ngắt khi dừng nghỉ
      recognition.interimResults = true; // Hiển thị kết quả tạm thời để người dùng thấy bot đang nghe

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setInput(prev => {
            // Loại bỏ phần interim cũ nếu có (thực tế setInput này sẽ ghi đè)
            const trimmedPrev = prev.trim();
            return trimmedPrev ? `${trimmedPrev} ${finalTranscript.trim()}` : finalTranscript.trim();
          });
        }
        
        // Ghi chú: Xử lý hiển thị interimTranscript nếu muốn người dùng thấy chữ đang nhảy
        // Ở đây ta có thể tạm thời cộng dồn vào input hoặc dùng 1 state riêng
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Start recognition error:", error);
      }
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        role: 'bot',
        text: '...',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);

      let finalDisplayText = "";
      let finalVoiceText = "";

      for await (const fullText of askGeminiStream(input, documents)) {
        const textMatch = fullText.match(/\[VĂN BẢN\](.*?)(\[GIỌNG NÓI\]|$)/s);
        const voiceMatch = fullText.match(/\[GIỌNG NÓI\](.*)$/s);
        
        let displayText = "";
        if (textMatch) {
          displayText = textMatch[1].trim();
        } else {
          // If tags haven't appeared yet, don't show the raw tags
          displayText = fullText.replace(/\[VĂN BẢN\]/g, '').replace(/\[GIỌNG NÓI\].*$/s, '').trim();
        }
        
        const voiceText = voiceMatch ? voiceMatch[1].trim() : displayText;

        finalDisplayText = displayText;
        finalVoiceText = voiceText;

        setMessages(prev => prev.map(m => 
          m.id === botMessageId ? { ...m, text: displayText || '...', voiceText: voiceText } : m
        ));
      }

      // Generate audio in background if TTS is enabled
      if (isTTSEnabled && finalVoiceText) {
        const generatedAudio = await textToSpeech(finalVoiceText);
        if (generatedAudio) {
          setMessages(prev => prev.map(m => 
            m.id === botMessageId ? { ...m, audioData: generatedAudio } : m
          ));
          playAudioFromBase64(generatedAudio, botMessageId);
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const playTTS = async (text: string, messageId: string, existingAudio?: string) => {
    if (isSpeaking === messageId) return;
    
    if (existingAudio) {
      playAudioFromBase64(existingAudio, messageId);
      return;
    }

    setIsSpeaking(messageId);
    try {
      const base64Audio = await textToSpeech(text);
      if (base64Audio) {
        playAudioFromBase64(base64Audio, messageId);
      } else {
        setIsSpeaking(null);
      }
    } catch (error) {
      console.error("Playback error:", error);
      setIsSpeaking(null);
    }
  };

  const playAudioFromBase64 = (base64Audio: string, messageId: string) => {
    setIsSpeaking(messageId);
    try {
      // 1. Chuyển Base64 sang ArrayBuffer
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 2. Chuyển PCM 16-bit sang Float32
      const pcmData = new Int16Array(bytes.buffer);
      const floatData = new Float32Array(pcmData.length);
      for (let i = 0; i < pcmData.length; i++) {
        floatData[i] = pcmData[i] / 32768.0;
      }

      // 3. Tạo Buffer và phát
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const buffer = audioContext.createBuffer(1, floatData.length, 24000);
      buffer.getChannelData(0).set(floatData);

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      
      source.onended = () => {
        setIsSpeaking(null);
        audioContext.close();
      };

      source.start();
    } catch (error) {
      console.error("Audio processing error:", error);
      setIsSpeaking(null);
    }
  };

  const addDocument = () => {
    if (!newDocTitle.trim() || !newDocContent.trim()) return;
    
    const newDoc: Document = {
      id: Date.now().toString(),
      title: newDocTitle,
      content: newDocContent,
    };

    setDocuments(prev => [...prev, newDoc]);
    setNewDocTitle('');
    setNewDocContent('');
    setIsAddingDoc(false);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="flex h-screen bg-red-50 text-slate-900 font-sans overflow-hidden">
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Header */}
        <header className="h-16 bg-red-700 border-b border-red-800 flex items-center px-6 justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm border border-red-200 overflow-hidden p-1">
              <img 
                src={logoSrc} 
                alt="Logo Công an nhân dân" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-bold text-white">Công an phường Hạc Thành, tỉnh Thanh Hóa</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-red-100 font-medium uppercase tracking-wider">Giải đáp thủ tục hành chính 24/7</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsTTSEnabled(!isTTSEnabled)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isTTSEnabled 
                  ? 'bg-red-800 text-white border border-red-900' 
                  : 'bg-red-600 text-red-100 border border-red-500'
              }`}
              title={isTTSEnabled ? "Tắt đọc tự động" : "Bật đọc tự động"}
            >
              {isTTSEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{isTTSEnabled ? "Đọc tự động: Bật" : "Đọc tự động: Tắt"}</span>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-32 h-32 mb-6 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100 overflow-hidden p-2">
                <img 
                  src={logoSrc} 
                  alt="Logo Công an nhân dân" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Chào bạn!</h2>
              <p className="text-slate-500 mb-8">
                Tôi là AI thông minh của Công an phường Hạc Thành, hỗ trợ hướng dẫn thủ tục hành chính. Hãy đặt câu hỏi và tôi sẽ trả lời dựa trên kiến thức chính thức.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm relative group ${
                  msg.role === 'user' 
                    ? 'bg-white border border-slate-200 text-slate-800 rounded-tr-none' 
                    : 'bg-white border border-red-100 text-slate-800 rounded-tl-none'
                }`}>
                  <div className="text-sm leading-relaxed prose prose-slate max-w-none prose-sm">
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    )}
                  </div>
                  
                  <div className={`flex items-center justify-between mt-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <p className={`text-[10px] opacity-50`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    
                    {msg.role === 'bot' && (
                      <button 
                        onClick={() => playTTS(msg.voiceText || msg.text, msg.id, msg.audioData)}
                        disabled={isSpeaking === msg.id}
                        className={`p-1 rounded-full transition-colors ${
                          isSpeaking === msg.id 
                            ? 'text-red-600 bg-red-50' 
                            : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                        }`}
                        title="Đọc câu trả lời"
                      >
                        {isSpeaking === msg.id ? (
                          <div className="flex gap-0.5">
                            <span className="w-0.5 h-2 bg-red-500 animate-pulse"></span>
                            <span className="w-0.5 h-3 bg-red-500 animate-pulse [animation-delay:0.2s]"></span>
                            <span className="w-0.5 h-2 bg-red-500 animate-pulse [animation-delay:0.4s]"></span>
                          </div>
                        ) : (
                          <Play size={12} fill="currentColor" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-red-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-red-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-red-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-red-300 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-red-200">
          <form onSubmit={handleSendMessage} className="relative max-w-4xl mx-auto">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn về thủ tục hành chính..."
              className="w-full py-4 pl-6 pr-28 bg-white border border-red-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <button 
                type="button"
                onClick={toggleRecording}
                disabled={isLoading}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
                title={isRecording ? "Đang lắng nghe..." : "Nói để nhập liệu"}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-sm"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-medium">
            Trả lời dựa trên tài liệu hướng dẫn chính thức
          </p>
        </div>
      </main>

      {/* Add Document Modal */}
      <AnimatePresence>
        {isAddingDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingDoc(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">Thêm tài liệu mới</h2>
                <p className="text-sm text-slate-500 mt-1">Cung cấp nội dung văn bản để bot học kiến thức.</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tiêu đề tài liệu</label>
                  <input 
                    type="text" 
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="Ví dụ: Thủ tục cấp hộ chiếu"
                    className="w-full p-3 bg-white border border-red-200 rounded-lg focus:outline-none focus:border-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nội dung chi tiết</label>
                  <textarea 
                    rows={8}
                    value={newDocContent}
                    onChange={(e) => setNewDocContent(e.target.value)}
                    placeholder="Dán nội dung văn bản hành chính vào đây..."
                    className="w-full p-3 bg-white border border-red-200 rounded-lg focus:outline-none focus:border-red-500 text-sm resize-none"
                  />
                </div>
              </div>
              <div className="p-6 bg-red-50 flex justify-end gap-3">
                <button 
                  onClick={() => setIsAddingDoc(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={addDocument}
                  disabled={!newDocTitle.trim() || !newDocContent.trim()}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Lưu tài liệu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
