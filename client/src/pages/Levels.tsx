import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, X } from "lucide-react";

type Level = {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
};

export default function Levels() {
  const [openModal, setOpenModal] = useState(false);
  const [levelsData, setLevelsData] = useState<Level[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/levels");
       console.log("LEVELS API RESPONSE:", res.data);

      setLevelsData(res.data);
    } catch (error) {
      console.error("Error fetching levels:", error);
      alert("Erreur lors du chargement des niveaux");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: "",
    });
    setEditingId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleOpenEditModal = (level: Level) => {
    setEditingId(level.id);
    setFormData({
      name: level.name || "",
      description: level.description || "",
      image: level.image || "",
    });
    setOpenModal(true);
  };

  const handleSaveLevel = async () => {
    if (!formData.name.trim()) {
      alert("Veuillez entrer le nom du niveau");
      return;
    }

    try {
      if (editingId !== null) {
        await axios.put(`http://localhost:5000/api/levels/${editingId}`, {
          name: formData.name,
          description: formData.description,
          image: formData.image,
        });
      } else {
        await axios.post("http://localhost:5000/api/levels", {
          name: formData.name,
          description: formData.description,
          image: formData.image,
        });
      }

      await fetchLevels();
      setOpenModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving level:", error);
      alert("Erreur lors de l'enregistrement du niveau");
    }
  };

  const handleDeleteLevel = async (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce niveau ?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/levels/${id}`);
      await fetchLevels();
    } catch (error) {
      console.error("Error deleting level:", error);
      alert("Erreur lors de la suppression du niveau");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Gestion des Niveaux
          </h1>
          <p className="mt-1 text-slate-500">
            Gérez les niveaux et leurs matières
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600"
        >
          <Plus size={18} />
          Nouveau Niveau
        </button>
      </div>

      <div className="flex gap-3">
        <button className="rounded-xl bg-slate-200 px-4 py-2 font-medium">
          Niveaux
        </button>

        <button className="rounded-xl bg-slate-100 px-4 py-2 text-slate-500">
          Classes
        </button>

        <button className="rounded-xl bg-slate-100 px-4 py-2 text-slate-500">
          Matières
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-slate-800">
          Niveaux ({levelsData.length})
        </h2>

        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : (
          <table className="w-full">
            <thead className="border-b text-left text-sm text-slate-500">
              <tr>
                <th className="pb-3">Image</th>
                <th className="pb-3">Nom</th>
                <th className="pb-3">Description</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {levelsData.map((level) => (
                <tr key={level.id} className="h-20">
                  <td className="py-3">
                    <img
                      src={level.image || "https://picsum.photos/60"}
                      alt={level.name}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="font-medium text-slate-800">{level.name}</td>

                  <td className="text-slate-500">
                    {level.description || "-"}
                  </td>

                  <td className="text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleOpenEditModal(level)}
                        className="rounded-lg p-2 hover:bg-slate-100"
                      >
                        <Pencil size={18} className="text-slate-600" />
                      </button>

                      <button
                        onClick={() => handleDeleteLevel(level.id)}
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
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                {editingId !== null ? "Modifier le Niveau" : "Ajouter un Niveau"}
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
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Nom du niveau
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: BTP"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description du niveau"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleSaveLevel}
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