const items = [
    { id: '2-gen-1', date: '2026.03.26', time: '11:53:39', channel: '펌뱅킹 이체', recipient: '정해나', type: '입금', amount: 2000000 },
    { id: '2-w-jy-0', date: '2026.03.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-gen-2', date: '2026.03.11', time: '17:05:54', channel: '모바일이체', recipient: '조신자', type: '입금', amount: 4000000 },
    { id: '2-w-yj-0', date: '2026.03.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-0', date: '2026.03.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-gen-3', date: '2026.03.08', time: '13:57:18', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 2500000 },
    { id: '2-gen-4', date: '2026.03.08', time: '10:41:56', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 3500000 },
    { id: '2-w-jy-1', date: '2026.02.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-gen-5', date: '2026.02.18', time: '09:21:22', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 2000000 },
    { id: '2-gen-6', date: '2026.02.16', time: '14:08:20', channel: '모바일이체', recipient: '노민호', type: '입금', amount: 3500000 },
    { id: '2-gen-7', date: '2026.02.12', time: '13:14:12', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 3500000 },
    { id: '2-w-yj-1', date: '2026.02.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-1', date: '2026.02.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-gen-8', date: '2026.02.05', time: '11:50:57', channel: '펌뱅킹 이체', recipient: '정해나', type: '입금', amount: 4000000 },
    { id: '2-w-jy-2', date: '2026.01.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-gen-9', date: '2026.01.19', time: '15:28:56', channel: '모바일이체', recipient: '노민호', type: '입금', amount: 3000000 },
    { id: '2-gen-10', date: '2026.01.17', time: '12:14:37', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 4000000 },
    { id: '2-w-yj-2', date: '2026.01.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-2', date: '2026.01.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-gen-11', date: '2026.01.07', time: '17:14:34', channel: '모바일이체', recipient: '정경철', type: '입금', amount: 3000000 },
    { id: '2-gen-12', date: '2026.01.06', time: '16:56:13', channel: '모바일이체', recipient: '정경철', type: '입금', amount: 2500000 },
    { id: '2-w-jy-3', date: '2025.12.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-gen-13', date: '2025.12.24', time: '14:21:03', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 3000000 },
    { id: '2-gen-14', date: '2025.12.19', time: '11:50:15', channel: '모바일이체', recipient: '노민호', type: '입금', amount: 2000000 },
    { id: '2-gen-15', date: '2025.12.17', time: '16:14:11', channel: '모바일이체', recipient: '조신자', type: '입금', amount: 3500000 },
    { id: '2-w-yj-3', date: '2025.12.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-3', date: '2025.12.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-gen-16', date: '2025.12.03', time: '10:06:33', channel: '펌뱅킹 이체', recipient: '정해나', type: '입금', amount: 3500000 },
    { id: '2-w-jy-4', date: '2025.11.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-gen-17', date: '2025.11.18', time: '09:41:42', channel: '모바일이체', recipient: '정경철', type: '입금', amount: 3000000 },
    { id: '2-gen-18', date: '2025.11.16', time: '13:24:20', channel: '모바일이체', recipient: '주형준', type: '입금', amount: 4000000 },
    { id: '2-gen-19', date: '2025.11.11', time: '17:37:57', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 3500000 },
    { id: '2-w-yj-4', date: '2025.11.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-4', date: '2025.11.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-gen-20', date: '2025.11.03', time: '13:47:50', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 3000000 },
];

const months = ["2026.03", "2026.02", "2026.01", "2025.12", "2025.11"];

// 1. Every 1st of the month: 지로, 한국토지주택공사, 467800
months.forEach((m, idx) => {
    items.push({ id: `2-w-lh-${idx}`, date: `${m}.01`, time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 });
});

// 2. 4월4일 오후 4시15분13초에 여병준 한테 모바일 1012만 8800원 출금된거
items.push({ id: `2-w-ybj-1`, date: `2026.04.04`, time: '16:15:13', channel: '모바일', recipient: '여병준', type: '출금', amount: 10128800 });

// 3. 1월 28일에 오전 9시 44분 28초에 여병준한테 모바일 1215만 2000원 출금된거
items.push({ id: `2-w-ybj-2`, date: `2026.01.28`, time: '09:44:28', channel: '모바일', recipient: '여병준', type: '출금', amount: 12152000 });

// sort by date+time desc
items.sort((a, b) => {
    const dtA = a.date + ' ' + a.time;
    const dtB = b.date + ' ' + b.time;
    return dtB.localeCompare(dtA);
});

items.forEach((t) => {
  console.log(`    { id: '${t.id}', date: '${t.date}', time: '${t.time}', channel: '${t.channel}', recipient: '${t.recipient}', type: '${t.type}', amount: ${t.amount} },`);
});

// Let's also print the total to verify the math
let total = 0;
items.forEach(t => {
   if(t.type==='입금'){ total += t.amount; }
   else { total -= t.amount; }
});
console.log('// TOTAL:', total);
