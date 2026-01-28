import api from '../api/axiosConfig';
import type { Beneficiario, BeneficiarioInput, DocumentoIdentidad } from '../interfaces/index';

export const beneficiariosService = {

    getDocumentos: async (): Promise<DocumentoIdentidad[]> => {
        try {
            const response = await api.get<DocumentoIdentidad[]>('/documento-identidad');
            return response.data;
        } catch (error) {
            console.error('Error al obtener documentos de identidad:', error);
            throw new Error('No se pudieron cargar los tipos de documento');
        }
    },

    getAll: async (): Promise<Beneficiario[]> => {
        try {
            const response = await api.get<Beneficiario[]>('/beneficiario');
            return response.data;
        } catch (error) {
            console.error('Error al obtener beneficiarios:', error);
            throw new Error('No se pudieron cargar los beneficiarios');
        }
    },

    create: async (data: BeneficiarioInput): Promise<Beneficiario> => {
        try {
            if (!data.nombres || !data.apellidos) {
                throw new Error('Nombres y apellidos son requeridos');
            }
            const response = await api.post<Beneficiario>('/beneficiario', data);
            return response.data;
        } catch (error) {
            console.error('Error al crear beneficiario:', error);
            throw error;
        }
    },

    update: async (id: number, data: BeneficiarioInput): Promise<Beneficiario> => {
        try {
            if (!id || id <= 0) {
                throw new Error('ID de beneficiario inválido');
            }
            const response = await api.put<Beneficiario>(`/beneficiario/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar beneficiario:', error);
            throw error;
        }
    },

    delete: async (id: number): Promise<void> => {
        try {
            if (!id || id <= 0) {
                throw new Error('ID de beneficiario inválido');
            }
            await api.delete(`/beneficiario/${id}`);
        } catch (error) {
            console.error('Error al eliminar beneficiario:', error);
            throw error;
        }
    }
};