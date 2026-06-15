"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  AlertCircle,
  HelpCircle,
  BookOpen,
  Mic,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function AiChatPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "bot",
      content: "Hello! I am your PatientIQ AI Health Assistant. I can help explain medical terms, explain test values, and draft a list of questions for your next doctor checkup. \n\n*Please remember: I am an informational tool and cannot diagnose medical conditions or prescribe treatments.*",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  
  // Voice Mode states
  const [voiceMode, setVoiceMode] = React.useState(false);
  const [voiceStatus, setVoiceStatus] = React.useState<"idle" | "listening" | "processing" | "speaking">("idle");
  const [voiceTranscription, setVoiceTranscription] = React.useState("");
  const [voiceAiResponse, setVoiceAiResponse] = React.useState("");
  const [isMuted, setIsMuted] = React.useState(false);

  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Simulated keyword responses
  const getAiResponse = (prompt: string): string => {
    const input = prompt.toLowerCase();
    
    if (input.includes("diagnose") || input.includes("symptoms of") || input.includes("do i have")) {
      return "I cannot evaluate symptoms or provide medical diagnoses. Only a licensed physician or doctor can assess your medical records and run diagnostics to determine a clinical condition. I recommend scheduling an appointment with your doctor to discuss your concerns. Would you like me to help draft a list of questions to ask them about these symptoms?";
    }

    if (input.includes("lisinopril") || input.includes("blood pressure")) {
      return "Lisinopril is an ACE (Angiotensin-Converting Enzyme) inhibitor commonly prescribed to manage hypertension (high blood pressure) or assist with heart failure recovery. It helps relax blood vessels, lowering blood pressure and improving blood flow. \n\n*General Questions for your doctor:* \n- What side effects should I monitor? \n- What is my target blood pressure level? \n- Should I avoid specific foods or potassium supplements while taking this?";
    }

    if (input.includes("lipid") || input.includes("cholesterol")) {
      return "A Lipid Panel evaluates blood fats. Key parameters include:\n- **LDL (Low-Density Lipoprotein)**: Often called 'bad' cholesterol. High levels can lead to arterial plaque buildup.\n- **HDL (High-Density Lipoprotein)**: 'Good' cholesterol, which helps clear LDL from the blood.\n- **Triglycerides**: A type of fat stored in cells.\n\nElevated LDL is managed through aerobic exercises, limiting saturated fats, and sometimes statin therapies. Speak to your provider about custom lifestyle modifications.";
    }

    if (input.includes("question") || input.includes("prepare") || input.includes("doctor visit")) {
      return "Preparing questions is a great way to maximize your appointment time. Here is a baseline list of questions you can adjust:\n1. What is the primary cause of my symptoms?\n2. Are there lifestyle alterations (diet, sleep, activity) that can support my treatment?\n3. What are the potential side effects of this prescription?\n4. When should I follow up for another checkup or lab work?";
    }

    if (input.includes("allergy") || input.includes("penicillin")) {
      return "Allergies represent a hypersensitive immune reaction. A penicillin allergy reaction can cause hives, rashes, itching, or in severe cases, anaphylaxis (airway swelling). It is vital that you document all allergies in your patient portal so doctors can avoid prescribing unsafe antibiotics.";
    }

    return "I appreciate your query. I am here to help explain medical terminology (e.g. cholesterol, blood pressure), explain medication rationale (e.g. Lisinopril), or help draft lists of questions for your clinician checkup. What would you like to explore?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const prompt = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const responseContent = getAiResponse(prompt);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        content: responseContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  // Simulate Voice input trigger
  const handleVoiceSimulate = (prompt: string) => {
    setVoiceStatus("listening");
    setVoiceTranscription("Simulating voice input: " + prompt);
    setVoiceAiResponse("");

    // Simulate transcribing delay
    setTimeout(() => {
      setVoiceStatus("processing");
      
      // Simulate reasoning synthesis delay
      setTimeout(() => {
        const responseText = getAiResponse(prompt);
        setVoiceAiResponse(responseText);
        setVoiceStatus("speaking");
      }, 1500);

    }, 2000);
  };

  const suggestedPrompts = [
    { label: "What is Lisinopril for?", text: "What is Lisinopril for?" },
    { label: "Explain LDL vs HDL", text: "What is the difference between LDL and HDL cholesterol?" },
    { label: "Prepare doctor questions", text: "Help me prepare questions for my upcoming appointment." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch h-[calc(100vh-10rem)]">
      
      {/* Sidebar tips */}
      <div className="col-span-1 hidden lg:block space-y-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm">Assistance Console</CardTitle>
            <CardDescription className="text-xs">Examples and capabilities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-muted-foreground">
            <div className="space-y-2">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                Medical Terms
              </span>
              <p className="leading-relaxed">Ask definitions for things like lipid panels, hypertension, ACE inhibitors, or MRI reports.</p>
            </div>
            
            <div className="space-y-2">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5" />
                Appointment Prep
              </span>
              <p className="leading-relaxed">Ask the assistant to write lists of symptoms or questions to discuss during checkups.</p>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 rounded-xl space-y-1 mt-6">
              <span className="font-semibold flex items-center gap-1 text-[10px] uppercase tracking-wider">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                No Diagnosis
              </span>
              <p className="text-[9px] leading-relaxed">
                The bot will not provide diagnostic advice. Consult your practitioner for healthcare concerns.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Panel */}
      <Card className="col-span-1 lg:col-span-3 flex flex-col h-full overflow-hidden shadow-premium">
        
        {/* Chat Header with Voice Toggles */}
        <div className="p-4 border-b border-border bg-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-primary relative">
              <Sparkles className="h-5 w-5" />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Clinical Assistant Chat</h3>
              <span className="text-[10px] text-muted-foreground">HIPAA Secure Connection</span>
            </div>
          </div>

          {/* Voice Mode Toggle Switch */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200/50 rounded-lg text-[11px] font-bold">
            <button
              onClick={() => setVoiceMode(false)}
              className={cn("px-2.5 py-1 rounded-md transition-colors cursor-pointer", !voiceMode ? "bg-white text-slate-800 shadow-xs" : "text-muted-foreground hover:text-slate-800")}
            >
              Text Mode
            </button>
            <button
              onClick={() => setVoiceMode(true)}
              className={cn("px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1", voiceMode ? "bg-white text-slate-800 shadow-xs" : "text-muted-foreground hover:text-slate-800")}
            >
              <Mic className="h-3.5 w-3.5 text-primary" />
              Voice Mode
            </button>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="px-4 py-2 bg-amber-500/10 text-amber-700 border-b border-amber-500/10 text-[10px] flex items-center gap-2 shrink-0">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
          <span><strong>Disclaimer:</strong> Informational database only. Does not replace professional diagnostic advice.</span>
        </div>

        {/* Dynamic Display Area based on Voice mode toggle */}
        {!voiceMode ? (
          <>
            {/* Text Mode Chat area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div 
                    key={msg.id}
                    className={cn(
                      "flex items-start gap-3 max-w-[85%] sm:max-w-[70%]",
                      isBot ? "mr-auto" : "ml-auto flex-row-reverse"
                    )}
                  >
                    <div 
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none",
                        isBot ? "bg-indigo-100 text-primary" : "bg-primary text-white"
                      )}
                    >
                      {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div 
                      className={cn(
                        "p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-xs",
                        isBot 
                          ? "bg-white border border-border text-slate-800" 
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex items-start gap-3 max-w-[70%] mr-auto animate-pulse">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 text-primary flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 animate-spin" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-border text-xs text-muted-foreground italic">
                    AI is evaluating data...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts list */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-3 border-t border-border bg-slate-50/20 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Suggested Topics</span>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setInputValue(p.text); }}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/50 hover:bg-sky-50/30 transition-all font-medium text-slate-700 cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="p-4 border-t border-border bg-card flex items-center gap-3 shrink-0">
              <Input
                id="chat-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask a health terminology question..."
                disabled={isTyping}
                className="flex-1 text-xs"
              />
              <Button 
                onClick={handleSend} 
                disabled={isTyping || !inputValue.trim()}
                className="shrink-0 font-semibold cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          /* Voice Mode Simulator Dashboard */
          <div className="flex-1 flex flex-col justify-between p-6 bg-slate-900 text-white overflow-y-auto">
            
            {/* Top Waveform / Audio State visualizer */}
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-lg mx-auto">
              
              {/* Dynamic status indicators */}
              {voiceStatus === "idle" && (
                <div className="h-28 w-28 rounded-full border border-slate-700/50 bg-slate-800/20 flex items-center justify-center text-slate-500 relative">
                  <Mic className="h-10 w-10 text-slate-400" />
                </div>
              )}

              {voiceStatus === "listening" && (
                <div className="relative h-28 w-28 flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  <div className="absolute inset-2 bg-primary/30 rounded-full animate-pulse" />
                  <div className="h-20 w-20 bg-primary/80 rounded-full flex items-center justify-center shadow-lg relative">
                    <Mic className="h-8 w-8 text-white" />
                  </div>
                </div>
              )}

              {voiceStatus === "processing" && (
                <div className="h-28 w-28 flex items-center justify-center relative">
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
              )}

              {voiceStatus === "speaking" && (
                <div className="flex items-end justify-center gap-1.5 h-20 w-full select-none">
                  {/* CSS sound wave bars */}
                  {[0.7, 0.4, 0.9, 0.6, 0.8, 0.3, 0.7, 0.9, 0.5, 0.8].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-emerald-500 rounded-full animate-bounce" 
                      style={{ 
                        height: `${h * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: "0.8s"
                      }} 
                    />
                  ))}
                </div>
              )}

              {/* Status Header */}
              <div className="space-y-1">
                <h4 className="font-bold text-sm tracking-wide text-white uppercase">
                  {voiceStatus === "idle" && "Ready to talk"}
                  {voiceStatus === "listening" && "Listening to Voice..."}
                  {voiceStatus === "processing" && "Transcribing & Reasoning..."}
                  {voiceStatus === "speaking" && "AI Assistant Speaking"}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {voiceStatus === "idle" && "Trigger voice check using suggested templates below."}
                  {voiceStatus === "listening" && "Speak into your microphone..."}
                  {voiceStatus === "processing" && "Correlating natural language parameters."}
                  {voiceStatus === "speaking" && !isMuted ? "Streaming clinical speech synthesizers." : voiceStatus === "speaking" ? "Speech audio muted." : ""}
                </p>
              </div>

              {/* Transcription Logs */}
              {(voiceTranscription || voiceAiResponse) && (
                <div className="w-full text-left bg-slate-800/50 p-4 border border-slate-700/60 rounded-xl space-y-3 font-medium text-xs max-h-56 overflow-y-auto">
                  {voiceTranscription && (
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">User Speech Input</span>
                      <p className="text-white italic">&quot;{voiceTranscription.replace("Simulating voice input: ", "")}&quot;</p>
                    </div>
                  )}
                  {voiceAiResponse && (
                    <div className="space-y-1 border-t border-slate-700/60 pt-2.5">
                      <span className="text-[9px] uppercase font-bold text-primary tracking-wider flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        AI Voice Synthesis Response
                      </span>
                      <p className="text-slate-300 leading-relaxed">{voiceAiResponse}</p>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Bottom Controls / Prompt Triggers */}
            <div className="border-t border-slate-800 pt-6 mt-4 space-y-4">
              
              {/* Voice triggers */}
              {voiceStatus === "idle" && (
                <div className="space-y-2 max-w-lg mx-auto">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block text-center">Simulate Speech Queries</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {suggestedPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleVoiceSimulate(p.text)}
                        className="p-3 text-[11px] font-semibold border border-slate-700 hover:border-primary/50 hover:bg-slate-800 bg-slate-800/40 text-slate-300 hover:text-white rounded-xl transition-all text-center leading-snug cursor-pointer flex items-center justify-center"
                      >
                        🗣️ &quot;{p.label}&quot;
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Controls bar */}
              <div className="flex justify-between items-center max-w-sm mx-auto">
                <Button
                  variant="outline"
                  onClick={() => setIsMuted(!isMuted)}
                  className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5 text-xs font-semibold cursor-pointer"
                  disabled={voiceStatus === "idle"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="h-4 w-4 text-rose-500" />
                      Unmute Audio
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 text-emerald-500" />
                      Mute Audio
                    </>
                  )}
                </Button>

                {voiceStatus === "speaking" && (
                  <Button
                    size="sm"
                    className="gap-1.5 font-semibold cursor-pointer"
                    onClick={() => {
                      alert("Simulating high-fidelity speech synthesis play loop.");
                    }}
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    Play Audio
                  </Button>
                )}

                {voiceStatus !== "idle" && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setVoiceStatus("idle");
                      setVoiceTranscription("");
                      setVoiceAiResponse("");
                    }}
                    className="text-slate-400 hover:text-white text-xs font-semibold cursor-pointer gap-1"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Restart
                  </Button>
                )}
              </div>

            </div>

          </div>
        )}

      </Card>
    </div>
  );
}
