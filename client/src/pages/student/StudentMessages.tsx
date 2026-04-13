import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser } from "../../services/auth";
import { Send, Users } from "lucide-react";

const API = "http://localhost:5000/api";

interface Conversation { id: number; title: string; type: string; }
interface Message { id: number; sender_name: string; content: string; created_at: string; }

export default function StudentMessages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const user = getUser();

  useEffect(() => {
    axios.get(`${API}/messages/conversations`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((res) => {
      setConversations(res.data);
      if (res.data.length > 0) setSelectedId(res.data[0].id);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedId) fetchMessages(selectedId);
  }, [selectedId]);

  const fetchMessages = async (id: number) => {
    try {
      const res = await axios.get(`${API}/messages/conversations/${id}/messages`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMessages(res.data);
    } catch {}
  };

  const handleSend = async () => {
    if (!messageText.trim() || !selectedId) return;
    try {
      const res = await axios.post(`${API}/messages/conversations/${selectedId}/messages`, {
        content: messageText,
        sender_name: user?.full_name || "Étudiant",
      }, { headers: { Authorization: `Bearer ${getToken()}` } });
      setMessages((prev) => [...prev, res.data]);
      setMessageText("");
    } catch {}
  };

  const selectedConv = conversations.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Messagerie</h1>
        <p className="mt-1 text-slate-500">Communiquez avec votre enseignant</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Conversations</h2>
          <div className="space-y-3">
            {conversations.map((c) => (
              <button key={c.id} onClick={() => setSelectedId(c.id)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  selectedId === c.id ? "border-slate-200 bg-slate-50" : "border-slate-100 hover:bg-slate-50"
                }`}>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-slate-500" />
                  <span className="font-medium text-slate-800 text-sm">{c.title}</span>
                </div>
              </button>
            ))}
            {conversations.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">Aucune conversation.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          {selectedConv ? (
            <>
              <div className="mb-4 flex items-center gap-2">
                <Users size={18} className="text-slate-700" />
                <h2 className="text-lg font-semibold text-slate-900">{selectedConv.title}</h2>
              </div>

              <div className="mb-4 min-h-[300px] max-h-[400px] overflow-y-auto rounded-xl border border-slate-200 p-4">
                {messages.length > 0 ? (
                  <div className="space-y-3">
                    {messages.map((m) => {
                      const isMe = m.sender_name === user?.full_name;
                      return (
                        <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[70%] rounded-xl px-4 py-3 ${
                            isMe ? "bg-blue-500 text-white" : "bg-slate-100"
                          }`}>
                            <p className={`text-xs font-semibold mb-1 ${isMe ? "text-blue-100" : "text-slate-600"}`}>
                              {m.sender_name}
                            </p>
                            <p className={`text-sm ${isMe ? "text-white" : "text-slate-800"}`}>{m.content}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                    Aucun message
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <input type="text" value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Tapez votre message..."
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" />
                <button onClick={handleSend}
                  className="rounded-xl bg-blue-500 p-3 text-white hover:bg-blue-600">
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center text-slate-400">
              Sélectionnez une conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}