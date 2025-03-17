import { MONTHS } from "./constant";

export const modifyDate = (firstDate: string, secondDate: string | null = null, flag: boolean = false) => {
  let firstSplitedString = firstDate.split(/[\.T]/);
  let newSecondDate;
  let secondSplitedString
  
  let newFirstDate = firstSplitedString[0].split("-");
  let firstMiddleValue;

  firstMiddleValue = newFirstDate[0];
  newFirstDate[0] = newFirstDate[1];
  newFirstDate[1] = firstMiddleValue;
  
  console.log(firstDate);

  if (secondDate !== null){
      secondSplitedString = secondDate.split(/[\.T]/);
  
      newSecondDate = secondSplitedString[0].split("-");
      let secondMiddleValue;

      secondMiddleValue = newSecondDate[0];
      newSecondDate[0] = newSecondDate[1];
      newSecondDate[1] = secondMiddleValue;
  }
  
  if (!flag){
    if (newSecondDate !== undefined && secondSplitedString !== undefined){
      if (+newFirstDate[2] === +newSecondDate[2]){
          return `${firstSplitedString[0].slice(-2)} ${MONTHS[+((new Date(firstSplitedString[0])).getMonth())]} c ${firstSplitedString[1].slice(0,-3)} до ${secondSplitedString[1].slice(0,-3)}`;
        }
        else{
          return `c ${firstSplitedString[0].slice(-2)} ${MONTHS[+((new Date(firstSplitedString[0])).getMonth())]} ${newFirstDate[1]} 
          по ${secondSplitedString[0].slice(-2)} ${MONTHS[+((new Date(secondSplitedString[0])).getMonth())]} ${newFirstDate[1]}`
        }
    }
  }
  else{
    return `${firstSplitedString[0].slice(-2)} ${MONTHS[+((new Date(firstSplitedString[0])).getMonth())]} ${newFirstDate[1]}`;
  }
  
}