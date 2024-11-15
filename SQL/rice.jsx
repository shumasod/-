import { createApp, ref } from 'vue';

const app = createApp({
    setup() {
        const count = ref(0);
        return { count };
    }
});

app.component('gohan-yobare', {
    template: `
        <div class="shoji-background">
            <div class="washoku-container">
                <h1 class="shoji-moji">ごはんでございます ({{ count }}回目)</h1>
                <button @click="sayGohanOk" :disabled="count >= 1000">ごはんを呼ぶ</button>
                <div v-if="count >= 1000" class="completion-message">
                    1000回のごはんの呼びかけが完了いたしました。
                </div>
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
    .shoji-background {
        background-color: #f5e8d3;
        background-image: 
            linear-gradient(#d1bc8a 1px, transparent 1px),
            linear-gradient(90deg, #d1bc8a 1px, transparent 1px);
        background-size: 20px 20px;
        padding: 40px;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .washoku-container {
        background-color: rgba(245, 232, 211, 0.9);
        padding: 40px;
        border: 2px solid #8c6239;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 80%;
        margin: auto;
    }
    .shoji-moji {
        font-family: "Yu Mincho", "MS Mincho", serif;
        color: #4a4a4a;
        font-size: 2em;
        margin-bottom: 20px;
    }
    button {
        background-color: #8c6239;
        color: white;
        border: none;
        padding: 15px 30px;
        font-size: 1.2em;
        cursor: pointer;
        margin-top: 20px;
        transition: background-color 0.3s;
    }
    button:hover {
        background-color: #6d4c2c;
    }
    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
    .completion-message {
        margin-top: 20px;
        color: #4a4a4a;
        font-weight: bold;
        font-size: 1.2em;
    }
`;
document.head.appendChild(style);

app.mount('#app');
