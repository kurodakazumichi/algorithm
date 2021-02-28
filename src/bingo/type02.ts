/**
 * 1次元配列で作ったビンゴクラス
 */

namespace BingoType02 {

/**
 * 座標を表すインターフェース
 */
interface ICoord {
  x:number;
  y:number;
}

class Bingo 
{
  /**
   * ビンゴのデータ、数値が沢山はいってる
   */
  private bingo:number[]= [];

  /**
   * ビンゴの穴空いてるとこ管理するデータ、booleanの配列
   */
  private holes:boolean[] = [];

  /**
   * ビンゴの一辺のサイズ
   */
  private size:number = 0;

  /**
   * ビンゴ配列のトータルサイズ
   */
  private get totalSize () {
    return this.size * this.size;
  }

  /**
   * ビンゴが有効化どうかのフラグ
   */
  private isEnabled:boolean = false;

  /**
   * コンストラクタではメンバの状態をリセットしておく
   */
  constructor() {
    this.reset();
  }

  /**
   * ビンゴの状態をリセットする
   */
  private reset() :void
  {
    this.isEnabled = false;
    this.bingo = [];
    this.holes = [];
    this.size  = 0;
  }

  /**
   * ビンゴデータの大きさや、ビンゴのデータを設定する
   * 指定されたデータがおかしかったらデータは設定されない。
   */
  public setup(size:number, maybeBingoData:number[]) :void
  {
    this.reset();

    // データの整合性をチェック、データおかしかったら終了
    if (!this.validateData(size, maybeBingoData)) return;

    // データはOK
    this.isEnabled = true;

    // ビンゴデータを設定していく
    this.size = size;
    
    // 行データを準備
    this.bingo = new Array(this.totalSize);
    this.holes = new Array(this.totalSize);

    // ビンゴデータを適用
    this.foreach((index) => {
      this.bingo[index] = maybeBingoData[index];
      this.holes[index] = false;
    })
  }

  /**
   * ビンゴデータの整合性を確認する
   * ビンゴのサイズが0x0とかありえないのでサイズのチェックをして
   * ビンゴデータが指定されたサイズと違っててもおかしいのでそれをチェックする
   */
  private validateData(size:number, maybeBingoData:number[]) :boolean
  {
    if (size <= 0) {
      console.log("ビンゴのサイズは1x1以上にする必要があります。");
      return false;
    }

    if (maybeBingoData.length !== size * size) {
      console.log("ビンゴデータとビンゴのサイズが一致しません。");
      return false;
    }

    return true;
  }

  /**
   * ビンゴデータの表示(デバッグ用)
   */
  public drawBingo() :void
  {
    if (!this.isEnabled) return;

    let text = "";

    this.foreach((index, coord) => 
    {
      text += `${this.bingo[index]} `;

      if (coord.x == this.size - 1) {
        console.log(text);
        text = "";
      }
    });
  }

  /**
   * 穴データの表示(デバッグ用)
   */
  public drawHoles() :void
  {
    if (!this.isEnabled) return;

    let text = "";

    this.foreach((index, coord) => 
    {
      text += `${this.holes[index]? "o":"x"} `;

      if (coord.x == this.size - 1) {
        console.log(text);
        text = "";
      }
    });
  }

  /**
   * ビンゴに穴をあけてみるメソッド
   * 数値を指定して、その数値があれば穴を開けるし、無ければ開けない。
   * 穴があいたらtrue、あかなければfalseを返す。
   */
  public tryOpen(num:number) :boolean
  {
    if (!this.isEnabled) return false;

    // 数字あるかな？
    const foundIndex = this.findIndexByNumber(num);

    // 合ったら穴開ける
    if (foundIndex !== -1) {
      this.holes[foundIndex] = true;
      return true;
    }

    return false;
  }

  /**
   * ビンゴの中に指定した数値があれば、その場所を返す。無ければnullを返す。
   */
  private findIndexByNumber(num:number) :number
  {
    if (!this.isEnabled) return -1;

    // 数値が一致した場所(index)を返す
    for(let i = 0, total = this.totalSize; i < total; ++i) {
      if (this.bingo[i] === num) return i;
    }

    return -1;
  }

  /**
   * ビンゴがクリアになってるかどうかを判定して、結果を返す。
   */
  public get isClear() :boolean
  {
    if (!this.isEnabled) return false;

    // 横、縦、斜めをみてビンゴがクリアされているか判定
    if (this.isClearHorizontal) return true;
    if (this.isClearVertical) return true;
    if (this.isClearCross) return true;
    return false;
  }

  /**
   * 横方向のビンゴ判定、privateだしIsEnableで判定するのは省いちゃっていいかなー
   */
  private get isClearHorizontal() :boolean
  {
    for(let y = 0; y < this.size; y++) {
      for(let x = 0; x < this.size; x++) 
      {
        // 穴が開いてない箇所があった時点でこの行はビンゴではないのでループ終了
        if (!this.holes[this.getIndexBy(x, y)]) break;

        // xがsize - 1まで来ていたら全て穴が開いていた事になるためビンゴとしてtrueを返す
        if (x === this.size - 1) return true;
      }
    }

    // ここまで来たらビンゴしていないのでfalse
    return false;
  }

  /**
   * 縦方向のビンゴ判定、privateだしIsEnableで判定するのは省いちゃっていいかなー
   */
  private get isClearVertical() :boolean
  {
    for(let x = 0; x < this.size; x++) {
      for(let y = 0; y < this.size; y++) 
      {
        // 穴が開いてない箇所があった時点でこの行はビンゴではないのでループ終了
        if (!this.holes[this.getIndexBy(x, y)]) break;

        // yがsize - 1まで来ていたら全て穴が開いていた事になるためビンゴとしてtrueを返す
        if (y === this.size - 1) return true;
      }
    }

    // ここまで来たらビンゴしていないのでfalse
    return false;
  }

  /**
   * 斜め方向のビンゴ判定、privateだしIsEnableで判定するのは省いちゃっていいかなー
   */
  private get isClearCross() :boolean
  {
    // 左上から右下にかけてのチェック
    for(let i = 0; i < this.size; i++) 
    {
      if (!this.holes[this.getIndexBy(i, i)]) break;
      if (i === this.size - 1) return true;
    }

    // 右上から左下にかけてのチェック
    for(let i = 0; i < this.size; i++) 
    {
      let x = (this.size - 1) - i;
      let y = i;

      if (!this.holes[this.getIndexBy(x, y)]) break;
      if (i === this.size - 1) return true;
    }

    return false;
  }

  /**
   * xy座標でindexを取得
   */
  private getIndexBy(x:number, y:number) :number
  {
    return y * this.size + x;
  }

  /**
   * indexで座標(xy)を取得
   */
  private getCoordBy(index:number) : ICoord
  {
    return {
      x: index % this.size,
      y: Math.floor(index / this.size)
    };
  }

  /**
   * ちょっと楽するためにforeachをメソッド化
   */
  private foreach(callback:(index:number, coord:{x:number, y:number}) => void) :void
  {
    for(let i = 0, total = this.totalSize; i < total; ++i) {
      callback(i, this.getCoordBy(i));
    }
  }  
}

//-----------------------------------------------------------------------------
// ビンゴテスト

// データを用意
const SIZE = 3;
const DATA = [
  1, 2, 3,
  3, 4, 5,
  6, 7, 8,
];

// ビンゴを作って、データを設定
const bingo = new Bingo();
bingo.setup(SIZE, DATA);

// 適当に穴を開けてみる
bingo.tryOpen(1);
bingo.tryOpen(4);
bingo.tryOpen(7);
bingo.tryOpen(8);

// デバッグ表示
console.log("--------------------------------------------------------------")
bingo.drawBingo();
bingo.drawHoles();

// クリア判定
console.log(`isClear = ${bingo.isClear}`);


// 別なデータでやってみる
const SIZE2 = 5;
const DATA2 = [
   1,  2,  3,  4,  5,
   6,  7,  8,  9, 10,
  11, 12, 13, 14, 15,
  16, 17, 18, 19, 20,
  21, 22, 23, 24, 25,
];

// ビンゴのデータを再設定
bingo.setup(SIZE2, DATA2);

// 適当に穴を開けてみる
bingo.tryOpen(1);
bingo.tryOpen(7);
bingo.tryOpen(13);
bingo.tryOpen(19);
bingo.tryOpen(24);

// デバッグ表示
console.log("--------------------------------------------------------------")
bingo.drawBingo();
bingo.drawHoles();

// クリア判定
console.log(`isClear = ${bingo.isClear}`);

}