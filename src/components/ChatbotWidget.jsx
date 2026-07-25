import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "../content/siteContent";

const promptChips = [
  "Tell me about your projects",
  "What's your experience?",
  "What technologies do you use?",
  "How can I contact you?",
];

export default function ChatbotWidget({ profileImage }) {
  return (
    <Disclosure>
      {({ open, close }) => (
        <>
          <AnimatePresence initial={false}>
            {open ? (
              <DisclosurePanel
                static
                as={motion.aside}
                className="fixed bottom-36 right-6 z-50 hidden w-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.5)] xl:block"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between bg-[linear-gradient(180deg,#5f97ff_0%,#3d79f6_100%)] px-6 py-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/20 text-sm font-semibold">
                      <img
                        src={profileImage || siteContent.profileImage}
                        alt="Assistant avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[16px] font-semibold">Portfolio Assistant</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-2xl text-white/80">
                    <span>¯</span>
                    <button
                      type="button"
                      onClick={() => close()}
                      aria-label="Close assistant"
                      className="cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="space-y-6 bg-black px-6 py-6">
                  <div className="flex flex-col items-end gap-4 pt-48">
                    {promptChips.map((chip) => (
                      <motion.button
                        key={chip}
                        type="button"
                        className="inline-flex rounded-full border border-white/12 bg-transparent px-6 py-4 text-[16px] font-semibold text-white transition hover:bg-white/6"
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

                  <div className="flex items-center justify-between rounded-full border border-white/12 bg-black px-5 py-4 text-slate-300">
                    <span className="text-[15px] text-slate-500">Ask something...</span>
                    <div className="flex items-center gap-4 text-2xl">
                      <span>-</span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a1a1a] text-white">
                        ↑
                      </span>
                    </div>
                  </div>
                </div>
              </DisclosurePanel>
            ) : null}
          </AnimatePresence>

          <DisclosureButton
            as={motion.button}
            type="button"
            className="fixed bottom-4 right-6 z-50 hidden h-16 w-16 items-center justify-center rounded-full bg-[#171510] text-3xl text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)] xl:flex"
            aria-label={open ? "Hide assistant" : "Open assistant"}
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {open ? "…" : "✦"}
          </DisclosureButton>
        </>
      )}
    </Disclosure>
  );
}
