const currentDate = document.querySelector(".panel__current-date"),
      days = document.querySelector(".days"),
      arrowIcons = document.querySelectorAll('.arrow'),
      arrowPrev = document.getElementById('prev'),
      arrowNext = document.getElementById('next'),
      btnUpdate = document.getElementById('btnUpdate');

let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

const daysOfWeek = [
  'Понедельник',
  'Вторник', 
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

const months = [
  'Январь', 
  'Февраль', 
  'Март', 
  'Апрель', 
  'Май', 
  'Июнь', 
  'Июль', 
  'Август', 
  'Сентябрь', 
  'Октябрь', 
  'Ноябрь', 
  'Декабрь'
];

const renderCalendar = () => {
  let firstDateOfMonth = new Date(currentYear, currentMonth, 0).getDay(); // first day of month
  let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // last date of curr month
  let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(); // last date of curr month
  let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // last date of prev month
  let liTag = ``;

  for (let i = firstDateOfMonth; i > 0; i--) {
    liTag += `<li class="calendar__widget disactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for(let i = 1; i <= lastDateOfMonth; i++) {
    liTag += `<li class="calendar__widget">${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 7; i++) {
    liTag += `<li class="calendar__widget">${i - lastDayOfMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
  days.innerHTML = liTag;
  onPrintDaysOfWeek();
  onDisablePrevDays();
}

// render a prefix for the name of the day of the week
const onPrintDaysOfWeek = () => {
  const visibleDays = Array.from(document.querySelectorAll('.calendar__widget'));
  for (i = 0; i < 7; i++) {
    visibleDays[i].innerText = `${daysOfWeek[i]}, ${visibleDays[i].innerText}`;
  }
}

const onDisablePrevDays = () => {
  const dayToday = new Date().getDate();
  const monthNow = new Date().getMonth();
  const yearNow = new Date().getFullYear();
  const visibleDays = Array.from(document.querySelectorAll('.calendar__widget'));
  console.log(currentMonth);
  if (currentMonth == monthNow & currentYear == yearNow) {
    for (let i = 0; i < dayToday-1; i++) {
      visibleDays[i].classList.add('disable');
    }
  }
}

renderCalendar();

arrowIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    icon === arrowPrev? currentMonth-- : currentMonth++;

    // move to next year
    if (currentMonth > 11) { 
      currentMonth = 0;
      currentYear += 1;
    }
    
    // or move to prev year
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    }
    
    renderCalendar();
  })
})

btnUpdate.addEventListener('click', () => {
  location.reload();
})

const visibleDays = Array.from(document.querySelectorAll('.calendar__widget'));
visibleDays.forEach(day => {
  day.addEventListener('click', () => {
    visibleDays.forEach(el => {
      el.classList.remove('active');
    })
    day.classList.add('active');
  })
})


