// ── 內頁資料與版型（SEO 拆頁，2026-09-22）────────────────────────────────────
// 服務頁 ×3、實績總覽＋每案一頁 ×5、地區頁 ×3。
// 文案原則：不寫順打／逆打等工法標籤（Tony 2026-09-22 指示）、大直案不做頁也不寫案名。
// 路由與 Navbar／Footer 在 index.tsx，這裡只放資料與 <SubPageBody />。

export type Block = { h: string; p?: string[]; list?: string[] }
export type Spec = { label: string; value: string }
export type SubPage = {
  path: string
  kind: 'service' | 'project' | 'area' | 'projects-index'
  title: string          // <title>
  desc: string           // meta description
  h1: string
  kicker: string         // 英文小標
  lead: string           // h1 下方導言
  ogImage: string
  ogAlt: string
  specs?: Spec[]         // 規格卡（實績用）
  blocks: Block[]
  photos?: { src: string; alt: string }[]
  cardIcon?: string      // 沒有專屬照片的案子：實績卡片用圖示底圖，不借用別案照片
  related: { label: string; href: string }[]
  keywords: string
}

const SITE = 'https://zonmo.com.tw'
const CONTACT = '/#contact'

// ───────────────────────── 服務頁 ─────────────────────────
export const SERVICES: SubPage[] = [
  {
    path: '/services/aluminum-formwork',
    kind: 'service',
    title: '鋁合金模板工程｜鋁模施工承包・北北桃｜中華鋁模',
    desc: '中華鋁模承攬鋁合金模板（鋁模）工程，提供鋁模配板規劃、現場組立、拆模週轉與品質管理，適合標準層住宅與大型量體建築。台北、新北、桃園營造廠模板分包歡迎洽詢。',
    h1: '鋁合金模板工程',
    kicker: 'ALUMINUM FORMWORK',
    lead: '鋁模不是把木模換成鋁板而已，關鍵在配板規劃與週轉節奏。中華鋁模以單案 2.4 億的鋁模施工實績，協助營造廠在標準層建案取得更穩定的進度與完成面品質。',
    ogImage: '/static/photos/work-09.jpg',
    ogAlt: '鋁合金模板牆體組立施工',
    keywords: '鋁模工程,鋁合金模板工程,鋁模施工,鋁模板廠商,鋁模板施工,鋁模承包,鋁模分包',
    blocks: [
      {
        h: '什麼案子適合用鋁模',
        p: [
          '鋁合金模板的優勢建立在「重複」上。同一套模板依標準層平面配好之後，每層樓照表組立、拆模、上翻，週轉次數越多，攤到每層的成本越低，精度也越穩定。因此標準層數多、平面重複度高的住宅大樓、社會住宅與集合住宅，是鋁模最能發揮的案型。',
          '相對地，平面變化大、樓層少或造型特殊的建築，鋁模配板的前置成本不容易回收，這類案子我們會直接建議改用傳統模板，或在標準層用鋁模、非標準層用傳統模板混合施作，讓業主用最合理的方式取得品質。',
        ],
      },
      {
        h: '中華鋁模的鋁模施工流程',
        list: [
          '配板規劃：依結構圖與建築圖進行模板配置，確認牆、柱、樑、版與樓梯的模板編號與開口位置，並與鋼筋、水電預留介面協調。',
          '進場備料：依樓層分批進料，現場建立料區與編號管理，避免組立時找料、錯板。',
          '首層試組：第一層以較長工期完成組立與校正，確認垂直度、平整度與接縫，作為後續各層的標準。',
          '標準層週轉：固定班組、固定順序，牆模、樑版模、樓梯模依節點組立與拆除，配合灌漿排程維持每層循環。',
          '品質檢查：每層拆模後檢查完成面、垂直度與尺寸，異常即時回饋調整配板或組立方式。',
          '退場整理：工程結束依編號清點、清理與退料，維持模板下一案的可用狀態。',
        ],
      },
      {
        h: '鋁模對營造廠的實際好處',
        p: [
          '完成面品質：鋁模面板平整、接縫少，拆模後牆面多數可直接進行粉刷或批土，減少後續泥作修補的工項與工期。',
          '進度可預期：每層的組立、拆模時間固定，工務容易安排鋼筋、水電與灌漿的銜接，整體結構體工期比傳統模板更容易掌握。',
          '現場整潔與安全：鋁模構件輕、無需大量木料裁切，廢料少、火災風險低，工地動線與安全管理都更單純。',
        ],
      },
      {
        h: '代表實績',
        p: [
          '台北市松山區鳴森苑住宅新建工程（業主：中華工程），鋁製模板工程合約 2 億 4,000 萬元，為民生社區大型都更案，地下 4 層，是中華鋁模單案承攬金額最高的鋁模工程。完整案例請見工程實績頁。',
        ],
      },
      {
        h: '鋁模工程常見問題',
        list: [
          '鋁模適合幾層以上的建案？一般建議標準層 10 層以上、平面重複度高的案子，週轉效益才明顯；實際仍以配板評估為準，歡迎提供圖說讓我們試算。',
          '鋁模可以只做標準層嗎？可以。地下室與非標準層用傳統模板、標準層用鋁模的混合方式相當常見，我們兩種都做，介面由同一個團隊處理。',
          '鋁模是自有還是租賃？依案量與工期評估最有利的方式，報價時會一併說明。',
          '服務範圍？以台北市、新北市、桃園市為主，其他地區依案型評估。',
        ],
      },
    ],
    photos: [
      { src: '/static/photos/work-09.jpg', alt: '鋁合金模板牆體組立施工' },
      { src: '/static/photos/work-03.jpg', alt: '鋁模板大面積牆面安裝' },
      { src: '/static/photos/work-06.jpg', alt: '天花板底模安裝作業' },
      { src: '/static/photos/work-13.jpg', alt: '鋁模板節點接合細部' },
    ],
    related: [
      { label: '傳統模板工程', href: '/services/traditional-formwork' },
      { label: '地下結構工程', href: '/services/top-down' },
      { label: '鳴森苑鋁模工程實績', href: '/projects/mingsen-aluminum-formwork' },
    ],
  },
  {
    path: '/services/traditional-formwork',
    kind: 'service',
    title: '傳統模板工程承包｜木模・系統模板施工｜中華鋁模',
    desc: '中華鋁模承攬傳統模板工程，涵蓋住宅、公共建設、滯洪池、涵洞等土木工程的模板配置與施作，依結構條件客製化，累計承攬總額逾 5.7 億。北北桃營造廠模板分包歡迎洽詢。',
    h1: '傳統模板工程',
    kicker: 'TRADITIONAL FORMWORK',
    lead: '不是每個案子都適合鋁模。造型特殊、樓層少、地下結構或土木工程，傳統模板的彈性仍然無可取代。中華鋁模自 2000 年以傳統模板起家，這是我們最深的底子。',
    ogImage: '/static/photos/work-04.jpg',
    ogAlt: '工地多人協同作業',
    keywords: '模板工程,傳統模板工程,模板工程承包,模板分包,木模工程,系統模板,模板施工',
    blocks: [
      {
        h: '傳統模板的適用案型',
        p: [
          '傳統模板以木模、鋼模或系統模板依現場條件組立，優勢在於彈性：任何尺寸、任何造型都能配合。因此建築量體不規則的公共建築、地下結構、擋土牆、滯洪池、涵洞與排水構造物，以及鋁模案中的地下室與非標準層，都是傳統模板的主場。',
          '中華鋁模的實績中，新莊廣三滯洪池、龜山涵洞排水工程與台北市公共建築模板工程，都是傳統模板施作，合約規模從數千萬到上億元。',
        ],
      },
      {
        h: '我們怎麼做傳統模板',
        list: [
          '圖說檢討：施工前依結構圖檢討模板配置、支撐系統與灌漿分區，提前發現尺寸衝突與施工困難點。',
          '支撐與安全：依樓層高度與載重配置支撐，高支撐與大跨度樑版依規定提出支撐計畫，配合監造審查。',
          '放樣與組立：牆柱位置、樑版標高由專責人員放樣，組立後逐項檢查垂直、水平與尺寸。',
          '介面協調：與鋼筋、水電、鷹架等工種銜接，協力夥伴佑昇鷹架與禾鋒鋼筋可整合配合，減少介面等待。',
          '拆模與養護：依混凝土強度與規範時程拆模，並清理、整修模板供下一區使用。',
        ],
      },
      {
        h: '傳統模板與鋁模怎麼選',
        p: [
          '簡單的判斷方式：重複度高選鋁模，變化多選傳統模板。標準層住宅大樓的地上層用鋁模、地下室用傳統模板，是最常見也最經濟的組合。中華鋁模兩種工程都做，可以在同一份報價裡把兩者一起規劃，業主不必分別找兩家廠商協調介面。',
        ],
      },
      {
        h: '代表實績',
        list: [
          '鳴森苑住宅新建工程模板工程（台北市松山區，業主中華工程），地上 21 層 SRC 結構，合約 1 億 4,000 萬元。',
          '中工雲宇宙產業園區新建工程模板工程（新北市土城，業主中華工程），地上 16 層地下 5 層，合約 2,700 萬元。',
          '廣三滯洪池工程模板工程（新北市新莊，業主中華工程），合約 2,700 萬元。',
          '涵洞／排水工程模板工程（桃園市龜山，業主萬鼎工程），合約 7,000 萬元。',
        ],
      },
    ],
    photos: [
      { src: '/static/photos/work-04.jpg', alt: '工地多人協同作業' },
      { src: '/static/photos/work-05.jpg', alt: '模板精準對位施工' },
      { src: '/static/photos/work-07.jpg', alt: '室內雷射水平校準' },
      { src: '/static/photos/work-08.jpg', alt: '模板拆卸精細操作' },
    ],
    related: [
      { label: '鋁合金模板工程', href: '/services/aluminum-formwork' },
      { label: '地下結構工程', href: '/services/top-down' },
      { label: '廣三滯洪池模板工程', href: '/projects/guangsan-detention-pond' },
    ],
  },
  {
    path: '/services/top-down',
    kind: 'service',
    title: '地下結構模板工程｜深開挖・地下 B5 施作實績｜中華鋁模',
    desc: '中華鋁模具地下 4 至 5 層深開挖模板施作實績，熟悉地下結構、鄰房緊貼與多工種交界的施工順序與安全管理，承攬台北、新北、桃園深地下模板工程。',
    h1: '地下結構模板工程',
    kicker: 'UNDERGROUND STRUCTURE',
    lead: '地下工程沒有第二次機會。空間窄、工序密、鄰房近，模板的組立順序與支撐安全直接決定整個地下室能不能如期完成。中華鋁模最深施作實績達地下 5 層。',
    ogImage: '/static/drone-poster.jpg',
    ogAlt: '雲宇宙建案施工空拍',
    keywords: '地下結構工程,深開挖模板,地下室模板工程,逆打工法,深基礎工程,地下連續壁模板',
    blocks: [
      {
        h: '深地下模板的難點',
        p: [
          '地下結構的模板工程與地上層完全不同。作業面在開挖後的坑內，空間受支撐系統與鄰房限制；地下水與軟弱地層影響作業條件；鋼筋、模板、灌漿與土方之間的順序牽一髮動全身。任何一個環節排錯，都可能讓整層工期延後數週。',
          '因此地下模板的重點不只是「把板組起來」，而是施工順序的規劃、與其他工種的介面協調，以及對支撐與開口的安全管理。這些經驗必須從實際案場累積。',
        ],
      },
      {
        h: '中華鋁模的地下工程經驗',
        list: [
          '中工雲宇宙產業園區新建工程：新北市土城，地下 5 層，土城工業區最大量體，鋼骨制震構造，為中華鋁模最深的施作實績。',
          '鳴森苑住宅新建工程：台北市松山區民生社區，地下 4 層，都會區鄰房緊貼的大型都更案，地下層採鋁合金模板施作。',
          '廣三滯洪池工程：新北市新莊，地下滯洪池構造物，大面積地下水利結構模板。',
        ],
      },
      {
        h: '我們的做法',
        list: [
          '施工順序計畫：依開挖分區與支撐系統，排定每區牆、柱、版的模板順序與灌漿分區，與土方、鋼筋、水電共同確認。',
          '支撐與安全管理：依載重與高度配置支撐，開口、臨邊依規定防護，配合監造與職安查核。',
          '多工種介面：協力夥伴佑昇鷹架可同步配合施工架與工作平台，減少地下層的等待時間。',
          '品質與尺寸：地下結構多為承重與防水關鍵部位，模板組立後逐項檢查尺寸、垂直度與止水帶位置。',
        ],
      },
      {
        h: '適合洽詢的案型',
        p: [
          '地下 3 層以上的住宅或商辦大樓、都會區鄰房緊貼的都更案、產業園區與廠辦的深基礎、滯洪池與地下水利構造物、涵洞與箱涵等土木結構。服務範圍以台北市、新北市、桃園市為主。歡迎提供地下層圖說，我們依開挖方式與支撐條件提供模板施作建議。',
        ],
      },
    ],
    photos: [
      { src: '/static/drone-poster.jpg', alt: '土城雲宇宙建案空拍' },
      { src: '/static/photos/work-01.jpg', alt: '鋁模板現場組裝作業' },
      { src: '/static/photos/work-10.jpg', alt: '鋁模板系統備料整備' },
      { src: '/static/photos/work-12.jpg', alt: '天花板鋁模板底層施工' },
    ],
    related: [
      { label: '雲宇宙產業園區實績', href: '/projects/yunyuzhou-industrial-park' },
      { label: '鳴森苑鋁模工程實績', href: '/projects/mingsen-aluminum-formwork' },
      { label: '傳統模板工程', href: '/services/traditional-formwork' },
    ],
  },
]

// ───────────────────────── 實績頁 ─────────────────────────
export const PROJECTS: SubPage[] = [
  {
    path: '/projects/mingsen-aluminum-formwork',
    kind: 'project',
    title: '鳴森苑住宅新建工程 鋁製模板工程｜台北市松山區｜中華鋁模實績',
    desc: '鳴森苑住宅新建工程鋁製模板工程，業主中華工程，台北市松山區民生社區大型都更案，地下 4 層，合約 2 億 4,000 萬元，為中華鋁模單案最高承攬的鋁合金模板工程。',
    h1: '鳴森苑住宅新建工程｜鋁製模板工程',
    kicker: 'PROJECT · MINGSEN RESIDENCE',
    lead: '民生社區百億都更案，中華鋁模承攬鋁製模板工程，合約 2 億 4,000 萬元，是公司成立以來單案承攬金額最高的工程。',
    ogImage: '/static/photos/work-09.jpg',
    ogAlt: '鳴森苑鋁合金模板牆體組立施工',
    keywords: '鳴森苑,鳴森苑 鋁模,鳴森苑 模板,民生社區 都更,中華工程 鋁模',
    specs: [
      { label: '業主', value: '中華工程' },
      { label: '地點', value: '台北市松山區' },
      { label: '規模', value: '地下 4 層' },
      { label: '工程項目', value: '鋁製模板工程' },
      { label: '合約金額', value: '2 億 4,000 萬元' },
      { label: '年度', value: '2024' },
    ],
    blocks: [
      {
        h: '案件背景',
        p: [
          '鳴森苑位於台北市松山區民生社區，基地約 3,035 坪，是近年台北市規模最大的都市更新案之一，由中華工程興建。中華鋁模承攬本案鋁製模板工程，負責鋁合金模板的配板規劃、進料、組立、拆模與週轉管理。',
          '本案地下 4 層，位於鄰房緊貼的成熟社區，施工空間與動線受限，對模板進料節奏與現場料區管理的要求很高。',
        ],
      },
      {
        h: '施工重點',
        list: [
          '大量體鋁模配板：依建築與結構圖完成全案鋁模配置，統一模板編號，減少現場找料與錯板。',
          '高精度組立：牆、柱、樑、版與樓梯模板依節點組立，每層拆模後檢查垂直度與平整度，作為下一層標準。',
          '週轉節奏管理：固定班組與組立順序，配合鋼筋與灌漿排程，維持穩定的樓層循環。',
          '介面協調：與鋼筋、水電及鷹架工種密切配合，協力夥伴佑昇鷹架同步提供施工架服務。',
        ],
      },
      {
        h: '施工實況',
        p: ['以下為鳴森苑案鋁合金模板施作現場紀錄。'],
      },
    ],
    photos: [
      { src: '/static/photos/work-01.jpg', alt: '鋁模板現場組裝作業' },
      { src: '/static/photos/work-03.jpg', alt: '鋁模板大面積牆面安裝' },
      { src: '/static/photos/work-05.jpg', alt: '模板精準對位施工' },
      { src: '/static/photos/work-06.jpg', alt: '天花板底模安裝作業' },
      { src: '/static/photos/work-07.jpg', alt: '室內雷射水平校準' },
      { src: '/static/photos/work-08.jpg', alt: '模板拆卸精細操作' },
      { src: '/static/photos/work-09.jpg', alt: '鋁合金模板牆體組立施工' },
      { src: '/static/photos/work-10.jpg', alt: '鋁模板系統備料整備' },
      { src: '/static/photos/work-12.jpg', alt: '天花板鋁模板底層施工' },
      { src: '/static/photos/work-13.jpg', alt: '鋁模板節點接合細部' },
    ],
    related: [
      { label: '鳴森苑模板工程（地上 21 層）', href: '/projects/mingsen-formwork' },
      { label: '鋁合金模板工程服務', href: '/services/aluminum-formwork' },
      { label: '台北市模板工程', href: '/areas/taipei' },
    ],
  },
  {
    path: '/projects/mingsen-formwork',
    kind: 'project',
    title: '鳴森苑住宅新建工程 模板工程（地上 21 層）｜中華鋁模實績',
    desc: '鳴森苑住宅新建工程模板工程，業主中華工程，台北市松山區，地上 21 層 SRC 結構，傳統模板客製化施工，合約 1 億 4,000 萬元。',
    h1: '鳴森苑住宅新建工程｜模板工程',
    kicker: 'PROJECT · MINGSEN RESIDENCE',
    lead: '同一個都更案的地上結構，地上 21 層 SRC 構造，以傳統模板客製化施工，合約 1 億 4,000 萬元。',
    ogImage: '/static/photos/work-04.jpg',
    ogAlt: '鳴森苑模板工程施工現場',
    keywords: '鳴森苑 模板工程,SRC 模板,松山區 模板工程,中華工程 模板',
    specs: [
      { label: '業主', value: '中華工程' },
      { label: '地點', value: '台北市松山區' },
      { label: '規模', value: '地上 21 層' },
      { label: '工程項目', value: '模板工程' },
      { label: '合約金額', value: '1 億 4,000 萬元' },
      { label: '年度', value: '2024' },
    ],
    blocks: [
      {
        h: '案件背景',
        p: [
          '鳴森苑地上結構為 21 層 SRC 鋼骨鋼筋混凝土構造，基地約 3,035 坪。SRC 結構的模板必須配合鋼骨柱樑的節點與鋼筋配置，尺寸與開口變化多，中華鋁模以傳統模板客製化施作，與鋁製模板工程由同一團隊承攬，兩項工程的介面得以統一管理。',
        ],
      },
      {
        h: '施工重點',
        list: [
          'SRC 節點模板：鋼骨柱樑交接處尺寸複雜，逐一檢討配板與支撐，確保灌漿密實與完成面。',
          '高樓層安全管理：外牆與臨邊模板作業依規定防護，配合鷹架與施工平台同步進行。',
          '與鋁模工程整合：地上標準層與其他區域的模板由同一團隊規劃，減少營造廠的介面協調成本。',
        ],
      },
    ],
    photos: [
      { src: '/static/photos/work-04.jpg', alt: '工地多人協同作業' },
      { src: '/static/photos/work-02.jpg', alt: '高空鷹架精密施工中' },
    ],
    related: [
      { label: '鳴森苑鋁製模板工程', href: '/projects/mingsen-aluminum-formwork' },
      { label: '傳統模板工程服務', href: '/services/traditional-formwork' },
      { label: '台北市模板工程', href: '/areas/taipei' },
    ],
  },
  {
    path: '/projects/yunyuzhou-industrial-park',
    kind: 'project',
    title: '中工雲宇宙產業園區新建工程 模板工程｜新北市土城 16F/B5｜中華鋁模實績',
    desc: '中工雲宇宙產業園區新建工程模板工程（二），業主中華工程，新北市土城區，地上 16 層地下 5 層，土城工業區最大量體智慧綠建築，合約 2,700 萬元。',
    h1: '中工雲宇宙產業園區新建工程｜模板工程',
    kicker: 'PROJECT · YUN YU ZHOU INDUSTRIAL PARK',
    lead: '土城工業區最大量體，16,180 坪智慧綠建築，鋼骨制震構造，地下 5 層為中華鋁模最深的施作實績。',
    ogImage: '/static/drone-poster.jpg',
    ogAlt: '土城雲宇宙建案空拍',
    keywords: '雲宇宙,中工雲宇宙,土城 產業園區,土城 模板工程,中華工程 雲宇宙',
    specs: [
      { label: '業主', value: '中華工程' },
      { label: '地點', value: '新北市土城區' },
      { label: '規模', value: '地上 16 層／地下 5 層' },
      { label: '工程項目', value: '模板工程（二）' },
      { label: '合約金額', value: '2,700 萬元' },
      { label: '年度', value: '2024' },
    ],
    blocks: [
      {
        h: '案件背景',
        p: [
          '中工雲宇宙產業園區位於新北市土城工業區，總樓地板約 16,180 坪，是土城工業區最大量體的產業園區開發案，採鋼骨制震構造並以智慧綠建築規劃。中華鋁模承攬本案模板工程（二），施作範圍涵蓋地下 5 層深基礎至地上樓層。',
        ],
      },
      {
        h: '施工重點',
        list: [
          '地下 5 層深開挖：作業面深、空間受支撐系統限制，模板順序與土方、鋼筋緊密銜接。',
          '鋼骨制震構造：鋼骨柱樑與制震構件節點多，模板配置需逐一檢討。',
          '大量體排程：依分區灌漿計畫配置模板與班組，維持整體工期。',
        ],
      },
      {
        h: '空拍紀錄',
        p: ['本案施工期間以無人機記錄工地全貌，影片請見首頁「空拍實況影片」。'],
      },
    ],
    photos: [{ src: '/static/drone-poster.jpg', alt: '雲宇宙建案施工空拍' }],
    related: [
      { label: '地下結構模板工程服務', href: '/services/top-down' },
      { label: '新北市模板工程', href: '/areas/new-taipei' },
      { label: '廣三滯洪池模板工程', href: '/projects/guangsan-detention-pond' },
    ],
  },
  {
    path: '/projects/guangsan-detention-pond',
    kind: 'project',
    title: '廣三滯洪池工程 模板工程｜新北市新莊｜中華鋁模實績',
    desc: '廣三滯洪池工程模板工程，業主中華工程，新北市新莊區，地下滯洪池水利構造物，合約 2,700 萬元。中華鋁模承攬公共建設與水利工程模板。',
    h1: '廣三滯洪池工程｜模板工程',
    kicker: 'PROJECT · GUANGSAN DETENTION POND',
    lead: '地下滯洪池屬大面積水利構造物，模板尺寸精度與止水細節直接影響結構防水，合約 2,700 萬元。',
    ogImage: '/static/logo.png',
    ogAlt: '中華鋁模有限公司',
    cardIcon: 'fas fa-water',
    keywords: '滯洪池 模板,水利工程 模板,新莊 模板工程,公共工程 模板承包',
    specs: [
      { label: '業主', value: '中華工程' },
      { label: '地點', value: '新北市新莊區' },
      { label: '規模', value: '地下滯洪池' },
      { label: '工程項目', value: '模板工程' },
      { label: '合約金額', value: '2,700 萬元' },
      { label: '年度', value: '2023' },
    ],
    blocks: [
      {
        h: '案件背景',
        p: [
          '廣三滯洪池為新北市新莊區的公共水利設施，用於調節區域排水、降低淹水風險。滯洪池屬地下大面積鋼筋混凝土構造物，池壁、底版與頂版的模板面積大、灌漿分區多，且結構本身兼具防水功能，模板尺寸與止水帶位置的精度要求高於一般建築。',
        ],
      },
      {
        h: '施工重點',
        list: [
          '大面積池壁模板：依灌漿分區配置模板與支撐，控制施工縫位置與止水帶安裝。',
          '地下作業安全：開挖坑內作業，配合支撐系統與排水管理。',
          '公共工程品質：依公共工程施工規範進行模板檢查與監造查驗。',
        ],
      },
    ],
    related: [
      { label: '傳統模板工程服務', href: '/services/traditional-formwork' },
      { label: '龜山涵洞排水工程', href: '/projects/guishan-culvert' },
      { label: '新北市模板工程', href: '/areas/new-taipei' },
    ],
  },
  {
    path: '/projects/guishan-culvert',
    kind: 'project',
    title: '涵洞／排水工程 模板工程｜桃園市龜山｜中華鋁模實績',
    desc: '桃園市龜山區涵洞／排水工程模板工程，業主萬鼎工程，土木基礎工程，合約 7,000 萬元。中華鋁模承攬桃園土木與公共工程模板。',
    h1: '涵洞／排水工程｜模板工程',
    kicker: 'PROJECT · GUISHAN CULVERT',
    lead: '桃園龜山的涵洞與排水構造物模板工程，業主萬鼎工程，合約 7,000 萬元，是中華鋁模在桃園地區的代表土木實績。',
    ogImage: '/static/logo.png',
    ogAlt: '中華鋁模有限公司',
    cardIcon: 'fas fa-road',
    keywords: '涵洞 模板,箱涵 模板工程,排水工程 模板,桃園 模板工程,龜山 模板',
    specs: [
      { label: '業主', value: '萬鼎工程' },
      { label: '地點', value: '桃園市龜山區' },
      { label: '規模', value: '涵洞工程' },
      { label: '工程項目', value: '模板工程' },
      { label: '合約金額', value: '7,000 萬元' },
      { label: '年度', value: '2023' },
    ],
    blocks: [
      {
        h: '案件背景',
        p: [
          '本案為桃園市龜山區的涵洞與排水工程，屬土木基礎建設。涵洞、箱涵與排水構造物為長線型鋼筋混凝土結構，模板以分段循環方式施作，每段的尺寸一致性與接縫處理決定整體品質與工期。',
        ],
      },
      {
        h: '施工重點',
        list: [
          '分段循環施工：依設計分段配置模板，組立、灌漿、拆模循環使用，提升週轉效率。',
          '土木結構精度：涵洞內壁尺寸與坡度依設計控制，確保排水功能。',
          '現場條件配合：土木工地地形與交通條件變化大，模板進料與作業動線依現場調整。',
        ],
      },
    ],
    related: [
      { label: '桃園市模板工程', href: '/areas/taoyuan' },
      { label: '傳統模板工程服務', href: '/services/traditional-formwork' },
      { label: '廣三滯洪池模板工程', href: '/projects/guangsan-detention-pond' },
    ],
  },
]

// 實績總覽頁（表格由 index.tsx 的 projectRecords 渲染，這裡只給文案）
export const PROJECTS_INDEX: SubPage = {
  path: '/projects',
  kind: 'projects-index',
  title: '工程實績｜鋁模・模板工程案例 累計承攬逾 5.7 億｜中華鋁模',
  desc: '中華鋁模工程實績：鳴森苑鋁製模板 2.4 億、中工雲宇宙產業園區、廣三滯洪池、龜山涵洞排水工程等，涵蓋住宅、產業園區、公共建設與土木工程，累計承攬總額逾 5.7 億元。',
  h1: '工程實績',
  kicker: 'PROJECT PORTFOLIO',
  lead: '六項代表工程，累計承攬總額逾 5.7 億元，單案最高 2.4 億元，最深施作至地下 5 層。以下為各案詳細介紹。',
  ogImage: '/static/og-image.jpg',
  ogAlt: '中華鋁模工程實績',
  keywords: '鋁模工程實績,模板工程案例,模板工程實績,中華鋁模 實績',
  blocks: [],
  related: [
    { label: '鋁合金模板工程', href: '/services/aluminum-formwork' },
    { label: '傳統模板工程', href: '/services/traditional-formwork' },
    { label: '地下結構模板工程', href: '/services/top-down' },
  ],
}

// ───────────────────────── 地區頁 ─────────────────────────
export const AREAS: SubPage[] = [
  {
    path: '/areas/taipei',
    kind: 'area',
    title: '台北市模板工程・鋁模工程承包｜中華鋁模',
    desc: '中華鋁模承攬台北市鋁合金模板與傳統模板工程，代表實績為松山區鳴森苑都更案（鋁模 2.4 億、模板 1.4 億）。都會區鄰房緊貼、深地下案型經驗豐富，營造廠模板分包歡迎洽詢。',
    h1: '台北市模板工程',
    kicker: 'SERVICE AREA · TAIPEI',
    lead: '台北市的案子多是都更與改建，基地小、鄰房近、地下層深。中華鋁模在松山區鳴森苑一案累積了都會區大型都更的鋁模與模板施工經驗。',
    ogImage: '/static/photos/work-09.jpg',
    ogAlt: '台北市鳴森苑鋁模施工',
    keywords: '台北 模板工程,台北市 鋁模,台北 模板承包,都更 模板工程,松山區 模板',
    blocks: [
      {
        h: '台北市案型特色',
        p: [
          '台北市新建工程以都市更新、危老重建為主，共同特徵是基地緊鄰既有建物、施工動線受限、地下層數多。模板工程在這類案場的重點是進料節奏、料區管理與地下層的施工順序，這正是中華鋁模在鳴森苑案磨出來的能力。',
        ],
      },
      {
        h: '台北市代表實績',
        list: [
          '鳴森苑住宅新建工程 鋁製模板工程（松山區，業主中華工程）：地下 4 層，合約 2 億 4,000 萬元。',
          '鳴森苑住宅新建工程 模板工程（松山區，業主中華工程）：地上 21 層 SRC 結構，合約 1 億 4,000 萬元。',
          '台北市公共建築模板工程（業主宏昇營造）：合約 5,500 萬元。',
        ],
      },
      {
        h: '可承攬項目',
        list: [
          '鋁合金模板工程：標準層住宅、社會住宅、集合住宅。',
          '傳統模板工程：公共建築、商辦、特殊造型結構。',
          '地下結構模板：深開挖、鄰房緊貼的地下室。',
        ],
      },
    ],
    related: [
      { label: '鳴森苑鋁模工程實績', href: '/projects/mingsen-aluminum-formwork' },
      { label: '新北市模板工程', href: '/areas/new-taipei' },
      { label: '桃園市模板工程', href: '/areas/taoyuan' },
    ],
  },
  {
    path: '/areas/new-taipei',
    kind: 'area',
    title: '新北市模板工程・鋁模工程承包｜中華鋁模',
    desc: '中華鋁模公司位於新北市汐止，承攬新北市鋁合金模板、傳統模板與地下結構工程，實績包括土城中工雲宇宙產業園區（16F/B5）與新莊廣三滯洪池。營造廠模板分包歡迎洽詢。',
    h1: '新北市模板工程',
    kicker: 'SERVICE AREA · NEW TAIPEI',
    lead: '中華鋁模設籍新北市汐止區，新北是我們的主場。從土城工業區的產業園區到新莊的滯洪池，住宅、廠辦與公共工程的模板都有實績。',
    ogImage: '/static/drone-poster.jpg',
    ogAlt: '新北市土城雲宇宙建案空拍',
    keywords: '新北 模板工程,新北市 鋁模,汐止 模板,土城 模板工程,新莊 模板工程,廠辦 模板',
    blocks: [
      {
        h: '新北市案型特色',
        p: [
          '新北市的新建工程類型最廣：工業區的廠辦與產業園區、重劃區的住宅大樓、河川沿線的水利設施。中華鋁模在土城承攬了工業區最大量體的產業園區模板工程，在新莊承攬了滯洪池水利構造物，對廠辦大量體與公共工程的模板都有實際經驗。',
        ],
      },
      {
        h: '新北市代表實績',
        list: [
          '中工雲宇宙產業園區新建工程 模板工程（土城區，業主中華工程）：地上 16 層地下 5 層，合約 2,700 萬元。',
          '廣三滯洪池工程 模板工程（新莊區，業主中華工程）：地下滯洪池，合約 2,700 萬元。',
        ],
      },
      {
        h: '可承攬項目',
        list: [
          '鋁合金模板工程：重劃區住宅大樓、社會住宅。',
          '傳統模板工程：廠辦、產業園區、公共建築。',
          '地下結構與水利工程模板：深基礎、滯洪池、涵洞。',
        ],
      },
    ],
    related: [
      { label: '雲宇宙產業園區實績', href: '/projects/yunyuzhou-industrial-park' },
      { label: '台北市模板工程', href: '/areas/taipei' },
      { label: '桃園市模板工程', href: '/areas/taoyuan' },
    ],
  },
  {
    path: '/areas/taoyuan',
    kind: 'area',
    title: '桃園市模板工程・鋁模工程承包｜中華鋁模',
    desc: '中華鋁模承攬桃園市鋁合金模板、傳統模板與土木工程模板，代表實績為龜山涵洞／排水工程（合約 7,000 萬元）。桃園重劃區住宅與土木公共工程模板分包歡迎洽詢。',
    h1: '桃園市模板工程',
    kicker: 'SERVICE AREA · TAOYUAN',
    lead: '桃園是北台灣新建案量最大的地區之一，重劃區住宅與土木公共工程並進。中華鋁模在龜山承攬 7,000 萬元的涵洞排水工程，土木模板經驗可直接對應桃園案型。',
    ogImage: '/static/logo.png',
    ogAlt: '中華鋁模有限公司',
    keywords: '桃園 模板工程,桃園市 鋁模,桃園 模板承包,龜山 模板,重劃區 鋁模',
    blocks: [
      {
        h: '桃園市案型特色',
        p: [
          '桃園的新建工程以重劃區集合住宅、廠房與土木公共工程為主。重劃區住宅標準層多、平面重複度高，是鋁合金模板最能發揮的案型；土木工程則需要傳統模板的分段循環施工經驗。中華鋁模兩者都能承攬。',
        ],
      },
      {
        h: '桃園市代表實績',
        list: [
          '涵洞／排水工程 模板工程（龜山區，業主萬鼎工程）：土木基礎工程，合約 7,000 萬元。',
        ],
      },
      {
        h: '可承攬項目',
        list: [
          '鋁合金模板工程：重劃區住宅大樓。',
          '傳統模板工程：廠房、公共建築。',
          '土木工程模板：涵洞、箱涵、排水與擋土構造物。',
        ],
      },
    ],
    related: [
      { label: '龜山涵洞排水工程實績', href: '/projects/guishan-culvert' },
      { label: '鋁合金模板工程', href: '/services/aluminum-formwork' },
      { label: '新北市模板工程', href: '/areas/new-taipei' },
    ],
  },
]

export const ALL_SUBPAGES: SubPage[] = [...SERVICES, PROJECTS_INDEX, ...PROJECTS, ...AREAS]

export function sitemapXml(): string {
  const today = '2026-09-22'
  const urls = [{ loc: SITE + '/', pri: '1.0' }, ...ALL_SUBPAGES.map(p => ({ loc: SITE + p.path, pri: p.kind === 'project' ? '0.7' : '0.8' }))]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.pri}</priority>
  </url>`).join('\n')}
</urlset>
`
}

// ───────────────────────── 版型 ─────────────────────────
const crumbs = (p: SubPage) => {
  const mid =
    p.kind === 'service' ? { label: '服務項目', href: '/#services' } :
    p.kind === 'project' ? { label: '工程實績', href: '/projects' } :
    p.kind === 'area' ? { label: '服務地區', href: '/#contact' } : null
  return [{ label: '首頁', href: '/' }, ...(mid ? [mid] : []), { label: p.h1, href: p.path }]
}

export function breadcrumbJsonLd(p: SubPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs(p).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: SITE + c.href })),
  }
}

export function pageJsonLd(p: SubPage) {
  const org = { '@type': 'Organization', name: '中華鋁模有限公司', url: SITE, telephone: '+886-920-880-654' }
  if (p.kind === 'service') {
    return { '@context': 'https://schema.org', '@type': 'Service', name: p.h1, description: p.desc, provider: org, areaServed: ['台北市', '新北市', '桃園市'], url: SITE + p.path }
  }
  if (p.kind === 'area') {
    return { '@context': 'https://schema.org', '@type': 'Service', name: p.h1, description: p.desc, provider: org, areaServed: p.h1.replace('模板工程', ''), url: SITE + p.path }
  }
  return { '@context': 'https://schema.org', '@type': 'Article', headline: p.h1, description: p.desc, image: SITE + p.ogImage, author: org, publisher: org, mainEntityOfPage: SITE + p.path }
}

export const SubPageBody = ({ page, children }: { page: SubPage; children?: any }) => (
  <main class="subpage">
    <header class="sub-hero">
      <div class="container">
        <nav class="crumbs" aria-label="breadcrumb">
          {crumbs(page).map((c, i, arr) => (
            <>
              {i < arr.length - 1 ? <a href={c.href}>{c.label}</a> : <span>{c.label}</span>}
              {i < arr.length - 1 && <i class="fas fa-chevron-right"></i>}
            </>
          ))}
        </nav>
        <span class="section-label">{page.kicker}</span>
        <h1 class="sub-title">{page.h1}</h1>
        <p class="sub-lead">{page.lead}</p>
        <div class="sub-hero-actions">
          <a href={CONTACT} class="btn-primary"><i class="fas fa-phone"></i>立即洽詢</a>
          <a href="tel:0920880654" class="btn-outline"><i class="fas fa-mobile-alt"></i>0920-880-654</a>
        </div>
      </div>
    </header>

    <section class="sub-body">
      <div class="container sub-grid">
        <article class="sub-article">
          {page.specs && (
            <dl class="spec-grid">
              {page.specs.map(s => (
                <div class="spec-item"><dt>{s.label}</dt><dd>{s.value}</dd></div>
              ))}
            </dl>
          )}
          {page.blocks.map(b => (
            <section class="sub-block">
              <h2>{b.h}</h2>
              {b.p && b.p.map(t => <p>{t}</p>)}
              {b.list && <ul>{b.list.map(t => <li>{t}</li>)}</ul>}
            </section>
          ))}
          {children}
          {page.photos && page.photos.length > 0 && (
            <div class="sub-photos">
              {page.photos.map(ph => (
                <figure><img src={ph.src} alt={ph.alt} loading="lazy" /><figcaption>{ph.alt}</figcaption></figure>
              ))}
            </div>
          )}
        </article>

        <aside class="sub-aside">
          <div class="aside-card aside-cta">
            <h3>工程洽詢</h3>
            <p>提供圖說或案件概況，我們依案型評估鋁模或傳統模板的施作方式並報價。</p>
            <a href="tel:0920880654" class="aside-phone"><i class="fas fa-phone"></i> 0920-880-654</a>
            <small>王先生｜中華鋁模有限公司</small>
            <a href={CONTACT} class="btn-primary aside-btn">填寫詢價表單</a>
          </div>
          <div class="aside-card">
            <h3>相關頁面</h3>
            <ul class="aside-links">
              {page.related.map(r => <li><a href={r.href}><i class="fas fa-chevron-right"></i> {r.label}</a></li>)}
            </ul>
          </div>
          <div class="aside-card">
            <h3>服務項目</h3>
            <ul class="aside-links">
              {SERVICES.map(s => <li><a href={s.path}><i class="fas fa-chevron-right"></i> {s.h1}</a></li>)}
              <li><a href="/projects"><i class="fas fa-chevron-right"></i> 工程實績</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <section class="sub-cta">
      <div class="container">
        <h2>有模板工程要發包？</h2>
        <p>台北、新北、桃園營造廠歡迎洽詢，提供鋁合金模板、傳統模板與地下結構模板施作評估。</p>
        <div class="sub-hero-actions">
          <a href={CONTACT} class="btn-primary"><i class="fas fa-paper-plane"></i>線上詢價</a>
          <a href="tel:0920880654" class="btn-outline"><i class="fas fa-phone"></i>撥打 0920-880-654</a>
        </div>
      </div>
    </section>
  </main>
)

// 實績總覽頁的案例卡片
export const ProjectCards = () => (
  <div class="project-cards">
    {PROJECTS.map(p => (
      <a href={p.path} class="project-card">
        {p.cardIcon
          ? <div class="project-card-placeholder"><i class={p.cardIcon}></i><span>{p.specs?.find(s => s.label === '規模')?.value}</span></div>
          : <img src={p.ogImage} alt={p.ogAlt} loading="lazy" />}
        <div class="project-card-body">
          <span class="section-label">{p.specs?.find(s => s.label === '地點')?.value}</span>
          <h3>{p.h1}</h3>
          <p>{p.lead}</p>
          <div class="project-card-meta">
            <span><i class="fas fa-building"></i> {p.specs?.find(s => s.label === '業主')?.value}</span>
            <span><i class="fas fa-file-contract"></i> {p.specs?.find(s => s.label === '合約金額')?.value}</span>
          </div>
        </div>
      </a>
    ))}
  </div>
)
