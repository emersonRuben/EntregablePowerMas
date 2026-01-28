import { FloppyDiskIcon } from '@phosphor-icons/react';
import type { BeneficiarioInput, DocumentoIdentidad } from '../interfaces';
import { useBeneficiarioForm } from '../hooks/useBeneficiarioForm';
import { BeneficiarioFormFields } from './BeneficiarioFormFields';
import { Modal } from './Modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: BeneficiarioInput) => void;
    documentos: DocumentoIdentidad[];
    beneficiarioEditar?: BeneficiarioInput | null;
}

export const BeneficiarioModal = (props: Props) => {
    const { isOpen, onClose, onSubmit, documentos, beneficiarioEditar } = props;

    const {
        form,
        error,
        handleChange,
        validateForm,
        getDocumentRequirement,
        getPlaceholder
    } = useBeneficiarioForm({ beneficiarioEditar, documentos, isOpen });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit(form);
        onClose();
    };

    const title = beneficiarioEditar ? 'Editar Beneficiario' : 'Nuevo Beneficiario';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <BeneficiarioFormFields
                    form={form}
                    documentos={documentos}
                    error={error}
                    onChange={handleChange}
                    getDocumentRequirement={getDocumentRequirement}
                    getPlaceholder={getPlaceholder}
                />

                <div className="pt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                    >
                        <FloppyDiskIcon size={20} /> Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
};