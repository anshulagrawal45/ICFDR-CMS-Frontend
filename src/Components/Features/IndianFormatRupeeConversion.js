export default function toIndianNumberingSystem(input) {
    // return input.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
    // let result = '';
    // input = input + '';
    // let numArray = input.split('');
    // let length = numArray.length;
    
    // for (let i = length - 1; i >= 0; i--) {
    //   count++;
    //   result = numArray[i] + result;
    //   if ((count % 3 == 0 && i != 0) || (count % 2 == 0 && count > 4 && i != 0)) {
    //     result = ',' + result;
    //   }
    // }
    if(input === undefined) return
  return  input.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'INR'
  });
    
    // return '₹' + result;
  }
  
