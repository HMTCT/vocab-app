// ════════════════════════════════════════════════════════
//  📝  LESSON MANIFEST  —  VocabMaster
// ════════════════════════════════════════════════════════
//
//  HOW TO ADD A NEW LESSON:
//  ─────────────────────────
//  1. Go to the  src/data/lessons/  folder
//  2. Copy  _TEMPLATE.js  and rename it  (e.g. unit_10_science.js)
//  3. Open your new file and fill in the words
//  4. Add ONE line to the list below pointing to your file
//  5. Save this file and refresh the browser  ✅
//
//  The ORDER of files here = the order shown in the sidebar.
// ════════════════════════════════════════════════════════

window.VOCABULARY_DATA = [];

const LESSON_FILES = [
    'src/data/lessons/unit_00_business.js',
    'src/data/lessons/unit_01_experience.js',
    'src/data/lessons/unit_02_customer.js',
    'src/data/lessons/unit_03_product.js',
    'src/data/lessons/unit_04_careers.js',
    'src/data/lessons/unit_05_marketing.js',
    'src/data/lessons/unit_06_entrepreneurship.js',
    'src/data/lessons/unit_07_costs.js',
    'src/data/lessons/unit_08_global_trade.js',
    // ↓ Add your new lesson file path here ↓
    // 'src/data/lessons/unit_10_your_topic.js',
];

// ── Auto-loader: do not edit below this line ──────────────
// Writes each lesson <script> tag synchronously so all
// vocabulary data is ready before the app renders.
LESSON_FILES.forEach(function (src) {
    document.write('<script src="' + src + '"><\/script>');
});
