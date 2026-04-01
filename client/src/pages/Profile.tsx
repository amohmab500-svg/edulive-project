import React, { useState } from "react";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    fullName: "Admin EduLive",
    email: "admin@edulive.com",
    phone: "+216 25 105 711",
    role: "Administrateur",
    photo: "https://picsum.photos/120",
    password: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    if (
      profileData.password &&
      profileData.password !== profileData.confirmPassword
    ) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    alert("Profil mis à jour avec succès");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Mon Profil</h1>
        <p className="mt-1 text-slate-500">
          Gérez vos informations personnelles
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-8 flex items-center gap-6">
          <img
            src={profileData.photo}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover"
          />

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {profileData.fullName}
            </h2>
            <p className="mt-1 text-slate-500">{profileData.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nom complet
            </label>
            <input
              type="text"
              value={profileData.fullName}
              onChange={(e) =>
                setProfileData({ ...profileData, fullName: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Téléphone
            </label>
            <input
              type="text"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Rôle
            </label>
            <input
              type="text"
              value={profileData.role}
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-100 p-3 text-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={profileData.password}
              onChange={(e) =>
                setProfileData({ ...profileData, password: e.target.value })
              }
              placeholder="Laisser vide pour ne pas changer"
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={profileData.confirmPassword}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Confirmer le mot de passe"
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSaveProfile}
            className="rounded-xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
}