"use client";
import React from "react";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import DeleteDialog from "@/features/term/components/delete-dialog";
import Link from "next/link";

type Props = {
    id: string;
    isLoading: boolean;
    onDelete: () => void;
    updateHref: string;
    title: string;
    deleteDescription: string;
};

const UpdateDeleteActions = ({ id, isLoading, onDelete, updateHref, deleteDescription, title }: Props) => {
    const [isConfirmDelete, setIsConfirmDelete] = React.useState(false);

    const onButtonClick = () => setIsConfirmDelete(true);

    return (
        <div className="flex-shrink-0">
            <Button onClick={onButtonClick} variant="outline" size="icon" className="w-8 h-8 bg-transparent">
                <Trash2 className="w-4 h-4" />
            </Button>
            <DeleteDialog
                isOpen={isConfirmDelete}
                onClose={() => setIsConfirmDelete(false)}
                title={title}
                description={deleteDescription}
                isLoading={isLoading}
                onDelete={onDelete}
            />
            <Button variant="outline" size="icon" className="w-8 h-8 bg-transparent ms-2" asChild>
                <Link href={updateHref}>
                    <Edit className="w-4 h-4" />
                </Link>
            </Button>
        </div>
    );
};

export default UpdateDeleteActions;
