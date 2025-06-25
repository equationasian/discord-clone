import type { ReactNode } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";

type MemberLayoutProps = {
    children?: ReactNode;
};

export default function MemberLayout({ children }: MemberLayoutProps) {
    return (
        <div className="bg-gray-100 h-full">
            <div className="flex justify-between items-center font-semibold p-4 border-b-2 border-gray-200 text-[#23262A]">
                <span>Members</span>
                <IconButton aria-label="search" size="small">
                    <SearchIcon />
                </IconButton>
            </div>
            {children}
        </div>
    );
}