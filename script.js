// 存储游戏状态的变量
let gameTimer;
let itemTimer;
let itemStartTime;
let timeLeft = 180;
let score = 0;
let correctStreak = 0;
let incorrectCount = 0;
let correctCount = 0;
let currentItem;
let isGamePaused = false;

let correctCountHazardous = 0;
let correctCountRecyclable = 0;
let correctCountWet = 0;
let correctCountDry = 0;
let incorrectCountHazardous = 0;
let incorrectCountRecyclable = 0;
let incorrectCountWet = 0;
let incorrectCountDry = 0;

const bins = document.querySelectorAll(".bin");
const item = document.getElementById("item");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalContinue = document.getElementById("modal-continue");
const modalRestart = document.getElementById("modal-restart");
// 判断是否为移动端
// 判断是否为非 Windows 或 macOS 端（即为移动端）
const isNotDesktop = !/Windows|Macintosh/i.test(navigator.platform) &&
                     !/Windows NT|Macintosh/i.test(navigator.userAgent);

const items = [
    { name: "废电池", category: "hazardous", description: "日常电子设备如遥控器、闹钟里的常客，含汞、铅等重金属，随意丢弃，重金属渗出会污染土壤，渗入地下水，危害生态与人体健康。" },
    { name: "过期药品", category: "hazardous", description: "家中药箱里过期的片剂、胶囊，药效改变，还可能产生有害化学变化，流入环境，会给土壤、水源带来潜在污染风险。" },
    { name: "废荧光灯", category: "hazardous", description: "老式照明用的荧光灯，含汞，灯管破损，汞挥发到空气中，被人体吸入，易损害神经系统，也污染周边环境。" },
    { name: "水银体温计", category: "hazardous", description: "常用的体温测量工具，摔碎后，水银泄漏，作为重金属，积累在人体影响健康，还可能污染室内环境。" },
    { name: "指甲油", category: "hazardous", description: "女性常用的指甲油和洗甲水中含有甲醛、丙酮、邻苯二甲酸酯等有害物质，这些物质具有挥发性和毒性，随意丢弃会污染空气、土壤和水体" },
    { name: "旧纸箱", category: "recyclable", description: "快递包裹、购物后的纸箱，纸质原料可再生，回收后打浆造纸，减少树木砍伐，保护森林资源。" },
    { name: "塑料盒", category: "recyclable", description: "常见的食品、日用品塑料包装盒，材质多为 PP、PE，回收后能制成新塑料制品，降低塑料垃圾压力。" },
    { name: "玻璃瓶", category: "recyclable", description: "装饮料、酱料的玻璃瓶，化学性质稳定，回收重熔，可变成新的玻璃瓶、玻璃工艺品，循环利用价值高。" },
    { name: "易拉罐", category: "recyclable", description: "铝制的易拉罐，熔化后可压铸为新易拉罐、铝型材，回收能耗远低于从铝矿提炼，节能又环保。" },
    { name: "旧衣物", category: "recyclable", description: "不再穿的各类衣服，纯棉、化纤材质皆有，分拣后部分翻新售卖，部分拆解作纺织原料，减少纺织废料。" },
    { name: "剩饭菜", category: "wet", description: "每餐吃完剩下的主食、菜肴，易腐烂，含有机物丰富，经堆肥处理，能转化为滋养土壤的肥料。" },
    { name: "果皮", category: "wet", description: "吃水果剥下的皮，像苹果皮、香蕉皮，富含微生物所需营养，是天然堆肥好原料。" },
    { name: "鱼骨", category: "wet", description: "吃鱼剩下的骨头，质地软，可快速被微生物分解，堆肥后给土壤补充养分。" },
    { name: "烂菜叶", category: "wet", description: "择菜扔掉的发黄、软烂叶片，属于典型易腐垃圾，堆肥分解快，助力土壤改良。" },
    { name: "蛋壳", category: "wet", description: "鸡蛋鸭蛋壳，主要成分碳酸钙，放入堆肥体系能调节酸碱度，加快发酵。" },
    { name: "餐巾纸", category: "dry", description: "用过的餐巾纸，沾有污渍、体液，纤维受损，回收难度大，归入其他垃圾，方便填埋处理。" },
    { name: "陶瓷碎片", category: "dry", description: "打碎的碗碟碎片，质地坚硬，难以降解，回收成本高昂，作其他垃圾清理。" },
    { name: "旧扫把", category: "dry", description: "旧扫把磨损严重，材质有塑料、木头、刷毛混合，拆分困难，归到此类。" },
    { name: "一次性筷子", category: "dry", description: "木质、竹质的一次性筷子，使用后沾食物残留，回收价值低，划分为其他垃圾。" },
    { name: "中性笔笔芯", category: "dry", description: "中性笔、圆珠笔笔芯，墨水成分复杂，外壳难分离回收，按其他垃圾处理。" }
];

// 音乐控制
const musicToggleButton = document.getElementById("music-toggle");
const backgroundMusic = new Audio("audios/background-music.mp3");
let isMusicPlaying = false;  // 初始设置为不播放

// 启动音乐的函数，确保只有用户交互后才播放
function playMusic() {
    if (!isMusicPlaying) {
        backgroundMusic.loop = true; // 循环播放
        backgroundMusic.volume = 0.3; // 设置音量
        backgroundMusic.play();
        isMusicPlaying = true;
        musicToggleButton.innerHTML = '<img src="images/music-icon.png" alt="音量开启" />'; // 显示播放图标
    }
}

// 监听点击事件来触发音乐播放
document.body.addEventListener("click", () => {
    if (!isMusicPlaying) {
        playMusic();
    }
});

// 切换音乐状态
musicToggleButton.addEventListener("click", (event) => {
    event.stopPropagation(); // 阻止冒泡，防止点击按钮触发页面的点击事件
    if (isMusicPlaying) {
        backgroundMusic.pause();
        isMusicPlaying = false;
        musicToggleButton.innerHTML = '<img src="images/music-muted-icon.png" alt="音量关闭" />'; // 显示静音图标
    } else {
        playMusic();
    }
});


// 开始游戏
function startGame() {
    timeLeft = 180;
    score = 0;
    correctStreak = 0;
    incorrectCount = 0;
    correctCount = 0;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startGameTimer();
    generateItem();
    // 根据设备类型绑定事件
    if (isNotDesktop) {
        item.addEventListener("touchstart", touchStart);
        item.addEventListener("touchmove", touchMove);
        item.addEventListener("touchend", touchEnd);
        bins.forEach(bin => {
            bin.addEventListener("touchmove", touchMove);
            bin.addEventListener("touchend", touchEnd);
        });
    } else {
        item.addEventListener("dragstart", dragStart);
        bins.forEach(bin => {
            bin.addEventListener("dragover", dragOver);
            bin.addEventListener("drop", drop);
        });
    }
    modal.style.display = "none";
    isGamePaused = false;
    // 阻止页面滚动
    document.body.addEventListener('touchmove', preventDefaultHandler, { passive: false });
}


// 开始游戏倒计时
function startGameTimer() {
    gameTimer = setInterval(() => {
        if (isGamePaused) return;
        timeLeft--;
        if (timeLeft < 0) {
            timeLeft = 0;
            endGame();
        }
        timerDisplay.textContent = timeLeft;
    }, 1000);
}


// 开始物品倒计时
function startItemTimer() {
    itemStartTime = Date.now();
    itemTimer = setInterval(() => {
        if (isGamePaused) return;
        const elapsedTime = Date.now() - itemStartTime;
        if (correctCount < 10 && elapsedTime >= 5000) {
            // 玩家未进行归类操作，扣除 5 秒游戏时间
            timeLeft -= 5;
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            timerDisplay.textContent = timeLeft;
            generateItem();
        } else if (correctCount >= 10 && elapsedTime >= 3000) {
            // 玩家未进行归类操作，扣除 5 秒游戏时间
            timeLeft -= 5;
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            timerDisplay.textContent = timeLeft;
            generateItem();
        }
    }, 100);
}


function saveGameResultsToStorage(score, correctCounts, incorrectCounts) {
    // 获取已有的累积数据
    const storedData = JSON.parse(localStorage.getItem("storedData")) || {
        totalScore: 0,
        correctCounts: { hazardous: 0, recyclable: 0, kitchen: 0, other: 0 },
        incorrectCounts: { hazardous: 0, recyclable: 0, kitchen: 0, other: 0 },
    };

    // 更新累积数据
    storedData.totalScore += score;
    for (const category in correctCounts) {
        storedData.correctCounts[category] += correctCounts[category] || 0; // 防止 undefined
        storedData.incorrectCounts[category] += incorrectCounts[category] || 0; // 防止 undefined
    }

    // 保存更新后的数据
    localStorage.setItem("storedData", JSON.stringify(storedData));
}


// 结束游戏
function endGame() {
    clearInterval(gameTimer);
    clearInterval(itemTimer);
    modalMessage.textContent = `游戏结束，你的得分是 ${score} 分。`;
    modal.style.display = "block";

    // 为返回首页按钮添加点击事件监听
    backToHomeButton.addEventListener('click', function () {
        window.location.href = 'index.html';  // 跳转到首页
    });

    // 保存本轮游戏结果
    saveGameResultsToStorage(score, {
        hazardous: correctCountHazardous,
        recyclable: correctCountRecyclable,
        kitchen: correctCountWet,
        other: correctCountDry
    }, {
        hazardous: incorrectCountHazardous,
        recyclable: incorrectCountRecyclable,
        kitchen: incorrectCountWet,
        other: incorrectCountDry
    });

    // 移除事件监听，避免在游戏结束后继续响应触摸/拖拽
    bins.forEach(bin => {
        bin.removeEventListener("touchmove", touchMove);
        bin.removeEventListener("touchend", touchEnd);
        bin.removeEventListener("dragover", dragOver);
        bin.removeEventListener("drop", drop);
    });

    // 重新绑定“再来一次”按钮事件
    modalRestart.removeEventListener("click", startGame);  // 先移除旧的事件监听
    modalRestart.addEventListener("click", startGame);  // 重新绑定事件

    // 移除页面滚动阻止
    document.body.removeEventListener('touchmove', preventDefaultHandler);

    // 重置游戏变量
    correctCountHazardous = 0;
    correctCountRecyclable = 0;
    correctCountWet = 0;
    correctCountDry = 0;
    incorrectCountHazardous = 0;
    incorrectCountRecyclable = 0;
    incorrectCountWet = 0;
    incorrectCountDry = 0;
}

// 生成随机物品
function generateItem() {
    let index = Math.floor(Math.random() * items.length);
    currentItem = items[index];
    
    // 在物品上方显示名称，并插入图片
    item.innerHTML = `
        <img src="images/examples/${currentItem.name}.png" alt="${currentItem.name}" class="item-image">
        <div class="item-name">${currentItem.name}</div>
    `;
    
    bins.forEach(bin => {
        bin.classList.remove("correct", "incorrect");
    });
    startItemTimer();
}



// 触摸开始（移动端）
function touchStart(event) {
    console.log('touchStart event triggered');
    event.preventDefault(); // 阻止触摸事件的默认行为
    const touch = event.touches[0];
    const target = event.target;
    if (target.tagName === 'IMG' || target.tagName === 'PNG') {
        target.addEventListener('contextmenu', function(e) {
            e.preventDefault(); // 防止右键（长按）菜单出现
        });
    }
    event.target.setAttribute("data-touch-start-x", touch.clientX);
    event.target.setAttribute("data-touch-start-y", touch.clientY);
    event.target.setAttribute("data-category", currentItem.category); // 存储当前物品的类别
    
}

// 触摸移动（移动端）
function touchMove(event) {
    console.log('touchMove event triggered');
    const touch = event.touches[0];
    const item = event.target;

    const startX = parseInt(item.getAttribute("data-touch-start-x"));
    const startY = parseInt(item.getAttribute("data-touch-start-y"));

    // 立即开始拖动，避免延迟
    item.style.position = "absolute";
    item.style.left = `${touch.clientX - startX/2}px`;
    item.style.top = `${touch.clientY - startY}px`;
}


// 触摸结束（移动端）
function touchEnd(event) {
    console.log('touchEnd event triggered');
    const touch = event.changedTouches[0];
    const bin = document.elementFromPoint(touch.clientX, touch.clientY);
    console.log('获取到的元素:', bin); // 输出获取到的元素
    console.log('触摸点 X 坐标:', touch.clientX);
    console.log('触摸点 Y 坐标:', touch.clientY);
    console.log(bin.classList);

        const category = event.target.getAttribute("data-category"); // 获取存储的类别
        const binCategory = bin.parentNode.parentNode.getAttribute("data-category");
        console.log('垃圾类别:', category);
        console.log('垃圾桶类别:', binCategory);

        // 执行与PC端drop函数相同的逻辑
        if (category === binCategory) {
            bin.classList.add("correct");
            gsap.to(bin, { duration: 0.2, scale: 1.1, yoyo: true, repeat: 1 });
            correctCount++;

            if (category === "hazardous"){
                correctCountHazardous ++;
            }
            if (category === "recyclable"){
                correctCountRecyclable ++;
            }
            if (category === "wet"){
                correctCountWet ++;
            }
            if (category === "dry"){
                correctCountDry ++;
            }

            // 显示“+1”符号
            const plusOneGlobal = document.getElementById('plus-one-global');
            plusOneGlobal.classList.add('show');

            // 让它显示一段时间后消失
            setTimeout(() => {
                plusOneGlobal.classList.remove('show');  // 移除显示的类
            }, 1000);  // 1秒后消失

            if (correctStreak === 1) {
                score += 1;
            } else {
                score++;
            }
            correctStreak++;
            scoreDisplay.textContent = score;
        } else {
            if (category === "hazardous"){
                incorrectCountHazardous ++;
            }
            if (category === "recyclable"){
                incorrectCountRecyclable ++;
            }
            if (category === "wet"){
                incorrectCountWet ++;
            }
            if (category === "dry"){
                incorrectCountDry ++;
            }

            bin.classList.add("incorrect");
            gsap.to(bin, { duration: 0.2, scale: 1.1, yoyo: true, repeat: 1, backgroundColor: "#F44336" });
            incorrectCount++;
            if (incorrectCount >= 5) {
                endGame();
                modalMessage.textContent = `你已经错误分类 5 次，游戏结束。你的得分是 ${score} 分。`;
                modal.style.display = "block";
                return;
            }
            timeLeft -= 5;
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            timerDisplay.textContent = timeLeft;
            pauseGame();
            showIncorrectModal(false);
        }
        correctStreak = category === binCategory ? correctStreak : 0;
        generateItem();
    }



// 开始拖动
function dragStart(event) {
    event.dataTransfer.setData("text/plain", currentItem.category);
    event.dataTransfer.effectAllowed = "move";
    // 阻止页面滚动
    document.body.addEventListener('touchmove', preventDefaultHandler, { passive: false });
}


// 拖动经过垃圾桶
function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
}


// 放下物品
function drop(event) {
    event.preventDefault();
    const category = event.dataTransfer.getData("text/plain");
    const binCategory = event.target.closest(".bin").getAttribute("data-category");
    if (category === binCategory) {
        event.target.closest(".bin").classList.add("correct");
        gsap.to(event.target.closest(".bin"), { duration: 0.2, scale: 1.1, yoyo: true, repeat: 1 });
        correctCount++;

        if (category === "hazardous"){
            correctCountHazardous ++;
        }
        if (category === "recyclable"){
            correctCountRecyclable ++;
        }
        if (category === "wet"){
            correctCountWet ++;
        }
        if (category === "dry"){
            correctCountDry ++;
        }

    // 显示“+1”符号
    const plusOneGlobal = document.getElementById('plus-one-global');
    plusOneGlobal.classList.add('show');

    // 让它显示一段时间后消失
    setTimeout(() => {
        plusOneGlobal.classList.remove('show');  // 移除显示的类
    }, 1000);  // 1秒后消失

        if (correctStreak === 1) {
            score += 1;
        } else {
            score++;
        }
        correctStreak++;
        scoreDisplay.textContent = score;
    } else {
        if (category === "hazardous"){
            incorrectCountHazardous ++;
        }
        if (category === "recyclable"){
            incorrectCountRecyclable ++;
        }
        if (category === "wet"){
            incorrectCountWet ++;
        }
        if (category === "dry"){
            incorrectCountDry ++;
        }

        event.target.closest(".bin").classList.add("incorrect");
        gsap.to(event.target.closest(".bin"), { duration: 0.2, scale: 1.1, yoyo: true, repeat: 1, backgroundColor: "#F44336" });
        incorrectCount++;
        if (incorrectCount >= 5) {
            endGame();
            modalMessage.textContent = `你已经错误分类 5 次，游戏结束。你的得分是 ${score} 分。`;
            modal.style.display = "block";
            return;
        }
        timeLeft -= 5;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerDisplay.textContent = timeLeft;
        pauseGame();
        showIncorrectModal(false);
    }
    correctStreak = category === binCategory ? correctStreak : 0;
    generateItem();
    // 移除页面滚动阻止
    document.body.removeEventListener('touchmove', preventDefaultHandler);
}


// 暂停游戏
function pauseGame() {
    isGamePaused = true;
    clearInterval(gameTimer);
    clearInterval(itemTimer);
    bins.forEach(bin => {
        bin.removeEventListener("dragover", dragOver);
        bin.removeEventListener("drop", drop);
    });
    // 移除页面滚动阻止
    document.body.removeEventListener('touchmove', preventDefaultHandler);
}


// 显示错误分类弹窗
function showIncorrectModal(isFailure) {
    let message;
    const itemImage = `<img src="images/examples/${currentItem.name}.png" alt="${currentItem.name}" class="modal-item-image">`;  // 图片插入
    if (isFailure) {
        message = `归类失败！${currentItem.name} 属于 ${getChineseCategory(currentItem.category)} 垃圾。${currentItem.description}`;
    } else {
        message = `错误分类！${currentItem.name} 属于 ${getChineseCategory(currentItem.category)} 垃圾。${currentItem.description}`;
    }
    
    modalMessage.innerHTML = itemImage + message;  // 将图片和文本合并显示
    modal.style.display = "block";
    
    // 确保每次点击“再来一次”时，都会重新绑定事件监听器
    modalContinue.removeEventListener("click", continueGame);  // 移除之前的监听器
    modalContinue.addEventListener("click", continueGame);     // 重新绑定点击事件
}

// 获取中文类别
function getChineseCategory(category) {
    switch (category) {
        case "hazardous":
            return "有害垃圾";
        case "recyclable":
            return "可回收物";
        case "wet":
            return "厨余垃圾";
        case "dry":
            return "其他垃圾";
        default:
            return "";
    }
}


// 继续游戏
function continueGame() {
    modal.style.display = "none";
    modalContinue.removeEventListener("click", continueGame);
    isGamePaused = false;
    startItemTimer();
    startGameTimer();
    bins.forEach(bin => {
        bin.addEventListener("dragover", dragOver);
        bin.addEventListener("drop", drop);
    });
    // 阻止页面滚动
    document.body.addEventListener('touchmove', preventDefaultHandler, { passive: false });
}


// 阻止默认触摸事件
function preventDefaultHandler(event) {
    event.preventDefault();
}

// 初始化游戏
startGame();
