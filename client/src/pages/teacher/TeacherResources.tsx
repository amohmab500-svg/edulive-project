// client/src/pages/teacher/TeacherResources.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../services/auth";
import { Plus, Trash2, Eye, X, FileText, Link as LinkIcon } from "lucide-react";

const API = "http://localhost:5000/api";

interface Group { id: number; name: string; }
interface Resource {
  id: number; 
  title: string; 
  description: string;
  type: string; 
  file_url: string; 
  created_at: string;
}

export default function TeacherResources() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", type: "pdf", file_url: "" });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios.get(`${API}/teacher/groups`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((res) => {
      setGroups(res.data);
      if (res.data.length > 0) setSelectedGroup(String(res.data[0].id));
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedGroup) fetchResources();
  }, [selectedGroup]);

  const fetchResources = async () => {
    try {
      const res = await axios.get(`${API}/resources?group_id=${selectedGroup}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setResources(res.data);
    } catch {
      setResources([]);
    }
  };

  const handleAdd = async () => {
    if (!form.title || !form.file_url) return alert("Le titre et l'URL sont obligatoires");
    try {
      await axios.post(`${API}/resources`, { ...form, group_id: selectedGroup }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setShowModal(false);
      setForm({ title: "", description: "", type: "pdf", file_url: "" });
      fetchResources();
      setSuccess("Ressource ajoutée avec succès ✓");
      setTimeout(() => setSuccess(""), 3000);
    } catch { alert("Une erreur est survenue lors de l'ajout"); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette ressource ?")) return;
    try {
      await axios.delete(`${API}/resources/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchResources();
    } catch { alert("Une erreur est survenue lors de la suppression"); }
  };

  return (
    <div className="space-y-6" dir="ltr">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ressources Pédagogiques</h1>
        <p className="mt-1 text-slate-500">Gérez les fichiers et les liens pour vos étudiants</p>
      </div>

      {success && (
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">
          {success}
        </div>
      )}

      {/* Group selector */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Choisir le groupe d'étude
        </label>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
        >
          {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>

      {/* Resources table */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Liste des ressources</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            <Plus size={16} /> Ajouter une ressource
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b text-sm text-slate-500">
              <tr>
                <th className="pb-3 pl-4">Type</th>
                <th className="pb-3">Titre</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {resources.map((r) => (
                <tr key={r.id} className="h-16 hover:bg-slate-50 transition-colors">
                  <td className="pl-4">
                    {r.type === "pdf" ? 
                      <FileText className="text-red-500" size={20} /> : 
                      <LinkIcon className="text-blue-500" size={20} />
                    }
                  </td>
                  <td className="font-medium text-slate-800">{r.title}</td>
                  <td className="text-slate-500 text-sm">{r.description || "-"}</td>
                  <td className="text-slate-500 text-sm">
                    {new Date(r.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="pr-4">
                    <div className="flex justify-end gap-2">
                      <a
                        href={r.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 hover:bg-slate-100 transition-colors"
                      >
                        <Eye size={18} className="text-slate-600" />
                      </a>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="rounded-lg p-2 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {resources.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    Aucune ressource disponible pour ce groupe.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Ajouter une ressource</h2>
              <button onClick={() => setShowModal(false)} className="rounded-full p-1 hover:bg-slate-100">
                <X size={20} className="text-slate-600" />
              </button>
            </div>
            <div className="space-y-4 text-left">
              <div>
                <label className="mb-1 block text-sm font-medium">Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                  placeholder="Ex: Résumé du cours 1"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Description (optionnel)</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Type de fichier</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                >
                  <option value="pdf">PDF (Fichier)</option>
                  <option value="link">Lien vidéo ou site web</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Lien / URL *</label>
                <input
                  type="text"
                  value={form.file_url}
                  onChange={(e) => setForm({ ...form, file_url: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>
              <button
                onClick={handleAdd}
                className="w-full rounded-xl bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition-all mt-4"
              >
                Enregistrer la ressource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}