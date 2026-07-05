function Sidebar({ activeUnitIdx, setActiveUnitIdx, sidebarOpen, setSidebarOpen, vocabularyData }) {
    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 text-slate-100 transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col shadow-2xl md:shadow-none`}>
            {/* Header Sidebar */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900 sticky top-0 z-10">
                <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">VocabMaster</h1>
                    <p className="text-xs text-slate-400 mt-1">Hệ thống ôn tập từ vựng</p>
                </div>
                <button 
                    onClick={() => setSidebarOpen(false)} 
                    className="md:hidden text-slate-400 hover:text-white p-2 transition-colors"
                >
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>

            {/* Danh sách các Unit */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 sidebar-scroll">
                {vocabularyData.map((unit, idx) => (
                    <button
                        key={unit.id}
                        onClick={() => {
                            setActiveUnitIdx(idx);
                            setSidebarOpen(false); // Đóng sidebar trên mobile sau khi chọn
                        }}
                        className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border group ${
                            activeUnitIdx === idx
                                ? "bg-brand-600 border-brand-500 shadow-lg shadow-brand-900/50 text-white"
                                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                                activeUnitIdx === idx 
                                    ? "bg-white/20 text-white" 
                                    : "bg-slate-900 text-slate-400 group-hover:text-white"
                            }`}>
                                {idx + 1}
                            </div>
                            <div className="overflow-hidden">
                                <div className={`font-semibold text-sm truncate ${activeUnitIdx === idx ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
                                    {unit.title}
                                </div>
                                <div className={`text-xs mt-0.5 truncate ${activeUnitIdx === idx ? "text-brand-200" : "text-slate-500 group-hover:text-slate-400"}`}>
                                    {unit.vietnameseTitle}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Chân trang Sidebar (dành cho người muốn thêm bài) */}
            <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center bg-slate-900">
                <i className="fa-regular fa-file-lines mr-1"></i>
                Đọc ADDING_CONTENT.md để thêm bài học
            </div>
        </aside>
    );
}

// Ensure component is globally available for Babel scripts
window.Sidebar = Sidebar;
