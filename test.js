const fs = require("fs");

// soal no 1
function asterisk(input) {
  let output = "";
  let flag = false;
  for (let i = input; i >= 0; i--) {
    let star = "";
    if (input === 2) {
      flag = true;
    }
    for (let j = input; j > 0; j--) {
      star += "*";
    }
    if (flag === false) {
      input -= 1;
    } else {
      input += 1;
    }
    output += `${star}\n`;
  }
  return output;
}
console.log(asterisk(6));



//soal no 2
function sortJSON() {
  try {
    const data = fs.readFileSync("./data.json", "utf8");
    let parsedData = JSON.parse(data);
    let output = [];
    let result = [];
    // for(let i = 0 ; i < parsedData.length ; i++){
    //     if(output[i] === undefined){
    //         output.push({locationTransaction: parsedData[i].locationTransaction, totalAmount:  parsedData[i].totalAmount})
    //     }
    //     else if(output[i].locationTransaction === undefined){
    //         output.push({locationTransaction: parsedData[i].locationTransaction, totalAmount:  parsedData[i].totalAmount})
    //     }
    //    for(let j = 0 ; j <= output.length ; j++){
    //        if(output[j] === undefined){
    //            output.push({locationTransaction: parsedData[i].locationTransaction})
    //        }
    //    }
    // }
    parsedData.forEach((el, i) => { //cari unique location dulu
      if (output.includes(el.locationTransaction) === false) {
        output.push(el.locationTransaction);
      }
    });
    for (let i = 0; i < output.length; i++) { //di loop untuk di compare sama yang dari parsed data
      let temp = {};
      for (let j = 0; j < parsedData.length; j++) {
        if (output[i] === parsedData[j].locationTransaction) {
          if (temp.hasOwnProperty("locationTransaction") === false) { //untuk cek di object apakah sudah ada data
            temp["locationTransaction"] = parsedData[j].locationTransaction;
            temp["totalAmount"] = parsedData[j].totalAmount;
          } else {
            temp["totalAmount"] += parsedData[j].totalAmount;
          }
        }
      }
      result.push(temp);
      result.sort((a,b) => (a.totalAmount < b.totalAmount) ? 1 : ((b.totalAmount < a.totalAmount) ? -1 : 0))
    }
    return result
  } catch (err) {
    console.error(err);
  }
}

console.log(sortJSON());
