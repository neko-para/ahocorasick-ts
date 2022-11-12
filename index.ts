class TrieNode {
  matched: string[]
  child: Record<string, TrieNode>
  failure: TrieNode

  constructor(root?: TrieNode) {
    this.matched = []
    this.child = {}
    if (root) {
      this.failure = root
    } else {
      this.failure = this
    }
  }
}

export interface SearchResult {
  end: number
  keys: string[]
}

export class AhoCorasick {
  trie: TrieNode

  constructor(keyword: string[]) {
    this.trie = new TrieNode()
    keyword.forEach(s => {
      let cur = this.trie
      for (const ch of s) {
        if (!(ch in cur.child)) {
          cur.child[ch] = new TrieNode(this.trie)
        }
        cur = cur.child[ch]
      }
      cur.matched.push(s)
    })

    const queue: TrieNode[] = []
    for (const ch in this.trie.child) {
      queue.push(this.trie.child[ch])
    }
    while (queue.length > 0) {
      const cur = queue.shift() as TrieNode

      for (const ch in cur.child) {
        queue.push(cur.child[ch])

        let f = cur.failure
        while (f !== this.trie && !(ch in f.child)) {
          f = f.failure
        }

        if (ch in f.child) {
          cur.child[ch].failure = f.child[ch]
          cur.child[ch].matched.push(...cur.failure.matched)
        } else {
          cur.child[ch].failure = this.trie
        }
      }
    }
  }

  search(key: string): SearchResult[] {
    let cur = this.trie
    const res: SearchResult[] = []

    key.split('').forEach((ch, i) => {
      while (cur !== this.trie && !(ch in cur.child)) {
        cur = cur.failure
      }
      if (!(ch in cur.child)) {
        return
      }

      cur = cur.child[ch]

      if (cur.matched.length) {
        res.push({
          end: i,
          keys: cur.matched,
        })
      }
    })

    return res
  }
}
