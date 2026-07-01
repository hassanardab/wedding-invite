"use client";

import { useEffect, useState, useRef } from "react";
import { FaMapLocationDot, FaWhatsapp } from "react-icons/fa6";
import { FaVolumeXmark, FaVolumeHigh } from "react-icons/fa6";

// Type definition for our Sakura petal state
interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export default function Home() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sakura animation logic: Generates a new petal every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setPetals((currentPetals) => {
        // Keep a maximum of 15 petals on screen for performance
        if (currentPetals.length > 15) return currentPetals;

        const newPetal = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100, // random start position
          delay: Math.random() * 2,
          duration: 5 + Math.random() * 5,
        };

        return [...currentPetals, newPetal];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Clean up petals that have finished falling (approx 10 seconds)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setPetals((currentPetals) =>
        currentPetals.filter((petal) => Date.now() - petal.id < 11000)
      );
    }, 2000);
    return () => clearInterval(cleanupInterval);
  }, []);

  // Audio Play/Pause Toggle
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => console.log("User interaction required:", err));
      }
    }
  };

  // Handle first interaction auto-play
  useEffect(() => {
    const handleFirstClick = () => {
      if (!isPlaying) togglePlay();
      document.removeEventListener("click", handleFirstClick);
    };
    document.addEventListener("click", handleFirstClick);
    return () => document.removeEventListener("click", handleFirstClick);
  }, [isPlaying]);

  return (
    <main
      className="w-full h-full flex justify-center items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Background and Sakura */}
      <div id="background-container"></div>

      <div
        id="new-bg-elements"
        className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none"
      >
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="sakura-petal"
            style={{
              left: `${petal.left}vw`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Invitation Card */}
      <div id="invitation-card" onClick={(e) => e.stopPropagation()}>
        <div className="heart-icon" style={{ mt: "5px" }}>
          🌿 ✦ 🌿
        </div>

        <div className="arabic-text">
          تَوَادُّوا تَحَابُّوا كَمَا يُزْرَعُ الحُبُّ فِي قُلُوبٍ صَافِيَةٍ
          <br />
          يُثْمِرُ أُنْساً مَدَى الحَيَاةِ وَيَسْقِي رِضَاءَ الرَّحْمَنِ
        </div>

        <div className="heart-icon">✦</div>

        <div className="script-text">
          <span>مُوسَى</span>
          <span className="ampersand">&</span>
          <span>رَاوِيَة</span>
        </div>

        <div className="heart-icon">✦</div>

        <div
          className="arabic-text"
          style={{
            fontWeight: "normal",
            fontSize: "clamp(0.85rem, 3.5vw, 1.05rem)",
          }}
        >
          وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا
          <br />
          وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ
        </div>

        <div className="arabic-text">
          نتشرف بدعوتكم لمشاركتنا فرحتنا
          <br />
          وتناول وجبة الغداء
          <br />
          <span
            style={{
              fontSize: "1.25em",
              color: "#8c6d31",
              display: "block",
              margin: "2px 0",
            }}
          >
            فِي مَنْزِلِنَا العَامِرِ
          </span>
          <span style={{ fontSize: "0.85em", color: "#8c6d31" }}>
            ـ ◦ هـ قرية بورتوبيل هـ ◦ ـ
          </span>
        </div>

        <div>
          <span
            style={{
              fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
              fontWeight: "bold",
            }}
          >
            يوم الجمعة
          </span>
          <div className="date-text">
            <span className="date-icon">🌿</span>
            3/7
            <span
              className="date-icon"
              style={{ transform: "scaleX(-1)", display: "inline-block" }}
            >
              🌿
            </span>
          </div>
        </div>

        <div
          className="arabic-text"
          style={{
            color: "#4a3b2c",
            fontSize: "clamp(0.95rem, 3.8vw, 1.1rem)",
          }}
        >
          بحضوركم تكتمل فرحتنا
        </div>

        <div className="buttons-container">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="action-button btn-location"
          >
            <FaMapLocationDot />
            موقع الفرح
          </a>

          <a
            href="https://wa.me/0000000000?text=يسعدني+تلبية+الدعوة+وتأكيد+حضور+حفل+زفاف+موسى+وراوية"
            target="_blank"
            rel="noreferrer"
            className="action-button btn-whatsapp"
          >
            <FaWhatsapp />
            تأكيد الحضور
          </a>
        </div>
      </div>

      {/* Audio Element & Controls */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/arous_alnour.mp3" type="audio/mpeg" />
      </audio>

      <div id="audio-controls" onClick={togglePlay}>
        {isPlaying ? (
          <FaVolumeHigh className="play-icon" />
        ) : (
          <FaVolumeXmark className="play-icon" />
        )}
      </div>
    </main>
  );
}
