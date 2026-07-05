const { useState, useEffect } = React;

function Header({ activeUnit, setSidebarOpen }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Kiểm tra và áp dụng Dark Mode ngay khi load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    // Hàm chuyển đổi giao diện Sáng / Tối
    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <header className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setSidebarOpen(true)} 
                    className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white">
                        {activeUnit ? activeUnit.title : "Đang tải..."}
                    </h2>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                        {activeUnit ? activeUnit.vietnameseTitle : ""}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Nút Toggle Dark Mode */}
                <button 
                    onClick={toggleDarkMode}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm"
                    title={isDarkMode ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
                >
                    {isDarkMode ? (
                        <i className="fa-solid fa-sun text-lg animate-[spin_3s_linear_infinite]"></i>
                    ) : (
                        <i className="fa-solid fa-moon text-lg"></i>
                    )}
                </button>
                
                {/* Avatar mượn tạm UI */}
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 items-center justify-center text-white font-bold shadow-md shadow-brand-500/20">
                    <i className="fa-solid fa-user-graduate"></i>
                </div>
            </div>
        </header>
    );
}

// Ensure component is globally available for Babel scripts
window.Header = Header;
