"use client"
import { useState } from "react"
import Button from "../ui/Buttons"
import { DataTable } from "../ui/datatable/datatable"
import { getColumns, DeleteSAD } from "@/components/utils/reportsColumn/deletesadColumn"
import { DeleteModal } from "@/components/utils/deleteModal"

type DeleteSADItem = {
    id: number;
    proNo: string;
    hblAwbNo: string;
    mawb: string;
    consignee: string;
    createdDate: string;
    createdTime: string;
    encoder: string;
};

const dummyDeleteSAD: DeleteSADItem[] = [
    {
        id: 1,
        proNo: "PRO-001",
        hblAwbNo: "HBL-1001",
        mawb: "MAWB-5001",
        consignee: "ABC Trading",
        createdDate: "2025-01-01",
        createdTime: "10:30 AM",
        encoder: "Juan Dela Cruz",
    },
    {
        id: 2,
        proNo: "PRO-002",
        hblAwbNo: "AWB-2002",
        mawb: "MAWB-5002",
        consignee: "XYZ Logistics",
        createdDate: "2025-01-02",
        createdTime: "11:10 AM",
        encoder: "Maria Santos",
    },
    {
        id: 3,
        proNo: "PRO-003",
        hblAwbNo: "HBL-3003",
        mawb: "MAWB-5003",
        consignee: "Good Movers Inc.",
        createdDate: "2025-01-03",
        createdTime: "09:15 AM",
        encoder: "Pedro Ramos",
    },
     {
        id: 4,
        proNo: "PRO-003",
        hblAwbNo: "HBL-3003",
        mawb: "MAWB-5003",
        consignee: "Good Movers Inc.",
        createdDate: "2025-01-03",
        createdTime: "09:15 AM",
        encoder: "Pedro Ramos",
    },
     {
        id: 5,
        proNo: "PRO-003",
        hblAwbNo: "HBL-3003",
        mawb: "MAWB-5003",
        consignee: "Good Movers Inc.",
        createdDate: "2025-01-03",
        createdTime: "09:15 AM",
        encoder: "Pedro Ramos",
    },
     {
        id: 6,
        proNo: "PRO-003",
        hblAwbNo: "HBL-3003",
        mawb: "MAWB-5003",
        consignee: "Good Movers Inc.",
        createdDate: "2025-01-03",
        createdTime: "09:15 AM",
        encoder: "Pedro Ramos",
    },
     {
        id: 8,
        proNo: "PRO-003",
        hblAwbNo: "HBL-3003",
        mawb: "MAWB-5003",
        consignee: "Good Movers Inc.",
        createdDate: "2025-01-03",
        createdTime: "09:15 AM",
        encoder: "Pedro Ramos",
    },
     {
        id: 9,
        proNo: "PRO-003",
        hblAwbNo: "HBL-3003",
        mawb: "MAWB-5003",
        consignee: "Good Movers Inc.",
        createdDate: "2025-01-03",
        createdTime: "09:15 AM",
        encoder: "Pedro Ramos",
    },
];

const DeleteSADPage = () => {
    const [showTable, setShowTable] = useState(false);
    const handleShowTable = () => {
        setShowTable(!showTable);
    }
      const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DeleteSAD | null>(null)

  const openDeleteModal = (item: DeleteSAD) => {
    setSelectedItem(item)
    setDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    console.log("Deleting:", selectedItem)
    // TODO: call API to delete using selectedItem?.id
    // After success, update your data state to remove the deleted row.
    setDeleteModalOpen(false)
  }

  // create columns with the callback
  const columns = getColumns(openDeleteModal)
    return (
        <>
            <div className="border-b border-inputField2 mb-4">
                <div className="bg-main1 text-titlebodytext1 font-semibold w-full p-2">
                    <label className="">Search by</label>
                </div>
                <div className="py-2 px-2 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="">
                        <label className="text-sm">Search by</label>
                        <input
                            className="border border-inputField2 bg-inputField1 w-full p-2 rounded text-sm"
                            placeholder="Search By"></input>
                    </div>
                    <div>
                        <label className="text-sm">Search Value</label>
                        <input
                            className="border border-inputField2 bg-inputField1 w-full p-2 rounded text-sm"
                            placeholder="Search By"></input>
                    </div>
                    <div>
                        <label className="text-sm">Date From</label>
                        <input
                            className="border border-inputField2 bg-inputField1 w-full p-2 rounded text-sm"
                            type="date"></input>
                    </div>
                    <div>
                        <label className="text-sm">Date To</label>
                        <input
                            className="border border-inputField2 bg-inputField1 w-full p-2 rounded text-sm"
                            type="date"></input>
                    </div>
                </div>
                <div className="flex justify-end gap-4 p-2 flex-col sm:flex-row w-full mb-4">
                    <Button
                        variant="secondary"
                        className="w-full justify-center sm:w-auto"
                    > Reset Filter
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleShowTable}
                        className="w-full justify-center sm:w-auto"
                    > Apply Filter
                    </Button>
                </div>
            </div>

            {showTable && (
                <div className="overflow-x-auto p-2">
                    <DataTable
                        columns={columns}
                        data={dummyDeleteSAD}
                    />
                </div>
            )}
            <DeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemName={selectedItem?.proNo}
            />
        </>
    )
}

export default DeleteSADPage;
