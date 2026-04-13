import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser } from "../../services/auth";
import { Plus, Trash2, Send, Users, X } from "lucide-react";

const API = "http://localhost:5000/api";

interface Conversation { id: number; title: string; type: string; created_at: string; }
interface Message { id: number; sender_name: string; content: string; created_at: string; }

export default function TeacherMessages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const user = getUser();

  useEffect(() => { fetchConversations(); }, []);

  useEffect(() => {
    if (selectedId) fetchMessages(selectedId);
    else setMessages([]);
  }, [selectedId]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${API}/messages/conversations`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setConversations(res.data);
      if (res.data.length > 0) setSelectedId(res.data[0].id);
    } catch {}
  };

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
        sender_name: user?.full_name || "Enseignant",
      }, { headers: { Authorization: `Bearer ${getToken()}` } });
      setMessages((prev) => [...prev, res.data]);
      setMessageText("");
    } catch {}
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post(`${API}/messages/conversations`, {
        title: newTitle, type: "Groupe",
      }, { headers: { Authorization: `Bearer ${getToken()}` } });
      setConversations((prev) => [res.data, ...prev]);
      setSelectedId(res.data.id);
      setNewTitle("");
      setShowModal(false);
    } catch {}
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cette conversation ?")) return;
    try {
      await axios.delete(`${API}/messages/conversations/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const updated = conversations.filter((c) => c.id !== id);
      setConversations(updated);
      setSelectedId(updated.length > 0 ? updated[0].id : null);
    } catch {}
  };

  const selectedConv = conversations.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Messagerie</h1>
          <p className="mt-1 text-slate-500">Communiquez avec vos étudiants</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
          <Plus size={18} /> Nouvelle conversation
        </button>
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
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">{c.type}</span>
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
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-slate-700" />
                  <h2 className="text-lg font-semibold text-slate-900">{selectedConv.title}</h2>
                </div>
                <button onClick={() => handleDelete(selectedConv.id)}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600">
                  <Trash2 size={16} /> Supprimer
                </button>
              </div>

              <div className="mb-4 min-h-[300px] rounded-xl border border-slate-200 p-4 overflow-y-auto">
                {messages.length > 0 ? (
                  <div className="space-y-3">
                    {messages.map((m) => (
                      <div key={m.id} className="max-w-[70%] rounded-xl bg-slate-100 px-4 py-3">
                        <p className="text-xs font-semibold text-slate-600">{m.sender_name}</p>
                        <p className="mt-1 text-slate-800 text-sm">{m.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                    Aucun message
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Tapez votre message..."
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
                <button onClick={handleSend}
                  className="rounded-xl bg-blue-400 p-3 text-white hover:bg-blue-500">
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Nouvelle conversation</h2>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Titre de la conversation"
                className="w-full rounded-xl border p-3 outline-none focus:border-blue-500" />
              <button onClick={handleCreate}
                className="w-full rounded-xl bg-blue-500 py-3 text-white font-medium hover:bg-blue-600">
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}