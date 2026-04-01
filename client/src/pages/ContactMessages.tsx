import React, { useState } from "react";
import { Eye, Trash2, X } from "lucide-react";

const initialMessages = [
  {
    id: 1,
    name: "Ahmed Ben Ali",
    email: "ahmed@gmail.com",
    subject: "Demande d'information",
    message:
      "Bonjour, je voudrais plus d'informations concernant les formations disponibles.",
    date: "12/01/2026",
  },
  {
    id: 2,
    name: "Salma Trabelsi",
    email: "salma@gmail.com",
    subject: "Inscription",
    message:
      "Je souhaite m'inscrire dans une formation de langues. Merci de me contacter.",
    date: "13/01/2026",
  },
  {
    id: 3,
    name: "Omar Gharbi",
    email: "omar@gmail.com",
    subject: "Support",
    message:
      "Je rencontre un problème lors de l'envoi du formulaire d'inscription.",
    date: "14/01/2026",
  },
];

export default function ContactMessages() {
  const [messagesData, setMessagesData] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<
    | {
        id: number;
        name: string;
        email: string;
        subject: string;
        message: string;
        date: string;
      }
    | null
  >(null);

  const handleDeleteMessage = (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce message ?"
    );
    if (!confirmed) return;

    setMessagesData((prev) => prev.filter((item) => item.id !== id));

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Messages Contact
        </h1>
        <p className="mt-1 text-slate-500">
          Gérez les messages reçus depuis le formulaire de contact
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-slate-800">
          Liste des Messages ({messagesData.length})
        </h2>

        <table className="w-full">
          <thead className="border-b text-left text-sm text-slate-500">
            <tr>
              <th className="pb-3">Nom</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Sujet</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {messagesData.map((item) => (
              <tr key={item.id} className="h-20">
                <td className="font-medium text-slate-800">{item.name}</td>
                <td className="text-slate-600">{item.email}</td>
                <td className="text-slate-600">{item.subject}</td>
                <td className="text-slate-600">{item.date}</td>

                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedMessage(item)}
                      className="rounded-lg p-2 hover:bg-slate-100"
                    >
                      <Eye size={18} className="text-slate-600" />
                    </button>

                    <button
                      onClick={() => handleDeleteMessage(item.id)}
                      className="rounded-lg p-2 hover:bg-red-50"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {messagesData.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-slate-500"
                >
                  Aucun message trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                Détails du message
              </h2>

              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Nom</p>
                <p className="font-medium text-slate-800">
                  {selectedMessage.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-800">
                  {selectedMessage.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Sujet</p>
                <p className="font-medium text-slate-800">
                  {selectedMessage.subject}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Date</p>
                <p className="font-medium text-slate-800">
                  {selectedMessage.date}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Message</p>
                <div className="mt-2 rounded-xl bg-slate-50 p-4 text-slate-700">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}