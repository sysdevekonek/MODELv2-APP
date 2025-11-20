"use client"

import { ColumnDef } from "@tanstack/react-table"
import Button from "@/components/ui/Buttons"
import React from "react"

// Row shape (pure data)
export type DeleteSAD = {
  id: number
  proNo: string
  hblAwbNo: string
  mawb: string
  consignee: string
  createdDate: string
  createdTime: string
  encoder: string
}

/**
 * columns factory — pass an openDeleteModal callback from the page
 */
export const getColumns = (
  openDeleteModal: (item: DeleteSAD) => void
): ColumnDef<DeleteSAD>[] => [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ getValue }) => <div>{getValue<number>()}</div>,
  },
  {
    accessorKey: "proNo",
    header: "PRO No.",
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "hblAwbNo",
    header: "HBL/AWB No.",
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "mawb",
    header: "MAWB",
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "consignee",
    header: "Consignee",
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "createdTime",
    header: "Created Time",
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "encoder",
    header: "Encoder",
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex gap-2 pl-2">
          <Button
            variant="primary"
            onClick={() => console.log("View", item)}
          >
            View
          </Button>

          <Button
            variant="delete"
            onClick={() => openDeleteModal(item)}
          >
            Delete
          </Button>
        </div>
      )
    },
  },
]
