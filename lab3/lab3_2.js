function calculateCarLoan() {
    let carPrice = parseFloat(document.getElementById("carPrice").value);
    let downPayment = parseFloat(document.getElementById("downPayment").value);
    let interestRateInput = parseFloat(document.getElementById("interestRate").value);
    let months = parseInt(document.getElementById("months").value);

   
    if (isNaN(carPrice) || isNaN(downPayment) || isNaN(interestRateInput) || isNaN(months)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง");
        return;
    }

    if (downPayment >= carPrice) {
        alert("เงินดาวน์ห้ามมากกว่าหรือเท่ากับราคารถยนต์");
        return;
    }

   
    let loanAmount = carPrice - downPayment;
    let interestRate = interestRateInput / 100 / 12;

   
    let monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, months)) / (Math.pow(1 + interestRate, months) - 1);

    if (isNaN(monthlyPayment) || !isFinite(monthlyPayment)) {
        monthlyPayment = loanAmount / months;
    }

    let totalPayout = monthlyPayment * months;
    let totalInterest = totalPayout - loanAmount;

   
    document.getElementById("summary").innerHTML = `
        <div class="summary-box">
            <h4>📋 สรุปรายการเงินกู้รถยนต์</h4>
            <p><strong>ราคารถยนต์:</strong> ${carPrice.toLocaleString()} บาท</p>
            <p><strong>เงินดาวน์:</strong> ${downPayment.toLocaleString()} บาท</p>
            <p><strong>ยอดจัด/เงินกู้สุทธิ:</strong> ${loanAmount.toLocaleString()} บาท</p>
            <p><strong>ค่างวดรายเดือน:</strong> ${monthlyPayment.toFixed(2)} บาท/เดือน</p>
            <p style="color: #d97706;"><strong>ดอกเบี้ยรวมทั้งหมด:</strong> ${totalInterest.toFixed(2)} บาท</p>
            <p style="font-size: 1.05rem; font-weight: bold;"><strong>ยอดรวมจ่ายทั้งหมด (รวมดาวน์):</strong> ${(totalPayout + downPayment).toFixed(2)} บาท</p>
        </div>
    `;

    
    let tableHtml = "<table><tr><th>งวดที่</th><th>ค่างวด</th><th>เงินต้น</th><th>ดอกเบี้ย</th><th>คงเหลือ</th></tr>";
    let remaining = loanAmount;

    for (let i = 1; i <= months; i++) {
        let interest = remaining * interestRate;
        let principal = monthlyPayment - interest;
        
       
        if (i === months) {
            principal = remaining;
            monthlyPayment = principal + interest;
        }

        remaining -= principal;

        
        if (i % 6 === 0 || i === months) {
            tableHtml += `<tr>
                <td>${i}</td>
                <td>${monthlyPayment.toFixed(2)}</td>
                <td>${principal.toFixed(2)}</td>
                <td>${interest.toFixed(2)}</td>
                <td>${Math.max(0, remaining).toFixed(2)}</td>
            </tr>`;
        }
    }
    tableHtml += "</table>";

    
    document.getElementById("paymentTable").innerHTML = tableHtml;
    document.getElementById("tableContainer").style.display = "block";
}