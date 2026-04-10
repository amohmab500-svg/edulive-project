import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

interface Level {
  id: number;
  name: string;
  description: string;
  image?: string; // استخدام التسمية الجديدة المطابقة لقاعدة البيانات
}

export default function HomePage() {
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    axios.get(`${API}/levels`)
      .then((res) => setLevels(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Des cours vivants pour des esprits brillants !
            </h1>
            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              Bienvenue sur Edulive, la plateforme qui réinventه l'apprentissage en ligne.
              Enseignants et apprenants se connectent en direct ou en replay pour vivre une
              expérience fluide, interactive et accessible.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
            >
              Inscrivez-vous
            </Link>
          </div>

          {/* Features circles */}
          <div className="relative flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "📹", label: "Google Meet" },
                { icon: "✅", label: "Présence" },
                { icon: "📄", label: "Ressources" },
                { icon: "💬", label: "Messages" },
                { icon: "📝", label: "Devoirs" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center justify-center rounded-full border-2 border-orange-400 w-28 h-28 text-center">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs text-orange-400 font-medium mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Niveaux Section - التحديث الجديد هنا */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900">Inscrivez-vous maintenant</h2>
          <p className="mt-3 text-slate-500 text-lg">Choisissez un niveau</p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((level) => (
              <Link
                key={level.id}
                to={`/register?level=${level.id}`}
                className="group relative h-64 overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Image */}
                {level.image ? (
                  <img
                    src={level.image}
                    alt={level.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-300" />
                )}

                {/* Blue overlay matching reference */}
                <div className="absolute inset-0 bg-blue-900/50 group-hover:bg-blue-900/40 transition duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-3">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h2 className="text-2xl font-bold">{level.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* باقي الأقسام كما هي */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 space-y-20">
          {[
            {
              title: "Enregistrez vos visioconférences en toute simplicité",
              desc: "Revoyez vos réunions Google Meet quand vous en avez besoin, avec vidéo et audio intégrés.",
              icon: "🎥",
              reverse: false,
            },
            {
              title: "Partagez vos ressources pédagogiques avec vos classes",
              desc: "Téléversez des livres et documents pour aider vos apprenants à progresser à tout moment.",
              icon: "📚",
              reverse: true,
            },
            {
              title: "Discutez en temps réel en toute simplicité",
              desc: "Échangez librement avec les enseignants et les apprenants grâce au chat instantané intégré à la plateforme.",
              icon: "💬",
              reverse: false,
            },
          ].map((item, i) => (
            <div key={i} className={`flex flex-col gap-10 lg:flex-row items-center ${item.reverse ? "lg:flex-row-reverse" : ""}`}>
              <div className="flex-1 flex items-center justify-center rounded-2xl bg-slate-50 p-10">
                <span className="text-9xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-slate-500 text-lg leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Prêt à commencer votre apprentissage ?</h2>
        <Link
          to="/register"
          className="mt-8 inline-block rounded-full bg-blue-500 px-10 py-4 font-semibold text-white hover:bg-blue-600 transition"
        >
          Inscrivez-vous maintenant
        </Link>
      </section>
    </div>
  );
}