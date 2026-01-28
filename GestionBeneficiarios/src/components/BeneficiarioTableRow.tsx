import { IdentificationCardIcon } from '@phosphor-icons/react';
import type { Beneficiario } from '../interfaces';
import { TableActionButtons } from './TableActionButtons';

interface Props {
    beneficiario: Beneficiario;
    onEdit: (beneficiario: Beneficiario) => void;
    onDelete: (id: number) => void;
}

export const BeneficiarioTableRow = (props: Props) => {
    const { beneficiario, onEdit, onDelete } = props;

    const sexoDisplay = beneficiario.sexo === 'M' ? 'Masculino' : 'Femenino';

    return (
        <tr className="hover:bg-slate-50 transition">
            <td className="px-6 py-4">
                <div className="font-medium text-slate-900">
                    {beneficiario.nombres} {beneficiario.apellidos}
                </div>
                <div className="text-xs text-slate-400">{sexoDisplay}</div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <IdentificationCardIcon size={18} className="text-emerald-500" />
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold">
                        {beneficiario.tipoDocumento}
                    </span>
                </div>
                <div className="mt-1 font-mono text-xs">{beneficiario.numeroDocumento}</div>
            </td>
            <td className="px-6 py-4">
                {new Date(beneficiario.fechaNacimiento).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
                <TableActionButtons
                    beneficiario={beneficiario}
                    onEdit={() => onEdit(beneficiario)}
                    onDelete={() => {
                        if (beneficiario.id) {
                            onDelete(beneficiario.id);
                        }
                    }}
                />
            </td>
        </tr>
    );
};
