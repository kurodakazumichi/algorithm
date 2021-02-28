/**
 * 2次元配列で作ったビンゴクラス
 */
namespace BingoType01 {

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
  private bingo:number[][] = [];

  /**
   * ビンゴの穴空いてるとこ管理するデータ、booleanの配列
   */
  private holes:boolean[][] = [];

  /**
   * ビンゴのサイズ
   */
  private size:number = 0;

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
  public setup(size:number, maybeBingoData:number[][]) :void
  {
    this.reset();

    // データの整合性をチェック、データおかしかったら終了
    if (!this.validateData(size, maybeBingoData)) return;

    // データはOK
    this.isEnabled = true;

    // ビンゴデータを設定していく
    this.size = size;
    
    // 行データを準備
    this.bingo = new Array(size);
    this.holes = new Array(size);

    // 列データを準備
    for(let i = 0; i < size; ++i) {
      this.bingo[i] = new Array(size);
      this.holes[i] = new Array(size);
    }

    // ビンゴデータを適用
    for(let y = 0; y < size; ++y) 
    {
      for(let x = 0; x < size; ++x) 
      {
        this.bingo[y][x] = maybeBingoData[y][x];
        this.holes[y][x] = false;
      }
    }
  }

  /**
   * ビンゴデータの整合性を確認する
   * ビンゴのサイズが0x0とかありえないのでサイズのチェックをして
   * ビンゴデータが指定されたサイズと違っててもおかしいのでそれをチェックする
   */
  private validateData(size:number, maybeBingoData:number[][]) :boolean
  {
    if (size <= 0) {
      console.log("ビンゴのサイズは1x1以上にする必要があります。");
      return false;
    }

    if (maybeBingoData.length !== size) {
      console.log("ビンゴデータの行数とビンゴのサイズが一致しません。");
      return false;
    }

    for(let y = 0; y < size; ++y) {
      if (maybeBingoData[y].length !== size) {
        console.log(`ビンゴデータ(${y}行目)がビンゴのサイズと一致しません。`);
        return false;
      }
    }

    return true;
  }

  /**
   * ビンゴデータの表示(デバッグ用)
   */
  public drawBingo() :void
  {
    if (!this.isEnabled) return;

    for(let i = 0; i < this.size; ++i) {
      console.log(this.bingo[i]);
    }
  }

  /**
   * 穴データの表示(デバッグ用)
   */
  public drawHoles() :void
  {
    if (!this.isEnabled) return;

    for(let i = 0; i < this.size; ++i) {
      console.log(this.holes[i]);
    }
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
    const pos = this.findPosByNumber(num);

    // 合ったら穴開ける
    if (pos != null) {
      this.holes[pos.y][pos.x] = true;
      return true;
    }

    return false;
  }

  /**
   * ビンゴの中に指定した数値があれば、その場所を返す。無ければnullを返す。
   */
  private findPosByNumber(num:number) : ICoord | null
  {
    if (!this.isEnabled) return null;

    for(let y = 0; y < this.size; ++y) {
      for(let x = 0; x < this.size; ++x) {
        if (this.bingo[y][x] === num) return {x, y};
      }
    }
    return null;
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
        if (!this.holes[y][x]) break;

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
        if (!this.holes[y][x]) break;

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
      if (!this.holes[i][i]) break;
      if (i === this.size - 1) return true;
    }

    // 右上から左下にかけてのチェック
    for(let i = 0; i < this.size; i++) 
    {
      if (!this.holes[i][(this.size - 1) - i]) break;
      if (i === this.size - 1) return true;
    }

    return false;
  }
}

//-----------------------------------------------------------------------------
// ビンゴテスト

// データを用意
const SIZE = 3;
const DATA = [
  [1, 2, 3],
  [3, 4, 5],
  [6, 7, 8],
]

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
  [ 1,  2,  3,  4,  5],
  [ 6,  7,  8,  9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
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