"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Search, FileText, X, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

export interface ModelProfile {
  id: string;
  displayName: string;
  realName: string;
  tagline: string;
  color: string;
  colorDim: string;
  avatar: string;
  status: "active" | "paused" | "inactive";
  tier: string;
  primaryAccount: string;
  primaryPlatform: string;
  timezone: string;
  joined: string;
  location: string;
  ethnicity: string;
  languages: string;
  birthday: string;
  relationship: string;
  hobbies: string;
  pets: string;
  height: string;
  favoritePart: string;
  leastFavorite: string;
  persona: string;
  turnsOn: string;
  fantasy: string;
  doList: string[];
  dontList: string[];
  social: { platform: string; handle: string; url: string; agency: boolean }[];
  customPricing: { item: string; price: string }[];
  chattingStyle: { label: string; value: string }[];
  notes: string;
}

const MODELS: ModelProfile[] = [
  {
    id: "tyler",
    displayName: "Tyler Rex",
    realName: "Dominik Zwierzchowski",
    tagline: "Gym & Architecture",
    color: "#8B5CF6",
    colorDim: "rgba(139,92,246,0.15)",
    avatar: "TR",
    status: "active",
    tier: "Top",
    primaryAccount: "@tylerrexreal",
    primaryPlatform: "Instagram",
    timezone: "GMT+1 (Katowice, Poland)",
    joined: "Jan 2025",
    location: "Katowice, Poland",
    ethnicity: "Polish",
    languages: "Polish, English",
    birthday: "July 5th, 1985",
    relationship: "Single",
    hobbies: "Collecting coins & banknotes, travelling, architecture",
    pets: "Animals",
    height: "174cm / 95kg",
    favoritePart: "Face",
    leastFavorite: "Ass",
    persona: "Crazy, sexy gorilla - the best version of himself",
    turnsOn: "Gentle touch around neck, gentle touching of hair on my back, good kissing, play with balls",
    fantasy: "Huge groups, piss, CBT play",
    doList: [],
    dontList: [
        "No ballbusting content",
        "No piss content in chat",
        "No custom for guy-sub gender content",
    ],
    social: [
      { platform: "Instagram", handle: "@tylerrexreal", url: "https://www.instagram.com/tylerrexreal/", agency: false, },
      { platform: "OnlyFans", handle: "@tylerrex", url: "https://onlyfans.com/tylerrex", agency: false, },
      { platform: "OFTV", handle: "@tyler-rex", url: "https://of.tv/creators/tyler-rex/", agency: true, },
      { platform: "Twitter", handle: "@tyler_rex85", url: "https://x.com/tyler_rex85", agency: true, },
    ],
    customPricing: [
      { item: "5 Min Custom", price: "$150", },
      { item: "10 Min Custom", price: "$250", },
      { item: "Pee + (Fansly)", price: "$150", },
      { item: "Cum +", price: "+$40", },
      { item: "Anal Play +", price: "+$80", },
      { item: "Video Call", price: "No VC", },
      { item: "1-5 Pictures", price: "$50", },
      { item: "Used Underwear / Socks", price: "$200", },
    ],
    chattingStyle: [
      { label: "Tone", value: "Flirty / Extreme", },
      { label: "Sample Opener", value: "Do you like daddy's big cock? What would you do with this cock?", },
    ],
    notes: "No custom for guy-sub gender content. Filming every Thursday and Sunday. Shows face in explicit.",
  },
  {
    id: "ollie",
    displayName: "Ollie Nibs",
    realName: "Ollie Niblett",
    tagline: "Gaming & Content",
    color: "#3B82F6",
    colorDim: "rgba(59,130,246,0.15)",
    avatar: "ON",
    status: "active",
    tier: "Star",
    primaryAccount: "@ollie.nibs",
    primaryPlatform: "Instagram",
    timezone: "London (GMT)",
    joined: "Mar 2025",
    location: "UK",
    ethnicity: "White British",
    languages: "English",
    birthday: "Feb 6th, 2001",
    relationship: "In a relationship",
    hobbies: "Gaming, streaming",
    pets: "",
    height: "5'7 / 80kg",
    favoritePart: "Body",
    leastFavorite: "Legs",
    persona: "Engaging gamer persona",
    turnsOn: "Woman",
    fantasy: "Various",
    doList: [
        "Straightforward wanking",
    ],
    dontList: [
        "No ass play",
        "No humiliation",
        "No dirty talk",
        "NO CUSTOM",
    ],
    social: [
      { platform: "Instagram", handle: "@ollie.nibs", url: "https://instagram.com/ollie.nibs", agency: false, },
      { platform: "Twitter", handle: "@ONOnlyFx", url: "https://x.com/ONOnlyFx", agency: true, },
      { platform: "OFTV", handle: "@ollie-nibs", url: "https://of.tv/creators/ollie-nibs", agency: true, },
      { platform: "YouTube", handle: "@ollienibs", url: "https://www.youtube.com/@ollienibs", agency: true, },
      { platform: "TikTok", handle: "@ollie_nibs", url: "https://www.tiktok.com/@ollie_nibs", agency: true, },
      { platform: "Twitch", handle: "@ollienibs", url: "https://www.twitch.tv/ollienibs", agency: true, },
    ],
    customPricing: [
      { item: "5 Min Custom", price: "No custom requests", },
      { item: "Trailers Only", price: "Shower Pic", },
    ],
    chattingStyle: [
      { label: "Tone", value: "Flirty / Extreme", },
      { label: "Sample Opener", value: "Do you like daddy's big cock? What would you do with this cock?", },
    ],
    notes: "MODEL IS NO LONGER TAKING ANY CUSTOM REQUEST. Filming every Thursday and Sunday. Shows face in explicit.",
  },
  {
    id: "cam",
    displayName: "Cam Dade",
    realName: "Cam Dade",
    tagline: "UK Fitness & Content",
    color: "#06B6D4",
    colorDim: "rgba(6,182,212,0.15)",
    avatar: "CD",
    status: "active",
    tier: "Premium",
    primaryAccount: "@camerondade",
    primaryPlatform: "Instagram",
    timezone: "UK (GMT)",
    joined: "Jan 2025",
    location: "Durham, England",
    ethnicity: "British",
    languages: "English",
    birthday: "August 31st, 2000",
    relationship: "Single",
    hobbies: "Fitness, content creation",
    pets: "",
    height: "5'10 / 77kg",
    favoritePart: "My abs and biceps",
    leastFavorite: "N/A",
    persona: "Athletic fitness creator",
    turnsOn: "N/A",
    fantasy: "N/A",
    doList: ["Straightforward wanking"],
    dontList: ["No ass play", "No humiliation", "No dirty talk", "Shows face in explicit"],
    social: [
      { platform: "Instagram", handle: "@camerondade", url: "https://www.instagram.com/camerondade/", agency: false },
      { platform: "Twitter", handle: "@cameron_dade", url: "https://x.com/cameron_dade", agency: true },
      { platform: "OFTV", handle: "@camerons-quest", url: "https://of.tv/creators/camerons-quest/", agency: true },
      { platform: "TikTok LIVE", handle: "@camdade2.0", url: "https://www.tiktok.com/@camdade2.0", agency: true },
    ],
    customPricing: [
      { item: "5 Min Custom", price: "$300" },
      { item: "10 Min Custom", price: "$350" },
      { item: "Cum +", price: "+$50" },
      { item: "1-5 Pictures", price: "$50" },
      { item: "Used Underwear / Socks", price: "$150" },
    ],
    chattingStyle: [
      { label: "Tone", value: "Flirty / Extreme" },
      { label: "Sample Opener", value: "Do you like daddy's big cock? What would you do with this cock?" },
    ],
    notes: "Filming every Thursday and Sunday. Shows face in explicit.",
  },
  {
    id: "amam",
    displayName: "Amam",
    realName: "Amam",
    tagline: "Bangkok ABG Fitness",
    color: "#F472B6",
    colorDim: "rgba(244,114,182,0.15)",
    avatar: "AM",
    status: "active",
    tier: "Top",
    primaryAccount: "@amammyw",
    primaryPlatform: "Instagram",
    timezone: "ICT (Bangkok)",
    joined: "Jan 2025",
    location: "Bangkok, Thailand",
    ethnicity: "Thai",
    languages: "Thai, English",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "Fitness, gym, modelling",
    pets: "",
    height: "Bra: 32B (350cc implants)",
    favoritePart: "Ass and belly",
    leastFavorite: "Fingers",
    persona: "ABG fitness queen",
    turnsOn: "N/A",
    fantasy: "Make me a slave",
    doList: [],
    dontList: ["No anal", "No video call", "No G/G", "No squirting", "Only simple dirty talk in English"],
    social: [
      { platform: "Instagram", handle: "@amammyw", url: "https://www.instagram.com/amammyw/", agency: false },
      { platform: "Twitter", handle: "@amam7078", url: "https://x.com/amam7078", agency: false },
      { platform: "Twitter (Agency SFW)", handle: "@amammyw__", url: "https://x.com/amammyw__", agency: true },
      { platform: "Twitter (Agency NSFW)", handle: "@amam70783", url: "https://x.com/amam70783", agency: true },
      { platform: "Bluesky", handle: "@amam7078.bsky.social", url: "https://bsky.app/profile/amam7078.bsky.social", agency: true },
      { platform: "TikTok", handle: "@newgerac02x", url: "https://www.tiktok.com/@newgerac02x", agency: false },
      { platform: "IG Fitness", handle: "@AMAM.ABG", url: "https://instagram.com/AMAM.ABG", agency: false },
    ],
    customPricing: [
      { item: "Solo 10 Min", price: "$400" },
      { item: "BG 5 Min", price: "$400" },
      { item: "BG 10 Min", price: "$700" },
      { item: "Close Up Pussy +", price: "+$100" },
      { item: "Cum Swallow +", price: "+$50" },
      { item: "Raw Sex +", price: "+$200" },
      { item: "Creampie +", price: "+$150" },
      { item: "1-5 Pictures", price: "$100" },
      { item: "Used Underwear", price: "$200" },
    ],
    chattingStyle: [
    ],
    notes: "No anal, no video call, no G/G. Only simple dirty talk in English.",
  },
  {
    id: "ellamira",
    displayName: "Ella Mira",
    realName: "Ella",
    tagline: "Thai Dancer & Performer",
    color: "#F59E0B",
    colorDim: "rgba(245,158,11,0.15)",
    avatar: "EM",
    status: "active",
    tier: "Top",
    primaryAccount: "@YOURELLAMIRA",
    primaryPlatform: "Instagram",
    timezone: "ICT (Bangkok)",
    joined: "Jan 2025",
    location: "Bangkok, Thailand",
    ethnicity: "Thai",
    languages: "Thai, English",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "Dancing, music, acting",
    pets: "Tarantula",
    height: "N/A",
    favoritePart: "Body",
    leastFavorite: "N/A",
    persona: "Confident performer - Naghty / mysterious",
    turnsOn: "N/A",
    fantasy: "3-some with 3 men",
    doList: [],
    dontList: [],
    social: [
      { platform: "Instagram", handle: "@YOURELLAMIRA", url: "https://instagram.com/YOURELLAMIRA", agency: false },
      { platform: "Twitter", handle: "@ellamirax", url: "https://x.com/ellamirax", agency: false },
    ],
    customPricing: [
      { item: "Solo 5 Min / Dance", price: "$250" },
      { item: "Solo 10 Min", price: "$400" },
      { item: "Squirting +", price: "+$130" },
      { item: "Anal +", price: "+$200" },
      { item: "Video Call 15min", price: "$750" },
      { item: "GG 5 Min", price: "$750" },
      { item: "GG 10 Min", price: "$1,250" },
      { item: "Squirting +", price: "+$200" },
      { item: "BG 5 Min", price: "$1,000" },
      { item: "BG 10 Min", price: "$1,500" },
      { item: "1-5 Pictures", price: "$100" },
    ],
    chattingStyle: [
    ],
    notes: "Loves dancing. Can do custom dance videos in outfit and song of fan choice.",
  },
  {
    id: "lalita",
    displayName: "Lalita",
    realName: "Lalita",
    tagline: "Thai-Japanese Beauty",
    color: "#EC4899",
    colorDim: "rgba(236,72,153,0.15)",
    avatar: "LA",
    status: "active",
    tier: "Premium",
    primaryAccount: "@lalita__asian",
    primaryPlatform: "Twitter",
    timezone: "PST (California)",
    joined: "Jan 2025",
    location: "Thai-Japanese",
    ethnicity: "Thai-Japanese",
    languages: "Thai, English",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "Dancing, acting, shopping, exercise, travel",
    pets: "",
    height: "165cm / 46kg",
    favoritePart: "Body",
    leastFavorite: "N/A",
    persona: "Beauty & lifestyle",
    turnsOn: "Making her man happy",
    fantasy: "Doggy, man on top",
    doList: [],
    dontList: ["No anal"],
    social: [
      { platform: "Twitter", handle: "@lalita__asian", url: "https://x.com/lalita__asian", agency: true },
      { platform: "Instagram", handle: "@noirxsarah", url: "https://www.instagram.com/noirxsarah", agency: false },
    ],
    customPricing: [
      { item: "Solo 5 Min", price: "$175" },
      { item: "Solo 10 Min", price: "$300" },
      { item: "Squirting +", price: "+$50" },
      { item: "Anal +", price: "No" },
      { item: "Video Call 15min", price: "$350 (Zoom)" },
      { item: "GG 5 Min", price: "$400" },
      { item: "GG 10 Min", price: "$700" },
      { item: "BG 5 Min", price: "$450" },
      { item: "BG 10 Min", price: "$750" },
      { item: "BG Creampie", price: "$1,200" },
      { item: "Blowjob / Cum Swallow", price: "$900" },
      { item: "1-5 Pictures", price: "$120" },
    ],
    chattingStyle: [
    ],
    notes: "Video calls via Zoom (no Snapchat). May have friend for translation or use Google Translate.",
  },
  {
    id: "ren",
    displayName: "Ren / Rin",
    realName: "Rin Katsuki",
    tagline: "Japanese Content Creator",
    color: "#EF4444",
    colorDim: "rgba(239,68,68,0.15)",
    avatar: "RK",
    status: "active",
    tier: "Top",
    primaryAccount: "@rin_japan518",
    primaryPlatform: "Instagram",
    timezone: "JST (Japan)",
    joined: "Jan 2025",
    location: "Japan",
    ethnicity: "Japanese",
    languages: "Japanese, English",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "Golf, cooking, anime",
    pets: "",
    height: "N/A",
    favoritePart: "N/A",
    leastFavorite: "N/A",
    persona: "Japanese bilingual creator",
    turnsOn: "N/A",
    fantasy: "N/A",
    doList: [],
    dontList: ["No anal", "Use English only in chat (legal issue)", "Only sell censored content to Japanese fans"],
    social: [
      { platform: "Instagram", handle: "@rin_japan518", url: "https://www.instagram.com/rin_japan518/", agency: false },
      { platform: "Instagram", handle: "@RIN_JAPAN518", url: "https://instagram.com/RIN_JAPAN518", agency: true },
      { platform: "Instagram", handle: "@RINXRENX", url: "https://instagram.com/RINXRENX", agency: false },
      { platform: "Twitter (Agency)", handle: "@rin_japan518", url: "https://x.com/rin_japan518", agency: true },
      { platform: "Twitter (Personal)", handle: "@Rin2t3y", url: "https://x.com/Rin2t3y", agency: false },
      { platform: "TikTok", handle: "@renkatsuki01", url: "https://www.tiktok.com/@renkatsuki01", agency: false },
    ],
    customPricing: [
      { item: "Solo 5 Min", price: "$400" },
      { item: "Solo 10 Min", price: "$700" },
      { item: "Squirting +", price: "+$250" },
      { item: "Pee + (Fansly)", price: "+$200" },
      { item: "Anal +", price: "No" },
      { item: "GG 5 Min", price: "$700" },
      { item: "GG 10 Min", price: "$1,000" },
      { item: "Squirting +", price: "+$300" },
      { item: "BG 5 Min", price: "$1,000" },
      { item: "BG 10 Min", price: "$1,500" },
      { item: "ANAL +", price: "+$500 (10min+)" },
      { item: "1-5 Pictures", price: "$150" },
      { item: "Used Panties", price: "$500" },
    ],
    chattingStyle: [
    ],
    notes: "Only use English in chat (legal requirement). Label JP fans. Customs for $500+ spenders only. $600 no-discount.",
  },
  {
    id: "kiyomi",
    displayName: "Kiyomi",
    realName: "Kiyomi",
    tagline: "Thai-Korean Fitness",
    color: "#14B8A6",
    colorDim: "rgba(20,184,166,0.15)",
    avatar: "KI",
    status: "active",
    tier: "Premium",
    primaryAccount: "@hina.kiyomi",
    primaryPlatform: "Instagram",
    timezone: "ICT (Bangkok)",
    joined: "Jan 2025",
    location: "Thai / South Korea",
    ethnicity: "Thai-Korean",
    languages: "English",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "Fitness, studying English in US",
    pets: "Cats: Franklin & Penny",
    height: "158cm / 38kg",
    favoritePart: "N/A",
    leastFavorite: "N/A",
    persona: "Fitness influencer",
    turnsOn: "N/A",
    fantasy: "N/A",
    doList: [],
    dontList: ["Anal must be small or only butt plug"],
    social: [
      { platform: "Instagram", handle: "@hina.kiyomi", url: "https://www.instagram.com/hina.kiyomi/", agency: false },
      { platform: "Twitter", handle: "@kiyomi_hina_", url: "https://x.com/kiyomi_hina_", agency: true },
      { platform: "Telegram", handle: "@kiyomihinaa", url: "https://t.me/kiyomihinaa", agency: true },
    ],
    customPricing: [
      { item: "Solo 5 Min", price: "$200" },
      { item: "Solo 10 Min", price: "$350" },
      { item: "Squirting +", price: "+$100" },
      { item: "Pee + (Fansly)", price: "+$200" },
      { item: "Anal +", price: "$100 (butt plug only)" },
      { item: "GG 5 Min", price: "$500" },
      { item: "GG 10 Min", price: "$700" },
      { item: "BG 10 Min", price: "$1,200" },
      { item: "1-5 Pictures", price: "$120" },
    ],
    chattingStyle: [
    ],
    notes: "Accept negotiation only for $1,000+ spenders.",
  },
  {
    id: "kiroko",
    displayName: "Kiroko",
    realName: "Kiroko",
    tagline: "Fitness & Lifestyle",
    color: "#0EA5E9",
    colorDim: "rgba(14,165,233,0.15)",
    avatar: "KO",
    status: "active",
    tier: "Premium",
    primaryAccount: "@Kiroko_fitness",
    primaryPlatform: "Instagram",
    timezone: "ICT (Bangkok)",
    joined: "Jan 2025",
    location: "Thai / South Korea",
    ethnicity: "Thai-Korean",
    languages: "English",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "Fitness, studying English in US",
    pets: "Cats: Franklin & Penny",
    height: "158cm / 38kg",
    favoritePart: "N/A",
    leastFavorite: "N/A",
    persona: "Fitness lifestyle",
    turnsOn: "N/A",
    fantasy: "N/A",
    doList: [],
    dontList: ["Anal must be small or only butt plug"],
    social: [
      { platform: "Instagram", handle: "@Kiroko_fitness", url: "https://instagram.com/Kiroko_fitness", agency: true },
    ],
    customPricing: [
      { item: "Solo 5 Min", price: "$500" },
      { item: "Solo 10 Min", price: "$1,250" },
      { item: "Squirting +", price: "+$1,000" },
      { item: "Pee + (Fansly)", price: "+$750" },
      { item: "Anal +", price: "$500 (butt plug only)" },
      { item: "GG 5 Min", price: "$500" },
      { item: "GG 10 Min", price: "$700" },
      { item: "BG 5 Min", price: "$500" },
      { item: "BG 10 Min", price: "$950" },
      { item: "1-5 Pictures", price: "$120" },
      { item: "Used Panties", price: "$300+SF" },
    ],
    chattingStyle: [
    ],
    notes: "Different account from Kiyomi. Accept negotiation for $1,000+ spenders.",
  },
  {
    id: "rubchan",
    displayName: "Ruby Chan",
    realName: "Ruby Chan",
    tagline: "Thai Beauty & Cosmetology",
    color: "#A855F7",
    colorDim: "rgba(168,85,247,0.15)",
    avatar: "RC",
    status: "active",
    tier: "Premium",
    primaryAccount: "@rubychan.asian",
    primaryPlatform: "Instagram",
    timezone: "ICT (Bangkok)",
    joined: "Jan 2025",
    location: "Thailand",
    ethnicity: "Thai",
    languages: "Thai, English",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "Handcraft, make-up, cooking",
    pets: "",
    height: "168cm / 53kg",
    favoritePart: "Body",
    leastFavorite: "N/A",
    persona: "Beauty & lifestyle creator",
    turnsOn: "N/A",
    fantasy: "Everything",
    doList: [],
    dontList: ["No anal", "Only butt plug allowed for anal"],
    social: [
      { platform: "Instagram", handle: "@rubychan.asian", url: "https://www.instagram.com/rubychan.asian/", agency: false },
    ],
    customPricing: [
      { item: "Solo 5 Min", price: "$500" },
      { item: "Solo 10 Min", price: "$750" },
      { item: "Squirting +", price: "+$450" },
      { item: "Pee + (Fansly)", price: "N/A" },
      { item: "Anal +", price: "$100 (butt plug only)" },
      { item: "GG 5 Min", price: "$500" },
      { item: "GG 10 Min", price: "$750" },
      { item: "BG 10 Min", price: "$1,250" },
      { item: "1-5 Pictures", price: "$120" },
    ],
    chattingStyle: [
    ],
    notes: "OK only with butt plug for anal. Base price $350 for 5 min for extreme requests like anal gaping.",
  },
  {
    id: "lia",
    displayName: "Lia",
    realName: "Lia",
    tagline: "Thai-Japanese Psychology",
    color: "#8B5CF6",
    colorDim: "rgba(139,92,246,0.15)",
    avatar: "LI",
    status: "active",
    tier: "Premium",
    primaryAccount: "@lia",
    primaryPlatform: "OnlyFans",
    timezone: "ICT (Bangkok)",
    joined: "Jan 2025",
    location: "Bangkok, Thailand",
    ethnicity: "Thai-Japanese",
    languages: "Thai, English",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "Reading books",
    pets: "",
    height: "170cm / 45kg",
    favoritePart: "N/A",
    leastFavorite: "N/A",
    persona: "Introverted beauty",
    turnsOn: "Playing for a long time",
    fantasy: "Below",
    doList: [],
    dontList: ["No anal", "Only butt plug allowed for anal"],
    social: [
      { platform: "OnlyFans", handle: "@lia", url: "https://onlyfans.com/lia", agency: false },
    ],
    customPricing: [
      { item: "Anal +", price: "$100 (butt plug only)" },
    ],
    chattingStyle: [
    ],
    notes: "OK only with butt plug. Likes it like a little girl.",
  },
  {
    id: "ming",
    displayName: "Ming",
    realName: "Ming",
    tagline: "Bangkok Petites",
    color: "#D946EF",
    colorDim: "rgba(217,70,239,0.15)",
    avatar: "MI",
    status: "paused",
    tier: "Rising",
    primaryAccount: "@ming",
    primaryPlatform: "OnlyFans",
    timezone: "ICT (Bangkok)",
    joined: "Feb 2025",
    location: "Bangkok, Thailand",
    ethnicity: "Thai",
    languages: "Thai",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "N/A",
    pets: "",
    height: "163cm / 36kg",
    favoritePart: "N/A",
    leastFavorite: "N/A",
    persona: "Petite Thai creator",
    turnsOn: "N/A",
    fantasy: "N/A",
    doList: [],
    dontList: [],
    social: [
    ],
    customPricing: [
    ],
    chattingStyle: [
    ],
    notes: "Pricing pending.",
  },
  {
    id: "kitten",
    displayName: "Kitten",
    realName: "Kitten",
    tagline: "Petite Innocent Thai",
    color: "#FB923C",
    colorDim: "rgba(251,146,60,0.15)",
    avatar: "KT",
    status: "active",
    tier: "Star",
    primaryAccount: "@kitten",
    primaryPlatform: "OnlyFans",
    timezone: "ICT (Bangkok)",
    joined: "Jan 2025",
    location: "Bangkok, Thailand",
    ethnicity: "Thai",
    languages: "Thai",
    birthday: "N/A",
    relationship: "Single",
    hobbies: "Cooking, movies, cats",
    pets: "",
    height: "160cm / 37kg",
    favoritePart: "N/A",
    leastFavorite: "N/A",
    persona: "Cute, innocent, submissive - Petite innocent Asian",
    turnsOn: "N/A",
    fantasy: "Blowjob, solo play",
    doList: [],
    dontList: ["No ANAL"],
    social: [
      { platform: "OnlyFans", handle: "@kitten", url: "https://onlyfans.com/kitten", agency: false },
    ],
    customPricing: [
      { item: "Solo 5 Min", price: "$500+" },
    ],
    chattingStyle: [
    ],
    notes: "Niche: Petite innocent Asian. Loves cooking and sweet wifey-style content. Submissive, tiny body type.",
  },
];


export function ModelManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedModel, setSelectedModel] = useState<ModelProfile | null>(null);

  const filtered = MODELS.filter(m => {
    const q = searchQuery.toLowerCase();
    return (
      (filterStatus === "All" || m.status === filterStatus) &&
      (!q || m.displayName.toLowerCase().includes(q) || m.realName.toLowerCase().includes(q) || m.primaryAccount.toLowerCase().includes(q))
    );
  });

  const activeCount = MODELS.filter(m => m.status === "active").length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--nva-text)", marginBottom: 4 }}>Model Management</h2>
          <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>All {MODELS.length} models &mdash; click any card to view their Info Sheet</p>
        </div>
        <button className="btn-nva-primary"><Plus size={15} /> Add New Model</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Models", value: MODELS.length, sub: `${activeCount} active`, color: "var(--nva-gold)" },
          { label: "Info Sheets", value: MODELS.length, sub: "All complete", color: "var(--nva-gold)" },
          { label: "Avg Retention", value: "91%", sub: "Across all", color: "var(--nva-green)" },
          { label: "Avg Engagement", value: "7.2%", sub: "All platforms", color: "var(--nva-amber)" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="card-nva" style={{ padding: "18px" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--nva-muted)", marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: 10, color: "var(--nva-green)", marginTop: 2 }}>{s.sub}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--nva-muted-2)" }} />
          <input className="input-nva" placeholder="Search by name, handle, or nickname..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} style={{ paddingLeft: 34, height: 38, fontSize: 13 }} />
        </div>
        <select className="input-nva" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          style={{ height: 38, fontSize: 12, width: 130, paddingLeft: 12 }}>
          <option>All</option>
          <option>active</option>
          <option>paused</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {filtered.map((model, i) => {
          const statusColor = model.status === "active" ? "var(--nva-green)" : "var(--nva-amber)";
          return (
            <motion.div key={model.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card-nva" style={{ padding: "20px", cursor: "pointer" }}
              onClick={() => setSelectedModel(model)}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,168,83,0.35)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--nva-border)"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: `linear-gradient(135deg, ${model.color}, ${model.colorDim})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 900, color: "#0a0a0f",
                }}>{model.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "var(--nva-text)", marginBottom: 2 }}>{model.displayName}</div>
                  <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{model.realName}</div>
                  <div style={{ fontSize: 10, color: model.color, marginTop: 2 }}>{model.tagline}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "3px 9px", borderRadius: 8, fontSize: 9, fontWeight: 700,
                    background: `${statusColor}15`, border: `1px solid ${statusColor}25`,
                    color: statusColor,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor }} />
                    {model.status}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                <div style={{ padding: "10px 12px", borderRadius: 10, background: "var(--nva-surface-2)" }}>
                  <div style={{ fontSize: 10, color: "var(--nva-muted)", marginBottom: 2 }}>Timezone</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-text)" }}>{model.timezone.split(" (")[0]}</div>
                </div>
                <div style={{ padding: "10px 12px", borderRadius: 10, background: "var(--nva-surface-2)" }}>
                  <div style={{ fontSize: 10, color: "var(--nva-muted)", marginBottom: 2 }}>Platform</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-text)" }}>{model.primaryPlatform}</div>
                </div>
              </div>

              <div style={{ padding: "10px 12px", borderRadius: 10, background: "var(--nva-surface-2)", marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: "var(--nva-muted)", marginBottom: 3 }}>Primary Account</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: model.color }}>{model.primaryAccount}</div>
              </div>

              <button
                onClick={e => { e.stopPropagation(); setSelectedModel(model); }}
                className="btn-nva-primary" style={{ width: "100%", justifyContent: "center", fontSize: 12 }}>
                <FileText size={13} /> View Model Info Sheet
              </button>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--nva-muted)" }}>
          <Users size={36} style={{ margin: "0 auto 12px", display: "block", opacity: 0.3 }} />
          <p style={{ fontSize: 14, fontWeight: 600 }}>No models found</p>
        </div>
      )}

      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedModel(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "center", backdropFilter: "blur(8px)", padding: "20px", overflowY: "auto" }}>
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{ width: "100%", maxWidth: 900, borderRadius: 20, border: "1px solid rgba(212,168,83,0.2)", background: "var(--nva-bg)", overflow: "hidden", margin: "20px 0 40px" }}>
              <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--nva-border)", display: "flex", alignItems: "center", gap: 16, background: "var(--nva-surface)" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                  background: `linear-gradient(135deg, ${selectedModel.color}, ${selectedModel.colorDim})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, fontWeight: 900, color: "#0a0a0f",
                  border: `2px solid ${selectedModel.color}40`,
                }}>{selectedModel.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "var(--nva-text)", letterSpacing: "-0.01em" }}>{selectedModel.displayName}</div>
                  <div style={{ fontSize: 12, color: "var(--nva-muted)", marginTop: 2 }}>{selectedModel.realName} &nbsp;&bull;&nbsp; {selectedModel.timezone}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: selectedModel.status === "active" ? "rgba(74,222,128,0.12)" : "rgba(251,191,36,0.12)", border: "1px solid rgba(74,222,128,0.2)", color: selectedModel.status === "active" ? "var(--nva-green)" : "var(--nva-amber)" }}>
                      {selectedModel.status.toUpperCase()}
                    </span>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: `${selectedModel.color}15`, border: `1px solid ${selectedModel.color}30`, color: selectedModel.color }}>
                      {selectedModel.tier} TIER
                    </span>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)", color: "var(--nva-muted)" }}>
                      Joined {selectedModel.joined}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedModel(null)}
                  style={{ width: 36, height: 36, borderRadius: 10, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--nva-muted)" }}>
                  <X size={15} />
                </button>
              </div>

              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <InfoSection title="Background" icon="01">
                      <InfoRow label="Birthday" value={selectedModel.birthday} />
                      <InfoRow label="Location" value={selectedModel.location} />
                      <InfoRow label="Ethnicity" value={selectedModel.ethnicity} />
                      <InfoRow label="Languages" value={selectedModel.languages} />
                      <InfoRow label="Relationship" value={selectedModel.relationship} />
                      {selectedModel.pets && <InfoRow label="Pets" value={selectedModel.pets} />}
                      {selectedModel.hobbies && <InfoRow label="Hobbies" value={selectedModel.hobbies} />}
                    </InfoSection>

                    <InfoSection title="Body & Appearance" icon="02">
                      <InfoRow label="Height / Weight" value={selectedModel.height} />
                      <InfoRow label="Favorite Part" value={selectedModel.favoritePart} highlight />
                      <InfoRow label="Least Favorite" value={selectedModel.leastFavorite} muted />
                    </InfoSection>

                    <InfoSection title="Persona & Turn-ons" icon="03">
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Persona</div>
                        <div style={{ fontSize: 13, color: selectedModel.color, fontWeight: 600 }}>{selectedModel.persona}</div>
                      </div>
                      <InfoRow label="Turn-ons" value={selectedModel.turnsOn} />
                      <InfoRow label="Fantasy" value={selectedModel.fantasy} highlight />
                    </InfoSection>

                    {selectedModel.chattingStyle.length > 0 && (
                      <InfoSection title="Chatting Style" icon="04">
                        {selectedModel.chattingStyle.map(cs => (
                          <InfoRow key={cs.label} label={cs.label} value={cs.value} />
                        ))}
                      </InfoSection>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <InfoSection title="Social Accounts" icon="05">
                      {selectedModel.social.map(s => (
                        <div key={s.url} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 8, background: "var(--nva-surface-2)", marginBottom: 6 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "var(--nva-muted)", minWidth: 60 }}>{s.platform}</span>
                            <span style={{ fontSize: 12, color: "var(--nva-text)" }}>{s.handle}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {s.agency && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "rgba(212,168,83,0.1)", color: "var(--nva-gold)", fontWeight: 700 }}>AGENCY</span>}
                            <a href={s.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                              style={{ color: "var(--nva-muted)", display: "flex" }}>
                              <ExternalLink size={11} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </InfoSection>

                    {selectedModel.customPricing.length > 0 && (
                      <InfoSection title="Custom Content Pricing" icon="06">
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {selectedModel.customPricing.map(cp => (
                            <div key={cp.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", borderRadius: 8, background: "var(--nva-surface-2)" }}>
                              <span style={{ fontSize: 12, color: "var(--nva-text)" }}>{cp.item}</span>
                              <span style={{ fontSize: 13, fontWeight: 800, color: cp.price.includes("No") ? "var(--nva-red)" : "var(--nva-gold)" }}>{cp.price}</span>
                            </div>
                          ))}
                        </div>
                      </InfoSection>
                    )}

                    {(selectedModel.dontList.length > 0 || selectedModel.doList.length > 0) && (
                      <InfoSection title="Content Rules" icon="07">
                        {selectedModel.dontList.length > 0 && (
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--nva-red)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                              <AlertCircle size={11} /> Don&apos;t Do
                            </div>
                            {selectedModel.dontList.map(r => (
                              <div key={r} style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 3, paddingLeft: 8, borderLeft: "2px solid rgba(239,68,68,0.3)" }}>{r}</div>
                            ))}
                          </div>
                        )}
                        {selectedModel.doList.length > 0 && (
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--nva-green)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                              <CheckCircle size={11} /> Can Do
                            </div>
                            {selectedModel.doList.map(r => (
                              <div key={r} style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 3, paddingLeft: 8, borderLeft: "2px solid rgba(74,222,128,0.3)" }}>{r}</div>
                            ))}
                          </div>
                        )}
                      </InfoSection>
                    )}

                    {selectedModel.notes && (
                      <InfoSection title="Notes" icon="08">
                        <div style={{ fontSize: 12, color: "var(--nva-muted)", lineHeight: 1.65, padding: "10px 12px", borderRadius: 8, background: "rgba(212,168,83,0.04)", border: "1px solid rgba(212,168,83,0.1)" }}>
                          {selectedModel.notes}
                        </div>
                      </InfoSection>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 14, border: "1px solid var(--nva-border)", overflow: "hidden", background: "var(--nva-surface)" }}>
      <div style={{ padding: "10px 14px", background: "rgba(212,168,83,0.04)", borderBottom: "1px solid var(--nva-border)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 900, color: "var(--nva-gold)", background: "rgba(212,168,83,0.12)", padding: "2px 7px", borderRadius: 6 }}>{icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--nva-text)", letterSpacing: "0.01em" }}>{title}</span>
      </div>
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight, muted }: { label: string; value: string; highlight?: boolean; muted?: boolean }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
      <span style={{ fontSize: 11, color: "var(--nva-muted)", flexShrink: 0, minWidth: 90 }}>{label}</span>
      <span style={{
        fontSize: 12, fontWeight: muted ? 400 : 600,
        color: highlight ? "var(--nva-gold)" : muted ? "var(--nva-muted)" : "var(--nva-text)",
        textAlign: "right",
      }}>{value}</span>
    </div>
  );
}
