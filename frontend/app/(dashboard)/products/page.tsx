'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button, Badge, Input, Pagination } from '@/components/ui';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface Product {
  sku: string;
  costo_unitario: number;
  stock_actual: number;
  tiempo_entrega: number;
  cantidad_optima_pedido?: number;
  stock_seguridad?: number;
  punto_reorden?: number;
  alerta_reabastecer?: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          sku: 'SKU001',
          costo_unitario: 50.0,
          stock_actual: 45,
          tiempo_entrega: 5,
          cantidad_optima_pedido: 250,
          stock_seguridad: 30,
          punto_reorden: 75,
          alerta_reabastecer: false,
        },
        {
          sku: 'SKU002',
          costo_unitario: 25.5,
          stock_actual: 12,
          tiempo_entrega: 7,
          cantidad_optima_pedido: 180,
          stock_seguridad: 45,
          punto_reorden: 120,
          alerta_reabastecer: true,
        },
        {
          sku: 'SKU003',
          costo_unitario: 100.0,
          stock_actual: 5,
          tiempo_entrega: 10,
          cantidad_optima_pedido: 120,
          stock_seguridad: 60,
          punto_reorden: 150,
          alerta_reabastecer: true,
        },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Productos</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gestión y monitoreo de tu catálogo de inventario
          </p>
        </div>
        <Button variant="primary" size="lg">
          + Nuevo Producto
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardBody>
          <Input
            placeholder="Buscar por SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
        </CardBody>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader title={`Productos (${filteredProducts.length})`} />
        <CardBody>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-r-transparent rounded-full" />
              </div>
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No hay productos disponibles</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      SKU
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Costo Unitario
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Stock Actual
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Punto Reorden
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Q Óptima
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Estado
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                        {product.sku}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {formatCurrency(product.costo_unitario)}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {formatNumber(product.stock_actual)}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {formatNumber(product.punto_reorden || 0)}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {formatNumber(product.cantidad_optima_pedido || 0)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            product.alerta_reabastecer ? 'critical' : 'success'
                          }
                          size="sm"
                        >
                          {product.alerta_reabastecer
                            ? 'Reabastecer'
                            : 'Normal'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
