const { useState, useEffect } = React;

function QuizSection({ words, presetSentences, unitId }) {
    const [questions, setQuestions] = useState([]);
    const [currentAnswers, setCurrentAnswers] = useState({}); // Lưu trữ câu trả lời của học sinh: {qIdx: selectedOption}
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Hàm sinh câu hỏi trắc nghiệm thông minh
    const generateQuiz = () => {
        const totalQuestionsCount = 10;
        let generated = [];

        // Bước 1: Trộn các câu hỏi ngữ cảnh mẫu đã có sẵn cho unit này
        const availablePresets = presetSentences && Array.isArray(presetSentences) ? [...presetSentences] : [];
        const shuffledPresets = availablePresets.sort(() => 0.5 - Math.random());

        // Sử dụng tối đa các câu hỏi mẫu có sẵn (tối đa là 5 câu để đảm bảo phân bổ đa dạng, còn lại sinh câu hỏi từ vựng)
        const presetSelectionCount = Math.min(6, shuffledPresets.length);
        for (let i = 0; i < presetSelectionCount; i++) {
            generated.push({
                type: "sentence",
                text: shuffledPresets[i].q,
                correctAnswer: shuffledPresets[i].a,
                options: [...shuffledPresets[i].options].sort(() => 0.5 - Math.random())
            });
        }

        // Bước 2: Sinh thêm câu hỏi ghép nghĩa từ vựng cho đến khi đủ 10 câu
        const remainingNeeded = totalQuestionsCount - generated.length;
        
        if (remainingNeeded > 0) {
            // Trộn danh sách từ vựng hiện tại để lấy từ làm câu hỏi
            const shuffledWords = [...words].sort(() => 0.5 - Math.random());
            
            // Lọc bỏ những từ đã được dùng làm đáp án đúng trong câu hỏi mẫu để tránh lặp trùng
            const usedAnswers = generated.map(q => q.correctAnswer);
            const unusedWords = shuffledWords.filter(w => !usedAnswers.includes(w.en));

            // Nếu số lượng từ chưa dùng ít hơn số câu hỏi cần thiết thì lấy thêm từ đã dùng
            const wordsForQuiz = unusedWords.length >= remainingNeeded 
                ? unusedWords.slice(0, remainingNeeded) 
                : shuffledWords.slice(0, remainingNeeded);

            wordsForQuiz.forEach((word) => {
                // Tạo câu hỏi định nghĩa ngẫu nhiên theo 2 dạng: 
                // Dạng A: Từ tiếng Anh -> Chọn nghĩa tiếng Việt
                // Dạng B: Định nghĩa tiếng Việt -> Chọn từ tiếng Anh tương ứng
                const isEnToViType = Math.random() > 0.5;

                if (isEnToViType) {
                    // Tìm 3 đáp án sai (distractors) từ danh sách từ vựng của unit đó
                    const distractors = words
                        .filter(w => w.en !== word.en)
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 3)
                        .map(w => w.vi);

                    const options = [word.vi, ...distractors];
                    // Make sure we have 4 options even if there are less words
                    while (options.length < 4 && options.length < words.length) {
                         const randomWord = words[Math.floor(Math.random() * words.length)].vi;
                         if (!options.includes(randomWord)) options.push(randomWord);
                    }
                    
                    generated.push({
                        type: "define-vi",
                        text: `Từ vựng "${word.en}" trong tiếng Việt có nghĩa là gì?`,
                        correctAnswer: word.vi,
                        options: options.sort(() => 0.5 - Math.random())
                    });
                } else {
                    const distractors = words
                        .filter(w => w.en !== word.en)
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 3)
                        .map(w => w.en);

                    const options = [word.en, ...distractors];
                    while (options.length < 4 && options.length < words.length) {
                         const randomWord = words[Math.floor(Math.random() * words.length)].en;
                         if (!options.includes(randomWord)) options.push(randomWord);
                    }

                    generated.push({
                        type: "define-en",
                        text: `Từ tiếng Anh nào mang nghĩa: "${word.vi}"?`,
                        correctAnswer: word.en,
                        options: options.sort(() => 0.5 - Math.random())
                    });
                }
            });
        }

        // Xáo trộn lại toàn bộ 10 câu hỏi để lẫn lộn giữa trắc nghiệm điền câu và giải nghĩa
        setQuestions(generated.sort(() => 0.5 - Math.random()).slice(0, 10));
        setCurrentAnswers({});
        setQuizCompleted(false);
    };

    // Khởi chạy khi khởi tạo Unit hoặc nhấn nút làm lại
    useEffect(() => {
        generateQuiz();
    }, [words, presetSentences, unitId]);

    // Học sinh chọn đáp án
    const handleSelectOption = (qIdx, option) => {
        // Nếu đã chọn rồi thì không cho phép chọn lại để đảm bảo tính minh bạch kết quả tức thì
        if (currentAnswers[qIdx] !== undefined) return;

        setCurrentAnswers(prev => {
            const next = { ...prev, [qIdx]: option };
            
            // Nếu đã hoàn thành tất cả câu hỏi, kích hoạt màn hình tổng kết sau 1 giây
            if (Object.keys(next).length === questions.length) {
                setTimeout(() => {
                    setQuizCompleted(true);
                }, 1000);
            }
            return next;
        });
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((q, idx) => {
            if (currentAnswers[idx] === q.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-4">
            {/* Header chỉ số */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="text-center sm:text-left">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Luyện tập trắc nghiệm thông minh</h3>
                    <p className="text-xs text-slate-500 mt-1">Đánh giá độ hiểu sâu của bạn qua {questions.length} câu hỏi đa dạng kiến thức.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400 font-bold px-4 py-2 rounded-xl text-sm">
                        Đã trả lời: {Object.keys(currentAnswers).length} / {questions.length}
                    </span>
                    <button 
                        onClick={generateQuiz}
                        className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition duration-200 flex items-center gap-1.5"
                    >
                        <i className="fa-solid fa-arrows-rotate"></i> Tạo Đề Mới
                    </button>
                </div>
            </div>

            {/* DANH SÁCH CÂU HỎI */}
            <div className="space-y-6">
                {questions.map((q, idx) => {
                    const userAnswer = currentAnswers[idx];
                    const isAnswered = userAnswer !== undefined;

                    return (
                        <div 
                            key={idx} 
                            className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300 shadow-sm ${
                                isAnswered 
                                ? (userAnswer === q.correctAnswer ? "border-emerald-200 dark:border-emerald-800/40" : "border-rose-200 dark:border-rose-800/40")
                                : "border-slate-100 dark:border-slate-800"
                            }`}
                        >
                            {/* Tiêu đề câu hỏi */}
                            <div className="flex items-start gap-3 mb-4">
                                <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold mt-0.5">
                                    {idx + 1}
                                </span>
                                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                                    {q.text}
                                </h4>
                            </div>

                            {/* Mạng lưới 4 đáp án */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {q.options.map((option, oIdx) => {
                                    const isSelected = userAnswer === option;
                                    const isCorrect = option === q.correctAnswer;
                                    
                                    let btnClass = "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-brand-400 dark:hover:border-brand-500";
                                    let icon = null;

                                    if (isAnswered) {
                                        if (isCorrect) {
                                            // Đáp án đúng luôn sáng xanh lá
                                            btnClass = "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-500 font-bold";
                                            icon = <i className="fa-solid fa-circle-check text-emerald-600 dark:text-emerald-400 text-base"></i>;
                                        } else if (isSelected) {
                                            // Nếu học sinh chọn sai, đáp án sai sáng đỏ
                                            btnClass = "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-500 font-bold";
                                            icon = <i className="fa-solid fa-circle-xmark text-rose-600 dark:text-rose-400 text-base"></i>;
                                        } else {
                                            btnClass = "opacity-50 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed";
                                        }
                                    }

                                    return (
                                        <button
                                            key={oIdx}
                                            onClick={() => handleSelectOption(idx, option)}
                                            disabled={isAnswered}
                                            className={`p-3 px-4 rounded-xl border text-sm text-left transition-all duration-200 flex justify-between items-center ${btnClass}`}
                                        >
                                            <span>{option}</span>
                                            {icon}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MÀN HÌNH TỔNG KẾT ĐIỂM SỐ */}
            {quizCompleted && (
                <div className="mt-8 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center rounded-3xl shadow-xl max-w-xl mx-auto">
                    <i className="fa-solid fa-star text-amber-400 text-5xl mb-4 animate-spin-slow"></i>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">Hoàn Thành Bài Kiểm Tra!</h3>
                    <div className="text-4xl font-black text-brand-600 dark:text-brand-400 my-4">
                        {calculateScore()} / {questions.length} câu đúng
                    </div>
                    
                    {/* Phân loại khuyến khích học sinh */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
                        {calculateScore() === questions.length 
                            ? "Thật phi thường! Bạn đã đạt điểm số tuyệt đối. Toàn bộ từ vựng đã được bạn ghi nhớ xuất sắc." 
                            : calculateScore() >= questions.length * 0.8 
                            ? "Tuyệt vời! Bạn nắm vững hầu hết các từ vựng cốt lõi. Hãy kiên trì duy trì phong độ nhé."
                            : "Khá tốt! Đừng nản chí, hãy nhấn nút làm lại để xáo trộn câu hỏi và cải thiện điểm số tốt hơn nữa."}
                    </p>

                    <button 
                        onClick={generateQuiz}
                        className="mt-6 bg-brand-600 hover:bg-brand-700 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md shadow-brand-500/20 transition duration-200 transform hover:scale-105"
                    >
                        <i className="fa-solid fa-repeat"></i> Làm Đề Trắc Nghiệm Mới
                    </button>
                </div>
            )}
        </div>
    );
}

// Ensure component is globally available for Babel scripts
window.QuizSection = QuizSection;
