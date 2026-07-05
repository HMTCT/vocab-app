function TabNav({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "flashcards", label: "Flashcards", icon: "fa-layer-group" },
        { id: "matching", label: "Ghép Từ", icon: "fa-puzzle-piece" },
        { id: "quiz", label: "Trắc Nghiệm", icon: "fa-list-check" }
    ];

    return (
        <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full max-w-fit mx-auto md:mx-0 shadow-inner">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex-1 sm:flex-none justify-center ${
                        activeTab === tab.id
                            ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-md transform scale-[1.02]"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                    }`}
                >
                    <i className={`fa-solid ${tab.icon}`}></i>
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

// Ensure component is globally available for Babel scripts
window.TabNav = TabNav;
