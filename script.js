document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const loading = document.getElementById('loading');
    const responseContainer = document.getElementById('response-container');
    const aiResponse = document.getElementById('ai-response');
    const suggestTags = document.querySelectorAll('.suggest-tag');

    // Embedded Knowledge Base directly from nksha-almarkazi.com
    const siteData = {
        "restaurant": {
            "name": "نكشه المركزي",
            "slogan": "الطعم اللي بتدور عليه",
            "description": "نكشه مش بس مطعم، نكشه هي عزوتك بالأكل. بنقدم أكل طازج 100% وبجودة عالية يومياً.",
            "location": "سحاب، عمان، الأردن - شارع سحاب الرئيسي (مثلث الدخلة)",
            "hours": "يومياً من الساعة 11:00 صباحاً حتى 12:00 منتصف الليل",
            "delivery": {
                "service": "متوفر لباب بيتك",
                "areas": "سحاب والمناطق المحيطة",
                "method": "الطلب عبر الموقع أو واتساب"
            },
            "stats": {
                "daily_meals": "+500 وجبة يومياً",
                "ingredients": "طازجة 100%"
            }
        },
        "menu": [
            {
                "category": "الشاورما",
                "items": [
                    { "name": "وجبة شاورما", "description": "متوفرة بجميع الأحجام", "price": "تبدأ من 2.00 دينار" },
                    { "name": "ساندويش شاورما", "description": "أحجام مختلفة حسب اختيارك", "price": "تبدأ من 0.70 دينار" },
                    { "name": "وجبة نكشه", "description": "الوجبة المميزة والخاصة بالمطعم", "price": "2.25 دينار" },
                    { "name": "شاورما فرط", "description": "شرائح شاورما مع الثومية والمخلل والخبز", "price": "3.00 دينار" },
                    { "name": "سدر شاورما", "description": "سدر عائلي أو فردي حسب الطلب", "price": "تبدأ من 8.00 دينار" },
                    { "name": "شاورما إيطالي", "description": "شاورما مع الكريمة والفطر", "price": "2.75 دينار" }
                ]
            },
            {
                "category": "السناكات",
                "items": [
                    { "name": "ساندويش زنجر سوبر", "description": "زنجر مقرمش بحجم سوبر", "price": "1.75 دينار" },
                    { "name": "وجبة زنجر", "description": "وجبة زنجر كاملة بمقاسات مختلفة", "price": "2.75 دينار" },
                    { "name": "ساندويش مكسيكي", "description": "ساندويش بنكهة مكسيكية حارة", "price": "1.75 دينار" },
                    { "name": "ساندويش فاهيتا", "description": "دجاج مشوي مع الفلفل والألوان", "price": "1.75 دينار" },
                    { "name": "كوردون بلو", "description": "ساندويش كوردون بلو حجم سوبر", "price": "1.75 دينار" }
                ]
            },
            {
                "category": "الديناميت",
                "items": [
                    { "name": "وجبة ديناميت", "description": "متوفرة حار أو بارد", "price": "3.00 دينار" },
                    { "name": "ساندويش ديناميت", "description": "ساندويش ديناميت حار", "price": "2.00 دينار" },
                    { "name": "سدر ديناميت", "description": "سدر عائلي أو صغير", "price": "11.00 دينار" }
                ]
            },
            {
                "category": "بروستد وكريسبي",
                "items": [
                    { "name": "بروستد دجاج", "description": "دجاج طازج ومقرمش", "price": "3.50 دينار" },
                    { "name": "كريسبي دجاج", "description": "قطع كريسبي مقرمشة", "price": "2.75 دينار" },
                    { "name": "جوانح دجاج", "description": "جوانح مقرمشة ولذيذة", "price": "2.50 دينار" }
                ]
            },
            {
                "category": "المشاوي على الفحم",
                "items": [
                    { "name": "دجاج فحم", "description": "دجاج مشوي على الفحم الطبيعي", "price": "2.75 دينار" },
                    { "name": "دجاج شواية", "description": "دجاج مشوي على الشواية", "price": "3.00 دينار" },
                    { "name": "كباب", "description": "كباب مشوي طازج", "price": "3.00 دينار" },
                    { "name": "شيش طاووق", "description": "قطع دجاج مشوية", "price": "1.00 دينار" },
                    { "name": "وجبة صحية", "description": "وجبة مشاوي صحية للرجيم", "price": "2.50 دينار" },
                    { "name": "عرايس", "description": "عرايس لحم مشوية", "price": "0.50 دينار للقطعة" }
                ]
            },
            {
                "category": "الأرز",
                "items": [
                    { "name": "سدر أرز", "description": "مندي، زرب، بخاري، كبسة، أو منسف", "price": "2.25 دينار للشخص" }
                ]
            },
            {
                "category": "مكس وسدور عائلية",
                "items": [
                    { "name": "سدر مكس", "description": "2.5 شاورما + 2 من (زنجر/فاهيتا/مكسيكي)", "price": "9.00 دينار" },
                    { "name": "سدر مكس عائلي", "description": "4.5 شاورما + 4 من (زنجر/فاهيتا/مكسيكي)", "price": "17.00 دينار" },
                    { "name": "سدر الشلة", "description": "يكفي لـ 10 أشخاص، تشكيلة كاملة", "price": "18.50 دينار" }
                ]
            },
            {
                "category": "المقبلات والمشروبات",
                "items": [
                    { "name": "بطاطا مقلية", "description": "بطاطا مقرمشة", "price": "0.50 دينار" },
                    { "name": "مقبلات إضافية", "description": "ثومية، مخلل، جبنة، خبز", "price": "تبدأ من 0.10 دينار" },
                    { "name": "مشروبات", "description": "ماتريكس، شنينة، مشروبات غازية", "price": "0.30 - 0.35 دينار" }
                ]
            }
        ]
    };

    const handleSearch = async () => {
        const query = searchInput.value.trim();
        if (!query) return;

        loading.classList.remove('hidden');
        responseContainer.classList.add('hidden');
        aiResponse.innerText = '';

        // Simulate AI thinking
        await new Promise(resolve => setTimeout(resolve, 800));

        const response = generateAIResponse(query);
        
        loading.classList.add('hidden');
        responseContainer.classList.remove('hidden');
        aiResponse.innerText = response;
    };

    const generateAIResponse = (query) => {
        const q = query.toLowerCase();

        // 1. Check if the question is related to the restaurant
        const relatedKeywords = ['مطعم', 'منيو', 'سعر', 'اسعار', 'اكل', 'دجاج', 'لحم', 'مندي', 'منسف', 'شاورما', 'بروستد', 'موقع', 'سحاب', 'توصيل', 'طلب', 'واتساب', 'نكشه', 'المركزي', 'زنجر', 'مكسيكي', 'فاهيتا', 'ديناميت', 'مشروبات', 'رز', 'بكم'];
        const isRelated = relatedKeywords.some(keyword => q.includes(keyword));

        if (!isRelated && q.length > 5) {
            return "عذراً، أنا مبرمج للإجابة فقط على الأسئلة المتعلقة بمطعم نكشه المركزي. هل يمكنني مساعدتك في معرفة المنيو أو الأسعار؟";
        }

        // 2. Search logic
        let foundItems = [];
        siteData.menu.forEach(cat => {
            cat.items.forEach(item => {
                if (q.includes(item.name.toLowerCase()) || q.includes(cat.category.toLowerCase())) {
                    foundItems.push(`✨ ${item.name}: ${item.description} (السعر: ${item.price})`);
                }
            });
        });

        // Specific check for "Mansaf" or "Mandi" if they are part of a general "Rice" category
        if ((q.includes('منسف') || q.includes('مندي') || q.includes('رز')) && foundItems.length === 0) {
             const riceInfo = siteData.menu.find(c => c.category === "الأرز");
             if (riceInfo) {
                 return `نعم، يتوفر لدينا ${q.includes('منسف') ? 'منسف بلدي أصيل' : 'أرز مندي وزرب وكبسة'}.\nالسعر: ${riceInfo.items[0].price}.\nتُقدم الوجبات بجودة عالية وطعم رائع.`;
             }
        }

        if (foundItems.length > 0 && (q.includes('سعر') || q.includes('بكم') || q.includes('منيو') || q.includes('شو'))) {
            return `إليك تفاصيل الوجبات التي سألت عنها:\n\n` + foundItems.join('\n');
        }

        if (q.includes('موقع') || q.includes('وين') || q.includes('أين') || q.includes('مكان')) {
            return `📍 عنواننا: ${siteData.restaurant.location}\n⏰ ساعات العمل: ${siteData.restaurant.hours}`;
        }

        if (q.includes('توصيل') || q.includes('طلب') || q.includes('أطلب')) {
            return `🚚 خدمة التوصيل: ${siteData.restaurant.delivery.service}\n📍 المناطق المغطاة: ${siteData.restaurant.delivery.areas}\n📱 اطلب الآن عبر الموقع أو الواتساب.`;
        }

        if (q.includes('مين أنتم') || q.includes('عن المطعم')) {
            return siteData.restaurant.description;
        }

        if (q.includes('مرحبا') || q.includes('سلام') || q.includes('هلا')) {
            return `أهلاً بك في ${siteData.restaurant.name}! ${siteData.restaurant.slogan}. كيف يمكنني مساعدتك اليوم بخصوص المنيو؟`;
        }

        // Default Fallback using site stats
        return `أهلاً بك. نحن في مطعم نكشه المركزي نقدم أكثر من 500 وجبة يومياً بجودة طازجة 100%.
يمكنك السؤال عن أي وجبة في المنيو (شاورما، بروستد، مندي، منسف، سناكات) وسأعطيك تفاصيلها وسعرها فوراً.`;
    };

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    suggestTags.forEach(tag => {
        tag.addEventListener('click', () => {
            searchInput.value = tag.innerText;
            handleSearch();
        });
    });
});
