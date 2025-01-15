// 定义垃圾分类数据
const garbageData = {
    hazardous: [
        { name: "废电池", description: "日常电子设备如遥控器、闹钟里的常客，含汞、铅等重金属，随意丢弃，重金属渗出会污染土壤，渗入地下水，危害生态与人体健康。" },
        { name: "过期药品", description: "家中药箱里过期的片剂、胶囊，药效改变，还可能产生有害化学变化，流入环境，会给土壤、水源带来潜在污染风险。" },
        { name: "废荧光灯", description: "老式照明用的荧光灯，含汞，灯管破损，汞挥发到空气中，被人体吸入，易损害神经系统，也污染周边环境。" },
        { name: "水银体温计", description: "常用的体温测量工具，摔碎后，水银泄漏，作为重金属，积累在人体影响健康，还可能污染室内环境。" },
        { name: "废油漆桶", description: "油漆桶里残留的油漆，含有挥发性有机化合物，若随意丢弃，会污染土壤和水源，危害生态环境。" }
    ],
    recyclable: [
        { name: "旧纸箱", description: "快递包裹、购物后的纸箱，纸质原料可再生，回收后打浆造纸，减少树木砍伐，保护森林资源。" },
        { name: "塑料盒", description: "常见的食品、日用品塑料包装盒，材质多为 PP、PE，回收后能制成新塑料制品，降低塑料垃圾压力。" },
        { name: "玻璃瓶", description: "装饮料、酱料的玻璃瓶，化学性质稳定，回收重熔，可变成新的玻璃瓶、玻璃工艺品，循环利用价值高。" },
        { name: "易拉罐", description: "铝制的易拉罐，熔化后可压铸为新易拉罐、铝型材，回收能耗远低于从铝矿提炼，节能又环保。" },
        { name: "旧衣服", description: "旧的衣物可回收改造，打碎、清洗后做成新的纺织品或其他可再利用的产品，降低浪费。" }
    ],
    wet: [
        { name: "剩饭菜", description: "每餐吃完剩下的主食、菜肴，易腐烂，含有机物丰富，经堆肥处理，能转化为滋养土壤的肥料。" },
        { name: "果皮", description: "吃水果剥下的皮，像苹果皮、香蕉皮，富含微生物所需营养，是天然堆肥好原料。" },
        { name: "鱼骨", description: "吃鱼剩下的骨头，质地软，可快速被微生物分解，堆肥后给土壤补充养分。" },
        { name: "烂菜叶", description: "择菜扔掉的发黄、软烂叶片，属于典型易腐垃圾，堆肥分解快，助力土壤改良。" },
        { name: "茶叶渣", description: "泡过茶的茶叶渣，不仅易腐烂，还含有丰富的养分，适合堆肥或转化为植物肥料。" }
    ],
    dry: [
        { name: "餐巾纸", description: "用过的餐巾纸，沾有污渍、体液，纤维受损，回收难度大，归入其他垃圾，方便填埋处理。" },
        { name: "陶瓷碎片", description: "打碎的碗碟碎片，质地坚硬，难以降解，回收成本高昂，作其他垃圾清理。" },
        { name: "旧扫把", description: "旧扫把磨损严重，材质有塑料、木头、刷毛混合，拆分困难，归到此类。" },
        { name: "一次性筷子", description: "木质、竹质的一次性筷子，使用后沾食物残留，回收价值低，划分为其他垃圾。" },
        { name: "塑料袋", description: "日常购物用的塑料袋，难以降解，对环境造成压力，属于其他垃圾，处理不当会严重污染生态。" }
    ]
};

// 切换垃圾类别的表格内容
function updateTable(category) {
    const tableBody = document.getElementById("knowledge-body");
    tableBody.innerHTML = ""; // 清空现有表格内容

    const items = garbageData[category];
    items.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.description}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 为类别按钮添加点击事件
document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        const category = e.target.getAttribute("data-category");
        updateTable(category);
    });
});

// 设置返回首页按钮的功能
document.getElementById("back-home").addEventListener("click", () => {
    window.location.href = "index.html"; // 返回首页
});

// 默认展示有害垃圾
updateTable("hazardous");
