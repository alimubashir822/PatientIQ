"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  Search, 
  Sparkles, 
  CheckCheck,
  FileText,
  User,
  Heart,
  Activity,
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
  email: string;
  gender: string;
  age: number;
  vitals: string;
  meds: string;
  avatar: string;
  online: boolean;
  lastMsg: string;
  time: string;
  unread: number;
  messages: Message[];
}

export default function DoctorMessagingPage() {
  const [activeChat, setActiveChat] = React.useState("pat-1");
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  const [chats, setChats] = React.useState<ChatSession[]>([
    {
      id: "pat-1",
      name: "Jane Doe",
      email: "patient@patientiq.com",
      gender: "Female",
      age: 41,
      vitals: "BP: 132/82, Temp: 98.6°F, HR: 72 bpm",
      meds: "Lisinopril 10mg QD",
      avatar: "J",
      online: true,
      lastMsg: "Great. I also uploaded my diagnostic discharge paper from Mercy Clinic to the Vault.",
      time: "10:28 AM",
      unread: 0,
      messages: [
        { id: "m-1", sender: "doctor", content: "Hello Jane, I reviewed your recent lipid panel. Since your LDL cholesterol is slightly high, I want to discuss dietary adjustments. Let's talk during your follow-up appointment on June 25th.", timestamp: "Yesterday, 9:15 AM" },
        { id: "m-2", sender: "patient", content: "Thank you Dr. Jenkins. I will start tracking my meals and bring my logs. Can I continue the current dose of Lisinopril?", timestamp: "Yesterday, 11:20 AM" },
        { id: "m-3", sender: "doctor", content: "Yes, please continue with Lisinopril 10mg daily as prescribed. We will check your blood pressure at the clinic.", timestamp: "Yesterday, 12:00 PM" },
        { id: "m-4", sender: "patient", content: "Great. I also uploaded my diagnostic discharge paper from Mercy Clinic to the Vault.", timestamp: "10:28 AM" }
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
      sender: "doctor",
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

    setInputValue("");
    setIsTyping(true);

    // Simulate patient automated reply after 2 seconds
    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "patient",
        content: "Got it, doctor. I will update my logs and confirm before my checkup.",
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
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)] items-stretch">
      
      {/* Left Column: Patient chats list */}
      <div className="col-span-1 border border-border bg-card rounded-2xl overflow-hidden flex flex-col h-full shadow-xs">
        <div className="p-4 border-b border-border space-y-3 shrink-0">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-800">Patient Messages</h3>
            <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-wider bg-slate-50">
              <Lock className="h-2.5 w-2.5 mr-1 text-emerald-500 inline" />
              e2ee
            </Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search patients..." className="pl-8 text-xs bg-slate-50/50" />
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
                <div className="h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center font-bold text-accent text-xs">
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
                <p className="text-[10px] text-slate-500 mt-0.5">{chat.email}</p>
                <p className="text-[10px] text-muted-foreground truncate leading-relaxed mt-0.5 font-medium">
                  {chat.lastMsg}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Chat Window & Clinical Context */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 border border-border bg-card rounded-2xl overflow-hidden h-full shadow-premium">
        
        {/* Chat Stream (col-span-2) */}
        <div className="col-span-1 md:col-span-2 flex flex-col h-full border-r border-border overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border bg-card flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center font-bold text-accent text-xs select-none">
                {activeChatData.avatar}
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-800">{activeChatData.name}</h4>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active Consult Context
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 cursor-pointer" onClick={() => alert("Secure clinical audio line request logged.")}>
                <Phone className="h-3.5 w-3.5 text-slate-600" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 cursor-pointer" onClick={() => alert("Secure telehealth video line request logged.")}>
                <Video className="h-3.5 w-3.5 text-slate-600" />
              </Button>
            </div>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {activeChatData.messages.map((msg) => {
              const isDoctor = msg.sender === "doctor";
              return (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex items-start gap-2.5 max-w-[85%] sm:max-w-[70%]",
                    isDoctor ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className="flex-1 space-y-1">
                    <div 
                      className={cn(
                        "p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-xs font-medium",
                        isDoctor 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-white border border-border text-slate-800 rounded-tl-none"
                      )}
                    >
                      {msg.content}
                    </div>
                    <span className={cn("text-[9px] font-semibold text-slate-400 block", isDoctor ? "text-right" : "text-left")}>
                      {msg.timestamp} {isDoctor && <CheckCheck className="h-3.5 w-3.5 text-emerald-500 inline ml-0.5" />}
                    </span>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex items-start gap-3 max-w-[50%] mr-auto animate-pulse">
                <div className="p-3 rounded-2xl bg-white border border-border text-xs text-muted-foreground italic">
                  Jane is writing a response...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-border bg-card flex items-center gap-2 shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 w-9 p-0 shrink-0 cursor-pointer"
              onClick={() => alert("Vault attachment library requested (Mock).")}
              title="Attach clinical document reference"
            >
              <Paperclip className="h-4 w-4 text-slate-600" />
            </Button>
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              placeholder="Type secure clinical reply..." 
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

        {/* Clinical Context Sidebar (col-span-1) */}
        <div className="col-span-1 bg-slate-50/50 p-4 space-y-5 hidden md:block overflow-y-auto">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1 select-none">
            <User className="h-3.5 w-3.5 text-primary" />
            Patient Clinical Context
          </span>

          {/* Vitals Summary Card */}
          <div className="p-3 bg-white border border-border rounded-xl space-y-2.5 shadow-xs">
            <h5 className="font-bold text-xs text-slate-800">{activeChatData.name}</h5>
            <div className="space-y-1.5 text-[11px] text-slate-600 font-medium">
              <p className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Age / Gender: {activeChatData.age} / {activeChatData.gender}
              </p>
              <p className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Vitals: {activeChatData.vitals}
              </p>
              <p className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Active Rx: {activeChatData.meds}
              </p>
            </div>
          </div>

          {/* Clinical Alert Card */}
          <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl space-y-1">
            <span className="text-[9px] uppercase font-bold text-amber-700 flex items-center gap-1">
              <Activity className="h-3.5 w-3.5 text-amber-600" />
              Primary Risk Check
            </span>
            <p className="text-[10px] text-amber-600/90 leading-relaxed font-semibold">
              Border-elevated lipid metrics reported on May 15, 2026. Blood pressure parameters stabilized at 132/82.
            </p>
          </div>

          <div className="p-3 bg-sky-50/30 border border-sky-100 rounded-xl text-[10px] text-slate-400 font-semibold leading-relaxed">
            💬 Secure messenger syncs conversations directly to patient diagnostic logs for unified EHR integration.
          </div>
        </div>

      </div>

    </div>
  );
}
