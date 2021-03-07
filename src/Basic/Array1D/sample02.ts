/**
 * 1月～12月の売上が格納された配列がある、各月の合計額を同じ配列の最後の要素に格納する
 * ※あまりこういった処理はしないと思うがテキストにあるので一応やる
 */


// 12ヵ月分+合計額の13要素を格納できる配列を準備
const sales: number[] = new Array(13);

// 12ヵ月分の売上を埋める
sales[0]  = 100;
sales[1]  = 90;
sales[2]  = 80;
sales[3]  = 75;
sales[4]  = 89;
sales[5]  = 78;
sales[6]  = 65;
sales[7]  = 77;
sales[8]  = 79;
sales[9]  = 99;
sales[10] = 110;
sales[11] = 95;
sales[12] = 0; // 合計額は0で初期化

// 売上の総和をもとめ、配列の最後に格納する関数
function calc(array:number[]) 
{
  let sum = 0;

  // ループは配列の要素数を使うと汎用的
  for (let i = 0; i < array.length - 1; ++i) {
    sum += array[i];
  }

  // array.length - 1が配列の末尾になる
  array[array.length - 1] = sum;
}

// 12ヵ月分の合計額を売上配列の末尾に追加
calc(sales);
console.log(sales);