# Manual de Ejecución - Evaluación Técnica Full Stack

Este documento proporciona la guía oficial para el despliegue y ejecución de la solución "Gestión de Beneficiarios". El sistema integra una arquitectura moderna basada en .NET 10 y React 19.

## 1. Arquitectura y Tecnologías

La solución está construida sobre tres pilares principales:

| Componente | Tecnología Principal | Detalles Técnicos |
| :--- | :--- | :--- |
| **Backend** | **.NET 10** | ASP.NET Core Web API, Entity Framework Core, Swagger. |
| **Frontend** | **React 19** | TypeScript, Vite, Tailwind CSS, Phosphor Icons, Axios. |
| **Base de Datos** | **SQL Server** | Relational Database, T-SQL. |

## 2. Prerrequisitos del Sistema

Asegúrese de contar con el siguiente entorno configurado antes de proceder:

*   **.NET 10 SDK**: SDK necesario para compilar y ejecutar la API (`net10.0`).
*   **Node.js (LTS v20+)**: Entorno de ejecución para las herramientas de frontend.
*   **SQL Server**: Instancia local o remota (Express, Developer o Enterprise).
*   **Git**: Para clonado y gestión de versiones.

## 3. Configuración de Base de Datos

1.  Localice el script de inicialización en la raíz del repositorio:
    `Database/scriptSQL.sql`
2.  Ejecute el script completo en su instancia de SQL Server para generar la base de datos `GestionBeneficiariosDB` y sus tablas.
3.  Tome nota del nombre de su servidor (ej. `localhost`, `.\SQLEXPRESS`).

## 4. Configuración del Backend (.NET)

### 4.1. Cadena de Conexión
1.  Navegue al directorio de la API: `ApiGestionBeneficiarios/ApiGestionBeneficiarios`.
2.  Edite el archivo `appsettings.Development.json`.
3.  Actualice la propiedad `DefaultConnection` con su servidor:
    ```json
    "ConnectionStrings": {
        "DefaultConnection": "Server=SU_SERVIDOR;Database=GestionBeneficiariosDB;Integrated Security=True;TrustServerCertificate=True"
    }
    ```

### 4.2. Ejecución
Ejecute los siguientes comandos desde la terminal en el directorio de la API:

```bash
# Restaurar dependencias y ejecutar
dotnet run
```

La API iniciará en los siguientes puertos:
*   **HTTPS**: `https://localhost:7110` (Swagger disponible en `/swagger`)
*   **HTTP**: `http://localhost:5275`

## 5. Configuración del Frontend (React)

### 5.1. Variables de Entorno
El frontend está preconfigurado para conectarse al backend en el puerto 7110. Si requiere modificar esto:
1.  Cree un archivo `.env` en el directorio `GestionBeneficiarios`.
2.  Defina la variable `API_BASE_URL` (Nota: El proyecto usa el prefijo `API_` configurado en Vite, no `VITE_`).

    ```env
    API_BASE_URL=https://localhost:7110/api
    ```

### 5.2. Instalación y Despliegue
Desde una nueva terminal en el directorio `GestionBeneficiarios`:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Acceda a la aplicación web en: `http://localhost:5173`.

## 6. Estructura de la Solución

```text
EntregablePowerMas/
├── ApiGestionBeneficiarios/    # Solución .NET
│   └── ApiGestionBeneficiarios/
│       ├── Controllers/        # Controladores de API
│       ├── Entidades/          # Modelos de Dominio
│       ├── Datos/             # Contexto de BD (EF Core)
│       └── Program.cs          # Configuración de servicios y pipeline
├── GestionBeneficiarios/       # Aplicación React (Vite)
│   ├── src/
│   │   ├── api/                # Configuración de Axios
│   │   ├── components/         # Componentes UI reutilizables
│   │   ├── hooks/              # Custom Hooks
│   │   └── services/           # Lógica de consumo de API
├── Database/                   # Scripts SQL
└── README.md                   # Este manual
```
