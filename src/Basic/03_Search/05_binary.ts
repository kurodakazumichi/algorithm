/**
 * 二分探索法(バイナリーサーチ) 再帰処理による実装
 * https://github.com/kurodakazumichi/algorithm/issues/4
 */

{
  /**
   * 二分探索法により配列の中から特定の数値を場所を探す、見つからない場合は-1を返す
   */
  const search = (num:number, array:number[]) => 
  {
    return binary_search(array, num, 0, array.length);
  }

  /**
   * 二分探索法の再帰処理バージョン
   * @param array 配列
   * @param num 探したい数値
   * @param min 下限値
   * @param max 上限値
   * @returns numのindex、存在しない場合は-1
   */
  const binary_search = (array:number[], num:number, min:number, max:number):number =>
  {
    // 下限と上限が入れ替わったらarrayにnumは存在しないので-1
    if (max < min) return -1;

    // 中央の値を取得
    const index = Math.floor((min + max) / 2);
    const value = array[index];

    // numが見つかったら indexを返す
    if (value == num) return index;

    // 探しているモノが中央より右にあるなら、下限値を更新
    if (value < num) {
      return binary_search(array, num, index + 1, max);
    } 
    
    // 探しているものが中央より左にあるなら、上限値を更新
    else {
      return binary_search(array, num, min, index - 1);
    }
  }  

  // データ配列を用意する、要素は昇順で並べておく
  const array:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // テスト
  {
    for(let i = -5; i < 15; ++i) {
      const num = i;
      const foundIndex = search(num, array);
  
      if (foundIndex != -1) {
        console.log(`${num}はarray[${foundIndex}]に見つかりました。`);
      } else {
        console.log(`${num}は見つかりませんでした。`)
      }
    }
  }

}