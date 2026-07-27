'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { LoadingSpinner } from '@/components/ui/Loading';

interface UploadInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const UploadInventoryModal: React.FC<UploadInventoryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Por favor, sube un archivo CSV o Excel');
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inventario/cargar`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al cargar el archivo');
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
        setFile(null);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setFile(null);
      setError(null);
      setSuccess(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Cargar Inventario"
      size="md"
    >
      <div className="space-y-4">
        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-green-600 font-semibold">Archivo cargado exitosamente</p>
          </div>
        ) : (
          <>
            {error && (
              <Alert
                type="critical"
                message={error}
                dismissible
                onDismiss={() => setError(null)}
              />
            )}

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <label className="cursor-pointer">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {file ? (
                    <>
                      <p className="font-semibold text-blue-600">{file.name}</p>
                      <p className="text-xs mt-1">Haz clic para cambiar</p>
                    </>
                  ) : (
                    <>
                      <span className="text-blue-600 font-semibold">
                        Haz clic para cargar
                      </span>
                      <p className="text-xs mt-1">o arrastra y suelta</p>
                      <p className="text-xs text-gray-500 mt-2">
                        CSV o Excel (máx 10MB)
                      </p>
                    </>
                  )}
                </span>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="hidden"
                />
              </label>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Columnas requeridas:</strong>
              </p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1 ml-4">
                <li>• SKU</li>
                <li>• costo_unitario</li>
                <li>• stock_actual</li>
                <li>• tiempo_entrega</li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          fullWidth
          onClick={handleClose}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          fullWidth
          onClick={handleUpload}
          loading={loading}
          disabled={!file || loading}
        >
          {loading ? 'Cargando...' : 'Cargar Archivo'}
        </Button>
      </div>
    </Modal>
  );
};

export default UploadInventoryModal;
