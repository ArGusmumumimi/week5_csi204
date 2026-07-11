function calculateTotalWithShipping() {
    let productPrice = parseFloat(document.getElementById("productPrice").value);
    let shippingSelect = document.getElementById("shippingMethod");
    

    let originalShippingCost = parseFloat(shippingSelect.value);
    let shippingMethodName = shippingSelect.options[shippingSelect.selectedIndex].text.split(" ")[0];


    if (isNaN(productPrice) || productPrice < 0) {
        alert("กรุณากรอกราคาสินค้าให้ถูกต้องครับ");
        return;
    }

    let actualShippingCost = originalShippingCost;
    let isFreeShipping = false;


    if (productPrice >= 500) {
        actualShippingCost = 0;
        isFreeShipping = true;
    }


    let totalCost = productPrice + actualShippingCost;


    let shippingDisplayHTML = "";
    if (isFreeShipping) {
        shippingDisplayHTML = `
            <span><span class="original-shipping">${originalShippingCost} บาท</span>
            <span class="free-shipping">ฟรี (โปรโมชันครบ 500.-)</span></span>
        `;
    } else {
        shippingDisplayHTML = `<span>${actualShippingCost} บาท</span>`;
    }

    document.getElementById("resultBox").innerHTML = `
        <div class="result-box">
            <h4>รายละเอียดค่าใช้จ่าย</h4>
            <p><span>ราคาสินค้า:</span> <strong>${productPrice.toLocaleString()} บาท</strong></p>
            <p><span>รูปแบบการจัดส่ง (${shippingMethodName}):</span> ${shippingDisplayHTML}</p>
            <p style="font-size: 1.2rem; color: #10b981; border-top: 1px dashed #cbd5e1; padding-top: 10px; margin-top: 10px;">
                <span><strong>รวมเงินทั้งสิ้น:</strong></span> 
                <span><strong>${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</strong></span>
            </p>
        </div>
    `;
    
    document.getElementById("resultBox").style.display = "block";
}