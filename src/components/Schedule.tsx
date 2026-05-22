"use client";

import { motion } from "framer-motion";

const cultos = [
  {
    icon: <i className="fas fa-sun" aria-hidden="true"></i>,
    title: "Culto do Meio Dia",
    day: "Segunda a Sexta",
    time: "12:00",
    desc: "Pausa diária para buscar a presença de Deus, clamar vitórias e fortalecer o espírito no meio do dia.",
  },
  {
    icon: <i className="fas fa-hand-holding" aria-hidden="true"></i>,
    title: "Culto de Adoração",
    day: "Quarta-Feira",
    time: "19:00",
    desc: "Tempo especial de entrega a Deus por meio de cânticos, comunhão sincera e meditação nas Escrituras.",
  },
  {
    icon: <i className="fas fa-dove" aria-hidden="true"></i>,
    title: "Culto de Ensino",
    day: "Sexta-Feira",
    time: "19:00",
    desc: "Reunião especialmente dedicada ao ensino profundo da Palavra e fortalecimento da fé.",
  },
  {
    icon: <i className="fas fa-book-open" aria-hidden="true"></i>,
    title: "Escola Bíblica",
    day: "Domingo",
    time: "08:00",
    desc: "Aprofunde seu conhecimento nas Escrituras Sagradas com turmas para todas as idades.",
  },
  {
    icon: <i className="fas fa-pray" aria-hidden="true"></i>,
    title: "Culto de Adoração",
    day: "Domingo",
    time: "18:00",
    desc: "Momento principal de louvor, adoração e ministração da Palavra para toda a família.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring" as const, 
      stiffness: 100 
    } 
  },
} as const;

export default function Schedule() {
  return (
    <section id="cultos" className="schedule section bg-light">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Nossos Cultos e Reuniões
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Reserve um tempo para estar na casa de Deus. Escolha o melhor
          horário para você e sua família.
        </motion.p>

        <motion.div 
          className="schedule-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cultos.map((culto, index) => (
            <motion.div 
              key={index} 
              className="schedule-card"
              variants={cardVariants}
            >
              <div className="card-icon" style={{ fontSize: "1.8rem" }}>
                {culto.icon}
              </div>
              <h3>{culto.title}</h3>
              <p className="day">{culto.day}</p>
              <p className="time">{culto.time}</p>
              <p className="desc">{culto.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
