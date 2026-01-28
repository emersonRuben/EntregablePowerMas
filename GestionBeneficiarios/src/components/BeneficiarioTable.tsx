import { useState } from 'react';
import type { Beneficiario } from '../interfaces';
import { BeneficiarioTableRow } from './BeneficiarioTableRow';
import { Pagination } from './Pagination';

interface Props {
    data: Beneficiario[];
    onEdit: (beneficiario: Beneficiario) => void;
    onDelete: (id: number) => void;
}

const ITEMS_PER_PAGE = 5;

export const BeneficiarioTable = (props: Props) => {
    const { data, onEdit, onDelete } = props;
    const [currentPage, setCurrentPage] = useState(1);

    // Reset pagination when data changes
    if (currentPage > Math.ceil(data.length / ITEMS_PER_PAGE) && currentPage > 1) {
        setCurrentPage(1);
    }

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-semibold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Beneficiario</th>
                            <th className="px-6 py-4">Documento</th>
                            <th className="px-6 py-4">Nacimiento</th>
                            <th className="px-6 py-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {(() => {
                            if (currentData.length === 0) {
                                return (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                            No hay beneficiarios registrados.
                                        </td>
                                    </tr>
                                );
                            } else {
                                return currentData.map((beneficiario) => (
                                    <BeneficiarioTableRow
                                        key={beneficiario.id}
                                        beneficiario={beneficiario}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ));
                            }
                        })()}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};
