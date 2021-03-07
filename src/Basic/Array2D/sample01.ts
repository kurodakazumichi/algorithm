/**
 * 出席番号1番から5番までの過去3回分のテストの点数を格納した2次元配列がある。
 * この配列から、テスト毎の平均点を求める、平均点を1次元配列に格納する。
 * 
 * 2次元配列は表のようなイメージで、行と列で考える。
 * 今回の2次元配列では行にはn回目のテスト回数、n列目は出席番号を表す
 * 
 * 例えばarray[0][0]と指定した場合は第一回目のテスト、出席番号1番のテストの得点を指す。
 */

// 得点の入った2次元配列
const scores:number[][] = [
  [66, 85, 10, 70, 80],
  [60, 98, 85, 56, 10],
  [87, 70, 98, 60, 50]
];

// 各テストの平均点を格納する配列
const avgs:number[] = new Array(scores.length);

/**
 * 各テストの平均点を計算するアルゴリズム
 */
function calcAvgs(scores:number[][], avgs:number[]) 
{
  // テストの回数分ループする
  for(let i = 0, count = scores.length; i < count; ++i) 
  {
    // ここではテストの平均点を求める計算をするが、ここに処理を書いてしまうと
    // ループが深くなり可読性が悪くなってしまう。
    // 数値の配列を渡したら平均を計算してくれる処理を別途関数にしておくことで
    // それぞれの処理がシンプルになるのでそういった作りを意識しておくとよい。
    avgs[i] = avg(scores[i]);
  }
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

calcAvgs(scores, avgs);

console.log(avgs);