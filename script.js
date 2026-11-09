document.getElementById("studentForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = Number(document.getElementById("age").value);
  const group = document.getElementById("group").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const phonePattern = /^\+?[0-9\s()-]{10,20}$/;
  const result = document.getElementById("result");
  if (!name || !email || age < 14 || age > 100 || !group || !phonePattern.test(phone)) {
    result.textContent = "Проверьте данные. Телефон должен содержать от 10 до 20 цифр и допустимые символы.";
    result.className = "error"; return;
  }
  result.textContent = `Студент ${name} зарегистрирован! Группа: ${group}. Возраст: ${age}. Email: ${email}. Телефон: ${phone}.`;
  result.className = "success";
});
function calculateTotal(price, quantity) { return price * quantity; }
document.getElementById("orderForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const price = Number(document.getElementById("price").value);
  const quantity = Number(document.getElementById("quantity").value);
  const result = document.getElementById("result");
  if (!Number.isFinite(price) || !Number.isInteger(quantity) || price < 0 || quantity <= 0) {
    result.textContent = "Введите корректные неотрицательную цену и положительное целое количество."; return;
  }
  const subtotal = calculateTotal(price, quantity);
  const discount = subtotal >= 50000 ? subtotal * 0.10 : 0;
  result.textContent = `Сумма: ${subtotal.toLocaleString("ru-RU")} ₸. Скидка: ${discount.toLocaleString("ru-RU")} ₸. Итого: ${(subtotal-discount).toLocaleString("ru-RU")} ₸.`;
});
const data = {
 software: {"РПО-24-2":["Алексей Иванов","Мария Петрова"],"РПО-25-2":["Кирилл Смирнов","Данил Ким"]},
 design: {"ДИЗ-24-1":["Анна Соколова","Елена Орлова"],"ДИЗ-25-1":["Илья Волков","Полина Белова"]}
};
const specialty = document.getElementById("specialty"), group = document.getElementById("group"), student = document.getElementById("student");
function fill(select, values, placeholder) { select.innerHTML = `<option value="">${placeholder}</option>`; values.forEach(v => select.add(new Option(v,v))); select.disabled = values.length === 0; }
specialty.addEventListener("change", () => {
  fill(group, Object.keys(data[specialty.value] || {}), "Выберите группу"); fill(student, [], "Сначала выберите группу"); show();
});
group.addEventListener("change", () => { fill(student, data[specialty.value]?.[group.value] || [], "Выберите студента"); show(); });
student.addEventListener("change", show);
function show() {
 const s = specialty.options[specialty.selectedIndex]?.text || "";
 document.getElementById("result").textContent = group.value && student.value ? `Специальность: ${s}. Группа: ${group.value}. Студент: ${student.value}.` : "";
}
const products = [
 ["Ноутбук Lenovo IdeaPad","Ноутбуки",280000],["Ноутбук ASUS VivoBook","Ноутбуки",310000],["Ноутбук Acer Aspire","Ноутбуки",245000],["MacBook Air","Ноутбуки",520000],["Ноутбук HP 250","Ноутбуки",210000],
 ["iPhone 13","Телефоны",230000],["Samsung Galaxy A55","Телефоны",190000],["Xiaomi Redmi Note","Телефоны",115000],["iPhone 15","Телефоны",360000],["Samsung Galaxy S24","Телефоны",420000],
 ["iPad 10","Планшеты",210000],["Samsung Tab A9","Планшеты",95000],["Xiaomi Pad 6","Планшеты",175000],["iPad Air","Планшеты",390000],["Lenovo Tab M10","Планшеты",85000]
].map(([name,category,price])=>({name,category,price}));
function render() {
 let list = products.filter(p => document.getElementById("category").value === "all" || p.category === document.getElementById("category").value);
 const r = document.getElementById("range").value;
 if(r==="low") list=list.filter(p=>p.price<100000); if(r==="mid") list=list.filter(p=>p.price>=100000&&p.price<=300000); if(r==="high") list=list.filter(p=>p.price>300000);
 list.sort((a,b)=>document.getElementById("sort").value==="asc"?a.price-b.price:b.price-a.price);
 document.getElementById("products").innerHTML = list.length ? list.map(p=>`<article class="product"><b>${p.name}</b><span>${p.category}</span><strong>${p.price.toLocaleString("ru-RU")} ₸</strong></article>`).join("") : "<p>Товары не найдены.</p>";
}
["category","range","sort"].forEach(id=>document.getElementById(id).addEventListener("change",render)); render();
let seconds=0, timer=null;
function formatTime(value){const m=Math.floor(value/60),s=value%60;return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;}
function update(){document.getElementById("time").textContent=formatTime(seconds);}
function startTimer(){if(timer!==null)return;timer=setInterval(()=>{seconds++;update();},1000);}
function stopTimer(){clearInterval(timer);timer=null;}
function resetTimer(){stopTimer();seconds=0;update();}
document.getElementById("start").addEventListener("click",startTimer);
document.getElementById("stop").addEventListener("click",stopTimer);
document.getElementById("reset").addEventListener("click",resetTimer); update();