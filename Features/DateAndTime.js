export function LocalDate(){
    return new Date().toLocaleDateString("en-GB")
            
}

export function LocalTime(){
    return new Date().toLocaleTimeString()
}

export function getMonthName(monthNumber) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const parsedMonthNumber = parseInt(monthNumber, 10); // Parse input as an integer
  
    if (!isNaN(parsedMonthNumber) && parsedMonthNumber >= 1 && parsedMonthNumber <= 12) {
      return months[parsedMonthNumber - 1];
    } else {
      return "Invalid month number";
    }
  }