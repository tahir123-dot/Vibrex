import { motion } from "framer-motion";
import { Users, Trophy, Rocket, Star } from "lucide-react";

const members = [
  {
    name: "Tahir Rashid",
    role: "Team Lead",
    img: "https://backiee.com/static/wallpapers/1920x1080/386745.jpg",
  },
  {
    name: "Ayesha Khan",
    role: "Frontend Developer",
    img: "https://img.freepik.com/premium-photo/anime-girl-programmer-working-computer-with-code-screen_1282444-131494.jpg",
  },
  {
    name: "Ali Raza",
    role: "Backend Developer",
    img: "https://static.vecteezy.com/system/resources/thumbnails/033/341/434/small/world-programmer-s-day-photo.jpg",
  },
  {
    name: "Sara Ahmed",
    role: "AI/ML Engineer",
    img: "https://thumbs.dreamstime.com/b/young-anime-girl-coding-laptop-computer-programming-code-displayed-vibrant-purple-pigtails-intensely-focused-her-383138728.jpg",
  },
];

const hackathons = [
  { name: "NASA Space Apps Challenge", year: 2025, result: "Finalist" },
  { name: "Google Solution Challenge", year: 2024, result: "Top 50" },
  { name: "Pak HackFest", year: 2024, result: "Winner" },
];

export default function Hackathone() {
  return (
    <div className="bg-gradient-to-r from-black via-[#514d4d] to-white text-white">
      {/* Hero */}
      <section className="relative text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
        >
          CodeBreakers
        </motion.h1>
        <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto text-gray-300 leading-relaxed">
          Breaking limits, building innovations. We’re a team of creators,
          coders & dreamers ready to dominate hackathons worldwide.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 mt-8"
        >
          <Rocket size={36} className="text-white" />
          <Trophy size={36} className="text-white" />
          <Star size={36} className="text-white" />
        </motion.div>
      </section>

      {/* Team Members */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 flex justify-center items-center gap-3">
          <Users className="text-blue-400" /> Meet Our Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center border border-white/10 hover:border-blue-400 transition"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4 ring-2 ring-blue-400"
              />
              <h3 className="font-semibold text-lg text-white">{m.name}</h3>
              <p className="text-sm text-gray-300">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hackathons */}
      <section className="py-16 px-6 bg-gradient-to-r from-black to-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Hackathons We Played
        </h2>
        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {hackathons.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white/10 rounded-xl p-6 shadow hover:shadow-lg text-center border border-white/10 hover:border-blue-400 transition"
            >
              <Trophy className="mx-auto text-white mb-3" size={28} />
              <h3 className="font-semibold text-white">{h.name}</h3>
              <p className="text-sm text-white">{h.year}</p>
              <p className="text-white font-medium mt-1">{h.result}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Wanna Break Code With Us?</h2>
        <p className="mb-6 text-lg text-gray-300">
          We’re always open for passionate minds to join CodeBreakers.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://chat.whatsapp.com/HjweUo6zFIlGvfRJnEkBRD?mode=ems_share_t"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-400 hover:to-indigo-500 transition shadow-lg hover:shadow-xl"
        >
          Join the Team
        </motion.a>
      </section>
    </div>
  );
}
