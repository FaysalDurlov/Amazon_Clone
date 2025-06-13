import {formatCurrency} from "../../scripts/utils/money.js";

describe('test Suite: FormatCurrency',()=>{
    it('Converts Cents into Dollars', ()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('Woks with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounds up to nearest cent',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.02')
    });
});