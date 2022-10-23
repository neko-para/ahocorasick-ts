import { AhoCorasick } from "./index.js"

const ac = new AhoCorasick(["123", "345", "456"])

console.log(ac.search("123456"))
