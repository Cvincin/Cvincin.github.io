// index.js

// 获取弹窗和按钮元素
const rulesModal = document.getElementById('rulesModal');
const startGameButton = document.getElementById('startGameButton');
const startChallengeButton = document.getElementById('startChallengeButton');

// 确保按钮和元素已经成功获取
console.log(startChallengeButton, rulesModal, startGameButton); // 用来检查元素是否正确获取

// 当点击“开始挑战”按钮时，显示规则弹窗
startChallengeButton.addEventListener('click', () => {
    rulesModal.style.display = 'block'; // 显示规则弹窗
});

// 当点击“了解了！”按钮时，关闭弹窗并跳转到game.html
startGameButton.addEventListener('click', () => {
    rulesModal.style.display = 'none'; // 关闭规则弹窗
    window.location.href = 'game.html'; // 跳转到游戏页面
});

document.getElementById("achievements-button").addEventListener("click", function() {
    window.location.href = "achievement.html";  // 跳转到成就页面
});
