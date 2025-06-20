import React from 'react';
const Modal = ({ children, onClose, size = 'lg' }) => (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}>
        <div className={`bg-slate-800 rounded-2xl shadow-2xl w-full max-w-${size} p-6 relative text-white border border-slate-700 animate-fade-in-up`} onClick={e => e.stopPropagation()}>{children}</div>
    </div>
);
export default Modal;