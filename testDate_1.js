let nowDate = new Date(),
    nowDateNumber = nowDate.getDate(),
    nowMonth = nowDate.getMonth(),
    nowYear = nowDate.getFullYear(),
    container = document.getElementById('month-calendar'),
    hours=document.querySelector('.hours'),
    alternative=document.querySelector('.alternative'),
    monthContainer = container.getElementsByClassName('month-name')[0],
    yearContainer = container.getElementsByClassName('year-name')[0],
    daysContainer = container.getElementsByClassName('days')[0],
    inputShift=document.querySelector('.inputShift')
    inputDates=document.querySelectorAll('.inputDate')
    prev = container.getElementsByClassName('prev')[0],
    next = container.getElementsByClassName('next')[0],
    monthName = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
    monthNum = ['01','02','03','04','05','06','07','08','09','10','11','12'],
    startWorkPrev={},
    startWorkNext={},
    arrayMonthDays={},
    arrayMonthNights={},
    arrayOfShifts={1:{workDays:[],workNights:[]},2:{workDays:[],workNights:[]},3:{workDays:[],workNights:[]},4:{workDays:[],workNights:[]}},
    // ---на 01,082023
    firstWorkShift={
        day:1,
        shift:4
    },
    checkedShift=2 ;

    let workDays={},
    workNights={};

    let firstWorkShiftAct={
        day:1,
        shift:1
    };
    

    const shiftsArr={
        1:{
            day:1,
            shift:4
        },    
        2:{
            day:1,
            shift:2
        },    
        3:{
            day:1,
            shift:3
        },
        4:{
            day:1,
            shift:1
        },
    };

    function getWeekDay(date) {
        let days = ['H','ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
      
        return days[date.getDay()];
      }
      let date = new Date(); 
      
    const shiftsArr2=[{day:1,shift:4},{day:1,shift:2},{day:1,shift:3},{day:1,shift:1}];
    console.log('shiftsArr2',shiftsArr2[0].day)

if (localStorage.LocalShift){
    inputDates.forEach(e=>{
        if (e.value==localStorage.LocalShift){
            e.checked=true
            firstWorkShift = shiftsArr[localStorage.LocalShift]
            
        }
    })

} 



function correctDate(date) {
    if(nowDate.getMonth()!=8||nowDate.getFullYear()!=2023){
        let now_Month=date.getMonth()
        let now_Year=date.getFullYear()
        let correct_Date=new Date(now_Year,now_Month,1)
        let testDate1=new Date(2023,8,1)
        let monthDays = new Date(date.getFullYear(), now_Month+1, 0).getDate();
        console.log('monthDays',monthDays)


        let DateCount=Math.floor((correct_Date-testDate1)/(1000*24*3600))
        DateCount=DateCount-(Math.floor(DateCount/12))*12
        
        let koof=DateCount
        console.log('koofkoof',koof)
        // --- отримання першої робочої зміни на задану дату
        
         for(i=0;i<koof;i++){
            if(firstWorkShiftAct.day+1<=3){
                
                firstWorkShiftAct.day=firstWorkShiftAct.day+1
                
            }
            else if (firstWorkShiftAct.shift+1<=4){
                 
                firstWorkShiftAct.shift=firstWorkShiftAct.shift+1
                firstWorkShiftAct.day=1
                
            } 
                else {
                
                firstWorkShiftAct.shift=1
                firstWorkShiftAct.day=1
                
            }

        }
        console.log('firstWorkShift======>',firstWorkShiftAct)
        createArrayOfShifts(monthDays, firstWorkShiftAct,now_Month,now_Year)
        
    }
}
correctDate(nowDate)
// ----------------- create array of shifts


function createArrayOfShifts(monthDays, firstWorkShiftAct){
    arrayOfShifts={1:{workDays:[],workNights:[]},2:{workDays:[],workNights:[]},3:{workDays:[],workNights:[]},4:{workDays:[],workNights:[]}}
        
    // ------------------create array of days

        let day=firstWorkShiftAct.day
        let shift=firstWorkShiftAct.shift
        let nightShift
        if(shift==1){
                    nightShift=2
                }else if(shift==2){
                    nightShift=1
                }else if(shift==3){
                    nightShift=4
                }else  if(shift==4){
                    nightShift=3
                }

        
        for(i=1;i<=monthDays;i++){
            workDays[i]={day,shift}
            arrayOfShifts[shift].workDays.push(i)
            if(day+1<=3){day=day+1}
            else 
                if(shift==1){
                    shift=3
                    day=1
                }else if(shift==2){
                    shift=4
                    day=1
                }else if(shift==3){
                    shift=2
                    day=1
                }else  if(shift==4){
                    shift=1
                    day=1
                }
        }
       console.log('workDays====',workDays)
       // ------------------create array of nights
       for(i=1;i<=monthDays;i++){
            workNights[i]={day,nightShift}
            arrayOfShifts[nightShift].workNights.push(i)
            if(day+1<=3){day=day+1}
            else 
                if(nightShift==1){
                    nightShift=3
                    day=1
                }else if(nightShift==2){
                    nightShift=4
                    day=1
                }else if(nightShift==3){
                    nightShift=2
                    day=1
                }else  if(nightShift==4){
                    nightShift=1
                    day=1
                }
        }
       console.log('workNights====',workNights)
       console.log('arrayOfShifts====',arrayOfShifts[checkedShift])
       setMonthCalendar(nowYear,nowMonth)


};


function setMonthCalendar(year,month) {
    
    
    
        console.log(workDays)
        console.log(workNights)
        let DaysHours=arrayOfShifts[checkedShift].workDays.length*11
        let NightsHours=arrayOfShifts[checkedShift].workNights.length*11
        let SummOfShifts=(arrayOfShifts[checkedShift].workNights.length)+(arrayOfShifts[checkedShift].workDays.length)
        hours.innerHTML=`<H3>Денні години --- ${DaysHours}</H3><H3>Нічні зміни --- ${arrayOfShifts[checkedShift].workNights.length}</H3><H1>Сумарні години  --- ${DaysHours+NightsHours}</H1><H1>Всього змін  --- ${SummOfShifts}</H1>`
        console.log('DaysHours',DaysHours)
        
    
    
    let monthDays = new Date(year, month + 1, 0).getDate(),
        monthDaysPrev = new Date(year, month, 0).getDate(),
        monthPrefix = new Date(year, month, 0).getDay(),
        monthDaysText = '';
    
    
    monthContainer.textContent = monthName[month];
    yearContainer.textContent = year;
    daysContainer.innerHTML = '';
    
    
    if (monthPrefix > 0){
        for (let i = 1  ; i <= monthPrefix; i++){
            monthDaysText += '<li></li>';
        }
    }

    for (let i = 1; i <= monthDays; i++){
        monthDaysText += '<li >' + i + '</li>';
    }

    daysContainer.innerHTML = monthDaysText;
    days = daysContainer.getElementsByTagName('li');
    
    
    if (month == nowMonth && year == nowYear){
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix + nowDateNumber - 1].classList.add('date-now');
    }
    arrayOfShifts[checkedShift].workDays.forEach(i=>{
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix+i-1].classList.add('workDays');
    })
    arrayOfShifts[checkedShift].workNights.forEach(i=>{
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix+i-1].classList.add('workNights');
    })
    // creare altCal-------------------------------

    let alternativeContainer=document.createElement('div')
    alternativeContainer.classList.add('altCal')
    alternative.innerHTML=''
    alternativeContainer.innerHTML='<p>Дата</p><p>День</p><p>Денна</p><p>Нічна</p>'
    
    
    for(i=1;i<=monthDays;i++){
        let altDate=document.createElement('div')
        let weekDay=getWeekDay(new Date(year, month,i))
        altDate.innerHTML=`${i} `+monthNum[month]+` `+year
        altDate.classList.add('altDate')
        alternativeContainer.append(altDate)
        let altDay=document.createElement('div')
        altDay.innerHTML=weekDay
        if(new Date(year, month,i).getDay()==0||new Date(year, month,i).getDay()==6)[
            altDay.classList.add('weekend')    
        ]
        altDay.classList.add('altDay')
        alternativeContainer.append(altDay)
        let altDays=document.createElement('div')
        if(arrayMonthDays[i]==1){
            altDays.innerHTML='A'
            altDays.classList.add('shiftA')

        }else 
        if(arrayMonthDays[i]==2){
            altDays.innerHTML='B'
            altDays.classList.add('shiftB')

        }else
        if(arrayMonthDays[i]==3){
            altDays.innerHTML='C'
            altDays.classList.add('shiftC')

        }else
        {
            altDays.innerHTML='D'
            altDays.classList.add('shiftD')

        }
        alternativeContainer.append(altDays)
        let altNights=document.createElement('div')
        if(arrayMonthNights[i]==1){
            altNights.innerHTML='A'
            altNights.classList.add('shiftA')

        }else 
        if(arrayMonthNights[i]==2){
            altNights.innerHTML='B'
            altNights.classList.add('shiftB')

        }else
        if(arrayMonthNights[i]==3){
            altNights.innerHTML='C'
            altNights.classList.add('shiftC')

        }else
        {
            altNights.innerHTML='D'
            altNights.classList.add('shiftD')

        }
        alternativeContainer.append(altNights)

        
    }
    




    alternative.append(alternativeContainer)




    console.log('arrayMonthDays====',arrayMonthDays)
    console.log('test====',arrayMonthNights)

   
}
// ------
