/* Edit this file to add, remove or change products.
   art: f = cat face (stare|smug|scream|sleepy), c = cat colour, b = background, e = emoji.
   To use a real photo instead, add  img: "img/loaf-mode.jpg"  to a product. */
window.MEWKEY = {
  FREE_SHIP: 35,
  ENGRAVE: 3,
  EMAIL: "hello@mewkey.shop",
  CATS: {
    "cat":      ["🐱 Cats", "Loafs, chonks & tiny voids"],
    "meme":     ["🤡 Memes", "Internet brain, pocket sized"],
    "cat-meme": ["😹 Cat Memes", "The holy combo"]
  },
  MATERIALS: [["Glossy acrylic", 0], ["Glitter acrylic", 1], ["Soft enamel", 2]],
  SIZES: [["Mini", -1], ["Classic", 0], ["Chonky", 2]],
  RINGS: [["Gold", "#E8B923"], ["Silver", "#B8BCC8"], ["Rose", "#E88A9A"], ["Black", "#2A1304"]],
  PRODUCTS: [
    { id: "loaf-mode", name: "Loaf Mode", cat: "cat", price: 11, rating: 4.9, n: 412, badge: "Bestseller", tag: "Fully baked. Zero thoughts.", art: { f: "sleepy", c: "#FFE3C2", b: "#FFB347" } },
    { id: "void-bean", name: "Void Bean", cat: "cat", price: 10, rating: 4.8, n: 268, tag: "Small. Black. Infinite.", art: { f: "stare", c: "#3A2A20", b: "#FFD3A8" } },
    { id: "sir-chonk", name: "Sir Chonkington", cat: "cat", price: 13, rating: 5.0, n: 189, badge: "Staff pick", tag: "Royalty is a weight class.", art: { f: "smug", c: "#FFA64D", b: "#FFE3C2", e: "👑" } },
    { id: "keyboard-gremlin", name: "Keyboard Gremlin", cat: "cat", price: 12, rating: 4.7, n: 154, tag: "asdfghjkl;;;;;;;;", art: { f: "scream", c: "#C46A1A", b: "#FFD3A8", e: "⌨️" } },
    { id: "skill-issue", name: "Skill Issue", cat: "meme", price: 11, rating: 4.6, n: 201, tag: "Rage quit, but make it cute.", art: { b: "#FFC890", e: "🎮" } },
    { id: "big-mood-toast", name: "Big Mood Toast", cat: "meme", price: 10, rating: 4.8, n: 337, badge: "Bestseller", tag: "Lightly toasted. Heavily tired.", art: { b: "#FFE3C2", e: "🍞" } },
    { id: "brain-404", name: "Brain.exe 404", cat: "meme", price: 12, rating: 4.7, n: 176, badge: "New", tag: "Thoughts not found.", art: { b: "#FFB347", e: "🧠" } },
    { id: "main-character", name: "Main Character Avo", cat: "meme", price: 12, rating: 4.9, n: 143, tag: "Plot armor: activated.", art: { b: "#FFD3A8", e: "🥑" } },
    { id: "crying-thumbs-up-cat", name: "It Do Be Okay Cat", cat: "cat-meme", price: 12, rating: 5.0, n: 529, badge: "Bestseller", tag: "Crying, but supportive.", art: { f: "scream", c: "#FFF1DC", b: "#FFB347", e: "👍" } },
    { id: "huh-cat", name: "Huh? Cat", cat: "cat-meme", price: 11, rating: 4.8, n: 298, tag: "???", art: { f: "stare", c: "#FFF1DC", b: "#FFC890", e: "❓" } },
    { id: "vibing-cat", name: "Vibe Check Cat", cat: "cat-meme", price: 12, rating: 4.9, n: 221, badge: "New", tag: "Head bob certified.", art: { f: "smug", c: "#8A4B14", b: "#FFE3C2", e: "🎧" } },
    { id: "bread-cat", name: "Inbread Cat", cat: "cat-meme", price: 13, rating: 4.9, n: 187, badge: "Limited", tag: "Wears carbs. Has regrets.", art: { f: "sleepy", c: "#FFA64D", b: "#FFD3A8", e: "🍞" } }
  ]
};
