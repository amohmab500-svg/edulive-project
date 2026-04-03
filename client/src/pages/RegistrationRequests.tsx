import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, CheckCircle, XCircle, X } from "lucide-react";

type RequestStatus = "pending" | "approved" | "rejected";
type FilterTab = "pending" | "approved" | "rejected" | "all";

type Registration = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  level_id: number | null;
  level_name?: string | null;
  message: string | null;
  status: RequestStatus;
  rejection_reason: string | null;
  created_at: string;
};

export default function RegistrationRequests() {
  const [requests, setRequests] = useState<Registration[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>("pending");
  const [loading, setLoading] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState<Registration | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/registrations");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      alert("Erreur lors du chargement des demandes");
    } finally {
      setLoading(false);
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;

  const filteredRequests =
    activeTab === "all"
      ? requests
      : requests.filter((r) => r.status === activeTab);

  const updateStatus = async (id: number, status: RequestStatus) => {
    try {
      let rejection_reason: string | null = null;

      if (status === "rejected") {
        const reason = window.prompt("Entrez la raison du refus :");
        rejection_reason = reason || null;
      }

      await axios.put(`http://localhost:5000/api/registrations/${id}`, {
        status,
        rejection_reason,
      });

      await fetchRegistrations();
    } catch (error) {
      console.error("Error updating registration status:", error);
      alert("Erreur lors de la mise à jour du statut");
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("fr-FR");
  };

  const openDetails = (request: Registration) => {
    setSelectedRequest(request);
    setOpenDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Demandes d'Inscription
        </h1>
        <p className="mt-1 text-slate-500">
          Approuvez ou refusez les demandes d'inscription.
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
              <p className="mt-2 text-sm text-slate-500">Demandes validées</p>
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
          {loading ? (
            <p className="py-8 text-center text-slate-500">Chargement...</p>
          ) : (
            <table className="w-full">
              <thead className="border-b text-left text-sm text-slate-500">
                <tr>
                  <th className="pb-4">Candidat</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Téléphone</th>
                  <th className="pb-4">Niveau</th>
                  <th className="pb-4">Statut</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="h-24">
                      <td className="font-medium text-slate-800">
                        {request.full_name}
                      </td>

                      <td className="text-slate-600">{request.email}</td>

                      <td className="text-slate-600">{request.phone || "-"}</td>

                      <td className="text-slate-600">
                        {request.level_name || "-"}
                      </td>

                      <td>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(
                            request.status
                          )}`}
                        >
                          {getStatusText(request.status)}
                        </span>
                      </td>

                      <td className="text-slate-500">
                        {formatDate(request.created_at)}
                      </td>

                      <td>
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => openDetails(request)}
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
          )}
        </div>
      </div>

      {openDetailsModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                Détails de la Demande
              </h2>

              <button
                onClick={() => {
                  setOpenDetailsModal(false);
                  setSelectedRequest(null);
                }}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <p><strong>Nom :</strong> {selectedRequest.full_name}</p>
              <p><strong>Email :</strong> {selectedRequest.email}</p>
              <p><strong>Téléphone :</strong> {selectedRequest.phone || "-"}</p>
              <p><strong>Niveau :</strong> {selectedRequest.level_name || "-"}</p>
              <p><strong>Statut :</strong> {getStatusText(selectedRequest.status)}</p>
              <p><strong>Date :</strong> {formatDate(selectedRequest.created_at)}</p>
              <p><strong>Message :</strong> {selectedRequest.message || "-"}</p>
              {selectedRequest.rejection_reason && (
                <p>
                  <strong>Raison du refus :</strong> {selectedRequest.rejection_reason}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}