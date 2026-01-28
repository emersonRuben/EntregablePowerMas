import { WarningCircleIcon, TrashIcon } from '@phosphor-icons/react';
import { Modal } from './Modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmationModal = ({ isOpen, onClose, onConfirm }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Eliminación">
            <div className="text-center py-0">
                <div className="flex justify-center mb-2">
                    <div className="p-3 bg-red-100 rounded-full text-red-600">
                        <WarningCircleIcon size={48} weight="duotone" />
                    </div>
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                    ¿Estás seguro?
                </h3>
                <p className="text-slate-500 mb-6">
                    Esta acción eliminará permanentemente al beneficiario. No se puede deshacer.
                </p>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 font-medium transition shadow-lg shadow-red-200"
                    >
                        <TrashIcon size={20} />
                        Sí, Eliminar
                    </button>
                </div>
            </div>
        </Modal>
    );
};
