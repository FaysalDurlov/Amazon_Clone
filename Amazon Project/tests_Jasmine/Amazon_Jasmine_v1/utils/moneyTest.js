import {formatCurrency} from "../../../scripts/utils/money.js";

describe("This Is a Suit Which is Used to Give a title/ Discribe My Test. Ex. (Money format testing.) ",()=>{
    it("Under the describe: these are subSection. Or My Test Case for a funtion which Can be Mutiple. Ex. (Moeney formate is 20.95)",()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it("For input 0",()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it("For Input 2000.5",()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
});