document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const loading = document.getElementById('loading');
    const responseContainer = document.getElementById('response-container');
    const aiResponse = document.getElementById('ai-response');
    const tags = document.querySelectorAll('.tag');

    // المستندات القانونية المستخلصة من PDF
    const legalKnowledge = {
        "زواج": [
            "المادة 10: سن الأهلية للزواج هي إتمام 18 سنة شمسية للخاطب والمخطوبة.",
            "المادة 10 (ب): يجوز للقاضي وبموافقة قاضي القضاة الإذن بزواج من أكمل 16 سنة في حالات خاصة تقتضيها المصلحة.",
            "المادة 36: يجب على الخاطب مراجعة القاضي أو نائبه قبل إجراء عقد الزواج، ويوثق العقد بوثيقة رسمية.",
            "شروط الصحة: حضور شاهدين رجلين أو رجل وامرأتين مسلمين، عاقلين، بالغين."
        ],
        "حضانة": [
            "المادة 170: الأم أحق بحضانة ولدها وتربيته حال قيام الزوجية وبعد الفرقة.",
            "المادة 173: تستمر حضانة الأم إلى إتمام المحضون 15 سنة من عمره.",
            "المادة 173 (ب): يعطى حق الاختيار للمحضون بعد بلوغ 15 سنة في البقاء مع الأم الحاضنة حتى بلوغ سن الرشد.",
            "شروط الحاضن: العقل، البلوغ، الأمانة، والقدرة على التربية."
        ],
        "طلاق": [
            "المادة 91: كل طلاق يقع رجعياً إلا المكمل للثلاث، والطلاق قبل الدخول، والطلاق على مال.",
            "المادة 102: الخلع الرضائي هو طلاق الزوج لزوجته نظير عوض تراضيا عليه.",
            "المادة 126: يجوز لأي من الزوجين طلب التفريق للشقاق والنزاع إذا ادعى ضرراً يلحق به."
        ],
        "نفقة": [
            "المادة 59: نفقة كل إنسان في ماله إلا الزوجة فنفقتها على زوجها ولو كانت موسرة.",
            "المادة 64: تفرض نفقة الزوجة بحسب حال الزوج يسراً وعسراً، وتجوز زيادتها ونقصها تبعاً لحالته.",
            "المادة 187: إذا لم يكن للولد مال فنفقته على أبيه."
        ],
        "ميراث": [
            "المادة 280: يستحق الإرث بموت المورث حقيقة أو حكماً وحياة الوارث وقت موته.",
            "المادة 281: يمنع من الإرث من قتل مورثه عمداً عدواناً.",
            "الوصية الواجبة: المادة 279 توجب للأحفاد الذين توفي والدهم قبل جدهم حصة من التركة بشرط ألا تتجاوز الثلث."
        ],
        "محاكم": [
            "المادة 2: تنظر المحاكم الشرعية في الأوقاف، الوصايا، المواريث، الحجر، والمسائل المتعلقة بالأحوال الشخصية للمسلمين.",
            "المادة 136: مدة الاستئناف ثلاثون يوماً تبتديء من تاريخ صدور الحكم الوجاهي أو تبليغ الحكم الغيابي.",
            "المادة 11: تقدم لائحة الدعوى للقاضي ويتم تسجيلها في قلم المحكمة."
        ]
    };

    const handleSearch = async () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        loading.classList.remove('hidden');
        responseContainer.classList.add('hidden');
        aiResponse.innerText = '';

        // محاكاة التفكير القانوني
        await new Promise(resolve => setTimeout(resolve, 1000));

        let response = "";
        let found = false;

        // منطق البحث في القوانين
        if (query.includes("زواج") || query.includes("خاطب") || query.includes("عمر")) {
            response += legalKnowledge.زواج.join("\n\n");
            found = true;
        }
        if (query.includes("حضانة") || query.includes("حضانه") || query.includes("طفل")) {
            response += legalKnowledge.حضانة.join("\n\n");
            found = true;
        }
        if (query.includes("طلاق") || query.includes("خلع") || query.includes("شقاق")) {
            response += legalKnowledge.طلاق.join("\n\n");
            found = true;
        }
        if (query.includes("نفقة") || query.includes("نفقه") || query.includes("مصروف")) {
            response += legalKnowledge.نفقة.join("\n\n");
            found = true;
        }
        if (query.includes("ميراث") || query.includes("ورث") || query.includes("تركة")) {
            response += legalKnowledge.ميراث.join("\n\n");
            found = true;
        }
        if (query.includes("محكمة") || query.includes("قضية") || query.includes("استئناف")) {
            response += legalKnowledge.محاكم.join("\n\n");
            found = true;
        }

        if (!found) {
            // محرك بحث عام داخل الكلمات الدلالية
            const keywords = ['مطعم', 'اكل', 'شاورما'];
            if (keywords.some(k => query.includes(keyword))) {
                 response = "عذراً، هذا المحرك مخصص فقط لدائرة قاضي القضاة والقوانين الشرعية. يمكنك السؤال عن الزواج، الطلاق، النفقة، أو المواريث.";
            } else {
                 response = "أهلاً بك في دائرة قاضي القضاة. لم أجد مادة قانونية محددة لسؤالك. يرجى محاولة البحث بكلمات مثل (زواج، نفقة، حضانة، ميراث) أو التوجه لأقرب محكمة شرعية.";
            }
        }

        loading.classList.add('hidden');
        responseContainer.classList.remove('hidden');
        aiResponse.innerText = response;
    };

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    tags.forEach(t => {
        t.addEventListener('click', () => {
            searchInput.value = tag.innerText;
            handleSearch();
        });
    });
});
