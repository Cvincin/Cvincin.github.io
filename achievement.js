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
});

// 返回首页按钮
document.getElementById("back-to-home").addEventListener("click", () => {
    window.location.href = "index.html";  // 假设首页是 index.html
});
