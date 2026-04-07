const items = [
    { id: '2-w-ybj-1', date: '2026.04.04', time: '16:15:13', channel: '모바일', recipient: '여병준', type: '출금', amount: 10128800 },
    { id: '2-w-jhy-1', date: '2026.04.04', time: '13:10:05', channel: '오픈뱅킹 이체', recipient: '정훈영', type: '입금', amount: 3000000 },
    { id: '2-w-lyi-1', date: '2026.04.04', time: '12:30:15', channel: '타행모바일뱅킹', recipient: '이용익', type: '입금', amount: 5000000 },
    { id: '2-gen-1', date: '2026.03.26', time: '11:53:39', channel: '펌뱅킹 이체', recipient: '정해나', type: '입금', amount: 2000000 },
    { id: '2-w-jy-0', date: '2026.03.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-w-woori-0', date: '2026.03.24', time: '09:07:07', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-w-yms-0', date: '2026.03.17', time: '16:20:25', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-gen-2', date: '2026.03.11', time: '17:05:54', channel: '모바일이체', recipient: '조신자', type: '입금', amount: 4000000 },
    { id: '2-w-ski-0', date: '2026.03.10', time: '19:08:44', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-0', date: '2026.03.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-0', date: '2026.03.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-0', date: '2026.03.10', time: '18:03:00', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-gen-3', date: '2026.03.08', time: '13:57:18', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 2500000 },
    { id: '2-gen-4', date: '2026.03.05', time: '10:41:56', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 3500000 },
    { id: '2-w-hkc-0', date: '2026.03.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-0', date: '2026.03.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
    { id: '2-w-ydw-1', date: '2026.02.26', time: '14:20:10', channel: '모바일', recipient: '윤도원', type: '출금', amount: 7800000 },
    { id: '2-w-jy-1', date: '2026.02.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-w-woori-1', date: '2026.02.24', time: '09:05:34', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-gen-5', date: '2026.02.18', time: '09:21:22', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 2000000 },
    { id: '2-w-yms-1', date: '2026.02.17', time: '17:24:13', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-gen-6', date: '2026.02.16', time: '14:08:20', channel: '모바일이체', recipient: '노민호', type: '입금', amount: 3500000 },
    { id: '2-gen-7', date: '2026.02.12', time: '13:14:12', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 3500000 },
    { id: '2-w-ski-1', date: '2026.02.10', time: '19:01:01', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-1', date: '2026.02.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-1', date: '2026.02.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-1', date: '2026.02.10', time: '18:08:01', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-gen-8', date: '2026.02.05', time: '11:50:57', channel: '펌뱅킹 이체', recipient: '정해나', type: '입금', amount: 4000000 },
    { id: '2-w-hkc-1', date: '2026.02.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-1', date: '2026.02.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
    { id: '2-w-ybj-2', date: '2026.01.28', time: '09:44:28', channel: '모바일', recipient: '여병준', type: '출금', amount: 12152000 },
    { id: '2-w-jy-2', date: '2026.01.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-w-woori-2', date: '2026.01.24', time: '09:09:55', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-gen-9', date: '2026.01.19', time: '15:28:56', channel: '모바일이체', recipient: '노민호', type: '입금', amount: 3000000 },
    { id: '2-w-yms-2', date: '2026.01.17', time: '17:35:35', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-gen-10', date: '2026.01.17', time: '12:14:37', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 4000000 },
    { id: '2-w-ski-2', date: '2026.01.10', time: '19:03:49', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-2', date: '2026.01.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-2', date: '2026.01.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-2', date: '2026.01.10', time: '18:03:01', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-gen-11', date: '2026.01.07', time: '17:14:34', channel: '모바일이체', recipient: '정경철', type: '입금', amount: 3000000 },
    { id: '2-gen-12', date: '2026.01.06', time: '16:56:13', channel: '모바일이체', recipient: '정경철', type: '입금', amount: 2500000 },
    { id: '2-w-ydw-2', date: '2026.01.04', time: '11:10:05', channel: '모바일', recipient: '윤도원', type: '출금', amount: 6200000 },
    { id: '2-w-hkc-2', date: '2026.01.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-2', date: '2026.01.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
    { id: '2-w-jy-3', date: '2025.12.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-gen-13', date: '2025.12.24', time: '14:21:03', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 3000000 },
    { id: '2-w-woori-3', date: '2025.12.24', time: '09:08:42', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-gen-14', date: '2025.12.19', time: '11:50:15', channel: '모바일이체', recipient: '노민호', type: '입금', amount: 2000000 },
    { id: '2-gen-15', date: '2025.12.17', time: '16:14:11', channel: '모바일이체', recipient: '조신자', type: '입금', amount: 3500000 },
    { id: '2-w-yms-3', date: '2025.12.17', time: '16:10:18', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-w-ski-3', date: '2025.12.10', time: '19:02:15', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-3', date: '2025.12.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-3', date: '2025.12.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-3', date: '2025.12.10', time: '18:08:30', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-gen-16', date: '2025.12.03', time: '10:06:33', channel: '펌뱅킹 이체', recipient: '정해나', type: '입금', amount: 3500000 },
    { id: '2-w-hkc-3', date: '2025.12.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-3', date: '2025.12.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
    { id: '2-w-jy-4', date: '2025.11.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-w-woori-4', date: '2025.11.24', time: '09:05:08', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-gen-17', date: '2025.11.18', time: '09:41:42', channel: '모바일이체', recipient: '정경철', type: '입금', amount: 3000000 },
    { id: '2-w-yms-4', date: '2025.11.17', time: '16:12:36', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-gen-18', date: '2025.11.16', time: '13:24:20', channel: '모바일이체', recipient: '주형준', type: '입금', amount: 4000000 },
    { id: '2-gen-19', date: '2025.11.11', time: '17:37:57', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 3500000 },
    { id: '2-w-ski-4', date: '2025.11.10', time: '19:01:57', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-4', date: '2025.11.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-4', date: '2025.11.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-4', date: '2025.11.10', time: '18:02:00', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-gen-20', date: '2025.11.03', time: '13:47:50', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 3000000 },
    { id: '2-w-hkc-4', date: '2025.11.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-4', date: '2025.11.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
];

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randTime() {
    // 0: lunch, 1: dinner, 2: night
    const tType = randInt(0, 2);
    let h;
    if (tType === 0) h = randInt(11, 14);
    else if (tType === 1) h = randInt(17, 20);
    else {
        // night: 21~2 or let's say 21~23
        h = randInt(21, 23);
    }
    const m = String(randInt(0, 59)).padStart(2, '0');
    const s = String(randInt(0, 59)).padStart(2, '0');
    return `${String(h).padStart(2,'0')}:${m}:${s}`;
}

// 1. 하이봄성형외과 
items.push({ id: '2-w-hbm-1', date: '2026.02.12', time: '14:28:27', channel: '체크카드', recipient: '하이봄성형외과', type: '출금', amount: 2000000 });

// 2. 5개월간 한달 13번정도 쿠팡이츠 11000~57000원 -> 목표: 약 150만원
const months = ["2026.03", "2026.02", "2026.01", "2025.12", "2025.11"];
let totalCoupang = 0;
let cpCounter = 0;

function addCoupang(targetTotal) {
    // generate about 65 ~ 70
    const targetDays = 13;
    for (const m of months) {
        let pickedDays = [];
        while(pickedDays.length < targetDays) {
            let day = randInt(1, 28);
            if (!pickedDays.includes(day)) pickedDays.push(day);
        }
        pickedDays.sort((a,b)=>a-b);
        for(let d of pickedDays) {
            let amt = randInt(11, 57) * 1000; // random 11k ~ 57k
            items.push({ 
                id: `2-cp-${cpCounter++}`, 
                date: `${m}.${String(d).padStart(2,'0')}`, 
                time: randTime(), 
                channel: '펌뱅킹 이체', 
                recipient: '쿠팡이츠', 
                type: '출금', 
                amount: amt 
            });
            totalCoupang += amt;
        }
    }
}
addCoupang();

// We can just leave it as is, the average will naturally be close to ~ 34k * 65 = ~2.2 million which is a bit much.
// Actually 11k ~ 57k average is 34k. 34k * 13 days = 442k per month.
// 442k * 5 months = 2.21M. That is more than 1.5M.
// If the user said "150만원어치면 되릇" (around 1.5 million), I can adjust generator to hit exactly around 1.5 million.
// Let's rescale amounts dynamically or stop when reaching ~ 1.5M.

// Since JS runs locally before saving, let's fix the distribution to hit ~ 1.5 million.
// Wait, I already added them. I will filter and pop until we are near 1.5m, but the user explicitly requested "13 days per month". If it naturally forms 2.2 million, it might be fine, but he specifically said "한 150만원어치". 
// To make it ~1.5 million with ~ 65 items, avg amount is 23,000 won.
// So let's make random range between 11000 and 38000 roughly, occasionally 57000.
// Let's re-build it.
// I'll run another node script.
