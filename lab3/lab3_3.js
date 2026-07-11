function calculateElectricity() {
    let prevUnit = parseFloat(document.getElementById("prevUnit").value);
    let currentUnit = parseFloat(document.getElementById("currentUnit").value);


    if (isNaN(prevUnit) || isNaN(currentUnit)) {
        alert("กรุณากรอกข้อมูลตัวเลขให้ครบถ้วน");
        return;
    }


    if (currentUnit < prevUnit) {
        alert("เลขมิเตอร์ครั้งนี้ ต้องไม่น้อยกว่าเลขมิเตอร์ครั้งก่อน");
        return;
    }


    let usedUnit = currentUnit - prevUnit;
    let ftRate = 0.65;
    let energyCost = 0;


    if (usedUnit <= 150) {
        energyCost = usedUnit * 3.25;
    } else if (usedUnit <= 400) {
        energyCost = 150 * 3.25 + (usedUnit - 150) * 4.22;
    } else {
        energyCost = 150 * 3.25 + 250 * 4.22 + (usedUnit - 400) * 4.42;
    }


    let ftCost = usedUnit * ftRate;
    let totalBeforeVat = energyCost + ftCost;
    let vat = totalBeforeVat * 0.07;
    let total = totalBeforeVat + vat;


    document.getElementById("result").innerHTML = `
        <div class="result-box">
            <h4>สรุปบิลค่าไฟฟ้า</h4>
            <p><span>หน่วยไฟที่ใช้จริง:</span> <strong>${usedUnit} หน่วย</strong></p>
            <p><span>1. ค่าพลังงานไฟฟ้าขั้นบันได:</span> <span>${energyCost.toFixed(2)} บาท</span></p>
            <p><span>2. ค่า Ft (${ftRate} บาท/หน่วย):</span> <span>${ftCost.toFixed(2)} บาท</span></p>
            <p><span>ยอดรวมก่อนภาษี:</span> <span>${totalBeforeVat.toFixed(2)} บาท</span></p>
            <p><span>3. ภาษีมูลค่าเพิ่ม (VAT 7%):</span> <span>${vat.toFixed(2)} บาท</span></p>
            <p style="font-size: 1.15rem; margin-top: 15px; border-top: 2px dashed #bfdbfe; padding-top: 10px;">
                <span><strong>รวมเงินทั้งสิ้น:</strong></span> 
                <span style="color: #1e3a8a;"><strong>${total.toFixed(2)} บาท</strong></span>
            </p>
        </div>
    `;
}