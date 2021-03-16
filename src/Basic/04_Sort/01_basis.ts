/**
 * 逐次決定法(基本選択法)
 * https://github.com/kurodakazumichi/algorithm/issues/5
 */
{
  /**
   * 逐次決定法によるソート関数
   */
  const sort = (array:number[]) => 
  {
    const count = array.length;

    // 全要素ループ
    for(let i = 0; i < count - 1; ++i) 
    {
      // 大小比較ループ
      for(let j = i; j < count; ++j) {

        const min = array[i];
        const max = array[j];

        if (max < min) {
          array[i] = max;
          array[j] = min;
        }
      }
    }
  }

  // 適当な配列を用意する
  const array =  [10, 2, 5, 3, 9, 8, 4, 6, 7, 1];

  // ソートする
  sort(array);
  console.log(array);
}