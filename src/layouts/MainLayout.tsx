import Sidebar from "../components/sidebar/Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <div className="flex flex-col md:flex-row min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(139,0,0,0.18),_transparent_40%),linear-gradient(180deg,_#050505_0%,_#0a0204_50%,_#050505_100%)]">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;