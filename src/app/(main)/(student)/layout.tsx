import FloatingMenu from "@/components/layouts/floating-menu";

type Props = { children: React.ReactNode };

const StudentLayout = ({ children }: Props) => {
    return (
        <div className="pt-20 pb-24">
            {children}
            <FloatingMenu />
        </div>
    );
};

export default StudentLayout;
