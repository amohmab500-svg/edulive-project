import React, { useState, useEffect } from "react";
import { Save, Plus, Pencil, Trash2, Globe, X } from "lucide-react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("contact");

  // Contact State
  const [contact, setContact] = useState({
    primary_phone: "", email: "", address: "",
  });

  // Social Links State
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialModal, setSocialModal] = useState(false);
  const [editingSocial, setEditingSocial] = useState(null);
  const [socialForm, setSocialForm] = useState({ name: "", url: "", icon: "" });

  // Reviews State
  const [reviews, setReviews] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({ full_name: "", job_title: "", content: "", status: "Active" });

  // Sections State
  const [sections, setSections] = useState([]);
  const [sectionModal, setSectionModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [sectionForm, setSectionForm] = useState({ title: "", subtitle: "", image: "", sort_order: 1, is_active: 1 });

  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchContact();
    fetchSocialLinks();
    fetchReviews();
    fetchSections();
  }, []);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ===== CONTACT =====
  const fetchContact = async () => {
    try {
      const res = await axios.get(`${API}/settings/contact`);
      if (res.data) setContact({
        primary_phone: res.data.primary_phone || "",
        email: res.data.email || "",
        address: res.data.address || "",
      });
    } catch {}
  };

  const saveContact = async () => {
    try {
      await axios.put(`${API}/settings/contact`, contact);
      showSuccess("Informations de contact enregistrées ✓");
    } catch { alert("Erreur lors de la sauvegarde"); }
  };

  // ===== SOCIAL LINKS =====
  const fetchSocialLinks = async () => {
    try {
      const res = await axios.get(`${API}/settings/social`);
      setSocialLinks(res.data);
    } catch {}
  };

  const openSocialModal = (item = null) => {
    setEditingSocial(item);
    setSocialForm(item ? { name: item.name, url: item.url, icon: item.icon || "" } : { name: "", url: "", icon: "" });
    setSocialModal(true);
  };

  const saveSocial = async () => {
    try {
      if (editingSocial) {
        await axios.put(`${API}/settings/social/${editingSocial.id}`, socialForm);
      } else {
        await axios.post(`${API}/settings/social`, socialForm);
      }
      setSocialModal(false);
      fetchSocialLinks();
      showSuccess("Lien social enregistré ✓");
    } catch { alert("Erreur"); }
  };

  const deleteSocial = async (id) => {
    if (!window.confirm("Supprimer ce lien ?")) return;
    try {
      await axios.delete(`${API}/settings/social/${id}`);
      fetchSocialLinks();
    } catch {}
  };

  // ===== REVIEWS =====
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API}/settings/reviews`);
      setReviews(res.data);
    } catch {}
  };

  const openReviewModal = (item = null) => {
    setEditingReview(item);
    setReviewForm(item ? { full_name: item.full_name, job_title: item.job_title || "", content: item.content, status: item.status } : { full_name: "", job_title: "", content: "", status: "Active" });
    setReviewModal(true);
  };

  const saveReview = async () => {
    try {
      if (editingReview) {
        await axios.put(`${API}/settings/reviews/${editingReview.id}`, reviewForm);
      } else {
        await axios.post(`${API}/settings/reviews`, reviewForm);
      }
      setReviewModal(false);
      fetchReviews();
      showSuccess("Avis enregistré ✓");
    } catch { alert("Erreur"); }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Supprimer cet avis ?")) return;
    try {
      await axios.delete(`${API}/settings/reviews/${id}`);
      fetchReviews();
    } catch {}
  };

  // ===== SECTIONS =====
  const fetchSections = async () => {
    try {
      const res = await axios.get(`${API}/settings/sections`);
      setSections(res.data);
    } catch {}
  };

  const openSectionModal = (item = null) => {
    setEditingSection(item);
    setSectionForm(item ? { title: item.title, subtitle: item.subtitle || "", image: item.image || "", sort_order: item.sort_order, is_active: item.is_active } : { title: "", subtitle: "", image: "", sort_order: 1, is_active: 1 });
    setSectionModal(true);
  };

  const saveSection = async () => {
    try {
      if (editingSection) {
        await axios.put(`${API}/settings/sections/${editingSection.id}`, sectionForm);
      } else {
        await axios.post(`${API}/settings/sections`, sectionForm);
      }
      setSectionModal(false);
      fetchSections();
      showSuccess("Section enregistrée ✓");
    } catch { alert("Erreur"); }
  };

  const deleteSection = async (id) => {
    if (!window.confirm("Supprimer cette section ?")) return;
    try {
      await axios.delete(`${API}/settings/sections/${id}`);
      fetchSections();
    } catch {}
  };

  const tabClass = (tab) =>
    `flex-1 py-3 text-sm font-medium transition-all rounded-lg ${
      activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
    }`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Paramètres du Site</h1>
        <p className="text-slate-500">Gérez tous les paramètres de votre site web</p>
      </div>

      {successMsg && (
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">
          {successMsg}
        </div>
      )}

      <div className="flex bg-slate-100 p-1.5 rounded-xl w-full">
        {["contact", "reseaux", "accueil", "sections", "avis"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={tabClass(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">

        {/* CONTACT TAB */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Informations de Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Téléphone Principal</label>
                <input type="text" value={contact.primary_phone}
                  onChange={(e) => setContact({ ...contact, primary_phone: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500"
                  placeholder="+216..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input type="email" value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500"
                  placeholder="admin@example.com" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Adresse</label>
                <textarea value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500" rows={3} />
              </div>
            </div>
            <button onClick={saveContact}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700">
              <Save size={18} /> Enregistrer
            </button>
          </div>
        )}

        {/* RESEAUX TAB */}
        {activeTab === "reseaux" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Réseaux Sociaux</h2>
                <p className="text-sm text-slate-500">Gérez les liens vers vos réseaux sociaux</p>
              </div>
              <button onClick={() => openSocialModal()}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm hover:bg-blue-700">
                <Plus size={18} /> Nouveau Lien
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">URL</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {socialLinks.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-slate-500 text-sm">{item.url}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openSocialModal(item)} className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteSocial(item.id)} className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {socialLinks.length === 0 && (
                  <tr><td colSpan={3} className="text-center py-8 text-slate-400">Aucun lien social.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ACCUEIL TAB */}
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

        {/* SECTIONS TAB */}
        {activeTab === "sections" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Sections Personnalisées</h2>
                <p className="text-sm text-slate-500">Gérez les sections de la page d'accueil</p>
              </div>
              <button onClick={() => openSectionModal()}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm hover:bg-blue-700">
                <Plus size={18} /> Nouvelle Section
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Titre</th>
                  <th className="px-4 py-3">Sous-titre</th>
                  <th className="px-4 py-3">Ordre</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sections.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{item.title}</td>
                    <td className="px-4 py-3 text-slate-500 text-sm">{item.subtitle}</td>
                    <td className="px-4 py-3">{item.sort_order}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${item.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openSectionModal(item)} className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteSection(item.id)} className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sections.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-slate-400">Aucune section.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* AVIS TAB */}
        {activeTab === "avis" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Avis des Étudiants</h2>
                <p className="text-sm text-slate-500">Gérez les avis affichés sur le site</p>
              </div>
              <button onClick={() => openReviewModal()}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm hover:bg-blue-700">
                <Plus size={18} /> Nouvel Avis
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Commentaire</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reviews.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{item.full_name}</td>
                    <td className="px-4 py-3 text-slate-500 text-sm max-w-xs truncate">{item.content}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openReviewModal(item)} className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteReview(item.id)} className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {reviews.length === 0 && (
                  <tr><td colSpan={4} className="text-center py-8 text-slate-400">Aucun avis.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* SOCIAL MODAL */}
      {socialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editingSocial ? "Modifier" : "Nouveau"} Lien Social</h2>
              <button onClick={() => setSocialModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Nom</label>
                <input type="text" value={socialForm.name}
                  onChange={(e) => setSocialForm({ ...socialForm, name: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                  placeholder="Facebook, Instagram..." />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">URL</label>
                <input type="text" value={socialForm.url}
                  onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                  placeholder="https://..." />
              </div>
              <button onClick={saveSocial}
                className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVIEW MODAL */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editingReview ? "Modifier" : "Nouvel"} Avis</h2>
              <button onClick={() => setReviewModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Nom</label>
                <input type="text" value={reviewForm.full_name}
                  onChange={(e) => setReviewForm({ ...reviewForm, full_name: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Titre / Profession</label>
                <input type="text" value={reviewForm.job_title}
                  onChange={(e) => setReviewForm({ ...reviewForm, job_title: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                  placeholder="Étudiant, Parent..." />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Commentaire</label>
                <textarea value={reviewForm.content}
                  onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500" rows={3} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Statut</label>
                <select value={reviewForm.status}
                  onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button onClick={saveReview}
                className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION MODAL */}
      {sectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editingSection ? "Modifier" : "Nouvelle"} Section</h2>
              <button onClick={() => setSectionModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Titre</label>
                <input type="text" value={sectionForm.title}
                  onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Sous-titre</label>
                <input type="text" value={sectionForm.subtitle}
                  onChange={(e) => setSectionForm({ ...sectionForm, subtitle: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Image URL</label>
                <input type="text" value={sectionForm.image}
                  onChange={(e) => setSectionForm({ ...sectionForm, image: e.target.value })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                  placeholder="https://..." />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Ordre</label>
                <input type="number" value={sectionForm.sort_order}
                  onChange={(e) => setSectionForm({ ...sectionForm, sort_order: Number(e.target.value) })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Statut</label>
                <select value={sectionForm.is_active}
                  onChange={(e) => setSectionForm({ ...sectionForm, is_active: Number(e.target.value) })}
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500">
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
              <button onClick={saveSection}
                className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}