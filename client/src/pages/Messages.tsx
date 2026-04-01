import React, { useState } from "react";
import { MessageSquare, Send, Trash2, Plus, Users, X } from "lucide-react";

const initialConversations = [
  {
    id: 1,
    title: "1ère année - إنقليزية",
    type: "Groupe",
    time: "1 janv., 01:00",
    messages: [],
  },
  {
    id: 2,
    title: "BTS - Français",
    type: "Groupe",
    time: "3 janv., 10:30",
    messages: [
      { id: 1, sender: "Admin", content: "Bonjour à tous" },
      { id: 2, sender: "Prof", content: "Le cours commence demain" },
    ],
  },
];

export default function Messages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0]?.id || null);
  const [messageText, setMessageText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newConversationTitle, setNewConversationTitle] = useState("");

  const selectedConversation =
    conversations.find((conv) => conv.id === selectedId) || null;

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: Date.now(),
                  sender: "Admin",
                  content: messageText,
                },
              ],
            }
          : conv
      )
    );

    setMessageText("");
  };

  const handleDeleteConversation = (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette conversation ?"
    );
    if (!confirmed) return;

    const updated = conversations.filter((conv) => conv.id !== id);
    setConversations(updated);

    if (selectedId === id) {
      setSelectedId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const handleCreateConversation = () => {
    if (!newConversationTitle.trim()) {
      alert("Veuillez entrer le titre de la conversation");
      return;
    }

    const newConversation = {
      id: Date.now(),
      title: newConversationTitle,
      type: "Groupe",
      time: "Maintenant",
      messages: [],
    };

    const updated = [newConversation, ...conversations];
    setConversations(updated);
    setSelectedId(newConversation.id);
    setNewConversationTitle("");
    setOpenModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
          <p className="mt-1 text-slate-500">
            Communiquez avec l'administration et les élèves
          </p>
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
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Conversations</h2>
          <p className="mt-1 text-slate-500">Vos conversations récentes</p>

          <div className="mt-6 space-y-4">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedId(conversation.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedId === conversation.id
                    ? "border-slate-200 bg-slate-50"
                    : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-600" />
                  <span className="font-semibold text-slate-800">
                    {conversation.title}
                  </span>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">
                    {conversation.type}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">{conversation.time}</p>
              </button>
            ))}

            {conversations.length === 0 && (
              <p className="text-sm text-slate-500">Aucune conversation.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          {selectedConversation ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">
                    {selectedConversation.title}
                  </h2>
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

              <div className="mb-4 flex min-h-[360px] flex-col rounded-2xl border border-slate-200 p-4">
                {selectedConversation.messages.length > 0 ? (
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className="max-w-[70%] rounded-xl bg-slate-100 px-4 py-3"
                      >
                        <p className="text-sm font-semibold text-slate-700">
                          {message.sender}
                        </p>
                        <p className="mt-1 text-slate-800">{message.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-1 items-center justify-center text-slate-400">
                    Aucun message dans cette conversation
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
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

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                Nouvelle conversation
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                  setNewConversationTitle("");
                }}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Titre de la conversation
                </label>
                <input
                  type="text"
                  value={newConversationTitle}
                  onChange={(e) => setNewConversationTitle(e.target.value)}
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