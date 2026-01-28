import type { BeneficiarioInput, DocumentoIdentidad } from '../interfaces';

interface Props {
    form: BeneficiarioInput;
    documentos: DocumentoIdentidad[];
    error: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    getDocumentRequirement: () => string | null;
    getPlaceholder: () => string;
}

export const BeneficiarioFormFields = (props: Props) => {
    const { form, documentos, error, onChange, getDocumentRequirement, getPlaceholder } = props;

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="nombres"
                    placeholder="Nombres"
                    required
                    value={form.nombres}
                    onChange={onChange}
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />

                <input
                    type="text"
                    name="apellidos"
                    placeholder="Apellidos"
                    required
                    value={form.apellidos}
                    onChange={onChange}
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
            </div>

            <div>
                <select
                    name="documentoIdentidadId"
                    required
                    value={form.documentoIdentidadId}
                    onChange={onChange}
                    className="w-full border p-2 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                    <option value={0}>-- Seleccione Tipo Documento --</option>
                    {documentos.map(doc => (
                        <option key={doc.id} value={doc.id}>
                            {doc.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <input
                    type="text"
                    name="numeroDocumento"
                    required
                    placeholder={getPlaceholder()}
                    disabled={form.documentoIdentidadId === 0}
                    value={form.numeroDocumento}
                    onChange={onChange}
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-slate-100"
                />

                {(() => {
                    const requirement = getDocumentRequirement();
                    if (requirement) {
                        return <p className="text-xs text-slate-500 mt-1">{requirement}</p>;
                    }
                })()}

                {(() => {
                    if (error) {
                        return <p className="text-xs text-red-500 font-bold mt-1">{error}</p>;
                    }
                })()}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="date"
                    name="fechaNacimiento"
                    required
                    value={form.fechaNacimiento}
                    onChange={onChange}
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />

                <select
                    name="sexo"
                    value={form.sexo}
                    onChange={onChange}
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>
        </>
    );
};
