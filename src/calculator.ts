//define the shape of the input data the use will provide
type InvestmentData = {
    initialAmount:number;
    annualContribution:number;
    expectedReturn:number;
    duration:number;
}

//define the shape of each year's calculated results
type InvestmentResult = {
    year:string;
    totalAmount:number;
    totalContribution:number;
    totalInterestEarned:number;
}
//this function can return either an array of results OR an error message which is in string type
type CalculationResult = InvestmentResult[] | string;
function calculateInvestment(data: InvestmentData):CalculationResult {

    //extract values from the data object(object destructuring)
    const{initialAmount, annualContribution, expectedReturn, duration} = data;

    //check input values and return error message if it invalid
    if (initialAmount < 0) {
        return 'Initial amount must be at least zero.';
    }
    if (expectedReturn < 0) {
        return 'Expected return must be at least zero.'
    }
    if (duration <=0) {
        return 'No valid amount of years provided';
    }

    //created local variables to track totals over the time
    let total = initialAmount;            //total investment value
    let totalContribution = 0;            //total money added by user
    let totalInterestEarned = 0;            //total interest earned

    //create an empty array to store results for each year
    const annualResult: InvestmentResult[] = [];

    //loop through each year of the investment
    for (let i = 0; i < duration; i++) {
        
        //apply interest for the year
        total = total * (1 + expectedReturn);

        //calculate interest earned so far
        totalInterestEarned = total - totalContribution - initialAmount;

        //adding this year's contribution
        totalContribution = totalContribution + annualContribution;

        //add contribution to total amount
        total = total + annualContribution;

        //store the result for this year
        annualResult.push({
            year:`Year ${i+1}`,
            totalAmount:total,
            totalInterestEarned,
            totalContribution,
        });
    }
    //return all yearly results
    return annualResult;


}