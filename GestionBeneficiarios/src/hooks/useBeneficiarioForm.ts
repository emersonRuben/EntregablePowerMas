import { useState, useEffect } from 'react';
import type { BeneficiarioInput, DocumentoIdentidad } from '../interfaces';

const initialState: BeneficiarioInput = {
    nombres: '',
    apellidos: '',
    documentoIdentidadId: 0,
    numeroDocumento: '',
    fechaNacimiento: '',
    sexo: 'M'
};

interface UseBeneficiarioFormProps {
    beneficiarioEditar?: BeneficiarioInput | null;
    documentos: DocumentoIdentidad[];
    isOpen: boolean;
}

export const useBeneficiarioForm = ({ beneficiarioEditar, documentos, isOpen }: UseBeneficiarioFormProps) => {
    const [form, setForm] = useState<BeneficiarioInput>(initialState);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (beneficiarioEditar) {
            let fechaFormat = beneficiarioEditar.fechaNacimiento;
            if (fechaFormat && fechaFormat.includes('T')) {
                fechaFormat = fechaFormat.split('T')[0];
            }
            setForm({ ...beneficiarioEditar, fechaNacimiento: fechaFormat });
        } else {
            setForm(initialState);
        }
        setError('');
    }, [beneficiarioEditar, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'documentoIdentidadId') {
            setForm({ ...form, [name]: Number(value), numeroDocumento: '' });
            setError('');
            return;
        }

        if (name === 'numeroDocumento') {
            const docSeleccionado = documentos.find(d => d.id === form.documentoIdentidadId);

            if (docSeleccionado) {
                if (docSeleccionado.soloNumeros && !/^\d*$/.test(value)) {
                    return;
                }
                if (value.length > docSeleccionado.longitud) {
                    return;
                }
            }
        }

        setForm({ ...form, [name]: value });
    };

    const validateForm = (): boolean => {
        const docSeleccionado = documentos.find(d => d.id === form.documentoIdentidadId);
        if (docSeleccionado) {
            if (form.numeroDocumento.length !== docSeleccionado.longitud) {
                setError(`El ${docSeleccionado.nombre} debe tener exactamente ${docSeleccionado.longitud} caracteres.`);
                return false;
            }
        }
        return true;
    };

    const getDocumentRequirement = () => {
        const doc = documentos.find(d => d.id === form.documentoIdentidadId);
        if (!doc) {
            return null;
        }

        let tipoText = '';
        if (doc.soloNumeros) {
            tipoText = ', solo números';
        } else {
            tipoText = ', alfanumérico';
        }

        return `Requisito: ${doc.longitud} caracteres${tipoText}.`;
    };

    const getPlaceholder = () => {
        if (form.documentoIdentidadId === 0) {
            return "Seleccione un tipo primero";
        } else {
            return "Número de Documento";
        }
    };

    return {
        form,
        error,
        handleChange,
        validateForm,
        getDocumentRequirement,
        getPlaceholder
    };
};
