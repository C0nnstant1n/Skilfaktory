 // задание 1 поиск нулевых, чётных и нечётных чисел в массиве
 console.log('Задание №1')
function numberOfElements(){
    let arr = [0, null, NaN, 0, 1, 2, 4, '2', '0', 12]

    let even = 0;
    let odd = 0;
    let zero = 0;

    for (let i in arr) {
        if (typeof arr[i] === 'number' && !isNaN(arr[i])) {
            if (arr[i] === 0) {
                zero += 1;
            } else if (arr[i] % 2 === 0) {
                even += 1;
            } else {
                odd += 1;
            }
        }
    }

    console.log('четных элементов: ', even)
    console.log('нечетных элементов: ', odd)
    console.log('нулей: ', zero)
}

numberOfElements()


// Задание 2 проверка является ли число простым
 console.log('Задание №2')
function isNatural(number){
    if (number < 2) {
        console.log('Ноль и единица не являются простыми числами')
    }
    else if (number > 1000) {
        console.log('Данные не верны')
    }
    else {
        let s = 0,
            k = number
        while (k > 0){
            s = number % k ? s +=0: s +=1
            k -= 1
        }
        if (s === 2) {
            console.log(`число ${number} - простое`)
            return true
        }
        else {
            return false
        }
    }
}

console.log(isNatural(5))


// Задание 3
 console.log('Задание №3')
function num1(number1){
    return function (number2){
        return number2 + number1
    }
}

const resultFunc = num1(4)
console.log(resultFunc(5))


// Задание 4 Счётчик
 console.log('Задание №4')
function counter (start, stop){
    const intervalId = setInterval(function(){
        console.log(start);
        start += 1
        if (start === stop + 1) {
            clearInterval(intervalId)
        }
    }, 1000, start)
}

counter(0, 10)


 // Задание 5 Возведение числа x в степень n
 console.log('Задание №5')
 const powFunc = (x, n) => {
    return Math.pow(x, n)
 }

 console.log(powFunc(2, 8))