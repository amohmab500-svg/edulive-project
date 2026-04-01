import React, { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const initialStudents = [
  {
    id: 1,
    photo: "https://picsum.photos/60?21",
    fullName: "Amira Ben Salah",
    email: "amira@edulive.com",
    phone: "+216 20 111 111",
    level: "BTP",
  },
  {
    id: 2,
    photo: "https://picsum.photos/60?22",
    fullName: "Omar Trabelsi",
    email: "omar@edulive.com",
    phone: "+216 21 222 222",
    level: "BTS",
  },
  {
    id: 3,
    photo: "https://picsum.photos/60?23",
    fullName: "Sarra Gharbi",
    email: "sarra@edulive.com",
    phone: "+216 22 333 333",
    level: "Langues",
  },
];

export default function Students() {
  const [studentsData, setStudentsData] = useState(initialStudents);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    level: "",
    photo: "",
  });

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      level: "",
      photo: "",
    });
    setEditingId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleOpenEditModal = (student: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    level: string;
    photo: string;
  }) => {
    setEditingId(student.id);
    setFormData({
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      level: student.level,
      photo: student.photo,
    });
    setOpenModal(true);
  };

  const handleSaveStudent = () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert("Veuillez remplir au moins le nom et l'email");
      return;
    }

    if (editingId !== null) {
      setStudentsData((prev) =>
        prev.map((student) =>
          student.id === editingId
            ? {
                ...student,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone || "-",
                level: formData.level || "-",
                photo: formData.photo || "https://picsum.photos/60",
              }
            : student
        )
      );
    } else {
      const studentToAdd = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || "-",
        level: formData.level || "-",
        photo: formData.photo || "https://picsum.photos/60",
      };

      setStudentsData((prev) => [...prev, studentToAdd]);
    }

    setOpenModal(false);
    resetForm();
  };

  const handleDeleteStudent = (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet élève ?"
    );
    if (!confirmed) return;

    setStudentsData((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Gestion des Élèves
          </h1>
          <p className="mt-1 text-slate-500">
            Gérez les élèves de la plateforme
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-600"
        >
          <Plus size={18} />
          Nouvel Élève
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-slate-800">
          Élèves ({studentsData.length})
        </h2>

        <table className="w-full">
          <thead className="border-b text-left text-sm text-slate-500">
            <tr>
              <th className="pb-3">Photo</th>
              <th className="pb-3">Nom</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Téléphone</th>
              <th className="pb-3">Niveau</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {studentsData.map((student) => (
              <tr key={student.id} className="h-20">
                <td className="py-3">
                  <img
                    src={student.photo}
                    alt={student.fullName}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </td>

                <td className="font-medium text-slate-800">{student.fullName}</td>
                <td className="text-slate-600">{student.email}</td>
                <td className="text-slate-600">{student.phone}</td>
                <td className="text-slate-600">{student.level}</td>

                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleOpenEditModal(student)}
                      className="rounded-lg p-2 hover:bg-slate-100"
                    >
                      <Pencil size={18} className="text-slate-600" />
                    </button>

                    <button
                      onClick={() => handleDeleteStudent(student.id)}
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
                {editingId !== null
                  ? "Modifier l'Élève"
                  : "Ajouter un Élève"}
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
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Nom complet"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Téléphone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+216..."
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
                  placeholder="BTP / BTS / Langues"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.value })
                  }
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleSaveStudent}
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