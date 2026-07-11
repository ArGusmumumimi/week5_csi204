
let pseudocodeCircle = `// Pseudocode: การคำนวณพื้นที่วงกลม
BEGIN
    INPUT radius
    SET PI = 3.14159
    SET area = PI * radius * radius
    OUTPUT "Area of the circle is: " + area
END`;


let pseudocodeGrade = `// Pseudocode: ระบบคำนวณตัดเกรด (Grade Calculation)
BEGIN
    INPUT score
    IF score >= 80 THEN
        OUTPUT "Grade: A"
    ELSE IF score >= 70 THEN
        OUTPUT "Grade: B"
    ELSE IF score >= 60 THEN
        OUTPUT "Grade: C"
    ELSE IF score >= 50 THEN
        OUTPUT "Grade: D"
    ELSE
        OUTPUT "Grade: F"
    ENDIF
END`;


let pseudocodeMaxNumber = `// Pseudocode: การหาค่าสูงสุดจากตัวเลข 3 จำนวน
BEGIN
    INPUT num1, num2, num3
    IF num1 >= num2 AND num1 >= num3 THEN
        SET max = num1
    ELSE IF num2 >= num1 AND num2 >= num3 THEN
        SET max = num2
    ELSE
        SET max = num3
    ENDIF
    OUTPUT "The maximum number is: " + max
END`;


console.log(pseudocodeCircle);
console.log("==================================================");
console.log(pseudocodeGrade);
console.log("==================================================");
console.log(pseudocodeMaxNumber);


window.onload = function() {
    document.getElementById("output").innerHTML = `
        <pre style="background: #1e1e1e; color: #d4d4d4; padding: 20px; font-family: monospace; line-height: 1.6; border-radius: 4px;">${pseudocodeCircle}

==================================================

${pseudocodeGrade}

==================================================

${pseudocodeMaxNumber}</pre>
    `;
};