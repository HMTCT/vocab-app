// ════════════════════════════════════════════════════════
//  📋  NEW LESSON TEMPLATE  —  VocabMaster
// ════════════════════════════════════════════════════════
//
//  INSTRUCTIONS:
//  ─────────────
//  1. Copy this file into the  src/data/lessons/  folder
//  2. Rename it  (e.g. unit_10_science.js)
//  3. Fill in the fields below (title, words, sentences)
//  4. Register it in  src/data/manifest.js
//  5. Refresh the browser — your lesson appears in the sidebar!
//
//  WORD TYPE CODES:
//  ─────────────────
//  "n"    = noun          (e.g. "book", "company")
//  "v"    = verb          (e.g. "learn", "acquire")
//  "adj"  = adjective     (e.g. "smart", "fierce")
//  "adv"  = adverb        (e.g. "abroad", "finally")
//  "n/v"  = noun & verb   (e.g. "schedule", "update")
//  "idiom"= fixed phrase  (e.g. "break even")
// ════════════════════════════════════════════════════════

VOCABULARY_DATA.push({

    // ── STEP 1: Give your lesson a unique number ──────────
    id: 10,                              // ← Change to next available number

    // ── STEP 2: Name your lesson ──────────────────────────
    title: "Unit 10: Your Topic Here",   // ← Shown in sidebar (English)
    vietnameseTitle: "Chủ đề của bạn",   // ← Shown in sidebar (Vietnamese)

    // ── STEP 3: Add your vocabulary words ─────────────────
    //   Each word needs three fields:
    //     en   = the English word
    //     vi   = the Vietnamese meaning
    //     type = the word type (see codes above)
    words: [
        { en: "example",   vi: "ví dụ",         type: "n"   },
        { en: "study",     vi: "học, nghiên cứu", type: "v"   },
        { en: "helpful",   vi: "hữu ích",        type: "adj" },
        { en: "quickly",   vi: "một cách nhanh chóng", type: "adv" },
        // ↓ Add more words here, copy the line above ↓
    ],

    // ── STEP 4: Add quiz sentences (OPTIONAL) ─────────────
    //   If you leave this empty ([]), the app will
    //   automatically generate quiz questions from your words.
    //
    //   q       = the sentence with ______ as the blank
    //   a       = the correct answer (must match a word above exactly)
    //   options = 4 choices: the correct answer + 3 wrong ones
    sentences: [
        {
            q: "This dictionary is very ______ for learners.",
            a: "helpful",
            options: ["helpful", "example", "quickly", "study"]
            //          ↑ correct   ↑─────────── 3 wrong answers ───────────↑
        },
        // ↓ Add more sentences here ↓
    ],

});
