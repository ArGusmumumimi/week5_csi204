
const products = [
    { id: "item1", name: "กระเป๋าเป้เดินทาง", price: 550 },
    { id: "item2", name: "กระติกน้ำเก็บความเย็น", price: 290 },
    { id: "item3", name: "พาวเวอร์แบงค์ 20,000 mAh", price: 450 },
    { id: "item4", name: "หูฟังบลูทูธไร้สาย", price: 380 },
    { id: "item5", name: "สายชาร์จ Fast Charge", price: 120 }
];


window.onload = function() {
    renderProducts();
};

function renderProducts() {
    let htmlContent = "";
    products.forEach((product) => {
        htmlContent += `
            <div class="product-item">
                <!-- ขั้นตอนที่ 3: เพิ่ม Checkbox ในการเลือกสินค้า -->
                <input type="checkbox" id="${product.id}" value="${product.price}">
                <div class="product-details">
                    <span>${product.name}</span>
                    <span class="product-price">${product.price.toLocaleString()} บาท</span>
                </div>
            </div>
        `;
    });
    document.getElementById("productListContainer").innerHTML = htmlContent;
}


function calculateTotalPrice() {
    let subTotal = 0;
    let selectedItemsCount = 0;


    products.forEach((product) => {
        let checkbox = document.getElementById(product.id);
        if (checkbox && checkbox.checked) {
            subTotal += product.price;
            selectedItemsCount++;
        }
    });

    if (selectedItemsCount === 0) {
        alert("กรุณาเลือกสินค้าใน Checkbox อย่างน้อย 1 รายการก่อนคำนวณครับ");
        document.getElementById("receiptResult").style.display = "none";
        return;
    }

    let discountPercent = 0;


    if (subTotal >= 1000) {
        discountPercent = 15;
    } else if (subTotal >= 500) {
        discountPercent = 10;
    } else {
        discountPercent = 0;
    }


    let discountAmount = subTotal * (discountPercent / 100);
    let finalTotal = subTotal - discountAmount;


    document.getElementById("receiptResult").innerHTML = `
        <div class="receipt-box">
            <h4>สรุปรายการคำนวณเงิน</h4>
            <p><span>สินค้าที่เลือกทั้งหมด:</span> <strong>${selectedItemsCount} รายการ</strong></p>
            <p><span>ราคารวมสินค้า:</span> <span>${subTotal.toLocaleString()} บาท</span></p>
            <p class="discount-text">
                <span>ส่วนลดที่ได้รับ (${discountPercent}%):</span> 
                <span>-${discountAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</span>
            </p>
            <p class="final-total">
                <span><strong>ยอดรวมสุทธิที่ต้องชำระ:</strong></span> 
                <span><strong>${finalTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</strong></span>
            </p>
        </div>
    `;
    document.getElementById("receiptResult").style.display = "block";
}