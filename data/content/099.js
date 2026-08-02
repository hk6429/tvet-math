window.MATH_CONTENT = window.MATH_CONTENT || {};
(() => {
  Object.assign(window.MATH_CONTENT, {
    "99A-1": { verified: true, sourcePage: 2,
      stem: String.raw`將 4 名保全人員分成早班與晚班兩組去巡邏，每 2 人一組，則共有多少種分組方式？`,
      options: { "A": String.raw`2`, "B": String.raw`4`, "C": String.raw`6`, "D": String.raw`8` } },

    "99A-2": { verified: true, sourcePage: 2,
      stem: String.raw`有一組數字為 13、17、17、12、18、13、17、12，則其眾數與中位數之和為何？`,
      options: { "A": String.raw`17`, "B": String.raw`18`, "C": String.raw`30`, "D": String.raw`32` } },

    "99A-3": { verified: true, sourcePage: 2,
      stem: String.raw`有一組數字為 76、55、67、74、88、58、63、52、60，則這組數字的全距為何？`,
      options: { "A": String.raw`16`, "B": String.raw`36`, "C": String.raw`52`, "D": String.raw`88` } },

    "99A-4": { verified: true, sourcePage: 2,
      stem: String.raw`已知 \( A(1,0) \)、\( B(2,1) \)、\( C(0,1) \) 三點。若 \( \theta_1 \) 為直線 \( \overleftrightarrow{AB} \) 的斜角，且 \( \theta_2 \) 為直線 \( \overleftrightarrow{AC} \) 的斜角，則下列敘述何者正確？`,
      options: {
        "A": String.raw`\( \theta_1 > 90^\circ \)`,
        "B": String.raw`\( \theta_2 < 90^\circ \)`,
        "C": String.raw`\( \theta_2 - \theta_1 = 90^\circ \)`,
        "D": String.raw`\( \theta_1 - \theta_2 = 90^\circ \)` } },

    "99A-5": { verified: true, sourcePage: 2,
      stem: String.raw`已知直線 \( L_1 : y = m_1 x + b_1 \) 及直線 \( L_2 : y = m_2 x + b_2 \)，如圖(一)所示，則下列敘述何者正確？`,
      options: {
        "A": String.raw`\( m_1 < 0 \) 且 \( b_1 > 0 \)`,
        "B": String.raw`\( m_1 > 0 \) 且 \( b_1 < 0 \)`,
        "C": String.raw`\( m_2 < 0 \) 且 \( b_2 > 0 \)`,
        "D": String.raw`\( m_2 > 0 \) 且 \( b_2 < 0 \)` } },

    "99A-6": { verified: true, sourcePage: 2,
      stem: String.raw`求 \( \log 28 + \log 25 - \log 7 = ? \)`,
      options: { "A": String.raw`2`, "B": String.raw`3`, "C": String.raw`46`, "D": String.raw`60` } },

    "99A-7": { verified: true, sourcePage: 2,
      stem: String.raw`設 \( \log 2 = 0.3010 \)，\( \log 3 = 0.4771 \)，則 \( \log 180 \) 與下列何者的值最接近？`,
      options: { "A": String.raw`1.8`, "B": String.raw`2.3`, "C": String.raw`2.5`, "D": String.raw`3.4` } },

    "99A-8": { verified: true, sourcePage: 2,
      stem: String.raw`有一扇形的花園，其半徑為 12 公尺，圓心角為 \( \dfrac{2\pi}{3} \)，則此花園面積為多少平方公尺？`,
      options: {
        "A": String.raw`\( 24 \)`,
        "B": String.raw`\( 48 \)`,
        "C": String.raw`\( 24\pi \)`,
        "D": String.raw`\( 48\pi \)` } },

    "99A-9": { verified: true, sourcePage: 2,
      stem: String.raw`擲一公正骰子 2 次，若第 1 次及第 2 次所擲點數分別為 \( a \)、\( b \)，則 \( b - a \geq 3 \) 之機率為何？`,
      options: {
        "A": String.raw`\( \dfrac{1}{2} \)`,
        "B": String.raw`\( \dfrac{1}{6} \)`,
        "C": String.raw`\( \dfrac{1}{8} \)`,
        "D": String.raw`\( \dfrac{1}{12} \)` } },

    "99A-10": { verified: true, sourcePage: 2,
      stem: String.raw`某速食店之飲料區提供 4 種飲料。現有甲、乙、丙 3 人拿杯子到飲料區裝盛飲料，每人可任意選擇一種飲料，3 人的飲料可相同或不同，則 3 人裝盛的結果有多少種可能？`,
      options: { "A": String.raw`64`, "B": String.raw`27`, "C": String.raw`12`, "D": String.raw`7` } },

    "99A-11": { verified: true, sourcePage: 3,
      stem: String.raw`小明段考的國文、英文、數學、社會、自然之成績分別為 81、72、68、84、78。若各科之權數分別為 4、3、3、1、1，則小明之加權平均分數為何？`,
      options: { "A": String.raw`73.8`, "B": String.raw`74`, "C": String.raw`75.5`, "D": String.raw`76.5` } },

    "99A-12": { verified: true, sourcePage: 3,
      stem: String.raw`從 2、4、6 三個數字中抽取一數。若抽中 2、4、6 之機率分別為 0.2、0.3、0.5，則抽取一次所得數值之期望值為何？`,
      options: { "A": String.raw`2.8`, "B": String.raw`3`, "C": String.raw`4.2`, "D": String.raw`4.6` } },

    "99A-13": { verified: true, sourcePage: 3,
      stem: String.raw`已知直線 \( L : 3x - 4y - 12 = 0 \) 及 \( A(0,0) \)、\( B(6,-3) \) 兩點。若 \( d_1 \) 為點 \( A \) 到直線 \( L \) 的距離，\( d_2 \) 為點 \( B \) 到直線 \( L \) 的距離，則下列何者正確？`,
      options: {
        "A": String.raw`\( d_1 = \dfrac{13}{5} \)`,
        "B": String.raw`\( d_1 > \dfrac{13}{5} \)`,
        "C": String.raw`\( d_2 = \dfrac{18}{5} \)`,
        "D": String.raw`\( d_2 < \dfrac{18}{5} \)` } },

    "99A-14": { verified: true, sourcePage: 3,
      stem: String.raw`設區域 \( R \) 是聯立不等式 \( \begin{cases} 0 \leq x \leq 4 \\ 0 \leq y \leq 2 \\ x + 2y - 4 \leq 0 \\ 2x + y - 4 \leq 0 \end{cases} \) 所形成的可行解區域，則下列何者不是區域 \( R \) 的頂點坐標？`,
      options: {
        "A": String.raw`\( (4,0) \)`,
        "B": String.raw`\( (2,0) \)`,
        "C": String.raw`\( (0,2) \)`,
        "D": String.raw`\( (\dfrac{4}{3}, \dfrac{4}{3}) \)` } },

    "99A-15": { verified: true, sourcePage: 3,
      stem: String.raw`設 \( f(x) = x^2 + 2x + 2 \) 整除 \( g(x) = 2x^3 + 3x^2 + ax + b \)，則 \( 2a + b = ? \)`,
      options: { "A": String.raw`0`, "B": String.raw`2`, "C": String.raw`4`, "D": String.raw`6` } },

    "99A-16": { verified: true, sourcePage: 3,
      stem: String.raw`設 \( x - a \) 能同時整除 \( 2x^2 - 5x - 3 \) 和 \( 4x^2 + 8x + 3 \)，則下列何者正確？`,
      options: {
        "A": String.raw`\( -2 < a \leq -1 \)`,
        "B": String.raw`\( -1 < a \leq 0 \)`,
        "C": String.raw`\( 0 < a \leq 1 \)`,
        "D": String.raw`\( 1 < a \leq 2 \)` } },

    "99A-17": { verified: true, sourcePage: 3,
      stem: String.raw`設 \( 4^{x+1} = 8 \)，\( 3^{y-1} = 9 \)，則 \( 2x + y = ? \)`,
      options: { "A": String.raw`1`, "B": String.raw`2`, "C": String.raw`3`, "D": String.raw`4` } },

    "99A-18": { verified: true, sourcePage: 3,
      stem: String.raw`設 \( A(-1,-3) \) 與 \( B(6,4) \) 為坐標平面上之兩點。若點 \( C \) 在線段 \( \overline{AB} \) 上，且 \( 4\overline{AC} = 3\overline{BC} \)，則 \( \overline{BC} = ? \)`,
      options: {
        "A": String.raw`\( \sqrt{2} \)`,
        "B": String.raw`\( 3\sqrt{2} \)`,
        "C": String.raw`\( 4\sqrt{2} \)`,
        "D": String.raw`\( 5\sqrt{2} \)` } },

    "99A-19": { verified: true, sourcePage: 3,
      stem: String.raw`求 \( (\cos 30^\circ + \sin 30^\circ)(\cos 30^\circ - \sin 30^\circ) = ? \)`,
      options: {
        "A": String.raw`\( \dfrac{1}{2} \)`,
        "B": String.raw`\( \dfrac{\sqrt{2}}{2} \)`,
        "C": String.raw`\( \dfrac{\sqrt{3}}{2} \)`,
        "D": String.raw`\( 1 \)` } },

    "99A-20": { verified: true, sourcePage: 3,
      stem: String.raw`設 \( \cot\theta = 1 \)，則 \( \sin\theta\cos\theta = ? \)`,
      options: {
        "A": String.raw`\( \dfrac{1}{2} \)`,
        "B": String.raw`\( \dfrac{\sqrt{2}}{2} \)`,
        "C": String.raw`\( \dfrac{\sqrt{3}}{2} \)`,
        "D": String.raw`\( 1 \)` } },

    "99A-21": { verified: true, sourcePage: 3,
      stem: String.raw`已知圓 \( C_1 : x^2 + y^2 - 2x + 2y = 2 \) 及圓 \( C_2 : x^2 + y^2 - 4y = 5 \)，則此兩圓圓心之間的距離為何？`,
      options: {
        "A": String.raw`\( \sqrt{10} \)`,
        "B": String.raw`\( 4 \)`,
        "C": String.raw`\( \sqrt{22} \)`,
        "D": String.raw`\( 5 \)` } },

    "99A-22": { verified: true, sourcePage: 4,
      stem: String.raw`已知圓 \( C : x^2 + 2x + y^2 - 3 = 0 \) 及直線 \( L : x + y = 2 \)，則圓 \( C \) 之圓心到直線 \( L \) 之距離為何？`,
      options: {
        "A": String.raw`\( \dfrac{\sqrt{3}}{2} \)`,
        "B": String.raw`\( \dfrac{3}{\sqrt{2}} \)`,
        "C": String.raw`\( \sqrt{6} \)`,
        "D": String.raw`\( 2\sqrt{2} \)` } },

    "99A-23": { verified: true, sourcePage: 4,
      stem: String.raw`設以 \( x - 1 \) 和 \( x - 2 \) 分別除 \( x^2 + ax + b \) 的餘數相同，而以 \( x - 3 \) 除 \( x^2 + ax + b \) 的餘數為 5，則 \( a + b = ? \)`,
      options: { "A": String.raw`\( -1 \)`, "B": String.raw`0`, "C": String.raw`1`, "D": String.raw`2` } },

    "99A-24": { verified: true, sourcePage: 4,
      stem: String.raw`設直角 \( \triangle ABC \)，\( \angle C = 90^\circ \)。若 \( \tan A = \dfrac{n}{m} \)，其中 \( m > 0 \)，\( n > 0 \)，則下列何者正確？`,
      options: {
        "A": String.raw`\( \cot A = -\dfrac{n}{m} \)`,
        "B": String.raw`\( \cos A = \dfrac{n}{m^2 + n^2} \)`,
        "C": String.raw`\( \sin A = \dfrac{n}{m^2 + n^2} \)`,
        "D": String.raw`\( \sec A = \dfrac{\sqrt{m^2 + n^2}}{m} \)` } },

    "99A-25": { verified: true, sourcePage: 4,
      stem: String.raw`設 \( \sin\theta \)，\( \cos\theta \) 為 \( 2x^2 - 2\sqrt{2}x + 1 = 0 \) 的兩根，則 \( \sin 2\theta = ? \)`,
      options: {
        "A": String.raw`\( -1 \)`,
        "B": String.raw`\( -\dfrac{1}{\sqrt{2}} \)`,
        "C": String.raw`\( 1 \)`,
        "D": String.raw`\( 2 \)` } }
  });
})();
window.MATH_CONTENT = window.MATH_CONTENT || {};

(() => {
  Object.assign(window.MATH_CONTENT, {
    "99B-1": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`設 \(3x^4+2x^2+1=(a+1)x^4+(b-1)x^3+(c+1)x^2+(d-3)x+(e+4)\)，則 \(a+b+c+d+e=\)？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    },
    "99B-2": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`已知平面上三點 \(A(2,1)\)，\(B(1,3)\) 及 \(C(4,k)\)，若線段 \(\overline{AB}\) 及 \(\overline{AC}\) 垂直，則 \(k=\)？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    },
    "99B-3": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`設集合 \(A=\{a,b,c,d\}\)，集合 \(B=\{x,y,z\}\)。若集合 \(A\) 之子集合個數有 \(p\) 個，集合 \(B\) 之子集合個數有 \(q\) 個，則 \(p-q=\)？`,
      options: {
        "A": "2",
        "B": "4",
        "C": "6",
        "D": "8"
      }
    },
    "99B-4": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`求 \(\displaystyle\sum_{k=1}^{30}(3k-2)=\)？`,
      options: {
        "A": "1320",
        "B": "1325",
        "C": "1330",
        "D": "1335"
      }
    },
    "99B-5": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`設 \(m,n\) 為正奇數，則 \((\sin m\pi)^2+(\cos\dfrac{n\pi}{2})^2=\)？`,
      options: {
        "A": "0",
        "B": "1",
        "C": "2",
        "D": "3"
      }
    },
    "99B-6": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`設 \(A(-1,2)\)，\(B(2,6)\) 為坐標平面上兩點，且 \(C\) 為線段 \(\overline{AB}\) 上一點，使得 \(2\overline{AC}=3\overline{BC}\)。求 \(A\) 與 \(C\) 兩點間之距離為何？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    },
    "99B-7": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`若點 \(A(\sec\theta,\tan\theta)\) 在第四象限內，則角度 \(\theta\) 為第幾象限角？`,
      options: {
        "A": "一",
        "B": "二",
        "C": "三",
        "D": "四"
      }
    },
    "99B-8": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`設 \(0<\theta<\pi\)，若 \(\sin\theta+\cos\theta=\sqrt{2}\)，則 \(\dfrac{1}{\sin\theta}+\dfrac{1}{\cos\theta}=\)？`,
      options: {
        "A": String.raw`\(\sqrt{2}\)`,
        "B": String.raw`\(2\sqrt{2}\)`,
        "C": String.raw`\(3\sqrt{2}\)`,
        "D": String.raw`\(4\sqrt{2}\)`
      }
    },
    "99B-9": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`若 \(\triangle ABC\) 中，\(\sin A:\sin B:\sin C=1:\sqrt{3}:2\)，則 \(\sin A+\cos B+\sin C=\)？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    },
    "99B-10": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`若 \(\triangle ABC\) 中，\(\overline{BC}=6\)，\(\overline{AC}=2\sqrt{3}\)，且 \(\angle A=60^{\circ}\)，則 \(\triangle ABC\) 之面積為何？`,
      options: {
        "A": String.raw`\(2\sqrt{3}\)`,
        "B": String.raw`\(4\sqrt{3}\)`,
        "C": String.raw`\(6\sqrt{3}\)`,
        "D": String.raw`\(8\sqrt{3}\)`
      }
    },
    "99B-11": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`設 \(f(x)\) 為 \(x\) 之多項式，且 \(f(x)\) 除以 \((x-1)^2\) 之餘式為 \(x+1\)，則 \(f(x)\) 除以 \(x-1\) 之餘式為何？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    },
    "99B-12": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`已知 \(x\geq 0\)，\(y\geq 0\) 且 \(2x+y\geq 20\)，求 \(x+y+6\) 之最小值為何？`,
      options: {
        "A": "16",
        "B": "17",
        "C": "18",
        "D": "19"
      }
    },
    "99B-13": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`已知直線 \(L_1:3x-4y-3=0\)，\(L_2:2x-3y-13=0\)，\(L_3:x+y+1=0\)，求 \(L_2\) 和 \(L_3\) 之交點到直線 \(L_1\) 之距離為何？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    },
    "99B-14": {
      verified: true,
      sourcePage: 2,
      stem: String.raw`解方程式 \(16^{x}-4^{x}-2=0\)，則 \(x=\)？`,
      options: {
        "A": String.raw`\(\dfrac{1}{8}\)`,
        "B": String.raw`\(\dfrac{1}{4}\)`,
        "C": String.raw`\(\dfrac{1}{2}\)`,
        "D": "1"
      }
    },
    "99B-15": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`求 \(\log_{4}\sqrt{8}+\log_{9}\sqrt{243}=\)？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    },
    "99B-16": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`設 \(f(x)=3^{x}\)，若 \(f(a)=1\) 且 \(f(b)=2\)，則 \(f(a+b)=\)？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    },
    "99B-17": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`設某生之考試成績，國文、英文及數學三科分別為 76、81 與 90。若三科權數分別為 3、2 及 \(x\)，且加權平均分數為 80 分，則 \(x=\)？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    },
    "99B-18": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`擲一公正骰子三次。已知第一次擲出 6 點，求三次投擲中至少有二次擲出 6 點的機率為何？`,
      options: {
        "A": String.raw`\(\dfrac{11}{36}\)`,
        "B": String.raw`\(\dfrac{13}{36}\)`,
        "C": String.raw`\(\dfrac{17}{36}\)`,
        "D": String.raw`\(\dfrac{19}{36}\)`
      }
    },
    "99B-19": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`求 \((2x+y)^6\) 的展開式中，\(x^2y^4\) 項之係數為何？`,
      options: {
        "A": "24",
        "B": "30",
        "C": "36",
        "D": "60"
      }
    },
    "99B-20": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`有一排椅子，共有 5 個座位。今有甲、乙、丙、丁、戊共 5 人，各選一個位子坐，但甲、乙、丙三人必需相鄰，試問共有幾種坐法？`,
      options: {
        "A": "24",
        "B": "30",
        "C": "36",
        "D": "60"
      }
    },
    "99B-21": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`設直線 \(L\) 與圓：\(x^2+y^2+6x+4y=12\) 相切於點 \((-6,2)\)，則點 \((1,1)\) 到直線 \(L\) 的距離為何？`,
      options: {
        "A": "2",
        "B": "3",
        "C": "4",
        "D": "5"
      }
    },
    "99B-22": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`設 \(\alpha,\beta\) 為行列式方程式 \(\begin{vmatrix} 2 & 4 & 6 \\ x+1 & 2 & 4 \\ x^2+2 & 5 & 7 \end{vmatrix}=0\) 的兩個根，則 \(\alpha+\beta=\)？`,
      options: {
        "A": String.raw`\(\dfrac{-1}{2}\)`,
        "B": String.raw`\(\dfrac{1}{2}\)`,
        "C": String.raw`\(\dfrac{3}{2}\)`,
        "D": String.raw`\(\dfrac{5}{2}\)`
      }
    },
    "99B-23": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`求無窮等比級數 \(\dfrac{1}{\sqrt{3}+1}+\dfrac{1}{3+\sqrt{3}}+\dfrac{1}{3\sqrt{3}+3}+\cdots=\)？`,
      options: {
        "A": String.raw`\(\dfrac{\sqrt{3}}{4}\)`,
        "B": String.raw`\(\dfrac{\sqrt{3}}{3}\)`,
        "C": String.raw`\(\dfrac{5\sqrt{3}}{12}\)`,
        "D": String.raw`\(\dfrac{\sqrt{3}}{2}\)`
      }
    },
    "99B-24": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`設向量 \(\vec{a}=(\cos 75^{\circ}+\cos 15^{\circ},\ \sin 75^{\circ}+\sin 15^{\circ})\)，則向量的長度 \(|\vec{a}|=\)？`,
      options: {
        "A": String.raw`\(\sqrt{3}\)`,
        "B": "2",
        "C": String.raw`\(\sqrt{5}\)`,
        "D": String.raw`\(\sqrt{6}\)`
      }
    },
    "99B-25": {
      verified: true,
      sourcePage: 3,
      stem: String.raw`已知向量 \(\vec{a}=(-1,2)\)，\(\vec{b}=(1,x)\)，且向量 \(\vec{a}\) 與 \(\vec{b}\) 的夾角為 \(\dfrac{\pi}{4}\)，則 \(x=\)？`,
      options: {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4"
      }
    }
  });
})();
window.MATH_CONTENT = window.MATH_CONTENT || {};
(() => {
  Object.assign(window.MATH_CONTENT, {
    "99C-1": {
      verified: true, sourcePage: 2,
      stem: String.raw`關於直線 \(L : x + 4y = 28\)，下列敘述何者正確？`,
      options: {
        "A": String.raw`斜率為 \(7\)`,
        "B": String.raw`\(y\) 截距為 \(7\)`,
        "C": String.raw`通過點 \((7, 7)\)`,
        "D": String.raw`\(x\) 截距為 \(7\)`
      }
    },
    "99C-2": {
      verified: true, sourcePage: 2,
      stem: String.raw`關於拋物線 \(P : x = 4y^2 + 8y\)，下列敘述何者正確？`,
      options: {
        "A": String.raw`開口向下`,
        "B": String.raw`頂點在 \((-4, -1)\)`,
        "C": String.raw`準線是 \(y = -1\)`,
        "D": String.raw`正焦弦長為 \(4\)`
      }
    },
    "99C-3": {
      verified: true, sourcePage: 2,
      stem: String.raw`下列各三角函數值，何者數值最小？`,
      options: {
        "A": String.raw`\(\sin 885^{\circ}\)`,
        "B": String.raw`\(\cos(-430^{\circ})\)`,
        "C": String.raw`\(\tan 131^{\circ}\)`,
        "D": String.raw`\(\sin(-2010^{\circ})\)`
      }
    },
    "99C-4": {
      verified: true, sourcePage: 2,
      stem: String.raw`在坐標平面上的平行四邊形 \(ABCD\)（按順序）中，若 \(\overrightarrow{AB} = (4, 8)\)、\(\overrightarrow{AD} = (1, 4)\)，則 \(\left|\overrightarrow{AC}\right| + \left|\overrightarrow{BD}\right| = ?\)`,
      options: {
        "A": String.raw`\(4\sqrt{5} + \sqrt{17}\)`,
        "B": String.raw`\(18\)`,
        "C": String.raw`\(8\sqrt{5} + 2\sqrt{17}\)`,
        "D": String.raw`\(36\)`
      }
    },
    "99C-5": {
      verified: true, sourcePage: 2,
      stem: String.raw`設三直線 \(L_1 : x + 3y - 2 = 0\)，\(L_2 : 3x + y + 2 = 0\)，\(L_3 : x - y - 2 = 0\)，且 \(L_1\) 與 \(L_2\) 相交於 A 點，則過 A 點且與 \(L_3\) 平行的直線，<u>不通過</u>那一個象限？`,
      options: {
        "A": String.raw`第一象限`,
        "B": String.raw`第二象限`,
        "C": String.raw`第三象限`,
        "D": String.raw`第四象限`
      }
    },
    "99C-6": {
      verified: true, sourcePage: 2,
      stem: String.raw`已知直線 \(L : 3x + 4y + 5 = 0\) 與圓 \(C : x^2 + y^2 + 2x - 4y - 4 = 0\) 兩者的交點個數為 \(a\)，且圓 \(C\) 的圓心到直線 \(L\) 的距離為 \(b\)，則下列何者為正確？`,
      options: {
        "A": String.raw`\(a - b = -3\)`,
        "B": String.raw`\(a - b = -1\)`,
        "C": String.raw`\(a + b = 4\)`,
        "D": String.raw`\(a + b = 5\)`
      }
    },
    "99C-7": {
      verified: true, sourcePage: 2,
      stem: String.raw`設 \(p\) 與 \(q\) 為方程式 \(\log_9(10x^2 - 6x + 5) - \log_3 x - 1 = 0\) 的兩根，則 \(\dfrac{1}{p+q} = ?\)`,
      options: {
        "A": String.raw`\(\dfrac{1}{6}\)`,
        "B": String.raw`\(\dfrac{1}{5}\)`,
        "C": String.raw`\(\dfrac{2}{3}\)`,
        "D": String.raw`\(\dfrac{5}{7}\)`
      }
    },
    "99C-8": {
      verified: true, sourcePage: 2,
      stem: String.raw`有一籃球隊共有 12 位選手，其前鋒、中鋒、後衛的人數分別為 4 人、3 人、5 人，現在要選 5 位選手上場比賽，一般籃球比賽中，每隊的前鋒、中鋒、後衛人數分別為 2 人、1 人、2 人，問共有幾種<u>不同</u>選法？`,
      options: {
        "A": String.raw`120`,
        "B": String.raw`154`,
        "C": String.raw`180`,
        "D": String.raw`225`
      }
    },
    "99C-9": {
      verified: true, sourcePage: 2,
      stem: String.raw`<u>中山高中</u>一、二、三年級學生人數的比例分別為 40 %、32 %、28 %，而一、二、三年級男生人數佔該年級的比例分別為 50 %、60 %、40 %，現從全校學生中任意選取 1 人，則此人為女生的機率為何？`,
      options: {
        "A": String.raw`43.2 %`,
        "B": String.raw`45.4 %`,
        "C": String.raw`47.8 %`,
        "D": String.raw`49.6 %`
      }
    },
    "99C-10": {
      verified: true, sourcePage: 2,
      stem: String.raw`已知函數 \(f(x) = x^2 - 3x + 5\) 與函數 \(g(x) = \left|2x + 1\right|\) 圖形相交於兩點，而其 \(x\) 坐標分別為 \(a\) 與 \(b\)，其中 \(a < b\)。若 \(f'(x)\) 與 \(g'(x)\) 在 \([a, b]\) 上的最小值分別為 \(m_1\) 與 \(m_2\)，則 \(m_1 + m_2 = ?\)`,
      options: {
        "A": String.raw`\(-2\)`,
        "B": String.raw`\(-1\)`,
        "C": String.raw`\(0\)`,
        "D": String.raw`\(1\)`
      }
    },
    "99C-11": {
      verified: true, sourcePage: 3,
      imageOptions: true,
      stem: String.raw`聯立不等式 \(\begin{cases} x + y \ge 10 \\ x - y \le 1 \end{cases}\) 的可行解區域是圖(一)的哪一個部分？（圖(一)中兩直線將平面分成四塊，上方為 \(B\)、左方為 \(C\)、右方為 \(A\)、下方為 \(D\)）`,
      options: {
        "A": String.raw`\(A\)`,
        "B": String.raw`\(B\)`,
        "C": String.raw`\(C\)`,
        "D": String.raw`\(D\)`
      }
    },
    "99C-12": {
      verified: true, sourcePage: 3,
      stem: String.raw`設 \(f(x)\) 在 \([a, b]\) 上為一連續函數，其中 \(a < b\)，則下列敘述何者<u>錯誤</u>？`,
      options: {
        "A": String.raw`\(\displaystyle\int_a^b f(x)\,dx = -\int_b^a f(x)\,dx\)`,
        "B": String.raw`\(\displaystyle\int_a^b k f(x)\,dx = k\int_a^b f(x)\,dx\)，其中 \(k\) 為任意常數`,
        "C": String.raw`若 \(a < b < c\)，則 \(\displaystyle\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx\)`,
        "D": String.raw`\(\displaystyle\int_a^b x^n\,dx = \frac{b^{n+1} - a^{n+1}}{n+1}\)，其中 \(n\) 為任意常數`
      }
    },
    "99C-13": {
      verified: true, sourcePage: 3,
      stem: String.raw`在擲單顆骰子遊戲中，若甲每投一次骰子要先付給乙 \(x\) 元，且出現點數為奇數時，乙需付給甲 10 元；出現點數為偶數時，乙需付給甲 40 元，但出現奇數點的機率為出現偶數點機率的 2 倍，則 \(x\) 應訂為多少元，此遊戲才是公平的？`,
      options: {
        "A": String.raw`15`,
        "B": String.raw`20`,
        "C": String.raw`25`,
        "D": String.raw`30`
      }
    },
    "99C-14": {
      verified: true, sourcePage: 3,
      stem: String.raw`設 \(A\)、\(B\)、\(C\) 為一圓之圓周上三點，若 \(\overline{AB} = 4\)、\(\overline{BC} = 6\)、\(\overline{CA} = 8\)，則該圓之面積為何？`,
      options: {
        "A": String.raw`\(\dfrac{256}{15}\pi\)`,
        "B": String.raw`\(\dfrac{256}{13}\pi\)`,
        "C": String.raw`\(\dfrac{81}{4}\pi\)`,
        "D": String.raw`\(\dfrac{81}{2}\pi\)`
      }
    },
    "99C-15": {
      verified: true, sourcePage: 3,
      stem: String.raw`關於函數的導函數，下列何者正確？`,
      options: {
        "A": String.raw`\(f(x) = (4x + 5)(6x + 7)\)，則 \(f'(x) = 24\)`,
        "B": String.raw`\(f(x) = \sqrt[3]{x^7} + 4x\)，則 \(f'(x) = \dfrac{7}{3}x^{\frac{4}{3}} + 4\)`,
        "C": String.raw`\(f(x) = (4x + 5)^2\)，則 \(f'(x) = 2(4x + 5)\)`,
        "D": String.raw`\(f(x) = \dfrac{4x + 4}{x + 1}\)，則 \(f'(x) = 4\)`
      }
    },
    "99C-16": {
      verified: true, sourcePage: 3,
      stem: String.raw`關於下列各極限，何者正確？`,
      options: {
        "A": String.raw`\(\displaystyle\lim_{n \to \infty} \frac{3^n - 2^n}{5^n} = 1\)`,
        "B": String.raw`\(\displaystyle\lim_{n \to \infty} \frac{100n + 9}{n^2 + 5n - 1} = 0\)`,
        "C": String.raw`\(\displaystyle\lim_{n \to \infty} \frac{0.01n}{5n - 1} = 0\)`,
        "D": String.raw`\(\displaystyle\lim_{n \to \infty} n - \sqrt{n^2 - 1} = 1\)`
      }
    },
    "99C-17": {
      verified: true, sourcePage: 3,
      stem: String.raw`設 \(a\)、\(b\)、\(c\)、\(d\) 為實數，若 \(x^2 - 1\) 為 \(f(x) = ax^3 + bx^2 + cx + d\) 之因式，且 \(f(x)\) 除以 \(x - 2\) 餘 6，則 \(2a + b = ?\)`,
      options: {
        "A": String.raw`\(-4\)`,
        "B": String.raw`\(-2\)`,
        "C": String.raw`\(2\)`,
        "D": String.raw`\(4\)`
      }
    },
    "99C-18": {
      verified: true, sourcePage: 4,
      stem: String.raw`令 \(i = \sqrt{-1}\)。若 \(1 + i\) 為方程式 \(2x^2 + kx + 6 + 2i = 0\) 的一根，則 \(k = ?\)`,
      options: {
        "A": String.raw`\(-6\)`,
        "B": String.raw`\(-4\)`,
        "C": String.raw`\(-5 + i\)`,
        "D": String.raw`\(-10 + 2i\)`
      }
    },
    "99C-19": {
      verified: true, sourcePage: 4,
      stem: String.raw`無窮級數 \(1 + \dfrac{1}{3} + \dfrac{1}{2^2} + \dfrac{1}{3^3} + \dfrac{1}{2^4} + \dfrac{1}{3^5} + \cdots + \dfrac{1}{2^{2k}} + \dfrac{1}{3^{2k+1}} + \cdots = ?\)`,
      options: {
        "A": String.raw`\(\dfrac{41}{24}\)`,
        "B": String.raw`\(\dfrac{59}{24}\)`,
        "C": String.raw`\(\dfrac{5}{2}\)`,
        "D": String.raw`\(\dfrac{7}{2}\)`
      }
    },
    "99C-20": {
      verified: true, sourcePage: 4,
      stem: String.raw`設 \(r\) 為有理數，且 \(5^r = 4\left(\sqrt[3]{40} + \dfrac{\sqrt[3]{5}}{2}\right)^2\)，則 \(r = ?\)`,
      options: {
        "A": String.raw`\(\dfrac{8}{3}\)`,
        "B": String.raw`\(\dfrac{10}{3}\)`,
        "C": String.raw`\(8\)`,
        "D": String.raw`\(10\)`
      }
    },
    "99C-21": {
      verified: true, sourcePage: 4,
      stem: String.raw`在坐標平面上，若 \(\triangle ABC\) 之三頂點坐標分別為 \(A(2, 0)\)、\(B(4, 0)\) 與 \(C(4, 3)\)，則 \(\triangle ABC\) 之三邊上共有多少點與原點的距離恰為整數值？`,
      options: {
        "A": String.raw`2 個`,
        "B": String.raw`4 個`,
        "C": String.raw`6 個`,
        "D": String.raw`8 個`
      }
    },
    "99C-22": {
      verified: true, sourcePage: 4,
      stem: String.raw`在 \(\triangle ABC\) 中，若 D 點在線段 \(\overline{AC}\) 上且 \(\overline{AD} : \overline{DC} = 1 : 2\)，又 \(\angle BAD = 30^{\circ}\)，\(\angle BDC = 60^{\circ}\)，則 \(\angle DCB\) 的角度為何？`,
      options: {
        "A": String.raw`\(30^{\circ}\)`,
        "B": String.raw`\(45^{\circ}\)`,
        "C": String.raw`\(60^{\circ}\)`,
        "D": String.raw`\(75^{\circ}\)`
      }
    },
    "99C-23": {
      verified: true, sourcePage: 4,
      stem: String.raw`在 \(\triangle ABC\) 中，若 \(D\) 為線段 \(\overline{BC}\) 的中點，且 \(\overline{AB} = 9\)、\(\overline{AC} = 5\)，則向量內積 \(\overrightarrow{AD} \cdot \overrightarrow{BC} = ?\)`,
      options: {
        "A": String.raw`\(-28\)`,
        "B": String.raw`\(-14\)`,
        "C": String.raw`\(14\)`,
        "D": String.raw`\(28\)`
      }
    },
    "99C-24": {
      verified: true, sourcePage: 4,
      stem: String.raw`設 \(f(x)\) 為實係數三次多項式，若 \(f(1) = f(1 + i) = 0\) 且 \(f(0) > 0\)，則下列何者正確？`,
      options: {
        "A": String.raw`\(f(-2) < 0\)`,
        "B": String.raw`\(f(2) > 0\)`,
        "C": String.raw`\(f(4) < 0\)`,
        "D": String.raw`\(f(6) = 0\)`
      }
    },
    "99C-25": {
      verified: true, sourcePage: 4,
      stem: String.raw`求函數 \(f(x) = (\cos x + 3\sin x)(\cos x - \sin x)\) 之最小值為何？`,
      options: {
        "A": String.raw`\(-2\sqrt{5}\)`,
        "B": String.raw`\(-4\)`,
        "C": String.raw`\(-\dfrac{7}{2}\)`,
        "D": String.raw`\(-\sqrt{5} - 1\)`
      }
    }
  });
})();
window.MATH_CONTENT = window.MATH_CONTENT || {};
(() => {
  Object.assign(window.MATH_CONTENT, {
    "99D-1": { verified: true, sourcePage: 2,
      stem: String.raw`設 \( a > 0 > b \)，則點 \( (\,a-2b\,,\,3a^2 b\,) \) 在第幾象限？`,
      options: { "A": String.raw`一`, "B": String.raw`二`, "C": String.raw`三`, "D": String.raw`四` } },

    "99D-2": { verified: true, sourcePage: 2,
      stem: String.raw`求點 \( (\,2\,,\,3\,) \) 到直線 \( x=5 \) 的距離為何？`,
      options: { "A": String.raw`\( 2 \)`, "B": String.raw`\( 3 \)`, "C": String.raw`\( 5 \)`, "D": String.raw`\( 7 \)` } },

    "99D-3": { verified: true, sourcePage: 2,
      stem: String.raw`已知 \( \sin\theta = \dfrac{1}{3} \)，求 \( \cos^2\theta = \) ？`,
      options: { "A": String.raw`\( \dfrac{1}{9} \)`, "B": String.raw`\( \dfrac{1}{3} \)`, "C": String.raw`\( \dfrac{2}{3} \)`, "D": String.raw`\( \dfrac{8}{9} \)` } },

    "99D-4": { verified: true, sourcePage: 2,
      stem: String.raw`設 \( f(x) = x^2 + 1 + (\,x+1\,)^2 \)，則 \( f(x) \) 除以 \( x-1 \) 的餘式為何？`,
      options: { "A": String.raw`\( 0 \)`, "B": String.raw`\( 2 \)`, "C": String.raw`\( 4 \)`, "D": String.raw`\( 6 \)` } },

    "99D-5": { verified: true, sourcePage: 2,
      stem: String.raw`設直線 \( L \) 過 \( A(\,1\,,\,3\,) \) 與 \( B(\,2\,,\,12\,) \) 兩點，則 \( L \) 的斜率為何？`,
      options: { "A": String.raw`\( 5 \)`, "B": String.raw`\( 8 \)`, "C": String.raw`\( 9 \)`, "D": String.raw`\( 18 \)` } },

    "99D-6": { verified: true, sourcePage: 2,
      stem: String.raw`若 \( A \)、\( B \)、\( C \)、\( D \) 為長方形 \( ABCD \) 的四個頂點，如圖(一)，則向量 \( \overrightarrow{AB} \) 與下列何者相等？`,
      options: { "A": String.raw`\( \overrightarrow{AD} \)`, "B": String.raw`\( \overrightarrow{BA} \)`, "C": String.raw`\( \overrightarrow{CB} \)`, "D": String.raw`\( \overrightarrow{DC} \)` } },

    "99D-7": { verified: true, sourcePage: 2, imageOptions: true,
      stem: String.raw`下列何者為 \( y = \dfrac{x}{2} + 1 \) 的圖形？`,
      options: { "A": String.raw`（圖形選項，見題目圖片）`, "B": String.raw`（圖形選項，見題目圖片）`, "C": String.raw`（圖形選項，見題目圖片）`, "D": String.raw`（圖形選項，見題目圖片）` } },

    "99D-8": { verified: true, sourcePage: 2,
      stem: String.raw`求 \( \tan 2010^\circ = \) ？`,
      options: { "A": String.raw`\( -\sqrt{3} \)`, "B": String.raw`\( \dfrac{-1}{\sqrt{3}} \)`, "C": String.raw`\( \dfrac{1}{\sqrt{3}} \)`, "D": String.raw`\( \sqrt{3} \)` } },

    "99D-9": { verified: true, sourcePage: 3,
      stem: String.raw`下列哪個方程式所繪製之圖形如圖(二)所示？`,
      options: { "A": String.raw`\( y = 2\sin x \)`, "B": String.raw`\( y = \sin 2x \)`, "C": String.raw`\( y = 2\cos x \)`, "D": String.raw`\( y = \cos 2x \)` } },

    "99D-10": { verified: true, sourcePage: 3,
      stem: String.raw`已知方程式 \( x^3 - 3x + 2 = 0 \) 有一個重根，則該重根為何？`,
      options: { "A": String.raw`\( -2 \)`, "B": String.raw`\( -1 \)`, "C": String.raw`\( 1 \)`, "D": String.raw`\( 2 \)` } },

    "99D-11": { verified: true, sourcePage: 3,
      stem: String.raw`設直線 \( L \) 之斜率為 \( \dfrac{-5}{3} \)，且 \( L \) 之 \( x \) 截距為 \( 2 \)，則 \( L \) 之 \( y \) 截距為何？`,
      options: { "A": String.raw`\( -5 \)`, "B": String.raw`\( \dfrac{-10}{3} \)`, "C": String.raw`\( \dfrac{10}{3} \)`, "D": String.raw`\( 5 \)` } },

    "99D-12": { verified: true, sourcePage: 3,
      stem: String.raw`下列何者是 \( -\dfrac{22}{3}\pi \) 的同界角？`,
      options: { "A": String.raw`\( \dfrac{\pi}{3} \)`, "B": String.raw`\( \dfrac{2\pi}{3} \)`, "C": String.raw`\( \dfrac{4\pi}{3} \)`, "D": String.raw`\( \dfrac{5\pi}{3} \)` } },

    "99D-13": { verified: true, sourcePage: 3,
      stem: String.raw`已知 \( \triangle ABC \) 中，\( \overline{AB} = 5 \)，\( \overline{AC} = 4 \)，\( \overline{BC} = 3 \)，求 \( \sin A = \) ？`,
      options: { "A": String.raw`\( \dfrac{3}{5} \)`, "B": String.raw`\( \dfrac{4}{5} \)`, "C": String.raw`\( \dfrac{5}{4} \)`, "D": String.raw`\( \dfrac{5}{3} \)` } },

    "99D-14": { verified: true, sourcePage: 3,
      stem: String.raw`已知平面上三點 \( O(\,0\,,\,0\,) \)，\( A(\,2^3\,,\,3^2\,) \)，\( B\left((-2)^3\,,\,(-3)^2\right) \)。若向量 \( \overrightarrow{OA} \)、\( \overrightarrow{OB} \)、\( \overrightarrow{OC} \) 滿足 \( \overrightarrow{OC} = \overrightarrow{OA} + \overrightarrow{OB} \)，則 \( C \) 點的坐標為何？`,
      options: { "A": String.raw`\( (\,0\,,\,0\,) \)`, "B": String.raw`\( (\,12\,,\,12\,) \)`, "C": String.raw`\( (\,16\,,\,0\,) \)`, "D": String.raw`\( (\,0\,,\,18\,) \)` } },

    "99D-15": { verified: true, sourcePage: 3,
      stem: String.raw`已知平面上四點 \( A(\,-1\,,\,-2\,) \)，\( B(\,3\,,\,4\,) \)，\( C(\,-5\,,\,-6\,) \)，\( D(\,7\,,\,y\,) \)。若向量 \( \overrightarrow{AB} \) 與向量 \( \overrightarrow{CD} \) 平行，則 \( y = \) ？`,
      options: { "A": String.raw`\( 8 \)`, "B": String.raw`\( 10 \)`, "C": String.raw`\( 12 \)`, "D": String.raw`\( 14 \)` } },

    "99D-16": { verified: true, sourcePage: 3, imageOptions: true,
      stem: String.raw`下列何者之陰影部份滿足不等式 \( x + y > 0 \) 的條件？`,
      options: { "A": String.raw`（圖形選項，見題目圖片）`, "B": String.raw`（圖形選項，見題目圖片）`, "C": String.raw`（圖形選項，見題目圖片）`, "D": String.raw`（圖形選項，見題目圖片）` } },

    "99D-17": { verified: true, sourcePage: 3,
      stem: String.raw`已知圓方程式 \( x^2 + y^2 - 4x + 4y - 1 = 0 \)，則此圓之半徑為何？`,
      options: { "A": String.raw`\( 1 \)`, "B": String.raw`\( 3 \)`, "C": String.raw`\( 5 \)`, "D": String.raw`\( 7 \)` } },

    "99D-18": { verified: true, sourcePage: 4,
      stem: String.raw`已知平面上三點 \( O(\,0\,,\,0\,) \)，\( A(\,1\,,\,2\,) \)，\( B(\,x\,,\,3\,) \)。若向量 \( \overrightarrow{OA} \) 與向量 \( \overrightarrow{OB} \) 垂直，則 \( x = \) ？`,
      options: { "A": String.raw`\( -6 \)`, "B": String.raw`\( -3 \)`, "C": String.raw`\( -2 \)`, "D": String.raw`\( -1 \)` } },

    "99D-19": { verified: true, sourcePage: 4,
      stem: String.raw`求 \( (\,2x^3 - x^2 + 3x + 1\,)(\,x^2 + x - 1\,) \) 的展開式中，\( x^4 \) 項的係數為何？`,
      options: { "A": String.raw`\( -2 \)`, "B": String.raw`\( -1 \)`, "C": String.raw`\( 1 \)`, "D": String.raw`\( 2 \)` } },

    "99D-20": { verified: true, sourcePage: 4,
      stem: String.raw`已知過點 \( P(\,-2\,,\,1\,) \) 可作兩條直線與圓 \( x^2 + y^2 = 1 \) 相切。若此兩直線的斜率分別為 \( m_1 \) 及 \( m_2 \)，求 \( m_1 + m_2 = \) ？`,
      options: { "A": String.raw`\( \dfrac{-4}{3} \)`, "B": String.raw`\( \dfrac{-3}{4} \)`, "C": String.raw`\( \dfrac{3}{4} \)`, "D": String.raw`\( \dfrac{4}{3} \)` } },

    "99D-21": { verified: true, sourcePage: 4,
      stem: String.raw`兩種款式的毛織品，每一件 A 款式毛織品的製作需用紅色毛線 40 公尺，白色毛線 30 公尺，利潤 40 元；每一件 B 款式毛織品的製作需用紅色毛線 20 公尺，白色毛線 30 公尺，利潤 25 元。現有紅色毛線 800 公尺，白色毛線 900 公尺，全部均可使用，問最大利潤為何？`,
      options: { "A": String.raw`800 元`, "B": String.raw`900 元`, "C": String.raw`1000 元`, "D": String.raw`1200 元` } },

    "99D-22": { verified: true, sourcePage: 4,
      stem: String.raw`已知平面上有三點 \( A(\,4\,,\,4\,) \)，\( B(\,4\,,\,-1\,) \)，\( C(\,2\,,\,3\,) \)，則線段 \( \overline{BC} \) 之中點與 \( A \) 點的距離為何？`,
      options: { "A": String.raw`\( \sqrt{10} \)`, "B": String.raw`\( \sqrt{15} \)`, "C": String.raw`\( 2\sqrt{5} \)`, "D": String.raw`\( 5 \)` } },

    "99D-23": { verified: true, sourcePage: 4,
      stem: String.raw`下列何者<u>不能</u>化簡為有理數？`,
      options: { "A": String.raw`\( \dfrac{\sqrt{5}+1}{2} - \dfrac{2}{\sqrt{5}-1} \)`, "B": String.raw`\( \left(\dfrac{\sqrt{5}+1}{2}\right)^2 - \dfrac{\sqrt{5}+1}{2} \)`, "C": String.raw`\( (\,\sqrt{5}+1\,)(\,\sqrt{5}-1\,) \)`, "D": String.raw`\( \dfrac{\sqrt{5}+1}{\sqrt{5}-1} \)` } },

    "99D-24": { verified: true, sourcePage: 4,
      stem: String.raw`已知 \( \sin 2\theta = 2\sin\theta\cos\theta \)，求 \( (\,\sin 15^\circ + \cos 15^\circ\,)^2 = \) ？`,
      options: { "A": String.raw`\( \dfrac{1}{2} \)`, "B": String.raw`\( \dfrac{3}{4} \)`, "C": String.raw`\( \dfrac{3}{2} \)`, "D": String.raw`\( 2 \)` } },

    "99D-25": { verified: true, sourcePage: 4,
      stem: String.raw`設圖(三)為函數 \( f(x) = ax^2 + bx + c \) 之圖形，則下列何者正確？`,
      options: { "A": String.raw`\( a < 0 \)`, "B": String.raw`\( b < 0 \)`, "C": String.raw`\( c < 0 \)`, "D": String.raw`\( a + b + c < 0 \)` } }
  });
})();
