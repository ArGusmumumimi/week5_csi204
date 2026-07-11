let studentName = "Gus";
let studentAge = 23;
let isGraduated = false;
let scores = [85, 90, 78];
let student = { id: "66010001", name: 'Lee', grade: "A" };

let dummyInt = parseInt("20");
let dummyFloat = parseFloat("3.75");
let dummyString = String(20);

console.log("Name:", studentName, "Type:", typeof studentName);
console.log("Age:", studentAge, "Type:", typeof studentAge);

window.onload = function() {
    document.getElementById("output").innerHTML = `
        Name: ${studentName}<br>
        Age: ${studentAge}<br>
        Average Grade: ${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)}
    `;
};