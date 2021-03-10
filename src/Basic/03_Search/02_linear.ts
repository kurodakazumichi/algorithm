/**
 * 売上金額と値引きコードを入力して請求額を出力する
 * https://github.com/kurodakazumichi/algorithm/issues/2
 */
{
  /**
  * 値引きマスターデータインターフェース
  */
  interface IDiscountMaster {
    code:string;
    rate:number;
  }

  /**
  * 値引きコードから値引き率を検索する 
  * 指定したコードが存在しない場合は-1を返す
  */
  const search = (code:string, table:IDiscountMaster[]):number => 
  {
    for(let i = 0, count = table.length; i < count; ++i) 
    {
      // コード < 値引きコードなら探す必要がないので探索打ち切り
      if (code < table[i].code) return -1;
    
      // 値引き率を返す
      if (code == table[i].code) return table[i].rate;
    }

    return -1;
  }

  /**
  * 値引きマスタ
  */
  const master:IDiscountMaster[] = [
    {code:'A', rate:0.01},
    {code:'B', rate:0.03},
    {code:'C', rate:0.08},
    {code:'G', rate:0.12},
    {code:'K', rate:0.15},
    {code:'Z', rate:0.20},
  ];

  {
    // 売上金額2500、値引きコードBの処理
    const sales = 2500;
    const code  = 'C';
    
    // 値引き率を検索 
    const rate = search(code, master);

    // 結果表示
    if (0 <= rate) {
      const discount = sales * rate;
      console.log(`売上金額:${sales} 値引き額:${discount} 請求額:${sales - discount}`);
    } else {
      console.log("エラー");
    }
  }

  {
    // 売上金額2500、値引きコードBの処理
    const sales = 2500;
    const code  = 'H';
    
    // 値引き率を検索 
    const rate = search(code, master);

    // 結果表示
    if (0 <= rate) {
      const discount = sales * rate;
      console.log(`売上金額:${sales} 値引き額:${discount} 請求額:${sales - discount}`);
    } else {
      console.log("エラー");
    }
  }

  {
    // 売上金額2500、値引きコードBの処理
    const sales = 2500;
    const code  = 'Z';
    
    // 値引き率を検索 
    const rate = search(code, master);

    // 結果表示
    if (0 <= rate) {
      const discount = sales * rate;
      console.log(`売上金額:${sales} 値引き額:${discount} 請求額:${sales - discount}`);
    } else {
      console.log("エラー");
    }
  }    
}