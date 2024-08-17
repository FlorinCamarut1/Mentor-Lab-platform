import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";

interface AlertDeleteDialogProps {
  dialogOpen?: boolean;
  onDialogOpen: Dispatch<SetStateAction<boolean>>;
  deleteFn: () => void;
}
const AlertDeleteDialog = ({
  dialogOpen,
  onDialogOpen,
  deleteFn,
}: AlertDeleteDialogProps) => {
  return (
    <AlertDialog open={dialogOpen} onOpenChange={onDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ești sigur că vrei să ștergi ?</AlertDialogTitle>
          <AlertDialogDescription>
            Această actiune este ireversibilă.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anulează</AlertDialogCancel>
          <AlertDialogAction onClick={deleteFn}>Șterge</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteDialog;
