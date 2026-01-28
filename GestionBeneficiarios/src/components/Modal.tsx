import { XIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-red-500 transition"
                    >
                        <XIcon size={24} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
