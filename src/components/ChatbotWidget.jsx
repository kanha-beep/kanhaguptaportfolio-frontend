import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "../content/siteContent";

const promptChips = [
  "Tell me about your projects",
  "What's your experience?",
  "What technologies do you use?",
  "How can I contact you?",
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.aside
          className="chatbot-shell"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="chatbot-header">
            <div className="flex items-center gap-4">
              <div className="chatbot-avatar">
                <img
                  src={siteContent.profileImage}
                  alt="Assistant avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[16px] font-semibold">Portfolio Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-2xl text-white/80">
              <span>⋯</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="cursor-pointer"
              >
                ×
              </button>
            </div>
          </div>

          <div className="space-y-6 bg-black px-6 py-6">
            {/* <div className="chatbot-message">
              Hi! 👋 I&apos;m {siteContent.firstName}&apos;s portfolio assistant. I
              can help you learn about experience, projects, skills, and
              background. What would you like to know?
            </div> */}

            <div className="flex flex-col items-end gap-4 pt-48">
              {promptChips.map((chip) => (
                <motion.button
                  key={chip}
                  type="button"
                  className="chatbot-chip"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.24, delay: 0.08 }}
                >
                  {chip}
                </motion.button>
              ))}
            </div>

            <p className="pt-4 text-center text-[14px] text-slate-400">
              Powered by Chatbase
            </p>

            <div className="chatbot-input">
              <span className="text-[15px] text-slate-500">Ask something...</span>
              <div className="flex items-center gap-4 text-2xl">
                <span>◔</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a1a1a] text-white">
                  ↑
                </span>
              </div>
            </div>
          </div>
        </motion.aside>
      ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        className="chatbot-collapse"
        aria-label={isOpen ? "Hide assistant" : "Open assistant"}
        onClick={() => setIsOpen((value) => !value)}
        whileHover={{ y: -3, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {isOpen ? "˅" : "✦"}
      </motion.button>
    </>
  );
}
