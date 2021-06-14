let string = ``;

let num_str = string.match(/.+/ig);
let obj = {};

for (item of num_str) {
    console.log(item);
    let res = item.match(/^;.+;/);
    let name = item.match(/([?!,.а-яА-ЯёЁ0-9]+ [?!,.а-яА-ЯёЁ0-9]+ [?!,.а-яА-ЯёЁ0-9]+)/ig);
    let ex_number = item.match(/\b\d{3}\b/ig);
    let mob_number = item.match(/\b8\d+\b/);
    let email = item.match(/\b\w+@\w+\b\.ru/);
    let position = item.match(/!.+!/);
    let w = [res, name, ex_number, mob_number, email, position];

    for (item of w) {
        if (item == null) {
            item = ["None"];
        }
    }

    console.log(w);

    obj[w[1][0]] = {
        department: (res == null) ? "None" : w[0][0].slice(1, w[0][0].length - 1),
        name: (name == null) ? "None" : w[1][0],
        ex_number: (ex_number == null) ? "None" : w[2][0],
        mob_number: (mob_number == null) ? "None" : w[3][0],
        email: (email == null) ? "None" : w[4][0],
        position: (position == null) ? "None" : w[5][0].slice(1, w[5][0].length - 1),
    }

    

}

for (item in obj) {

    console.dir(obj[item]);
}
let cpLocal = JSON.parse(localStorage.getItem("contacts"));
for (item in obj) {
    cpLocal[item] = JSON.stringify(obj[item]);
}

localStorage.setItem("contacts", JSON.stringify(cpLocal));

console.log("!");