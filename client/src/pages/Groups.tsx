import React, { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const initialGroups = [
  {
    id: 1,
    name: "G1 - A1",
    level: "Langues",
    teacher: "Youssef Gharbi",
    schedule: "Lundi / Mercredi - 18:00",
  },
  {
    id: 2,
    name: "G2 - BTS",
    level: "BTS",
    teacher: "Ahmed Ben Ali",
    schedule: "Mardi / Jeudi - 14:00",
  },
  {
    id: 3,
    name: "G3 - BTP",
    level: "BTP",
    teacher: "Salma Trabelsi",
    schedule: "Samedi - 10:00",
  },
];

export default function Groups() {
  const [groupsData, setGroupsData] = useState(initialGroups);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    level: "",
    teacher: "",
    schedule: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      level: "",
      teacher: "",
      schedule: "",
    });
    setEditingId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleOpenEditModal = (group: {
    id: number;
    name: string;
    level: string;
    teacher: string;
    schedule: string;
  }) => {
    setEditingId(group.id);
    setFormData({
      name: group.name,
      level: group.level,
      teacher: group.teacher,
      schedule: group.schedule,
    });
    setOpenModal(true);
  };

  const handleSaveGroup = () => {
    if (!formData.name.trim()) {
      alert("Veuillez entrer le nom du groupe");
      return;
    }

    if (editingId !== null) {
      setGroupsData((prev) =>
        prev.map((group) =>
          group.id === editingId
            ? {
                ...group,
                name: formData.name,
                level: formData.level || "-",
                teacher: formData.teacher || "-",
                schedule: formData.schedule || "-",
              }
            : group
        )
      );
    } else {
      const groupToAdd = {
        id: Date.now(),
        name: formData.name,
        level: formData.level || "-",
        teacher: formData.teacher || "-",
        schedule: formData.schedule || "-",
      };

      setGroupsData((prev) => [...prev, groupToAdd]);
    }

    setOpenModal(false);
    resetForm();
  };

  const handleDeleteGroup = (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce groupe ?"
    );
    if (!confirmed) return;

    setGroupsData((prev) => prev.filter((group) => group.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Gestion des Groupes
          </h1>
          <p className="mt-1 text-slate-500">
            Gérez les groupes et leurs informations
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600"
        >
          <Plus size={18} />
          Nouveau Groupe
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-slate-800">
          Groupes ({groupsData.length})
        </h2>

        <table className="w-full">
          <thead className="border-b text-left text-sm text-slate-500">
            <tr>
              <th className="pb-3">Nom du groupe</th>
              <th className="pb-3">Niveau</th>
              <th className="pb-3">Enseignant</th>
              <th className="pb-3">Horaire</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {groupsData.map((group) => (
              <tr key={group.id} className="h-20">
                <td className="font-medium text-slate-800">{group.name}</td>
                <td className="text-slate-600">{group.level}</td>
                <td className="text-slate-600">{group.teacher}</td>
                <td className="text-slate-600">{group.schedule}</td>

                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleOpenEditModal(group)}
                      className="rounded-lg p-2 hover:bg-slate-100"
                    >
                      <Pencil size={18} className="text-slate-600" />
                    </button>

                    <button
                      onClick={() => handleDeleteGroup(group.id)}
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

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                {editingId !== null ? "Modifier le Groupe" : "Ajouter un Groupe"}
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
                  Nom du groupe
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: G1 - A1"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Niveau
                </label>
                <input
                  type="text"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                  placeholder="Langues / BTS / BTP"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Enseignant
                </label>
                <input
                  type="text"
                  value={formData.teacher}
                  onChange={(e) =>
                    setFormData({ ...formData, teacher: e.target.value })
                  }
                  placeholder="Nom de l'enseignant"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Horaire
                </label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) =>
                    setFormData({ ...formData, schedule: e.target.value })
                  }
                  placeholder="Lundi / Mercredi - 18:00"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleSaveGroup}
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