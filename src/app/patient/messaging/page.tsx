"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Paperclip, 
  Mic, 
  Phone, 
  Video, 
  Search, 
  Sparkles, 
  CheckCheck,
  FileText,
  Play,
  Volume2,
  Lock,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isVoice?: boolean;
  isAttachment?: boolean;
  attachmentName?: string;
}

interface ChatSession {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  online: boolean;
  lastMsg: string;
  time: string;
  unread: number;
  messages: Message[];
}

export default function PatientMessagingPage() {
  const [activeChat, setActiveChat] = React.useState("doc-1");
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  const [chats, setChats] = React.useState<ChatSession[]>([
    {
      id: "doc-1",
      name: "Dr. Sarah Jenkins",
      specialty: "Cardiology",
      avatar: "S",
      online: true,
      lastMsg: "Let's review your BP logs on June 25th.",
      time: "10:32 AM",
      unread: 0,
      messages: [
        { id: "m-1", sender: "doctor", content: "Hello Jane, I reviewed your recent lipid panel. Since your LDL cholesterol is slightly high, I want to discuss dietary adjustments. Let's talk during your follow-up appointment on June 25th.", timestamp: "Yesterday, 9:15 AM" },
        { id: "m-2", sender: "patient", content: "Thank you Dr. Jenkins. I will start tracking my meals and bring my logs. Can I continue the current dose of Lisinopril?", timestamp: "Yesterday, 11:20 AM" },
        { id: "m-3", sender: "doctor", content: "Yes, please continue with Lisinopril 10mg daily as prescribed. We will check your blood pressure at the clinic.", timestamp: "Yesterday, 12:00 PM" },
        { id: "m-4", sender: "patient", content: "Great. I also uploaded my diagnostic discharge paper from Mercy Clinic to the Vault.", timestamp: "10:28 AM" },
        { id: "m-5", sender: "doctor", content: "Excellent. Let's review your BP logs on June 25th.", timestamp: "10:32 AM" }
      ]
    },
    {
      id: "doc-2",
      name: "Dr. Alex Mercer",
      specialty: "Neurology",
      avatar: "A",
      online: false,
      lastMsg: "Send over your sleep logs when complete.",
      time: "2 Days ago",
      unread: 1,
      messages: [
        { id: "n-1", sender: "doctor", content: "Hello Jane, welcome to Neurology support. Please make sure to track your headaches daily.", timestamp: "3 Days ago" },
        { id: "n-2", sender: "patient", content: "Sure, I am keeping a diary. I will send it over.", timestamp: "2 Days ago" },
        { id: "n-3", sender: "doctor", content: "Send over your sleep logs when complete.", timestamp: "2 Days ago" }
      ]
    }
  ]);

  const activeChatData = chats.find(c => c.id === activeChat) || chats[0];
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatData.messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "patient",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    };

    // Append message to active chat
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          lastMsg: inputValue,
          time: newMsg.timestamp,
          messages: [...chat.messages, newMsg]
        };
      }
      return chat;
    }));

    const promptText = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate Doctor response
    setTimeout(() => {
      let docResponse = "I've logged this information to your file. We will audit this during our clinic consult.";
      if (promptText.toLowerCase().includes("bp") || promptText.toLowerCase().includes("blood pressure")) {
        docResponse = "Maintaining blood pressure logs is key. If systolic BP spikes above 160, please contact us immediately.";
      } else if (promptText.toLowerCase().includes("dose") || promptText.toLowerCase().includes("medication")) {
        docResponse = "Continue the prescribed medication dosage schedule. Do not alter therapeutic frequencies without clinical review.";
      }

      const replyMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "doctor",
        content: docResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            lastMsg: docResponse,
            time: replyMsg.timestamp,
            messages: [...chat.messages, replyMsg]
          };
        }
        return chat;
      }));
      setIsTyping(false);
    }, 1500);
  };

  const handleAttachMock = () => {
    const attachMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "patient",
      content: "Attached document: Lipid_Panel_May_2026.pdf",
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      isAttachment: true,
      attachmentName: "Lipid_Panel_May_2026.pdf"
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          lastMsg: "Attached file: Lipid_Panel_May_2026.pdf",
          time: attachMsg.timestamp,
          messages: [...chat.messages, attachMsg]
        };
      }
      return chat;
    }));

    setIsTyping(true);
    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "doctor",
        content: "File received. Running automated AI clinical panel summary checks.",
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      };
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            lastMsg: replyMsg.content,
            time: replyMsg.timestamp,
            messages: [...chat.messages, replyMsg]
          };
        }
        return chat;
      }));
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)] items-stretch">
      
      {/* Left Column: Chats list */}
      <div className="col-span-1 border border-border bg-card rounded-2xl overflow-hidden flex flex-col h-full shadow-xs">
        <div className="p-4 border-b border-border space-y-3 shrink-0">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-800">Secure Messages</h3>
            <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-wider bg-slate-50">
              <Lock className="h-2.5 w-2.5 mr-1 text-emerald-500 inline" />
              e2ee
            </Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8 text-xs bg-slate-50/50" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={cn(
                "w-full text-left p-3 rounded-xl hover:bg-muted/40 transition-colors flex items-start gap-3 border cursor-pointer",
                activeChat === chat.id 
                  ? "bg-primary/5 border-primary/20 font-semibold" 
                  : "border-transparent"
              )}
            >
              <div className="relative shrink-0">
                <div className="h-9 w-9 rounded-full bg-sky-100 flex items-center justify-center font-bold text-primary text-xs">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-800 truncate">{chat.name}</span>
                  <span className="text-[9px] text-muted-foreground font-semibold">{chat.time}</span>
                </div>
                <p className="text-[10px] text-primary font-bold uppercase mt-0.5">{chat.specialty}</p>
                <p className="text-[10px] text-muted-foreground truncate leading-relaxed mt-0.5">
                  {chat.lastMsg}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Chat Window */}
      <div className="lg:col-span-3 border border-border bg-card rounded-2xl overflow-hidden flex flex-col h-full shadow-premium">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center font-bold text-primary text-xs select-none">
              {activeChatData.avatar}
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-800">{activeChatData.name}</h4>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                <span className={cn("h-1.5 w-1.5 rounded-full", activeChatData.online ? "bg-emerald-500" : "bg-slate-400")} />
                {activeChatData.specialty} Department &bull; {activeChatData.online ? "Online" : "Away"}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 cursor-pointer" onClick={() => alert("Secure clinical voice call initiated (Mock).")}>
              <Phone className="h-3.5 w-3.5 text-slate-600" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 cursor-pointer" onClick={() => alert("Secure HIPAA telehealth room requested (Mock).")}>
              <Video className="h-3.5 w-3.5 text-slate-600" />
            </Button>
          </div>
        </div>

        {/* Message bubble stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          
          <div className="text-center py-2 shrink-0 select-none">
            <span className="px-2.5 py-1 text-[9px] font-bold text-slate-400 bg-slate-100 rounded-full uppercase tracking-wider">
              🛡️ End-to-end Encrypted HIPAA Connection
            </span>
          </div>

          {activeChatData.messages.map((msg) => {
            const isPatient = msg.sender === "patient";
            return (
              <div 
                key={msg.id}
                className={cn(
                  "flex items-start gap-2.5 max-w-[80%] sm:max-w-[65%]",
                  isPatient ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className="flex-1 space-y-1">
                  {msg.isAttachment ? (
                    <div className="p-3 bg-white border border-border rounded-2xl flex items-center gap-3 shadow-xs">
                      <div className="h-9 w-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-slate-800 block truncate">{msg.attachmentName}</span>
                        <span className="text-[9px] text-muted-foreground uppercase font-bold block">Document Vault Attachment</span>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={cn(
                        "p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-xs font-medium",
                        isPatient 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-white border border-border text-slate-800 rounded-tl-none"
                      )}
                    >
                      {msg.content}
                    </div>
                  )}
                  <span className={cn("text-[9px] font-semibold text-slate-400 block", isPatient ? "text-right" : "text-left")}>
                    {msg.timestamp} {isPatient && <CheckCheck className="h-3.5 w-3.5 text-emerald-500 inline ml-0.5" />}
                  </span>
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="flex items-start gap-3 max-w-[50%] mr-auto animate-pulse">
              <div className="p-3 rounded-2xl bg-white border border-border text-xs text-muted-foreground italic">
                Dr. Jenkins is writing a response...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <div className="p-4 border-t border-border bg-card flex items-center gap-2 shrink-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 w-9 p-0 shrink-0 cursor-pointer"
            onClick={handleAttachMock}
            title="Attach file from Document Vault"
          >
            <Paperclip className="h-4 w-4 text-slate-600" />
          </Button>
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            placeholder="Type your message securely..." 
            className="flex-1 text-xs" 
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="shrink-0 h-9 w-9 p-0 cursor-pointer font-bold"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

      </div>

    </div>
  );
}
