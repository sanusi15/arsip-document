import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const MyAlert = ({ message }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    // Tampilkan popup dengan animasi
    gsap.fromTo(
      popupRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
    // Sembunyikan popup setelah 3 detik
    const timer = setTimeout(() => {
      gsap.to(popupRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power1.in"
      });
    }, 3000);

    // Cleanup timer jika komponen unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={popupRef}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        backgroundColor: "#d3ffce",
        color: "#495057",
        padding: "12px 10px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transformOrigin: "center",
        fontSize: "12px"
      }}
    >
      {message}
    </div>
  );
};

export default MyAlert;
