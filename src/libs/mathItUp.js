const mathItUp = (arrayOfN) => {
    let currentRes;
    console.log(arrayOfN)
    while (arrayOfN.length > 1) {
      for (let i = 0; i < arrayOfN.length; i++) {
        let leftN = parseFloat(arrayOfN[i-1])
        let rightN = parseFloat(arrayOfN[i+1])
        let operator = arrayOfN[i]
        switch (operator) {
          case '*':
            currentRes = (leftN * rightN).toFixed(3);
            arrayOfN.splice(i - 1, 3, currentRes); // Remove 2 numbers and operator, insert result
            i -= 1; // Adjust index
            break;
          case '/':
            currentRes = (leftN / rightN).toFixed(3);
            arrayOfN.splice(i - 1, 3, currentRes);
            i -= 1;
            break;
          default:
            break;
        }
      }
      for(let i = 0; i< arrayOfN.length; i++){
        let leftN = parseFloat(arrayOfN[i-1])
        let rightN = parseFloat(arrayOfN[i+1])
        let operator = arrayOfN[i]
        switch(operator){
        case '+':
            currentRes = leftN + rightN;
            arrayOfN.splice(i - 1, 3, currentRes);
            i -= 1;
            break;
          case '-':
            currentRes = leftN - rightN;
            arrayOfN.splice(i - 1, 3, currentRes);
            i -= 1;
            break;
          default:
            break;
          }
      }
    }   
    console.log(typeof arrayOfN[0])
    return arrayOfN[0];
  };
  export default mathItUp;