import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../services/auth";

export default function TeacherLayout() {
  const navItems = [
    { to: "/teacher", label: "Tableau de bord" },
    { to: "/teacher/classes", label: "Mes Classes" },
    { to: "/teacher/resources", label: "Ressources" },
    { to: "/teacher/attendance", label: "Présences" },
    { to: "/teacher/messages", label: "Messagerie" },
    { to: "/teacher/profile", label: "Mon Profil" },
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
          <h1 className="text-2xl font-bold text-slate-900">Espace Enseignant</h1>
        </div>
        <nav className="space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/teacher"}
              className={linkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <p className="text-sm text-slate-500">Espace Enseignant - EduLive</p>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
            <NavLink to="/teacher/profile" className="hover:text-slate-900">Mon Profil</NavLink>
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