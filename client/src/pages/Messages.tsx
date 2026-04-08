import React, { useState, useEffect } from "react";
import { Send, Trash2, Plus, Users, X } from "lucide-react";
import axios from "axios";

const API = "http://localhost:5000/api";

interface Message {
  id: number;
  sender_name: string;
  content: string;
  created_at: string;
}

interface Conversation {
  id: number;
  title: string;
  type: string;
  created_at: string;
}

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // جلب المحادثات عند التحميل
  useEffect(() => {
    fetchConversations();
  }, []);

  // جلب الرسائل عند تغيير المحادثة
  useEffect(() => {
    if (selectedId) fetchMessages(selectedId);
    else setMessages([]);
  }, [selectedId]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${API}/messages/conversations`);
      setConversations(res.data);
      if (res.data.length > 0) setSelectedId(res.data[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async (convId: number) => {
    try {
      const res = await axios.get(`${API}/messages/conversations/${convId}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedId) return;
    try {
      const res = await axios.post(`${API}/messages/conversations/${selectedId}/messages`, {
        content: messageText,
        sender_name: "Admin",
      });
      setMessages((prev) => [...prev, res.data]);
      setMessageText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConversation = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette conversation ?")) return;
    try {
      await axios.delete(`${API}/messages/conversations/${id}`);
      const updated = conversations.filter((c) => c.id !== id);
      setConversations(updated);
      if (selectedId === id) {
        setSelectedId(updated.length > 0 ? updated[0].id : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateConversation = async () => {
    if (!newTitle.trim()) return alert("Veuillez entrer le titre");
    try {
      const res = await axios.post(`${API}/messages/conversations`, {
        title: newTitle,
        type: "Groupe",
      });
      const updated = [res.data, ...conversations];
      setConversations(updated);
      setSelectedId(res.data.id);
      setNewTitle("");
      setOpenModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const selectedConversation = conversations.find((c) => c.id === selectedId) || null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("fr-FR", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
          <p className="mt-1 text-slate-500">Communiquez avec l'administration et les élèves</p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600"
        >
          <Plus size={18} />
          Nouvelle conversation
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* قائمة المحادثات */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Conversations</h2>
          <p className="mt-1 text-slate-500">Vos conversations récentes</p>

          <div className="mt-6 space-y-4">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedId === conv.id ? "border-slate-200 bg-slate-50" : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-600" />
                  <span className="font-semibold text-slate-800">{conv.title}</span>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">
                    {conv.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{formatDate(conv.created_at)}</p>
              </button>
            ))}
            {conversations.length === 0 && (
              <p className="text-sm text-slate-500">Aucune conversation.</p>
            )}
          </div>
        </div>

        {/* نافذة الدردشة */}
        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          {selectedConversation ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">{selectedConversation.title}</h2>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">
                    {selectedConversation.type}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteConversation(selectedConversation.id)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                  Supprimer
                </button>
              </div>

              {/* الرسائل */}
              <div className="mb-4 flex min-h-[360px] flex-col rounded-2xl border border-slate-200 p-4 overflow-y-auto">
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className="max-w-[70%] rounded-xl bg-slate-100 px-4 py-3">
                        <p className="text-sm font-semibold text-slate-700">{msg.sender_name}</p>
                        <p className="mt-1 text-slate-800">{msg.content}</p>
                        <p className="mt-1 text-xs text-slate-400">{formatDate(msg.created_at)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-1 items-center justify-center text-slate-400">
                    Aucun message dans cette conversation
                  </div>
                )}
              </div>

              {/* إرسال رسالة */}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="rounded-2xl bg-blue-400 p-4 text-white hover:bg-blue-500"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex min-h-[500px] items-center justify-center text-slate-400">
              Aucune conversation sélectionnée
            </div>
          )}
        </div>
      </div>

      {/* Modal إنشاء محادثة */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">Nouvelle conversation</h2>
              <button onClick={() => { setOpenModal(false); setNewTitle(""); }} className="rounded-lg p-2 hover:bg-slate-100">
                <X size={20} className="text-slate-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Titre</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: 1ère année - إنقليزية"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleCreateConversation}
                className="w-full rounded-lg bg-blue-500 py-3 font-medium text-white hover:bg-blue-600"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}