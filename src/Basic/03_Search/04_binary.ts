/**
 * 二分探索法(バイナリーサーチ)
 * https://github.com/kurodakazumichi/algorithm/issues/4
 */

{
  /**
   * 二分探索法により配列の中から特定の数値を場所を探す、見つからない場合は-1を返す
   */
  const search = (num:number, array:number[]) => 
  {
    // 探索の開始Index(min)と、終端Index(max)を設定
    let min = 0;
    let max = array.length - 1;
    let foundIndex = -1;

    // 開始と終端が入れ替わるまで続ける
    while(min <= max) 
    {
      let index = Math.floor((min + max) / 2);

      // 一致するものが見つかれば終了
      const value = array[index];

      if (value === num) {
        foundIndex = index;
        break;
      }

      // 探しているモノがもっと右にある場合
      if (value < num) {
        min = index + 1;
      } 
      
      // 探しているモノがもっと左にある場合
      else {
        max = index - 1;
      }
    }

    return foundIndex;
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