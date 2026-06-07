let getRes=document.querySelector('.getRes')

getRes.addEventListener('click', ()=>{
    let 
    timeNorm=+document.querySelector('.timeNorm').value,
    salary =+document.querySelector('.salary').value,
    bonus =+document.querySelector('.bonus').value,
    dayNorm=+document.querySelector('.dayNorm').value,
    nightNorm=+document.querySelector('.nightNorm').value,
    vacation=+document.querySelector('.vacation').value,
    resShow=document.querySelector('.resShow'),
    resDescr=document.querySelector('.resDescr');
    let outWork=document.querySelector('.outWork').value;

    console.log('dayNorm====', dayNorm)
    console.log('timeNorm====',timeNorm)
    let salaryOfHour=salary/(timeNorm*11);
    console.log('salaryOfHour',salaryOfHour)
    let workTime=(dayNorm*11+vacation*11+outWork*5.5)
    let NightOverPay=nightNorm*7*0.2*salaryOfHour
    console.log('workTime',workTime)
    let res=Math.trunc(workTime*salaryOfHour+NightOverPay+bonus)
    console.log('res',res)
    resShow.innerHTML=res

})

