class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // ارتفاع العقدة
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        this.root = this._insertNode(this.root, value);
        drawTree();
    }

    _insertNode(node, value) {
        if (node === null) {
            return new AVLNode(value);
        }

        if (value < node.value) {
            node.left = this._insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertNode(node.right, value);
        } else {
            return node; // القيم المكررة غير مسموح بها
        }

        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
        return this._balanceTree(node);
    }

    delete(value) {
        this.root = this._deleteNode(this.root, value);
        drawTree();
    }

    _deleteNode(node, value) {
        if (node === null) {
            return node;
        }

        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            const temp = this._minValueNode(node.right);
            node.value = temp.value;
            node.right = this._deleteNode(node.right, temp.value);
        }

        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
        return this._balanceTree(node);
    }

    _minValueNode(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    _getHeight(node) {
        return node ? node.height : 0;
    }

    _getBalanceFactor(node) {
        return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
    }

    _balanceTree(node) {
        const balanceFactor = this._getBalanceFactor(node);

        if (balanceFactor > 1) {
            if (this._getBalanceFactor(node.left) < 0) {
                node.left = this._rotateLeft(node.left);
            }
            return this._rotateRight(node);
        }

        if (balanceFactor < -1) {
            if (this._getBalanceFactor(node.right) > 0) {
                node.right = this._rotateRight(node.right);
            }
            return this._rotateLeft(node);
        }

        return node;
    }

    _rotateLeft(z) {
        const y = z.right;
        z.right = y.left;
        y.left = z;
        z.height = 1 + Math.max(this._getHeight(z.left), this._getHeight(z.right));
        y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));
        return y;
    }

    _rotateRight(z) {
        const y = z.left;
        z.left = y.right;
        y.right = z;
        z.height = 1 + Math.max(this._getHeight(z.left), this._getHeight(z.right));
        y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));
        return y;
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

const avlTree = new AVLTree();
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

function drawTree(node = avlTree.root, x = canvas.width / 2, y = 50, level = 1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    _drawNode(node, x, y, level, canvas.width / 6);
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
        _drawNode(node.left, x - gap, y + 70, level + 1, gap / 1.5);
    }
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x + gap, y + 70);
        ctx.stroke();
        _drawNode(node.right, x + gap, y + 70, level + 1, gap / 1.5);
    }
}

function insertNode() {
    const value = parseInt(document.getElementById("valueInput").value);
    if (!isNaN(value)) avlTree.insert(value);
}

function deleteNode() {
    const value = parseInt(document.getElementById("deleteInput").value);
    if (!isNaN(value)) avlTree.delete(value);
}

function clearTree() {
    avlTree.clear();
    document.getElementById("result").innerText = ''; // Clear results
}

function searchNode() {
    const value = parseInt(document.getElementById("searchInput").value);
    if (!isNaN(value)) {
        const found = avlTree.search(value);
        if (found) {
            document.getElementById("result").innerText = `العنصر ${value} موجود في الشجرة.`;
        } else {
            document.getElementById("result").innerText = `العنصر ${value} غير موجود في الشجرة.`;
        }
    }
}

function displayInorder() {
    const result = avlTree.inorder().join(', ');
    document.getElementById("result").innerText = `ترتيب inorder: ${result}`;
}

function displayPostorder() {
    const result = avlTree.postorder().join(', ');
    document.getElementById("result").innerText = `ترتيب Postorder: ${result}`;
}

function displayLevelorder() {
    const result = avlTree.levelorder().join(', ');
    document.getElementById("result").innerText = `ترتيب Levelorder: ${result}`;
}
