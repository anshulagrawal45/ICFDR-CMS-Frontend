import { LocalDate } from "./DateAndTime";

export default function compareDates(date2,date1=LocalDate()) {
    // Extract day and month from date1
    const [day1, month1,year1] = date1.split(/[\/-]/);
    //date 1 format is 18/07/2023
    
    // Extract day and month from date2
    const [year2,month2,day2] = date2.split(/[\/-]/);
    // date 2 format is 2023-07-01
    
    // Compare day and month
    return (day1 === day2 && month1 === month2);
  }