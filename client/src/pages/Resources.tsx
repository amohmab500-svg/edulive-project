import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, X } from "lucide-react";

type Resource = {
  id: number;
  title: string;
  description: string | null;
  type: string;
  file_url: string | null;
  external_url: string | null;
  group_id: number | null;
  teacher_id: number | null;
  created_at: string;
  level_name?: string;
  teacher_name?: string;
};

type Level = {
  id: number;
  name: string;
};

type Teacher = {
  id: number;
  name: string;
};

export default function Resources() {
  const [resourcesData, setResourcesData] = useState<Resource[]>([]);
  const [levelsData, setLevelsData] = useState<Level[]>([]);
  const [teachersData, setTeachersData] = useState<Teacher[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "pdf",
    file_url: "",
    external_url: "",
    group_id: "",
    teacher_id: "",
  });

  useEffect(() => {
    fetchResources();
    fetchLevels();
    fetchTeachers();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/resources");
      setResourcesData(res.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
      alert("Erreur lors du chargement des ressources");
    } finally {
      setLoading(false);
    }
  };

  const fetchLevels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/levels");
      setLevelsData(res.data);
    } catch (error) {
      console.error("Error fetching levels:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers");
      setTeachersData(res.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "pdf",
      file_url: "",
      external_url: "",
      group_id: "",
      teacher_id: "",
    });
    setEditingId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleOpenEditModal = (resource: Resource) => {
    setEditingId(resource.id);
    setFormData({
      title: resource.title,
      description: resource.description || "",
      type: resource.type,
      file_url: resource.file_url || "",
      external_url: resource.external_url || "",
      group_id: resource.group_id ? String(resource.group_id) : "",
      teacher_id: resource.teacher_id ? String(resource.teacher_id) : "",
    });
    setOpenModal(true);
  };

  const handleSaveResource = async () => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        file_url: formData.file_url,
        external_url: formData.external_url,
        group_id: formData.group_id ? Number(formData.group_id) : null,
        teacher_id: formData.teacher_id ? Number(formData.teacher_id) : null,
      };

      if (editingId !== null) {
        await axios.put(`http://localhost:5000/api/resources/${editingId}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/resources", payload);
      }

      await fetchResources();
      setOpenModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving resource:", error);
      alert("Erreur lors de l'enregistrement de la ressource");
    }
  };

  const handleDeleteResource = async (id: number) => {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette ressource ?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`);
      await fetchResources();
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("Erreur lors de la suppression de la ressource");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Ressources</h1>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600"
        >
          <Plus size={18} />
          Nouvelle Ressource
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : (
          <table className="w-full">
            <thead className="border-b text-left text-sm text-slate-500">
              <tr>
                <th className="pb-3">Titre</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Niveau</th>
                <th className="pb-3">Enseignant</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {resourcesData.map((resource) => (
                <tr key={resource.id} className="h-20">
                  <td>{resource.title}</td>
                  <td>{resource.type}</td>
                  <td>{resource.level_name || "-"}</td>
                  <td>{resource.teacher_name || "-"}</td>

                  <td>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleOpenEditModal(resource)}
                        className="rounded-lg p-2 hover:bg-slate-100"
                      >
                        <Pencil size={18} className="text-slate-600" />
                      </button>

                      <button
                        onClick={() => handleDeleteResource(resource.id)}
                        className="rounded-lg p-2 hover:bg-red-50"
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-800">
              {editingId !== null ? "Modifier la Ressource" : "Ajouter une Ressource"}
            </h2>

            <button
              onClick={() => {
                setOpenModal(false);
                resetForm();
              }}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X size={20} className="text-slate-600" />
            </button>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Titre</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Titre de la ressource"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de la ressource"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                >
                  <option value="pdf">PDF</option>
                  <option value="video">Vidéo</option>
                  <option value="link">Lien externe</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">URL du fichier</label>
                <input
                  type="text"
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  placeholder="URL du fichier"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">URL externe</label>
                <input
                  type="text"
                  value={formData.external_url}
                  onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                  placeholder="URL externe"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Groupe</label>
                <select
                  value={formData.group_id}
                  onChange={(e) => setFormData({ ...formData, group_id: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                >
                  <option value="">Sélectionner un groupe</option>
                  {levelsData.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Enseignant</label>
                <select
                  value={formData.teacher_id}
                  onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                >
                  <option value="">Sélectionner un enseignant</option>
                  {teachersData.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSaveResource}
                className="w-full rounded-lg bg-blue-500 py-3 font-medium text-white hover:bg-blue-600"
              >
                {editingId !== null ? "Mettre à jour" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}