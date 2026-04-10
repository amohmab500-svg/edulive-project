import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

interface Level {
  id: number;
  name: string;
  description: string;
  image?: string;
}

export default function NiveauxPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/levels`)
      .then((res) => setLevels(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLevelClick = (levelId: number) => {
    navigate(`/register?level=${levelId}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Inscrivez-vous maintenant</h1>
          <p className="mt-3 text-slate-500 text-lg">Choisissez un niveau</p>
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-20">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((level) => (
              <div
                key={level.id}
                onClick={() => handleLevelClick(level.id)}
                className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl"
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

                {/* Blue overlay like reference site */}
                <div className="absolute inset-0 bg-blue-900/50 group-hover:bg-blue-900/40 transition duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-3">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h2 className="text-2xl font-bold">{level.name}</h2>
                  {level.description && (
                    <p className="mt-2 text-sm text-white/80 text-center px-4">{level.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}