document.addEventListener("DOMContentLoaded", () => {
    // 从本地存储获取游戏结果数据
    const storedData = JSON.parse(localStorage.getItem("storedData")) || {
        totalScore: 0,
        correctCounts: { hazardous: 0, recyclable: 0, kitchen: 0, other: 0 },
        incorrectCounts: { hazardous: 0, recyclable: 0, kitchen: 0, other: 0 },
    };

    // 更新成就页面显示的数据
    document.getElementById("total-score").textContent = storedData.totalScore;
    document.getElementById("correct-hazardous").textContent = storedData.correctCounts.hazardous;
    document.getElementById("correct-recyclable").textContent = storedData.correctCounts.recyclable;
    document.getElementById("correct-kitchen").textContent = storedData.correctCounts.kitchen;
    document.getElementById("correct-other").textContent = storedData.correctCounts.other;

    document.getElementById("incorrect-hazardous").textContent = storedData.incorrectCounts.hazardous;
    document.getElementById("incorrect-recyclable").textContent = storedData.incorrectCounts.recyclable;
    document.getElementById("incorrect-kitchen").textContent = storedData.incorrectCounts.kitchen;
    document.getElementById("incorrect-other").textContent = storedData.incorrectCounts.other;

    // 计算进度条百分比并更新
    updateProgressBar("hazardous-progress-bar", storedData.correctCounts.hazardous);
    updateProgressBar("recyclable-progress-bar", storedData.correctCounts.recyclable);
    updateProgressBar("kitchen-progress-bar", storedData.correctCounts.kitchen);
    updateProgressBar("other-progress-bar", storedData.correctCounts.other);

    // 更新徽章状态
    updateBadge("hazardous-badge", storedData.correctCounts.hazardous, `你已经正确分类有害垃圾超过10次！对有害垃圾多次正确归类，你的贡献包括但不限于……
<br>1.为周边多个家庭的饮用水源提供了有效保护，让大家能放心饮用健康水。
<br>2.给小区里的众多大树创造了良好的生长环境，大树得以扎根沃土，持续净化空气、美化环境。
<br>3.为周围的小动物们创造了一个更健康、更安全的栖息环境。
<br>4.给城市的空气净化系统减轻了大量负担，空气净化设备能更高效运转，城市空气更清新。
<br>5.给周边小空间的空气做了一次深度净化，让空气更加清新宜人。`);
    updateBadge("recyclable-badge", storedData.correctCounts.recyclable, `成功分类可回收物超过10次！对可回收垃圾多次正确归类，你的贡献包括但不限于……
<br>1.帮家里节省了一部分生活开支，让生活更加经济实惠。
<br>2.保护了森林资源，让树木可以继续为地球制造氧气。
<br>3.降低了能源消耗，为地球节省了一份宝贵的能源，为可持续发展贡献了力量。
<br>4.减少了垃圾填埋空间，延长了填埋场的使用寿命，为城市节约了宝贵的土地资源。
<br>5.让快递包装有了再次被使用的机会，促进了快递包装的循环利用。`);
    updateBadge("kitchen-badge", storedData.correctCounts.kitchen, `厨余垃圾正确分类超过10次！对厨余垃圾多次正确归类，你的贡献包括但不限于……
<br>1.厨余垃圾制成的肥料是绿植的绝佳养分，正确分类有助于让室内的绿植更加茁壮成长。
<br>2.改善土壤质量，让菜园的蔬菜长得更加茁壮、收成增长。
<br>3.节省了厨余垃圾运输的空间和成本。
<br>4.减少了垃圾桶的异味散发，让周围环境更清新。
<br>5.有助于生态系统的和谐与可持续发展`);
    updateBadge("other-badge", storedData.correctCounts.other, `你对其他垃圾正确分类超过10次！对不可回收垃圾多次正确归类，你的贡献包括但不限于……
<br>1.提高了垃圾处理效率，减少了垃圾车运输负担。
<br>2.为清洁人员送去了一份温暖，减轻了他们的工作压力。
<br>3.解决了因垃圾混合产生的难闻的气味，邻里空气更清新。
<br>4.间接清理了社区的杂乱角落，让社区环境更加整洁宜居。
<br>5.减少了垃圾的无序堆积，为城市的垃圾处理节省了宝贵的空间。`);
});

function updateProgressBar(barId, correctCount) {
    const progressBar = document.getElementById(barId);
    // 限制正确分类数量最大为 10
    const cappedCorrectCount = Math.min(correctCount, 10); 
    const progressPercentage = (cappedCorrectCount / 10) * 100;
    progressBar.style.width = progressPercentage + "%";
}

function updateBadge(badgeId, correctCount, meaning) {
    const badge = document.getElementById(badgeId);
    const tooltip = document.getElementById(`${badgeId.split('-')[0]}-tooltip`);
    if (correctCount >= 10) {
        badge.classList.add("active");
        tooltip.style.visibility = 'hidden';
    } else {
        badge.classList.remove("active");
        tooltip.style.visibility = 'visible';
    }

    // 点击事件
    badge.addEventListener("click", () => {
        if (correctCount >= 10) {
            const popup = document.getElementById('popup');
            const popupMessage = document.getElementById('popup-message');
            popupMessage.innerHTML = `${meaning}`;
            popup.style.display = "block";

            // 关闭弹窗
            const closeBtn = document.querySelector('.close');
            closeBtn.onclick = function () {
                popup.style.display = "none";
            }

            // 点击弹窗外部关闭弹窗
            window.onclick = function (event) {
                if (event.target == popup) {
                    popup.style.display = "none";
                }
            }
        }
    });
}

// 返回首页按钮
document.getElementById("back-to-home").addEventListener("click", () => {
    window.location.href = "index.html";  // 假设首页是 index.html
});
