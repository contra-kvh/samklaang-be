const dict: string[] = [
  "apple", "bat", "cat", "dog", "egg", "fish", "goat", "hat", "ice", "jam", "kite", "log", "moon", "net", "owl", 
  "pig", "queen", "rat", "sun", "tree", "urn", "van", "wolf", "xray", "yak", "zip", "ant", "bird", "cake", "duck", 
  "ear", "frog", "gum", "hill", "ink", "jet", "key", "lamp", "mop", "nest", "oak", "pen", "quiz", "rope", "sock", 
  "tap", "urn", "vase", "web", "xylophone", "yarn", "zebra", "axe", "bag", "car", "dew", "eel", "fan", "gem", 
  "hop", "ice", "jug", "kid", "lid", "mud", "nap", "oak", "pit", "queen", "rim", "sip", "toe", "urn", "vet", 
  "wax", "yell", "zip"
];

export const generate = (wordLen: number, separator: string) => {
  let words = []
  for(let i = 0; i < wordLen; i++){
    var item = dict[Math.floor(Math.random()*dict.length)];
    words.push(item)
  }

  return words.join(separator)
}
