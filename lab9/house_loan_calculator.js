function formatBaht(num) {
    return num.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " บาท";
}

function calculateLoanAmount() {
    let price = parseFloat(document.getElementById("homePrice").value) || 0;
    let down = parseFloat(document.getElementById("downPayment").value) || 0;
    let netLoan = price - down;
    
    document.getElementById("loanAmount").value = netLoan >= 0 ? netLoan.toLocaleString('th-TH') : 0;
    return netLoan;
}

window.onload = calculateLoanAmount;

function processMortgage() {
    const errorBox = document.getElementById("errorBox");
    const resultBox = document.getElementById("resultBox");
    const table = document.getElementById("amortizationTable");
    const tableBody = document.getElementById("tableBody");

    errorBox.style.display = "none";
    resultBox.style.display = "none";
    table.style.display = "none";

    let price = parseFloat(document.getElementById("homePrice").value);
    let down = parseFloat(document.getElementById("downPayment").value);
    let rateYear = parseFloat(document.getElementById("interestRate").value);
    let years = parseInt(document.getElementById("years").value);
    let netLoan = price - down;

    let errors = [];
    if (isNaN(price) || price <= 0) errors.push(" กรุณาระบุราคาบ้านที่ถูกต้อง (มากกว่า 0)");
    if (isNaN(down) || down < 0) errors.push(" เงินดาวน์ต้องไม่ติดลบ");
    if (netLoan <= 0) errors.push(" เงินดาวน์ห้ามมากกว่าหรือเท่ากับราคาบ้าน (วงเงินกู้ต้องมากกว่า 0)");
    if (isNaN(rateYear) || rateYear < 0) errors.push(" กรุณาระบุอัตราดอกเบี้ยที่ถูกต้อง");
    if (isNaN(years) || years <= 0) errors.push(" กรุณาเลือกหรือระบุระยะเวลาผ่อนชำระ");

    if (errors.length > 0) {
        errorBox.innerHTML = errors.join("<br>");
        errorBox.style.display = "block";
        return;
    }

    let totalMonths = years * 12;
    let rateMonth = (rateYear / 100) / 12;

    let monthlyPayment = 0;
    if (rateMonth > 0) {
        monthlyPayment = (netLoan * rateMonth * Math.pow(1 + rateMonth, totalMonths)) / 
                         (Math.pow(1 + rateMonth, totalMonths) - 1);
    } else {
        monthlyPayment = netLoan / totalMonths;
    }

    monthlyPayment = Math.ceil(monthlyPayment);

    let remaining = netLoan;
    let totalInterest = 0;
    let totalPayment = 0;
    let bodyHtml = "";

    for (let i = 1; i <= totalMonths; i++) {
        let startBalance = remaining;
        let interest = startBalance * rateMonth;
        let principal = monthlyPayment - interest;
        let currentPayment = monthlyPayment;

        if (i === totalMonths || startBalance + interest < monthlyPayment) {
            currentPayment = startBalance + interest;
            principal = startBalance;
            remaining = 0;
        } else {
            remaining = startBalance - principal;
        }

        totalInterest += interest;
        totalPayment += currentPayment;

        bodyHtml += `<tr>
            <td>${i}</td>
            <td>${formatBaht(startBalance)}</td>
            <td>${formatBaht(interest)}</td>
            <td>${formatBaht(currentPayment)}</td>
            <td>${formatBaht(remaining)}</td>
        </tr>`;
    }

    document.getElementById("resLoan").innerText = formatBaht(netLoan);
    document.getElementById("resTotalMonths").innerText = totalMonths + " งวด";
    document.getElementById("resMonthly").innerText = formatBaht(monthlyPayment);
    document.getElementById("resTotalInterest").innerText = formatBaht(totalInterest);
    document.getElementById("resTotalPayment").innerText = formatBaht(totalPayment);

    tableBody.innerHTML = bodyHtml;
    resultBox.style.display = "block";
    table.style.display = "table";
}