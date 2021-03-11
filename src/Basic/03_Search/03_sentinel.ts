/**
 * 番兵法によるアルゴリズムの高速化
 * https://github.com/kurodakazumichi/algorithm/issues/3
 */

{
  /**
   * 番兵法による探索
   * arrayの配列の末尾は番兵用の要素ということを前提とする
   */
  const search = (num:number, array:number[]) => 
  {
    // 配列の末尾に番兵を設定する
    array[array.length - 1] = num;

    // forの条件式を省略
    for(let i = 0; ; ++i) {
      if(array[i] == num) return i;
    }
  }

  // 1～10が適当に入った配列、配列の末尾の要素は番兵用
  const array:number[] = [7, 1, 3, 10, 4, 8, 2, 5, 6, 9, -1];

  // 2を探してみる
  {
    const num = 2;
    const foundIndex = search(num, array);

    if (foundIndex < array.length) {
      console.log(`${num}はarray[${foundIndex}]に見つかりました。`);
    } else {
      console.log(`${num}は見つかりませんでした。`)
    }
  }

  // 20を探してみる
  {
    const num = 20;

    // 番兵を設定して探索
    const foundIndex = search(num, array);

    if (foundIndex < array.length - 1) {
      console.log(`${num}はarray[${foundIndex}]に見つかりました。`);
    } else {
      console.log(`${num}は見つかりませんでした。`)
    }
  }

}