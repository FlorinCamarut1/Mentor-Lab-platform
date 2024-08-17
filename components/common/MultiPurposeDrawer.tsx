import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dispatch, SetStateAction } from "react";

interface MultiPurposeDrawerProps {
  isPending?: boolean;
  triggerName?: string;
  onDrawerOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  children?: React.ReactNode;
  submitFn?: () => void;
  drawerTitle: string;
  submitBtnName?: string;
  cancelBtnName?: string;
}

const MultiPurposeDrawer = ({
  isPending,
  triggerName,
  onDrawerOpen,
  open,
  children,
  submitFn,
  drawerTitle,
  submitBtnName,
  cancelBtnName,
}: MultiPurposeDrawerProps) => {
  const onClick = () => {
    if (submitFn) {
      submitFn();
    } else return null;
  };
  return (
    <Drawer open={open} onOpenChange={onDrawerOpen}>
      {!triggerName ? null : (
        <DrawerTrigger className="flex rounded-sm bg-slate-100 p-2 font-semibold hover:bg-slate-200">
          {triggerName}
        </DrawerTrigger>
      )}
      <DrawerContent className="m-auto md:max-w-[800px]">
        {isPending ? (
          <Loading />
        ) : (
          <>
            <DrawerHeader>
              <DrawerTitle>{drawerTitle}</DrawerTitle>
              <DrawerDescription></DrawerDescription>
              {children}
            </DrawerHeader>
            <DrawerFooter>
              {!submitBtnName ? null : (
                <Button disabled={isPending} onClick={onClick}>
                  {submitBtnName}
                </Button>
              )}
              <DrawerClose asChild>
                <Button disabled={isPending} variant="outline">
                  {cancelBtnName}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MultiPurposeDrawer;
