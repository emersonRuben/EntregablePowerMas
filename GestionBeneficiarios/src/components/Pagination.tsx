import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100 bg-slate-50">
            <div className="text-sm text-slate-500">
                Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{totalPages}</span>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-slate-600"
                >
                    <CaretLeftIcon size={16} />
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-slate-600"
                >
                    <CaretRightIcon size={16} />
                </button>
            </div>
        </div>
    );
};
