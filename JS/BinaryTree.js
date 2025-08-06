class BSTNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(value) {
        if (this.search(value)) {
            console.log(`القيمة ${value} موجودة بالفعل في الشجرة.`);
            return; // منع الإدخال إذا كانت القيمة موجودة
        }
    
        const newNode = new BSTNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
        drawTree();
    }
    

    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    delete(value) {
        this.root = this._deleteNode(this.root, value);
        drawTree();
    }

    _deleteNode(node, value) {
        if (node === null) return null;
        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;
            node.value = this._minValueNode(node.right).value;
            node.right = this._deleteNode(node.right, node.value);
        }
        return node;
    }

    _minValueNode(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    clear() {
        this.root = null;
        drawTree();
    }

    inorder() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }

    _inorder(node, result) {
        if (node) {
            this._inorder(node.left, result);
            result.push(node.value);
            this._inorder(node.right, result);
        }
    }

    postorder() {
        const result = [];
        this._postorder(this.root, result);
        return result;
    }

    _postorder(node, result) {
        if (node) {
            this._postorder(node.left, result);
            this._postorder(node.right, result);
            result.push(node.value);
        }
    }

    levelorder() {
        const result = [];
        if (!this.root) return result;
        const queue = [this.root];
        while (queue.length) {
            const node = queue.shift();
            result.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }

    search(value) {
        return this._searchNode(this.root, value);
    }

    _searchNode(node, value) {
        if (node === null) return false;
        if (value === node.value) return true;
        return value < node.value ? 
            this._searchNode(node.left, value) : 
            this._searchNode(node.right, value);
    }
}

const bst = new BST();
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

function drawTree(node = bst.root, x = canvas.width / 2, y = 50, level = 1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    _drawNode(node, x, y, level, canvas.width / 6); // تعديل هنا لتقليل المسافة
}

function _drawNode(node, x, y, level, gap) {
    if (!node) return;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#2a5298";
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fillText(node.value, x - 5, y + 5);

    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x - gap, y + 70);
        ctx.stroke();
        _drawNode(node.left, x - gap, y + 70, level + 1, gap / 1.5); // تقليل المسافة
    }
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x + gap, y + 70);
        ctx.stroke();
        _drawNode(node.right, x + gap, y + 70, level + 1, gap / 1.5); // تقليل المسافة
    }
}

function insertNode() {
    const value = parseInt(document.getElementById("valueInput").value);
    if (!isNaN(value)) bst.insert(value);
}

function deleteNode() {
    const value = parseInt(document.getElementById("deleteInput").value);
    if (!isNaN(value)) bst.delete(value);
}

function clearTree() {
    bst.clear();
    document.getElementById("result").innerText = ''; // Clear results
}

function searchNode() {
    const value = parseInt(document.getElementById("searchInput").value);
    if (!isNaN(value)) {
        const found = bst.search(value);
        if (found) {
            document.getElementById("result").innerText = `العنصر ${value} موجود في الشجرة.`;
        } else                    document.getElementById("result").innerText = `العنصر ${value} غير موجود في الشجرة.`;
        }
    }


    function displayInorder() {
    const result = bst.inorder().join(', ');
    document.getElementById("result").innerText = `ترتيب inorder: ${result}`;
}


function displayPostorder() {
    const result = bst.postorder().join(', ');
    document.getElementById("result").innerText = `ترتيب Post : ${result}`;
}

function displayLevelorder() {
    const result = bst.levelorder().join(', ');
    document.getElementById("result").innerText = `ترتيب Levelorder: ${result}`;
}