const { useState, useEffect } = React;

function MatchingSection({ words, unitId }) {
    const [gameWords, setGameWords] = useState([]);
    const [enColumns, setEnColumns] = useState([]);
    const [viColumns, setViColumns] = useState([]);
    
    const [selectedEn, setSelectedEn] = useState(null); // Lưu trữ Object {id, en} đang chọn
    const [selectedVi, setSelectedVi] = useState(null); // Lưu trữ Object {id, vi} đang chọn
    const [matches, setMatches] = useState({}); // Lưu trữ cặp đã đúng: {wordId: true}
    const [incorrectPair, setIncorrectPair] = useState(null); // {enId, viId} lỗi để nháy màu đỏ

    // Khởi tạo trò chơi mới
    const initGame = () => {
        // Lấy 10 từ vựng ngẫu nhiên từ danh sách từ vựng của unit
        const shuffled = [...words].sort(() => 0.5 - Math.random());
        const selectedTen = shuffled.slice(0, Math.min(10, words.length));
        
        // Gán mã định danh duy nhất cho từng từ để kiểm tra nối đúng/sai
        const formattedWords = selectedTen.map((w, index) => ({
            id: `word-${index}-${Date.now()}`,
            en: w.en,
            vi: w.vi
        }));

        setGameWords(formattedWords);
        
        // Trộn riêng cột Tiếng Anh và Tiếng Việt độc lập
        const shuffledEn = [...formattedWords].sort(() => 0.5 - Math.random());
        const shuffledVi = [...formattedWords].sort(() => 0.5 - Math.random());

        setEnColumns(shuffledEn);
        setViColumns(shuffledVi);

        setSelectedEn(null);
        setSelectedVi(null);
        setMatches({});
        setIncorrectPair(null);
    };

    // Khởi chạy khi vào unit hoặc ấn nút reset
    useEffect(() => {
        initGame();
    }, [words, unitId]);

    // Xử lý khi chọn từ tiếng Anh
    const handleSelectEn = (item) => {
        if (matches[item.id]) return; // Từ này đã khớp thành công
        setSelectedEn(item);
        setIncorrectPair(null);

        // Nếu đã chọn một từ Tiếng Việt trước đó, tiến hành so khớp ngay
        if (selectedVi) {
            checkMatch(item, selectedVi);
        }
    };

    // Xử lý khi chọn từ tiếng Việt
    const handleSelectVi = (item) => {
        if (matches[item.id]) return; // Nghĩa này đã khớp thành công
        setSelectedVi(item);
        setIncorrectPair(null);

        // Nếu đã chọn một từ Tiếng Anh trước đó, tiến hành so khớp ngay
        if (selectedEn) {
            checkMatch(selectedEn, item);
        }
    };

    // Hàm kiểm tra khớp đúng hay sai
    const checkMatch = (enItem, viItem) => {
        if (enItem.id === viItem.id) {
            // NỐI ĐÚNG
            setMatches(prev => ({ ...prev, [enItem.id]: true }));
            setSelectedEn(null);
            setSelectedVi(null);
        } else {
            // NỐI SAI - Nháy đỏ cảnh báo
            setIncorrectPair({ enId: enItem.id, viId: viItem.id });
            setSelectedEn(null);
            setSelectedVi(null);

            // Xóa trạng thái nháy đỏ sau 800ms
            setTimeout(() => {
                setIncorrectPair(null);
            }, 800);
        }
    };

    const isGameFinished = gameWords.length > 0 && Object.keys(matches).length === gameWords.length;

    return (
        <div className="w-full max-w-4xl mx-auto py-4">
            {/* Header thông số */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="text-center sm:text-left">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Trò chơi ghép cặp từ vựng</h3>
                    <p className="text-xs text-slate-500 mt-1">Ghép từ vựng Tiếng Anh (trái) với nghĩa Tiếng Việt tương ứng (phải)</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400 font-bold px-4 py-2 rounded-xl text-sm">
                        Tiến độ: {Object.keys(matches).length} / {gameWords.length}
                    </span>
                    <button 
                        onClick={initGame}
                        className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition duration-200 flex items-center gap-1.5"
                    >
                        <i className="fa-solid fa-arrows-rotate"></i> Trộn Lại
                    </button>
                </div>
            </div>

            {/* CỘT GHÉP CẶP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                {/* Cột Tiếng Anh */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 text-center">TIẾNG ANH</h4>
                    {enColumns.map((item) => {
                        const isMatched = matches[item.id];
                        const isSelected = selectedEn && selectedEn.id === item.id;
                        const isIncorrect = incorrectPair && incorrectPair.enId === item.id;

                        let cardClass = "bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-brand-300 dark:hover:border-brand-500";
                        if (isSelected) cardClass = "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border-brand-500 scale-[1.02] ring-2 ring-brand-500/20";
                        if (isMatched) cardClass = "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-500/50 opacity-60 cursor-not-allowed";
                        if (isIncorrect) cardClass = "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-500 animate-[shake_0.5s_ease-in-out] ring-2 ring-rose-500/20";

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSelectEn(item)}
                                disabled={isMatched}
                                className={`p-4 rounded-xl border text-sm font-bold text-center transition-all duration-200 shadow-sm flex justify-between items-center ${cardClass}`}
                            >
                                <span className="truncate">{item.en}</span>
                                {isMatched && <i className="fa-solid fa-circle-check text-emerald-600 dark:text-emerald-400"></i>}
                                {isIncorrect && <i className="fa-solid fa-circle-xmark text-rose-600 dark:text-rose-400"></i>}
                            </button>
                        );
                    })}
                </div>

                {/* Cột Tiếng Việt */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 text-center">TIẾNG VIỆT</h4>
                    {viColumns.map((item) => {
                        const isMatched = matches[item.id];
                        const isSelected = selectedVi && selectedVi.id === item.id;
                        const isIncorrect = incorrectPair && incorrectPair.viId === item.id;

                        let cardClass = "bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-brand-300 dark:hover:border-brand-500";
                        if (isSelected) cardClass = "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border-brand-500 scale-[1.02] ring-2 ring-brand-500/20";
                        if (isMatched) cardClass = "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-500/50 opacity-60 cursor-not-allowed";
                        if (isIncorrect) cardClass = "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-500 animate-[shake_0.5s_ease-in-out] ring-2 ring-rose-500/20";

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSelectVi(item)}
                                disabled={isMatched}
                                className={`p-4 rounded-xl border text-sm font-semibold text-center transition-all duration-200 shadow-sm flex justify-between items-center ${cardClass}`}
                            >
                                <span className="truncate text-left flex-1 mr-2">{item.vi}</span>
                                {isMatched && <i className="fa-solid fa-circle-check text-emerald-600 dark:text-emerald-400 flex-shrink-0"></i>}
                                {isIncorrect && <i className="fa-solid fa-circle-xmark text-rose-600 dark:text-rose-400 flex-shrink-0"></i>}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* MÀN HÌNH HOÀN THÀNH TRÒ CHƠI */}
            {isGameFinished && (
                <div className="mt-8 p-8 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white text-center rounded-3xl shadow-xl animate-bounce">
                    <i className="fa-solid fa-trophy text-5xl mb-4"></i>
                    <h3 className="text-2xl font-black">Xuất Sắc! Hoàn Thành Ghép Cặp</h3>
                    <p className="text-emerald-100 text-sm mt-1 max-w-md mx-auto">Bạn đã nối chính xác toàn bộ 10 từ vựng. Hãy nhấn nút Làm lại dưới đây để xáo trộn bộ từ mới học sâu nhớ lâu!</p>
                    <button 
                        onClick={initGame}
                        className="mt-6 bg-white text-emerald-700 hover:bg-emerald-50 font-extrabold px-6 py-3 rounded-2xl shadow-md transition duration-200 transform hover:scale-105"
                    >
                        <i className="fa-solid fa-repeat"></i> Làm Lại Với Bộ Từ Mới
                    </button>
                </div>
            )}
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `}</style>
        </div>
    );
}

// Ensure component is globally available for Babel scripts
window.MatchingSection = MatchingSection;
