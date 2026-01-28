CREATE DATABASE GestionBeneficiariosDB;
GO

USE GestionBeneficiariosDB;
GO

-- 1. Tablas 
CREATE TABLE DocumentoIdentidad (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Abreviatura VARCHAR(10) NOT NULL,
    Pais VARCHAR(50) NOT NULL,
    Longitud INT NOT NULL,    
    SoloNumeros BIT NOT NULL, 
    Activo BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE Beneficiario (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    DocumentoIdentidadId INT NOT NULL,
    NumeroDocumento VARCHAR(20) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Sexo CHAR(1) NOT NULL, 
    CONSTRAINT FK_Beneficiario_Documento FOREIGN KEY (DocumentoIdentidadId) 
    REFERENCES DocumentoIdentidad(Id)
);
GO

-- 2. Datos de prueba

-- 2.1 Documentos 
INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
VALUES 
('Documento Nacional de Identidad', 'DNI', 'Perú', 8, 1, 1),   
('Pasaporte', 'PAS', 'Internacional', 9, 0, 1),                
('Carnet de Extranjería', 'CE', 'Perú', 9, 1, 1);               
GO

-- 2.2 Beneficiarios 
INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
VALUES 
('Juan Carlos', 'Pérez López', 1, '45879632', '1990-05-15', 'M'),        
('María Fernanda', 'Gómez Ruiz', 2, 'A12345678', '1995-10-20', 'F'),     
('Carlos', 'Sánchez Torres', 1, '78965412', '1988-03-12', 'M');          
GO

-- 3. Procedimientos almacenados

-- Para Dropdown
CREATE PROCEDURE sp_ListarDocumentosIdentidad
AS
BEGIN
    SELECT Id, Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo
    FROM DocumentoIdentidad
    WHERE Activo = 1;
END
GO

-- Listar (Read)
CREATE PROCEDURE sp_ListarBeneficiarios
AS
BEGIN
    SELECT 
        b.Id,
        b.Nombres,
        b.Apellidos,
        b.DocumentoIdentidadId,
        d.Nombre AS TipoDocumento,
        b.NumeroDocumento,
        b.FechaNacimiento,
        b.Sexo
    FROM Beneficiario b
    INNER JOIN DocumentoIdentidad d ON b.DocumentoIdentidadId = d.Id;
END
GO

-- Crear (Create)
CREATE PROCEDURE sp_CrearBeneficiario
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
AS
BEGIN
    INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
    VALUES (@Nombres, @Apellidos, @DocumentoIdentidadId, @NumeroDocumento, @FechaNacimiento, @Sexo);
END
GO

-- Editar (Update)
CREATE PROCEDURE sp_EditarBeneficiario
    @Id INT,
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
AS
BEGIN
    UPDATE Beneficiario
    SET Nombres = @Nombres,
        Apellidos = @Apellidos,
        DocumentoIdentidadId = @DocumentoIdentidadId,
        NumeroDocumento = @NumeroDocumento,
        FechaNacimiento = @FechaNacimiento,
        Sexo = @Sexo
    WHERE Id = @Id;
END
GO

-- Eliminar (Delete)
CREATE PROCEDURE sp_EliminarBeneficiario
    @Id INT
AS
BEGIN
    DELETE FROM Beneficiario WHERE Id = @Id;
END
GO