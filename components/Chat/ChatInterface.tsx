import React, { useState, useEffect, useRef } from 'react';
import { Message, MessageSender, UserProfile, BiometricData } from '../../types';
import { NeoButton, NeoInput } from '../ui/NeoComponents';
import { Send, Mic, Sparkles } from 'lucide-react';
import { createChatSession, sendMessage } from '../../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  userProfile: UserProfile;
  biometrics: BiometricData;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userProfile, biometrics }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: `Hello ${userProfile.name}. I've analyzed your biometrics. Your energy score is ${biometrics.energyScore}/100. How can we optimize your day?`,
      sender: MessageSender.BOT,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionInitialized = useRef(false);

  useEffect(() => {
    if (!sessionInitialized.current) {
        createChatSession(userProfile, biometrics).then(() => {
            sessionInitialized.current = true;
        });
    }
  }, [userProfile, biometrics]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: MessageSender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await sendMessage(userMsg.text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: MessageSender.BOT,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
       console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputText(action);
    // Optional: auto-send
  };

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {/* Chat History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-24">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === MessageSender.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-4 border-2 border-border shadow-neo-sm text-sm md:text-base ${
                msg.sender === MessageSender.USER 
                ? 'bg-foreground text-background' 
                : 'bg-card text-card-foreground'
              }`}
            >
              {msg.sender === MessageSender.BOT ? (
                 <div className="prose prose-sm max-w-none font-sans dark:prose-invert">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                 </div>
              ) : (
                <p className="font-sans font-medium">{msg.text}</p>
              )}
              <span className="text-[10px] font-mono opacity-50 block mt-2 uppercase">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-muted px-4 py-2 border-2 border-border font-mono text-xs">
              VITALIS IS THINKING...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t-2 border-border">
         {/* Suggested Actions chips */}
         {messages.length < 4 && (
             <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
                 {["Generate today's meal plan", "Suggest a 15min workout", "Why am I tired?"].map(s => (
                     <button 
                        key={s} 
                        onClick={() => handleQuickAction(s)}
                        className="whitespace-nowrap px-3 py-1 border border-border bg-white text-xs font-mono hover:bg-muted transition-colors"
                     >
                         {s}
                     </button>
                 ))}
             </div>
         )}
         
        <div className="flex gap-2">
          <NeoInput 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Vitalis..."
            className="shadow-neo-sm focus:shadow-none transition-shadow"
          />
          <NeoButton variant="primary" onClick={handleSend} className="px-4 shadow-neo-sm">
            <Send size={20} />
          </NeoButton>
          <NeoButton variant="secondary" className="px-4 shadow-neo-sm md:hidden">
            <Mic size={20} />
          </NeoButton>
        </div>
      </div>
    </div>
  );
};
