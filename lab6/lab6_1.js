function convert() {

    let type = document.getElementById("convertType").value;
    let value = parseFloat(document.getElementById("inputValue").value);
    let result = 0;


    if (isNaN(value)) {
        document.getElementById("result").innerHTML = "กรุณากรอกตัวเลขที่ต้องการแปลง";
        return;
    }


    switch(type) {
        case "kgToLb":
            result = value * 2.20462;
            document.getElementById("result").innerHTML = `${value} กิโลกรัม = ${result.toFixed(2)} ปอนด์`;
            break;
        
        case "cToF":
            result = (value * 9/5) + 32;
            document.getElementById("result").innerHTML = `${value} องศาเซลเซียส = ${result.toFixed(2)} องศาฟาเรนไฮต์`;
            break;

        case "kmToMile":
            result = value * 0.621371;
            document.getElementById("result").innerHTML = `${value} กิโลเมตร = ${result.toFixed(2)} ไมล์`;
            break;

        default:
            document.getElementById("result").innerHTML = "กรุณาเลือกประเภทการแปลง";
    }
}