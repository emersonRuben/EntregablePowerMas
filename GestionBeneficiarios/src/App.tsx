import { useEffect, useState } from 'react';
import { UserPlusIcon, UsersThreeIcon } from '@phosphor-icons/react';
import { beneficiariosService } from './services/beneficiariosService';
import type { Beneficiario, BeneficiarioInput, DocumentoIdentidad } from './interfaces';
import { BeneficiarioTable } from './components/BeneficiarioTable';
import { BeneficiarioModal } from './components/BeneficiarioModal';
import { ConfirmationModal } from './components/ConfirmationModal';

function App() {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [documentos, setDocumentos] = useState<DocumentoIdentidad[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBen, setEditingBen] = useState<BeneficiarioInput | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [beneficiarioToDelete, setBeneficiarioToDelete] = useState<number | null>(null);

  const loadData = async () => {
    try {
      const [docsData, benData] = await Promise.all([
        beneficiariosService.getDocumentos(),
        beneficiariosService.getAll()
      ]);
      setDocumentos(docsData);
      setBeneficiarios(benData);
    } catch (error) {
      console.error("Error cargando datos:", error);
      alert("Error de conexión con el Backend");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data: BeneficiarioInput) => {
    try {
      if (editingBen && editingBen.id) {
        await beneficiariosService.update(editingBen.id, data);
      } else {
        await beneficiariosService.create(data);
      }
      await loadData();
      setIsModalOpen(false);
      setEditingBen(null);
    } catch (error) {
      console.error(error);
      alert("Error al guardar. Verifica que el servidor esté corriendo.");
    }
  };

  const confirmDelete = (id: number) => {
    setBeneficiarioToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (beneficiarioToDelete) {
      try {
        await beneficiariosService.delete(beneficiarioToDelete);
        await loadData();
        setIsDeleteModalOpen(false);
        setBeneficiarioToDelete(null);
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  const openNewModal = () => {
    setEditingBen(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Beneficiario) => {
    const inputData: BeneficiarioInput = {
      id: item.id,
      nombres: item.nombres,
      apellidos: item.apellidos,
      documentoIdentidadId: item.documentoIdentidadId,
      numeroDocumento: item.numeroDocumento,
      fechaNacimiento: item.fechaNacimiento,
      sexo: item.sexo
    };
    setEditingBen(inputData);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
              <UsersThreeIcon size={32} weight="duotone" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Gestión de Beneficiarios</h1>
              <p className="text-slate-500 text-sm">Sistema Integrado v1.0</p>
            </div>
          </div>

          <button
            onClick={openNewModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition flex items-center gap-2"
          >
            <UserPlusIcon size={20} weight="bold" />
            Nuevo Beneficiario
          </button>
        </div>

        <BeneficiarioTable
          data={beneficiarios}
          onEdit={openEditModal}
          onDelete={confirmDelete}
        />

        <BeneficiarioModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
          documentos={documentos}
          beneficiarioEditar={editingBen}
        />

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />

      </div>
    </div>
  );
}

export default App;