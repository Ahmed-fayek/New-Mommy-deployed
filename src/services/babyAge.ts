function BabyAge(start: string) {
    let birthdate=start;
    const eventDate = new Date();
const currentDateString = eventDate.toISOString();
console.log(currentDateString);
console.log(birthdate);

    let years = 0;
    let months = 0;
    let days = 0;
    years = +currentDateString.slice(0, 4)-(+birthdate.slice(0, 4));
    months = +currentDateString.slice(5, 7) - (+birthdate.slice(5, 7));
    if (months < 0) {
        years -= 1;
        months = 12 + months;
    }
    days = +currentDateString.slice(8, 10) - (+birthdate.slice(8, 10));
        if (days < 0) {
            months -= 1;
            days = 30 + days;
    }
    return years +" years "+months+" months "+days+" days"
}
export default BabyAge;