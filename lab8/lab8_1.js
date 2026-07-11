function generateAmortizationTable() {

    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value) / 100 / 12;
    let months = parseInt(document.getElementById("months").value);

    let monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, months)) / 
                         (Math.pow(1 + interestRate, months) - 1);

    let tableHtml = "<table border='1'><tr><th>งวดที่</th><th>ค่างวด</th><th>ดอกเบี้ย</th><th>เงินต้น</th><th>คงเหลือ</th></tr>";
    let remaining = loanAmount;
    let totalInterest = 0;
    let totalPayment = 0;


    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(months) || loanAmount <= 0 || months <= 0) {
        document.getElementById("tableContainer").innerHTML = "<p style='color:red; text-align:center;'>กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วนครับ</p>";
        document.getElementById("summaryContainer").innerHTML = "";
        return;
    }


    for (let i = 1; i <= months; i++) {

        let interest = remaining * interestRate;
        

        let principal = monthlyPayment - interest;
        

        if (i === months) {
            monthlyPayment = remaining + interest;
            principal = remaining;
            remaining = 0;
        } else {
            remaining = remaining - principal;
        }


        totalInterest += interest;
        totalPayment += monthlyPayment;


        tableHtml += `<tr>
            <td>${i}</td>
            <td>${monthlyPayment.toFixed(2)}</td>
            <td>${interest.toFixed(2)}</td>
            <td>${principal.toFixed(2)}</td>
            <td>${remaining.toFixed(2)}</td>
        </tr>`;
    }

    tableHtml += "</table>";

    document.getElementById("tableContainer").innerHTML = tableHtml;

    let summaryHtml = `
        <div class="summary-box">
            <span> ยอดผ่อนชำระรวมทั้งหมด: ${totalPayment.toFixed(2)} บาท</span>
            <span> ดอกเบี้ยจ่ายรวมทั้งสิ้น: ${totalInterest.toFixed(2)} บาท</span>
        </div>
    `;
    document.getElementById("summaryContainer").innerHTML = summaryHtml;
}