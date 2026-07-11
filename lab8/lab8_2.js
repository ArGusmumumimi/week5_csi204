
const products = [
    {name: "Keyboard", price: 1200, qty: 2},
    {name: "Mouse", price: 500, qty: 3},
    {name: "Monitor", price: 4500, qty: 1},
    {name: "Speaker", price: 1500, qty: 1},
    {name: "Headphones", price: 800, qty: 2}
];

function generateInvoice(loopType) {
    const tableBody = document.getElementById("tableBody");
    const tableFoot = document.getElementById("tableFoot");
    const loopStatus = document.getElementById("loopStatus");
    
    let bodyHtml = "";
    let totalBeforeDiscount = 0; 


    if(loopType === 'for') {
        loopStatus.innerHTML = `<span class="loop-badge" style="background-color:#dbeafe; color:#1e40af;">กำลังแสดงผลด้วย: for loop</span>`;
    } else if(loopType === 'while') {
        loopStatus.innerHTML = `<span class="loop-badge" style="background-color:#dcfce7; color:#166534;">กำลังแสดงผลด้วย: while loop</span>`;
    } else {
        loopStatus.innerHTML = `<span class="loop-badge" style="background-color:#fef3c7; color:#92400e;">กำลังแสดงผลด้วย: do-while loop</span>`;
    }


    if (loopType === 'for') {

        for (let i = 0; i < products.length; i++) {
            let itemTotal = products[i].price * products[i].qty;
            totalBeforeDiscount += itemTotal;
            bodyHtml += `<tr>
                <td>${products[i].name}</td>
                <td class="text-right">${products[i].price.toLocaleString()}</td>
                <td class="text-center">${products[i].qty}</td>
                <td class="text-right">${itemTotal.toLocaleString()}</td>
            </tr>`;
        }
    } 
    else if (loopType === 'while') {

        let i = 0;
        while (i < products.length) {
            let itemTotal = products[i].price * products[i].qty;
            totalBeforeDiscount += itemTotal;
            bodyHtml += `<tr>
                <td>${products[i].name}</td>
                <td class="text-right">${products[i].price.toLocaleString()}</td>
                <td class="text-center">${products[i].qty}</td>
                <td class="text-right">${itemTotal.toLocaleString()}</td>
            </tr>`;
            i++;
        }
    } 
    else if (loopType === 'do-while') {

        let i = 0;
        do {
            let itemTotal = products[i].price * products[i].qty;
            totalBeforeDiscount += itemTotal;
            bodyHtml += `<tr>
                <td>${products[i].name}</td>
                <td class="text-right">${products[i].price.toLocaleString()}</td>
                <td class="text-center">${products[i].qty}</td>
                <td class="text-right">${itemTotal.toLocaleString()}</td>
            </tr>`;
            i++;
        } while (i < products.length);
    }


    let discountPercent = 0;
    

    if (totalBeforeDiscount >= 10000) {
        discountPercent = 0.10; 
    } else if (totalBeforeDiscount >= 5000) {
        discountPercent = 0.05; 
    }
    

    let discountAmount = totalBeforeDiscount * discountPercent;
    

    let amountAfterDiscount = totalBeforeDiscount - discountAmount;
    

    let vatAmount = amountAfterDiscount * 0.07;
    

    let netTotal = amountAfterDiscount + vatAmount;


    let footHtml = `
        <tr class="summary-row">
            <td colspan="3" class="text-right">รวมเป็นเงิน (Subtotal):</td>
            <td class="text-right">${totalBeforeDiscount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</td>
        </tr>
        <tr class="summary-row" style="color: #dc2626;">
            <td colspan="3" class="text-right">ส่วนลด (Discount ${discountPercent * 100}%):</td>
            <td class="text-right">-${discountAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</td>
        </tr>
        <tr class="summary-row">
            <td colspan="3" class="text-right">ภาษีมูลค่าเพิ่ม (VAT 7%):</td>
            <td class="text-right">${vatAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</td>
        </tr>
        <tr class="summary-row" style="background-color: #f1f5f9; color: #1e3a8a; font-size: 1.1rem;">
            <td colspan="3" class="text-right">ยอดสุทธิที่ต้องชำระ (Net Total):</td>
            <td class="text-right">${netTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</td>
        </tr>
    `;

    tableBody.innerHTML = bodyHtml;
    tableFoot.innerHTML = footHtml;
    document.getElementById("invoiceTable").style.display = "table";
}