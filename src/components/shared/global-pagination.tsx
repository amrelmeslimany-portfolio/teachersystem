"use client";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
    currentPage: number;
    totalPages: number;
    isPrevious: boolean;
    isNext: boolean;
};

export function GlobalPagination({ currentPage, totalPages, isNext, isPrevious }: Props) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const sliceStart = currentPage > 1 ? currentPage - 2 : currentPage - 1;
    const sliceEnd = currentPage < totalPages - 2 ? currentPage + 2 : undefined;
    const slicedPages = totalPages > 3 ? pages.slice(sliceStart, sliceEnd) : pages;
    const isNextEllipse = currentPage <= totalPages - 1 && slicedPages.at(-1)! < totalPages;
    const isPrevEllipse = currentPage > 2;

    const onChangePage = useCallback(
        (page: number) => {
            const urlparams = new URLSearchParams(searchParams);
            if (searchParams.get("page")) urlparams.delete("page");
            urlparams.set("page", page.toString());
            replace(`${pathname}?${urlparams.toString()}`);
        },
        [replace, searchParams]
    );

    const ellipse = (
        <PaginationItem>
            <PaginationEllipsis />
        </PaginationItem>
    );

    return (
        <Pagination className="mt-5">
            <PaginationContent>
                {isPrevious && (
                    <PaginationItem>
                        <Button
                            onClick={() => onChangePage(currentPage - 1)}
                            variant="ghost"
                            size="icon"
                            children={<ChevronRight />}
                        />
                    </PaginationItem>
                )}
                {isPrevEllipse && ellipse}
                {slicedPages.map((page) => (
                    <PaginationItem key={page}>
                        <Button
                            variant={page == currentPage ? "default" : "ghost"}
                            disabled={page == currentPage}
                            onClick={() => onChangePage(page)}
                            className="disabled:opacity-100"
                            children={page}
                        />
                    </PaginationItem>
                ))}

                {isNextEllipse && ellipse}
                {isNext && (
                    <PaginationItem>
                        <Button
                            onClick={() => onChangePage(currentPage + 1)}
                            variant="ghost"
                            size="icon"
                            children={<ChevronLeft />}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
