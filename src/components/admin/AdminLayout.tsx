import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Images, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const menuItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <CalendarDays className="h-5 w-5" />, label: 'Events', path: '/admin/dashboard?tab=events' },
    { icon: <Images className="h-5 w-5" />, label: 'Photos', path: '/admin/dashboard?tab=photos' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Mobile header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <div className="w-8" /> {/* Spacer to center title */}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          ${isSidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'} 
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 
          w-64 bg-white border-r border-gray-200 
          transition-transform duration-300 ease-in-out z-20
        `}>
          <div className="h-full flex flex-col">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className="flex items-center px-3 py-3 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-3 text-gray-600 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </aside>
        
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-10 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="hidden lg:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}; 