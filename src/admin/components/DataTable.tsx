import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchFilterKey?: keyof T;
  actions?: (row: T) => React.ReactNode;
  itemsPerPage?: number;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchPlaceholder = 'Search records...',
  searchFilterKey,
  actions,
  itemsPerPage = 6,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Data based on Search Term
  const filteredData = data.filter((row) => {
    if (!searchTerm) return true;
    if (searchFilterKey && row[searchFilterKey]) {
      return String(row[searchFilterKey]).toLowerCase().includes(searchTerm.toLowerCase());
    }
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8E6] shadow-sm overflow-hidden">
      {/* Table Header Filter Toolbar */}
      <div className="p-4 border-b border-[#E2E8E6] flex flex-wrap items-center justify-between gap-4 bg-[#FDFBF7]">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2E8E6] rounded-xl text-xs focus:outline-none focus:border-[#C89B7B]"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing {filteredData.length > 0 ? startIndex + 1 : 0} -{' '}
          {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#121816]">
          <thead className="bg-[#F4F6F5] text-gray-600 font-bold uppercase tracking-wider text-[11px] border-b border-[#E2E8E6]">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="py-3.5 px-4 font-semibold">
                  {col.header}
                </th>
              ))}
              {actions && <th className="py-3.5 px-4 font-semibold text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8E6]">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-[#FDFBF7] transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="py-4 px-4 align-middle">
                      {col.cell ? col.cell(row) : col.accessorKey ? String(row[col.accessorKey] ?? '') : ''}
                    </td>
                  ))}
                  {actions && <td className="py-4 px-4 align-middle text-right">{actions(row)}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="py-8 text-center text-gray-400 font-medium"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Pagination */}
      <div className="p-4 border-t border-[#E2E8E6] flex items-center justify-between bg-white text-xs">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8E6] disabled:opacity-40 hover:bg-[#F4F6F5] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <span className="font-semibold text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8E6] disabled:opacity-40 hover:bg-[#F4F6F5] transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
