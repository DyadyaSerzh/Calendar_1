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
    firstWorkShift={
        day:1,
        shift:4
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



function correctDate() {
    if(nowDate.getMonth()!=8||nowDate.getFullYear()!=2023){
        let testDate=new Date()
        let now_Month=testDate.getMonth()
        let now_Year=testDate.getFullYear()
        let correct_Date=new Date(now_Year,now_Month,1)
        let testDate1=new Date(2023,8,1)
        
        let DateCount=Math.floor((correct_Date-testDate1)/(1000*24*3600))
        DateCount=DateCount-(Math.floor(DateCount/12))*12
        console.log('DateCount1111',DateCount)
        obtainNextDate(DateCount)
        
    }
}
correctDate()

inputShift.addEventListener('change',(e)=>{
    let shift= e.target.value
    console.log('shift====>',shift)
    localStorage.LocalShift=shift;
    firstWorkShift.day = shiftsArr2[shift-1].day
    firstWorkShift.shift = shiftsArr2[shift-1].shift
    console.log('firstWorkShift====>',firstWorkShift)
    console.log('WorkShiftD====>',shiftsArr[4])
    console.log('shiftLocal====>',localStorage.LocalShift)
    correctDate()
    setMonthCalendar(nowYear,nowMonth);
})

// let curDate = nowDate.setMonth(nowDate.getMonth() - 1);

function obtainPrevDate(monthDays){
    let koof = monthDays-Math.floor(monthDays/12)*12
    console.log('monthDays',monthDays)
    console.log('koof===',koof)
    for(i=koof;i>0;i--){
        if(firstWorkShift.day-1>0){firstWorkShift.day=firstWorkShift.day-1}
        else if (firstWorkShift.shift-1>0){
            firstWorkShift.shift=firstWorkShift.shift-1
            firstWorkShift.day=3
        } else {
            firstWorkShift.shift=4
            firstWorkShift.day=3
        }
    }
  
}

function obtainNextDate(DateCount, koof2=0,monthDaysForAlt=0){
    let koof = DateCount-Math.floor(DateCount/12)*12
    console.log('koofkoof',koof)
    console.log('DateCount',DateCount)
    for(i=0;i<koof;i++){
        if(firstWorkShift.day+1<=3){firstWorkShift.day=firstWorkShift.day+1}
        else if (firstWorkShift.shift+1<=4){
            firstWorkShift.shift=firstWorkShift.shift+1
            firstWorkShift.day=1
        } else {
            firstWorkShift.shift=1
            firstWorkShift.day=1
        }

    }
    let monthDays = new Date(nowYear, nowMonth, 0).getDate()
    if(!koof2){koof2=koof}
    else{monthDays=DateCount}
    // console.log('testMMMMMMMMMMMMM',monthDays)
    if(monthDaysForAlt!=0){monthDays=monthDaysForAlt}
    createAlternativCalendar(koof2,monthDays)
}
// inpuDate.addEventListener("change", setStartDate);
function setStartDate(e){
    let dataMonth=new Date(e.target.value).getMonth()
    let dataDay=new Date(e.target.value).getDate()
    let dataYear=new Date(e.target.value).getFullYear()
    console.log('date',dataDay)
    console.log('date',dataMonth)
    console.log('date',dataYear)
    curYear=dataYear
    curMonth=dataMonth
    dayStartWork.pop()
    dayStartWork.push(dataDay)
    setMonthCalendar(curYear,curMonth,dayStartWork);

}
function setMonthCalendar(year,month) {
    console.log('firstWorkShift2====>',firstWorkShift)
    
    let workDays=[],
    workNights=[];
    function createWorkShifts({day,shift},monthDays){
        for(d=1;d<=monthDays;d++){
            if(shift==1){
                if(day<3){
                    workDays.push(d)
                    day++
                    }else{
                    workDays.push(d)
                    day=1
                    shift++;
                }
            }else if(shift==2){
                if(day<3){
                    day++
                }else{
                    day=1
                    shift++
                }
            }else if(shift==3){
                if(day<3){
                    workNights.push(d)
                    day++
                }else{
                    workNights.push(d)
                    day=1;
                    shift++
                }
            }else if(shift==4){
                if(day<3){
                    day++
                }else{
                    day=1
                    shift=1
                }
            }
        }
        console.log(workDays)
        console.log(workNights)
        let DaysHours=workDays.length*11
        let NightsHours=workNights.length*11
        let SummOfShifts=(workNights.length)+(workDays.length)
        hours.innerHTML=`<H3>Денні години --- ${DaysHours}</H3><H3>Нічні зміни --- ${workNights.length}</H3><H1>Сумарні години  --- ${DaysHours+NightsHours}</H1><H1>Всього змін  --- ${SummOfShifts}</H1>`
        console.log('DaysHours',DaysHours)
        
    };
    
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
    
    createWorkShifts(firstWorkShift,monthDays)

    if (month == nowMonth && year == nowYear){
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix + nowDateNumber - 1].classList.add('date-now');
    }
    workDays.forEach(i=>{
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix+i-1].classList.add('workDays');
    })
    workNights.forEach(i=>{
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

setMonthCalendar(nowYear,nowMonth);

prev.onclick = function () {
    let curDate = new Date(yearContainer.textContent,monthName.indexOf(monthContainer.textContent));

    curDate.setMonth(curDate.getMonth() - 1);

    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth(),
        monthDays=new Date(curYear,curMonth+1,0).getDate();
        obtainPrevDate(monthDays)
    setMonthCalendar(curYear,curMonth);
}


next.onclick = function () {
    
    let curDate = new Date(yearContainer.textContent,monthName.indexOf(monthContainer.textContent));
    // ----
    console.log('curDate0',curDate.getMonth())
    curDate.setMonth(curDate.getMonth()+1);
    console.log('curDate1',curDate.getMonth())


    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth();
        console.log("curMonth====>",curMonth)
        monthDays=new Date(curYear,curMonth,0).getDate();
        console.log("monthDays====>",monthDays)
        monthDaysForAlt=new Date(curYear,curMonth+1,0).getDate();
        console.log("monthDaysForAlt====>",monthDaysForAlt)
        // --------------------------
        let correct_Date=new Date(curYear,curMonth,1)
        let testDate1=new Date(2023,8,1)
        
        let Count=Math.floor((correct_Date-testDate1)/(1000*24*3600))-(Math.floor((correct_Date-testDate1)/(1000*24*3600)/12))*12
        console.log('Count',Count)
        let koof2=Count
        // -------------------------
        obtainNextDate(monthDays,koof2,monthDaysForAlt)
    setMonthCalendar(curYear,curMonth);

    // ------------------------------
    
}

function createAlternativCalendar(koof,monthDays) {
    arrayOfShifts={1:{workDays:[],workNights:[]},2:{workDays:[],workNights:[]},3:{workDays:[],workNights:[]},4:{workDays:[],workNights:[]}},
    console.log('test',koof)
    let startDays={};
    function createAltCal(day,shift,shiftIndex){
        console.log('test',koof)
            console.log('testDay',day)
            console.log('testShift',shift)
            console.log('testIndex',shiftIndex)
            
        for(i=0;i<koof;i++){
            if(day+1<=3){day=day+1}
            else if (shift+1<=4){
                shift=shift+1
                day=1
            } else {
                shift=1
                day=1
            }
            startDays[shiftIndex]={day,shift} 
        }
        if(!koof)(startDays=shiftsArr)
       console.log('startDays====',startDays)
    }
    createAltCal(shiftsArr2[0].day,shiftsArr2[0].shift,1)
    createAltCal(shiftsArr2[1].day,shiftsArr2[1].shift,2)
    createAltCal(shiftsArr2[2].day,shiftsArr2[2].shift,3)
    createAltCal(shiftsArr2[3].day,shiftsArr2[3].shift,4)


    function createWorkShifts2(day,shift,monthDays,shiftIndex){
        for(d=1;d<=monthDays;d++){
            // console.log('monthDaysmonthDaysmonthDays-----',monthDays)
            if(shift==1){
                if(day<3){
                    arrayOfShifts[shiftIndex].workDays.push(d)
                    day++
                    }else{
                        arrayOfShifts[shiftIndex].workDays.push(d)
                    day=1
                    shift++;
                }
            }else if(shift==2){
                if(day<3){
                    day++
                }else{
                    day=1
                    shift++
                }
            }else if(shift==3){
                if(day<3){
                    arrayOfShifts[shiftIndex].workNights.push(d)
                    day++
                }else{
                    arrayOfShifts[shiftIndex].workNights.push(d)
                    day=1;
                    shift++
                }
            }else if(shift==4){
                if(day<3){
                    day++
                }else{
                    day=1
                    shift=1
                }
            }
        }
        console.log('arrayOfShifts====',arrayOfShifts)
    }
    // console.log('arrayOfShifts====',startDays)
    monthDays=new Date(nowYear,nowMonth+1,0).getDate()
    createWorkShifts2(startDays[1].day,startDays[1].shift,monthDays,1)
    createWorkShifts2(startDays[2].day,startDays[2].shift,monthDays,2)
    createWorkShifts2(startDays[3].day,startDays[3].shift,monthDays,3)
    createWorkShifts2(startDays[4].day,startDays[4].shift,monthDays,4)

    for (i=1;i<=4;i++){
        console.log('i=====',i)
        for(j=0;j<arrayOfShifts[i].workDays.length;j++){
            let b=arrayOfShifts[i].workDays[j]
            arrayMonthDays[b]=i
        }
        for(j=0;j<arrayOfShifts[i].workNights.length;j++){
            let b=arrayOfShifts[i].workNights[j]
            arrayMonthNights[b]=i
        }
    }
    // Створення альтернативного календаря
    
   
}
