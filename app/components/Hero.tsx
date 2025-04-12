"use client";

import { motion } from "framer-motion";
import { Cake, Heart, PartyPopper as Party, Stars } from "lucide-react";
import { useState } from "react";
import Confetti from "react-confetti";

export default function Hero() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-primary/10 to-primary/5">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden"
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowConfetti(true)}
        >
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
            alt="Birthday Person"
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-primary/20"
            whileHover={{ opacity: 0 }}
          />
        </motion.div>

        <motion.h1
          className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Happy Birthday!
        </motion.h1>

        <motion.div
          className="flex gap-4 justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[Cake, Heart, Party, Stars].map((Icon, index) => (
            <motion.div
              key={index}
              className="p-2 bg-primary/10 rounded-full"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-8 h-8 text-primary" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -z-10"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{ repeat: Infinity, duration: 10 }}
      >
        <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
}