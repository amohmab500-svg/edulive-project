import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../services/auth";
import { Calendar, Link as LinkIcon, User } from "lucide-react";

const API = "http://localhost:5000/api";

export default function StudentClasses() {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    axios.get(`${API}/student/info`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((res) => setInfo(res.data)).catch(() => {});
  }, []);

  if (!info?.group_name) return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Ma Classe</h1>
      <div className="rounded-2xl bg-white p-8 shadow-sm text-center text-slate-400">
        Vous n'êtes assigné à aucune classe.
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ma Classe</h1>
        <p className="mt-1 text-slate-500">Détails de votre classe</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">{info.group_name}</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
            <User size={20} className="text-blue-500" />
            <div>
              <p className="text-xs text-slate-400">Enseignant</p>
              <p className="font-medium text-slate-800">{info.teacher_name || "-"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
            <Calendar size={20} className="text-purple-500" />
            <div>
              <p className="text-xs text-slate-400">Horaire</p>
              <p className="font-medium text-slate-800">{info.schedule || "-"}</p>
            </div>
          </div>
          {info.meeting_link && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50">
              <LinkIcon size={20} className="text-blue-500" />
              <div className="flex-1">
                <p className="text-xs text-slate-400">Lien de réunion</p>
                <a href={info.meeting_link} target="_blank" rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline">
                  Rejoindre la classe
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}