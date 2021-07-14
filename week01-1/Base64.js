//定义 64 位 的表示 A-Za-z0-9+/
let base64Arr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'];
let TIMES = 64;
//将 10 进制浮点数转换成 64 进制 ，假设精度在8位小数
function encodeBase64(value){
    //1 对整数部分进行转换
    let integer=Math.trunc(value);
    let num = integer;
    let result1 = '';
    while(num >= 1){
        result1 += base64Arr[num%TIMES];
        num = num/TIMES;
    }
    result1 =  result1.split('').reverse().join('');//求出整数部分
    //2 对小数部分进行转换
    let decimals = value - integer;
    let result2 = '';//小数部分
    let count = 0; 
    while(decimals !== 0 && count <=8 ){
        count++;
        decimals = decimals * TIMES;
        let index = Math.floor(decimals);
        result2 += base64Arr[index];
        decimals = decimals - index;
    }
    return result1 + '.' + result2;
}


console.log(encodeBase64(64.25))

console.log(encodeBase64(64.5));

console.log(encodeBase64(64.75));