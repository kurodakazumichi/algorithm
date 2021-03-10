/**
 * 線形探索アルゴリズム
 * 
 * 線形探索法は配列の先頭から順番に目的の要素を探し出していく方法である。
 *
 * 1から10までの数値が入った1次元配列から、指定した数値を線形探索法で探し
 * その数値の存在する配列の添え字を取得する処理を実装する。
 * 
 * 線形探索は目的のモノが配列の最初の方にあればすぐに見つかるが
 * 目的のモノがなかったり、配列の後ろの方にあるほど時間がかかるアルゴリズムである。
 */

{
  /**
   * 線形探索
   * @param num 探したい数値
   * @param array 配列
   */
  const search = (num:number, array:number[]):number => 
  {
    // 配列の先頭から順に比較し、見つかったらその時の添え字を返す
    for(let i = 0; i < array.length; ++i) {
      if (array[i] == num) return i;
    }

    // 見つからなければ-1を返す
    return -1;
  }

  // 1～10が適当に入った配列
  const array:number[] = [7, 1, 3, 10, 4, 8, 2, 5, 6, 9];  

  // 2を探してみる
  {
    const num = 2;
    const foundIndex = search(num, array);

    if (0 <= foundIndex) {
      console.log(`${num}はarray[${foundIndex}]に見つかりました。`);
    } else {
      console.log(`${num}は見つかりませんでした。`)
    }
  }

  // 30を探してみる
  {
    const num = 30;
    const foundIndex = search(num, array);

    if (0 <= foundIndex) {
      console.log(`${num}はarray[${foundIndex}]に見つかりました。`);
    } else {
      console.log(`${num}は見つかりませんでした。`)
    }
  }
}