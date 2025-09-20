'use strict';

//---------------Приложение---------------------
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2025-09-12T17:01:17.194Z',
    '2025-09-18T23:36:17.929Z',
    '2025-09-19T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  locale: 'de-DE',
  currency: 'EUR',

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2025-09-12T17:01:17.194Z',
    '2025-09-18T23:36:17.929Z',
    '2025-09-19T10:51:36.790Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  locale: 'be-BY',
  currency: 'BYN',

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2025-09-12T17:01:17.194Z',
    '2025-09-18T23:36:17.929Z',
    '2025-09-19T10:51:36.790Z',
  ],
};

const account5 = {
  owner: 'Vitaliy Sereda',
  movements: [1000, 600, 100, 50, 90],
  interestRate: 1,
  pin: 5555,

  currency: 'RUB',
  locale: 'ru-RU',

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2025-09-12T17:01:17.194Z',
    '2025-09-18T23:36:17.929Z',
    '2025-09-19T10:51:36.790Z',
  ],
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

//создание функции для отслеживания даты и времени
const formatMovementDate = function (date) {
  //Добавление выводов: вчера/сегодня для транзаций
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};

//функция для форматирования валют
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//cоздаем DOM элементы
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; // чтобы убрать начальные данные
  //сортировка массива
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]); //перебор двух массивов данных
    const displayDate = formatMovementDate(date);

    //добавление валюты
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
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

  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  //сумма снятых
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  //вычисляем процент от вклада.
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

//рассчитаем и выведем баланс
const calcDisplayBalace = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

//вызов функций
const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplayBalace(acc);
  calcDisplaySummary(acc);
};

//реализация входа в систему
//обработчики событий

//Всегда произведен вход в систему
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

//создание таймера выхода из системы
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //вывод каждой секунды в пользовательский интерфейс
    labelTimer.textContent = `${min}:${sec}`;

    //когда время будет 0, то остановить таймер и выйти из системы
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    //уменьшается каждая секунда
    time--;
  };
  //установка времени на 3 минуты
  let time = 180;
  //запуск таймера каждую секунду
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //предотвращение отправки формы

  //считывание пользователя
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Отображение пользовательского интерфейса и приветствие
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    //Создание текущей даты
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language; //поиск региона по браузеру
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); //язык-страна
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //очистка полей ввода
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //чтобы поле воода pin потеряло фокус
    //баланс, депозит

    //настройка таймера на сброс при входе другого пользователя
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});
// реализация перевода денег от одного пользователя к другому
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
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

    //Добавление даты перевода
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    //сброс таймера выхода
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});
// запрос кредита в банке. Креди предоставляется только в том случае, если  сумма вклада превышает или равна 10% от запрашиваемой суммы кредита
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); //добавление округления в меньшую сторону

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    //добавление таймера для получения кредита
    setTimeout(function () {
      //добавление суммы
      currentAccount.movements.push(amount);

      //добавление времени
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);

      //сброс таймера выхода
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

//закрытие(удаление) учетной записи
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    //удаление учетной записи
    accounts.splice(index, 1);

    //скрытие UI
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//обрабтчик событий для кнопки sort
let sorted = false; //начальное, противоположное сортировке
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
