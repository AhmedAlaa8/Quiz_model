let b = document.querySelector('.titler span');
let h = document.querySelector('.span');
let h2 = document.querySelector('h2');
let ans = document.querySelectorAll('.ans input');
let label = document.querySelectorAll('label');
let submit = document.querySelector('.submit');
let answer = document.querySelector('.answer');
let title = document.querySelector('.title');
let answerend = document.querySelector('.answerend span');
let m = document.querySelector('.m').innerHTML = '00';
let s = document.querySelector('.s').innerHTML = '10';




setinter(s)

// fetch("./Quiz.json").then((re) => {
//     return re.json()
// }).then((re) => {
//     console.log(re);
// })

function getQu() {


    let x = new XMLHttpRequest();


    x.onreadystatechange = function () {
        if (this.readyState == 4) {
            let v = JSON.parse(this.responseText)

            cons(v)
        }
    }
    x.open("GET", "./Quiz.json", true);
    x.send();

}

getQu();

let count = 0;
let countq = 0;
let err = 0;
let notq = 0;


function cons(v) {


    b.innerHTML = `${v.length}`;

    for (let index = 1; index <= v.length; index++) {

        let span = document.createElement('span');
        h.appendChild(span)
        if (index == 1) {
            span.className = `finsh`
        }
    }


    h2.innerHTML = v[countq]['title'];


    label.forEach((value, k) => {


        value.innerHTML = v[0][`answer_${k + 1}`]



    })

    let arrchcked = Array.from(ans)
    arrchcked[0].checked = true



    submit.addEventListener("click", () => {

        ans.forEach((value, k) => {

            if (value.checked == true) {



                label.forEach((valu) => {


                    if (value.id == valu.className && countq < v.length) {

                        if (valu.textContent == v[countq]['right_answer']) {
                            count++
                        }
                        countq++

                    } else {
                        err++
                    }
                })
            }

        })




        if (countq < v.length && err !== 0) {


            h2.innerHTML = v[countq]['title'];


            label.forEach((value, k) => {

                value.innerHTML = v[countq][`answer_${k + 1}`]

            })
            ans.forEach((value, k) => {
                // value.checked = false
            })


            let spanf = document.querySelectorAll('.span span');
            let spanarr = Array.from(spanf)
            spanarr[countq].className = "finsh";

            err = 0
            notq = 0

            clearInterval(int)
            setinter(s)

        } else {

            if (countq >= v.length) {

                answer.innerHTML = "....."
                h2.innerHTML = "......"
                submit.disabled = true

                let halfint = Math.trunc(v.length / 2);


                if (count < halfint) {
                    answerend.innerHTML = "bad"
                    answerend.style.color = "red"
                }
                if (count > halfint) {
                    answerend.innerHTML = "good"
                    answerend.style.color = "green"
                }
                if (count >= 8) {
                    answerend.innerHTML = "prfict"
                    answerend.style.color = "rgb(12 12 218)"
                }


            }

        }


    })

}

function setinter(d) {

    let a = parseInt(d)
    int = setInterval(() => {
        if (--a >= 0) {
            document.querySelector(`.s`).innerHTML = `0${a}`
        } else {
            console.log('finch');
            clearInterval(int)
            submit.click()
        }
    }, 1000);

}
