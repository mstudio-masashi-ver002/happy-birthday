"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Message() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-t from-primary/10 to-primary/5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-4"
      >
        <Card className="p-8 backdrop-blur-lg bg-background/80">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">
              特別な友達へ
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                いつも私たちの周りを明るく照らしてくれてありがとう。
                あなたの笑顔、優しさ、そして情熱は、私たちみんなの心を温めてくれます。
              </p>
              <p>
                今年もまた一つ賢く、強く、そして素敵になったあなたを、
                心から祝福したいと思います。
              </p>
              <p>
                これからも一緒に笑い、泣き、成長していけることを楽しみにしています。
                素敵な一年になりますように。
              </p>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </section>
  );
}