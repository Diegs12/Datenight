import { useState, useEffect, useRef } from "react";

const T={bg:"#0E0F13",surface:"#151620",surfaceAlt:"#1C1710",border:"#2A2520",primary:"#D4A574",accent:"#D4A574",green:"#4ade80",yellow:"#D4A574",text:"#E8C49A",textDim:"#7D786F",textFaint:"#5A564F",pink:"#C49080",purple:"#9A8AAA",font:`'DM Sans',sans-serif`,display:`'Fraunces',serif`};
const btn=(bg,color,x={})=>({fontFamily:T.font,fontSize:14,fontWeight:600,border:"none",borderRadius:10,cursor:"pointer",padding:"11px 22px",transition:"all 0.15s",background:bg,color,...x});
const inp=(x={})=>({fontFamily:T.font,fontSize:15,padding:"12px 16px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg,color:T.text,outline:"none",width:"100%",boxSizing:"border-box",...x});

// ——— SEASON HELPER ———
const SEASONAL_DATES = {
  d39: ["fall"], d59: ["fall"], d40: ["fall"], d55: ["fall"], d54: ["fall"], d76: ["fall"],
  d36: ["winter"],
  d35: ["spring","summer","fall"], d57: ["spring","summer","fall"],
  d38: ["summer"], d58: ["summer"],
  d22: ["spring","summer","fall"], d32: ["spring","summer","fall"], d30: ["spring","summer","fall"],
};
const getCurrentSeason = () => {
  const m = new Date().getMonth(); // 0-11
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "fall";
  return "winter";
};
const isInSeason = (dateId) => {
  const seasons = SEASONAL_DATES[dateId];
  if (!seasons) return true; // no tag = year-round
  return seasons.includes(getCurrentSeason());
};
const crd=(x={})=>({background:T.surface,borderRadius:14,padding:24,border:`1px solid ${T.border}`,...x});

const GRADS={
  outdoor:[
    "linear-gradient(135deg,#1a1e1c 0%,#2a3d35 40%,#3d5a4e 80%,#4a7060 100%)",
    "linear-gradient(135deg,#181e1a 0%,#263828 40%,#385540 80%,#4a6e58 100%)",
    "linear-gradient(135deg,#1c2018 0%,#2e4030 40%,#426050 80%,#507868 100%)",
  ],
  food:[
    "linear-gradient(135deg,#1C1710 0%,#3a2a18 40%,#6a4a28 80%,#8a6438 100%)",
    "linear-gradient(135deg,#201810 0%,#442e1a 40%,#7a5430 80%,#9a7040 100%)",
    "linear-gradient(135deg,#1a1610 0%,#382818 40%,#5a4020 80%,#7a5a30 100%)",
  ],
  adventure:[
    "linear-gradient(135deg,#141620 0%,#1e2a42 40%,#2a4068 80%,#365888 100%)",
    "linear-gradient(135deg,#121822 0%,#1a2e48 40%,#284870 80%,#346090 100%)",
    "linear-gradient(135deg,#16181e 0%,#222e40 40%,#304860 80%,#3e6080 100%)",
  ],
  creative:[
    "linear-gradient(135deg,#1a161e 0%,#2e2438 40%,#4a3858 80%,#644e78 100%)",
    "linear-gradient(135deg,#1c1820 0%,#30283e 40%,#4e4060 80%,#6a5880 100%)",
    "linear-gradient(135deg,#181420 0%,#2a2036 40%,#443454 80%,#5e4a70 100%)",
  ],
  nightlife:[
    "linear-gradient(135deg,#1C1710 0%,#3a2818 40%,#5a4028 80%,#7a5838 100%)",
    "linear-gradient(135deg,#1e1810 0%,#3e2c1a 40%,#604430 80%,#806040 100%)",
    "linear-gradient(135deg,#1a1610 0%,#342418 40%,#503a24 80%,#6a5030 100%)",
  ],
  chill:[
    "linear-gradient(135deg,#121418 0%,#1e2830 40%,#2a3e4a 80%,#385668 100%)",
    "linear-gradient(135deg,#10141a 0%,#1a2a34 40%,#264048 80%,#345860 100%)",
    "linear-gradient(135deg,#141618 0%,#202e38 40%,#2e4450 80%,#3e5e70 100%)",
  ],
  romantic:[
    "linear-gradient(135deg,#1C1710 0%,#3e2818 40%,#6a4028 80%,#8a5838 100%)",
    "linear-gradient(135deg,#201810 0%,#442e1c 40%,#7a4e30 80%,#9a6840 100%)",
    "linear-gradient(135deg,#1a1610 0%,#382418 40%,#5a3a24 80%,#7a5030 100%)",
  ],
  meaningful:[
    "linear-gradient(135deg,#141618 0%,#1e2a28 40%,#2a4038 80%,#385848 100%)",
    "linear-gradient(135deg,#12181a 0%,#1a2e2a 40%,#284840 80%,#386058 100%)",
    "linear-gradient(135deg,#161818 0%,#222e2a 40%,#304440 80%,#3e5c50 100%)",
  ],
};
const getGrad = (date) => {
  const gs = GRADS[date.category] || GRADS.chill;
  const hash = date.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return gs[hash % gs.length];
};
const EMOJI={outdoor:"🌄",food:"🍽️",adventure:"⚡",creative:"🎨",nightlife:"🌙",chill:"☁️",romantic:"❤️",meaningful:"🤝"};
const CAT_ACCENT={outdoor:"#6a9a7a",food:"#D4A574",adventure:"#6888aa",creative:"#9A8AAA",nightlife:"#C49080",chill:"#7aaabb",romantic:"#D4A574",meaningful:"#6a9a88"};

// ——— MOOD TAG SYSTEM ———
const MOOD_MAP = {
  energizing: { emoji: "⚡", label: "ENERGIZING", color: "#4ade80" },
  intimate: { emoji: "💫", label: "INTIMATE", color: "#fb7185" },
  social: { emoji: "🎉", label: "SOCIAL", color: "#fbbf24" },
  creative: { emoji: "✨", label: "CREATIVE", color: "#60a5fa" },
  chill: { emoji: "🌙", label: "CHILL", color: "#7dd3fc" },
  deep: { emoji: "🔮", label: "DEEP", color: "#c084fc" },
  adventurous: { emoji: "🔥", label: "ADVENTUROUS", color: "#e879f9" },
};
const getMood = (date) => {
  const v = date.vibe || [];
  const c = date.category;
  if (c === "outdoor" || c === "adventure" || v.includes("athletic")) return MOOD_MAP.energizing;
  if (v.includes("intimate") || (c === "romantic" && v.includes("romantic"))) return MOOD_MAP.intimate;
  if (v.includes("playful") || v.includes("competitive") || c === "nightlife") return MOOD_MAP.social;
  if (c === "creative" || v.includes("hands-on") || v.includes("creative")) return MOOD_MAP.creative;
  if (v.includes("intellectual") || c === "meaningful" || v.includes("meaningful")) return MOOD_MAP.deep;
  if (v.includes("adventurous") || v.includes("spontaneous")) return MOOD_MAP.adventurous;
  if (c === "chill" || v.includes("chill") || v.includes("cozy")) return MOOD_MAP.chill;
  if (v.includes("romantic")) return MOOD_MAP.intimate;
  return MOOD_MAP.chill;
};
const BTIERS=[{label:"Under $20",max:20,color:T.green,tag:"FREE-ISH"},{label:"Under $50",max:50,color:T.primary,tag:"SWEET SPOT"},{label:"Under $100",max:100,color:T.yellow,tag:"SWEET SPOT"},{label:"$100+",max:9999,color:T.accent,tag:"SPLURGE"}];
const getTier=(p)=>p<=20?BTIERS[0]:p<=50?BTIERS[1]:p<=100?BTIERS[2]:BTIERS[3];



const DRESS_HINTS={outdoor:"Wear something comfortable and layered. Sneakers or boots recommended.",food:"Casual is perfect. Nothing too fancy.",adventure:"Dress for movement . comfortable shoes, clothes you can be active in.",creative:"Wear something you don't mind getting a little messy.",nightlife:"Dress to impress. Something you feel good in.",chill:"Cozy vibes . your comfiest cute outfit.",romantic:"Wear something that makes you feel confident 😏",meaningful:"Come as you are. Comfortable and real."};

const RED_HERRINGS=[
  "Might want to stretch beforehand... or maybe not 🤷‍♂️",
  "Hope you're not afraid of the dark...",
  "You might want to practice your poker face",
  "Don't eat too much beforehand. Or do. I'm not the boss of you.",
  "I'd say bring a jacket... but I might just be messing with you",
  "Hope you've been working on your balance 😏",
  "You'll want your phone charged for this one",
  "Let's just say... plan to be impressed",
  "I hope you like surprises. That's all I'm saying.",
  "Bring your A-game. That's your only hint.",
  "You might want to Google something before tonight... but I won't tell you what",
  "All I'll say is: trust me on this one",
];

const HYPE_TEMPLATES={
  night_before:[
    "Hey, might be a good time to let them know you're looking forward to tomorrow",
    "Quick text tonight could build some anticipation for tomorrow's date",
    "A simple 'excited for tomorrow' text goes a long way",
  ],
  morning_of:[
    "Morning! Today's the day. A quick text to build some hype would be solid",
    "They're probably wondering what you have planned. A short message would be 🔥",
    "Good time to drop a hint or just let them know you're thinking about tonight",
  ],
  hour_before:[
    "Almost time! Last chance to build the anticipation before you see her",
    "One hour out. A 'get ready' text would hit right about now",
    "Final countdown! Let them know it's almost go time",
  ]
};
const SUGGESTED_TEXTS={
  night_before:[
    "Can't stop thinking about tomorrow night 😏",
    "You're gonna want to clear your schedule tomorrow evening… just saying 😉",
    "Fair warning, tomorrow's gonna be a good one 🔥",
    "I've got something planned for us tomorrow and I'm way too excited",
    "Don't make any plans tomorrow night. You're mine 😏",
  ],
  morning_of:[
    "Tonight's gonna be fun. Trust me 😏",
    "I've been looking forward to this all week",
    "Hope you're ready for tonight 👀",
    "Just a heads up, you might want to dress up tonight 😉",
    "Counting down the hours til I see you ❤️",
  ],
  hour_before:[
    "Almost ready? I'm coming for you 😏",
    "One hour. Get ready 🔥",
    "I'm so hyped for tonight. See you soon ❤️",
    "On my way soon, you better be ready 👀",
    "T-minus 60 minutes. Don't be late 😉",
  ]
};

const DATES=[
{id:"d01",title:"Stargazing Picnic",description:"Pack a blanket, snacks, and a star map app. Drive somewhere with minimal light pollution, lay out under the sky, and find constellations together.",category:"outdoor",budget:15,difficulty:"easy",duration:180,vibe:["romantic","chill","adventurous"],instructions:["Check a light pollution map and pick a dark spot within 30 min drive","Pack a blanket, pillows, snacks, and warm drinks in a thermos","Download a stargazing app like SkyView or Star Walk","Drive out around sunset so you can watch the transition","Lay out the blanket, get cozy, and start finding constellations","Challenge each other to find specific stars or make up your own constellations"],materials:[{name:"Picnic blanket",price:20},{name:"Star map app",price:0}],variations:["Beach version . listen to waves while stargazing","Backyard version with a projector as backup if cloudy","Add a telescope for next-level stargazing"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d02",title:"Sunset Hike + Peak Snacks",description:"Find a local trail with a great viewpoint. Time it so you reach the top right at golden hour. Pack their favorite snacks and drinks for the summit.",category:"outdoor",budget:10,difficulty:"moderate",duration:180,vibe:["adventurous","athletic","romantic"],instructions:["Research trails near you with good sunset views","Check sunset time and plan to reach the peak 20 min before","Pack a daypack with snacks, water, and a small speaker","Hit the trail . keep the pace comfortable","Set up your snack spread at the top","Watch the sunset together before heading down"],materials:[{name:"Trail snack box",price:15},{name:"Compact speaker",price:20}],variations:["Sunrise version . bring coffee and pastries","Night hike with headlamps during full moon","Lake hike . find a trail that ends at water"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d03",title:"Thrift Store Challenge",description:"Each person gets $10 and 20 minutes to find the other person the best/funniest outfit. Then you wear what they picked for dinner. Guaranteed laughs.",category:"adventure",budget:25,difficulty:"easy",duration:150,vibe:["playful","competitive","spontaneous"],instructions:["Pick a thrift store you haven't been to","Set the rules: $10 budget, 20 min timer, full outfit","Split up and hunt for each other's outfit","Meet at the dressing rooms and reveal","Put on your new looks and hit a casual dinner spot","Take photos to remember the ridiculousness"],materials:[],variations:["Formal edition . thrift store formal wear for nice dinner","Decade theme . dress each other in a specific era","Double down . accessories and shoes included"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d04",title:"Cook-Off Battle",description:"Pick a dish, buy the same ingredients, and each make your own version. Blind taste test at the end. Loser does dishes.",category:"food",budget:30,difficulty:"moderate",duration:150,vibe:["playful","competitive","hands-on"],instructions:["Agree on a dish . tacos, pasta, stir-fry","Shop together but keep recipe plans secret","Set up stations on opposite sides of the kitchen","Set a timer . 45 min to cook","Plate up and do a blind taste test","Crown the winner . loser does all the dishes"],materials:[{name:"Matching aprons",price:15}],variations:["Mystery basket . pick 5 random ingredients, must use all","Dessert edition . bake-off style","Cultural exchange . each pick a cuisine neither has tried"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d05",title:"Wine & Paint Night (Home)",description:"Skip the overpriced studio. Get canvases, paint, and wine. Pull up a YouTube tutorial and paint side by side. It's about the process, not the product.",category:"creative",budget:35,difficulty:"easy",duration:120,vibe:["creative","romantic","chill"],instructions:["Get two canvases, acrylic paint set, and brushes","Pick a YouTube paint tutorial you both like","Open a bottle of wine and set up stations","Follow the tutorial together, no peeking","Reveal your paintings at the end","Rate and sign each other's work"],materials:[{name:"Canvas 2-pack",price:12},{name:"Acrylic paint set",price:10},{name:"Brush set",price:8}],variations:["Paint each other's portraits (hilarity guaranteed)","Pottery painting at a local studio","Bob Ross episode . follow along with The Joy of Painting"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d06",title:"Bookstore Date + Coffee",description:"Spend an hour wandering a bookstore. Each person picks a book for the other based on what you think they'd love. Grab coffee after and explain your picks.",category:"chill",budget:40,difficulty:"easy",duration:120,vibe:["intellectual","chill","romantic"],instructions:["Find a good independent bookstore","Set a rule: pick one book for the other person","Wander separately for 30-45 min","Meet at the coffee shop inside or nearby","Exchange books and explain why you chose each one","Start reading a chapter together over coffee"],materials:[],variations:["Record store version . pick an album for each other","Library version . totally free","Add a journal . write notes to each other inside the book"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d07",title:"Homemade Pasta from Scratch",description:"Making fresh pasta together is easier than you think and way more impressive than DoorDash. Rolling and cutting the dough together is oddly romantic.",category:"food",budget:15,difficulty:"moderate",duration:150,vibe:["romantic","hands-on","intimate"],instructions:["Get 00 flour (or all-purpose), eggs, salt, olive oil","Make a flour well, crack eggs in center, mix with a fork","Knead dough for 8-10 min until smooth","Rest dough 30 min under a towel","Roll thin with rolling pin or pasta roller","Cut into fettuccine or whatever shape","Boil 2-3 min, toss with simple sauce"],materials:[{name:"Pasta roller",price:25},{name:"00 flour",price:8}],variations:["Ravioli night . filled pasta with ricotta","Gnocchi . potato-based, pillowy goodness","Asian twist . hand-pulled noodles or dumplings"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d08",title:"Outdoor Movie Night",description:"Set up a projector in the backyard. Hang a white sheet, bring blankets and popcorn, and watch a movie under the stars. Way better than regular movie night.",category:"chill",budget:20,difficulty:"easy",duration:180,vibe:["chill","romantic","cozy"],instructions:["Set up a white sheet or portable screen outside","Connect a projector to your laptop","Arrange blankets and pillows on the ground","Make popcorn and grab drinks","Pick a movie you both love","Cuddle up and enjoy the outdoor cinema"],materials:[{name:"Mini projector",price:60},{name:"Portable screen",price:25}],variations:["Drive-in theater . find a real one nearby","Indoor fort version . build a blanket fort","Movie marathon . pick a trilogy"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d09",title:"Cocktail Creation Night",description:"Pick 3-4 cocktail recipes you've never tried. Get ingredients and play bartender for each other. Rate each drink and crown the best mixologist.",category:"food",budget:35,difficulty:"easy",duration:120,vibe:["playful","sophisticated","intimate"],instructions:["Research 3-4 cocktail recipes","Hit the liquor store for spirits, mixers, garnishes","Set up a bar station at home","Take turns being the bartender","Rate each cocktail on a scorecard","Crown the winning drink"],materials:[{name:"Cocktail shaker set",price:18},{name:"Jigger measure",price:6}],variations:["Mocktail version . zero alcohol, still fun","Tiki night . umbrellas and coconuts","Blind taste test . guess the ingredients"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d10",title:"Spa Night at Home",description:"Transform your bathroom into a spa. Face masks, candles, bath bombs, massage oils. Take turns giving each other massages. Self-care meets quality time.",category:"romantic",budget:25,difficulty:"easy",duration:120,vibe:["romantic","intimate","chill"],instructions:["Get face masks, bath bombs, candles, massage oil","Set up bathroom with candles and soft music","Start with a warm bath or foot soak","Apply face masks . take silly selfies","Take turns giving each other massages","Finish with tea or wine and relax"],materials:[{name:"Face mask set",price:12},{name:"Bath bomb set",price:10},{name:"Massage oil",price:8}],variations:["Hair spa . wash and style each other's hair","Mani-pedi exchange . paint each other's nails","Full wellness day . add yoga and meditation"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d11",title:"Food Truck Crawl",description:"Map out 3-4 food trucks in your area. Split dishes at each stop. Walk between spots to burn off calories. Like a progressive dinner but way more fun.",category:"food",budget:40,difficulty:"easy",duration:180,vibe:["adventurous","playful","spontaneous"],instructions:["Google food trucks in your city, pick 3-4","Plan a walkable route between stops","Start with appetizer portions at the first truck","Walk and talk between each stop","Share everything . split each dish 50/50","Pick your overall winner at the end"],materials:[],variations:["International edition . different cuisine each stop","Dessert only . find sweet food trucks","Night market version . find a local night market"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d12",title:"Arcade + Bar Night",description:"Find a barcade or old-school arcade. Challenge each other at classic games. Loser buys the next round. Competitive, fun, and nostalgic.",category:"nightlife",budget:45,difficulty:"easy",duration:180,vibe:["playful","competitive","spontaneous"],instructions:["Find a barcade or arcade near you","Get tokens and start with a classic . air hockey or Pac-Man","Make small bets . loser buys next drink","Try games neither of you have played","Do a photo booth if they have one","End with a co-op game . work together"],materials:[],variations:["Bowling alley with cosmic bowling","Mini golf . outdoor competitive date","Board game café . slower pace, same energy"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d13",title:"Farmers Market Morning",description:"Wake up early, grab coffee, and wander a local farmers market. Sample everything, buy ingredients, then cook brunch together at home.",category:"food",budget:35,difficulty:"easy",duration:180,vibe:["chill","romantic","hands-on"],instructions:["Find your local farmers market","Arrive when it opens for best selection","Sample everything . cheese, fruit, bread, honey","Buy ingredients for a meal to cook together","Grab fresh flowers while you're there","Head home and cook brunch"],materials:[{name:"Reusable market bags",price:12}],variations:["Night market version","Flea market . hunt for vintage finds","Pick-your-own farm . strawberries, apples"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d14",title:"Escape Room",description:"Book an escape room for two. Work together under pressure to solve puzzles before time runs out. Learn about how you communicate as a team.",category:"adventure",budget:60,difficulty:"moderate",duration:90,vibe:["competitive","intellectual","adventurous"],instructions:["Research escape rooms . read reviews","Book a room matching your experience level","Arrive 15 min early for the briefing","Communicate constantly . share every clue","Don't be afraid to ask for hints","Celebrate or commiserate over food after"],materials:[],variations:["At-home escape room kit . cheaper, same fun","Murder mystery dinner","Scavenger hunt . make one around the city"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d15",title:"Pottery / Ceramics Class",description:"Take a pottery class together. Working with clay is genuinely fun and you end up with something to take home. Most studios offer beginner classes.",category:"creative",budget:50,difficulty:"easy",duration:120,vibe:["creative","romantic","hands-on"],instructions:["Search for pottery studios offering couples classes","Book a beginner wheel-throwing class","Wear clothes you don't mind getting dirty","Follow the instructor and experiment","Make something for each other","Pick up fired pieces a week later"],materials:[],variations:["Candle making class . hands-on, less messy","Glass blowing . more advanced, incredible results","At-home air-dry clay . cheaper, more intimate"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d16",title:"Photo Walk Adventure",description:"Pick an unknown neighborhood. Bring a camera and challenge each other to capture 10 specific things: a red door, street art, a dog, etc. Compare photos over dinner.",category:"adventure",budget:15,difficulty:"easy",duration:150,vibe:["creative","adventurous","playful"],instructions:["Pick a neighborhood you haven't explored","Make a list of 10 things to photograph","Walk around for 60-90 min hunting for shots","Stop at any café or shop that looks interesting","Compare photos over dinner or drinks","Pick a winner for each category"],materials:[],variations:["Film camera challenge . disposable cameras","Video version . make a mini travel vlog","Golden hour shoot . chase beautiful light"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d17",title:"Sushi Making at Home",description:"Buy sushi-grade fish, nori, and rice. Watch a tutorial and roll your own sushi. It's messy, fun, and way cheaper than a restaurant. Best roll wins.",category:"food",budget:40,difficulty:"moderate",duration:120,vibe:["hands-on","playful","intimate"],instructions:["Buy sushi-grade fish, nori, sushi rice, rice vinegar","Get fillings: avocado, cucumber, cream cheese, spicy mayo","Cook and season the rice properly","Lay nori on bamboo mat, spread rice thin","Add fillings and roll tightly","Slice with a wet knife and judge each other's rolls"],materials:[{name:"Bamboo rolling mat",price:6},{name:"Sushi rice",price:8}],variations:["Poke bowl version . deconstructed, easier","Ramen from scratch . incredible payoff","Dumpling making . fold and crimp together"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d18",title:"Rooftop / Skyline Drinks",description:"Find the best rooftop bar in your city. Dress up a little, grab a table with a view, and enjoy cocktails while watching the city light up.",category:"nightlife",budget:60,difficulty:"easy",duration:120,vibe:["sophisticated","romantic","intimate"],instructions:["Research rooftop bars . check dress codes","Make a reservation, aim for sunset timing","Dress up a bit . makes it feel special","Arrive before sunset for the best transition","Order signature cocktails and enjoy the view","Stay for the city lights . no phones for an hour"],materials:[],variations:["Hotel lobby bar . same upscale vibe, cheaper","Scenic overlook . bring your own drinks, free","Boat cruise . if your city has a river or harbor"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d19",title:"Volunteer Together",description:"Find a local cause you both care about and volunteer for a day. Doing good together creates a different kind of bond that going out can't match.",category:"meaningful",budget:0,difficulty:"easy",duration:240,vibe:["meaningful","hands-on","intimate"],instructions:["Talk about causes you both care about","Search for local volunteer opportunities","Sign up for a shift together","Show up, work hard, support each other","Reflect over coffee or a meal","Consider making it a regular thing"],materials:[],variations:["Animal shelter . walk dogs, socialize cats","Beach/park cleanup . active + outdoors","Mentoring . tutor or mentor together"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d20",title:"Concert Under the Stars",description:"Check for outdoor concerts, live music in parks, or open mic nights. Bring a blanket. Live music + night air + the right person = magic.",category:"nightlife",budget:30,difficulty:"easy",duration:180,vibe:["romantic","chill","spontaneous"],instructions:["Search for outdoor concerts or open mic nights","Check if you need tickets","Pack a blanket, snacks, and drinks if allowed","Arrive early for a good spot","Dance, sing along, or just sit and listen","Walk around the venue between sets"],materials:[{name:"Compact blanket",price:15}],variations:["Jazz club . intimate, sophisticated","Open mic comedy . laughs guaranteed","Street performer tour . wander and find music"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d21",title:"Game Night Showdown",description:"Board games, card games, video games . pick your weapons. Best of 5 rounds. Loser makes dinner. Add stakes to keep the energy up.",category:"chill",budget:10,difficulty:"easy",duration:150,vibe:["playful","competitive","cozy"],instructions:["Pull out board games, card games, or console","Set up a best-of-5 tournament bracket","Make bets on each round . foot rub, dinner duty","Mix up the games . strategy, luck, and skill","Keep a scoreboard","Crown the champion with a ridiculous trophy"],materials:[{name:"Card game pack",price:10}],variations:["Video game tournament . Mario Kart, Smash Bros","Puzzle race . each do a 500-piece puzzle","Trivia night . quiz each other"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d22",title:"Sunrise Beach Walk",description:"Set the alarm stupid early. Drive to the nearest beach. Watch the sunrise with coffee in hand. Being up before the world makes it your private moment.",category:"outdoor",budget:5,difficulty:"easy",duration:120,vibe:["romantic","intimate","adventurous"],instructions:["Check sunrise time, set alarm 45 min before","Prep coffee in a thermos the night before","Drive to the beach in comfortable clothes","Walk along the water as the sky changes","Find a spot to sit and watch the full sunrise","Stop for breakfast on the way home"],materials:[{name:"Travel thermos",price:15}],variations:["Mountain sunrise . drive to a high point","Lake version . find a dock or pier","City sunrise . rooftop or bridge with skyline"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d23",title:"Build a Blanket Fort",description:"Yes, you're adults. Build a massive blanket fort anyway. Set up a laptop inside, order takeout, and watch movies from your cozy cave. Fun? Absolutely.",category:"chill",budget:20,difficulty:"easy",duration:180,vibe:["playful","cozy","intimate"],instructions:["Gather every blanket, pillow, and cushion","Use chairs, couches, brooms as the frame","Drape blankets to create walls and ceiling","String up fairy lights inside","Set up a laptop and snacks inside","Order takeout and have a movie marathon"],materials:[{name:"Fairy lights",price:8}],variations:["Outdoor version . tent in backyard with extras","Reading fort . books and read to each other","Sleepover style . sleep in the fort all night"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d24",title:"Ice Cream Tour",description:"Map out the best ice cream spots in your area. Hit 3-4 in one afternoon. Split a scoop at each. Rate each place and crown your champion.",category:"food",budget:25,difficulty:"easy",duration:150,vibe:["playful","spontaneous","chill"],instructions:["Research top ice cream shops in your city","Plan a walkable route hitting 3-4 spots","Get a single scoop to share at each","Rate each shop on a scale of 1-10","Walk between stops to pace yourselves","Declare an overall winner"],materials:[],variations:["Coffee shop version . espresso at every café","Donut tour . find the best donuts","Bakery crawl . pastries at each stop"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d25",title:"Karaoke Night (Private Room)",description:"Book a private karaoke room. No judgment, no audience. Belt out favorites, sing duets, and do dramatic performances. The worse you are, the more fun.",category:"nightlife",budget:40,difficulty:"easy",duration:120,vibe:["playful","spontaneous","intimate"],instructions:["Find a karaoke spot with private rooms","Book a room for 1-2 hours","Start with songs you know to warm up","Challenge each other outside comfort zones","Do at least one dramatic duet","Film the best/worst performances"],materials:[],variations:["At-home karaoke . YouTube + bluetooth speaker","Car karaoke . drive around singing","Open mic night . if you're feeling brave"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d26",title:"Progressive Dinner Walk",description:"3-course dinner at 3 different restaurants within walking distance. Apps at one, entrée at another, dessert at a third. Feels special without the tasting menu price.",category:"food",budget:65,difficulty:"easy",duration:180,vibe:["sophisticated","adventurous","romantic"],instructions:["Pick 3 restaurants within walking distance","Plan courses: apps, entrée, dessert","Make reservations for one course at each","Start with appetizers and drinks","Walk to spot two for the main course","Finish with dessert and coffee at spot three"],materials:[],variations:["Bar version . different cocktail at each stop","Ethnic food tour . different cuisine each course","Brunch crawl . breakfast items at 3 cafés"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d27",title:"Couples Massage",description:"Book a couples massage at a local spa. 60 minutes of pure relaxation side by side. Splurge-worthy for a special occasion.",category:"romantic",budget:120,difficulty:"easy",duration:120,vibe:["romantic","intimate","sophisticated"],instructions:["Research spas . read reviews","Book a couples massage (60 or 90 min)","Arrive 15-20 min early","Choose massage type . Swedish, deep tissue","Turn off phones and disconnect","Follow up with quiet dinner to keep the vibe"],materials:[],variations:["Hot spring / thermal bath . if available","Float tank . sensory deprivation, unique","Thai massage . more active, different"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d28",title:"DIY Tie-Dye Party",description:"Get plain white tees and go wild with tie-dye. It's messy, colorful, and you end up with matching custom gear. Put on music and make it an afternoon.",category:"creative",budget:20,difficulty:"easy",duration:150,vibe:["creative","playful","hands-on"],instructions:["Get a tie-dye kit, white t-shirts, rubber bands","Cover workspace with plastic (it WILL get messy)","Twist, fold, and rubber-band shirts into patterns","Apply dye in whatever design you want","Wrap in plastic and let sit overnight","Rinse, wash, and reveal creations next day"],materials:[{name:"Tie-dye kit",price:12},{name:"White t-shirts 2pk",price:10}],variations:["Bleach tie-dye . reverse technique on dark shirts","Fabric painting . more control, artistic","Screen printing . design custom matching shirts"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d29",title:"Bike Ride + Picnic",description:"Rent bikes or use your own and ride to a scenic spot. Pack a simple picnic. The combination of activity, outdoors, and a meal hits every mark.",category:"outdoor",budget:20,difficulty:"moderate",duration:180,vibe:["athletic","romantic","adventurous"],instructions:["Plan a bike route to a scenic park","Pack sandwiches, fruit, cheese, drinks","Rent bikes if needed","Ride at a comfortable pace","Find a perfect picnic spot and set up","Ride back a different route"],materials:[{name:"Bike phone mount",price:10},{name:"Picnic backpack",price:25}],variations:["E-bike rental . cover more ground easily","Kayak + picnic . paddle to a beach","Scenic drive + picnic . for non-bikers"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d30",title:"Outdoor Movie + Bonfire",description:"Find a fire pit or backyard spot. Build a fire, make s'mores, and watch a movie on a laptop or projector. The crackling fire adds a whole other layer.",category:"chill",budget:25,difficulty:"moderate",duration:240,vibe:["romantic","cozy","adventurous"],instructions:["Find a spot with a fire pit","Gather firewood and fire-starting supplies","Set up seating with chairs or thick blankets","Get s'mores supplies","Start the fire while setting up the movie","Roast marshmallows and watch by firelight"],materials:[{name:"Fire starter kit",price:8},{name:"Roasting sticks",price:10},{name:"S'mores kit",price:12}],variations:["No-movie version . bonfire + conversation cards","Beach bonfire . if area allows","Camping overnight . extend into full experience"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d31",title:"Progressive All-Day Date",description:"Stack 5-6 mini dates into one epic day . lunch, ice skating, geocaching, bowling, dinner, and a movie. The variety keeps energy high and shows serious effort.",category:"adventure",budget:280,difficulty:"hard",duration:660,vibe:["romantic","adventurous","playful"],instructions:["Start the day with flowers . set the tone right","Start with a casual lunch spot","Hit an ice skating rink . hold hands the whole time","Try geocaching in a nearby park for an adventure break","Bowling next . keep it competitive","Dinner reservation at their favorite type of restaurant","Back to your place for a movie with snacks and blankets"],materials:[{name:"Fresh flowers + vase",price:40},{name:"Ice skating tickets (2)",price:25},{name:"Geocaching app",price:0},{name:"Movie snack pack",price:25}],variations:["Spring version . swap skating for kayaking or mini golf","Budget version . picnic, hike, park games, home-cooked dinner","Rainy day . museum, bowling, arcade, cooking together, movie"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d32",title:"Kite Flying at Sunset",description:"Buy a couple cheap kites, hit a lakefront or beach before sunset, and fly them together. It's nostalgic, playful, and the kind of date they'll talk about for years.",category:"outdoor",budget:50,difficulty:"easy",duration:240,vibe:["playful","romantic","chill"],instructions:["Check weather for 8-15 mph sustained wind","Buy two easy-flyer kites","Plan dinner near a lakefront or open field","Eat first, then walk to your kite spot","Start flying . it's harder than you remember and that's the fun","Watch the sunset while your kites are still up","Walk along the water after"],materials:[{name:"Kites 2-pack",price:25},{name:"Picnic blanket",price:26}],variations:["Beach version with a bonfire after","Park version with a packed picnic","Night version with LED kites (they exist)"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d33",title:"Oddities Store Gift Exchange",description:"Find a weird curiosity shop, set a $30 budget, browse separately, and buy each other the strangest gift you can find. You'll learn a lot about each other's humor.",category:"adventure",budget:80,difficulty:"easy",duration:210,vibe:["playful","creative","spontaneous"],instructions:["Find an oddities, antique, or curiosity shop nearby","Set rules: $20-40 budget each, browse separately, no peeking","Split up and think about what would make them laugh","Meet at the register and don't reveal yet","Walk to a nearby cafe","Do a formal gift exchange over coffee . explain your pick"],materials:[{name:"Polaroid camera + film",price:85},{name:"Shadow box frame",price:20}],variations:["Antique mall version . find the weirdest vintage item","Flea market edition . even cheaper and weirder finds","Online version . each browse Etsy 'oddities' and order for the other"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d34",title:"Silent Communication Day",description:"Spend an entire day together without speaking. Communicate only through gestures, expressions, and written notes. It's harder than it sounds and deeply connecting.",category:"adventure",budget:60,difficulty:"hard",duration:720,vibe:["intimate","creative","adventurous"],instructions:["Agree on start time . silence begins immediately","Cook breakfast together using only gestures","Go for a nature walk . point at things you notice","Have a silent picnic in a park","Visit an art museum . write reactions on a notepad","Paint or draw together at home","Cook dinner as a team, still silent","End silence over dessert and talk about the experience"],materials:[{name:"Small whiteboards (2)",price:12},{name:"Notepad + pens",price:15}],variations:["Half-day version . silence from morning to lunch","Add charades or Pictionary in the evening","Journal version . write letters to each other throughout the day"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d35",title:"Tiki Torch Beach Picnic",description:"Set up a picnic on the beach or lakefront surrounded by tiki torches at sunset. It looks straight out of a movie and the photos will be unreal.",category:"outdoor",budget:160,difficulty:"moderate",duration:210,vibe:["romantic","intimate","adventurous"],instructions:["Scout your spot earlier in the day . flat, scenic, semi-private","Arrive 90 min before sunset to set up","Lay the waterproof blanket and arrange pillows","Place 4-6 tiki torches in a semi-circle behind you","Unpack the picnic basket and set up the speaker","Light torches as the sun starts going down","Eat, talk, and watch the sunset","Stay for the full torch-lit ambiance after dark","Pack up carefully . extinguish all torches"],materials:[{name:"Tiki torches 6-pack",price:35},{name:"Torch fuel",price:18},{name:"Waterproof blanket",price:28},{name:"Picnic basket",price:45}],variations:["Backyard version . tiki torches work anywhere","Candle version . battery LED candles instead of torches","Add a projector for outdoor movie after dinner"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d36",title:"Ice Skating + Hot Chocolate",description:"Classic winter date done right. Skate together, hold hands the whole time, then warm up with gourmet hot chocolate. Simple but it never misses.",category:"outdoor",budget:60,difficulty:"easy",duration:150,vibe:["romantic","playful","cozy"],instructions:["Book an outdoor rink on a weekday evening . less crowded, more romantic","Bring hand warmers for both of you","Lace up and get on the ice . hold hands from the start","Don't worry about skill level, falling together is half the fun","Take a bench break halfway through","After skating, head to a cozy cafe or make hot chocolate at home","Add peppermint schnapps if you're feeling it"],materials:[{name:"Skating tickets (2)",price:35},{name:"Hand warmers 10-pack",price:12},{name:"Gourmet hot chocolate kit",price:28}],variations:["Roller skating version for warmer months","Add dinner before at a nearby spot","Hot chocolate bar at home . set out toppings and let them customize"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d37",title:"Geocaching Treasure Hunt",description:"GPS-based treasure hunting for hidden containers all around your city. It's like a real-life video game that gets you exploring places you never knew existed.",category:"adventure",budget:40,difficulty:"moderate",duration:360,vibe:["adventurous","playful","athletic"],instructions:["Download the Geocaching app and find 5-7 caches near each other","Start with an easy one to learn the ropes","Work your way to harder caches . the hunt is the fun part","Bring small trinkets to trade when you find containers","Sign the logbook in each cache","Take photos at each spot","End with lunch or dinner to celebrate your finds"],materials:[{name:"Geocaching app",price:0},{name:"Trade trinkets 20-pack",price:15},{name:"Waterproof backpack",price:28}],variations:["Urban version . city caches hide in creative spots","Hiking version . trail caches with scenic payoffs","Create your own cache and hide it together"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d38",title:"Meteor Shower Beach Night",description:"Check NASA's meteor shower calendar, drive to a dark beach, set up sleeping bags and blankets, and watch shooting stars all night. Peak romance.",category:"outdoor",budget:50,difficulty:"moderate",duration:480,vibe:["romantic","adventurous","intimate"],instructions:["Check NASA for upcoming meteor showers . Perseids (Aug), Geminids (Dec) are best","Use DarkSiteFinder.com to find a low-light-pollution beach","Pack sleeping bags, blankets, pillows, thermos with hot drinks","Arrive by 10pm so your eyes adjust to the dark","Set up camp on the beach . sleeping bags side by side","Download a star map app to identify what you're seeing","Stay until at least 1am for peak activity","Optional: stay for sunrise if you're feeling it"],materials:[{name:"Sleeping bags (2)",price:70},{name:"Telescope",price:70},{name:"Large thermos",price:25}],variations:["Backyard version . less epic but way more convenient","Camping version . combine with an overnight trip","Rooftop version . if you have building access"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d39",title:"Pumpkin Patch + Carving Night",description:"Hit a pumpkin patch, grab some apple cider, do a corn maze, then take your pumpkins home to carve. Roast the seeds and watch a Halloween movie after.",category:"outdoor",budget:50,difficulty:"easy",duration:300,vibe:["playful","cozy","creative"],instructions:["Find a pumpkin patch with extra activities . corn maze, hayride, etc","Pick pumpkins together . one each for carving","Grab apple cider and take photos in the patch","Do the corn maze if they have one","Head home and lay out a tarp for carving","Look up carving templates or go freehand","Scoop seeds and roast them with seasoning","Light candles inside your pumpkins and admire your work"],materials:[{name:"Pumpkin carving kit",price:18},{name:"Tea lights",price:8},{name:"Large tarp",price:12}],variations:["Pumpkin painting instead of carving . less messy","Add a pumpkin pie bake after","Pumpkin decorating contest . judge each other's work"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d40",title:"Apple Picking + Pie Baking",description:"Drive out to an orchard, pick apples together, then come home and bake a pie from scratch. The whole house smells amazing and you eat warm pie with ice cream.",category:"food",budget:45,difficulty:"moderate",duration:300,vibe:["romantic","cozy","hands-on"],instructions:["Find an apple orchard within driving distance","Pick a variety of apples . ask which are best for baking","Grab cider or donuts if the orchard sells them","Head home with your haul","Look up a simple apple pie recipe together","Peel, slice, and prep apples as a team","Assemble and bake the pie","While it bakes, relax together . the smell alone is a vibe","Serve warm with vanilla ice cream"],materials:[{name:"Pie dish",price:10},{name:"Rolling pin",price:12},{name:"Vanilla ice cream",price:8}],variations:["Caramel apples instead of pie","Apple crisp . easier and just as good","Apple cider donuts from scratch"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d41",title:"Bath Cocktails & Deep Talks",description:"Fill the tub, mix cocktails, float some LED lights, and have one of those conversations that goes on for hours. Intimate, low-effort, high-reward.",category:"chill",budget:55,difficulty:"easy",duration:150,vibe:["intimate","romantic","chill"],instructions:["Clean the bathroom . set the mood right","Fill the tub and drop in a bath bomb or two","Float waterproof LED lights for ambiance","Mix cocktails or open a bottle of wine","Set up a bath caddy with drinks and snacks","Queue up a chill playlist on a waterproof speaker","Get in and start talking . no agenda, just vibes","Let the conversation go wherever it goes"],materials:[{name:"Bath caddy tray",price:28},{name:"LED floating lights",price:16},{name:"Luxury bath bombs",price:22},{name:"Silicone wine glasses (2)",price:14}],variations:["Non-alcoholic version . fancy mocktails or tea","Add conversation cards for deeper prompts","Outdoor hot tub version if you have access"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d42",title:"Adventure Challenge Book",description:"Scratch off a mystery date from the Adventure Challenge book . you don't know what it is until you commit. Document it with the built-in photo spot.",category:"adventure",budget:50,difficulty:"easy",duration:180,vibe:["spontaneous","playful","adventurous"],instructions:["Buy the Couples Edition of the Adventure Challenge","Pick a date night and scratch off the next challenge","Read the instructions together . no backing out","Gather whatever supplies you need","Complete the challenge as a team","Take the required photo for the book","Rate the experience together","Plan when you'll scratch off the next one"],materials:[{name:"Adventure Challenge Couples Edition",price:45}],variations:["In-Home Edition for cozy nights in","Outdoor Edition for adventure seekers","Do one a week and document the whole book on social media"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d43",title:"From-Scratch Fancy Dinner",description:"The Nara Smith trend . dress up in your nicest outfits and cook an elaborate from-scratch meal together. Film the transformation from casual to formal. It's a whole vibe.",category:"food",budget:80,difficulty:"hard",duration:240,vibe:["romantic","intimate","hands-on"],instructions:["Pick an ambitious recipe . something you'd normally order at a nice restaurant","Shop for ingredients together earlier in the day","Start cooking in comfortable clothes","Midway through prep, both go get dressed up . full formal","Come back and finish cooking looking like you're going to a gala","Set the table properly . candles, cloth napkins, the works","Plate the food restaurant-style","Sit down and enjoy your creation","Film the before/after transformation if you want"],materials:[{name:"Cloth napkins",price:12},{name:"Taper candles + holders",price:18},{name:"Nice ingredients",price:50}],variations:["Themed cuisine night . French, Italian, Japanese","Dessert-only version . make something insanely elaborate","Potluck style . each person makes one course in secret"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d44",title:"Deep Talk Card Night",description:"Grab a set of conversation cards like 'We're Not Really Strangers' and work through all three levels. Goes from icebreakers to genuinely vulnerable territory. Powerful stuff.",category:"chill",budget:30,difficulty:"easy",duration:150,vibe:["intimate","romantic","intellectual"],instructions:["Buy a conversation card deck . We're Not Really Strangers is the best","Set up a cozy spot . couch, floor pillows, blankets","Put phones in another room completely","Pour drinks and get comfortable","Start with Level 1 . perception and surface stuff","Move to Level 2 . deeper connection questions","Level 3 gets vulnerable . skip any that feel too heavy","After, discuss what surprised you about each other's answers"],materials:[{name:"We're Not Really Strangers",price:25},{name:"Floor pillows (4)",price:60}],variations:["Add blindfolds . Love Is Blind style, heightens focus on words","TableTopics Couples Edition for lighter vibes","Write your own questions for each other"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d45",title:"Target Run Date",description:"Each person gets $20 and 15 minutes to buy the other person a gift, a snack, and something fun. Meet at checkout, reveal everything, and enjoy your haul together.",category:"chill",budget:45,difficulty:"easy",duration:90,vibe:["playful","spontaneous","competitive"],instructions:["Drive to Target (or Walmart, whatever's nearby)","Set rules: $20 each, 15 minutes on the clock, buy 3 things","Categories: a gift, a snack, and a wildcard","Split up and start shopping . timer is real","Meet at self-checkout","Don't look at each other's stuff yet","Get in the car and do a formal reveal one item at a time","Enjoy the snacks on the drive home"],materials:[],variations:["Dollar store version . $5 budget, even more creative","Grocery store edition . buy ingredients for dinner","Themed round . everything has to be one color"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d46",title:"Build-A-Bear Date",description:"Yes, seriously. Go to Build-A-Bear, pick animals for each other, stuff them, dress them up, and swap. It's wholesome, nostalgic, and they'll keep that bear forever.",category:"adventure",budget:70,difficulty:"easy",duration:90,vibe:["playful","romantic","cozy"],instructions:["Go to a Build-A-Bear Workshop at your local mall","Each person picks an animal for the other . keep it secret","Stuff them at the station together","Add a sound or scent if you want","Pick outfits for each other's bears","Fill out the birth certificates . give them funny names","Swap bears as gifts","Get lunch at the mall food court after"],materials:[],variations:["Stuffed animal + dinner combo . Build-A-Bear then nice restaurant","Add a handwritten note inside the bear before stuffing","Online version for long-distance . ship to each other"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d47",title:"Indoor Fairy Light Picnic",description:"Transform your living room into a magical picnic spot with fairy lights everywhere, floor pillows, a blanket spread, and a full picnic basket. No weather required.",category:"chill",budget:60,difficulty:"easy",duration:180,vibe:["romantic","cozy","intimate"],instructions:["Clear the living room floor","Hang fairy lights around the perimeter and drape over furniture","Create a 'canopy' overhead if possible","Lay a big picnic blanket in the center","Arrange floor pillows and cushions","Prep a picnic basket . charcuterie, fruit, sandwiches, wine","Turn off all other lights . fairy lights only","Set up a small speaker for background music","Sit on the floor, eat slowly, and just be present"],materials:[{name:"Fairy lights 33ft (2-3 strands)",price:45},{name:"Oversized floor pillows (4)",price:70},{name:"Wicker picnic basket",price:35}],variations:["Outdoor version . string lights in the backyard","Breakfast edition . fairy lights + pancakes in the morning","Movie version . add a laptop and watch something after eating"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d48",title:"Cozy Read-Aloud Night",description:"Pick a book you're both into, get under the covers, and take turns reading chapters to each other. It's quiet, intimate, and you'll both look forward to the next session.",category:"chill",budget:20,difficulty:"easy",duration:150,vibe:["intimate","cozy","intellectual"],instructions:["Choose a book together . mystery, fantasy, or romance work best","Change into pajamas and make tea or hot chocolate","Set up your reading spot . bed, couch, or floor pillows","Dim the lights, light a candle","Decide who reads first . switch every chapter","Use different voices for characters if you're feeling it","Pause to react or discuss what's happening","Bookmark your spot and plan your next reading night"],materials:[{name:"Book you'll both enjoy",price:15},{name:"Reading lamp",price:28}],variations:["Poetry night . take turns reading poems you love","Audiobook version . listen together in the dark","Write to each other . each write a short story and read it aloud"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d49",title:"Scavenger Hunt to Your Spots",description:"Create a personalized scavenger hunt through 5-8 places that mean something to your relationship. End at the spot where you first kissed with a picnic setup waiting.",category:"adventure",budget:120,difficulty:"hard",duration:300,vibe:["romantic","adventurous","playful"],instructions:["Map out 5-8 meaningful locations . where you met, first date, first kiss, etc","Write clues for each location . riddles that reference your shared memories","Put each clue in a decorative envelope","Plant the envelopes at each location the morning of","Set up a surprise picnic or dinner at the final spot","Give them the first clue and let the adventure begin","Follow along or let friends drive them between spots","Be waiting at the final location for the big reveal"],materials:[{name:"Decorative envelopes (10)",price:12},{name:"Calligraphy pens",price:15},{name:"Picnic supplies",price:45}],variations:["Photo scavenger hunt . clue is a cropped photo of each location","QR code version . they scan codes that play video messages from you","Collaborative . you each make a hunt for the other on the same day"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d50",title:"Restaurant at Home",description:"Transform your dining room into a restaurant . printed menus, dress code, candlelight, courses, the whole thing. Cook a 3-course meal and play the waiter.",category:"food",budget:80,difficulty:"hard",duration:240,vibe:["romantic","intimate","creative"],instructions:["Plan a 3-course menu . appetizer, main, dessert","Design and print a menu with your restaurant name on it","Set the table with cloth napkins, candles, and real plates","Create a playlist of jazz or ambient restaurant music","Get dressed up . this is a fancy dinner","Prep as much as possible beforehand so you're not stuck cooking","Serve each course with a short description like a real waiter","Clear plates between courses","End with dessert and a nightcap"],materials:[{name:"Cloth napkins set",price:12},{name:"Taper candles + holders",price:18},{name:"Menu card stock",price:10}],variations:["Themed restaurant . Italian, French, Japanese","Invite another couple for a double date dinner party","Blind tasting . blindfold them for one course"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d51",title:"Blindfolded Taste Test",description:"Blindfold each other and do a taste test . chocolate, cheese, wine, hot sauces, whatever. Guess what you're eating. It's funnier than you'd expect.",category:"food",budget:40,difficulty:"easy",duration:90,vibe:["playful","intimate","competitive"],instructions:["Pick a category . chocolate, cheese, chips, hot sauces, wine, soda","Buy 6-8 varieties of your chosen category","Set up stations at the table","Blindfold your partner (or use a sleep mask)","Feed them small bites of each . no peeking","They guess the brand or flavor","Switch roles","Keep score . loser makes dinner next time"],materials:[{name:"Silk blindfolds (2)",price:12},{name:"Tasting variety pack",price:25}],variations:["International snack version . treats from different countries","Homemade vs. store-bought . can they tell the difference?","Spicy edition . hot sauce ladder, see who taps out first"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d52",title:"Recreate Your First Date",description:"Go back to where it all started . same restaurant, same activity, same everything. But this time you know each other. It hits completely different the second time around.",category:"adventure",budget:75,difficulty:"moderate",duration:180,vibe:["romantic","intimate","nostalgic"],instructions:["Think back to your first date . where did you go, what did you do?","Make the same reservation or visit the same spot","Try to order the same things if you remember","Wear something similar to what you wore that night","Talk about what you were thinking and feeling the first time","Compare then vs. now . what's changed, what hasn't","Take a photo in the same spot if possible","Add one new element to the end . something you couldn't have done on a first date"],materials:[],variations:["Recreate your first kiss moment","Recreate the day you met if it wasn't a formal date","Ask friends who were there to share their perspective of you two early on"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d53",title:"Tech-Free 24-Hour Challenge",description:"Lock both phones in a drawer for a full day. No screens, no notifications, no distractions. Just each other. It's harder than you think but incredibly rewarding.",category:"adventure",budget:30,difficulty:"hard",duration:1440,vibe:["intimate","adventurous","chill"],instructions:["Agree on a start time . commit fully, no cheating","Put phones, tablets, laptops in a drawer or box","Plan analog activities: board games, cooking, walking, reading, drawing","Make breakfast together without a recipe . wing it","Go for a walk with no destination in mind","Play cards or board games in the afternoon","Cook dinner together . no looking up recipes","Talk about what you noticed without the screen distraction","Retrieve phones the next morning and compare screen time data"],materials:[{name:"Board games",price:20},{name:"Card games",price:10}],variations:["Half-day version if 24 hours feels too intense","Camping trip . nature enforces the no-tech rule","Add journaling . write to each other during the day"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d54",title:"Haunted House Date",description:"Go to a haunted house or haunted hayride together. You'll grab each other, you'll both scream, and you'll be laughing about it over drinks after. Fear is a bonding agent.",category:"adventure",budget:60,difficulty:"easy",duration:150,vibe:["adventurous","playful","spontaneous"],instructions:["Find a haunted house or haunted attraction near you","Go on a weeknight if possible . shorter lines","Eat dinner before . you don't want to go on an empty stomach","Hold hands going in . trust me","Don't try to be too tough . screaming together is the point","Take photos in the lobby before and after","Hit a bar or dessert spot after to debrief","Rank the scariest moments together"],materials:[],variations:["Haunted hayride for a less intense option","Horror movie marathon at home if no haunted houses nearby","Escape room with a horror theme"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d55",title:"Fall Foliage Hike + Cider",description:"Find a trail known for fall colors, hike to a scenic overlook, and bring a thermos of hot apple cider. Timing it with peak foliage makes it feel like a movie.",category:"outdoor",budget:20,difficulty:"easy",duration:180,vibe:["romantic","adventurous","chill"],instructions:["Research local trails with the best fall colors","Check a fall foliage tracker for peak timing","Make or buy hot apple cider and fill a thermos","Pack light snacks . apple cider donuts are on theme","Drive out to the trailhead","Hike at a comfortable pace . stop for photos at scenic spots","Find a nice overlook and sit down with your cider","Take photos of each other with the colors behind you"],materials:[{name:"Large thermos",price:25},{name:"Apple cider",price:8}],variations:["Spring version . cherry blossom or wildflower trails","Add a picnic at the summit","Leaf pressing . bring a book and press pretty leaves as keepsakes"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d56",title:"Museum Day + Wine Bar",description:"Pick a museum neither of you has been to . art, science, history, whatever. Wander through with no rush, then walk to a nearby wine bar to discuss your favorite exhibits.",category:"chill",budget:50,difficulty:"easy",duration:210,vibe:["intellectual","romantic","chill"],instructions:["Find a museum with an interesting current exhibit","Many museums have discounted or free evenings . check the schedule","Don't rush . take your time in each room","Point out things that catch your eye to each other","Take photos of your favorites (where allowed)","Skip sections that don't interest you . no obligation to see everything","Walk to a nearby wine bar or cocktail spot","Discuss favorite pieces . what resonated and why"],materials:[],variations:["Free museum day . many cities have first-Friday free admission","Botanical garden version for outdoor vibes","Aquarium date . same energy, different vibe"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d57",title:"Tiki Torch Sunset Picnic",description:"Set up a beach or lakefront picnic with tiki torches in a semicircle behind you. Eat, watch the sunset, then cuddle under the stars with the torches glowing. Instagram-worthy and deeply romantic.",category:"outdoor",budget:120,difficulty:"moderate",duration:210,vibe:["romantic","intimate","adventurous"],instructions:["Scout a good spot at a beach or lakefront earlier in the day","Arrive about 90 min before sunset to set up","Lay out a waterproof blanket and pillows","Position 4-6 tiki torches in a semicircle behind the blanket","Unpack your picnic food and drinks","Light the torches as the sun starts setting","Eat during golden hour . take photos","After sunset, the torches create an amazing glow","Cuddle and stargaze","Pack up safely . make sure torches are fully extinguished"],materials:[{name:"Tiki torches 6-pack",price:35},{name:"Torch fuel",price:18},{name:"Waterproof blanket",price:28},{name:"Beach pillows",price:30}],variations:["Battery-operated LED torches if fire isn't allowed","Backyard version with string lights added","Add a portable projector for a movie under the stars"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d58",title:"Beach Meteor Shower",description:"Check NASA's meteor shower calendar, drive to a dark beach, set up sleeping bags and blankets, and watch shooting stars all night. Peak romance. Peak memories.",category:"outdoor",budget:100,difficulty:"moderate",duration:480,vibe:["romantic","adventurous","intimate"],instructions:["Check NASA for upcoming meteor shower dates (Perseids in Aug, Geminids in Dec)","Use DarkSiteFinder.com to find a low light pollution beach","Plan for a new moon night for best visibility","Pack sleeping bags, blankets, pillows, and snacks","Arrive around 10pm and set up your spot","Give your eyes 20-30 min to adjust to the dark","Lay back and watch . peak activity is usually midnight-4am","Bring deep conversation topics . life goals, dreams, memories","Optional: stay for sunrise over the water"],materials:[{name:"Sleeping bags 2-pack",price:70},{name:"Inflatable pillows 2-pack",price:22},{name:"Large thermos",price:25}],variations:["Backyard version with a telescope","Mountain overlook instead of beach","Add a portable telescope for planet-gazing between meteors"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d59",title:"Pumpkin Patch + Carving Contest",description:"Hit a pumpkin patch in the fall . hayride, corn maze, apple cider, the whole deal. Pick pumpkins, bring them home, and have a carving competition. Roast the seeds after.",category:"outdoor",budget:60,difficulty:"easy",duration:300,vibe:["playful","seasonal","hands-on"],instructions:["Find a local pumpkin patch with activities","Do the hayride and corn maze first","Pick your pumpkins . one each for the carving contest","Grab apple cider and cider donuts","Head home and lay out a tarp for carving","Set a timer and carve your best designs","Reveal and judge . loser makes hot chocolate","Roast the pumpkin seeds with seasoning","Light candles in the pumpkins and display them"],materials:[{name:"Pumpkin carving kit",price:18},{name:"Tea lights 50-pack",price:8}],variations:["Pumpkin painting instead of carving . less mess","Add a pumpkin pie baking session","Double date version with another couple"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d60",title:"Tequila Bath Talks",description:"Set up the bathtub with LED floating lights, cocktails, and a playlist. Get in together and just talk for hours. It's trending on TikTok for a reason . forced intimacy with zero distractions.",category:"chill",budget:80,difficulty:"easy",duration:120,vibe:["intimate","romantic","chill"],instructions:["Clean the tub . make it spotless","Fill with warm water","Float LED lights in the water","Set up a bath caddy tray across the tub","Make tequila cocktails or whatever you both like","Queue a chill playlist on a waterproof speaker","Get in together","No phones . just talk, laugh, and connect","Refill drinks and warm water as needed","Have cozy robes ready for after"],materials:[{name:"Bath caddy tray",price:28},{name:"LED floating lights",price:16},{name:"Waterproof speaker",price:35},{name:"Silicone wine glasses 2-pack",price:14}],variations:["Wine and cheese version instead of cocktails","Add bath bombs for color and scent","Bring conversation cards for guided deep talks"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d61",title:"Rooftop Projector Movie Night",description:"Set up a projector on your rooftop, balcony, or backyard. Inflatable screen, blankets, pillows, string lights, and a snack station. Your own private outdoor theater.",category:"chill",budget:150,difficulty:"moderate",duration:180,vibe:["romantic","cozy","creative"],instructions:["Set up projector and inflatable screen on rooftop or balcony","Run an extension cord for power","Arrange blankets and pillows for seating","Hang string lights around the viewing area","Set up a snack station . popcorn, candy, drinks","Let them pick the movie","Start after sunset for best picture quality","Cuddle up and enjoy your private theater"],materials:[{name:"Portable projector",price:180},{name:"Inflatable screen",price:40},{name:"String lights 50ft",price:25}],variations:["Indoor version . project onto a blank wall with a blanket fort","Drive-in style . set up in front of your car in a field","Movie marathon . pick a trilogy"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d62",title:"Ask Me Anything Card Night",description:"Get a deep conversation card deck like We're Not Really Strangers, dim the lights, put phones away, and take turns asking each other questions. Starts light, gets deep.",category:"chill",budget:30,difficulty:"easy",duration:120,vibe:["intimate","romantic","intellectual"],instructions:["Get a conversation card deck . We're Not Really Strangers is the best","Set up a cozy space . floor pillows, blankets, soft lighting","Pour drinks and put out snacks","Phones go in another room","Start with Level 1 . light perception questions","Move to Level 2 . deeper connection questions","End with Level 3 . vulnerable and intimate","Discuss what surprised you about each other's answers","No judgment, full honesty"],materials:[{name:"We're Not Really Strangers deck",price:25},{name:"Battery candles 6-pack",price:12}],variations:["TableTopics Couples Edition for lighter vibes","Add blindfolds like Love is Blind . answer without seeing each other","Write your own questions for a more personal version"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d63",title:"Home Spa Night",description:"Transform your bathroom and bedroom into a full spa experience. Face masks, foot soaks, massage oils, robes, cucumber water, the works. Full pampering for both of you.",category:"chill",budget:80,difficulty:"easy",duration:180,vibe:["romantic","intimate","chill"],instructions:["Get matching face masks, massage oil, and a foot spa basin","Set up the bathroom with candles and relaxation music","Start with face masks and cucumber water","Move to foot soaks while you talk","Take turns giving shoulder and back massages","Apply any other skincare products you got","Put on robes and relocate to the bedroom","Finish with a movie or just relax together"],materials:[{name:"Face masks variety 10-pack",price:15},{name:"Massage oil set",price:18},{name:"Foot spa basin",price:35},{name:"Matching robes 2-pack",price:60}],variations:["Add a hair wash and scalp massage session","Make your own face masks with kitchen ingredients","Outdoor version . hot tub if you have access"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d64",title:"Progressive Dinner Crawl",description:"Instead of one restaurant, hit 4-5 spots in one night. Appetizer at one place, soup at another, main course at the third, dessert at the fourth, drinks at the fifth. A culinary tour of your city.",category:"food",budget:150,difficulty:"moderate",duration:240,vibe:["adventurous","playful","romantic"],instructions:["Plan your route . 4-5 restaurants within walking distance","Make reservations or call ahead where needed","Stop 1: Appetizer at a tapas or small plates spot","Stop 2: Soup or salad at a different cuisine","Stop 3: Main course at the best dinner spot on the route","Stop 4: Dessert at a bakery or dessert bar","Stop 5: Nightcap cocktails at a lounge or rooftop bar","Walk between each spot . enjoy the night air","Take a photo at each location"],materials:[],variations:["Ethnic food crawl . different cuisine at each stop","Dessert-only crawl . hit 5 dessert spots","Small town version . hit every restaurant on Main Street"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d65",title:"Build-A-Bear for Couples",description:"Yes, seriously. Go to Build-A-Bear, make stuffed animals for each other, add voice recordings, dress them up, and swap. Wholesome, nostalgic, and way more fun than you'd expect.",category:"creative",budget:100,difficulty:"easy",duration:120,vibe:["playful","romantic","creative"],instructions:["Go to Build-A-Bear at the mall","Pick animals for each other . don't tell what you're choosing","Record a voice message to put inside each other's bear","Stuff them together at the stuffing station","Choose outfits and accessories","Fill out birth certificates with cute names","Swap bears in the food court over lunch","Keep them on your beds as reminders of each other"],materials:[],variations:["Holiday version . make themed bears for each season","Add matching bear outfits","Long distance version . each keep the other's bear for comfort"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d66",title:"MasterChef Home Competition",description:"Buy a mystery basket of random ingredients. Set a 60-minute timer. Each person makes a dish using those ingredients. Judge each other MasterChef-style. Loser does dishes.",category:"food",budget:40,difficulty:"moderate",duration:120,vibe:["competitive","playful","hands-on"],instructions:["Go grocery shopping together for mystery ingredients","Pick 5-7 ingredients that could go multiple ways","Set up separate stations in the kitchen","Start the 60-minute timer","Cook your best dish using the mystery ingredients","Plate it like a pro . presentation matters","Judge each other on taste, creativity, and plating","Crown the winner . loser cleans everything","Eat both dishes for dinner regardless"],materials:[{name:"Matching aprons",price:15},{name:"Kitchen timer",price:8}],variations:["Dessert-only bake off","Cuisine roulette . spin a wheel for which cuisine to cook","Tag team . cook one dish together with alternating 10-min shifts"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d67",title:"Indoor Picnic with Fairy Lights",description:"Clear your living room floor, hang fairy lights everywhere, lay out a picnic blanket and floor pillows, and have an indoor picnic. It transforms a normal room into something magical.",category:"chill",budget:70,difficulty:"easy",duration:180,vibe:["romantic","cozy","creative"],instructions:["Clear the living room floor","Hang fairy lights around the perimeter and overhead","Use command hooks so you don't damage walls","Lay out a picnic blanket in the center","Arrange floor pillows all around","Dim all other lights . fairy lights only","Set up your picnic food . charcuterie, sandwiches, fruit, wine","Play soft music on a speaker","Eat slowly, talk without phones","After dinner . card games, slow dancing, or just cuddle"],materials:[{name:"Fairy lights 33ft 2-pack",price:36},{name:"Floor pillows 4-pack",price:60},{name:"Picnic blanket",price:28}],variations:["Add a blanket fort over the top","Outdoor version on your patio or balcony","Breakfast picnic . do it in the morning with coffee and pastries"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d68",title:"Scavenger Hunt to Meaningful Places",description:"Spend a week creating clues that lead your partner to places that are meaningful to your relationship . first date spot, first kiss location, favorite restaurant. End at a special final spot with a surprise.",category:"adventure",budget:100,difficulty:"hard",duration:300,vibe:["romantic","adventurous","creative"],instructions:["Map out 6-8 locations meaningful to your relationship","Write a clue for each location . riddles or inside jokes work great","Put clues in decorative envelopes numbered in order","Plant the clues at each location ahead of time (or hand each one)","Give them the first clue to start","At each stop, reminisce about the memory there","Take a photo at each location","The final clue leads to a special spot . rooftop, park, restaurant","Have a surprise set up at the final destination . picnic, flowers, or dinner","Tell them why each place matters to you"],materials:[{name:"Decorative envelopes 10-pack",price:12},{name:"Calligraphy pens",price:15}],variations:["Photo scavenger hunt . give photos of locations instead of clues","City-wide version using Uber between spots","Digital version . send clues via text throughout the day"],is_trending:false,is_top_week:true,is_new_release:false},
{id:"d69",title:"Surprise Restaurant at Home",description:"Transform your dining room into a restaurant while your partner is out. Printed menu with their name, table setting with candles, dressed up as the 'waiter,' and a 3-course meal you cooked yourself.",category:"food",budget:80,difficulty:"hard",duration:240,vibe:["romantic","intimate","creative"],instructions:["Plan the menu . appetizer, main course, dessert","Print a custom menu with the restaurant name and their name","Get a tablecloth, candles, and a small flower centerpiece","Cook as much as you can while they're out","Set the table like a real restaurant . cloth napkins, multiple forks","Get dressed up . you're the chef AND the waiter","Greet them at the door with 'Right this way'","Serve each course one at a time with descriptions","Pour wine with a towel over your arm","Play jazz or Italian music in the background"],materials:[{name:"Cloth napkin set",price:15},{name:"Battery candles",price:12},{name:"Small flower centerpiece",price:20}],variations:["Themed cuisine . Italian night, French bistro, sushi bar","Invite another couple and make it a double-date restaurant","Breakfast version . surprise brunch 'cafe' when they wake up"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d70",title:"Nara Smith Dinner Night",description:"Inspired by the TikTok trend. Start in sweats, cook an elaborate from-scratch meal together, then both get dressed up before sitting down to eat. Film the transformation for fun.",category:"food",budget:80,difficulty:"moderate",duration:180,vibe:["romantic","creative","hands-on"],instructions:["Pick an impressive recipe . homemade pasta, beef wellington, something ambitious","Start in your most casual clothes . sweats, messy hair","Cook the whole meal from scratch together","While it's in the oven or resting, both go get ready","Dress up like you're going to a fancy restaurant","Set the table properly . candles, cloth napkins, the works","Sit down to your homemade feast looking amazing","Take before/after photos . the transformation is the content","Eat slowly, toast each other, enjoy what you made"],materials:[{name:"Matching aprons",price:15}],variations:["Film it TikTok style with the transformation reveal","Themed cuisine . pick a country and cook their signature dish","Competitive version . each cook one course"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d71",title:"Message in a Bottle Treasure Hunt",description:"Hide handwritten notes in bottles or envelopes around the house or city. Each one has a memory, compliment, or inside joke plus a clue to the next. The last one reveals a surprise.",category:"adventure",budget:50,difficulty:"moderate",duration:120,vibe:["romantic","creative","playful"],instructions:["Write 8-10 notes . mix memories, compliments, and inside jokes","Put each in a small bottle, envelope, or creative container","Hide them around the house or around your city","Include a clue in each one leading to the next","Give them the first note to start","Watch them find each one and read the reactions","The final note should reveal a surprise . dinner plans, a gift, or your next trip","Save all the notes . they become keepsakes"],materials:[{name:"Small glass bottles 12-pack",price:15},{name:"Scroll-style paper",price:10}],variations:["Digital version . send locations via text with map pins","City-wide with Uber rides between spots","Photo clues instead of written clues"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d72",title:"Sunrise Breakfast Surprise",description:"Wake her up early, drive to a scenic overlook, and watch the sunrise together with coffee and pastries. The effort of getting up early makes it feel incredibly thoughtful.",category:"outdoor",budget:30,difficulty:"easy",duration:120,vibe:["romantic","spontaneous","intimate"],instructions:["Check sunrise time the night before","Set your alarm for 45 min before sunrise . don't hit snooze","Prep coffee in a thermos and grab pastries the day before","Gently wake her up . 'Trust me, it's worth it'","Drive to a scenic overlook, rooftop, or waterfront","Arrive 15-20 min before sunrise","Set out a blanket if needed","Pour coffee and eat pastries while the sky changes","Watch the full sunrise . phones away","Drive to a breakfast spot after, or go back to sleep together"],materials:[{name:"Large thermos",price:25}],variations:["Beach sunrise with a morning swim after","Mountain version . hike to a peak for sunrise","Rooftop version . your building or a friend's"],is_trending:true,is_top_week:false,is_new_release:false},
{id:"d73",title:"Year of Dates Gift",description:"Create 12 envelopes, one for each month, with a date idea and spending money inside each one. They open one per month and you do that date. It's the gift that keeps giving all year.",category:"creative",budget:300,difficulty:"moderate",duration:60,vibe:["romantic","creative","thoughtful"],instructions:["Buy 12 nice envelopes and label them January through December","Plan a date idea for each month . mix budgets and styles","Write the plan on a card inside each envelope","Include cash or a gift card to cover the date cost","Consider seasonal ideas . ice skating in winter, beach in summer","Wrap all 12 envelopes in a box with instructions","They open one envelope at the start of each month","You plan and execute that month's date together","Take a photo from each date for a year-end collage"],materials:[{name:"Decorative envelopes 12-pack",price:15},{name:"Cardstock for plans",price:10}],variations:["52 weeks version . one date per week","Digital version . scheduled emails with plans","Surprise version . they don't know the date until the day of"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d74",title:"Staycation Room Transformation",description:"While your partner is out for the day, completely transform the bedroom into a hotel vibe. New sheets, flowers, chocolates on the pillow, robes hanging up, champagne chilled. They walk in and it's a staycation.",category:"creative",budget:120,difficulty:"moderate",duration:180,vibe:["romantic","intimate","creative"],instructions:["Plan for a day when your partner will be out for a few hours","Strip the bed and put on fresh, crisp white sheets","Add extra pillows and a throw blanket","Put chocolates on the pillow","Set out matching robes","Arrange flowers in a vase on the nightstand","Chill champagne or wine in an ice bucket","Light candles or set up battery candles","Dim the lights, play soft music","When they walk in, greet them with 'Welcome to your staycation'"],materials:[{name:"White sheet set",price:40},{name:"Matching robes 2-pack",price:60},{name:"Pillow chocolates",price:12}],variations:["Full apartment transformation . living room becomes a lounge too","Themed . tropical, Parisian, mountain lodge","Add a bathrobe and slippers at the door like a real hotel"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d75",title:"Backwards Date Night",description:"Do everything in reverse order. Start with dessert, then dinner, then appetizers, then drinks. It's simple but the novelty makes it surprisingly fun and memorable.",category:"food",budget:100,difficulty:"easy",duration:180,vibe:["playful","spontaneous","creative"],instructions:["Pick a restaurant or plan a home-cooked meal","Start with dessert . order the most indulgent thing on the menu","Move to the main course after dessert","Then appetizers or small plates","End with drinks","If at home, cook and serve everything in reverse order","The key is committing to the bit . order confidently","Talk about other things you could do 'backwards' in life","It's a conversation starter with the server too"],materials:[],variations:["Backwards day . wake up with dinner, end with breakfast","Backwards movie night . watch the sequel first","Backwards road trip . start at the destination and work backwards"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d76",title:"Haunted House Double Date",description:"Hit a haunted house or Halloween attraction with another couple. The scares create bonding moments, and the adrenaline makes everything after feel more intense.",category:"adventure",budget:60,difficulty:"easy",duration:150,vibe:["adventurous","playful","spontaneous"],instructions:["Find a local haunted house, corn maze, or Halloween attraction","Invite another couple to make it a double date","Buy tickets in advance . popular ones sell out","Eat dinner together before to build up the nerves","Go through the haunted house . hold each other tight","Laugh about everyone's reactions after","Grab drinks or dessert to decompress","Share your scariest moments and funniest reactions","Take group photos in costume if available"],materials:[],variations:["Ghost tour of your city instead","Scary movie marathon at home as an alternative","Escape room with a horror theme"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d77",title:"Cooking Class at Home (YouTube)",description:"Pick a cuisine neither of you have tried, find a YouTube cooking tutorial, and follow along step by step together. No experience needed . the mistakes are half the fun.",category:"food",budget:40,difficulty:"easy",duration:150,vibe:["hands-on","playful","creative"],instructions:["Pick a cuisine you've never cooked . Thai, Indian, Japanese, Ethiopian","Find a well-rated YouTube tutorial with clear instructions","Make a shopping list from the video and hit the grocery store","Set up your kitchen stations","Follow the tutorial together . pause and rewind as needed","Divide tasks . one chops, one sautés","Taste as you go and adjust","Plate it up like a restaurant","Rate your creation honestly","Save the recipe if it was a hit . add it to your rotation"],materials:[],variations:["Subscription meal kit version . HelloFresh or Blue Apron","Competitive version . each follow a different tutorial, same cuisine","Monthly tradition . new cuisine every month, work through the alphabet"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d78",title:"DIY Outdoor Movie Night",description:"Set up a projector in the backyard, hang a white sheet, arrange blankets and pillows on the ground, and create a snack bar. Your own private drive-in without leaving home.",category:"chill",budget:60,difficulty:"moderate",duration:180,vibe:["romantic","cozy","creative"],instructions:["Hang a white sheet or set up a portable screen in the yard","Set up the projector on a stable surface","Run an extension cord for power","Lay out blankets and pillows for seating","Set up a snack station . popcorn bar with toppings, candy, drinks","Hang string lights around the viewing area","Wait for it to get fully dark before starting","Cuddle up and enjoy . have extra blankets for when it cools down"],materials:[{name:"Portable projector",price:180},{name:"White sheet or screen",price:30},{name:"String lights",price:25}],variations:["Indoor version . project onto a blank wall","Backyard double feature . two movies back to back","Horror movie edition with a bonfire"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d79",title:"Bookstore + Coffee Date",description:"Spend an hour wandering a bookstore separately. Each person picks a book for the other based on what they think they'd like. Meet at the café inside for coffee and swap books.",category:"chill",budget:40,difficulty:"easy",duration:120,vibe:["intellectual","romantic","chill"],instructions:["Go to a bookstore with a good café . Barnes & Noble, indie shop, etc","Browse separately for 30-45 minutes","Find a book you think they would love","Think about their interests, sense of humor, or something new for them","Meet at the café","Order coffee or tea","Exchange books and explain why you picked each one","Read the first chapter together right there","Start a couples reading list"],materials:[],variations:["Library version . free! Check out books for each other","Record store version . pick an album for each other","Comic book shop for a more casual vibe"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d80",title:"Farmers Market + Home Cook",description:"Hit the farmers market early on Saturday, buy whatever looks fresh and interesting . no recipe in mind. Go home and figure out a meal together using only what you bought.",category:"food",budget:45,difficulty:"easy",duration:210,vibe:["hands-on","romantic","spontaneous"],instructions:["Find your local farmers market schedule","Arrive early for the best selection","Walk through the whole market first before buying","Sample everything offered . cheese, bread, fruit, honey","Buy what looks amazing . produce, meats, bread, flowers","Don't plan a recipe . let the ingredients inspire you","Head home and lay everything out","Figure out a meal together based on what you got","Cook and eat your market-fresh creation","Buy flowers for the table while you're there"],materials:[],variations:["Night market version in cities that have them","Challenge mode . $20 budget for the entire meal","Specialty market . Asian, Latin, Italian market for themed cooking"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d81",title:"Paint Pottery Date",description:"Go to a paint-your-own pottery studio. Pick mugs, plates, or figurines and paint them for each other. They fire them and you pick up a finished keepsake a week later.",category:"creative",budget:50,difficulty:"easy",duration:120,vibe:["creative","playful","romantic"],instructions:["Find a local paint-your-own pottery studio","Browse the unpainted pieces . mugs and plates are classic","Pick a piece to paint for each other","Sit across from each other . no peeking","Take your time . this isn't a race","Add personal touches . inside jokes, initials, meaningful symbols","The studio will glaze and fire your pieces","Pick them up a week later . it's like a bonus surprise","Use them daily and think of each other"],materials:[],variations:["Wheel throwing class . make pottery from scratch","At-home version with air-dry clay and acrylic paint","Holiday ornaments . paint ornaments for each other"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d82",title:"Car Karaoke Date",description:"Make a playlist of your favorite duets and guilty pleasures. Drive around with the windows down and belt it out together. Grab drive-through food and keep singing between bites.",category:"chill",budget:20,difficulty:"easy",duration:120,vibe:["playful","spontaneous","fun"],instructions:["Build a shared playlist . duets, throwbacks, guilty pleasures","Get in the car with a full tank of gas","Roll the windows down","Take turns picking songs . no skipping the other person's picks","Drive a scenic route or just cruise around your city","Stop at a drive-through for food","Eat in the car between songs","Film each other's best (worst) performances","Save the playlist . it becomes 'your playlist'"],materials:[],variations:["Actual karaoke bar version with a private room","Home version with a karaoke machine","Theme night . only 90s, only country, only Disney"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d83",title:"Breakfast in Bed Surprise",description:"Wake up before your partner. Make a full breakfast . pancakes, eggs, bacon, fresh juice, coffee. Put it on a tray with a flower from outside. Bring it to bed. They will not forget this.",category:"food",budget:20,difficulty:"easy",duration:60,vibe:["romantic","intimate","thoughtful"],instructions:["Set a quiet alarm to wake up first","Sneak out of bed without waking them","Make their favorite breakfast . go all out","Plate it nicely on a tray . real plate, real silverware","Add a small flower, a napkin, and a note","Bring it to bed and gently wake them up","Eat breakfast together in bed","No rush . stay in bed and enjoy the morning","Clean the kitchen after so they don't have to"],materials:[{name:"Breakfast tray",price:20}],variations:["Brunch version . add mimosas","Weekend tradition . alternate who makes it each week","Picnic version . take the breakfast to the balcony or backyard"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d84",title:"Indoor Camping Night",description:"Set up a tent in the living room . or build a massive blanket fort. Sleeping bags, lanterns, s'mores on the stove, ghost stories, and stargazing through the window. Sleepover vibes.",category:"chill",budget:40,difficulty:"easy",duration:480,vibe:["cozy","playful","romantic"],instructions:["Set up a tent indoors or build an epic blanket fort","Lay out sleeping bags and extra pillows inside","Hang battery-powered lanterns or fairy lights","Make s'mores on the stove . or microwave, no judgment","Tell ghost stories or share childhood camping memories","Play card games by lantern light","Stargaze through the window if it's clear out","Fall asleep inside the tent or fort together","Make pancakes in the morning for the full camping experience"],materials:[{name:"Battery-powered lanterns 2-pack",price:20},{name:"Indoor s'mores maker",price:25}],variations:["Backyard camping . actual tent under the stars","Glamping edition . add wine, cheese, and real pillows","Movie camp . project a movie onto the tent wall from inside"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d85",title:"Dance Class at Home (YouTube)",description:"Find a beginner dance tutorial on YouTube . salsa, bachata, two-step, swing. Push the furniture back and learn together. You'll be terrible and it'll be the most fun you've had in a while.",category:"creative",budget:0,difficulty:"easy",duration:90,vibe:["romantic","playful","hands-on"],instructions:["Pick a dance style . salsa and bachata are easiest to start","Find a beginner YouTube tutorial with good reviews","Push furniture to the edges of the room","Start with basic steps . don't skip the fundamentals","Pause and rewind as much as you need","Laugh at yourselves . that's the point","Once you get the basics, put on a real song and try it","Film a short clip for fun","Practice a few more times throughout the week","Bust it out at the next wedding and shock everyone"],materials:[],variations:["Take an actual dance class at a local studio","TikTok dance version . learn a trending routine together","Slow dance night . no tutorial needed, just hold each other and sway"],is_trending:false,is_top_week:false,is_new_release:true},
{id:"d86",title:"Couple's Photo Shoot at Home",description:"Set up your phone on a tripod, pick a few spots around your home or neighborhood, and take proper photos together. Get dressed up. You'll finally have good couple pics.",category:"creative",budget:15,difficulty:"easy",duration:90,vibe:["romantic","creative","playful"],instructions:["Pick 3-4 spots . bedroom, kitchen, balcony, a cool wall outside","Both get dressed up . coordinate but don't match exactly","Set up a phone tripod or prop your phone up","Use the self-timer or a Bluetooth remote","Try different poses . candid, looking at each other, laughing","Change locations and outfits if you want","Take at least 50 photos . you'll delete most","Pick your favorites and edit them together","Post one and save the rest . you'll treasure these later"],materials:[{name:"Phone tripod with remote",price:15}],variations:["Golden hour version . shoot during sunset for amazing light","Polaroid version . use an instant camera for retro vibes","Themed shoot . decades, movie couples, matching outfits"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d87",title:"Chocolate Tasting Experience",description:"Order a chocolate tasting kit with different varieties from around the world. Follow the included tasting guide, rate each one, and learn about where they come from. Pairs perfectly with wine.",category:"food",budget:55,difficulty:"easy",duration:90,vibe:["romantic","intellectual","intimate"],instructions:["Order a chocolate tasting kit . Taza or similar","Set up a clean tasting area . clear table, water glasses","Pour wine that pairs with chocolate . red works best","Follow the included tasting guide or video class","Taste each chocolate slowly . let it melt on your tongue","Note the flavors . fruity, nutty, bitter, smooth","Rate each one on a scorecard","Compare favorites . see if you agree","Finish with your favorites and more wine","Save the tasting notes as a memento"],materials:[{name:"Taza chocolate tasting kit",price:55},{name:"Wine for pairing",price:20}],variations:["Coffee tasting version . different beans from around the world","Cheese tasting . pair with crackers and honey","Blind version . cover labels and guess origins"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d88",title:"DIY Date Night Box",description:"Make your own date night box. Fill a nice container with a board game, gourmet snacks, a bottle of wine, conversation cards, candles, and a playlist QR code. Open it together on date night.",category:"creative",budget:60,difficulty:"easy",duration:120,vibe:["creative","romantic","cozy"],instructions:["Get a wooden crate or decorative box","Choose a theme . Movie Night, Spa Night, Game Night, Fondue Night","Fill it with everything needed for that theme","Include: activity, snack, drink, conversation prompts, ambiance item","Add a handwritten card explaining the theme","Wrap or close the box","Open it together on date night","Follow the plan inside . no substitutions","Rate the box and plan the next themed one"],materials:[{name:"Wooden crate",price:15},{name:"Board game",price:20}],variations:["Subscription to yourself . make one per month in advance","Exchange boxes . each person makes one for the other","Gift version . make one for a couple you know"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d89",title:"Craft Night",description:"Pick a craft project to do together . candle making, tie-dye, jewelry, resin art, or soap making. Amazon has kits for everything. Make something you'll actually keep and use.",category:"creative",budget:35,difficulty:"easy",duration:120,vibe:["creative","hands-on","chill"],instructions:["Pick a craft . candle making and tie-dye are the most popular","Order a complete kit from Amazon","Set up your workspace . cover surfaces if it's messy","Follow the instructions together","Work on your own pieces side by side","Help each other with tricky steps","Let things dry or set as needed","Show off your finished products","Use or display what you made","Plan the next craft . build a collection"],materials:[{name:"Candle making kit",price:25},{name:"Tie-dye kit",price:15}],variations:["Resin art . make coasters or jewelry","Pottery with air-dry clay","Macramé wall hanging . trending home decor"],is_trending:false,is_top_week:false,is_new_release:false},
{id:"d90",title:"Emergency Date: They're Coming Over",description:"You forgot to plan something and they're coming over in 2 hours. Don't panic. Clean the visible areas, order their favorite takeout, chill wine, light candles, queue Netflix, and put on clean sheets.",category:"chill",budget:40,difficulty:"easy",duration:30,vibe:["spontaneous","romantic","chill"],instructions:["Clean visible areas only . living room, kitchen, bathroom (15 min)","Hide all clutter in the closet . the ancient art","Order takeout from their favorite place","Put on clean sheets . trust me on this","Light a candle or two . instant ambiance","Chill a bottle of wine or their drink of choice","Queue up a movie or show they've been wanting to watch","Fresh towels in the bathroom","Quick shower and clean clothes for you","Grab grocery store flowers if you have time . $10 game changer"],materials:[],variations:["Dessert-only evening . skip dinner, go straight to comfort food","Game night pivot . pull out a board game and snacks","Cook together . 'I was planning for us to cook' (smooth save)"],is_trending:false,is_top_week:false,is_new_release:true},
];

const QUIZ=[
  {id:"q1",sec:"About Them",q:"What's their energy level?",type:"single",opts:["Homebody, loves staying in","Balanced, mix of in and out","Active, always wants to go somewhere","Adventurous, the wilder the better"]},
  {id:"q2",sec:"About Them",q:"What's their ideal Friday night?",type:"single",opts:["Couch + movie + takeout","Dinner at a nice restaurant","Out with friends (bar, club, event)","Something spontaneous and unplanned"]},
  {id:"q3",sec:"About Them",q:"What vibes do they gravitate toward?",type:"multi",opts:["Romantic / intimate","Playful / competitive","Creative / artsy","Athletic / outdoorsy","Intellectual / curious","Chill / low-key","Bougie / sophisticated","Spontaneous / adventurous"]},
  {id:"q4",sec:"About Them",q:"Comfort with physical activities?",type:"single",opts:["Light walks max","Moderate (hiking, biking, skating)","They'll try anything athletic","They're more active than me"]},
  {id:"q5",sec:"Food & Drink",q:"Any food allergies?",type:"multi",opts:["Dairy","Gluten / Wheat","Peanuts","Tree nuts","Shellfish / Fish","Eggs","Soy","Sesame","None"]},
  {id:"q6",sec:"Food & Drink",q:"Food preferences?",type:"multi",opts:["Vegetarian","Vegan","Pescatarian","Keto / Low-carb","No pork","No red meat","Halal","Kosher","No restrictions"]},
  {id:"q7",sec:"Food & Drink",q:"How do they feel about alcohol?",type:"single",opts:["Doesn't drink at all","Occasional, wine or a cocktail","Loves trying new drinks","Can out-drink me"]},
  {id:"q8",sec:"Food & Drink",q:"Cuisine favorites?",type:"multi",opts:["Italian","Mexican","Japanese / Sushi","Thai / Vietnamese","Indian","Mediterranean","American / BBQ","Korean","French","Chinese"]},
  {id:"q9",sec:"Food & Drink",q:"Any food dislikes?",type:"text",ph:"e.g. hates mushrooms, won't eat raw fish..."},
  {id:"q10",sec:"Your History",q:"Best date together so far?",type:"text",ph:"What you did, where you went..."},
  {id:"q11",sec:"Your History",q:"Anything they've mentioned wanting to try?",type:"text",ph:"e.g. pottery class, wine tasting..."},
  {id:"q12",sec:"Budget",q:"Typical date budget?",type:"single",opts:["Under $20","Under $50","Under $100","Over $100","Mix it up"]},
  {id:"q13",sec:"Budget",q:"How often do you want date nights?",type:"single",opts:["1x per month","2x per month","3x per month","Every week"]},
];

// ——— ICS CALENDAR GENERATION ———
function generateICS(title, description, dateStr, timeStr) {
  const dt = new Date(dateStr + "T" + (timeStr || "19:00") + ":00");
  const end = new Date(dt.getTime() + 3 * 3600000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vela//EN
BEGIN:VEVENT
DTSTART:${fmt(dt)}
DTEND:${fmt(end)}
SUMMARY:${title}
DESCRIPTION:${description.replace(/\n/g, "\\n")}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
}

// ——— MYSTERY BOX INVITE MODAL ———
function MysteryInvite({ date, scheduledFor, onClose, onSend }) {
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("19:00");
  const [editing, setEditing] = useState(false);
  const dressHint = DRESS_HINTS[date.category] || "Dress comfortably.";
  const [herring] = useState(() => RED_HERRINGS[Math.floor(Math.random() * RED_HERRINGS.length)]);
  const [desc, setDesc] = useState(`Vela Night ✨\n\n${dressHint}\n\n${herring}\n\nThat's all you get. See you there 😏`);

  const send = () => {
    const ics = generateICS("Vela Night ✨", desc, scheduledFor, time);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const subject = encodeURIComponent("You've got a Vela night 😏");
    const body = encodeURIComponent(desc + "\n\n(Calendar invite attached, check your downloads!)");
    const a = document.createElement("a");
    a.href = url; a.download = "vela.ics"; a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, 800);
    onSend(email);
  };

  const ready = email.includes("@") && email.includes(".");

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
      <div style={{ ...crd(), maxWidth: 480, width: "100%", padding: 30, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 28 }}>📦</span>
          <h3 style={{ color: T.text, fontSize: 20, margin: 0, fontWeight: 700, fontFamily: T.display }}>Mystery Box Invite</h3>
        </div>
        <p style={{ color: T.textDim, fontSize: 13, margin: "0 0 22px" }}>Send a calendar invite with just enough info to prepare, but not enough to know what's happening.</p>

        <p style={{ color: T.textFaint, fontSize: 11, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>Partner's email</p>
        <input type="email" placeholder="partner@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inp(), marginBottom: 16 }} />

        <p style={{ color: T.textFaint, fontSize: 11, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>Date & Time</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ ...inp(), flex: 1, padding: "12px 16px", color: T.text }}>{new Date(scheduledFor + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ ...inp(), flex: 1 }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <p style={{ color: T.textFaint, fontSize: 11, margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>What they'll see</p>
          <button onClick={() => setEditing(!editing)} style={btn("transparent", T.primary, { padding: "4px 10px", fontSize: 11 })}>{editing ? "Done" : "Edit"}</button>
        </div>
        {editing ?
          <textarea value={desc} onChange={e => setDesc(e.target.value)} style={{ ...inp(), height: 140, resize: "vertical", fontFamily: T.font, marginBottom: 16 }} />
          :
          <div style={{ background: T.bg, borderRadius: 10, padding: 16, border: `1px solid ${T.border}`, marginBottom: 16, whiteSpace: "pre-wrap" }}>
            <p style={{ color: T.text, fontSize: 14, margin: 0, lineHeight: 1.6 }}>{desc}</p>
          </div>
        }

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={btn("transparent", T.textDim, { border: `1px solid ${T.border}`, flex: 1 })}>Cancel</button>
          <button onClick={send} disabled={!ready} style={btn(ready ? T.pink : T.border, ready ? "#fff" : T.textFaint, { flex: 1 })}>📧 Send Invite</button>
        </div>
        <p style={{ color: T.textFaint, fontSize: 11, margin: "12px 0 0", textAlign: "center" }}>Downloads a .ics file + opens your email app to send it</p>
      </div>
    </div>
  );
}

// ——— SCHEDULE + MYSTERY FLOW ———
function MiniCalendar({ selected, onSelect }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const sel = selected ? new Date(selected + "T12:00:00") : null;
  const [viewing, setViewing] = useState(() => sel ? new Date(sel.getFullYear(), sel.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewing.getFullYear(); const month = viewing.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = viewing.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const prevMonth = () => setViewing(new Date(year, month - 1, 1));
  const nextMonth = () => setViewing(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d) => d && year === today.getFullYear() && month === today.getMonth() && d === today.getDate();
  const isSel = (d) => d && sel && year === sel.getFullYear() && month === sel.getMonth() && d === sel.getDate();
  const isPast = (d) => d && new Date(year, month, d) < today;

  const pick = (d) => {
    if (!d || isPast(d)) return;
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    onSelect(`${year}-${mm}-${dd}`);
  };

  return (
    <div style={{ background: T.bg, borderRadius: 14, border: `1px solid ${T.border}`, padding: 16, marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <button onClick={prevMonth} style={{ background: "none", border: "none", color: T.textDim, fontSize: 18, cursor: "pointer", padding: "4px 10px" }}>‹</button>
        <span style={{ color: T.text, fontSize: 15, fontWeight: 700 }}>{monthName}</span>
        <button onClick={nextMonth} style={{ background: "none", border: "none", color: T.textDim, fontSize: 18, cursor: "pointer", padding: "4px 10px" }}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, textAlign: "center" }}>
        {dayNames.map(dn => <div key={dn} style={{ color: T.textFaint, fontSize: 11, fontWeight: 600, padding: "6px 0", textTransform: "uppercase" }}>{dn}</div>)}
        {cells.map((d, i) => (
          <button key={i} onClick={() => pick(d)} disabled={!d || isPast(d)} style={{
            background: isSel(d) ? T.primary : isToday(d) ? T.primary + "22" : "transparent",
            color: isSel(d) ? "#fff" : isPast(d) ? T.textFaint + "55" : isToday(d) ? T.primary : d ? T.text : "transparent",
            border: isToday(d) && !isSel(d) ? `1px solid ${T.primary}44` : "1px solid transparent",
            borderRadius: 10, padding: "8px 0", fontSize: 13, fontWeight: isSel(d) || isToday(d) ? 700 : 400,
            cursor: d && !isPast(d) ? "pointer" : "default", transition: "all 0.15s",
            minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center"
          }}>{d || ""}</button>
        ))}
      </div>
      {sel && <p style={{ color: T.primary, fontSize: 13, fontWeight: 600, textAlign: "center", margin: "14px 0 0" }}>
        {sel.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
      </p>}
    </div>
  );
}

function ScheduleModal({ date, onClose, onSchedule }) {
  const [dateStr, setDateStr] = useState(() => {
    const d = new Date(Date.now() + (Math.floor(Math.random() * 14) + 1) * 86400000);
    return d.toISOString().split("T")[0];
  });
  const [showMystery, setShowMystery] = useState(false);
  const [sent, setSent] = useState(false);

  if (!date) return null;
  const tier = getTier(date.budget);

  if (showMystery) return <MysteryInvite date={date} scheduledFor={dateStr} onClose={() => setShowMystery(false)} onSend={(email) => { setSent(true); setShowMystery(false); }} />;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20, overflowY: "auto" }}>
      <div style={{ ...crd(), maxWidth: 440, width: "100%", padding: 30 }}>
        <h3 style={{ color: T.text, fontSize: 20, margin: "0 0 4px", fontWeight: 700, fontFamily: T.display }}>📅 Schedule Date</h3>
        <p style={{ color: T.textDim, fontSize: 14, margin: "0 0 22px" }}>{date.title} <span style={{ color: tier.color }}>· ${date.budget}</span></p>

        <MiniCalendar selected={dateStr} onSelect={setDateStr} />

        <button onClick={() => { onSchedule(date, dateStr); if (!sent) { } onClose(); }} style={{ ...btn(T.primary, "#fff"), width: "100%", padding: "14px 24px", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>✓ Schedule It</button>

        <button onClick={() => setShowMystery(true)} style={{ ...btn(T.pink + "18", T.pink), width: "100%", padding: "14px 24px", fontSize: 15, fontWeight: 600, border: `1.5px solid ${T.pink}44` }}>
          📦 Send a Mystery Invite
        </button>

        {sent && <p style={{ color: T.green, fontSize: 13, textAlign: "center", margin: "12px 0 0", fontWeight: 600 }}>✓ Mystery invite sent!</p>}

        <button onClick={onClose} style={{ ...btn("transparent", T.textDim), width: "100%", marginTop: 12, fontSize: 13 }}>Cancel</button>
      </div>
    </div>
  );
}

// ——— HYPE NOTIFICATIONS PANEL ———
function HypePanel({ notifications, onDismiss, onClose }) {
  const [copied, setCopied] = useState(null);
  const copyText = (id, text) => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(id); setTimeout(() => setCopied(null), 2000); };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "flex-start", justifyContent: "center", zIndex: 999, padding: "60px 20px 20px" }}>
      <div style={{ ...crd(), maxWidth: 440, width: "100%", padding: 0, maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: T.text, fontSize: 18, margin: 0, fontWeight: 700, fontFamily: T.display }}>💡 Build the Anticipation</h3>
            <button onClick={onClose} style={btn("transparent", T.textDim, { padding: "4px 10px", fontSize: 18 })}>✕</button>
          </div>
          <p style={{ color: T.textDim, fontSize: 13, margin: "6px 0 0" }}>Small gestures go a long way. Here are some nudges to build anticipation.</p>
        </div>
        {notifications.length === 0 ?
          <div style={{ padding: 30, textAlign: "center" }}><p style={{ color: T.textDim, fontSize: 14, margin: 0 }}>No reminders right now. Schedule a date and we'll coach you through the buildup.</p></div>
          :
          notifications.map(n => (
            <div key={n.id} style={{ padding: "18px 24px", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <p style={{ color: T.yellow, fontSize: 11, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>{n.timing}</p>
                  <p style={{ color: T.text, fontSize: 15, margin: "0 0 2px", fontWeight: 600 }}>{n.dateTitle}</p>
                  <p style={{ color: T.textDim, fontSize: 12, margin: 0 }}>{n.scheduledDate}</p>
                </div>
                <span style={{ fontSize: 20, marginTop: 2 }}>{n.timing === "Night Before" ? "🌙" : n.timing === "Morning Of" ? "☀️" : "⏰"}</span>
              </div>
              <p style={{ color: T.textDim, fontSize: 14, margin: "0 0 14px", lineHeight: 1.5 }}>{n.message}</p>

              {n.suggestedText && <div style={{ background: T.bg, borderRadius: 10, padding: "12px 14px", marginBottom: 14, border: `1px solid ${T.border}` }}>
                <p style={{ color: T.textFaint, fontSize: 10, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>💬 Try sending this</p>
                <p style={{ color: T.text, fontSize: 14, margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" }}>"{n.suggestedText}"</p>
                <button onClick={() => copyText(n.id, n.suggestedText)} style={{ ...btn(copied === n.id ? T.green + "22" : T.primary + "15", copied === n.id ? T.green : T.primary, { padding: "6px 14px", fontSize: 12, border: `1px solid ${copied === n.id ? T.green + "44" : T.primary + "33"}` }) }}>
                  {copied === n.id ? "✓ Copied!" : "📋 Copy Text"}
                </button>
              </div>}

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => onDismiss(n.id)} style={btn(T.green + "18", T.green, { padding: "7px 14px", fontSize: 12, border: `1px solid ${T.green}33`, flex: 1 })}>👍 Got it</button>
                <button onClick={() => onDismiss(n.id)} style={btn("transparent", T.textDim, { padding: "7px 14px", fontSize: 12, border: `1px solid ${T.border}`, flex: 1 })}>Skip</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ——— QUIZ FLOW ———
function QuizFlow({ onComplete, existing }) {
  const [step, setStep] = useState(0); const [ans, setAns] = useState(existing || {});
  const q = QUIZ[step]; const secs = [...new Set(QUIZ.map(q => q.sec))]; const prog = (step / QUIZ.length) * 100;
  const set = (v) => { if (q.type === "multi") { const c = ans[q.id] || []; setAns({ ...ans, [q.id]: c.includes(v) ? c.filter(x => x !== v) : [...c, v] }); } else setAns({ ...ans, [q.id]: v }); };
  const next = () => { if (step < QUIZ.length - 1) setStep(step + 1); else onComplete(ans); };
  const ok = q.type === "text" ? true : ans[q.id] && (q.type === "multi" ? ans[q.id].length > 0 : true);
  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.font, padding: 20 }}>
      <div style={{ maxWidth: 560, width: "100%", padding: "0 10px" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            {secs.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 600, color: s === q.sec ? T.primary : T.textFaint, textTransform: "uppercase", letterSpacing: 1 }}>{s}</span>)}
          </div>
          <div style={{ height: 4, background: T.surface, borderRadius: 2 }}><div style={{ height: "100%", width: `${prog}%`, background: T.primary, borderRadius: 2, transition: "width 0.3s" }} /></div>
        </div>
        <div style={crd()}>
          <p style={{ color: T.textFaint, fontSize: 12, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>{step + 1} of {QUIZ.length}</p>
          <h2 style={{ color: T.text, fontSize: 21, margin: "0 0 22px", fontWeight: 700, fontFamily: T.display }}>{q.q}</h2>
          {q.type === "single" && <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {q.opts.map(o => <button key={o} onClick={() => set(o)} style={{ ...btn(ans[q.id] === o ? T.primary + "22" : T.bg, ans[q.id] === o ? T.primary : T.textDim), textAlign: "left", border: `1.5px solid ${ans[q.id] === o ? T.primary : T.border}`, padding: "13px 16px" }}>{o}</button>)}
          </div>}
          {q.type === "multi" && <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {q.opts.map(o => { const s = (ans[q.id] || []).includes(o); return <button key={o} onClick={() => set(o)} style={{ ...btn(s ? T.primary + "22" : T.bg, s ? T.primary : T.textDim), border: `1.5px solid ${s ? T.primary : T.border}`, padding: "9px 14px", fontSize: 13 }}>{s ? "✓ " : ""}{o}</button>; })}
          </div>}
          {q.type === "text" && <textarea placeholder={q.ph} value={ans[q.id] || ""} onChange={e => setAns({ ...ans, [q.id]: e.target.value })} style={{ ...inp(), height: 90, resize: "vertical", fontFamily: T.font }} />}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 26, gap: 10 }}>
            <button onClick={() => step > 0 && setStep(step - 1)} style={btn("transparent", T.textDim, { border: `1px solid ${T.border}`, opacity: step === 0 ? 0.3 : 1 })} disabled={step === 0}>Back</button>
            <button onClick={() => { const updated = { ...ans }; delete updated[q.id]; setAns(updated); if (step < QUIZ.length - 1) setStep(step + 1); else onComplete(updated); }} style={btn("transparent", T.textFaint, { border: `1px solid ${T.border}`, fontSize: 13 })}>Skip</button>
            <button onClick={next} style={btn(ok ? T.primary : T.border, ok ? "#fff" : T.textFaint)} disabled={!ok}>{step === QUIZ.length - 1 ? "Finish →" : "Next →"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ——— DEBRIEF MODAL ———
function Debrief({ entry, onSave, onClose }) {
  const [rat, setRat] = useState(0); const [react, setReact] = useState(""); const [notes, setNotes] = useState(""); const [again, setAgain] = useState(null);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
      <div style={{ ...crd(), maxWidth: 460, width: "100%", padding: 30, maxHeight: "90vh", overflowY: "auto" }}>
        <h3 style={{ color: T.text, fontSize: 20, margin: "0 0 4px", fontWeight: 700, fontFamily: T.display }}>How'd It Go?</h3>
        <p style={{ color: T.textDim, fontSize: 14, margin: "0 0 22px" }}>{entry.title}</p>
        <div style={{ marginBottom: 18 }}>
          <p style={{ color: T.textFaint, fontSize: 11, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Their reaction</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["😐 Meh", "🙂 Liked it", "😍 Loved it", "🤩 Best ever"].map((r, i) =>
              <button key={r} onClick={() => { setRat(i + 1); setReact(r); }} style={btn(rat === i + 1 ? T.primary + "22" : T.bg, rat === i + 1 ? T.primary : T.textDim, { border: `1.5px solid ${rat === i + 1 ? T.primary : T.border}`, padding: "8px 10px", fontSize: 12, flex: 1, minWidth: 70 })}>{r}</button>
            )}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <p style={{ color: T.textFaint, fontSize: 11, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Anything they mentioned?</p>
          <textarea placeholder="They said they want to try..." value={notes} onChange={e => setNotes(e.target.value)} style={{ ...inp(), height: 70, resize: "vertical" }} />
        </div>
        <div style={{ marginBottom: 22 }}>
          <p style={{ color: T.textFaint, fontSize: 11, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Do this again?</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[true, false].map(v => <button key={String(v)} onClick={() => setAgain(v)} style={btn(again === v ? (v ? T.green : T.accent) + "22" : T.bg, again === v ? (v ? T.green : T.accent) : T.textDim, { border: `1.5px solid ${again === v ? (v ? T.green : T.accent) : T.border}`, flex: 1 })}>{v ? "👍 Yeah" : "👎 Nah"}</button>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={btn("transparent", T.textDim, { border: `1px solid ${T.border}`, flex: 1 })}>Skip</button>
          <button onClick={() => onSave({ rating: rat, reaction: react, notes, again })} style={btn(T.primary, "#fff", { flex: 1 })}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ——— DETAIL MODAL ———
function Detail({ date: d, onClose, onSchedule }) {
  if (!d) return null;
  const tier = getTier(d.budget); const grad = getGrad(d); const emoji = EMOJI[d.category] || "📌"; const accent = CAT_ACCENT[d.category] || "#fff";
  const mood = getMood(d);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 999 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 600, maxHeight: "92vh", overflowY: "auto", background: T.bg, borderRadius: "20px 20px 0 0" }}>
        <div style={{ background: grad, padding: "32px 24px 28px", position: "relative", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 5, height: "100%", background: `linear-gradient(180deg, ${accent}00 0%, ${accent} 30%, ${accent} 70%, ${accent}00 100%)` }} />
          <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)` }} />
          <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${mood.color}08 0%, transparent 70%)` }} />
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>✕</button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, paddingRight: 44 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>{emoji}</div>
            <div style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: "8px 16px", borderRadius: 12, textAlign: "center", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
              <span style={{ color: tier.color, fontSize: 20, fontWeight: 800, fontFamily: T.font, display: "block", lineHeight: 1.1 }}>${d.budget}</span>
              <span style={{ color: tier.color, fontSize: 9, fontWeight: 700, fontFamily: T.font, letterSpacing: 0.8, opacity: 0.8, textTransform: "uppercase" }}>{tier.tag}</span>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: `${mood.color}18`, border: `1px solid ${mood.color}25`, borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: mood.color, fontFamily: T.font, letterSpacing: 0.5, textTransform: "uppercase" }}>{mood.emoji} {mood.label}</span>
          </div>
          <h2 style={{ color: "#fff", fontSize: 26, margin: "0 0 10px", fontWeight: 800, fontFamily: T.display, textShadow: "0 2px 8px rgba(0,0,0,0.3)", lineHeight: 1.2 }}>{d.title}</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {d.vibe.map(v => <span key={v} style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 6, fontFamily: T.font, border: "1px solid rgba(255,255,255,0.08)" }}>{v}</span>)}
          </div>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: T.font, textTransform: "capitalize" }}>{d.category} · {d.difficulty} · {Math.round(d.duration / 60)}h</span>
        </div>
        <div style={{ padding: "24px 24px 32px" }}>
          <p style={{ color: T.text, fontSize: 15, lineHeight: 1.65, margin: "0 0 24px", fontFamily: T.font }}>{d.description}</p>
          <button onClick={() => { onSchedule(d); }} style={{ ...btn(T.accent, "#fff"), width: "100%", padding: "15px 24px", fontSize: 16, fontWeight: 700, marginBottom: 24, borderRadius: 14 }}>📅 Schedule This Date</button>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: T.text, fontSize: 14, margin: "0 0 14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>Step-by-Step</h4>
            {d.instructions.map((s, i) => <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              <span style={{ flex: "0 0 28px", height: 28, borderRadius: 8, background: T.primary + "18", color: T.primary, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>{i + 1}</span>
              <p style={{ color: T.textDim, fontSize: 14, margin: 0, lineHeight: 1.6, flex: 1 }}>{s}</p>
            </div>)}
          </div>
          {d.materials.length > 0 && <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: T.text, fontSize: 14, margin: "0 0 12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>What You Need</h4>
            {d.materials.map((m, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: T.surface, borderRadius: 10, marginBottom: 8, border: `1px solid ${T.border}` }}>
              <span style={{ color: T.text, fontSize: 14 }}>{m.name}</span>
              <span style={{ color: T.green, fontSize: 14, fontWeight: 600 }}>${m.price}</span>
            </div>)}
          </div>}
          {d.variations.length > 0 && <div style={{ marginBottom: 16 }}>
            <h4 style={{ color: T.text, fontSize: 14, margin: "0 0 12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>Variations</h4>
            {d.variations.map((v, i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ color: T.yellow, fontSize: 14, marginTop: 1 }}>◆</span>
              <p style={{ color: T.textDim, fontSize: 14, margin: 0, lineHeight: 1.5 }}>{v}</p>
            </div>)}
          </div>}
        </div>
      </div>
    </div>
  );
}

// ——— GRADIENT CARD ———
function Card({ date, onClick, grid }) {
  const grad = getGrad(date); const emoji = EMOJI[date.category] || "📌";
  const tier = getTier(date.budget); const accent = CAT_ACCENT[date.category] || "#fff";
  const mood = getMood(date);
  return (
    <div onClick={onClick} style={{ flex: grid ? undefined : "0 0 155px", minWidth: grid ? undefined : 155, height: grid ? 175 : 190, borderRadius: 14, padding: 0, background: grad, cursor: "pointer", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", scrollSnapAlign: "start", boxShadow: "0 4px 24px rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Right accent bar */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 3, height: "100%", background: `linear-gradient(180deg, ${accent}00 0%, ${accent} 30%, ${accent} 70%, ${accent}00 100%)`, borderRadius: "0 14px 14px 0" }} />
      {/* Decorative glow orbs */}
      <div style={{ position: "absolute", top: -30, right: -30, width: grid ? 80 : 100, height: grid ? 80 : 100, borderRadius: "50%", background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", bottom: -20, left: -20, width: 70, height: 70, borderRadius: "50%", background: `radial-gradient(circle, ${mood.color}08 0%, transparent 70%)` }} />
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: grid ? "10px 10px 0" : "12px 12px 0" }}>
        <div style={{ width: grid ? 32 : 36, height: grid ? 32 : 36, borderRadius: 10, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: grid ? 15 : 17, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>{emoji}</div>
        <div style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: "4px 9px", borderRadius: 8, textAlign: "center", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          <span style={{ color: tier.color, fontSize: 11, fontWeight: 800, fontFamily: T.font, display: "block", lineHeight: 1.1 }}>${date.budget}</span>
          <span style={{ color: tier.color, fontSize: 6, fontWeight: 700, fontFamily: T.font, letterSpacing: 0.8, opacity: 0.8, textTransform: "uppercase" }}>{tier.tag}</span>
        </div>
      </div>
      {/* Content */}
      <div style={{ marginTop: "auto", padding: grid ? "0 10px 10px" : "0 12px 12px" }}>
        {/* Mood pill */}
        <div style={{ marginBottom: 4 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: `${mood.color}18`, border: `1px solid ${mood.color}25`, borderRadius: 5, padding: "2px 6px", fontSize: 8, fontWeight: 700, color: mood.color, fontFamily: T.font, letterSpacing: 0.5, textTransform: "uppercase" }}>{mood.emoji} {mood.label}</span>
        </div>
        <p style={{ color: "#fff", fontSize: grid ? 12 : 13, fontWeight: 700, margin: "0 0 5px", lineHeight: 1.25, fontFamily: T.display, textShadow: "0 2px 8px rgba(0,0,0,0.5)", letterSpacing: -0.2 }}>{date.title}</p>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {date.vibe.slice(0, grid ? 2 : 2).map(v => <span key={v} style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", color: "rgba(255,255,255,0.6)", fontSize: grid ? 8 : 9, fontWeight: 600, padding: "2px 6px", borderRadius: 5, fontFamily: T.font, border: "1px solid rgba(255,255,255,0.08)", letterSpacing: 0.2 }}>{v}</span>)}
        </div>
      </div>
    </div>
  );
}

// ——— DASHBOARD ———
function Dashboard({ name, quiz, onRetake }) {
  const [tab, setTab] = useState("home");
  const [sched, setSched] = useState(() => { try { const s = localStorage.getItem("vela_sched"); return s ? JSON.parse(s) : []; } catch { return []; } });
  const [hist, setHist] = useState(() => { try { const h = localStorage.getItem("vela_hist"); return h ? JSON.parse(h) : []; } catch { return []; } });
  const [detail, setDetail] = useState(null);
  const [schedModal, setSchedModal] = useState(null);
  const [debrief, setDebrief] = useState(null);
  const [bf, setBf] = useState(null);
  const [cf, setCf] = useState(null);
  const [toast, setToast] = useState("");
  const [notifs, setNotifs] = useState([]);

  const [showHype, setShowHype] = useState(false);
  const [swipeMode, setSwipeMode] = useState(false);
  const [swipeDeck, setSwipeDeck] = useState([]);
  const [swipeIdx, setSwipeIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [swipeAnim, setSwipeAnim] = useState(null);
  const dragStart = useRef(null);
  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  // Tutorial state
  const [tutStep, setTutStep] = useState(() => {
    try { return localStorage.getItem("vela_tutorial_done") ? -1 : 0; } catch { return 0; }
  });
  const dismissTut = () => { setTutStep(-1); try { localStorage.setItem("vela_tutorial_done", "1"); } catch {} };

  useEffect(() => { try { localStorage.setItem("vela_sched", JSON.stringify(sched)); } catch {} }, [sched]);
  useEffect(() => { try { localStorage.setItem("vela_hist", JSON.stringify(hist)); } catch {} }, [hist]);

  const cats = [...new Set(DATES.map(d => d.category))];
  const [searchQ, setSearchQ] = useState("");
  const filtered = DATES.filter(d => {
    if (bf !== null && d.budget > bf) return false;
    if (cf && d.category !== cf) return false;
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      const haystack = (d.title + " " + d.description + " " + d.vibe.join(" ") + " " + d.category).toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const rows = [
    { label: "Trending 🔥", dates: DATES.filter(d => d.is_trending && isInSeason(d.id)) },
    { label: "Top This Week", dates: DATES.filter(d => d.is_top_week && isInSeason(d.id)) },
    { label: "New Releases", dates: DATES.filter(d => d.is_new_release && isInSeason(d.id)) },
  ].filter(r => r.dates.length > 0);

  // ——— FOR YOU SCORING ENGINE ———
  const alcoholWords = ["cocktail","wine","tequila","bar","brewery","brew","beer","whiskey","bourbon","mixolog","sommelier","pub","happy hour","liquor","spirits","shots","aperitif"];
  const hasAlcohol = (d) => { const t = (d.title + " " + d.description).toLowerCase(); return alcoholWords.some(w => t.includes(w)); };
  const budgetMax = { "Under $20": 20, "Under $50": 50, "Under $100": 100, "Over $100": 999, "Mix it up": 999 };
  const maxB = budgetMax[quiz?.q12] || 999;

  const scoreDate = (d) => {
    if (!quiz) return { score: 0, flags: [] };
    let score = 0;
    const flags = [];

    // Vibe match (q3): strongest signal, +4 per match
    const vibeMap = { "Romantic / intimate": ["romantic", "intimate"], "Playful / competitive": ["playful", "competitive"], "Creative / artsy": ["creative", "hands-on"], "Athletic / outdoorsy": ["athletic", "adventurous"], "Intellectual / curious": ["intellectual"], "Chill / low-key": ["chill", "cozy"], "Bougie / sophisticated": ["sophisticated"], "Spontaneous / adventurous": ["spontaneous", "adventurous"] };
    const userVibes = (quiz.q3 || []).flatMap(v => vibeMap[v] || []);
    let vibeHits = 0;
    d.vibe.forEach(v => { if (userVibes.includes(v)) { score += 4; vibeHits++; } });
    if (vibeHits === 0 && userVibes.length > 0) { score -= 2; flags.push("vibe"); }

    // Energy level match (q1): +3 if category fits, -2 if mismatch
    const energyFit = { "Homebody, loves staying in": ["chill", "food", "creative", "romantic"], "Balanced, mix of in and out": ["chill", "food", "creative", "outdoor", "adventure", "romantic", "meaningful"], "Active, always wants to go somewhere": ["outdoor", "adventure", "nightlife"], "Adventurous, the wilder the better": ["adventure", "outdoor", "nightlife"] };
    const fitCats = quiz.q1 ? (energyFit[quiz.q1] || []) : [];
    if (fitCats.length > 0) {
      if (fitCats.includes(d.category)) score += 3;
      else { score -= 2; flags.push("energy"); }
    }

    // Budget: +3 if within, flag if over
    if (d.budget <= maxB) score += 3;
    else { score -= 5; flags.push("budget"); }

    // Physical activity fit (q4)
    if (quiz.q4 === "Light walks max") {
      if (d.difficulty === "hard") { score -= 3; flags.push("activity"); }
      else if (d.category === "outdoor" && d.difficulty === "moderate") { score -= 1; flags.push("activity"); }
    }
    if ((quiz.q4 === "They'll try anything athletic" || quiz.q4 === "They're more active than me") && (d.category === "outdoor" || d.category === "adventure")) score += 2;

    // Alcohol fit (q7): hard flag for non-drinkers
    if (quiz.q7 === "Doesn't drink at all" && hasAlcohol(d)) {
      score -= 6;
      flags.push("alcohol");
    }
    if ((quiz.q7 === "Loves trying new drinks" || quiz.q7 === "Can out-drink me") && hasAlcohol(d)) score += 3;

    // Friday night preference (q2)
    if (quiz.q2 === "Couch + movie + takeout" && ["chill", "food"].includes(d.category)) score += 2;
    if (quiz.q2 === "Dinner at a nice restaurant" && d.category === "food" && d.budget >= 50) score += 2;
    if (quiz.q2 === "Out with friends (bar, club, event)" && d.category === "nightlife") score += 2;
    if (quiz.q2 === "Something spontaneous and unplanned" && d.vibe.includes("spontaneous")) score += 2;

    // Cuisine match (q8): bonus if date mentions a favored cuisine
    const cuisineMap = { "Italian": "italian", "Mexican": "mexican", "Japanese / Sushi": "japanese|sushi", "Thai / Vietnamese": "thai|vietnamese", "Indian": "indian", "Mediterranean": "mediterranean", "American / BBQ": "bbq|american|burger", "Korean": "korean", "French": "french", "Chinese": "chinese" };
    (quiz.q8 || []).forEach(c => {
      const keywords = (cuisineMap[c] || "").split("|");
      const t = (d.title + " " + d.description).toLowerCase();
      if (keywords.some(k => k && t.includes(k))) score += 2;
    });

    return { score, flags };
  };

  const seasonal = DATES.filter(d => isInSeason(d.id));
  const scored = quiz ? seasonal.map(d => { const { score, flags } = scoreDate(d); return { ...d, _score: score, _flags: flags }; }) : seasonal.map(d => ({ ...d, _score: 0, _flags: [] }));

  // For You: high score AND no deal-breaker flags
  const forYouDates = quiz
    ? scored.filter(d => d._score >= 4 && !d._flags.includes("alcohol") && !d._flags.includes("budget")).sort((a, b) => b._score - a._score).slice(0, 12)
    : seasonal.slice(0, 12);

  // Outside the Box: dates that have a mismatch flag but are still interesting
  const outsideBoxDates = quiz
    ? scored.filter(d => d._score > 0 && (d._flags.includes("alcohol") || d._flags.includes("energy") || d._flags.includes("activity") || d._flags.includes("vibe"))).filter(d => !forYouDates.some(f => f.id === d.id)).sort((a, b) => b._score - a._score).slice(0, 8)
    : [];

  // Stretch the Budget: over budget but otherwise a decent match
  const stretchDates = quiz
    ? scored.filter(d => d._flags.includes("budget") && !d._flags.includes("alcohol")).sort((a, b) => b._score - a._score).slice(0, 8)
    : [];

  const generateHypeNotifs = (title, dateStr) => {
    // No longer dumps notifications immediately — the useEffect below handles timing
  };

  // Time-aware notification system: checks every 60s which notifications should be live
  const [dismissedNotifKeys, setDismissedNotifKeys] = useState([]);
  useEffect(() => {
    const checkNotifs = () => {
      const now = new Date();
      const live = [];
      sched.forEach(s => {
        const dateObj = new Date(s.scheduled_for + "T19:00:00"); // assume 7pm date time
        const fmtDate = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        const hoursUntil = (dateObj - now) / (1000 * 60 * 60);

        // Night before: between 36 hours and 12 hours before
        if (hoursUntil <= 36 && hoursUntil > 12) {
          const key = s.id + "_nb";
          if (!dismissedNotifKeys.includes(key)) {
            live.push({ id: key, timing: "Night Before", dateTitle: s.title, scheduledDate: fmtDate, message: HYPE_TEMPLATES.night_before[Math.abs(s.id.charCodeAt(0)) % HYPE_TEMPLATES.night_before.length], suggestedText: SUGGESTED_TEXTS.night_before[Math.abs(s.id.charCodeAt(0)) % SUGGESTED_TEXTS.night_before.length] });
          }
        }
        // Morning of: between 12 hours and 2 hours before
        if (hoursUntil <= 12 && hoursUntil > 2) {
          const key = s.id + "_mo";
          if (!dismissedNotifKeys.includes(key)) {
            live.push({ id: key, timing: "Morning Of", dateTitle: s.title, scheduledDate: fmtDate, message: HYPE_TEMPLATES.morning_of[Math.abs(s.id.charCodeAt(0)) % HYPE_TEMPLATES.morning_of.length], suggestedText: SUGGESTED_TEXTS.morning_of[Math.abs(s.id.charCodeAt(0)) % SUGGESTED_TEXTS.morning_of.length] });
          }
        }
        // 1 hour before: 2 hours to 0 hours before
        if (hoursUntil <= 2 && hoursUntil > -1) {
          const key = s.id + "_hb";
          if (!dismissedNotifKeys.includes(key)) {
            live.push({ id: key, timing: "1 Hour Before", dateTitle: s.title, scheduledDate: fmtDate, message: HYPE_TEMPLATES.hour_before[Math.abs(s.id.charCodeAt(0)) % HYPE_TEMPLATES.hour_before.length], suggestedText: SUGGESTED_TEXTS.hour_before[Math.abs(s.id.charCodeAt(0)) % SUGGESTED_TEXTS.hour_before.length] });
          }
        }
      });
      setNotifs(live);
    };
    checkNotifs();
    const interval = setInterval(checkNotifs, 60000);
    return () => clearInterval(interval);
  }, [sched, dismissedNotifKeys]);

  const schedule = (d, dateStr) => {
    const entry = { id: Date.now().toString(), date_id: d.id, title: d.title, budget: d.budget, category: d.category, scheduled_for: dateStr };
    setSched(p => [...p, entry].sort((a, b) => new Date(a.scheduled_for) - new Date(b.scheduled_for)));
    generateHypeNotifs(d.title, dateStr);
    flash(`✓ "${d.title}" scheduled!`);
  };

  const complete = (e) => {
    setSched(p => p.filter(s => s.id !== e.id));
    const entry = { id: Date.now().toString(), date_id: e.date_id, title: e.title, budget: e.budget, category: e.category, completed_at: new Date().toISOString() };
    setHist(p => [entry, ...p]);
    setDebrief(entry);
  };

  const saveDebrief = (data) => {
    setHist(p => p.map(h => h.id === debrief.id ? { ...h, debrief_rating: data.rating, debrief_reaction: data.reaction, debrief_notes: data.notes, debrief_want_again: data.again } : h));
    setDebrief(null); flash("✓ Debrief saved!");
  };

  const surprise = () => {
    const recent = hist.slice(0, 15).map(h => h.date_id);
    const scheduled = sched.map(s => s.date_id);
    const exclude = new Set([...recent, ...scheduled]);
    let pool = DATES.filter(d => !exclude.has(d.id) && isInSeason(d.id));
    if (!pool.length) pool = DATES.filter(d => isInSeason(d.id));
    if (!pool.length) pool = DATES;
    // Weighted shuffle: score each date, higher scores more likely to appear first
    const weighted = pool.map(d => {
      const { score } = scoreDate(d);
      return { ...d, _w: Math.max(score, 1) + Math.random() * 4 };
    });
    weighted.sort((a, b) => b._w - a._w);
    setSwipeDeck(weighted);
    setSwipeIdx(0);
    setDragX(0);
    setSwipeMode(true);
  };

  const swipeCard = (dir) => {
    setSwipeAnim(dir);
    setTimeout(() => {
      if (dir === "right") {
        setSchedModal(swipeDeck[swipeIdx]);
      }
      setSwipeIdx(i => i + 1);
      setDragX(0);
      setSwipeAnim(null);
      setDragging(false);
    }, 250);
  };

  const onDragStart = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    dragStart.current = x;
    setDragging(true);
  };
  const onDragMove = (e) => {
    if (!dragging || dragStart.current === null) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setDragX(x - dragStart.current);
  };
  const onDragEnd = () => {
    if (!dragging) return;
    dragStart.current = null;
    setDragging(false);
    if (dragX > 100) swipeCard("right");
    else if (dragX < -100) swipeCard("left");
    else setDragX(0);
  };

  const genMonth = () => {
    const fm = { "1x per month": 1, "2x per month": 2, "3x per month": 3, "Every week": 4 };
    const ct = fm[(quiz || {}).q13] || 2; const recent = hist.slice(0, 15).map(h => h.date_id);
    const scheduled = sched.map(s => s.date_id);
    const exclude = new Set([...recent, ...scheduled]);
    let pool = DATES.filter(d => !exclude.has(d.id) && isInSeason(d.id)); if (!pool.length) pool = DATES.filter(d => isInSeason(d.id)); if (!pool.length) pool = DATES;
    // Weighted shuffle: quiz-matched dates more likely to be picked
    const shuffled = pool.map(d => {
      const { score } = scoreDate(d);
      return { ...d, _w: Math.max(score, 1) + Math.random() * 4 };
    }).sort((a, b) => b._w - a._w);
    const now = new Date();
    for (let i = 0; i < ct && i < shuffled.length; i++) {
      const pick = shuffled[i];
      const off = Math.floor((28 / ct) * i) + Math.floor(Math.random() * 5) + 1;
      const when = new Date(now.getFullYear(), now.getMonth(), now.getDate() + off);
      const dateStr = when.toISOString().split("T")[0];
      const entry = { id: (Date.now() + i).toString(), date_id: pick.id, title: pick.title, budget: pick.budget, category: pick.category, scheduled_for: dateStr };
      setSched(p => [...p, entry].sort((a, b) => new Date(a.scheduled_for) - new Date(b.scheduled_for)));
      generateHypeNotifs(pick.title, dateStr);
    }
    flash(`✓ ${ct} dates scheduled!`);
  };

  const dismissNotif = (id) => setDismissedNotifKeys(p => [...p, id]);

  const TABS = [{ k: "home", l: "Home", i: "🏠" }, { k: "calendar", l: "Upcoming", i: "📅" }, { k: "library", l: "Library", i: "📚" }, { k: "memories", l: "Memories", i: "💾" }, { k: "profile", l: "Profile", i: "👤" }];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.font }}>
      {swipeMode && <div style={{ position: "fixed", inset: 0, background: T.bg, zIndex: 900, display: "flex", flexDirection: "column", fontFamily: T.font }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px" }}>
          <button onClick={() => setSwipeMode(false)} style={btn("transparent", T.textDim, { fontSize: 14, padding: "8px 0" })}>← Back</button>
          <p style={{ color: T.text, fontSize: 16, fontWeight: 700, margin: 0 }}>🎲 Surprise Me</p>
          <p style={{ color: T.textDim, fontSize: 13, margin: 0 }}>{swipeIdx + 1}/{swipeDeck.length}</p>
        </div>

        {swipeIdx < swipeDeck.length ? (() => {
          const d = swipeDeck[swipeIdx];
          const tier = getTier(d.budget);
          const grad = getGrad(d);
          const emoji = EMOJI[d.category] || "📌";
          const accent = CAT_ACCENT[d.category] || "#fff";
          const mood = getMood(d);
          const rot = dragX * 0.08;
          const opa = Math.min(Math.abs(dragX) / 100, 1);
          const animX = swipeAnim === "right" ? 500 : swipeAnim === "left" ? -500 : dragX;
          const animRot = swipeAnim ? (swipeAnim === "right" ? 15 : -15) : rot;
          return <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 20px", position: "relative", overflow: "hidden" }}>
            <div
              onTouchStart={onDragStart} onTouchMove={onDragMove} onTouchEnd={onDragEnd}
              onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={() => { if (dragging) onDragEnd(); }}
              style={{
                width: "100%", maxWidth: 360, minHeight: 460, borderRadius: 22, background: grad, position: "relative", overflow: "hidden", cursor: "grab", userSelect: "none",
                transform: `translateX(${animX}px) rotate(${animRot}deg)`,
                transition: swipeAnim ? "transform 0.25s ease-out" : dragging ? "none" : "transform 0.3s ease",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              {dragX > 40 && <div style={{ position: "absolute", top: 30, left: 20, zIndex: 5, border: "3px solid #4ade80", borderRadius: 8, padding: "6px 16px", transform: "rotate(-15deg)", opacity: opa }}>
                <span style={{ color: "#4ade80", fontSize: 28, fontWeight: 900 }}>SCHEDULE</span>
              </div>}
              {dragX < -40 && <div style={{ position: "absolute", top: 30, right: 20, zIndex: 5, border: "3px solid #ff6b6b", borderRadius: 8, padding: "6px 16px", transform: "rotate(15deg)", opacity: opa }}>
                <span style={{ color: "#ff6b6b", fontSize: 28, fontWeight: 900 }}>SKIP</span>
              </div>}

              {/* Right accent bar */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 5, height: "100%", background: `linear-gradient(180deg, ${accent}00 0%, ${accent} 30%, ${accent} 70%, ${accent}00 100%)`, borderRadius: "0 22px 22px 0" }} />
              <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)` }} />
              <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${mood.color}08 0%, transparent 70%)` }} />
              <div style={{ padding: "30px 24px", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>{emoji}</div>
                  <div style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: "8px 16px", borderRadius: 12, textAlign: "center", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                    <span style={{ color: tier.color, fontSize: 20, fontWeight: 800, fontFamily: T.font, display: "block", lineHeight: 1.1 }}>${d.budget}</span>
                    <span style={{ color: tier.color, fontSize: 9, fontWeight: 700, fontFamily: T.font, letterSpacing: 0.8, opacity: 0.8, textTransform: "uppercase" }}>{tier.tag}</span>
                  </div>
                </div>

                {/* Mood pill */}
                <div style={{ marginBottom: 10 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: `${mood.color}18`, border: `1px solid ${mood.color}25`, borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: mood.color, fontFamily: T.font, letterSpacing: 0.5, textTransform: "uppercase" }}>{mood.emoji} {mood.label}</span>
                </div>

                <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 12px", lineHeight: 1.2, textShadow: "0 2px 12px rgba(0,0,0,0.5)", fontFamily: T.display }}>{d.title}</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.5, margin: "0 0 20px", flex: 1 }}>{d.description}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                  {d.vibe.map(v => <span key={v} style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)" }}>{v}</span>)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
                  <span style={{ textTransform: "capitalize" }}>{d.category}</span>
                  <span>·</span>
                  <span style={{ textTransform: "capitalize" }}>{d.difficulty}</span>
                  <span>·</span>
                  <span>{Math.round(d.duration / 60)}h</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 30 }}>
              <button onClick={() => swipeCard("left")} style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid #ff6b6b33`, background: "#ff6b6b12", color: "#ff6b6b", fontSize: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              <button onClick={() => setDetail(d)} style={{ width: 50, height: 50, borderRadius: "50%", border: `2px solid ${T.primary}33`, background: T.primary + "12", color: T.primary, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>ℹ️</button>
              <button onClick={() => swipeCard("right")} style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid ${T.green}33`, background: T.green + "12", color: T.green, fontSize: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>♥</button>
            </div>
          </div>;
        })() : <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 40px", textAlign: "center" }}>
          <p style={{ fontSize: 48, margin: "0 0 16px" }}>🎉</p>
          <h2 style={{ color: T.text, fontSize: 22, fontWeight: 700, margin: "0 0 8px", fontFamily: T.display }}>You've seen them all!</h2>
          <p style={{ color: T.textDim, fontSize: 15, margin: "0 0 24px" }}>You swiped through {swipeDeck.length} date ideas</p>
          <button onClick={() => { setSwipeIdx(0); setSwipeDeck([...swipeDeck].sort(() => Math.random() - 0.5)); }} style={btn(T.primary, "#fff", { padding: "14px 28px", fontSize: 15, borderRadius: 12 })}>🔄 Shuffle & Restart</button>
          <button onClick={() => setSwipeMode(false)} style={btn("transparent", T.textDim, { padding: "14px 28px", fontSize: 14, marginTop: 12 })}>Back to Home</button>
        </div>}
      </div>}

      <style>{`
        .vela-scroll::-webkit-scrollbar { height: 4px; }
        .vela-scroll::-webkit-scrollbar-track { background: #0E0F13; border-radius: 2px; }
        .vela-scroll::-webkit-scrollbar-thumb { background: #D4A574; border-radius: 2px; }
        .vela-scroll::-webkit-scrollbar-thumb:hover { background: #E8C49A; }
        .vela-scroll { scrollbar-width: thin; scrollbar-color: #D4A574 #0E0F13; }
      `}</style>
      {debrief && <Debrief entry={debrief} onSave={saveDebrief} onClose={() => setDebrief(null)} />}
      {schedModal && <ScheduleModal date={schedModal} onClose={() => { setSchedModal(null); setDetail(null); }} onSchedule={schedule} />}
      {!schedModal && <Detail date={detail} onClose={() => setDetail(null)} onSchedule={(d) => { setSchedModal(d); }} />}
      {showHype && <HypePanel notifications={notifs} onDismiss={dismissNotif} onClose={() => setShowHype(false)} />}
      {toast && <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: T.surface, color: T.text, padding: "12px 24px", borderRadius: 12, border: `1px solid ${T.border}`, zIndex: 1000, fontSize: 14, fontWeight: 600, boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>{toast}</div>}

      {/* Top header bar */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "env(safe-area-inset-top, 0) 20px 0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #D4A574 0%, #B8845A 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#0E0F13", fontFamily: T.display }}>V</div><h1 style={{ color: T.text, fontSize: 18, margin: 0, fontWeight: 700, fontFamily: T.display }}>vela</h1></div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={() => setShowHype(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, position: "relative", padding: 8, minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
              🔔
              {notifs.length > 0 && <span style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%", background: T.accent, color: "#fff", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{notifs.length}</span>}
            </button>
            <span style={{ color: T.textDim, fontSize: 13 }}>Hey, {name}</span>
          </div>
        </div>
      </div>

      {/* Fixed bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.surface, borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 100, paddingBottom: "env(safe-area-inset-bottom, 8px)", paddingTop: 6 }}>
        {TABS.map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, padding: "6px 12px", minWidth: 56, minHeight: 48,
            transition: "all 0.15s",
          }}>
            <span style={{ fontSize: 22, filter: tab === t.k ? "none" : "grayscale(1) opacity(0.5)", transition: "filter 0.15s" }}>{t.i}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: tab === t.k ? T.primary : T.textFaint, fontFamily: T.font, letterSpacing: 0.3 }}>{t.l}</span>
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px 100px" }}>
        {tab === "home" && <>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[{ l: "Upcoming", v: sched.length, c: T.primary }, { l: "Completed", v: hist.length, c: T.green }, { l: "Library", v: DATES.length, c: T.yellow }].map(s =>
              <div key={s.l} style={{ flex: 1, ...crd({ padding: 14, textAlign: "center" }) }}><p style={{ color: T.textFaint, fontSize: 10, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</p><p style={{ color: s.c, fontSize: 26, margin: 0, fontWeight: 800 }}>{s.v}</p></div>
            )}
          </div>
          <button onClick={surprise} style={{ ...btn(T.accent, "#fff"), width: "100%", padding: "16px 24px", fontSize: 16, fontWeight: 800, marginBottom: 12, borderRadius: 14, background: `linear-gradient(135deg,${T.accent},${T.primary})` }}>🎲 Surprise Me</button>
          <button onClick={genMonth} style={{ ...btn(T.surface, T.text), width: "100%", padding: "13px 24px", fontSize: 14, marginBottom: 22, border: `1px solid ${T.border}` }}>📅 Generate This Month's Dates</button>

          {notifs.length > 0 && <div style={{ ...crd({ padding: 16, marginBottom: 20 }), border: `1.5px solid ${T.yellow}33`, background: T.yellow + "08", cursor: "pointer" }} onClick={() => setShowHype(true)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <p style={{ color: T.yellow, fontSize: 13, margin: 0, fontWeight: 700 }}>💡 Want to build the excitement?</p>
              <button onClick={(e) => { e.stopPropagation(); setShowHype(true); }} style={btn("transparent", T.yellow, { padding: "4px 10px", fontSize: 12 })}>See How →</button>
            </div>
            <p style={{ color: T.textDim, fontSize: 13, margin: 0 }}>You've got {notifs.length} tip{notifs.length > 1 ? "s" : ""} to build anticipation before your next date</p>
          </div>}

          {sched.length > 0 && <div style={{ marginBottom: 22 }}>
            <h3 style={{ color: T.text, fontSize: 16, margin: "0 0 12px", fontWeight: 700, fontFamily: T.display }}>Next Up</h3>
            {sched.slice(0, 3).map(s => <div key={s.id} style={{ ...crd({ padding: 14, marginBottom: 8 }), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><p style={{ color: T.text, fontSize: 15, margin: "0 0 3px", fontWeight: 600 }}>{s.title}</p><p style={{ color: T.textDim, fontSize: 12, margin: 0 }}>{new Date(s.scheduled_for + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · ${s.budget}</p></div>
              <button onClick={() => complete(s)} style={btn(T.green + "18", T.green, { padding: "6px 12px", fontSize: 12, border: `1px solid ${T.green}33` })}>✓ Done</button>
            </div>)}
          </div>}

          {hist.length > 0 && <div style={{ marginBottom: 22 }}><h3 style={{ color: T.text, fontSize: 16, margin: "0 0 12px", fontWeight: 700, fontFamily: T.display }}>💭 Remember This?</h3>
            {(() => { const r = hist[Math.floor(Math.random() * hist.length)]; return <div style={crd({ padding: 16 })}><p style={{ color: T.text, fontSize: 16, margin: "0 0 5px", fontWeight: 600 }}>{r.title}</p>{r.debrief_reaction && <p style={{ color: T.textDim, fontSize: 14, margin: 0 }}>{r.debrief_reaction}{r.debrief_notes && ` . "${r.debrief_notes}"`}</p>}</div>; })()}
          </div>}

          <div style={{ marginTop: 4 }}>
            <h3 style={{ color: T.text, fontSize: 16, margin: "0 0 4px", fontWeight: 700, fontFamily: T.display }}>For You ✨</h3>
            <p style={{ color: T.textDim, fontSize: 12, margin: "0 0 12px" }}>Picked based on what she likes</p>
            <div className="vela-scroll" style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
              {forYouDates.slice(0, 8).map(d => <Card key={d.id} date={d} onClick={() => setDetail(d)} />)}
            </div>
          </div>

          {outsideBoxDates.length > 0 && <div style={{ marginTop: 22 }}>
            <h3 style={{ color: T.text, fontSize: 16, margin: "0 0 4px", fontWeight: 700, fontFamily: T.display }}>Outside the Box 🧭</h3>
            <p style={{ color: T.textDim, fontSize: 12, margin: "0 0 12px" }}>A little different from the usual, but could be worth a shot</p>
            <div className="vela-scroll" style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
              {outsideBoxDates.map(d => <Card key={d.id} date={d} onClick={() => setDetail(d)} />)}
            </div>
          </div>}

          {stretchDates.length > 0 && <div style={{ marginTop: 22 }}>
            <h3 style={{ color: T.text, fontSize: 16, margin: "0 0 4px", fontWeight: 700, fontFamily: T.display }}>Stretch the Budget 💸</h3>
            <p style={{ color: T.textDim, fontSize: 12, margin: "0 0 12px" }}>Worth it if you want to go all out</p>
            <div className="vela-scroll" style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
              {stretchDates.map(d => <Card key={d.id} date={d} onClick={() => setDetail(d)} />)}
            </div>
          </div>}
        </>}

        {tab === "calendar" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ color: T.text, fontSize: 20, margin: 0, fontWeight: 700, fontFamily: T.display }}>Upcoming Dates</h2>
            <button onClick={genMonth} style={btn(T.primary, "#fff", { padding: "8px 14px", fontSize: 12 })}>+ Generate</button>
          </div>
          {sched.length === 0 ? <div style={{ ...crd({ padding: 36, textAlign: "center" }) }}><p style={{ color: T.textDim, fontSize: 15, margin: 0 }}>Nothing scheduled yet. Hit "Generate" or browse the library!</p></div>
            : sched.map(s => <div key={s.id} style={{ ...crd({ padding: 16, marginBottom: 10 }), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><p style={{ color: T.text, fontSize: 15, margin: "0 0 3px", fontWeight: 600 }}>{s.title}</p><p style={{ color: T.textDim, fontSize: 13, margin: 0 }}>{new Date(s.scheduled_for + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}<span style={{ color: getTier(s.budget).color, marginLeft: 10, fontWeight: 600 }}>${s.budget}</span></p></div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => complete(s)} style={btn(T.green + "18", T.green, { padding: "6px 12px", fontSize: 12, border: `1px solid ${T.green}33` })}>✓</button>
                <button onClick={() => setSched(p => p.filter(x => x.id !== s.id))} style={btn(T.accent + "18", T.accent, { padding: "6px 12px", fontSize: 12, border: `1px solid ${T.accent}33` })}>✕</button>
              </div>
            </div>)}
        </>}

        {tab === "library" && <>
          <h2 style={{ color: T.text, fontSize: 20, margin: "0 0 14px", fontWeight: 700, fontFamily: T.display }}>Date Library</h2>
          {/* Search */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: T.textFaint, pointerEvents: "none" }}>🔍</span>
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search dates, vibes, categories..." style={inp({ paddingLeft: 40, fontSize: 14, background: T.surface, border: `1px solid ${T.border}` })} />
            {searchQ && <button onClick={() => setSearchQ("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: T.textDim, fontSize: 16, cursor: "pointer", padding: 4 }}>✕</button>}
          </div>
          <p style={{ color: T.textFaint, fontSize: 11, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>Budget</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {[{ label: "All", max: null }, ...BTIERS].map(t => <button key={t.label} onClick={() => setBf(t.max)} style={{ fontFamily: T.font, fontSize: 13, fontWeight: 600, borderRadius: 10, cursor: "pointer", padding: "10px 18px", border: `2px solid ${bf === t.max ? (t.color || T.primary) : T.border}`, background: bf === t.max ? (t.color || T.primary) + "22" : "transparent", color: bf === t.max ? (t.color || T.primary) : T.textDim }}>{t.label}</button>)}
          </div>
          <p style={{ color: T.textFaint, fontSize: 11, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>Category</p>
          <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {[{ l: "All", v: null }, ...cats.map(c => ({ l: c, v: c }))].map(c => <button key={c.l} onClick={() => setCf(c.v)} style={{ fontFamily: T.font, fontSize: 12, fontWeight: 600, borderRadius: 8, cursor: "pointer", padding: "8px 14px", border: `2px solid ${cf === c.v ? T.primary : T.border}`, background: cf === c.v ? T.primary + "22" : "transparent", color: cf === c.v ? T.primary : T.textFaint, textTransform: "capitalize" }}>{c.l}</button>)}
          </div>

          {/* Recommended For You */}
          {forYouDates.filter(d => { if (bf !== null && d.budget > bf) return false; if (cf && d.category !== cf) return false; return true; }).length > 0 && <div style={{ marginBottom: 28 }}>
            <h3 style={{ color: T.text, fontSize: 17, margin: "0 0 4px", fontWeight: 700, fontFamily: T.display }}>Recommended For You ✨</h3>
            <p style={{ color: T.textDim, fontSize: 12, margin: "0 0 14px" }}>Based on your partner's preferences</p>
            <div className="vela-scroll" style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
              {forYouDates.filter(d => { if (bf !== null && d.budget > bf) return false; if (cf && d.category !== cf) return false; return true; }).map(d => <Card key={d.id} date={d} onClick={() => setDetail(d)} />)}
            </div>
          </div>}

          {/* Browse rows */}
          {rows.filter(row => row.dates.filter(d => { if (bf !== null && d.budget > bf) return false; if (cf && d.category !== cf) return false; return true; }).length > 0).map(row => <div key={row.label} style={{ marginBottom: 24 }}>
            <h3 style={{ color: T.text, fontSize: 17, margin: "0 0 12px", fontWeight: 700, fontFamily: T.display }}>{row.label}</h3>
            <div className="vela-scroll" style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
              {row.dates.filter(d => { if (bf !== null && d.budget > bf) return false; if (cf && d.category !== cf) return false; return true; }).map(d => <Card key={d.id} date={d} onClick={() => setDetail(d)} />)}
            </div>
          </div>)}

          {/* All dates grid */}
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 24 }}>
            <h3 style={{ color: T.text, fontSize: 17, margin: "0 0 8px", fontWeight: 700, fontFamily: T.display }}>All Dates</h3>
            <p style={{ color: T.textFaint, fontSize: 12, margin: "0 0 14px" }}>{filtered.length} dates</p>
            {filtered.length === 0 ? <div style={{ ...crd({ padding: 36, textAlign: "center" }) }}><p style={{ color: T.textDim, fontSize: 15, margin: 0 }}>No matches.</p></div>
              : <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
                {filtered.map(d => <Card key={d.id} date={d} onClick={() => setDetail(d)} grid />)}
              </div>}
          </div>
        </>}

        {tab === "memories" && <>
          <h2 style={{ color: T.text, fontSize: 20, margin: "0 0 18px", fontWeight: 700, fontFamily: T.display }}>Date Memories</h2>
          {hist.length === 0 ? <div style={{ ...crd({ padding: 36, textAlign: "center" }) }}><p style={{ color: T.textDim, fontSize: 15, margin: 0 }}>No dates completed yet. Schedule one and mark it done!</p></div>
            : hist.map(h => (
              <div key={h.id} style={{ ...crd({ padding: 18, marginBottom: 14 }) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div><p style={{ color: T.text, fontSize: 16, margin: "0 0 3px", fontWeight: 700 }}>{h.title}</p><p style={{ color: T.textDim, fontSize: 12, margin: 0 }}>{new Date(h.completed_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p></div>
                  <span style={{ background: getTier(h.budget).color + "18", color: getTier(h.budget).color, fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 6 }}>${h.budget}</span>
                </div>
                {h.debrief_reaction ? <div style={{ marginTop: 12, padding: 12, background: T.bg, borderRadius: 10, border: `1px solid ${T.border}` }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: h.debrief_notes ? 6 : 0 }}><span style={{ fontSize: 14 }}>{h.debrief_reaction}</span>{h.debrief_want_again !== null && h.debrief_want_again !== undefined && <span style={{ color: h.debrief_want_again ? T.green : T.accent, fontSize: 13 }}>{h.debrief_want_again ? "👍 Would repeat" : "👎 One and done"}</span>}</div>
                  {h.debrief_notes && <p style={{ color: T.textDim, fontSize: 14, margin: 0, fontStyle: "italic" }}>"{h.debrief_notes}"</p>}
                </div> : <button onClick={() => setDebrief(h)} style={btn(T.primary + "15", T.primary, { padding: "6px 12px", fontSize: 12, marginTop: 10, border: `1px solid ${T.primary}33` })}>Add Debrief</button>}
              </div>
            ))}
        </>}

        {tab === "profile" && <>
          <div style={{ ...crd({ padding: 28, marginBottom: 20 }), textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 14px", background: `linear-gradient(135deg,${T.primary},${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800, color: "#fff" }}>{(name || "U").charAt(0).toUpperCase()}</div>
            <h2 style={{ color: T.text, fontSize: 22, margin: "0 0 4px", fontWeight: 800, fontFamily: T.display }}>{name}</h2>
            <p style={{ color: T.textDim, fontSize: 13, margin: 0 }}>Vela Member</p>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[{ l: "Dates Done", v: hist.length, i: "✓", c: T.green }, { l: "Upcoming", v: sched.length, i: "📅", c: T.primary }, { l: "In Library", v: DATES.length, i: "📚", c: T.yellow }].map(s =>
              <div key={s.l} style={{ flex: 1, ...crd({ padding: 14, textAlign: "center" }) }}><p style={{ fontSize: 20, margin: "0 0 4px" }}>{s.i}</p><p style={{ color: s.c, fontSize: 22, margin: "0 0 2px", fontWeight: 800 }}>{s.v}</p><p style={{ color: T.textFaint, fontSize: 10, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</p></div>
            )}
          </div>
          <button onClick={onRetake} style={{ width: "100%", ...crd({ padding: 16, marginBottom: 10 }), display: "flex", alignItems: "center", gap: 14, cursor: "pointer", border: `1px solid ${T.border}` }}>
            <span style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: T.accent + "18", fontSize: 20 }}>🔄</span>
            <div style={{ textAlign: "left" }}><p style={{ color: T.text, fontSize: 15, margin: "0 0 2px", fontWeight: 600 }}>Retake Partner Quiz</p><p style={{ color: T.textDim, fontSize: 12, margin: 0 }}>Update partner preferences and vibes</p></div>
          </button>
          {[{ i: "💰", bg: T.primary, l: "Budget", v: (quiz || {}).q12 || "Not set" }, { i: "📅", bg: T.green, l: "Frequency", v: (quiz || {}).q13 || "Not set" }].map(x =>
            <div key={x.l} style={{ ...crd({ padding: 16, marginBottom: 10 }), display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: x.bg + "18", fontSize: 20 }}>{x.i}</span>
              <div><p style={{ color: T.text, fontSize: 15, margin: "0 0 2px", fontWeight: 600 }}>{x.l}</p><p style={{ color: T.textDim, fontSize: 13, margin: 0 }}>{x.v}</p></div>
            </div>
          )}
          {quiz && Object.keys(quiz).length > 0 && <>
            <h3 style={{ color: T.text, fontSize: 15, margin: "20px 0 12px", fontWeight: 700, fontFamily: T.display }}>Partner Preferences</h3>
            {QUIZ.filter(q => !["q12", "q13"].includes(q.id)).map(q => { const a = quiz[q.id]; if (!a || (Array.isArray(a) && !a.length)) return null; return <div key={q.id} style={{ ...crd({ padding: 14, marginBottom: 8 }) }}><p style={{ color: T.textFaint, fontSize: 11, margin: "0 0 5px", textTransform: "uppercase", letterSpacing: 0.5 }}>{q.q}</p><p style={{ color: T.text, fontSize: 14, margin: 0 }}>{Array.isArray(a) ? a.join(", ") : a}</p></div>; })}
          </>}
          <div style={{ textAlign: "center", padding: "30px 0 40px" }}><p style={{ color: T.textFaint, fontSize: 12, margin: "0 0 4px", fontFamily: T.display }}>Vela v2.0</p><p style={{ color: T.textFaint, fontSize: 11, margin: 0 }}>Date night. Figured out.</p></div>
        </>}
      </div>

      {/* Tutorial Overlay */}
      {tutStep >= 0 && tutStep < 7 && (() => {
        const steps = [
          { title: "Welcome to Vela", desc: "This is your home base. Scroll through curated date ideas picked just for you.", icon: "🏠" },
          { title: "Surprise Me", desc: "Tap this to get random dates served up one at a time, Tinder-style.", icon: "🎲" },
          { title: "Swipe to Decide", desc: "Swipe right or tap the heart to schedule it. Swipe left or tap X to skip. Tap the middle button to see the full details.", icon: "👆" },
          { title: "Date Library", desc: "Browse the full collection. Filter by category and budget.", icon: "📚" },
          { title: "Calendar", desc: "Schedule dates and track upcoming plans here.", icon: "📅" },
          { title: "Your Profile", desc: "See your stats, vibe profile, and update preferences.", icon: "👤" },
          { title: "You're All Set", desc: "That's it. Now go plan something she'll actually remember.", icon: "🕯️" },
        ];
        const s = steps[tutStep];
        return (
          <div style={{ position: "fixed", inset: 0, zIndex: 9998, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {/* Dark overlay */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.82)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }} />
            {/* Content card */}
            <div style={{ position: "relative", zIndex: 1, background: T.surface, borderRadius: 20, padding: "32px 28px", maxWidth: 320, width: "90%", textAlign: "center", border: `1px solid ${T.border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{s.icon}</div>
              <h3 style={{ color: T.text, fontSize: 20, margin: "0 0 8px", fontWeight: 700, fontFamily: T.display }}>{s.title}</h3>
              <p style={{ color: T.textDim, fontSize: 14, margin: "0 0 24px", lineHeight: 1.5 }}>{s.desc}</p>
              {/* Step dots */}
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
                {steps.map((_, i) => <div key={i} style={{ width: i === tutStep ? 20 : 6, height: 6, borderRadius: 3, background: i === tutStep ? T.primary : T.border, transition: "all 0.3s" }} />)}
              </div>
              {/* Buttons */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={dismissTut} style={btn("transparent", T.textDim, { padding: "10px 20px", fontSize: 13 })}>Skip</button>
                <button onClick={() => tutStep < 6 ? setTutStep(tutStep + 1) : dismissTut()} style={btn(T.primary, "#0E0F13", { padding: "10px 24px", fontSize: 13, fontWeight: 700 })}>{tutStep < 6 ? "Next" : "Let's Go"}</button>
              </div>
            </div>
            {/* Bottom tab highlight */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-around", padding: "0 16px", zIndex: 2 }}>
              {["🏠", "📚", "📅", "🧠", "👤"].map((icon, i) => (
                <div key={i} style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: (tutStep === 0 && i === 0) || (tutStep === 3 && i === 1) || (tutStep === 4 && i === 2) || (tutStep === 5 && i === 4) ? `${T.primary}30` : "transparent", border: (tutStep === 0 && i === 0) || (tutStep === 3 && i === 1) || (tutStep === 4 && i === 2) || (tutStep === 5 && i === 4) ? `2px solid ${T.primary}` : "2px solid transparent", transition: "all 0.3s", marginBottom: 16 }}>{icon}</div>
              ))}
            </div>
          </div>
        );
      })()}

    </div>
  );
}

// ——— WELCOME ———
function Welcome({ onStart }) {
  const [name, setName] = useState("");
  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.font, padding: 20 }}>
      <div style={{ ...crd(), maxWidth: 420, width: "100%", padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, #D4A574 0%, #B8845A 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#0E0F13", fontFamily: T.display, margin: "0 auto 12px" }}>V</div>
          <h1 style={{ color: T.text, fontSize: 34, margin: 0, fontWeight: 700, letterSpacing: "-1px", fontFamily: T.display }}>vela</h1>
          <p style={{ color: T.textDim, margin: "10px 0 0", fontSize: 15, lineHeight: 1.5 }}>Date night. Figured out.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input placeholder="Your first name" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && name.trim() && onStart(name.trim())} style={inp({ fontSize: 16, padding: "14px 18px", textAlign: "center" })} />
          <button onClick={() => name.trim() && onStart(name.trim())} disabled={!name.trim()} style={btn(name.trim() ? T.primary : T.border, name.trim() ? "#fff" : T.textFaint, { padding: "15px 24px", fontSize: 16, fontWeight: 700 })}>Get Started →</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 24 }}>
          {[{ n: "90+", l: "Date Ideas" }, { n: "8", l: "Categories" }, { n: "$0–300", l: "Budget Range" }].map(s => <div key={s.l} style={{ textAlign: "center" }}><p style={{ color: T.primary, fontSize: 18, margin: "0 0 2px", fontWeight: 800 }}>{s.n}</p><p style={{ color: T.textFaint, fontSize: 10, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</p></div>)}
        </div>
      </div>
    </div>
  );
}

// ——— ANIMATED SPLASH ———
function Splash({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2600);
    const t4 = setTimeout(() => onDone(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LINES = [
    "They're gonna remember this one.",
    "Stop overthinking. Start planning.",
    "Date nights that actually hit different.",
  ];
  const line = LINES[Math.floor(Math.random() * LINES.length)];

  return (
    <div style={{
      position: "fixed", inset: 0, background: T.bg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", fontFamily: T.font, zIndex: 9999,
      opacity: phase >= 3 ? 0 : 1, transition: "opacity 0.35s ease-out",
    }}>
      <style>{`
        @keyframes amberGlow {
          0%, 100% { filter: drop-shadow(0 0 8px #D4A57455) drop-shadow(0 0 25px #D4A57422); transform: scale(1); }
          50% { filter: drop-shadow(0 0 20px #D4A57488) drop-shadow(0 0 50px #D4A57444); transform: scale(1.04); }
        }
        @keyframes logoReveal {
          0% { opacity: 0; transform: translateY(16px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tagFade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        @keyframes flickerCandle {
          0%, 100% { opacity: 1; transform: scaleX(1) translateY(0); }
          25% { opacity: 0.85; transform: scaleX(0.92) translateY(-1px); }
          50% { opacity: 1; transform: scaleX(1.05) translateY(-2px); }
          75% { opacity: 0.9; transform: scaleX(0.96) translateY(0px); }
        }
        @keyframes barGrow {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", width: 240, height: 240, borderRadius: "50%",
        background: "radial-gradient(circle, #D4A57418 0%, transparent 70%)",
        animation: phase >= 1 ? "pulseRing 2.5s ease-in-out infinite" : "none",
        opacity: phase >= 1 ? 1 : 0,
      }} />

      {/* Vela logo word with candle "l" */}
      <div style={{
        display: "flex", alignItems: "flex-end", gap: 0, marginBottom: 16,
        opacity: phase >= 1 ? 1 : 0,
        animation: phase >= 1 ? "logoReveal 0.8s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
      }}>
        <span style={{ fontFamily: T.display, fontSize: 64, fontWeight: 500, color: T.text, lineHeight: 1 }}>v</span>
        <span style={{ fontFamily: T.display, fontSize: 64, fontWeight: 500, color: T.text, lineHeight: 1, marginRight: 1 }}>e</span>
        {/* Candle "l" */}
        <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", position: "relative", width: 18, marginBottom: 4 }}>
          {/* Flame - SVG for clean shape */}
          <svg width="18" height="24" viewBox="0 0 18 24" style={{ animation: phase >= 1 ? "flickerCandle 2s ease-in-out infinite" : "none", filter: "drop-shadow(0 0 8px #D4A57466) drop-shadow(0 0 16px #D4A57433)" }}>
            <defs>
              <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#D4A574" />
                <stop offset="40%" stopColor="#E8C49A" />
                <stop offset="70%" stopColor="#FFF5E0" />
                <stop offset="100%" stopColor="#FFFBF0" />
              </linearGradient>
              <linearGradient id="innerFlame" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#E8C49A" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
            {/* Outer flame */}
            <path d="M9 1 C9 1, 15 10, 15 15 C15 19, 12 23, 9 23 C6 23, 3 19, 3 15 C3 10, 9 1, 9 1Z" fill="url(#flameGrad)" opacity="0.9" />
            {/* Inner flame */}
            <path d="M9 8 C9 8, 12 13, 12 16 C12 18.5, 10.5 21, 9 21 C7.5 21, 6 18.5, 6 16 C6 13, 9 8, 9 8Z" fill="url(#innerFlame)" opacity="0.7" />
          </svg>
          {/* Wick */}
          <span style={{ display: "block", width: 1.5, height: 3, background: "#7D786F", marginTop: -2 }} />
          {/* Candle body */}
          <span style={{ display: "block", width: 6, height: 36, background: "linear-gradient(to bottom, #F0DCC0, #E8C49A, #D4A574)", borderRadius: "2px 2px 3px 3px", boxShadow: "1px 0 3px rgba(0,0,0,0.15), -1px 0 3px rgba(0,0,0,0.1)" }} />
        </span>
        <span style={{ fontFamily: T.display, fontSize: 64, fontWeight: 500, color: T.text, lineHeight: 1, marginLeft: 1 }}>a</span>
      </div>

      {/* Tagline */}
      <p style={{
        color: T.textDim, fontSize: 11, fontWeight: 500, margin: "8px 0 24px",
        opacity: phase >= 1 ? 1 : 0,
        letterSpacing: 4, textTransform: "uppercase", fontFamily: T.font,
        transition: "opacity 0.5s ease 0.4s",
      }}>DATE NIGHT. FIGURED OUT.</p>

      {/* Rotating hype line */}
      <p style={{
        color: T.textDim, fontSize: 15, fontWeight: 400, margin: 0,
        opacity: phase >= 2 ? 1 : 0,
        animation: phase >= 2 ? "tagFade 0.6s ease-out forwards" : "none",
        textAlign: "center", padding: "0 40px", lineHeight: 1.5,
        fontFamily: T.display, fontStyle: "italic",
      }}>{line}</p>

      {/* Subtle loading bar */}
      <div style={{
        position: "absolute", bottom: 60, width: 120, height: 2,
        background: T.border, borderRadius: 2, overflow: "hidden",
        opacity: phase >= 1 ? 0.5 : 0, transition: "opacity 0.3s",
      }}>
        <div style={{
          height: "100%", borderRadius: 2,
          background: `linear-gradient(90deg, #B8845A, #D4A574, #E8C49A)`,
          animation: phase >= 1 ? "barGrow 6s ease-out forwards" : "none",
        }} />
      </div>
    </div>
  );
}

// ——— APP ROOT ———
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [name, setName] = useState(() => { try { return localStorage.getItem("vela_name") || ""; } catch { return ""; } });
  const [quiz, setQuiz] = useState(() => { try { const q = localStorage.getItem("vela_quiz"); return q ? JSON.parse(q) : null; } catch { return null; } });

  useEffect(() => { try { if (name) localStorage.setItem("vela_name", name); } catch {} }, [name]);
  useEffect(() => { try { if (quiz) localStorage.setItem("vela_quiz", JSON.stringify(quiz)); } catch {} }, [quiz]);

  if (screen === "splash") return <Splash onDone={() => setScreen(name && quiz ? "dashboard" : "welcome")} />;
  if (screen === "welcome") return <Welcome onStart={(n) => { setName(n); setScreen("quiz"); }} />;
  if (screen === "quiz") return <QuizFlow onComplete={(a) => { setQuiz(a); setScreen("dashboard"); }} existing={quiz} />;
  return <Dashboard name={name} quiz={quiz} onRetake={() => setScreen("quiz")} />;
}
