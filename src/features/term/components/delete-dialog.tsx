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
import React from "react";
import Lottie from "lottie-react";
import LTLoadingIMG from "@/public/imgs/lottie/loader.json";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
    description: string;
    isLoading: boolean;
};

function DeleteTermDialog({ isOpen, onClose, title, description, onDelete, isLoading }: Props) {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent dir="rtl">
                {isLoading && <Lottie animationData={LTLoadingIMG} className="mx-auto" />}
                {!isLoading && (
                    <>
                        <AlertDialogHeader>
                            <AlertDialogTitle>هل انت متأكد من حذف {title} ؟</AlertDialogTitle>
                            <AlertDialogDescription>{description}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={onClose} className="me-2">
                                غلق
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete}>حذف</AlertDialogAction>
                        </AlertDialogFooter>
                    </>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default React.memo(DeleteTermDialog);
