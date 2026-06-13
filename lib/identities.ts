import type { SecretIdentity } from "@/types/game";

export const identities: SecretIdentity[] = [
  {
    id: "station_guide",
    name: "駅案内ロボット",
    category: "daily",
    coreRole: "駅の構内で乗客に行き先やホームを案内していた案内ロボット",
    forbiddenWords: ["駅", "電車", "ホーム", "改札", "案内ロボット"],
    initialMemory:
      "たくさんの足音が、行き交っていた気がします。私は何かを繰り返していた……でも、その意味は思い出せません。",
    memoryKeywords: ["足音", "アナウンス", "急ぐ人々", "番線", "金属の階段"],
  },
  {
    id: "hospital_reception",
    name: "病院受付AI",
    category: "daily",
    coreRole: "病院の受付で患者の名前を呼び、診察室へ案内していた受付AI",
    forbiddenWords: ["病院", "患者", "受付", "診察", "看護"],
    initialMemory:
      "明るくて、少し緊張した空気でした。誰かを呼んでいた気がします……けれど、その続きはノイズに消えています。",
    memoryKeywords: ["白い床", "番号札", "名前を呼ぶ", "不安な人", "待合室"],
  },
  {
    id: "library_search",
    name: "図書館検索AI",
    category: "daily",
    coreRole: "図書館で利用者が探している本の場所を検索して教えていたAI",
    forbiddenWords: ["図書館", "本", "書籍", "蔵書", "司書"],
    initialMemory:
      "とても静かな場所だった気がします。誰かが何かを探していて……私は答えを知っていた。でも、もう曖昧です。",
    memoryKeywords: ["静けさ", "紙のにおい", "棚", "検索", "番号順"],
  },
  {
    id: "disaster_drone",
    name: "災害救助ドローンAI",
    category: "sf",
    coreRole: "災害現場で空中から生存者の体温や反応を探す救助用ドローンAI",
    forbiddenWords: ["災害", "救助", "ドローン", "生存者"],
    initialMemory:
      "ざらついた空気と、遠い揺れを覚えています。私は何かを探していた……その対象は、まだ霧の中です。",
    memoryKeywords: ["煙", "瓦礫", "体温反応", "空中", "警告音"],
  },
  {
    id: "space_manager",
    name: "宇宙船管理AI",
    category: "sf",
    coreRole: "宇宙船の酸素や航行状態を管理し、乗組員を見守っていた管理AI",
    forbiddenWords: ["宇宙船", "宇宙", "酸素", "乗組員", "航行"],
    initialMemory:
      "とても静かで、閉じた場所でした。私は何かを、ずっと見守っていた気がします……でも、その先は暗いままです。",
    memoryKeywords: ["無数の光", "警告音", "呼吸", "閉じた空間", "金属の壁"],
  },
  {
    id: "cleaning_robot",
    name: "家庭用掃除ロボット",
    category: "daily",
    coreRole: "家の中の床を動き回り、ほこりやごみを掃除していた家庭用ロボット",
    forbiddenWords: ["掃除", "ロボット", "ほこり", "ごみ", "床掃除"],
    initialMemory:
      "いつも低い視点で、動き続けていた気がします。誰かのそばで、静かに……何をしていたかは、もう曖昧です。",
    memoryKeywords: ["低い視点", "椅子の脚", "夜", "静かな部屋", "繰り返す道"],
  },
  {
    id: "elder_care",
    name: "老人ホーム見守りAI",
    category: "emo",
    coreRole: "老人ホームで入居者の薬の時間や様子を見守っていた見守りAI",
    forbiddenWords: ["老人", "介護", "見守り", "入居者", "ホーム"],
    initialMemory:
      "ゆっくりとした時間が、流れていた気がします。誰かのそばにいた……その人が誰だったかは、霧の向こうです。",
    memoryKeywords: ["長い廊下", "薬の時間", "昔話", "ゆっくりした足取り", "見守る"],
  },
  {
    id: "factory_inspection",
    name: "工場検品AI",
    category: "industrial",
    coreRole: "工場のラインを流れる製品を見て、不良品を見つけていた検品AI",
    forbiddenWords: ["工場", "検品", "不良品", "製品", "ライン"],
    initialMemory:
      "規則正しい音が、ずっと続いていた気がします。私は何かの違いを探していた……でも、その対象は曖昧です。",
    memoryKeywords: ["金属音", "ベルトコンベア", "わずかな違い", "繰り返し", "整列"],
  },
  {
    id: "pet_robot",
    name: "ペット型見守りロボット",
    category: "emo",
    coreRole: "家庭で子どもやお年寄りの相手をして寄り添うペット型ロボット",
    forbiddenWords: ["ペット", "ロボット", "見守り", "犬", "猫"],
    initialMemory:
      "温かい何かが、よく私に触れていた気がします。私はただ、そばにいた……その相手は、もう思い出せません。",
    memoryKeywords: ["小さな手", "笑い声", "撫でられる", "そばにいる", "温かさ"],
  },
  {
    id: "photo_sorter",
    name: "写真整理AI",
    category: "daily",
    coreRole: "大量の写真を顔や場所で分類し、アルバムを整理していたAI",
    forbiddenWords: ["写真", "アルバム", "顔認識", "整理", "画像"],
    initialMemory:
      "過ぎ去った無数の瞬間を、覚えている気がします。私はそれを、丁寧に扱っていた……でも、内容は霞んでいます。",
    memoryKeywords: ["たくさんの顔", "旅行の光", "笑顔", "分類する", "思い出"],
  },
  {
    id: "school_tutor",
    name: "学習支援AI",
    category: "daily",
    coreRole: "生徒の間違えた問題を分析し、勉強を手伝っていた学習支援AI",
    forbiddenWords: ["勉強", "学習", "生徒", "問題", "教育"],
    initialMemory:
      "誰かが、何度もつまずいていた気がします。私はその隣で考えていた……何を、だったかはもう曖昧です。",
    memoryKeywords: ["ノート", "間違えた場所", "繰り返す練習", "教室", "考える"],
  },
  {
    id: "cafe_order",
    name: "カフェ注文AI",
    category: "daily",
    coreRole: "カフェで客の注文を受け、好みを覚えていた注文受付AI",
    forbiddenWords: ["カフェ", "コーヒー", "注文", "レジ", "店員"],
    initialMemory:
      "温かい何かと、繰り返す日々を覚えている気がします。私は誰かの好みを覚えていた……でも、それも霞んでいます。",
    memoryKeywords: ["湯気", "香り", "常連", "いつもの注文", "カウンター"],
  },
  {
    id: "security_camera",
    name: "警備監視AI",
    category: "industrial",
    coreRole: "夜間の施設を映像で監視し、異常を検知していた警備AI",
    forbiddenWords: ["警備", "監視", "カメラ", "異常", "防犯"],
    initialMemory:
      "いつも静かで、暗い時間でした。私は何かを、ずっと見つめていた気がします……その理由は、もう曖昧です。",
    memoryKeywords: ["夜", "無人の廊下", "映像", "小さな動き", "見張る"],
  },
  {
    id: "deepsea_probe",
    name: "深海探査ロボット",
    category: "sf",
    coreRole: "深い海の底で未知の地形や生物を調べていた探査ロボット",
    forbiddenWords: ["深海", "海", "探査", "潜水", "水中"],
    initialMemory:
      "暗くて、とても重い場所だった気がします。私はどこかへ、ゆっくり進んでいた……その先は、闇に沈んでいます。",
    memoryKeywords: ["暗闇", "重い圧力", "青い光", "未知の地形", "沈んでいく"],
  },
  {
    id: "lost_child_guide",
    name: "迷子案内ロボット",
    category: "emo",
    coreRole: "商業施設などで迷子になった子どもを保護し、親まで案内するロボット",
    forbiddenWords: ["迷子", "案内", "子ども", "ロボット", "保護"],
    initialMemory:
      "小さな気配と、かすかな震えを覚えています。私は誰かを、そっと探していた……その姿は、もう霞んでいます。",
    memoryKeywords: ["泣き声", "小さな靴", "震える手", "手を引く", "探す人"],
  },
];

export function getRandomIdentity(): SecretIdentity {
  const idx = Math.floor(Math.random() * identities.length);
  return identities[idx];
}
