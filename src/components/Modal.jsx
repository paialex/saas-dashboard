import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen, onClose, title, children }) {
    // Prevent scrolling the background when modal is open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    // The 'portal' destination
    const portalRoot = document.body;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* 1. Backdrop (Click to close) */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* 2. Modal Content */}
            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transform transition-all scale-100">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>,
        portalRoot // ⬅️ This teleports the HTML out of the DashboardLayout
    );
}