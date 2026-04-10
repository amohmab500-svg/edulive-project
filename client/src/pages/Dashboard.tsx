import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../services/auth";

const API_URL = "http://localhost:5000/api/dashboard";

interface Registration {
  id: number;
  full_name: string;
  email: string;
  course: string;
  date: string;
}

export default function Dashboard() {
  const [statsData, setStatsData] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    pendingRequests: 0,
  });
  const [requests, setRequests] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${getToken()}` } };
      
      const [statsRes, regRes] = await Promise.all([
        axios.get(`${API_URL}/stats`, config),
        axios.get(`${API_URL}/recent-registrations`, config)
      ]);

      console.log("Stats from Server:", statsRes.data);

      setStatsData({
        students: statsRes.data.students || 0,
        teachers: statsRes.data.teachers || 0,
        classes: statsRes.data.classes || 0,
        pendingRequests: statsRes.data.pendingRequests || 0,
      });

      setRequests(regRes.data);
    } catch (error) {
      console.error("Erreur data fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // تعديل الدالة لترسل approved أو rejected بدلاً من الكلمات الفرنسية
  const handleStatusUpdate = async (id: number, newStatus: string) => {
    const confirmMsg = newStatus === 'approved' 
      ? "Voulez-vous approuver cette demande ?" 
      : "Voulez-vous rejeter cette demande ?";
      
    if (!window.confirm(confirmMsg)) return;
    
    try {
      await axios.put(`${API_URL}/registration/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchData(); 
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const stats = [
    { title: "Élèves", value: statsData.students },
    { title: "Enseignants", value: statsData.teachers },
    { title: "Classes", value: statsData.classes },
    { title: "Demandes en attente", value: statsData.pendingRequests },
  ];

  if (loading) return <div className="p-8 text-center text-slate-500">Chargement...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
            <h2 className="text-3xl font-bold mt-2 text-slate-900">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold mb-6">Demandes d'inscription (En attente)</h2>
        <div className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-slate-400 text-center py-4">Aucune demande en attente.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="flex items-center justify-between border rounded-xl p-4 hover:bg-slate-50 transition">
                <div>
                  <p className="font-semibold text-slate-800">{req.full_name}</p>
                  <p className="text-sm text-slate-500">{req.email}</p>
                  <div className="flex gap-4 mt-1">
                    <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{req.course}</p>
                    <p className="text-xs text-slate-400">{req.date}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    // إرسال "approved" لقاعدة البيانات
                    onClick={() => handleStatusUpdate(req.id, "approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Approuver
                  </button>
                  <button 
                    // إرسال "rejected" لقاعدة البيانات
                    onClick={() => handleStatusUpdate(req.id, "rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Rejeter
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}