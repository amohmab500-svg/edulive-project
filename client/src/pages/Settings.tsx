import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

type TabType = "contact" | "reseaux" | "accueil" | "sections" | "avis";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>("contact");

  const [contactData, setContactData] = useState({
    mainPhone: "+216 25 105 711",
    secondaryPhone: "+216 12 345 678",
    email: "salma@educentre.tn",
    address: "Tunisie",
  });

  const [socialLinks, setSocialLinks] = useState([
    {
      id: 1,
      icon: "Facebook",
      name: "EduCentre",
      url: "https://www.facebook.com/educentre.tn",
      order: 1,
    },
    {
      id: 2,
      icon: "Instagram",
      name: "EduCentre",
      url: "https://www.instagram.com/educentre.tn",
      order: 2,
    },
  ]);

  const [homeData, setHomeData] = useState({
    headerLogo: "",
    footerLogo: "",
    headerLogoHeight: "48",
    footerLogoHeight: "170",
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      image: "🎥",
      title: "Enregistrez vos visioconférences en toute simplicité",
      subtitle: "Enregistrement",
      order: 1,
      status: "Active",
    },
    {
      id: 2,
      image: "📚",
      title: "Partagez vos ressources pédagogiques avec vos classes",
      subtitle: "Partagez des livres et des documents",
      order: 2,
      status: "Active",
    },
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ahmed",
      comment: "Très bonne plateforme",
      status: "Active",
    },
    {
      id: 2,
      name: "Salma",
      comment: "Interface simple et pratique",
      status: "Active",
    },
  ]);

  const handleDeleteSocial = (id: number) => {
    const confirmed = window.confirm("Supprimer ce lien ?");
    if (!confirmed) return;
    setSocialLinks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteSection = (id: number) => {
    const confirmed = window.confirm("Supprimer cette section ?");
    if (!confirmed) return;
    setSections((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteReview = (id: number) => {
    const confirmed = window.confirm("Supprimer cet avis ?");
    if (!confirmed) return;
    setReviews((prev) => prev.filter((item) => item.id !== id));
  };

  const tabClass = (tab: TabType) =>
    `flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
      activeTab === tab
        ? "bg-white text-slate-900 shadow-sm"
        : "text-slate-500 hover:text-slate-800"
    }`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Paramètres du Site
        </h1>
        <p className="mt-1 text-slate-500">
          Gérez tous les paramètres de votre site web
        </p>
      </div>

      <div className="flex rounded-2xl bg-slate-100 p-1">
        <button onClick={() => setActiveTab("contact")} className={tabClass("contact")}>
          Contact
        </button>
        <button onClick={() => setActiveTab("reseaux")} className={tabClass("reseaux")}>
          Réseaux
        </button>
        <button onClick={() => setActiveTab("accueil")} className={tabClass("accueil")}>
          Accueil
        </button>
        <button onClick={() => setActiveTab("sections")} className={tabClass("sections")}>
          Sections
        </button>
        <button onClick={() => setActiveTab("avis")} className={tabClass("avis")}>
          Avis
        </button>
      </div>

      {activeTab === "contact" && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Informations de Contact
          </h2>
          <p className="mt-1 text-slate-500">
            Gérez les coordonnées affichées sur le site
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Téléphone Principal
              </label>
              <input
                type="text"
                value={contactData.mainPhone}
                onChange={(e) =>
                  setContactData({ ...contactData, mainPhone: e.target.value })
                }
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Téléphone Secondaire
              </label>
              <input
                type="text"
                value={contactData.secondaryPhone}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    secondaryPhone: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) =>
                setContactData({ ...contactData, email: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Adresse
            </label>
            <textarea
              value={contactData.address}
              onChange={(e) =>
                setContactData({ ...contactData, address: e.target.value })
              }
              rows={4}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <button className="mt-6 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
            Enregistrer
          </button>
        </div>
      )}

      {activeTab === "reseaux" && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Réseaux Sociaux
              </h2>
              <p className="mt-1 text-slate-500">
                Gérez les liens vers vos réseaux sociaux
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
              <Plus size={18} />
              Nouveau Lien
            </button>
          </div>

          <table className="w-full">
            <thead className="border-b text-left text-sm text-slate-500">
              <tr>
                <th className="pb-3">Icône</th>
                <th className="pb-3">Nom</th>
                <th className="pb-3">URL</th>
                <th className="pb-3">Ordre</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {socialLinks.map((item) => (
                <tr key={item.id} className="h-20">
                  <td>{item.icon}</td>
                  <td className="font-medium text-slate-800">{item.name}</td>
                  <td className="text-slate-600">{item.url}</td>
                  <td className="text-slate-600">{item.order}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-3">
                      <button className="rounded-lg p-2 hover:bg-slate-100">
                        <Pencil size={18} className="text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteSocial(item.id)}
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
        </div>
      )}

      {activeTab === "accueil" && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Logos du Site</h2>
          <p className="mt-1 text-slate-500">
            Personnalisez les logos de l'en-tête et du pied de page
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-800">
                Logo de l'En-tête (Topbar)
              </h3>

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Logo de l'en-tête
              </label>
              <input
                type="file"
                className="mt-2 w-full rounded-xl border border-slate-300 p-3"
              />

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Hauteur du logo (px)
              </label>
              <input
                type="text"
                value={homeData.headerLogoHeight}
                onChange={(e) =>
                  setHomeData({ ...homeData, headerLogoHeight: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-800">
                Logo du Pied de Page (Footer)
              </h3>

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Logo du pied de page
              </label>
              <input
                type="file"
                className="mt-2 w-full rounded-xl border border-slate-300 p-3"
              />

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Hauteur du logo (px)
              </label>
              <input
                type="text"
                value={homeData.footerLogoHeight}
                onChange={(e) =>
                  setHomeData({ ...homeData, footerLogoHeight: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button className="mt-6 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
            Enregistrer les logos
          </button>
        </div>
      )}

      {activeTab === "sections" && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Sections Personnalisées
              </h2>
              <p className="mt-1 text-slate-500">
                Créez des sections personnalisées pour votre page d'accueil
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
              <Plus size={18} />
              Section
            </button>
          </div>

          <table className="w-full">
            <thead className="border-b text-left text-sm text-slate-500">
              <tr>
                <th className="pb-3">Image</th>
                <th className="pb-3">Titre</th>
                <th className="pb-3">Ordre</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {sections.map((section) => (
                <tr key={section.id} className="h-20">
                  <td className="text-2xl">{section.image}</td>
                  <td>
                    <p className="font-medium text-slate-800">{section.title}</p>
                    <p className="text-sm text-slate-500">{section.subtitle}</p>
                  </td>
                  <td className="text-slate-600">{section.order}</td>
                  <td>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      {section.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-3">
                      <button className="rounded-lg p-2 hover:bg-slate-100">
                        <Pencil size={18} className="text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.id)}
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
        </div>
      )}

      {activeTab === "avis" && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Avis</h2>
              <p className="mt-1 text-slate-500">
                Gérez les avis affichés sur votre site
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
              <Plus size={18} />
              Nouvel Avis
            </button>
          </div>

          <table className="w-full">
            <thead className="border-b text-left text-sm text-slate-500">
              <tr>
                <th className="pb-3">Nom</th>
                <th className="pb-3">Commentaire</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {reviews.map((review) => (
                <tr key={review.id} className="h-20">
                  <td className="font-medium text-slate-800">{review.name}</td>
                  <td className="text-slate-600">{review.comment}</td>
                  <td>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      {review.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-3">
                      <button className="rounded-lg p-2 hover:bg-slate-100">
                        <Pencil size={18} className="text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
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
        </div>
      )}
    </div>
  );
}