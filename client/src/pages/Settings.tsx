import React, { useState } from "react";
import { Save, Plus, Pencil, Trash2, Globe, MessageSquare, Layout } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("contact");

  // تنسيق التبويبات (نفس شكل صورة المشرف)
  const tabClass = (tab) =>
    `flex-1 py-3 text-sm font-medium transition-all ${
      activeTab === tab
        ? "bg-white text-blue-600 shadow-sm rounded-lg"
        : "text-slate-500 hover:text-slate-700"
    }`;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres du Site</h1>
        <p className="text-slate-500">Gérez tous les paramètres de votre site web</p>
      </div>

      {/* Tabs Container */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl w-full">
        <button onClick={() => setActiveTab("contact")} className={tabClass("contact")}>Contact</button>
        <button onClick={() => setActiveTab("reseaux")} className={tabClass("reseaux")}>Réseaux</button>
        <button onClick={() => setActiveTab("accueil")} className={tabClass("accueil")}>Accueil</button>
        <button onClick={() => setActiveTab("sections")} className={tabClass("sections")}>Sections</button>
        <button onClick={() => setActiveTab("avis")} className={tabClass("avis")}>Avis</button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        
        {/* 1. Contact Tab */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Informations de Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Téléphone Principal</label>
                <input type="text" className="w-full p-3 border rounded-xl bg-slate-50" placeholder="+216..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input type="email" className="w-full p-3 border rounded-xl bg-slate-50" placeholder="admin@example.com" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Adresse</label>
                <textarea className="w-full p-3 border rounded-xl bg-slate-50" rows="3"></textarea>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700">
              <Save size={18} /> Enregistrer
            </button>
          </div>
        )}

                  
        {activeTab === "reseaux" && (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Réseaux Sociaux</h2>
        <p className="text-sm text-slate-500">Gérez les liens vers vos réseaux sociaux</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition-all shadow-sm">
        <Plus size={18} /> Nouveau Lien
      </button>
    </div>
    
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr className="text-slate-500 text-xs uppercase tracking-wider">
            <th className="px-6 py-4 font-semibold">Icône</th>
            <th className="px-6 py-4 font-semibold">Nom</th>
            <th className="px-6 py-4 font-semibold">URL</th>
            <th className="px-6 py-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Globe size={20} />
              </div>
            </td>
            <td className="px-6 py-4 font-medium text-slate-700">Facebook</td>
            <td className="px-6 py-4 text-slate-500 text-sm">https://facebook.com/edulive</td>
            <td className="px-6 py-4">
              <div className="flex justify-center gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Pencil size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}

        {/* 3. Accueil (Logos) */}
        {activeTab === "accueil" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <h3 className="font-bold">Logo de l'En-tête</h3>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center">
                   <div className="w-32 h-12 bg-slate-100 rounded mb-4 flex items-center justify-center text-xs text-slate-400">Preview</div>
                   <input type="file" className="text-xs" />
                </div>
             </div>
             <div className="space-y-4">
                <h3 className="font-bold">Logo du Pied de Page</h3>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center">
                   <div className="w-20 h-20 bg-slate-100 rounded-full mb-4 flex items-center justify-center text-xs text-slate-400">Preview</div>
                   <input type="file" className="text-xs" />
                </div>
             </div>
          </div>
        )}

        {/* يمكنك إضافة محتوى Sections و Avis بنفس نمط الجدول أعلاه */}

      </div>
    </div>
  );
}