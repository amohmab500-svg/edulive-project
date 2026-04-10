import { Link, Outlet, useLocation } from "react-router-dom";

export default function PublicLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">E</div>
            <div>
              <span className="text-xl font-bold text-slate-900">EDULIVE</span>
              <p className="text-xs text-slate-400 leading-none">CONNECTED EDUCATIONAL COMMUNITY</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition ${location.pathname === "/" ? "text-orange-500" : "text-slate-700 hover:text-orange-500"}`}>
              Accueil
            </Link>
            <Link to="/niveaux" className={`text-sm font-medium transition ${location.pathname === "/niveaux" ? "text-orange-500" : "text-slate-700 hover:text-orange-500"}`}>
              Niveaux
            </Link>
            <Link to="/avis" className={`text-sm font-medium transition ${location.pathname === "/avis" ? "text-orange-500" : "text-slate-700 hover:text-orange-500"}`}>
              Avis
            </Link>
            <Link to="/contact" className={`text-sm font-medium transition ${location.pathname === "/contact" ? "text-orange-500" : "text-slate-700 hover:text-orange-500"}`}>
              Contact
            </Link>
          </nav>

          <Link
            to="/login"
            className="rounded-full border-2 border-slate-800 px-6 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-800 hover:text-white transition"
          >
            Connexion
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Logo */}
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-500 text-white font-bold text-2xl">E</div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
                © Contact
              </h3>
              <div className="space-y-3 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>+216 25 105 711</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>salma@educentre.tn</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Tunisie</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Rejoignez notre newsletter</h3>
              <div className="flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700">
                  f
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:opacity-90">
                  IG
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
            © Platform created by <strong>WOWSOFT</strong>. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}