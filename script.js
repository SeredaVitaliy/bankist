'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
/* 
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// -----------------------------методы - просто функции, приклепленные к массивам-------------------------------
//-------------------------------------Простые инструменты-------------------------------------
let arr = ['a', 'b', 'c', 'd', 'e'];

//1. метод срезов. Можем извлечь часть любого массива не изменяя сам массив
console.log(arr.slice(2)); //(3) ['c', 'd', 'e']
console.log(arr.slice(2, 4)); //(2) ['c', 'd']
console.log(arr.slice(-2)); //(2) ['d','e' ]
console.log(arr.slice(-1)); //(1) ['e']
console.log(arr.slice(1, -2)); //(2) ['b', 'c']

//мы можем использовать метод slice для простого создания неглубокой копии любого массива
console.log(arr.slice()); //['a', 'b', 'c', 'd', 'e']
console.log([...arr]); //['a', 'b', 'c', 'd', 'e']

//Splice - изменяет исходный массив
console.log(arr.splice(2)); //(3) ['c', 'd', 'e']
console.log(arr); //['a', 'b']
//метод сплайс удалил 2 и перезаписал массив

//вариант удалить послдений элемент массива
arr.splice(-1);
console.log(arr); //['a']
arr.splice(1, 2); //второй параметр количество, которое нужжно будет удалить
console.log(arr); //['a']

//Reverse - изменяет начальный массив
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //(5) ['f', 'g', 'h', 'i', 'j']
console.log(arr2); //(5) ['f', 'g', 'h', 'i', 'j']

//CONCAT - для объединения двух массивов - не изменяет исходный массив
const letters = arr.concat(arr2); // 1 массив, для которого используется метод, а второй массив - тот, который хотим добавить
console.log(letters); //(10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]); //(10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

//Join
console.log(letters.join(' - ')); //a - b - c - d - e - f - g - h - i - j

//-----Метод добавления (метод создания массива)
const arr3 = [23, 11, 64];
console.log(arr[0]); //23
console.log(arr.at(0)); //23
// У метода at есть одна полезная особенность. Предположим, нам нужно узнать узнать последний элемент массива, но мы не знаем его длину
console.log(arr3[arr3.length - 1]); //64. для получения последнего элемента массива
console.log(arr3.slice(-1)); //[64]
console.log(arr3.slice(-1)[0]); //64
console.log(arr3.at(-1)); //64

//также работает со строками
console.log('jonas'.at(0)); //j
console.log('jonas'.at(-1)); //s

//-------------------------------Перебор массива: метод forEach---------------------------------------------
//Представим, что хотим просмотреть этот массив перемещений, чтобы напечатать сообщение для каждого перемещения по этому банковскому счету. Положительное значение - депозит, когда закидывают, а отрицательные сначения-  снятия со счета
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
console.log('--------------------------for Of------------------------------');

for (const movement of movements) {
  if (movement > 0) {
    console.log(`Вы положили на счет ${movement}`);
  } else {
    console.log(`Вы сняли ${Math.abs(movement)}`);
  }
}
/*Вы положили на счет 200
Вы положили на счет 450
Вы сняли 400
Вы положили на счет 3000
Вы сняли 650
Вы сняли 130
Вы положили на счет 70
Вы положили на счет 1300 


//по форИч - функция высокого порядка, которая требует функцию обратного вызова
console.log('--------------------------horEach------------------------------');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`Вы положили на счет ${movement}`);
  } else {
    console.log(`Вы сняли ${Math.abs(movement)}`);
  }
});

0: function(200)
1: function(450)
2: function(400)
....


//если нужен доступ к текущему счетчику
console.log('--------------------------for Of------------------------------');

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Действие ${i + 1}: Вы положили на счет ${movement}`);
  } else {
    console.log(`Действие ${i + 1}: Вы сняли ${Math.abs(movement)}`);
  }
}

console.log('--------------------------horEach------------------------------');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Действие ${i + 1}: Вы положили на счет ${mov}`);
  } else {
    console.log(`Действие ${i + 1}: Вы сняли ${Math.abs(mov)}`);
  }
});
// 1 параметр всегда текущий элемен, вторым всегда текущий индекс, а третий всегда весь массив, по которому мы проходимся циклом

когда какой использовать
мы не можем выйти из цикла forEach - он всегда выполняет цикл по всему массиву. Если нужно выйти из цикла, то нужен будет for of 


//------------------------forEach для Map и Set------------------------
// ---------------forEach для Map------------
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value} `);
});
/*
USD: United States dollar 
EUR: Euro 
GBP: Pound sterling
 
// ----------forEach для Set---------

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); //Set(3) {'USD', 'GBP', 'EUR'}
currenciesUnique.forEach(function (value, key, map) {
  //можно заменить (value, _, map)
  console.log(`${key}: ${value} `);
});
/*
USD: USD 
GBP: GBP 
EUR: EUR
 */

//---------------Приложение---------------------
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Vitaliy Sereda',
  movements: [1000, 600, 100, 50, 90],
  interestRate: 1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//cоздаем DOM элементы
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // чтобы убрать начальные данные
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html); //принимает 2 параметра. 1 - то, куда хотим вставить элемент.  2 - строка, содержащая код, который мы хотим вставить
  });
};
// при помощи map вычислим имена пользователей для каждого владельца учетной записи в приложении
//Сначала создадим функцию для одной учетной записи, а затем обощим эту функцию для всех учетных записей:
/* 
const user = 'Steven Thomas Williams'; //stw
const username = user
  .toLowerCase()
  .split(' ')
  .map(function (name) {
    return name[0];
  })
  .join('');*/
const createUsernames = function (accs) {
  //делаем для каждой учетной записи
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
        UR;
      })
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

//теперь надо вычислить имя пользователя для каждого владельца учетной записи в массиве учетных записей

// если в виде стрелочной: username = user.toLowerCase().split(' ').map(name => name[0]).join('')

//расчет снятых и закинутых средств. расчет процентов по вкладу
//сумма зачислений
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  //сумма снятых
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  //вычисляем процент от вклада.
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//рассчитаем и выведем баланс
const calcDisplayBalace = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//вызов функций
const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalace(acc);
  calcDisplaySummary(acc);
};

//реализация входа в систему
//обработчики событий

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //предотвращение отправки формы

  //считывание пользователя
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Отображение пользовательского интерфейса и приветствие
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    //очистка полей ввода
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //чтобы поле воода pin потеряло фокус
    //баланс, депозит

    updateUI(currentAccount);
  }
});
// реализация перевода денег от одного пользователя к другому
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

//закрытие(удаление) учетной записи
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    //удаление учетной записи
    accounts.splice(index, 1);

    //скрытие UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
