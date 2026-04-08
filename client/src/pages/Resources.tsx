import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Pencil, Trash2, Plus, X, FileText, Video, Link, 
  Search, BookOpen, User, Calendar, ExternalLink 
} from "lucide-react";

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

export default function Resources() {
  const [resourcesData, setResourcesData] = useState<Resource[]>([]);
  const [levelsData, setLevelsData] = useState<any[]>([]);
  const [teachersData, setTeachersData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const fetchLevels = async () => {
    const res = await axios.get("http://localhost:5000/api/levels");
    setLevelsData(res.data);
  };

  const fetchTeachers = async () => {
    const res = await axios.get("http://localhost:5000/api/teachers");
    setTeachersData(res.data);
  };

  const handleOpenAddModal = () => {
    setFormData({ title: "", description: "", type: "pdf", file_url: "", external_url: "", group_id: "", teacher_id: "" });
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
      group_id: res.group_id ? String(res.group_id) : "",
      teacher_id: res.teacher_id ? String(res.teacher_id) : "",
    });
    setOpenModal(true);
  };

  const handleSaveResource = async () => {
    try {
      const payload = { ...formData, 
        group_id: formData.group_id ? Number(formData.group_id) : null,
        teacher_id: formData.teacher_id ? Number(formData.teacher_id) : null 
      };
      if (editingId) await axios.put(`http://localhost:5000/api/resources/${editingId}`, payload);
      else await axios.post("http://localhost:5000/api/resources", payload);
      fetchResources();
      setOpenModal(false);
    } catch (error) { alert("Erreur lors de l'enregistrement"); }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <div className="p-2 bg-red-50 text-red-600 rounded-lg"><FileText size={20} /></div>;
      case 'video': return <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Video size={20} /></div>;
      default: return <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Link size={20} /></div>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Ressources Pédagogiques</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <BookOpen size={18} /> Gérez vos fichiers, vidéos et liens de cours
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]"
        >
          <Plus size={20} />
          <span>Nouvelle Ressource</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Rechercher une ressource..." 
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-slate-400 text-xs uppercase tracking-widest">
                <th className="px-4 py-4 font-semibold">Ressource</th>
                <th className="px-4 py-4 font-semibold">Type</th>
                <th className="px-4 py-4 font-semibold text-center">Niveau / Enseignant</th>
                <th className="px-4 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={4} className="py-20 text-center text-slate-400">Chargement...</td></tr>
              ) : resourcesData.map((res) => (
                <tr key={res.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(res.type)}
                      <div>
                        <div className="font-bold text-slate-700">{res.title}</div>
                        <div className="text-xs text-slate-400 truncate max-w-[200px]">{res.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4">
                    <span className="text-xs font-bold uppercase text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      {res.type}
                    </span>
                  </td>
                  <td className="px-4 text-center">
                    <div className="flex flex-col items-center">
                       <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{res.level_name || "Tous"}</span>
                       <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><User size={10}/> {res.teacher_name}</span>
                    </div>
                  </td>
                  <td className="px-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenEditModal(res)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDeleteResource(res.id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all">
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

      {/* Modal - Modern Style */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{editingId ? "Modifier" : "Nouvelle"} Ressource</h2>
              <button onClick={() => setOpenModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={24} /></button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-1">TITRE</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-1">TYPE</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 outline-none">
                    <option value="pdf">📄 PDF</option>
                    <option value="video">🎬 Vidéo</option>
                    <option value="link">🔗 Lien</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-1">NIVEAU</label>
                  <select value={formData.group_id} onChange={(e) => setFormData({...formData, group_id: e.target.value})} className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 outline-none">
                    <option value="">Sélectionner</option>
                    {levelsData.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">URL DU FICHIER / LIEN</label>
                <input type="text" value={formData.type === 'link' ? formData.external_url : formData.file_url} 
                  onChange={(e) => setFormData({...formData, [formData.type === 'link' ? 'external_url' : 'file_url']: e.target.value})} 
                  className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all" placeholder="https://..." />
              </div>

              <button onClick={handleSaveResource} className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all mt-4">
                Enregistrer la ressource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}