/**
 * テストの合計点と平均点を求める
 */

 /**
  * テスト10回分の点数を格納するための配列として、要素10個の配列を用意。
  */
 const points:number[] = new Array(10);

 // 配列に適当な点数を入れる。
 points[0] = 90;
 points[1] = 85;
 points[2] = 95;
 points[3] = 75;
 points[4] = 70;
 points[5] = 85;
 points[6] = 90;
 points[7] = 78;
 points[8] = 85;
 points[9] = 95;
 
/**
 * 合計を求めるアルゴリズム
 * 数値の配列を受け取り、配列の要素の合計を計算する。
 */
function sum(array:number[]) :number 
{
  let sum = 0;

  for(let i = 0, count = array.length; i < count; ++i) {
    sum += array[i];
  }
  return sum;
}

/**
 * 平均を求めるアルゴリズム
 * 数値の配列を受け取り、配列要素の合計を求め、最後に配列の要素数で割る
 */
function avg(array:number[]) : number
{
  const count = array.length;

  let sum = 0;

  for(let i = 0; i < count; ++i) {
    sum += array[i];
  }

  return sum / count;
}

console.log("sum=", sum(points));
console.log("avg=", avg(points));