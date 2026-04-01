import React, { useMemo, useState } from "react";
import { Pencil, Trash2, Plus, X, FileText } from "lucide-react";

const groups = [
  "ALLEMAND A1 G1 - A1",
  "ANGLAIS G2 - BTS",
  "FRANÇAIS G3 - BTP",
];

const initialResources = [
  {
    id: 1,
    group: "ALLEMAND A1 G1 - A1",
    title: "Cour Allemand",
    description: "-",
    type: "PDF",
    date: "05/11/2025",
  },
  {
    id: 2,
    group: "ANGLAIS G2 - BTS",
    title: "Grammar Basics",
    description: "Introduction",
    type: "PDF",
    date: "07/11/2025",
  },
  {
    id: 3,
    group: "FRANÇAIS G3 - BTP",
    title: "Cours Français",
    description: "Module 1",
    type: "PDF",
    date: "09/11/2025",
  },
];

export default function Resources() {
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [resourcesData, setResourcesData] = useState(initialResources);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    group: groups[0],
    title: "",
    description: "",
    type: "PDF",
    date: "",
  });

  const filteredResources = useMemo(() => {
    return resourcesData.filter((resource) => resource.group === selectedGroup);
  }, [resourcesData, selectedGroup]);

  const resetForm = () => {
    setFormData({
      group: selectedGroup,
      title: "",
      description: "",
      type: "PDF",
      date: "",
    });
    setEditingId(null);
  };

  const handleOpenAddModal = () => {
    setFormData({
      group: selectedGroup,
      title: "",
      description: "",
      type: "PDF",
      date: "",
    });
    setEditingId(null);
    setOpenModal(true);
  };

  const handleOpenEditModal = (resource: {
    id: number;
    group: string;
    title: string;
    description: string;
    type: string;
    date: string;
  }) => {
    setEditingId(resource.id);
    setFormData({
      group: resource.group,
      title: resource.title,
      description: resource.description,
      type: resource.type,
      date: resource.date,
    });
    setOpenModal(true);
  };

  const handleSaveResource = () => {
    if (!formData.title.trim()) {
      alert("Veuillez entrer le titre de la ressource");
      return;
    }

    if (editingId !== null) {
      setResourcesData((prev) =>
        prev.map((resource) =>
          resource.id === editingId
            ? {
                ...resource,
                group: formData.group,
                title: formData.title,
                description: formData.description || "-",
                type: formData.type || "PDF",
                date: formData.date || "-",
              }
            : resource
        )
      );
    } else {
      const resourceToAdd = {
        id: Date.now(),
        group: formData.group,
        title: formData.title,
        description: formData.description || "-",
        type: formData.type || "PDF",
        date: formData.date || "-",
      };

      setResourcesData((prev) => [...prev, resourceToAdd]);
    }

    setOpenModal(false);
    resetForm();
  };

  const handleDeleteResource = (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette ressource ?"
    );
    if (!confirmed) return;

    setResourcesData((prev) => prev.filter((resource) => resource.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Gestion des ressources
        </h1>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Sélectionner un groupe
        </h2>
        <p className="mt-1 text-slate-500">
          Choisissez un groupe pour gérer ses ressources
        </p>

        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="mt-6 w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-blue-500"
        >
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Ressources de groupe
            </h2>
            <p className="mt-1 text-slate-500">
              Gérez les ressources pédagogiques
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600"
          >
            <Plus size={18} />
            Ajouter une ressource
          </button>
        </div>

        <table className="w-full">
          <thead className="border-b text-left text-sm text-slate-500">
            <tr>
              <th className="pb-3">Type</th>
              <th className="pb-3">Titre</th>
              <th className="pb-3">Description</th>
              <th className="pb-3">Date d’ajout</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <tr key={resource.id} className="h-20">
                  <td className="py-3">
                    <FileText size={22} className="text-red-500" />
                  </td>

                  <td className="font-medium text-slate-800">{resource.title}</td>

                  <td className="text-slate-600">{resource.description}</td>

                  <td className="text-slate-600">{resource.date}</td>

                  <td className="text-right">
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
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  Aucune ressource trouvée pour ce groupe.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                {editingId !== null
                  ? "Modifier la ressource"
                  : "Ajouter une ressource"}
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
                  Groupe
                </label>
                <select
                  value={formData.group}
                  onChange={(e) =>
                    setFormData({ ...formData, group: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                >
                  {groups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Titre de la ressource"
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
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Description"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                >
                  <option value="PDF">PDF</option>
                  <option value="Lien">Lien</option>
                  <option value="Vidéo">Vidéo</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Date d’ajout
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  placeholder="05/11/2025"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
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