function calculateLoan() {
    let monthlySalary = parseFloat(document.getElementById("salary").value);
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let interestRateInput = parseFloat(document.getElementById("interestRate").value);
    let years = parseInt(document.getElementById("years").value);


    if (isNaN(monthlySalary) || isNaN(loanAmount) || isNaN(interestRateInput) || isNaN(years)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง");
        return;
    }

    let interestRate = interestRateInput / 100 / 12;
    let months = years * 12;


    let maxLoan = monthlySalary * 200;
    if (loanAmount > maxLoan) {
        alert(`วงเงินกู้สูงสุดคือ ${maxLoan.toFixed(2)} บาท (200 เท่าของเงินเดือน)`);
        return;
    }


    let monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, months)) / (Math.pow(1 + interestRate, months) - 1);

    if (isNaN(monthlyPayment) || !isFinite(monthlyPayment)) {
        monthlyPayment = loanAmount / months;
    }


    document.getElementById("result").innerHTML = `
        <div class="result-box">
            <h4>สรุปสินเชื่อบ้าน</h4>
            <p><strong>วงเงินกู้:</strong> ${loanAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</p>
            <p><strong>อัตราดอกเบี้ย:</strong> ${(interestRate * 12 * 100).toFixed(2)}% ต่อปี</p>
            <p><strong>ระยะเวลา:</strong> ${years} ปี (${months} เดือน)</p>
            <p style="font-size: 1.1rem; color: #0ea5e9;"><strong>ค่างวดต่อเดือน:</strong> ${monthlyPayment.toFixed(2)} บาท</p>
            <p><strong>รวมทั้งสิ้น:</strong> ${(monthlyPayment * months).toFixed(2)} บาท</p>
            <p><strong>ดอกเบี้ยรวม:</strong> ${(monthlyPayment * months - loanAmount).toFixed(2)} บาท</p>
        </div>
    `;


    generateAmortizationTable(loanAmount, interestRate, monthlyPayment, months);
}

function generateAmortizationTable(loanAmount, interestRate, monthlyPayment, months) {
    let balance = loanAmount;
    let tableBodyHTML = "";

    for (let i = 1; i <= months; i++) {

        let interestOfMouth = balance * interestRate;

        let principalOfMouth = monthlyPayment - interestOfMouth;
        

        if (i === months) {
            principalOfMouth = balance;
            monthlyPayment = principalOfMouth + interestOfMouth;
        }

        let remainingBalance = balance - principalOfMouth;
        if (remainingBalance < 0) remainingBalance = 0;

        tableBodyHTML += `
            <tr>
                <td>${i}</td>
                <td>${balance.toFixed(2)}</td>
                <td>${monthlyPayment.toFixed(2)}</td>
                <td>${interestOfMouth.toFixed(2)}</td>
                <td>${principalOfMouth.toFixed(2)}</td>
                <td>${remainingBalance.toFixed(2)}</td>
            </tr>
        `;


        balance = remainingBalance;
    }

    document.getElementById("tableBody").innerHTML = tableBodyHTML;
    document.getElementById("tableContainer").style.display = "block";
}