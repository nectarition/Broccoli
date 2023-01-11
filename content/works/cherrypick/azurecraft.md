+++
Title = 'AzureCraft'
SubTitle = 'Azure Virtual MachinesでMinecraftサーバを建てて遊ぼう'
EyecatchURL = '/works/eyecatch/azurecraft.jpg'
Date = 2023-01-05T15:00:00Z
departments = ['cherrypick']

+++

Microsoft Azure研究活動です。

<!--more-->


Azure認定試験を受験するためAzure Active Directoryの作成からAzure Virtual Machinesの利用までを一連を通して演習した。

久しぶりにMinecraftマルチで遊びたかったことから、Minecraftバニラサーバを立てることを目標に設定。

Azure AD作成時、無料サブスクリプション周りで躓いたが、以降は文献を活用し以下の構成でVMを構築した。

可用性を必要としないがそこそこのスペックが必要という今回の用途が、Spot VMのメリットと合致していたため採用。

パブリックIPアドレスとディスクで20円程度、VM使用料が6時間稼働で20円程度、合計40円/6時間という割安で利用できた。

## トピック

- 身内サーバ程度であれば十分使用できることがわかった。
- Spot VMはAzureの空きリソースを割安で利用できるが、リソースが足りなくなり設定した最大料金を超えると停止されてしまうため可用性が求められる用途では使用してはいけない。
- Azure VMの無料枠(B1sサイズ)でDiscord Botを立ててメインサーバを開始したり停止したりできるようにすれば、低コストで実用的なサーバを構築できそう。
