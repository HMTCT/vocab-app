const { useState, useEffect } = React;

function FlashcardSection({ words }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Đảm bảo Reset index về 0 khi chuyển đổi Unit mới
    useEffect(() => {
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [words]);

    const currentWord = words[currentIndex] || { en: "", vi: "", type: "" };

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 150);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
        }, 150);
    };

    const handleSpeak = (e) => {
        e.stopPropagation(); // Không kích hoạt lật thẻ khi ấn nút loa
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentWord.en);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === " " || e.key === "Enter") setIsFlipped(!isFlipped);
    };

    // Gán phím tắt mũi tên trái/phải để chuyển thẻ
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, isFlipped, words]);

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center py-6">
            {/* Hướng dẫn sử dụng */}
            <div className="text-center mb-6">
                <span className="bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs px-3 py-1.5 rounded-full font-semibold">
                    Mẹo: Click vào thẻ để lật hoặc dùng Phím Mũi Tên Trái/Phải, Phím Cách
                </span>
            </div>

            {/* Khung chứa Flashcard lật 3D */}
            <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-80 sm:h-96 perspective-1000 cursor-pointer group"
            >
                <div className={`w-full h-full relative transform-style-3d transition-transform duration-500 ease-out ${isFlipped ? "rotate-y-180" : ""}`}>
                    
                    {/* MẶT TRƯỚC: TIẾNG ANH */}
                    <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col justify-between backface-hidden">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-sm font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">MẶT TRƯỚC</span>
                            {currentWord.type && (
                                <span className="bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 text-xs font-bold px-2.5 py-1 rounded-md lowercase">
                                    ({currentWord.type})
                                </span>
                            )}
                        </div>

                        <div className="text-center my-auto flex flex-col items-center gap-4">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight break-words">
                                {currentWord.en}
                            </h3>
                            
                            {/* Nút phát âm loa */}
                            <button 
                                onClick={handleSpeak}
                                className="w-12 h-12 rounded-full bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/30 dark:hover:bg-brand-900/60 text-brand-600 dark:text-brand-400 flex items-center justify-center transition-all duration-200 active:scale-90"
                                title="Phát âm từ vựng"
                            >
                                <i className="fa-solid fa-volume-high text-lg"></i>
                            </button>
                        </div>

                        <div className="text-center text-xs text-slate-400 dark:text-slate-500">
                            Nhấn để xem nghĩa Tiếng Việt
                        </div>
                    </div>

                    {/* MẶT SAU: TIẾNG VIỆT */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-indigo-600 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between backface-hidden rotate-y-180">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-sm font-bold tracking-widest text-brand-200 uppercase">MẶT SAU</span>
                            {currentWord.type && (
                                <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-md lowercase">
                                    ({currentWord.type})
                                </span>
                            )}
                        </div>

                        <div className="text-center my-auto px-4">
                            <h4 className="text-2xl sm:text-3xl font-bold leading-relaxed break-words">
                                {currentWord.vi}
                            </h4>
                        </div>

                        <div className="text-center text-xs text-brand-200">
                            Nhấn để xem từ Tiếng Anh
                        </div>
                    </div>

                </div>
            </div>

            {/* BỘ ĐIỀU KHIỂN CHUYỂN THẺ */}
            <div className="flex items-center gap-6 mt-8 w-full justify-center">
                <button 
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 flex items-center justify-center shadow-sm transition-all duration-200 hover:-translate-x-1"
                >
                    <i className="fa-solid fa-arrow-left text-lg"></i>
                </button>

                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-2xl">
                    {currentIndex + 1} / {words.length} từ vựng
                </div>

                <button 
                    onClick={handleNext}
                    className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 flex items-center justify-center shadow-sm transition-all duration-200 hover:translate-x-1"
                >
                    <i className="fa-solid fa-arrow-right text-lg"></i>
                </button>
            </div>

            {/* THANH TIẾN TRÌNH PROGRESS BAR */}
            <div className="w-full max-w-sm mt-6 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-brand-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
                ></div>
            </div>
        </div>
    );
}

// Ensure component is globally available for Babel scripts
window.FlashcardSection = FlashcardSection;
