import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FlyingCash({ onComplete, originRect, targetRef }) {
  const [targetOffset, setTargetOffset] = useState(null);

  useEffect(() => {
    if (!originRect || !targetRef?.current) return;
    const targetRect = targetRef.current.getBoundingClientRect();
    const dx =
      targetRect.left + targetRect.width / 2 - (originRect.left + originRect.width / 2);
    const dy =
      targetRect.top + targetRect.height / 2 - (originRect.top + originRect.height / 2);
    setTargetOffset({ dx, dy });
  }, [originRect, targetRef]);

  if (!originRect || !targetOffset) return null;

  return (
    <div
      className="pointer-events-none fixed"
      style={{
        top: originRect.top + originRect.height / 2,
        left: originRect.left + originRect.width / 2,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/cash.png`}
        initial={{ x: 0, y: 0, scale: 0.8, opacity: 1 }}
        animate={{ x: targetOffset.dx, y: targetOffset.dy, scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="w-10 h-10"
        onAnimationComplete={onComplete}
      />
    </div>
  );
}
