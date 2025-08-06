class Heap {
    constructor(type = 'max') {
        this.heap = [];
        this.type = type;
        this.highlightedIndex = -1; // لتحديد العقدة التي تم العثور عليها
    }
    
    compare(a, b) {
        return this.type === 'max' ? a > b : a < b;
    }
    
    insert(value) {
        this.heap.push(value);
        this.bubbleUp();
        this.drawHeap();
    }
    
    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex])) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }
    
    extract() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);
        this.drawHeap();
        return root;
    }
    
    sinkDown(index) {
        let length = this.heap.length;
        while (true) {
            let leftIndex = 2 * index + 1;
            let rightIndex = 2 * index + 2;
            let swapIndex = null;
            
            if (leftIndex < length && this.compare(this.heap[leftIndex], this.heap[index])) {
                swapIndex = leftIndex;
            }
            
            if (rightIndex < length && this.compare(this.heap[rightIndex], this.heap[swapIndex ?? index])) {
                swapIndex = rightIndex;
            }
            
            if (swapIndex === null) break;
            [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
            index = swapIndex;
        }
    }
    
    search(value) {
        this.highlightedIndex = this.heap.indexOf(value);
        this.drawHeap();
        return this.highlightedIndex !== -1;
    }
    
    display() {
        return this.heap;
    }
    
    drawHeap() {
        const canvas = document.getElementById(this.type + 'Canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const drawNode = (index, x, y, level) => {
            if (index >= this.heap.length) return;
            
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fillStyle = index === this.highlightedIndex ? 'red' : 'rgba(0, 150, 255, 0.7)';
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = 'white';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.heap[index], x, y);
            
            let offset = 50 * Math.pow(2, 3 - level);
            if (2 * index + 1 < this.heap.length) {
                ctx.beginPath();
                ctx.moveTo(x, y + 20);
                ctx.lineTo(x - offset, y + 50);
                ctx.stroke();
                drawNode(2 * index + 1, x - offset, y + 50, level + 1);
            }
            if (2 * index + 2 < this.heap.length) {
                ctx.beginPath();
                ctx.moveTo(x, y + 20);
                ctx.lineTo(x + offset, y + 50);
                ctx.stroke();
                drawNode(2 * index + 2, x + offset, y + 50, level + 1);
            }
        };
        
        drawNode(0, canvas.width / 2, 30, 0);
    }
}

// UI
const maxHeap = new Heap('max');
const minHeap = new Heap('min');

function updateDisplay() {
    document.getElementById('maxHeap').textContent = 'Max Heap: ' + maxHeap.display().join(', ');
    document.getElementById('minHeap').textContent = 'Min Heap: ' + minHeap.display().join(', ');
    maxHeap.drawHeap();
    minHeap.drawHeap();
}

function handleInsert() {
    const value = Number(document.getElementById('value').value);
    if (!isNaN(value)) {
        maxHeap.insert(value);
        minHeap.insert(value);
        updateDisplay();
    }
}

function handleExtract() {
    maxHeap.extract();
    minHeap.extract();
    updateDisplay();
}

function handleSearch() {
    const value = Number(document.getElementById('value').value);
    let foundMax = maxHeap.search(value);
    let foundMin = minHeap.search(value);
    alert('Max Heap: ' + foundMax + '\nMin Heap: ' + foundMin);
}

document.addEventListener('DOMContentLoaded', updateDisplay);
