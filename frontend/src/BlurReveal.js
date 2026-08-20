import React from "react";
import { motion } from "framer-motion";

export const blurTransition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };

export const blurVariants = {
  hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
  visible: { filter: "blur(0px)", transform: "translateY(0%)", opacity: 1 },
};

/**
 * Word-by-word scroll blur reveal for headings and titles
 */
export function BlurTextReveal({ 
  text, 
  className = "", 
  as: Component = "span", 
  stagger = 0.04, 
  delay = 0,
  viewportMargin = "-30px",
  once = true 
}) {
  if (!text) return null;
  const words = typeof text === "string" ? text.split(" ") : [];

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <motion.span
            className="inline-block"
            transition={blurTransition}
            variants={blurVariants}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
}

/**
 * Container component that staggers child blur items when scrolled into view
 */
export function BlurRevealContainer({ 
  children, 
  className = "", 
  stagger = 0.08, 
  delay = 0,
  viewportMargin = "-30px",
  once = true,
  ...props
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual item that reveals with blur + translateY on scroll
 */
export function BlurItem({ children, className = "", delay = 0, ...props }) {
  return (
    <motion.div
      variants={blurVariants}
      transition={{ ...blurTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function BlurReveal({ text = "The website builder you're looking for is right here" }) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: 0.04 }}
    >
      <h1 className="mb-6 text-5xl font-semibold md:text-6xl text-white">
        {words.map((word, index) => (
          <React.Fragment key={index}>
            <motion.span className="inline-block" transition={blurTransition} variants={blurVariants}>
              {word}
            </motion.span>
            {index < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </h1>
      <motion.p className="text-zinc-400 text-lg mb-8" transition={blurTransition} variants={blurVariants}>
        Simple is a modern website builder powered by AI that changes how companies create user interfaces together.
      </motion.p>
      <div className="flex gap-4">
        <motion.div transition={blurTransition} variants={blurVariants}>
          <a className="inline-flex justify-center whitespace-nowrap rounded-lg bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-700 transition-colors" href="#0">
            Start Free Trial
          </a>
        </motion.div>
        <motion.div transition={blurTransition} variants={blurVariants}>
          <a className="inline-flex justify-center whitespace-nowrap rounded-lg bg-transparent px-3.5 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-700 transition-colors" href="#0">
            Learn More
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
