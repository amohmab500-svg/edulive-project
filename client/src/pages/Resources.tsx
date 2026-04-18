import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Pencil, Trash2, Plus, X, FileText, Video, Link,
  Search, BookOpen, ExternalLink, Play
} from "lucide-react";

type Resource = {
  id: number;
  title: string;
  description: string | null;
  type: string;
  file_url: string | null;
  external_url: string | null;
  group_id: number | null;
  level_id: number | null;
  teacher_id: number | null;
  created_at: string;
  level_name?: string;
  teacher_name?: string;
};

const getYoutubeThumbnail = (url: string) => {
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
};

const getVideoEmbedUrl = (url: string) => {
  const ytRegExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const ytMatch = url.match(ytRegExp);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoRegExp = /vimeo\.com\/(\d+)/;
  const vimeoMatch = url.match(vimeoRegExp);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
};

export default function Resources() {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [resourcesData, setResourcesData] = useState<Resource[]>([]);
  const [levelsData, setLevelsData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "pdf",
    file_url: "",
    external_url: "",
    level_id: "",
    teacher_id: "",
  });

  useEffect(() => {
    fetchResources();
    fetchLevels();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/resources", { headers });
      setResourcesData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLevels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/levels", { headers });
      setLevelsData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      title: "", description: "", type: "pdf",
      file_url: "", external_url: "", level_id: "", teacher_id: "",
    });
    setEditingId(null);
    setOpenModal(true);
  };

  const handleOpenEditModal = (res: Resource) => {
    setEditingId(res.id);
    setFormData({
      title: res.title,
      description: res.description || "",
      type: res.type,
      file_url: res.file_url || "",
      external_url: res.external_url || "",
      level_id: res.level_id ? String(res.level_id) : "",
      teacher_id: res.teacher_id ? String(res.teacher_id) : "",
    });
    setOpenModal(true);
  };

  const handleSaveResource = async () => {
    if (!formData.title.trim()) return alert("Le titre est obligatoire");
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        file_url: formData.type === "pdf" ? formData.file_url : null,
        external_url: formData.type !== "pdf" ? formData.external_url : null,
        level_id: formData.level_id ? Number(formData.level_id) : null,
        group_id: null,
        teacher_id: formData.teacher_id ? Number(formData.teacher_id) : null,
      };
      if (editingId) {
        await axios.put(`http://localhost:5000/api/resources/${editingId}`, payload, { headers });
      } else {
        await axios.post("http://localhost:5000/api/resources", payload, { headers });
      }
      await fetchResources();
      setOpenModal(false);
    } catch (error) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDeleteResource = (id: number) => {
    setDeleteTargetId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await axios.delete(`http://localhost:5000/api/resources/${deleteTargetId}`, { headers });
      await fetchResources();
      setDeleteModal(false);
      setDeleteTargetId(null);
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  const filteredResources = resourcesData.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return <div className="p-2 bg-red-50 text-red-600 rounded-lg"><FileText size={20} /></div>;
      case "video": return <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Video size={20} /></div>;
      default: return <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Link size={20} /></div>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "pdf": return "bg-red-100 text-red-600";
      case "video": return "bg-blue-100 text-blue-600";
      default: return "bg-orange-100 text-orange-600";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ressources Pédagogiques</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <BookOpen size={18} /> Gérez vos fichiers, vidéos et liens de cours
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={18} /> Nouvelle Ressource
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Rechercher une ressource..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b text-sm text-slate-500">
              <tr>
                <th className="pb-4 px-2">Ressource</th>
                <th className="pb-4 px-2">Type</th>
                <th className="pb-4 px-2">Niveau</th>
                <th className="pb-4 px-2">Enseignant</th>
                <th className="pb-4 px-2">Aperçu</th>
                <th className="pb-4 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center text-slate-400">Chargement...</td></tr>
              ) : filteredResources.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-slate-400">Aucune ressource trouvée.</td></tr>
              ) : (
                filteredResources.map((res) => {
                  const thumbnail = res.type === "video" && res.external_url
                    ? getYoutubeThumbnail(res.external_url)
                    : null;
                  return (
                    <tr key={res.id} className="hover:bg-slate-50 transition">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(res.type)}
                          <div>
                            <p className="font-medium text-slate-800">{res.title}</p>
                            {res.description && (
                              <p className="text-xs text-slate-400 truncate max-w-[180px]">{res.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${getTypeBadge(res.type)}`}>
                          {res.type}
                        </span>
                      </td>
                      <td className="px-2 text-sm text-slate-600">{res.level_name || "-"}</td>
                      <td className="px-2 text-sm text-slate-600">{res.teacher_name || "-"}</td>
                      <td className="px-2">
                        {res.type === "video" && res.external_url ? (
                          <button onClick={() => setPreviewVideo(res.external_url!)} className="relative group">
                            {thumbnail ? (
                              <div className="relative w-20 h-12 rounded-lg overflow-hidden">
                                <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition">
                                  <Play size={16} className="text-white" />
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-blue-600 text-xs hover:underline">
                                <Play size={14} /> Voir
                              </div>
                            )}
                          </button>
                        ) : res.type === "pdf" && res.file_url ? (
                          <a href={res.file_url} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1 text-red-600 text-xs hover:underline">
                            <ExternalLink size={14} /> Ouvrir
                          </a>
                        ) : res.type === "link" && res.external_url ? (
                          <a href={res.external_url} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1 text-orange-600 text-xs hover:underline">
                            <ExternalLink size={14} /> Ouvrir
                          </a>
                        ) : (
                          <span className="text-slate-300 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-2 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleOpenEditModal(res)} className="rounded-lg p-2 hover:bg-slate-100">
                            <Pencil size={16} className="text-slate-500" />
                          </button>
                          <button onClick={() => handleDeleteResource(res.id)} className="rounded-lg p-2 hover:bg-red-50">
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Prévisualisation Vidéo */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-3xl rounded-2xl bg-black overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900">
              <p className="text-white text-sm font-medium">Aperçu Vidéo</p>
              <button onClick={() => setPreviewVideo(null)} className="text-white hover:text-red-400">
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={getVideoEmbedUrl(previewVideo)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajout/Édition */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                {editingId ? "Modifier" : "Nouvelle"} Ressource
              </h2>
              <button onClick={() => setOpenModal(false)} className="rounded-lg p-2 hover:bg-slate-100">
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Titre de la ressource..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description (optionnel)..."
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value, file_url: "", external_url: "" })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="pdf">📄 PDF</option>
                  <option value="video">🎬 Vidéo (YouTube / Vimeo)</option>
                  <option value="link">🔗 Lien externe</option>
                </select>
              </div>

              {formData.type === "pdf" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">URL du fichier PDF</label>
                  <input
                    type="text"
                    value={formData.file_url}
                    onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                    placeholder="https://example.com/fichier.pdf"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              )}

              {formData.type === "video" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Lien YouTube / Vimeo *</label>
                  <input
                    type="text"
                    value={formData.external_url}
                    onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  {formData.external_url && getYoutubeThumbnail(formData.external_url) && (
                    <div className="mt-2 relative w-full h-36 rounded-xl overflow-hidden">
                      <img
                        src={getYoutubeThumbnail(formData.external_url)!}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play size={32} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {formData.type === "link" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Lien externe *</label>
                  <input
                    type="text"
                    value={formData.external_url}
                    onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Niveau</label>
                <select
                  value={formData.level_id}
                  onChange={(e) => setFormData({ ...formData, level_id: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="">Tous les niveaux</option>
                  {levelsData.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveResource}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                {editingId ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation Suppression */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-800">Confirmer la suppression</h2>
            <p className="mt-2 text-sm text-slate-500">
              Voulez-vous vraiment supprimer cette ressource ?
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => { setDeleteModal(false); setDeleteTargetId(null); }}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}