function BabyAge(start: string, end: string) {
    let birthdate="2022-07-17"
    let eventdate = "2023-05-10"
    let years = 0;
    let months = 0;
    let days = 0;
    years = +eventdate.slice(0, 4)-(+birthdate.slice(0, 4));
    months = +eventdate.slice(5, 7) - (+birthdate.slice(5, 7));
    if (months < 0) {
        years -= 1;
        months = 12 + months;
    }
    days = +eventdate.slice(8, 10) - (+birthdate.slice(8, 10));
        if (days < 0) {
            months -= 1;
            days = 30 + days;
    }
    return years +" years "+months+" months "+days+" days"
}
export default BabyAge;