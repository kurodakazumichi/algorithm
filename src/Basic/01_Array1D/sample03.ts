/**
 * 配列：初期値の設定
 * 一般的にプログラムで変数を定義するとは、使用するメモリを確保するという事であり
 * メモリを確保した上で、そのメモリに値を代入する事で値が保持される。
 * 
 * 変数の定義と同時に値も設定する事を初期化と呼び
 * 変数を定義した後で、値を設定する事を代入と呼ぶ
 */
namespace Basic.Array1D {

  // このように書くとarray1という変数を定義(メモリを確保)と同時に値が設定(初期化)される。
  const array1:number[] = [ 1, 2, 3, 4, 5 ];

  // このようにまずarray2という配列を定義(メモリを確保)し、その後に値を設定(代入)する事もできる。
  const array2:number[] = [];
  array2[0] = 1;
  array2[1] = 2;
  array2[2] = 3;
  array2[3] = 4;
  array2[4] = 5;

  // 私自身は初期化で済ませられるならそっちの方が書くのも楽だしそうする。
  console.log(array1);
  console.log(array2);
}