// ADD A SHOW: copy one object below, change the fields, save. Dates are YYYY-MM-DD.
// A show dated today or later appears as "next"; earlier ones move to "past" by themselves.
// ticketUrl: null hides the ticket button. image: null shows a text card.

export const SHOWS = [
  {
    id: 'fuhui-2025',
    date: '2025-05-21',
    title: { en: 'Chinese Music Power: FUHUI 赴汇', zh: '赴汇 FUHUI · Chinese Music Power', zht: '赴匯 FUHUI · Chinese Music Power' },
    venue: { en: 'The Clapham Grand', zh: '克拉珀姆格兰德剧院', zht: '克拉珀姆格蘭德劇院' },
    city: 'London',
    lineup: ['Dabo Lang 大波浪', 'Nighticket 券·夜场', 'RadioMars 火星电台'],
    lineupZht: ['Dabo Lang 大波浪', 'Nighticket 券·夜場', 'RadioMars 火星電台'],
    image: 'img/fuhui-poster.jpg',
    alt: { en: 'FUHUI poster: Nighticket, Dabo Lang and RadioMars live in London', zh: '赴汇海报：券·夜场、大波浪、火星电台伦敦专场', zht: '赴匯海報：券·夜場、大波浪、火星電台倫敦專場' },
    gallery: ['img/nighticket-live.jpg', 'img/clapham-grand.jpg', 'img/nighticket.jpg', 'img/nighticket-run.jpg'],
    ticketUrl: null,
    note: {
      en: 'Our first overseas special: three Chinese independent acts in one night, with Alan Ip joining Nighticket as a guest.',
      zh: '赴汇是我们首个境外专场：三支华语独立乐队同台，Alan Ip 担任券·夜场的嘉宾。',
      zht: '赴匯是我們首個境外專場：三支華語獨立樂隊同台，Alan Ip 擔任券·夜場的嘉賓。',
    },
  },
  {
    id: 'wutiaoren-2026',
    date: '2026-05-09',
    title: { en: 'Wu Tiao Ren 五条人 · Some Scenery Earth Tour UK', zh: '五条人 地球巡演 英国站', zht: '五條人 地球巡演 英國站' },
    venue: { en: 'Dingwalls, Camden', zh: 'Dingwalls，卡姆登', zht: 'Dingwalls，卡姆登' },
    city: 'London',
    lineup: ['Wu Tiao Ren 五条人'],
    lineupZht: ['Wu Tiao Ren 五條人'],
    image: 'img/wutiaoren-poster.jpg',
    alt: { en: 'Wu Tiao Ren Some Scenery Earth Tour UK 2026 poster with a red plastic bag over London', zh: '五条人地球巡演英国站2026海报', zht: '五條人地球巡演英國站2026海報' },
    gallery: [],
    ticketUrl: null,
    note: {
      en: 'Two UK nights: Manchester (The Bread Shed, 8 May) and London (Dingwalls, 9 May).',
      zh: '英国两站：曼彻斯特 The Bread Shed（5月8日）与伦敦 Dingwalls（5月9日）。',
      zht: '英國兩站：曼徹斯特 The Bread Shed（5月8日）與倫敦 Dingwalls（5月9日）。',
    },
  },
  {
    id: 'supermarket-2026',
    date: '2026-05-17',
    title: { en: 'Super Market 超级市场 · London', zh: '超级市场 伦敦行', zht: '超級市場 倫敦行' },
    venue: { en: 'Dingwalls, Camden', zh: 'Dingwalls，卡姆登', zht: 'Dingwalls，卡姆登' },
    city: 'London',
    lineup: ['Super Market 超级市场', 'Shii', 'Dr. Alan Ip'],
    lineupZht: ['Super Market 超級市場', 'Shii', 'Dr. Alan Ip'],
    image: 'img/supermarket-poster.jpg',
    alt: { en: 'Super Market London poster: a lone figure walking toward a red light', zh: '超级市场伦敦行海报', zht: '超級市場倫敦行海報' },
    gallery: ['img/supermarket.jpg', 'img/shii.jpg'],
    ticketUrl: null,
    note: {
      en: 'Beijing band Super Market in London, with Beijing’s Shii and Dr. Alan Ip from Hong Kong and the UK.',
      zh: '北京乐队超级市场登陆伦敦，北京的 Shii 与来自香港和英国的 Dr. Alan Ip 担任嘉宾。',
      zht: '北京樂隊超級市場登陸倫敦，北京的 Shii 與來自香港和英國的 Dr. Alan Ip 擔任嘉賓。',
    },
  },
];

export function splitShows(shows, today) {
  const upcoming = shows.filter(s => s.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = shows.filter(s => s.date < today).sort((a, b) => b.date.localeCompare(a.date));
  return { next: upcoming[0] ?? null, upcoming, past };
}
