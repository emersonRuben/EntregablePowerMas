export interface DocumentoIdentidad {
    id: number;
    nombre: string;
    abreviatura: string;
    longitud: number;
    soloNumeros: boolean;
}

export type Sexo = 'M' | 'F';

export interface BeneficiarioInput {
    id?: number;
    nombres: string;
    apellidos: string;
    documentoIdentidadId: number;
    numeroDocumento: string;
    fechaNacimiento: string;
    sexo: Sexo;
}

export interface Beneficiario extends BeneficiarioInput {
    id: number;
    tipoDocumento: string;
}