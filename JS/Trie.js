class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    searchWithPrefix(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this._findAllWords(node, prefix);
    }

    _findAllWords(node, prefix) {
        const words = [];
        if (node.isEndOfWord) {
            words.push(prefix);
        }
        for (const char in node.children) {
            words.push(...this._findAllWords(node.children[char], prefix + char));
        }
        return words;
    }

    clear() {
        this.root = new TrieNode();
    }
}

const trie = new Trie();
const canvas = document.getElementById("trieCanvas");
const ctx = canvas.getContext("2d");

function insertWord() {
    const word = document.getElementById("wordInput").value;
    if (word) {
        trie.insert(word);
        drawTrie();
    }
}

function searchWithPrefix() {
    const prefix = document.getElementById("prefixInput").value;
    if (prefix) {
        const results = trie.searchWithPrefix(prefix);
        document.getElementById("result").innerText = `الكلمات التي تبدأ بـ "${prefix}": ${results.join(', ')}`;
    }
}

function clearTrie() {
    trie.clear();
    document.getElementById("result").innerText = ''; // Clear results
    drawTrie();
}

function drawTrie() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNode(trie.root, canvas.width / 2, 50, canvas.width / 4, '');
}

function drawNode(node, x, y, spacing, char) {
    if (!node) return;
    
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = node.isEndOfWord ? "#ff6347" : "#00d2ff";
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char, x, y);
    
    let index = 0;
    const keys = Object.keys(node.children);
    for (const key of keys) {
        const newX = x + (index - (keys.length - 1) / 2) * spacing;
        const newY = y + 80;
        
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(newX, newY - 20);
        ctx.stroke();
        
        drawNode(node.children[key], newX, newY, spacing / 2, key);
        index++;
    }
}
