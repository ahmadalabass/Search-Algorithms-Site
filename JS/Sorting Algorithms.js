// احصل على عنصر الـ canvas وتعريف السياق
const canvas = document.getElementById("sortCanvas");
const ctx = canvas.getContext("2d");

if (!ctx) {
    console.error("تعذر الحصول على سياق الرسم، تأكد من أن العنصر <canvas> موجود بشكل صحيح.");
}

// دالة لرسم المصفوفة
function drawArray(array) {
    if (!ctx) return; // منع حدوث الخطأ في حال عدم توفر السياق

    ctx.clearRect(0, 0, canvas.width, canvas.height); // مسح اللوحة قبل الرسم

    let barWidth = canvas.width / (array.length * 2); // تقليل عرض الأعمدة
    let maxVal = Math.max(...array);
    let scaleFactor = (canvas.height - 50) / maxVal; // تصغير الأعمدة

    array.forEach((value, index) => {
        let barHeight = value * scaleFactor;
        let x = index * (barWidth + 10) + 20; // وضع مسافات بين الأعمدة
        let y = canvas.height - barHeight;

        // رسم العمود
        ctx.fillStyle = "#007bff";
        ctx.fillRect(x, y, barWidth, barHeight);

        // رسم الرقم أسفل العمود
        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(value, x + barWidth / 2, canvas.height - 5);
    });
}

// دالة لعرض النتيجة النهائية
function displayResult(array) {
    document.getElementById("result").innerText = "النتيجة النهائية: " + array.join(" , ");
}

// دالة لاستخراج القيم من الإدخال
function getArrayInput() {
    let input = document.getElementById("arrayInput").value;
    let array = input.split(" ").map(Number).filter(n => !isNaN(n));

    if (array.length === 0) {
        alert("الرجاء إدخال أرقام صحيحة.");
        return null;
    }
    return array;
}

// خوارزمية Bubble Sort
async function runBubbleSort() {
    let array = getArrayInput();
    if (!array) return;

    drawArray(array);

    let len = array.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await new Promise(resolve => setTimeout(resolve, 200)); // تأخير للرؤية
                drawArray(array);
            }
        }
    }
    displayResult(array);
}

// خوارزمية Selection Sort
async function runSelectionSort() {
    let array = getArrayInput();
    if (!array) return;

    drawArray(array);

    let len = array.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            await new Promise(resolve => setTimeout(resolve, 200));
            drawArray(array);
        }
    }
    displayResult(array);
}

// خوارزمية Insertion Sort
async function runInsertionSort() {
    let array = getArrayInput();
    if (!array) return;

    drawArray(array);

    let len = array.length;
    for (let i = 1; i < len; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            await new Promise(resolve => setTimeout(resolve, 200));
            drawArray(array);
        }
        array[j + 1] = key;
        drawArray(array);
    }
    displayResult(array);
}

// خوارزمية Merge Sort
async function runMergeSort() {
    let array = getArrayInput();
    if (!array) return;

    async function mergeSort(arr, left, right) {
        if (left >= right) return;

        let mid = Math.floor((left + right) / 2);
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }

    async function merge(arr, left, mid, right) {
        let leftArr = arr.slice(left, mid + 1);
        let rightArr = arr.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
            await new Promise(resolve => setTimeout(resolve, 200));
            drawArray(arr);
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
            await new Promise(resolve => setTimeout(resolve, 200));
            drawArray(arr);
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
            await new Promise(resolve => setTimeout(resolve, 200));
            drawArray(arr);
        }
    }

    await mergeSort(array, 0, array.length - 1);
    displayResult(array);
}
