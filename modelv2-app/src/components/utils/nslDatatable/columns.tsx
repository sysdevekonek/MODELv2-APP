"use client"
import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table"
import ComboBox  from "@/components/utils/comboBox"
import { useSADDropdown } from "@/components/utils/dropdownAPI"
import { usenslreport } from "@/hooks/reports/usenslreport";


// NSL Table
export type NSLdata = {
  id: string
  number: number
  label: string
  description: string
  button: string
}

type ColumnsProps = {
  updateRow: (id: string, updates: Partial<NSLdata>) => void
  removeRow: (id: string, updates: Partial<NSLdata>) => void
  rowError: { [key: string]: boolean }
}



export const columns = ({ updateRow, removeRow, rowError }: ColumnsProps): ColumnDef<NSLdata>[] => {
  return [
    {
      accessorKey: "number",
      header: () => <div className="w-[6rem] pl-16">NO.</div>,
      cell: ({ row }) => <span className="pl-[4.5rem]">{row.original.number}</span>,
    },
    {
      accessorKey: "label",
      header: () => <div className="w-[8rem] pl-[4.6rem]">LABEL</div>,
      cell: ({ row }) => <span className="pl-20">{row.original.label}</span>,
    },
    {
      accessorKey: "description",
      header: () => <div className="w-[7rem] pl-24">DESCRIPTION</div>,
      cell: ({ row, table }) => {
        const { SADDropdown, fetchSAD, fetchNextPageSAD } = useSADDropdown()

        const allSelectedCodes = (table.options.data as NSLdata[])
        .map(r => r.label)
        .filter(Boolean)
    
        return (
          <div className="flex flex-col pl-[5.4rem]">
            <ComboBox
              items={SADDropdown.map(item => ({
                ...item,
                disabled: allSelectedCodes.includes(item.COLUMN_CODE) &&
                item.COLUMN_CODE !== row.original.label, 
              }))}
              displayKey="PARAMETER_DESC"
              valueKey="COLUMN_CODE"
              showValueKeyInList={false}
              selectedValue={row.original.label || ""}
              setSelectedValue={(code) => {
                if (!code) {
                  updateRow(row.original.id, {
                    label: "",
                    description: "",
                  });
                  return;
                }
    
                // Prevent duplicates
                if (
                  allSelectedCodes.includes(code) &&
                  code !== row.original.label
                ) {
                  updateRow(row.original.id, {
                    label: "",
                    description: "",
                  });
                  toast.error("This description is already selected in another row.");
                  return;
                }
    
                const selectedObj = SADDropdown.find(
                  (item) => item.COLUMN_CODE === code
                )
                if (selectedObj) {
                  updateRow(row.original.id, {
                    label: selectedObj.COLUMN_CODE,
                    description: selectedObj.PARAMETER_DESC,
                  });
                }
              }}
              placeholder={row.original.description || "Select SAD Parameter"}
              onInputChange={(val) => fetchSAD(val)}
              onScrollEnd={fetchNextPageSAD}
              className={`text-xs bg-inputField1 h-10 px-4 w-full border border-inputField2 rounded-lg ${
                !row.original.description && rowError
                  ? "border-red-500"
                  : "border-inputField2"
              }`}
            />
            {rowError[row.original.id] && (
              <p className="text-sm text-red-500 mt-1">
                Please select a description.
              </p>
            )}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="min-w-[5rem] max-w-[200px]"></div>,
      cell: ({ row }) => {
        const rowData = row.original
        if (rowData.number === 1) return null

        return (
          <div className="flex justify-center items-center">
            <button
              onClick={() => removeRow(rowData.id, {})}
              className="bg-main1 text-white hover:bg-themebutton2 rounded px-2 py-1 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round"
                   className="lucide lucide-minus">
                <path d="M5 12h14"/>
              </svg>
            </button>
          </div>
        )
      },
    },
  ]
}