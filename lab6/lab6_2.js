
const productList = [
    { name: "เสื้อยืด Oversize", category: "clothing", price: 350, stock: 15 },
    { name: "กางเกงยีนส์ขาเดฟ", category: "clothing", price: 790, stock: 8 },
    { name: "เมาส์ไร้สายบลูทูธ", category: "equipment", price: 590, stock: 20 },
    { name: "คีย์บอร์ดไร้สายคู่ทัชแพด", category: "equipment", price: 1250, stock: 0 },
    { name: "บะหมี่กึ่งสำเร็จรูปเกาหลี", category: "food", price: 45, stock: 50 },
    { name: "ขนมปังโฮลวีต", category: "food", price: 65, stock: 12 },
    { name: "เสื้อกันหนาวมีฮู้ด", category: "clothing", price: 890, stock: 5 }
];


function getCategoryNameThai(cat) {
    if (cat === "clothing") return "เสื้อผ้า";
    if (cat === "equipment") return "อุปกรณ์";
    if (cat === "food") return "อาหาร";
    return cat;
}


window.onload = function() {
    displayProducts(productList);
};


function displayProducts(products) {
    let tableBody = document.getElementById("productTableBody");
    let htmlContent = "";

    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="no-data"> ไม่พบข้อมูลสินค้าในหมวดหมู่นี้</td></tr>`;
        return;
    }

    products.forEach(item => {

        let stockDisplay = item.stock > 0 ? `<span class="in-stock">${item.stock} ชิ้น</span>` : `<span class="out-of-stock">หมด (Out of stock)</span>`;
        
        htmlContent += `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td>${getCategoryNameThai(item.category)}</td>
                <td>${item.price.toLocaleString()}</td>
                <td>${stockDisplay}</td>
            </tr>
        `;
    });

    tableBody.innerHTML = htmlContent;
}


function filterProducts() {
    let selectedCategory = document.getElementById("categoryFilter").value;
    let filteredResult = [];


    if (selectedCategory === "all") {
        filteredResult = productList;
    } else if (selectedCategory === "clothing") {
        filteredResult = productList.filter(product => product.category === "clothing");
    } else if (selectedCategory === "equipment") {
        filteredResult = productList.filter(product => product.category === "equipment");
    } else if (selectedCategory === "food") {
        filteredResult = productList.filter(product => product.category === "food");
    }


    displayProducts(filteredResult);
}