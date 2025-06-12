import {formatCurrency} from "../scripts/utils/money.js";

console.log('Test Suite: Format Currency Function Test') // some indivisual tests but in same group is Called Suite
if (formatCurrency(2095) === '20.95'){ // this is a single indivisual Test
    console.log('Passed');
}else{
    console.log('Failed');
}