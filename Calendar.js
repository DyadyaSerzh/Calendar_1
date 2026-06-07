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