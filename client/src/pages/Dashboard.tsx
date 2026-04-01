export default function Dashboard() {

  const stats = [
    { title: "Élèves", value: 3 },
    { title: "Enseignants", value: 3 },
    { title: "Classes", value: 3 },
    { title: "Demandes en attente", value: 8 },
  ];

  const requests = [
    {
      name: "Ridha Zoghlami",
      email: "reseausp@gmail.com",
      course: "Langues - C2",
      date: "11/01/2026",
    },
    {
      name: "Ahmed Ali",
      email: "visex15194@akixpres.com",
      course: "Langues - A1",
      date: "09/01/2026",
    },
  ];

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-slate-900">
        Tableau de bord
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <p className="text-slate-500">{stat.title}</p>

            <h2 className="text-3xl font-bold mt-2">
              {stat.value}
            </h2>
          </div>
        ))}

      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-6">
          Demandes d'inscription
        </h2>

        <div className="space-y-4">

          {requests.map((req, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-xl p-4"
            >

              <div>
                <p className="font-medium">{req.name}</p>

                <p className="text-sm text-slate-500">
                  {req.email}
                </p>

                <p className="text-sm text-slate-400">
                  {req.course}
                </p>

                <p className="text-xs text-slate-400">
                  {req.date}
                </p>
              </div>

              <div className="flex gap-3">

                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  Approuver
                </button>

                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Rejeter
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}