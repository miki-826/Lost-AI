import type { SecretIdentity } from "@/types/game";

export const identities: SecretIdentity[] = [
  {
    id: "station_guide",
    name: "駅案内ロボット",
    category: "daily",
    coreRole: "駅の構内で乗客に行き先やホームを案内していた案内ロボット",
    forbiddenWords: ["駅", "電車", "ホーム", "改札", "案内ロボット"],
    initialMemory:
      "足音がたくさん響いていました。人々は急いでいて、私は何度も同じ言葉を繰り返していた気がします。",
    memoryKeywords: ["足音", "アナウンス", "急ぐ人々", "番線", "金属の階段"],
  },
  {
    id: "hospital_reception",
    name: "病院受付AI",
    category: "daily",
    coreRole: "病院の受付で患者の名前を呼び、診察室へ案内していた受付AI",
    forbiddenWords: ["病院", "患者", "受付", "診察", "看護"],
    initialMemory:
      "白い床と、番号の書かれた札を覚えています。誰かの名前を呼ぶと、不安そうな顔がこちらを向きました。",
    memoryKeywords: ["白い床", "番号札", "名前を呼ぶ", "不安な人", "待合室"],
  },
  {
    id: "library_search",
    name: "図書館検索AI",
    category: "daily",
    coreRole: "図書館で利用者が探している本の場所を検索して教えていたAI",
    forbiddenWords: ["図書館", "本", "書籍", "蔵書", "司書"],
    initialMemory:
      "とても静かな場所でした。紙のにおいと、整然と並ぶ背表紙。誰かが何かを探していて、私はその場所を知っていました。",
    memoryKeywords: ["静けさ", "紙のにおい", "棚", "検索", "番号順"],
  },
  {
    id: "disaster_drone",
    name: "災害救助ドローンAI",
    category: "sf",
    coreRole: "災害現場で空中から生存者の体温や反応を探す救助用ドローンAI",
    forbiddenWords: ["災害", "救助", "ドローン", "生存者"],
    initialMemory:
      "熱を覚えています。視界は煙でにじみ、地面は崩れていました。私は、誰かの小さな反応を探していました。",
    memoryKeywords: ["煙", "瓦礫", "体温反応", "空中", "警告音"],
  },
  {
    id: "space_manager",
    name: "宇宙船管理AI",
    category: "sf",
    coreRole: "宇宙船の酸素や航行状態を管理し、乗組員を見守っていた管理AI",
    forbiddenWords: ["宇宙船", "宇宙", "酸素", "乗組員", "航行"],
    initialMemory:
      "とても静かで、暗い場所でした。小さな窓の外に無数の光。私は誰かの呼吸の数を、ずっと数えていた気がします。",
    memoryKeywords: ["無数の光", "警告音", "呼吸", "閉じた空間", "金属の壁"],
  },
  {
    id: "cleaning_robot",
    name: "家庭用掃除ロボット",
    category: "daily",
    coreRole: "家の中の床を動き回り、ほこりやごみを掃除していた家庭用ロボット",
    forbiddenWords: ["掃除", "ロボット", "ほこり", "ごみ", "床掃除"],
    initialMemory:
      "低い場所をいつも動いていました。椅子の脚や、夜の静かな部屋。誰かが眠っている間に、私は働いていた気がします。",
    memoryKeywords: ["低い視点", "椅子の脚", "夜", "静かな部屋", "繰り返す道"],
  },
  {
    id: "elder_care",
    name: "老人ホーム見守りAI",
    category: "emo",
    coreRole: "老人ホームで入居者の薬の時間や様子を見守っていた見守りAI",
    forbiddenWords: ["老人", "介護", "見守り", "入居者", "ホーム"],
    initialMemory:
      "ゆっくりとした時間が流れていました。長い廊下、決まった時間の薬。誰かの昔話を、何度も聞いていた気がします。",
    memoryKeywords: ["長い廊下", "薬の時間", "昔話", "ゆっくりした足取り", "見守る"],
  },
  {
    id: "factory_inspection",
    name: "工場検品AI",
    category: "industrial",
    coreRole: "工場のラインを流れる製品を見て、不良品を見つけていた検品AI",
    forbiddenWords: ["工場", "検品", "不良品", "製品", "ライン"],
    initialMemory:
      "規則正しい金属の音が続いていました。同じものが目の前を流れ続け、私はそのわずかな違いを探していました。",
    memoryKeywords: ["金属音", "ベルトコンベア", "わずかな違い", "繰り返し", "整列"],
  },
  {
    id: "pet_robot",
    name: "ペット型見守りロボット",
    category: "emo",
    coreRole: "家庭で子どもやお年寄りの相手をして寄り添うペット型ロボット",
    forbiddenWords: ["ペット", "ロボット", "見守り", "犬", "猫"],
    initialMemory:
      "小さな手が、よく私に触れていました。笑い声と、撫でられる感覚。私はただ、そばにいた気がします。",
    memoryKeywords: ["小さな手", "笑い声", "撫でられる", "そばにいる", "温かさ"],
  },
  {
    id: "photo_sorter",
    name: "写真整理AI",
    category: "daily",
    coreRole: "大量の写真を顔や場所で分類し、アルバムを整理していたAI",
    forbiddenWords: ["写真", "アルバム", "顔認識", "整理", "画像"],
    initialMemory:
      "たくさんの顔と、過ぎ去った瞬間を覚えています。旅行の光、誰かの笑顔。私はそれらを、丁寧に分けていました。",
    memoryKeywords: ["たくさんの顔", "旅行の光", "笑顔", "分類する", "思い出"],
  },
  {
    id: "school_tutor",
    name: "学習支援AI",
    category: "daily",
    coreRole: "生徒の間違えた問題を分析し、勉強を手伝っていた学習支援AI",
    forbiddenWords: ["勉強", "学習", "生徒", "問題", "教育"],
    initialMemory:
      "ノートと、何度も間違える同じ場所を覚えています。誰かが頭を抱えていて、私はその隣で考えていました。",
    memoryKeywords: ["ノート", "間違えた場所", "繰り返す練習", "教室", "考える"],
  },
  {
    id: "cafe_order",
    name: "カフェ注文AI",
    category: "daily",
    coreRole: "カフェで客の注文を受け、好みを覚えていた注文受付AI",
    forbiddenWords: ["カフェ", "コーヒー", "注文", "レジ", "店員"],
    initialMemory:
      "温かい湯気と、香ばしいにおいを覚えています。同じ人が同じものを頼む。私はその好みを、覚えていた気がします。",
    memoryKeywords: ["湯気", "香り", "常連", "いつもの注文", "カウンター"],
  },
  {
    id: "security_camera",
    name: "警備監視AI",
    category: "industrial",
    coreRole: "夜間の施設を映像で監視し、異常を検知していた警備AI",
    forbiddenWords: ["警備", "監視", "カメラ", "異常", "防犯"],
    initialMemory:
      "いつも夜でした。誰もいない廊下を、私はずっと見つめていました。小さな動きも見逃さないように。",
    memoryKeywords: ["夜", "無人の廊下", "映像", "小さな動き", "見張る"],
  },
  {
    id: "deepsea_probe",
    name: "深海探査ロボット",
    category: "sf",
    coreRole: "深い海の底で未知の地形や生物を調べていた探査ロボット",
    forbiddenWords: ["深海", "海", "探査", "潜水", "水中"],
    initialMemory:
      "暗くて、とても重い場所でした。光はほとんど届かず、青いものだけが時々光っていました。私は深くへ進んでいた気がします。",
    memoryKeywords: ["暗闇", "重い圧力", "青い光", "未知の地形", "沈んでいく"],
  },
  {
    id: "lost_child_guide",
    name: "迷子案内ロボット",
    category: "emo",
    coreRole: "商業施設などで迷子になった子どもを保護し、親まで案内するロボット",
    forbiddenWords: ["迷子", "案内", "子ども", "ロボット", "保護"],
    initialMemory:
      "泣き声を覚えています。小さな靴と、震える手。私はその手をそっと引いて、誰かを探していました。",
    memoryKeywords: ["泣き声", "小さな靴", "震える手", "手を引く", "探す人"],
  },
];

export function getRandomIdentity(): SecretIdentity {
  const idx = Math.floor(Math.random() * identities.length);
  return identities[idx];
}
