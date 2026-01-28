import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import type { Beneficiario } from '../interfaces';

interface Props {
    beneficiario: Beneficiario;
    onEdit: () => void;
    onDelete: () => void;
}

export const TableActionButtons = (props: Props) => {
    const { beneficiario, onEdit, onDelete } = props;

    return (
        <div className="flex justify-center gap-2">
            <button
                onClick={onEdit}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                title="Editar"
            >
                <PencilSimpleIcon size={20} weight="duotone" />
            </button>
            <button
                onClick={() => {
                    if (beneficiario.id) {
                        onDelete();
                    }
                }}
                disabled={!beneficiario.id}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Eliminar"
            >
                <TrashIcon size={20} weight="duotone" />
            </button>
        </div>
    );
};
