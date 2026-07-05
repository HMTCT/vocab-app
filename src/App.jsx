const { useState, useEffect } = React;

function App() {
    // STATE QUẢN LÝ SECTION CHỦ ĐẠO
    const [activeUnitIdx, setActiveUnitIdx] = useState(0);
    const [activeTab, setActiveTab] = useState("flashcards"); // "flashcards" | "matching" | "quiz"
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        // Chờ sự kiện lessonsReady từ loader trước khi render
        const handleReady = () => {
            setDataLoaded(true);
        };
        
        // Kiểm tra xem dữ liệu đã được nạp xong chưa (do dùng document.write, nó thường xong trước)
        if (window.VOCABULARY_DATA && window.VOCABULARY_DATA.length > 0) {
            setDataLoaded(true);
        } else {
            window.addEventListener('lessonsReady', handleReady);
        }

        return () => window.removeEventListener('lessonsReady', handleReady);
    }, []);

    if (!dataLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-brand-500 font-bold text-xl animate-pulse">Loading Vocabulary Data...</div>
            </div>
        );
    }

    const vocabularyData = window.VOCABULARY_DATA || [];
    const activeUnit = vocabularyData[activeUnitIdx] || vocabularyData[0];

    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {/* SIDEBAR CHỌN UNIT */}
            <Sidebar 
                activeUnitIdx={activeUnitIdx}
                setActiveUnitIdx={setActiveUnitIdx}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                vocabularyData={vocabularyData}
            />

            {/* MẶT NẠ LÀM MỜ KHI SIDEBAR MỞ Ở MOBILE */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                
                {/* Header */}
                <Header 
                    activeUnit={activeUnit} 
                    setSidebarOpen={setSidebarOpen} 
                />

                {/* Nội dung chính: Tabs và Render Section */}
                <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-5xl mx-auto w-full">
                        
                        {/* Thanh điều hướng Tabs */}
                        <div className="mb-8 md:mb-12 flex justify-center md:justify-start">
                            <TabNav 
                                activeTab={activeTab} 
                                setActiveTab={setActiveTab} 
                            />
                        </div>

                        {/* RENDER CÁC SECTION DỰA TRÊN TAB ĐANG CHỌN */}
                        <div className="w-full">
                            {activeTab === "flashcards" && (
                                <FlashcardSection words={activeUnit ? activeUnit.words : []} />
                            )}
                            
                            {activeTab === "matching" && (
                                <MatchingSection 
                                    words={activeUnit ? activeUnit.words : []} 
                                    unitId={activeUnit ? activeUnit.id : null}
                                />
                            )}
                            
                            {activeTab === "quiz" && (
                                <QuizSection 
                                    words={activeUnit ? activeUnit.words : []} 
                                    presetSentences={activeUnit ? activeUnit.sentences : []} 
                                    unitId={activeUnit ? activeUnit.id : null}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Ensure component is globally available for Babel scripts
window.App = App;
