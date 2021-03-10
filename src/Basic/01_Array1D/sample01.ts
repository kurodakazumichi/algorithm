/**
 * テストの合計点と平均点を求める
 */

 namespace Basic.Array1D {
 /**
  * テスト10回分の点数を格納するための配列として、要素10個の配列を用意。
  */
 const points:number[] = [
  90, 85, 95, 75, 70, 85, 90, 78, 85, 95,
 ];
 
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

// 合計と平均を表示
console.log("sum=", sum(points));
console.log("avg=", avg(points));

}