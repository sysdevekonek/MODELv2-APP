"use client"

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/datatable/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/datatable/pagination"

import * as React from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 6 })

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    autoResetPageIndex: false,
  })

  React.useEffect(() => {
    const { pageIndex, pageSize } = table.getState().pagination
    const totalRows = data.length
    const totalPages = Math.ceil(totalRows / pageSize)
    const maxVisibleRows = (pageIndex + 1) * pageSize
  
    if (totalRows > maxVisibleRows && table.getCanNextPage()) {
      const timer = setTimeout(() => {
        table.setPageIndex(totalPages - 1)
      }, 50)
      return () => clearTimeout(timer)
    }
  
    if (pageIndex > 0 && totalRows <= pageIndex * pageSize) {
      table.setPageIndex(totalPages - 1)
    }
  }, [data.length, table])
  

  return (
    <div className="overflow-hidden rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-left px-4 py-2 "
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="odd:bg-tableOddRow even:bg-tableEvenRow hover:bg-tableHover transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-left px-4 py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination className="py-4">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                table.previousPage()
              }}
              className={table.getCanPreviousPage() ? "" : "pointer-events-none opacity-50"}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {table.getPageOptions().map((pageIndex) => (
            <PaginationItem key={pageIndex}>
              <PaginationLink
                href="#"
                isActive={table.getState().pagination.pageIndex === pageIndex}
                onClick={(e) => {
                  e.preventDefault()
                  table.setPageIndex(pageIndex)
                }}
              >
                {pageIndex + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                table.nextPage()
              }}
              className={table.getCanNextPage() ? "" : "pointer-events-none opacity-50"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}