"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import Button from "@/components/ui/Buttons"

interface DeleteModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  itemName?: string
}

export function DeleteModal({
  open,
  onClose,
  onConfirm,
  itemName = "this record",
}: DeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-bgContainer">
        <DialogHeader>
          <DialogTitle className="text-deleteButton font-bold">Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <b>{itemName}</b>?  
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="delete"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
