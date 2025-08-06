class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(value, priority) {
        const newItem = { value, priority };
        if (this.queue.length === 0) {
            this.queue.push(newItem);
        } else {
            let index = this.queue.findIndex(item => item.priority > priority);
            if (index === -1) {
                this.queue.push(newItem); // إذا كانت الأولوية أكبر من جميع العناصر الموجودة
            } else {
                this.queue.splice(index, 0, newItem); // إدراج في الموقع الصحيح
            }
        }
        this.drawQueue();
    }

    dequeue() {
        if (this.queue.length === 0) return null;
        const item = this.queue.shift();
        this.drawQueue();
        return item;
    }

    search(value, priority = null) {
        return this.queue.find(item => item.value === value && (priority === null || item.priority === priority)) || null;
    }

    display() {
        return this.queue;
    }

    drawQueue() {
        const canvas = document.getElementById('queueCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.queue.forEach((item, index) => {
            ctx.fillStyle = 'rgba(0, 150, 255, 0.7)';
            ctx.fillRect(50, 30 * index + 10, 100, 25);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(`(${item.value}, ${item.priority})`, 75, 30 * index + 28);
        });
    }
}

// UI
const priorityQueue = new PriorityQueue();

function updateDisplay() {
    document.getElementById('queueDisplay').textContent = 'Priority Queue: ' + 
        priorityQueue.display().map(item => `(${item.value}, ${item.priority})`).join(', ');
    priorityQueue.drawQueue();
}

function handleEnqueue() {
    const value = Number(document.getElementById('value').value);
    const priority = Number(document.getElementById('priority').value);
    if (!isNaN(value) && !isNaN(priority)) {
        priorityQueue.enqueue(value, priority);
        updateDisplay();
    }
}

function handleDequeue() {
    priorityQueue.dequeue();
    updateDisplay();
}

function handleSearch() {
    const value = Number(document.getElementById('value').value);
    const priority = document.getElementById('priority').value ? Number(document.getElementById('priority').value) : null;
    let found = priorityQueue.search(value, priority);
    alert(found ? `Found: (${found.value}, ${found.priority})` : 'Not found');
}

document.addEventListener('DOMContentLoaded', updateDisplay);
