import React, { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";

const initialRequests = [
  {
    id: 1,
    name: "Ridha Zoghlami",
    email: "reseausp@gmail.com",
    phone: "29261711",
    course: "C2",
    category: "Langues",
    status: "pending",
    date: "11 janvier 2026 à 16:41",
  },
  {
    id: 2,
    name: "ahmed ali",
    email: "visex15194@akixpres.com",
    phone: "+21688975789",
    course: "A1",
    category: "Langues",
    status: "pending",
    date: "9 janvier 2026 à 15:01",
  },
  {
    id: 3,
    name: "Arayedh Mohamed",
    email: "arayedhm@gmail.com",
    phone: "26222281",
    course: "BTP",
    category: "Dessin et Études",
    status: "pending",
    date: "7 janvier 2026 à 10:15",
  },
];

type RequestStatus = "pending" | "approved" | "rejected";
type FilterTab = "pending" | "approved" | "rejected" | "all";

export default function RegistrationRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState<FilterTab>("pending");

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;

  const filteredRequests =
    activeTab === "all"
      ? requests
      : requests.filter((r) => r.status === activeTab);

  const updateStatus = (id: number, status: RequestStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const getStatusBadge = (status: RequestStatus) => {
    if (status === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }
    if (status === "approved") {
      return "bg-green-100 text-green-700";
    }
    return "bg-red-100 text-red-700";
  };

  const getStatusText = (status: RequestStatus) => {
    if (status === "pending") return "En attente";
    if (status === "approved") return "Approuvée";
    return "Refusée";
  };

  const tabClass = (tab: FilterTab) =>
    `rounded-xl px-4 py-2 text-sm font-medium transition ${
      activeTab === tab
        ? "bg-white text-slate-900 shadow-sm"
        : "text-slate-500 hover:text-slate-800"
    }`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Demandes d'Inscription
        </h1>
        <p className="mt-1 text-slate-500">
          Approuvez ou refusez les demandes d'inscription. L'approbation crée
          automatiquement un compte utilisateur.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-slate-800">En Attente</p>
              <h2 className="mt-10 text-4xl font-bold text-slate-900">
                {pendingCount}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Demandes à traiter
              </p>
            </div>
            <span className="text-xl text-yellow-500">⏳</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-slate-800">Approuvées</p>
              <h2 className="mt-10 text-4xl font-bold text-slate-900">
                {approvedCount}
              </h2>
              <p className="mt-2 text-sm text-slate-500">Comptes créés</p>
            </div>
            <span className="text-xl text-green-500">✔</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-slate-800">Refusées</p>
              <h2 className="mt-10 text-4xl font-bold text-slate-900">
                {rejectedCount}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Demandes rejetées
              </p>
            </div>
            <span className="text-xl text-red-500">✖</span>
          </div>
        </div>
      </div>

      <div className="inline-flex rounded-2xl bg-slate-100 p-1">
        <button onClick={() => setActiveTab("pending")} className={tabClass("pending")}>
          En Attente ({pendingCount})
        </button>
        <button onClick={() => setActiveTab("approved")} className={tabClass("approved")}>
          Approuvées ({approvedCount})
        </button>
        <button onClick={() => setActiveTab("rejected")} className={tabClass("rejected")}>
          Refusées ({rejectedCount})
        </button>
        <button onClick={() => setActiveTab("all")} className={tabClass("all")}>
          Toutes
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Liste des Demandes
        </h2>
        <p className="mt-1 text-slate-500">
          {activeTab === "pending"
            ? "Demandes en attente d'approbation"
            : activeTab === "approved"
            ? "Demandes approuvées"
            : activeTab === "rejected"
            ? "Demandes refusées"
            : "Toutes les demandes"}
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead className="border-b text-left text-sm text-slate-500">
              <tr>
                <th className="pb-4">Candidat</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Téléphone</th>
                <th className="pb-4">Cours Souhaité</th>
                <th className="pb-4">Statut</th>
                <th className="pb-4">Date</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.id} className="h-24">
                    <td className="font-medium text-slate-800">{request.name}</td>

                    <td className="text-slate-600">{request.email}</td>

                    <td className="text-slate-600">{request.phone}</td>

                    <td>
                      <p className="font-medium text-slate-800">{request.course}</p>
                      <p className="text-sm text-slate-500">{request.category}</p>
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(
                          request.status as RequestStatus
                        )}`}
                      >
                        {getStatusText(request.status as RequestStatus)}
                      </span>
                    </td>

                    <td className="text-slate-500">{request.date}</td>

                    <td>
                      <div className="flex justify-end gap-3">
                        <button
                          className="rounded-lg p-2 hover:bg-slate-100"
                          title="Voir"
                        >
                          <Eye size={18} className="text-slate-600" />
                        </button>

                        <button
                          onClick={() => updateStatus(request.id, "approved")}
                          className="rounded-lg p-2 hover:bg-green-50"
                          title="Approuver"
                        >
                          <CheckCircle size={18} className="text-green-600" />
                        </button>

                        <button
                          onClick={() => updateStatus(request.id, "rejected")}
                          className="rounded-lg p-2 hover:bg-red-50"
                          title="Refuser"
                        >
                          <XCircle size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Aucune demande trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}