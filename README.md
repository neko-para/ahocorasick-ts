# AhoCorasick-ts

AhoCorasick automation implemented in TypeScript

Almost the same to [ahocorasick](https://www.npmjs.com/package/ahocorasick), except this package is written in ts.

---

### Reference

```typescript
import { AhoCorasick } from "ahocorasick-ts"

const ac = new AhoCorasick(["123", "345", "456"])

console.log(ac.search("123456"))
```

```
[
  { end: 2, keys: [ '123' ] },
  { end: 4, keys: [ '345' ] },
  { end: 5, keys: [ '456' ] }
]
```
