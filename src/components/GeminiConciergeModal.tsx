import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  groundingChunks?: any[];
  modelUsed?: string;
  timestamp: string;
}

interface GeminiConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeminiConciergeModal: React.FC<GeminiConciergeModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: 'Namaste! I am your Skynora Platinum AI Concierge, powered by Google Gemini. I can assist you with hotel recommendations, IRCTC Vande Bharat train seats, flight connections, live weather in Goa, and verified local places with real-time Google Search & Maps data. How may I curate your journey today?',
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useSearch, setUseSearch] = useState(true);
  const [useMaps, setUseMaps] = useState(false);
  const [modelType, setModelType] = useState<'general' | 'fast' | 'complex'>('general');
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => {
          // Fallback to Goa Sinquerim coordinates
          setUserCoords({ latitude: 15.4952, longitude: 73.7712 });
        }
      );
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send conversation history to backend proxy route
      const historyPayload = newMessages.map(m => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/concierge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          useSearch: useMaps ? false : useSearch,
          useMaps,
          location: userCoords,
          modelType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reach Gemini Concierge');
      }

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Here is what I found for your journey.',
        groundingChunks: data.groundingChunks || [],
        modelUsed: data.modelUsed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `I encountered an issue connecting to the Gemini travel engine (${err.message || 'Network error'}). Please try again or toggle Search/Maps grounding.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Best beach clubs near Taj Fort Aguada Candolim?',
    'Check latest Vande Bharat Express schedule Mumbai to Goa',
    'Recommend vegetarian coastal dining in North Goa',
    'What are the baggage allowances on IndiGo flights?',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[90vh] max-h-[720px] flex flex-col overflow-hidden border border-[#e2e7ff]">
        {/* Modal Header */}
        <div className="bg-[#131a33] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4b41e1] flex items-center justify-center text-[#acedff] shadow-inner">
              <span className="material-symbols-outlined text-2xl">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-base tracking-tight">
                  Skynora AI Concierge
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#acedff] text-[#131b2e]">
                  Gemini 3.5
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Grounding with Google Search & Google Maps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'reset-msg',
                    role: 'model',
                    text: 'Conversation reset. How can I help you plan your travel next?',
                    timestamp: 'Just now',
                  },
                ]);
              }}
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Clear Thread"
            >
              <span className="material-symbols-outlined text-lg">restart_alt</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Feature Switches Strip (Search & Maps Grounding) */}
        <div className="bg-[#f8f9ff] px-4 py-2.5 border-b border-[#e2e7ff] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-3 text-xs">
            {/* Google Search Grounding Toggle */}
            <button
              type="button"
              onClick={() => {
                setUseSearch(!useSearch);
                if (!useSearch) setUseMaps(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                useSearch && !useMaps
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-[#45464d] border border-[#c6c6ce]/60 hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">search</span>
              <span>Google Search Data</span>
            </button>

            {/* Google Maps Grounding Toggle */}
            <button
              type="button"
              onClick={() => {
                setUseMaps(!useMaps);
                if (!useMaps) setUseSearch(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                useMaps
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-[#45464d] border border-[#c6c6ce]/60 hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>Google Maps Places</span>
            </button>
          </div>

          {/* Model Selector */}
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#e2e7ff] text-[11px] font-semibold text-[#45464d]">
            <button
              onClick={() => setModelType('fast')}
              className={`px-2 py-0.5 rounded cursor-pointer ${modelType === 'fast' ? 'bg-[#131b2e] text-white' : ''}`}
            >
              Fast (3.1 Lite)
            </button>
            <button
              onClick={() => setModelType('general')}
              className={`px-2 py-0.5 rounded cursor-pointer ${modelType === 'general' ? 'bg-[#131b2e] text-white' : ''}`}
            >
              General (3.5 Flash)
            </button>
            <button
              onClick={() => setModelType('complex')}
              className={`px-2 py-0.5 rounded cursor-pointer ${modelType === 'complex' ? 'bg-[#131b2e] text-white' : ''}`}
            >
              Pro (3.1 Pro)
            </button>
          </div>
        </div>

        {/* Scrollable Conversation Thread */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#faf8ff]">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-[#4b41e1] text-white rounded-br-xs'
                    : 'bg-white text-[#131b2e] border border-[#e2e7ff] rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Grounding Source Citations & Maps links */}
                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#f2f3ff] space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#757780] flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#4b41e1]">verified</span>
                      <span>Verified Google Grounding Sources</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {msg.groundingChunks.map((chunk: any, cIdx: number) => {
                        // Web Grounding Link
                        if (chunk.web?.uri) {
                          return (
                            <a
                              key={cIdx}
                              href={chunk.web.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#4b41e1] text-[11px] font-semibold px-2 py-1 rounded-lg border border-[#c3c0ff] transition-colors"
                            >
                              <span className="material-symbols-outlined text-xs">open_in_new</span>
                              <span className="truncate max-w-[200px]">{chunk.web.title || chunk.web.uri}</span>
                            </a>
                          );
                        }
                        // Maps Grounding Place Link
                        if (chunk.maps?.uri) {
                          return (
                            <a
                              key={cIdx}
                              href={chunk.maps.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-1 rounded-lg border border-emerald-200 transition-colors"
                            >
                              <span className="material-symbols-outlined text-xs text-emerald-600">location_on</span>
                              <span className="truncate max-w-[200px]">{chunk.maps.title || 'View Place on Google Maps'}</span>
                            </a>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-[#757780] mt-1 px-1">
                {msg.timestamp} {msg.modelUsed && `• ${msg.modelUsed}`}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#e2e7ff] text-xs text-[#4b41e1] w-fit">
              <span className="material-symbols-outlined animate-spin text-base">autorenew</span>
              <span className="font-semibold">
                Consulting {useMaps ? 'Google Maps' : useSearch ? 'Google Search' : 'Gemini'} travel database...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-[#f2f3ff] overflow-x-auto scrollbar-none flex gap-2">
          {quickPrompts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-[11px] font-medium bg-[#faf8ff] hover:bg-[#f2f3ff] text-[#45464d] hover:text-[#131b2e] px-2.5 py-1 rounded-full border border-[#e2e7ff] whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white border-t border-[#e2e7ff] flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Ask about hotels, trains, flights, beaches, local food..."
            className="flex-1 text-xs sm:text-sm bg-[#faf8ff] text-[#131b2e] px-4 py-3 rounded-2xl border border-[#c6c6ce] focus:outline-[#4b41e1]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-3 rounded-2xl bg-[#4b41e1] text-white hover:bg-[#3b30d0] disabled:opacity-50 transition-colors shadow-sm cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-xl">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
