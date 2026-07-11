
let products = [
    { id: 1, name: "Watch", price: 3000 },
    { id: 3, name: "Bag", price: 1200 }
];


window.onload = function() {
    renderTable(products);
};


function renderTable(dataArray) {
    const body = document.getElementById("productDisplayBody");
    let html = "";
    if(dataArray.length === 0) {
        body.innerHTML = `<tr><td colspan="3" style="text-align: center; color:red;">ไม่พบข้อมูล</td></tr>`;
        return;
    }

    dataArray.forEach(item => {
        html += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()}</td>
        </tr>`;
    });
    body.innerHTML = html;
}


function convertObjectToJSONString() {
    let jsonString = JSON.stringify(products, null, 2); 
    document.getElementById("jsonTextArea").value = jsonString;
    alert("แปลงเป็น JSON String เรียบร้อยแล้วในกล่องข้อความ!");
}


function convertJSONStringToObject() {
    try {
        let textValue = document.getElementById("jsonTextArea").value;
        if (!textValue.trim()) {
            alert("กรุณากดปุ่มแปลงเป็น JSON String หรือพิมพ์รูปแบบ JSON ก่อนครับ");
            return;
        }
        products = JSON.parse(textValue);
        renderTable(products);
        alert("แปลงข้อมูลจาก JSON String กลับมาเป็น Object และอัปเดตตารางสำเร็จ!");
    } catch (error) {
        alert("รูปแบบ JSON String ไม่ถูกต้อง: " + error.message);
    }
}


function processForEach() {
   
    renderTable(products);
    document.getElementById("summaryBox").innerHTML = " แสดงข้อมูลทั้งหมดด้วยโครงสร้าง forEach() เรียบร้อย";
}


function processMap() {
    let mappedProducts = products.map(item => {
        return {
            id: item.id,
            name: `${item.name} (+Vat 7%)`,
            price: Math.round(item.price * 1.07) 
        };
    });
    renderTable(mappedProducts);
    document.getElementById("summaryBox").innerHTML = " ปรับโครงสร้างข้อมูลเพิ่มภาษีด้วย map() สำเร็จ (ข้อมูลจริงไม่เสียหาย)";
}


function processFilter() {
    let filteredProducts = products.filter(item => item.price > 1500);
    renderTable(filteredProducts);
    document.getElementById("summaryBox").innerHTML = ` คัดกรองสินค้าที่ราคาเกิน 1,500 บาท ด้วย filter() สำเร็จ (เจอ ${filteredProducts.length} รายการ)`;
}


function processReduce() {
  
    const total = products.reduce(
        (sum, item) => sum + item.price, 0
    );
    
    console.log(total);
    renderTable(products);
    document.getElementById("summaryBox").innerHTML = ` ผลรวมราคาสินค้าทั้งหมด (reduce) = ${total.toLocaleString()} บาท`;
}


function exportJSON() {
    let dataStr = JSON.stringify(products, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    
    let downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = "products_export.json";
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
}


function importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let importedData = JSON.parse(e.target.result);
            if (Array.isArray(importedData)) {
                products = importedData;
                renderTable(products);
 
                document.getElementById("jsonTextArea").value = JSON.stringify(products, null, 2);
                alert("นำเข้าไฟล์ JSON (Import) สำเร็จ!");
            } else {
                alert("โครงสร้างไฟล์ JSON ภายในต้องเป็นกลุ่มก้อน Array เท่านั้นครับ");
            }
        } catch (err) {
            alert("ไฟล์ JSON ชำรุดหรือไม่ถูกต้อง: " + err.message);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; 
}