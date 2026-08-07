import Sidebar from "../components/sidebar/Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;