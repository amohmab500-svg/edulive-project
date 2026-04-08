import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, X, Layers, BookOpen, GraduationCap } from "lucide-react";

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
      setLevelsData(res.data);
    } catch (error) {
      console.error("Error fetching levels:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image: "" });
    setEditingId(null);
  };

  const handleOpenAddModal = () => { resetForm(); setOpenModal(true); };

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
    if (!formData.name.trim()) return alert("Veuillez entrer le nom");
    try {
      if (editingId !== null) {
        await axios.put(`http://localhost:5000/api/levels/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/levels", formData);
      }
      fetchLevels();
      setOpenModal(false);
    } catch (error) { console.error(error); }
  };

  const handleDeleteLevel = async (id: number) => {
    if (window.confirm("Supprimer ce niveau ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/levels/${id}`);
        fetchLevels();
      } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gestion des Niveaux</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <GraduationCap size={18} /> Configurez les parcours scolaires et les niveaux
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]"
        >
          <Plus size={20} />
          <span>Nouveau Niveau</span>
        </button>
      </div>

      {/* Tabs Filter (Style المشرف) */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
        <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl shadow-sm font-semibold text-sm flex items-center gap-2">
          <Layers size={16} /> Niveaux
        </button>
        <button className="text-slate-500 px-6 py-2.5 font-medium text-sm flex items-center gap-2 hover:text-slate-700 transition">
          <GraduationCap size={16} /> Classes
        </button>
        <button className="text-slate-500 px-6 py-2.5 font-medium text-sm flex items-center gap-2 hover:text-slate-700 transition">
          <BookOpen size={16} /> Matières
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
           Liste des Niveaux <span className="text-sm font-normal text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{levelsData.length}</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-slate-400 text-xs uppercase tracking-widest">
                <th className="px-4 py-4 font-semibold">Aperçu</th>
                <th className="px-4 py-4 font-semibold">Nom du Niveau</th>
                <th className="px-4 py-4 font-semibold">Description</th>
                <th className="px-4 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                 <tr><td colSpan={4} className="py-10 text-center text-slate-400">Chargement en cours...</td></tr>
              ) : levelsData.map((level) => (
                <tr key={level.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="py-5 px-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all shadow-sm">
                      <img
                        src={level.image || `https://ui-avatars.com/api/?name=${level.name}&background=random`}
                        alt={level.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4">
                    <span className="font-bold text-slate-700 text-lg">{level.name}</span>
                  </td>
                  <td className="px-4 max-w-xs">
                    <p className="text-slate-500 text-sm line-clamp-2">{level.description || "Aucune description"}</p>
                  </td>
                  <td className="px-4 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenEditModal(level)}
                        className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteLevel(level.id)}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - تصميم عصري */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">
                {editingId !== null ? "Modifier le Niveau" : "Nouveau Niveau"}
              </h2>
              <button onClick={() => setOpenModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={24} /></button>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 ml-1 uppercase tracking-tighter">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="Ex: 7ème année"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 ml-1 uppercase tracking-tighter">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  rows={3}
                  placeholder="Description du niveau..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 ml-1 uppercase tracking-tighter">URL Image</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="https://..."
                />
              </div>

              <button
                onClick={handleSaveLevel}
                className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-[1.01] transition-all mt-4"
              >
                {editingId !== null ? "Mettre à jour" : "Créer le niveau"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}