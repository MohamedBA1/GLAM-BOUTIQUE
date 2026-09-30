import React from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBoutique();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#302016] text-[#A48F70] shadow-2xl border border-[#C3A684]/30 transition-all duration-300 transform translate-y-0"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-[#C3A684] shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="w-5 h-5 text-[#C3A684] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium tracking-wide text-[#A48F70] font-serif">
              {toast.title}
            </h4>
            {toast.message && (
              <p className="text-xs text-[#A6927B] mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#A6927B] hover:text-[#A48F70] transition-colors p-1 -mr-1 -mt-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
