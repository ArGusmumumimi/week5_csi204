
const students = [
    { id: 1, name: "ขันแดง จานดี", scores: [85, 90, 88], grade: "A" },
    { id: 2, name: "ขันเขียว จานดำ", scores: [75, 80, 78], grade: "B" },
    { id: 3, name: "ขันฟ้า จานลาย", scores: [95, 92, 94], grade: "A" },
    { id: 4, name: "ขันขาว จานเดียว", scores: [65, 70, 68], grade: "C" }
];


function displayStudents() {

    let tableHtml = "<table border='1'><tr><th>ID</th><th>ชื่อ</th><th>คะแนนเฉลี่ย</th><th>เกรด</th></tr>";
    
    students.map(student => {

        let avgScore = student.scores.reduce((a, b) => a + b, 0) / student.length; 

        let correctAvgScore = student.scores.reduce((a, b) => a + b, 0) / student.scores.length;
        
        tableHtml += `<tr><td>${student.id}</td><td>${student.name}</td><td>${correctAvgScore.toFixed(2)}</td><td>${student.grade}</td></tr>`;
    });
    
    tableHtml += "</table>";
    document.getElementById("studentTable").innerHTML = tableHtml;


    let gradeA = students.filter(s => s.grade === "A");
    document.getElementById("gradeA").innerHTML = `นักเรียนที่ได้เกรด A: ${gradeA.map(s => s.name).join(", ")}`;
}