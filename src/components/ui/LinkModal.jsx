"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function LinkModal({
  isOpen,
  onClose,
  onConfirm,
  initialText = "",
  initialUrl = "https://",
}) {
  const [text, setText] = useState(initialText);
  const [url, setUrl] = useState(initialUrl);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url || url.trim() === "" || url.trim() === "https://") {
      alert("Please enter a valid URL");
      return;
    }
    onConfirm(text, url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed z-[101] bg-white rounded-xl sm:rounded-2xl shadow-xl w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-sm overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="p-4 sm:p-5 md:p-6 relative">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5 pb-3 border-b border-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 shrink-0">
                  <LinkIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                    Insert Hyperlink
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Add a clickable link to your post
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Text to display"
                    className="w-full border border-gray-300 p-2 sm:p-2.5 rounded-lg focus:ring-primary focus:border-primary text-sm focus:outline-none bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Link URL
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full border border-gray-300 p-2 sm:p-2.5 rounded-lg focus:ring-primary focus:border-primary text-sm focus:outline-none bg-white text-gray-900"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 border-t border-gray-100 mt-5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 sm:py-2.5 px-3 sm:px-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2 sm:py-2.5 px-3 sm:px-4 text-white font-medium bg-primary hover:bg-primary/90 rounded-lg sm:rounded-xl shadow-sm transition-all text-xs sm:text-sm flex items-center justify-center"
                  >
                    Add Link
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
