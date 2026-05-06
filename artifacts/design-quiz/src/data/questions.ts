export interface Question {
  cat: string;
  diff: string;
  visual: { bg: string; svg: string };
  wow: string;
  q: string;
  opts: string[];
  ans: number;
  name: string;
  year: string;
  story: string;
  facts: string[];
}

export const ALL_Q: Question[] = [
  {
    cat: "digital",
    diff: "Easy",
    visual: {
      bg: "#1a1040",
      svg: '<text x="55" y="70" font-size="48" text-anchor="middle" opacity=".4">😊</text>',
    },
    wow: "You send hundreds of these every day. But someone had to actually sit down and draw the first one.",
    q: "The emoji was invented in 1999 — not by Apple, not by Google. One person drew all 176 of the original emoji on a 12x12 pixel grid in just a few weeks. Where were emoji invented?",
    opts: [
      "Japan, for a mobile carrier",
      "USA, by Apple designers",
      "Finland, by Nokia engineers",
      "South Korea, for Samsung",
    ],
    ans: 0,
    name: "Emoji — Shigetaka Kurita, NTT Docomo Japan, 1999",
    year: "176 original emoji, each 12x12 pixels",
    story:
      "Shigetaka Kurita was working at a Japanese mobile company and needed a way for people to express emotion in tiny text messages. He drew 176 symbols — weather, traffic, hearts, faces — on a 12x12 pixel grid. He was inspired by manga expressions and public signage. His original 176 emoji are now in MoMA's permanent collection in New York. Apple later adopted them for iPhone in 2008. Today there are 3,600+ emoji — but they all started from those 176 hand-drawn squares.",
    facts: [
      "Original 176 emoji now in MoMA New York",
      "Each emoji was 12 x 12 pixels — 144 dots total",
      "Inspired by manga facial expressions and street signs",
      "Apple adopted Japanese emoji for the first iPhone",
    ],
  },
  {
    cat: "everyday",
    diff: "Easy",
    visual: {
      bg: "#2a0f00",
      svg: '<line x1="55" y1="15" x2="55" y2="75" stroke="#ff6b35" stroke-width="3" stroke-linecap="round" opacity=".6"/><path d="M55 75 Q35 75 35 58 Q35 42 55 42" fill="none" stroke="#ff9f6b" stroke-width="3" stroke-linecap="round" opacity=".7"/><circle cx="57" cy="42" r="5" fill="#ff6b35" opacity=".7"/>',
    },
    wow: "It holds your clothes together. It costs nothing. You've never once thought about who made it.",
    q: "The safety pin was invented in 1849 by a man who owed $15 to a friend. He sat down one morning and invented it in 3 hours specifically to earn money to pay back the debt. How much did he sell the patent for?",
    opts: ["$400", "$15", "$1,000", "$50"],
    ans: 0,
    name: "Safety pin — Walter Hunt, 1849",
    year: "Patent sold for $400 to pay a $15 debt",
    story:
      "Walter Hunt owed his friend $15. He sat with a piece of wire and spent three hours inventing the safety pin. He filed a patent and sold it the same day for $400 — which was a lot of money in 1849. He used $15 to pay his debt and kept $385. The buyer made millions. Hunt went on to also invent the sewing machine, a fountain pen, and a hard coal-burning stove — but sold most of his patents cheaply. He never became rich. The safety pin has not changed once in 175 years.",
    facts: [
      "Invented in exactly 3 hours from a piece of wire",
      "Sold patent for $400 — used $15 to pay his debt, kept $385",
      "The buyer made millions from it",
      "Design completely unchanged for 175 years",
    ],
  },
  {
    cat: "everyday",
    diff: "Easy",
    visual: {
      bg: "#001a10",
      svg: '<rect x="30" y="38" width="50" height="32" rx="4" fill="#00ff88" opacity=".1" stroke="#00cc66" stroke-width="1.5"/><rect x="38" y="46" width="34" height="3" rx="1" fill="#00ff88" opacity=".4"/><rect x="38" y="53" width="22" height="3" rx="1" fill="#00cc66" opacity=".35"/><rect x="38" y="60" width="28" height="3" rx="1" fill="#00cc66" opacity=".35"/>',
    },
    wow: "You use this to carry your school books, your lunch, your whole life. Nobody ever designed it — it just... appeared. Or did it?",
    q: "The modern zip-up backpack with padded shoulder straps was popularised globally by one brand starting in 1967. But the very first rucksack with a frame was designed for one specific purpose. What was it?",
    opts: [
      "Carrying military supplies in Norway",
      "Delivering milk in Switzerland",
      "Carrying coal in Welsh mines",
      "Transporting mail in Sweden",
    ],
    ans: 0,
    name: "Rucksack — Ole F. Bergan, Norway, 1930s",
    year: "Modern padded backpack popularised by JanSport, 1967",
    story:
      "The framed rucksack was designed by Norwegian Ole Bergan in the 1930s for military hiking. JanSport then redesigned it in 1967 with padded straps and a zipper pocket for American university students — and the modern backpack was born. Before padded straps, people carried bags by hand or with a single thin strap. The addition of two padded shoulder straps — distributing weight across the spine — was a genuinely revolutionary ergonomic design decision that we now take completely for granted.",
    facts: [
      "Padded shoulder straps were a revolutionary ergonomic decision",
      "JanSport made it a student object from 1967",
      "Before this — bags were carried by hand or one strap",
      "The spine-load distribution principle came from military hiking packs",
    ],
  },
  {
    cat: "digital",
    diff: "Easy",
    visual: {
      bg: "#0d0a2e",
      svg: '<rect x="22" y="35" width="66" height="46" rx="6" fill="#7c6fff" opacity=".15" stroke="#534AB7" stroke-width="1"/><rect x="30" y="43" width="18" height="13" rx="2" fill="#9f95ff" opacity=".3"/><rect x="54" y="43" width="26" height="5" rx="1" fill="#7c6fff" opacity=".4"/><rect x="54" y="52" width="18" height="5" rx="1" fill="#7c6fff" opacity=".3"/>',
    },
    wow: "Every website you visit has one. You fill it out constantly. Nobody designed it to be frustrating — it just turned out that way.",
    q: "The online form — with boxes, dropdowns, and a submit button — was designed as part of the first web browser in 1993. But one element makes every form annoying. Which element was added almost as an afterthought and is now the most complained-about thing on the internet?",
    opts: [
      "The CAPTCHA — 'prove you are human' test",
      "The dropdown menu",
      "The password field",
      "The submit button",
    ],
    ans: 0,
    name: "CAPTCHA — Luis von Ahn, Carnegie Mellon, 2000",
    year: "'Completely Automated Public Turing test to tell Computers and Humans Apart'",
    story:
      "Luis von Ahn invented CAPTCHA in 2000 to stop bots from filling forms. The squiggly text you had to read came first. Then clicking fire hydrants. Then buses. He later felt guilty about wasting human time, so he invented reCAPTCHA — which used those human answers to digitize books and train Google Maps AI. Every time you clicked a fire hydrant, you were teaching self-driving cars. Von Ahn calculated that humans spend 500,000 hours per day solving CAPTCHAs. He said: 'I had created something that was wasting enormous amounts of time.'",
    facts: [
      "Humans spend 500,000 hours per day solving CAPTCHAs globally",
      "Inventor felt guilty and created reCAPTCHA to make it useful",
      "Your fire hydrant clicks trained Google Maps AI",
      "CAPTCHA stands for a 55-word full name",
    ],
  },
  {
    cat: "india",
    diff: "Easy",
    visual: {
      bg: "#1a0010",
      svg: '<rect x="20" y="40" width="70" height="40" rx="3" fill="#ff69a0" opacity=".1" stroke="#cc3370" stroke-width="1"/><line x1="20" y1="55" x2="90" y2="55" stroke="#ff69a0" stroke-width="1" opacity=".5"/><text x="55" y="52" font-size="11" text-anchor="middle" fill="#ff69a0" opacity=".6">INDIA POST</text><text x="55" y="70" font-size="18" text-anchor="middle" fill="#cc3370" opacity=".4" font-weight="bold">25</text>',
    },
    wow: "Every country has one. India's most famous one was designed by a person most Indians have never heard of.",
    q: "The design of the Indian postage stamp — its distinctive border pattern and layout — was standardised in the 1940s. But which Indian object's design principle did the first Republic-era stamp directly borrow its central image from?",
    opts: [
      "The Sarnath Lion Capital — same as the national emblem",
      "The Red Fort — symbol of independence",
      "The Taj Mahal — symbol of Indian art",
      "The spinning wheel — Gandhi's symbol",
    ],
    ans: 0,
    name: "First Indian Republic stamp — Lion Capital of Ashoka, 1947",
    year: "Designed using the Sarnath sculpture, 250 BCE",
    story:
      "When India became a republic, the first stamp used the Lion Capital of Ashoka from Sarnath — the same sculpture that became the national emblem. The lions face four directions, symbolising that India speaks to the whole world. What most people don't know: the Sarnath Lion Capital was carved in 250 BCE — over 2,200 years ago. It was found buried in the ground in 1904 by British archaeologists. India chose it as its national symbol because it was already one of the greatest works of design ever created, in stone, by an Indian hand.",
    facts: [
      "The Sarnath sculpture is 2,200 years old — carved 250 BCE",
      "Was buried underground until 1904",
      "Lions face 4 directions — India speaks to the whole world",
      "Same image on all Indian currency, stamps, and the national emblem",
    ],
  },
  {
    cat: "street",
    diff: "Easy",
    visual: {
      bg: "#1a1000",
      svg: '<rect x="30" y="25" width="50" height="62" rx="25" fill="#ff9900" opacity=".1" stroke="#cc7700" stroke-width="1.5"/><circle cx="55" cy="42" r="8" fill="#ff4444" opacity=".5"/><circle cx="55" cy="57" r="8" fill="#ffcc00" opacity=".5"/><circle cx="55" cy="72" r="8" fill="#44ff44" opacity=".5"/>',
    },
    wow: "You see it every day on every road. Someone decided the order. Someone decided the colors. It wasn't random.",
    q: "The traffic light was invented in 1868 — before cars even existed. It was originally designed for horse carriages. It was powered by gas, not electricity, and exploded shortly after being installed. What color was the first 'stop' signal?",
    opts: [
      "Red — borrowed from railway signals",
      "Green — for caution",
      "White — the only color available",
      "Blue — easiest to see at night",
    ],
    ans: 0,
    name: "Traffic light — J.P. Knight, London, 1868",
    year: "Gas-powered, exploded within months of installation",
    story:
      "Railway engineer J.P. Knight designed the first traffic light outside the Houses of Parliament in London in 1868. It used red for stop and green for go — borrowed directly from railway signal colors, which themselves came from ship navigation lights. The red gas lamp exploded after a few months, injuring a police officer, and traffic lights disappeared for 50 years. They returned in 1914 in the USA — electric this time. The red-amber-green sequence we use today was standardised globally in 1968. Every country on earth agreed on one single design.",
    facts: [
      "First traffic light was for horse carriages, not cars",
      "Gas lamp version exploded, injuring a police officer",
      "Colors borrowed from railway — which borrowed from ships",
      "All countries agreed on one standard design in 1968",
    ],
  },
  {
    cat: "body",
    diff: "Easy",
    visual: {
      bg: "#1a0500",
      svg: '<path d="M35 80 Q35 40 55 30 Q75 40 75 80" fill="#ff7744" opacity=".1" stroke="#cc4400" stroke-width="1.5"/><line x1="40" y1="60" x2="70" y2="60" stroke="#ff7744" stroke-width="1" opacity=".4" stroke-dasharray="3,3"/><circle cx="55" cy="30" r="7" fill="#ff7744" opacity=".3"/>',
    },
    wow: "You wear it every single day. One tiny metal part in it was invented because of horses.",
    q: "The zip — or zipper — was invented in 1913 but wasn't used on clothes for another 20 years. For its first 20 years, it was only used on one specific thing. What was it?",
    opts: [
      "Boots and tobacco pouches",
      "Soldiers' uniforms",
      "Leather bags",
      "Tents and sleeping bags",
    ],
    ans: 0,
    name: "Zipper — Gideon Sundback, 1913",
    year: "First used on clothes only in 1937 — 24 years later",
    story:
      "Whitcomb Judson invented a clasp locker in 1893. It kept breaking. Gideon Sundback improved it in 1913 and called it the 'Hookless Fastener.' For 20 years it was used only on boots and tobacco pouches — nobody wanted it on clothes because people thought it was indecent. Too easy to open. In 1937, fashion designer Elsa Schiaparelli put zippers on her Paris collection and made them fashionable. The word 'zipper' was a brand name by B.F. Goodrich — named for the sound it makes. You use it at least 10 times a day.",
    facts: [
      "Called 'Hookless Fastener' — not zipper — for its first 24 years",
      "Kept off clothes because people thought it was indecent",
      "Fashion designer Schiaparelli made it acceptable in 1937",
      "'Zipper' is a brand name — from the sound it makes",
    ],
  },
  {
    cat: "home",
    diff: "Easy",
    visual: {
      bg: "#001020",
      svg: '<rect x="28" y="28" width="54" height="54" rx="4" fill="#4488ff" opacity=".1" stroke="#2255cc" stroke-width="1"/><rect x="36" y="36" width="38" height="38" rx="2" fill="#66aaff" opacity=".12"/><line x1="36" y1="55" x2="74" y2="55" stroke="#4488ff" stroke-width="1" opacity=".4"/><line x1="55" y1="36" x2="55" y2="74" stroke="#4488ff" stroke-width="1" opacity=".4"/>',
    },
    wow: "You've stared at one your whole life. It's the most looked-at designed object in any home. You've never wondered who designed it.",
    q: "The modern window — with a wooden or metal frame, divided into panes — became standardised during a specific period because of a tax. Which country taxed people based on how many windows their house had?",
    opts: [
      "England — the Window Tax of 1696",
      "France — Napoleon's glass tax",
      "Holland — the light and air tax",
      "Scotland — the hearth tax",
    ],
    ans: 0,
    name: "Window Tax — England, 1696 to 1851",
    year: "Houses with more than 10 windows paid tax",
    story:
      "England taxed windows from 1696 to 1851. The more windows, the higher the tax. Rich people bricked up windows to avoid it. Poor people built houses with almost no windows at all — which caused massive tuberculosis outbreaks from lack of light and ventilation. The phrase 'daylight robbery' comes from this tax — paying for light was literally robbery. This is why Victorian terraced houses have so few windows. Design is always shaped by politics and money — not just aesthetics.",
    facts: [
      "Tax lasted from 1696 to 1851 — 155 years",
      "'Daylight robbery' is a phrase literally from this tax",
      "Rich people bricked up windows to avoid paying",
      "Caused tuberculosis outbreaks from lack of ventilation in poor homes",
    ],
  },
  {
    cat: "india",
    diff: "Easy",
    visual: {
      bg: "#001a08",
      svg: '<ellipse cx="55" cy="62" rx="28" ry="18" fill="#00ff88" opacity=".1" stroke="#00cc55" stroke-width="1"/><ellipse cx="55" cy="62" rx="16" ry="10" fill="#00ff88" opacity=".15"/><path d="M40 50 Q55 30 70 50" fill="none" stroke="#00cc55" stroke-width="1.5" opacity=".4"/><circle cx="55" cy="38" r="4" fill="#00cc55" opacity=".3"/>',
    },
    wow: "India drinks more of this than any other nation on earth. Nobody designed the cup — millions of hands over centuries did.",
    q: "The kulhad — the small clay tea cup used at Indian railway stations — was pushed to be used everywhere by one specific person in the 1990s as a policy decision. But what is the actual design genius of the kulhad that no paper cup can replicate?",
    opts: [
      "It cools the tea to the perfect drinkable temperature faster",
      "It is cheaper than paper cups",
      "It can be reused multiple times",
      "It keeps tea hot for longer",
    ],
    ans: 0,
    name: "Kulhad — Indian vernacular design, 3,000+ years old",
    year: "Railway Ministry promotion campaign, 1990s",
    story:
      "The kulhad's slightly porous clay walls absorb a tiny amount of moisture, which evaporates and cools the outer surface — this wicks heat from the tea inside, cooling it to the perfect drinkable temperature far faster than a glass or paper cup. This is exactly the same principle as an earthen matka cooling water. No engineer designed this. Thousands of years of potters making cups for people to drink from immediately designed it. The kulhad is also 100% biodegradable. When you throw it on the platform, it becomes mud again within weeks.",
    facts: [
      "Porous walls cool tea to drinkable temp through evaporation",
      "Same principle as the earthen matka cooling water",
      "100% biodegradable — becomes mud within weeks",
      "Never designed by anyone — evolved through 3,000 years of use",
    ],
  },
  {
    cat: "digital",
    diff: "Medium",
    visual: {
      bg: "#0d0a2e",
      svg: '<rect x="22" y="30" width="66" height="55" rx="6" fill="#7c6fff" opacity=".1" stroke="#534AB7" stroke-width="1"/><circle cx="40" cy="52" r="10" fill="#9f95ff" opacity=".2"/><circle cx="60" cy="52" r="10" fill="#7c6fff" opacity=".2"/><rect x="30" y="68" width="50" height="8" rx="3" fill="#534AB7" opacity=".2"/>',
    },
    wow: "You've liked thousands of things with it. But who decided a thumbs up means 'I like this'?",
    q: "Facebook's Like button — the thumbs up — was almost a different symbol entirely. One designer proposed a completely different button that Zuckerberg almost used instead. What was the original proposal?",
    opts: [
      "An 'Awesome' button — not a thumbs up",
      "A heart — same as Instagram",
      "A star — like Twitter favourites",
      "A plus sign — like Google+",
    ],
    ans: 0,
    name: "Facebook Like button — Leah Pearlman & Andrew Bosworth, 2009",
    year: "Originally proposed as 'Awesome' button",
    story:
      "The Like button was proposed internally as an 'Awesome' button. Mark Zuckerberg resisted adding any reaction button for years because he was worried people would 'Like' sad posts. The thumbs up was chosen because it was universally understood across cultures and didn't require reading a word. But the thumbs up gesture actually meant something completely different in ancient Rome — it signalled death in gladiator fights. The upturned thumb meant 'finish him.' Hollywood movies got it backwards. The Like button, once launched, changed human psychology globally — introducing the concept of quantified social approval into everyday life.",
    facts: [
      "Zuckerberg resisted adding any like button for years",
      "Thumbs up in ancient Rome actually meant 'kill him' — Hollywood reversed it",
      "Once live, the Like button changed global social psychology",
      "Original name was 'Awesome button' internally",
    ],
  },
  {
    cat: "street",
    diff: "Easy",
    visual: {
      bg: "#1a1000",
      svg: '<path d="M55 20 L90 80 L20 80 Z" fill="#ffaa00" opacity=".1" stroke="#cc8800" stroke-width="1.5"/><text x="55" y="68" font-size="22" text-anchor="middle" fill="#ffaa00" opacity=".5" font-weight="bold">!</text>',
    },
    wow: "It's on every road in every country. A triangle with something inside. Who decided this would mean danger?",
    q: "Road warning signs — the red triangle — were standardised globally by a United Nations agreement. But the very first road sign ever installed in the world was put up in 1895 for one specific reason. What did it warn about?",
    opts: [
      "A dangerous downhill road ahead",
      "A bridge with a weight limit",
      "A school crossing zone",
      "A railway crossing",
    ],
    ans: 0,
    name: "First road sign — 1895, Chatillon-sur-Loing, France",
    year: "Installed by the Automobile Club de France",
    story:
      "The Automobile Club de France put up the first road sign in 1895 near a dangerous hill outside Paris. It simply said 'Attention' — no symbol, just the word. Within 10 years, different countries had completely different sign systems and drivers crossing borders had no idea what signs meant. The 1908 International Road Congress tried to standardise signs. A full global agreement — the Vienna Convention — wasn't signed until 1968. Even today, the USA and UK use different systems. The triangle-for-danger was chosen because triangles naturally draw the eye and feel unstable — the brain reads them as 'warning.'",
    facts: [
      "First road sign said only the word 'Attention' — no symbol",
      "Different countries had different signs until 1968",
      "Triangle chosen because brain reads it as inherently unstable = warning",
      "USA and UK still use different road sign systems today",
    ],
  },
  {
    cat: "body",
    diff: "Easy",
    visual: {
      bg: "#1a0010",
      svg: '<ellipse cx="55" cy="55" rx="28" ry="35" fill="#ff69a0" opacity=".1" stroke="#cc3370" stroke-width="1"/><ellipse cx="55" cy="48" rx="16" ry="20" fill="#ff69a0" opacity=".12"/><line x1="35" y1="72" x2="75" y2="72" stroke="#ff69a0" stroke-width="2" opacity=".3"/><line x1="42" y1="72" x2="38" y2="85" stroke="#cc3370" stroke-width="2" opacity=".35" stroke-linecap="round"/><line x1="68" y1="72" x2="72" y2="85" stroke="#cc3370" stroke-width="2" opacity=".35" stroke-linecap="round"/>',
    },
    wow: "You wear it every day. It was illegal for women to wear it for most of history. One person made it acceptable.",
    q: "Trousers for women were considered scandalous until the early 20th century. One specific woman wore them publicly and was arrested multiple times for it, but kept wearing them. Who was she?",
    opts: [
      "Amelia Bloomer — social reformer, USA",
      "Coco Chanel — fashion designer, France",
      "Rosa Parks — civil rights activist, USA",
      "Frida Kahlo — artist, Mexico",
    ],
    ans: 0,
    name: "Women's trousers — Amelia Bloomer, USA, 1851",
    year: "Arrested multiple times for wearing trousers in public",
    story:
      "Amelia Bloomer began promoting trousers for women in 1851 through her magazine — she argued that heavy skirts were physically dangerous and prevented women from moving freely. She was mocked, arrested, and called immoral. The baggy trousers she promoted were called 'bloomers' after her — originally as mockery. Coco Chanel later made trousers elegant and acceptable in the 1920s. Today, designing clothing is still one of the most political acts possible — what people are allowed to wear is always controlled by society before it is designed by anyone.",
    facts: [
      "'Bloomers' were named after her as mockery — she reclaimed the word",
      "Heavy Victorian skirts could weigh up to 15kg",
      "Coco Chanel made women's trousers fashionable in the 1920s",
      "What we wear is always political before it is designed",
    ],
  },
  {
    cat: "home",
    diff: "Easy",
    visual: {
      bg: "#001020",
      svg: '<rect x="25" y="35" width="60" height="42" rx="3" fill="#4488ff" opacity=".1" stroke="#2255cc" stroke-width="1"/><rect x="32" y="42" width="18" height="14" rx="1" fill="#66aaff" opacity=".2"/><rect x="55" y="42" width="22" height="5" rx="1" fill="#4488ff" opacity=".3"/><rect x="55" y="51" width="16" height="5" rx="1" fill="#4488ff" opacity=".25"/><rect x="25" y="77" width="60" height="6" rx="1" fill="#2255cc" opacity=".15"/>',
    },
    wow: "It's in every kitchen. You use it to cook roti, make chai, fry eggs. Nobody invented it. Or did someone?",
    q: "The pressure cooker — used in almost every Indian kitchen — was actually invented in 1679. It was called the 'bone digester' because it was designed for one very specific and strange original purpose. What was it?",
    opts: [
      "To extract fat from animal bones for candle-making",
      "To sterilize medical instruments",
      "To cook food faster for armies",
      "To make steam power for early engines",
    ],
    ans: 0,
    name: "Pressure cooker — Denis Papin, France, 1679",
    year: "Called 'the bone digester' — original use had nothing to do with cooking meals",
    story:
      "Denis Papin invented it to soften animal bones so their fat could be extracted for soap and candle making. He demonstrated it to the Royal Society of London in 1682 by cooking a full meal — the first pressure-cooked dinner in history. The safety valve he invented for it — to prevent the cooker from exploding — became the model for all future steam engine safety valves, which powered the Industrial Revolution. The humble pressure cooker's safety valve is the ancestor of the steam engine. Every Indian kitchen has a device that helped start the Industrial Revolution.",
    facts: [
      "Original use: extract fat from bones for candles — not cooking food",
      "Demonstrated to the Royal Society of London in 1682",
      "Its safety valve became the model for steam engine safety valves",
      "The Industrial Revolution partly traces back to a kitchen appliance",
    ],
  },
  {
    cat: "everyday",
    diff: "Easy",
    visual: {
      bg: "#1a0500",
      svg: '<rect x="28" y="42" width="54" height="32" rx="16" fill="#ff7744" opacity=".1" stroke="#cc4400" stroke-width="1.5"/><circle cx="42" cy="58" r="8" fill="#ff9977" opacity=".2"/><rect x="53" y="50" width="22" height="6" rx="2" fill="#ff7744" opacity=".25"/><rect x="53" y="60" width="16" height="6" rx="2" fill="#ff9977" opacity=".2"/>',
    },
    wow: "Every pen you've ever used. But pens didn't always work. For a very long time, pens were a disaster.",
    q: "The ballpoint pen was invented by a Hungarian journalist in 1938 because he was tired of one specific problem with fountain pens. He noticed that printing press ink dried instantly but fountain pen ink smudged. What was his name?",
    opts: [
      "László Bíró — his name became the word for pen in many countries",
      "John Loud — American inventor",
      "Milton Reynolds — Chicago businessman",
      "Petrache Poenaru — Romanian inventor",
    ],
    ans: 0,
    name: "Ballpoint pen — László Bíró, 1938",
    year: "'Biro' is still the word for pen in UK, Australia and many countries",
    story:
      "László Bíró was a journalist in Hungary who was frustrated that fountain pen ink smudged on his newspaper notes. He noticed that printing press ink dried almost instantly. He worked with his brother György, a chemist, to develop a thick quick-drying ink and a tiny ball bearing at the tip that rolled ink onto paper. He patented it in 1938. He fled to Argentina to escape the Nazis in 1943. The British RAF bought 30,000 of his pens because they worked at high altitude — unlike fountain pens which leaked. His name 'Biro' became the generic word for ballpoint pen in multiple countries.",
    facts: [
      "'Biro' is still the common word for pen in UK and Australia",
      "British RAF was first major customer — pens work at high altitude",
      "Bíró fled Hungary in 1943 to escape the Nazis",
      "His brother was the chemist who developed the thick ink formula",
    ],
  },
  {
    cat: "india",
    diff: "Medium",
    visual: {
      bg: "#1a1000",
      svg: '<rect x="22" y="38" width="66" height="42" rx="4" fill="#ffaa00" opacity=".1" stroke="#cc8800" stroke-width="1"/><rect x="30" y="46" width="50" height="6" rx="2" fill="#ffcc44" opacity=".3"/><rect x="30" y="56" width="35" height="4" rx="1" fill="#ffaa00" opacity=".4"/><rect x="30" y="64" width="42" height="4" rx="1" fill="#ffaa00" opacity=".35"/>',
    },
    wow: "Every Indian has eaten from one. It was designed for one reason — and that reason was to prevent a different food from being wasted.",
    q: "The banana leaf as a plate — used across South India — is a functional design solution. The correct way to serve food on it and the direction you fold it after eating actually communicates a specific message. What does folding the leaf towards you (top half over bottom) indicate?",
    opts: [
      "The meal was satisfying — used at celebrations",
      "The food was not good — a polite complaint",
      "You want more food served",
      "The meal is over and you are leaving",
    ],
    ans: 0,
    name: "Banana leaf plate — South Indian vernacular design",
    year: "Thousands of years old — meaning encoded in the fold",
    story:
      "In South Indian tradition, folding the banana leaf towards you — top flap over bottom — means the meal was good, satisfying, and you are happy. It is used at weddings and celebrations. Folding it away from you means the opposite — something is wrong, or it is a funeral meal. The leaf is also a brilliant piece of functional design: the natural waxy coating is antimicrobial, the large surface fits an entire meal, it is compostable within days, it naturally cups liquids like sambar, and different areas of the leaf have different textures for different foods.",
    facts: [
      "Fold towards you = celebration / satisfaction",
      "Fold away from you = funeral or dissatisfaction",
      "Waxy surface is naturally antimicrobial — no washing needed",
      "Fully compostable within days — zero waste by design",
    ],
  },
  {
    cat: "everyday",
    diff: "Easy",
    visual: {
      bg: "#001a08",
      svg: '<rect x="30" y="30" width="50" height="55" rx="4" fill="#00ff88" opacity=".08" stroke="#00cc55" stroke-width="1"/><line x1="38" y1="48" x2="72" y2="48" stroke="#00ff88" stroke-width="2" opacity=".4"/><line x1="38" y1="56" x2="65" y2="56" stroke="#00cc55" stroke-width="1.5" opacity=".35"/><line x1="38" y1="63" x2="68" y2="63" stroke="#00cc55" stroke-width="1.5" opacity=".35"/>',
    },
    wow: "You've read hundreds of them. But nobody ever wonders who designed the book itself.",
    q: "The modern book — with pages, a spine, and a cover — replaced the scroll around 300 CE. But one specific design feature of books was added in the 1400s and made books dramatically cheaper to produce. What was it?",
    opts: [
      "Page numbers — allowing the index and contents page",
      "The hardcover binding",
      "Margins on the page",
      "The title page at the front",
    ],
    ans: 0,
    name: "Page numbers — first used in printed books, 1470s",
    year: "Made indexes possible — transformed how knowledge is organised",
    story:
      "Scrolls couldn't have page numbers — you had to unroll to find anything. When books replaced scrolls, a monk would have to read the whole thing to find a reference. Page numbers were added to early printed books in the 1470s. This made the index possible. The index made it possible to reference specific information without reading everything. This changed scholarship, law, science, and religion — you could now say 'see page 47' and someone else could check your work. The design of the book changed how humans organised knowledge. We still use the exact same system today.",
    facts: [
      "Scrolls had no page numbers — had to read everything to find anything",
      "Page numbers made the index possible in the 1470s",
      "This changed how law, science, and scholarship worked",
      "The system has not changed in 550 years",
    ],
  },
  {
    cat: "street",
    diff: "Easy",
    visual: {
      bg: "#0d0a2e",
      svg: '<rect x="25" y="25" width="60" height="60" rx="4" fill="#7c6fff" opacity=".1" stroke="#534AB7" stroke-width="1"/><rect x="33" y="33" width="44" height="44" rx="2" fill="#9f95ff" opacity=".1"/><circle cx="55" cy="55" r="14" fill="#7c6fff" opacity=".15" stroke="#534AB7" stroke-width="1" stroke-dasharray="3,2"/>',
    },
    wow: "You walk past it every day without reading it. But if it didn't exist, city life would collapse.",
    q: "The modern street address system — house number + street name — was invented in one city and then copied globally. Which city first gave every house a number in 1805 and why?",
    opts: [
      "Paris — Napoleon needed to track citizens for military conscription",
      "London — for the postal service",
      "New York — for property tax collection",
      "Vienna — for the census",
    ],
    ans: 0,
    name: "House numbering system — Paris, Napoleon, 1805",
    year: "Copied globally within 50 years",
    story:
      "Napoleon numbered every house in Paris in 1805 for one reason: he needed to find men for his army. If you lived at number 24, the conscription officer knew exactly where you were. Odd numbers on the left, even on the right — that was his system. Before this, houses were known by name, by owner, or by landmark ('the house with the red door, third left after the blacksmith'). London adopted numbering soon after. New York created a grid system. The humble house number — which makes delivery, emergency services, and modern city life possible — was invented by a general who needed soldiers.",
    facts: [
      "Invented to find men for Napoleon's army — not for mail or convenience",
      "Odd left, even right — still Napoleon's original system in Paris",
      "Before this, houses were identified by name or landmark",
      "Emergency services, delivery, and taxis all depend on this 1805 design",
    ],
  },
  {
    cat: "body",
    diff: "Medium",
    visual: {
      bg: "#1a0500",
      svg: '<path d="M35 45 Q55 25 75 45 L80 80 L30 80 Z" fill="#ff7744" opacity=".1" stroke="#cc4400" stroke-width="1.5"/><line x1="43" y1="80" x2="40" y2="93" stroke="#ff7744" stroke-width="2.5" stroke-linecap="round" opacity=".5"/><line x1="67" y1="80" x2="70" y2="93" stroke="#ff7744" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>',
    },
    wow: "You've worn one at every exam, every sports day, every important day. But it was actually designed for war.",
    q: "The school uniform was originally designed and made compulsory by a specific type of institution. Which institution first made children wear a uniform and why?",
    opts: [
      "Christ's Hospital school, London — 1552, to identify poor students given charity",
      "Military academies in Prussia — to train discipline",
      "Catholic church schools — to remove class distinction",
      "Oxford University — for academic ceremony",
    ],
    ans: 0,
    name: "School uniform — Christ's Hospital, London, 1552",
    year: "Originally to identify charity students — worn with pride today",
    story:
      "Christ's Hospital in London introduced the first school uniform in 1552 — a long blue coat and yellow stockings. It was designed to identify children who were receiving charity education — orphans and the very poor. The blue coat was the cheapest dye available. The children were marked by their clothing as poor and dependent. Today the same school still exists, still wears almost the same uniform — and considers it a badge of honour. The design that began as a mark of poverty became a mark of tradition.",
    facts: [
      "Blue dye was used because it was the cheapest available",
      "Original purpose: mark charity students as poor",
      "Same school still uses nearly the same uniform today",
      "Design intended to show poverty — now signals tradition and pride",
    ],
  },
  {
    cat: "home",
    diff: "Easy",
    visual: {
      bg: "#001020",
      svg: '<rect x="25" y="50" width="60" height="32" rx="4" fill="#4488ff" opacity=".1" stroke="#2255cc" stroke-width="1"/><rect x="25" y="42" width="60" height="10" rx="2" fill="#66aaff" opacity=".12"/><line x1="38" y1="58" x2="38" y2="74" stroke="#2255cc" stroke-width="2" opacity=".4" stroke-linecap="round"/><line x1="48" y1="58" x2="48" y2="74" stroke="#2255cc" stroke-width="2" opacity=".4" stroke-linecap="round"/><line x1="62" y1="58" x2="62" y2="74" stroke="#2255cc" stroke-width="2" opacity=".3" stroke-linecap="round"/><line x1="72" y1="58" x2="72" y2="74" stroke="#2255cc" stroke-width="2" opacity=".3" stroke-linecap="round"/>',
    },
    wow: "It's in every home. You use it to dry yourself. Someone designed the shape and for 200 years nobody thought to change it.",
    q: "The towel hook — the small hook you hang your towel on — seems like nothing. But one specific design decision about how towel hooks are angled was standardised because of one practical reason. Why are most towel hooks angled slightly upward?",
    opts: [
      "So towels slide toward the wall and don't fall off",
      "So towels dry faster — air circulates underneath",
      "Because it was easier to manufacture at that angle",
      "To prevent the hook from damaging plastered walls",
    ],
    ans: 0,
    name: "Towel hook angle — functional design standard, 19th century",
    year: "Upward angle = towel stays on by gravity, not by friction",
    story:
      "A towel hook angled upward uses gravity as a locking mechanism. The weight of the towel pushes it into the wall — the hook doesn't need to grip. A straight or downward hook requires the towel to be carefully balanced. This is a perfect example of what designers call 'designing with physics rather than against it.' Most people have never noticed the angle. Most people have never thought about it at all. That invisibility is the mark of great functional design — when design works so well, it disappears completely. This is exactly what NID means by 'design sensitivity.'",
    facts: [
      "Upward angle uses gravity — towel pushes itself onto the hook",
      "A level hook would need perfect balance every time",
      "Most people never notice this — perfect invisible design",
      "'Designing with physics not against it' — a core design principle",
    ],
  },
];

export const CAT_NAMES: Record<string, string> = {
  everyday: "Everyday objects",
  digital: "Digital life",
  india: "Indian things",
  street: "Streets & signs",
  body: "On your body",
  home: "At home",
};

export const CAT_COLORS: Record<
  string,
  { bg: string; text: string; border: string; glow: string }
> = {
  everyday: {
    bg: "rgba(255,119,68,0.15)",
    text: "#ff9966",
    border: "rgba(255,119,68,0.3)",
    glow: "#ff7744",
  },
  digital: {
    bg: "rgba(124,111,255,0.15)",
    text: "#a599ff",
    border: "rgba(124,111,255,0.3)",
    glow: "#7c6fff",
  },
  india: {
    bg: "rgba(255,105,160,0.15)",
    text: "#ff88bb",
    border: "rgba(255,105,160,0.3)",
    glow: "#ff69a0",
  },
  street: {
    bg: "rgba(255,170,0,0.15)",
    text: "#ffcc44",
    border: "rgba(255,170,0,0.3)",
    glow: "#ffaa00",
  },
  body: {
    bg: "rgba(255,100,80,0.15)",
    text: "#ff8877",
    border: "rgba(255,100,80,0.3)",
    glow: "#ff6450",
  },
  home: {
    bg: "rgba(68,136,255,0.15)",
    text: "#88aaff",
    border: "rgba(68,136,255,0.3)",
    glow: "#4488ff",
  },
};
