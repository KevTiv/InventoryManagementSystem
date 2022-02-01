export const getTodayDate =():string =>{
        let today = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[today.getDay()];
        let dd = String(today.getDate()).padStart(2, '0').toString();
        let mm = String(today.getMonth() + 1).padStart(2, '0').toString(); //January is 0!
        let yyyy = today.getFullYear().toString();
        return (day+ ', ' + dd+ '/' + mm + '/' + yyyy);
    }

export const getYear =() =>{
    let today = new Date();
    return today.getFullYear();
}