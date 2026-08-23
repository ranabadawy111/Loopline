import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-paper rounded-2xl shadow-card w-full max-w-md p-6 border border-charcoal-700/[0.07] max-h-[90vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg text-charcoal-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-charcoal-600/50 hover:text-charcoal-800 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
