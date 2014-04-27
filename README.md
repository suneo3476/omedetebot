おめでてーBOT
========================

Q:なにこれ？

A:[@omedetebot](https://twitter.com/omedetebot "@omedetebot") を動かす一連のプログラムです。

使用ライブラリ
--------------
@ikr7 氏の[Twitter-Commands](https://github.com/ikr7/Twitter-Commands "ikr/Twitter-Commands")を使用しています。node.jsライブラリのntwitterをより使いやすくします。

機能
=============

おめでてー！
-----------------------
貴方が「おめでてー」とつぶやくと、「おめでてー！」とリプライします。

例：

@suneo3476Pro: まじ静大生おめでてーな

@omedetebot: @suneo3476Pro おめでてー！

TODO：@omedetebot が使用者をフォローする（@omedetebot のタイムラインに表示させる）必要があるので、follow back の実装が必要。

授業情報検索
-------------------------
授業の名前（全体or一部）をリプライすると、そのキーワードを含む本日開講される授業の情報をリプライします。

対応している授業科目について
-静岡大学情報学部のすべての科目と、共通教育科目（個別分野科目・学際科目）に対応しています。
-データは2014.04.11現在の平成26年度前期時間割、静岡大学全学共通科目シラバス2014を元に作成したものです。
-補講、休講、教室変更などの臨時情報は非対応です。
-細かいデータの変更などについては@omedetebotで告知します。

リプライで返す授業の情報について
-[学期] [曜日] | [授業名] [コマ] [教室] [学年] [学科プログラムその他] の形式が基本です。
-2件以上の結果は連結されます。
-140文字を超える場合はできるだけ表示して残りは省略されます。なるべく授業を特定できるキーワードにしましょう。

例：

（平成26年度前期の水曜日）

@suneo3476Pro: @omedetebot 論

@omedetebot: @suneo3476Pro 前期 木曜 | ドキュメンタリー論 2コマ DR 3年 ID | 情報学応用論(CS) 3コマ 情24 3年 CS | 情報学応用論(IS) 3コマ 情14 3年 ID | 情報学応用論(ID) 3コマ 情11 3年 IS

@suneo3476Pro: @omedetebot 論

@suneo3476Pro 前期 木曜 | コンピュータシステム演習 1コマ 情13 1年 情科 | コンピュータシステム演習 2コマ 情13 1年 情社 | コンピュータ設計Ⅱ 1コマ 情21 3年 CS | ドキュメンタリー論 2コマ DR 3年 IDほか

遠鉄バス時刻検索
-----------------------------
「静岡大学」または「六間坂上」（全体or一部）をリプライすると、浜松駅行のバスの時刻を経由地ごとにリプライします。

リプライで返す時刻の情報について
	
-[出発駅] 到着駅 [時:分][経由地の頭文字] | ... [n]件省略(140文字オーバー時)
=======
-[[出発駅]→浜松駅] [経由地1]経由 [時刻]（最大5件） | [経由地2]経由 [時刻] （最大5件）…

-データは遠鉄バス公式ページから取得したものを独自に加工して利用しています。[バス停別時刻表｜路線・時刻表・運賃｜遠鉄バス（路線バス・空港バス・高速バス）](http://info.entetsu.co.jp/navi/pc/jikoku.aspx "バス停別時刻表｜路線・時刻表・運賃｜遠鉄バス（路線バス・空港バス・高速バス）")
-運行情報などは非対応です。
-細かいデータの変更などについては@omedetebotで告知します。

例：

(「静岡大学」発を検索)

@suneo3476Pro: @omedetebot 静岡

@omedetebot: @suneo3476Pro [六間坂上] 浜松駅行  | 21:29尾 | 21:31ゆ | 21:58ゆ

(「六間坂上」発を検索)

@suneo3476Pro: @omedetebot 六間坂上

@omedetebot: @suneo3476Pro [静岡大学] 浜松駅行  | 21:28尾 | 21:30ゆ | 21:57ゆ

お願い
======

おめでてーBOTは開発中です。もしおかしな動きをしていたら、開発者までご一報ください。
快適なBOT運用に向けて頑張りますので、どうか宜しくお願いします。

更新
====
2014.4.27

遠鉄バス時刻検索の挙動を修正。
リプライ形式を変更、経由地ごとの表示を撤廃して、時刻の末尾に経由地の頭文字を表示。
それに合わせてREADMEの該当項目を更新。

2014.4.22

おめでてー！、授業情報検索、遠鉄バス時刻検索を標準機能として、おめでてーBOTを公開。

お願い
=======
おめでてーBOTは開発中です。もしおかしな動きをしていたら、開発者までご一報ください。どうか宜しくお願いします。

開発者への連絡
----------------------
suneo、suneo3476、すねお

Twitter: [@suneo3476Pro](https://twitter.com/suneo3476Pro "@suneo3476Pro")

EMail: suneo3476[at]gmail.com
