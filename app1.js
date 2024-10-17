import { createApp, ref } from 'vue';

const app = createApp({
    setup() {
        const count = ref(0);
        return { count };
    }
});

app.component('gohan-yobare', {
    template: `
        <div class="washoku-container">
            <h1 class="shoji-moji">ごはんでございます ({{ count }}回目)</h1>
            <button @click="sayGohanOk" :disabled="count >= 1000">ごはんを呼ぶ</button>
            <div v-if="count >= 1000" class="completion-message">
                1000回のごはんの呼びかけが完了いたしました。
            </div>
        </div>
    `,
    methods: {
        sayGohanOk() {
            if (this.count < 1000) {
                this.count++;
                const audio = new Audio('/path/to/gong.mp3');
                audio.play();
                setTimeout(() => {
                    alert(`ごはんでございます。${this.count}回目のお知らせでございます。`);
                }, 500);
            }
        }
    }
});

// 18時になると、自動的にごはんの呼びかけを開始する
const yobikakeInterval = 60000; // 1分ごとにチェック
let isYobikakeStarted = false;

setInterval(() => {
    const now = new Date();
    if (now.getHours() === 18 && !isYobikakeStarted) {
        isYobikakeStarted = true;
        const yobikakeLoop = setInterval(() => {
            const gohanYobare = app.config.globalProperties.$refs.gohanYobare;
            if (gohanYobare && gohanYobare.count < 1000) {
                gohanYobare.sayGohanOk();
            } else {
                clearInterval(yobikakeLoop);
            }
        }, 3000); // 3秒ごとに呼びかけ
    }
}, yobikakeInterval);

// スタイルの追加
const style = document.createElement('style');
style.textContent = `
    .washoku-container {
        background-color: #f5e8d3;
        padding: 20px;
        border: 2px solid #8c6239;
        text-align: center;
    }
    .shoji-moji {
        font-family: "Yu Mincho", "MS Mincho", serif;
        color: #4a4a4a;
    }
    button {
        background-color: #8c6239;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 20px;
    }
    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
    .completion-message {
        margin-top: 20px;
        color: #4a4a4a;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

app.mount('#app');
