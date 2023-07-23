function TimeConverter(mytime: string) {
    let time = mytime;
    let hours = +time.slice(0, 2);
    let mins =  +time.slice(3, 5);
    if (hours > 12) {
        hours = hours - 12;
        time = `${hours>9?hours:`0${hours}`}:${mins>9?mins:`0${mins}`} pm`;

    } else {

        time = `${hours > 9 ? hours : `0${hours}`}:${mins > 9 ? mins : `0${mins}`} am`;
        
    }
            console.log(time);
    return time
}
export default TimeConverter;