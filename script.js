// Задаем начальные значения данных

// Клетки с числами 4х4 - массив из четырех массивов
kletki = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
]

// Задаем запуск функции startProgram в момент после полной загрузки веб-страницы
window.onload = startProgram;

// стартовая функция
function startProgram(){

	// при нажатии кнопок клавиатуры, запускаем программу keyProgram
	window.onkeydown = keyProgram;

	// и вставим первую двойку на поле
	vstavimChislo();
}

// функция реагирует на нажатия клавиатуры
// в эту функцию автоматически передаются данные о нажатии в переменную 'e'
function keyProgram(e){

	// вверх
    if (e.keyCode == 38){
    	// при нажатии стрелки запускаем функцию сдвига чисел в нужную сторону
    	move('vverh');
    }

	// вниз
    if (e.keyCode == 40){
    	// аналогично
    	move('vniz');
    }

	// влев
    if (e.keyCode == 37){
    	move('vlevo');
    }

	// вправо
    if (e.keyCode == 39){
    	move('vpravo');
    }
    //console.log(e)
}

// функция сдвига чисел
function move(kuda){
	// в переменной kuda хранится направление
	
	if(kuda  == 'vlevo'){
		// это самый простой сдвиг
		for(indexMassiva in kletki){
			// берем поочередно массивы (линии чисел) и отправляем на склейку
			tempMassiv = skleimLiniyu(kletki[indexMassiva]);
			// результат склеивания вставляем обратно
			kletki[indexMassiva] = tempMassiv;
		}
	}
	if(kuda  == 'vpravo'){
		// вправо двигается также как в лево
		for(indexMassiva in kletki){
			// только перед сдвигом переворачиваем массив - reverse()
			// skleimLiniyu ведь работает всегда в одном напрвлении
			tempMassiv = skleimLiniyu(kletki[indexMassiva].reverse());
			// а перед вставкой переворачиваем результат
			kletki[indexMassiva] = tempMassiv.reverse();
		}
	}
	if(kuda  == 'vverh'){
		// вертикальный сдвиг гораздо сложнее
		// делаем сдвиг поочередно каждой линии
		moveLineVverh(0);
		moveLineVverh(1);
		moveLineVverh(2);
		moveLineVverh(3);
	}
	if(kuda  == 'vniz'){
		// сдвигаем как вверх аналогичной функцией
		moveLineVniz(0);
		moveLineVniz(1);
		moveLineVniz(2);
		moveLineVniz(3);
	}
	// после сдвига чисел в массиве, обновим внешний вид игры
	obnovimChislaVKletkah();
	// а теперь вставляем двойку в случайное место
	vstavimChislo();
}



// эта функция свигает одну вертикальную линию (ряд) цифр вверх
// номер ряда хранится в переменной indexLinii
function moveLineVverh(indexLinii){
	// создаем пустой массив для хранения изначальных чисел 
	vertikMassiv = [];
	// перебираем массивы клеток (горизонтальные ряды)
	for(indexMassiva in kletki){
		// и берем по одному числу из каждого ряда
		vertikMassiv.push( kletki[indexMassiva][indexLinii] );
	}
	// затем склеиваем (сдвигаем) полученный вертикальный ряд чисел
	tempMassiv = skleimLiniyu(vertikMassiv);
	// снова перебираем ряды клеток
	for(indexMassiva in kletki){
		// и записываем в клетку каждого ряда новые значения
		kletki[indexMassiva][indexLinii] = tempMassiv[indexMassiva];
	}
}

// эта функция аналогична moveLineVverh
function moveLineVniz(indexLinii){
	vertikMassiv = [];
	for(indexMassiva in kletki){
		vertikMassiv.push( kletki[indexMassiva][indexLinii] );
	}
	// только перед склейкой ряд переворачивается
	tempMassiv = skleimLiniyu(vertikMassiv.reverse());
	// а потом переворачивается результат склейки
	tempMassiv.reverse();
	for(indexMassiva in kletki){
		kletki[indexMassiva][indexLinii] = tempMassiv[indexMassiva];
	}
}

// эта функция возвращает случайное число от 0 до 3
function randomIndex(){
	return parseInt(Math.random()*4);
}	

// эта функция вставляет двойку в случайное место
function vstavimChislo(){
	randomX = randomIndex();
	randomY = randomIndex();
	// если случайное место свободно...
	if (kletki[randomX][randomY] == 0){
		// тогда вставляем двойку в массив чисел
		kletki[randomX][randomY] = 2;
		// вычисляем id нужной клетки
		idKletki = 'id_kletka_' + randomX + randomY;
		// вставляем двойку в html-представление
		document.getElementById(idKletki).innerHTML = 2;
	// а если не свободно, число не вставляем
	} else {
		// но проверяем, есть ли вообще свободные места
		proverkaSvobodnihMest();
	}
}


// эта функция проверяет, не закончена ли игра
function proverkaSvobodnihMest(){
	// перебираем все клетки
	for (x in kletki) {
		for (y in kletki[x]) {
			if (kletki[x][y] == 0){
				// если число в клетке == 0 то игра не закончена
				// завершаем перебирать
				return;
			}
		}
	}
	// если не нашлось ни одной клетки с 0, игра завершается
	alert('Игра окончена!');
}

// функция перебирает все числа в массиве и вставляет в html-представление
function obnovimChislaVKletkah(){
	// перебираем список рядов
	for (x in kletki) {
		// внутри ряда перебираем клетки
		for (y in kletki[x]) {
			// смотрим что хранится в клетке
			chislo = kletki[x][y];
			// вычисляем id соответствующего элемента html
			idKletki = 'id_kletka_' + x + y;
			if (chislo == 0){
				// вместо нулей вставляем пустое место
				document.getElementById(idKletki).innerHTML = '';
			} else {
				// а если число не ноль - вставляем его
				document.getElementById(idKletki).innerHTML = chislo;
			}

		}
	}
}

// функция сдвига чисел в одном ряду
// на вход принимает массив из 4 чисел - starMassiv
// и возвращает результат - тоже массив из 4 чисел
function skleimLiniyu(starMassiv){
	// новый результирующий массив пока пустой
	novMassiv = [];
	// переменная для хранения последнего (предыдущего) числа 
	posledneeChislo = 0;
	// перебираем изначальный массив (список чисел)
	for (x in starMassiv) {
		// если это число не ноль и предыдущее число равно этому числу
		if(starMassiv[x] !== 0 && posledneeChislo == starMassiv[x]){
			// складываем предыдущее и это число
			summa = starMassiv[x] + posledneeChislo;
			// добавляем в новый массив результат
			novMassiv.push(summa);
			// обнуляем последнее число
			posledneeChislo = 0;

		// иначе
		// если это число не ноль и предыдущее число не равно этому
		} else if(starMassiv[x] !== 0 && posledneeChislo != starMassiv[x]){
			if(posledneeChislo !== 0){
				// если предыдущее число было не ноль, добавляем его в результирующий массив
				novMassiv.push(posledneeChislo);
			}
			// делаем это число предыдущим
			posledneeChislo = starMassiv[x];
			if(x == 3){
				// но если мы уже дошли до последнего числа в массиве
				// добавляем в результирующий массив
				novMassiv.push(posledneeChislo);
			}

		// иначе
		// если это число равно нулю и последнее число не равно нулю
		} else if(starMassiv[x] == 0 && posledneeChislo != 0){
			if(x == 3){
				// и если мы в конце массива
				// добавим в результат последнее число
				novMassiv.push(posledneeChislo);
			}
		}
	};
	// добавим нули в конец склеенного массива
	// добавить нужно столько, чтобы было 4 элемента массива
	nujnoNulei = 4 - novMassiv.length;
	// запускаем цикл от нуля до nujnoNulei
	for (i = 0; i < nujnoNulei; i++) {
		// просто добавляем один ноль в конец массива
		novMassiv.push(0);
	};
	// возвращаем результирующий массив
	return novMassiv;
}
