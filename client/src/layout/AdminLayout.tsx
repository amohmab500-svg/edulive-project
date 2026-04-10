import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

export default function AdminLayout() {
  const navItems = [
    { to: "/", label: "Tableau de bord" },
    { to: "/levels", label: "Niveaux" },
    { to: "/registration-requests", label: "Demandes d'inscription" },
    { to: "/teachers", label: "Enseignants" },
    { to: "/students", label: "Élèves" },
    { to: "/groups", label: "Groupes" },
    { to: "/resources", label: "Ressources" },
    { to: "/messages", label: "Messagerie" },
    { to: "/contact-messages", label: "Messages Contact" },
    { to: "/attendance", label: "Présences" },
    { to: "/profile", label: "Mon profil" },
    { to: "/settings", label: "Paramètres" },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-slate-100 text-slate-900"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Administration</h1>
        </div>
        <nav className="space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <p className="text-sm text-slate-500">Bienvenue, EduLive</p>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
            <NavLink to="/profile" className="hover:text-slate-900">Mon Profil</NavLink>
            <button onClick={logout} className="hover:text-slate-900">Déconnexion</button>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}