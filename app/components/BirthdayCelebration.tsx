"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import {
  Cake,
  Heart,
  PartyPopper,
  Stars,
  Music,
  Gift,
  Sparkles,
} from "lucide-react";

const images = [
  "/images/punch_001.jpg",
  "/images/punch_002.jpg",
  "/images/punch_003.jpg",
  "/images/punch_004.jpg",
];

const sounds = {
  cake: "/sounds/party_poppers3.mp3",
  heart: "/sounds/long_clap2.mp3",
  party: "/sounds/angels_chorus1.mp3",
  stars: "/sounds/three_cheers.mp3",
  music: "/sounds/three_cheers.mp3",
  gift: "/sounds/party_poppers3.mp3",
  sparkles: "/sounds/long_clap2.mp3",
  birthday: "/sounds/happy-birthday.mp3",
};

export default function BirthdayCelebration() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState("");
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [activeIcon, setActiveIcon] = useState<number | null>(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const confettiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const messages = [
    "Happy Birthday!",
    "Wishing you a wonderful year!",
    "Thank you for everything!",
    "Let's keep in touch!",
    "Have an amazing day!",
    "I love your smile!",
    "Let's have fun together this year!",
    "Thank you for the wonderful memories!",
  ];

  useEffect(() => {
    Object.entries(sounds).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = 0.3;
      if (key === 'birthday') {
        audio.onended = () => {
          setShowFinalMessage(true);
          setTimeout(() => {
            setShowFinalMessage(false);
          }, 3000);
        };
      }
      audioRefs.current[key] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  useEffect(() => {
    if (isPartyMode) {
      setShowConfetti(true);
      const rotationInterval = setInterval(() => {
        setRotation(Math.random() * 360);
        setScale(0.8 + Math.random() * 0.4);
      }, 500);

      confettiIntervalRef.current = setInterval(() => {
        setShowConfetti(false);
        setTimeout(() => setShowConfetti(true), 100);
      }, 5000);

      return () => {
        clearInterval(rotationInterval);
        if (confettiIntervalRef.current) {
          clearInterval(confettiIntervalRef.current);
        }
        setShowConfetti(false);
      };
    }
  }, [isPartyMode]);

  const handleImageClick = () => {
    setShowConfetti(true);
    setShowSparkles(true);
    setClickCount((prev) => prev + 1);
    setMessage(messages[clickCount % messages.length]);
    setScale(1.2);
    audioRefs.current.party.play();
    setTimeout(() => {
      setShowConfetti(false);
      setShowSparkles(false);
      setScale(1);
    }, 3000);
  };

  const handleIconClick = (index: number) => {
    const soundKeys = Object.keys(sounds);
    const soundKey = soundKeys[index % soundKeys.length];
    
    audioRefs.current[soundKey].currentTime = 0;
    audioRefs.current[soundKey].play();

    setTimeout(() => {
      audioRefs.current[soundKey].pause();
      audioRefs.current[soundKey].currentTime = 0;
    }, 3000);

    setActiveIcon(index);
    setShowSparkles(true);
    setCurrentImageIndex(index % images.length);
    setMessage(messages[(index + clickCount) % messages.length]);
    setShowConfetti(index === 2);

    setTimeout(() => {
      setActiveIcon(null);
      setShowSparkles(false);
    }, 1000);
  };

  const togglePartyMode = () => {
    setIsPartyMode(!isPartyMode);
    setShowConfetti(true);
    
    if (!isPartyMode) {
      audioRefs.current.birthday.currentTime = 0;
      audioRefs.current.birthday.play();
    } else {
      audioRefs.current.birthday.pause();
      audioRefs.current.birthday.currentTime = 0;
    }
  };

  const iconComponents = [Cake, Heart, PartyPopper, Stars, Music, Gift, Sparkles];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={isPartyMode}
          numberOfPieces={isPartyMode ? 200 : 500}
          gravity={0.1}
          wind={0.05}
        />
      )}

      <div className="fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.5 }}
            className="fixed top-8 left-0 right-0 text-center z-20"
          >
            <span className="text-2xl md:text-4xl font-bold px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-28 left-0 right-0 text-center z-20 mb-8"
      >
        <motion.div
          className="relative inline-block"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-wider punch-text rainbow-animation"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            PUNCH
          </motion.h1>
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="sparkle absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 rounded-lg -z-10 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 mb-8 mt-16 rounded-full overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={handleImageClick}
        animate={{
          rotate: isPartyMode ? rotation : 0,
          scale: isPartyMode ? scale : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt="Birthday Person"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-pink-500/30"
          whileHover={{ opacity: 0 }}
        />
        {showSparkles && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>

      <div className="grid grid-cols-4 md:flex md:flex-wrap gap-3 md:gap-4 justify-center max-w-xl px-4 mb-8">
        {iconComponents.map((Icon, index) => (
          <motion.div
            key={index}
            className={`p-3 md:p-4 bg-white/10 backdrop-blur-lg rounded-xl cursor-pointer ${
              activeIcon === index ? 'ring-2 ring-primary' : ''
            }`}
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.8 }}
            animate={isPartyMode || activeIcon === index ? {
              y: [0, -10, 0],
              scale: activeIcon === index ? [1, 1.4, 1] : 1,
              transition: {
                duration: 1,
                repeat: isPartyMode ? Infinity : 0,
                delay: index * 0.2,
              },
            } : {}}
            onClick={() => handleIconClick(index)}
          >
            <Icon className={`w-6 h-6 md:w-8 md:h-8 text-primary ${
              activeIcon === index ? 'animate-pulse' : ''
            }`} />
          </motion.div>
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={togglePartyMode}
        className="bg-white/10 backdrop-blur-lg border-primary/20 hover:bg-white/20 text-sm md:text-base"
      >
        {isPartyMode ? "Party Mode OFF" : "Party Mode ON"}
      </Button>

      <motion.div
        className="absolute -z-10"
        animate={isPartyMode ? {
          scale: [1, 1.5, 2, 1.5, 1],
          rotate: [0, 120, 240, 360, 0],
          borderRadius: ["30%", "45%", "60%", "45%", "30%"],
        } : {}}
        transition={{ 
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
      >
        <div className="w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-yellow-500/30 rounded-full blur-3xl animate-shimmer bg-300%" />
      </motion.div>

      {isPartyMode && (
        <>
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full"
                animate={{
                  x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                  y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 animate-shimmer bg-300%" />
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                mass: 1
              }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-black text-center"
                style={{
                  background: "linear-gradient(45deg, #ff0000, #ff8c00, #ffd700, #008000, #0000ff, #4b0082, #ee82ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 10px rgba(255,255,255,0.5)",
                }}
                initial={{ y: -100, scale: 0.5, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  scale: [1, 1.2, 1],
                  opacity: 1,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  mass: 1,
                  delay: 0.2
                }}
              >
                Happy Birthday! <br />
                Bro!
              </motion.h1>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 rounded-lg -z-10 blur-3xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}