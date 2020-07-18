let color = ['#f1c5c5', '#8bcdcd', '#8bcdcd'];
let lists = ['.TODO ul li', '.Wizyty ul li', '.Wyprawka ul li', '.Room ul li'];
let elems = ['TODO', 'Wizyty', 'Wyprawka', 'Room'];
let elemTodo = [];
let counter = 0;


function dodaj(e) {
    let ind = elems.indexOf(e.target.id);
    let le = prompt("Dodaj pozycje do " + elems[ind], "");
    if (le == "") {
        alert("Value can't be empty");
        return;
    } else if (elems[ind] == "Wizyty") {
        if (Number.isNaN(Date.parse(le))) {
            alert("Invalid Date");
            return;
        }
    }
    addElementToList(le, elems[ind]);
}


function addElementToList(position, what) {
    let el = document.createElement("li");
    el.innerText = position;
    el.classList.add("animate");
    document.querySelector(".content ." + what + " ul").appendChild(el);

    formatlists();
}

function addClick() {
    let doc = document.querySelectorAll('div section span img');
    doc.forEach(element => {
        element.addEventListener('click', dodaj);
    });
}

const time = () => {
    let time = Date.now();

    let timeto = Date.parse('Jan 15, 2021');


    let diff = timeto - time;

    diff = diff / 1000;
    var seconds = Math.floor(diff % 60);
    diff = diff / 60;
    var minutes = Math.floor(diff % 60);
    diff = diff / 60;
    var hours = Math.floor(diff % 24);
    var days = Math.floor(diff / 24);


    document.querySelector('.clock').innerText = formatDate(days, hours, minutes, seconds);
    document.querySelector('.clock').style.opacity = "1";

    if (counter == 120) {
        document.querySelector('.clock').style.backgroundColor = color[0];
    } else if (counter == 240) {
        document.querySelector('.clock').style.backgroundColor = color[1];
    } else if (counter == 360) {
        document.querySelector('.clock').style.backgroundColor = color[2];
    } else if (counter > 360) {
        counter = 0;
    }
    counter++;
}


const formatDate = (days, hours, minutes, seconds) => {

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return days + " dni " + hours + ":" + minutes + ":" + seconds;

}

function formatlists() {

    lists.forEach(element => {
        let list = document.querySelectorAll(element);
        let counter = 0;
        //  element.substring(0, element.indexOf(" "));
        let parentId = element.substring(0, element.indexOf(" "));
        list.forEach(element => {

            let bu = document.createElement('button');
            bu.id = parentId + " " + counter;
            bu.style.backgroundImage = "url('minus.png')";
            bu.style.backgroundColor = color[1];
            element.appendChild(bu);
            element.id = counter;
            element.style.backgroundColor = color[0];
            counter++;
            element.addEventListener('click', usun);
        });
    });
}

const usun = (e) => {
    let id = CSS.escape(e.target.id.substring(e.target.id.indexOf(" ") + 1));
    let doce = document.querySelector(e.target.id.substring(0, e.target.id.indexOf(" ")));

    let don = doce.querySelector(`#${id}`);
    don.classList.add("remove");
    setTimeout(() => {
        don.remove();
    }, 1000);
}
setInterval(time, 1000);
addClick();