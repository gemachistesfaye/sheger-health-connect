import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, HelpCircle, LogOut } from 'lucide-react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.", 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "danger" // danger, warning, info
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-10"
          >
            {/* Ambient Background Glow */}
            <div className={`absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full blur-3xl opacity-10 ${
              type === 'danger' ? 'bg-red-500' : 'bg-emerald-500'
            }`} />

            <div className="flex flex-col items-center text-center">
              {/* Header Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                type === 'danger' 
                  ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' 
                  : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
              }`}>
                {type === 'danger' ? <LogOut size={28} /> : <HelpCircle size={28} />}
              </div>

              {/* Title & Message */}
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                {title}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8 px-2">
                {message}
              </p>

              {/* Action Buttons */}
              <div className="flex w-full gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-sm transition-all focus:outline-none"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 py-4 text-white rounded-2xl font-black text-sm transition-all shadow-lg hover:shadow-xl focus:outline-none ${
                    type === 'danger' 
                      ? 'bg-red-600 hover:bg-red-500 shadow-red-600/20 hover:shadow-red-600/30' 
                      : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20 hover:shadow-emerald-600/30'
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
