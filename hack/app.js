import Vue from 'vue';

const app = new Vue({
    el: '#app',
});

app.component('hacked-pc', {
    template: `
        <div class="hacked-pc-container">
            <div class="shoji-screen">
                <h1 class="hacked-pc-title">このPCハッキングされたよ！</h1>
                <p class="hacked-pc-subtitle">セキュリティに注意してください</p>
            </div>
        </div>
    `,
    mounted() {
        this.checkTime();
    },
    methods: {
        checkTime() {
            const now = new Date();
            const hour = now.getHours();
            if (hour === 18) {
                this.showCustomAlert();
            }
        },
        showCustomAlert() {
            const alertElement = document.createElement('div');
            alertElement.className = 'custom-alert';
            alertElement.innerHTML = `
                <div class="alert-content">
                    <h2>警告</h2>
                    <p>このPCハッキングされたよ！</p>
                    <button onclick="this.parentElement.parentElement.remove()">閉じる</button>
                </div>
            `;
            document.body.appendChild(alertElement);
        }
    }
});

// スタイルをコンポーネントに追加
const style = document.createElement('style');
style.textContent = `
    .hacked-pc-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f2e8d5;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect x="0" y="0" width="40" height="40" fill="none" stroke="%23d9c7a7" stroke-width="1"/></svg>');
        font-family: 'Noto Serif JP', serif;
    }
    .shoji-screen {
        background-color: rgba(255, 255, 255, 0.9);
        border: 20px solid #8b4513;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        padding: 40px;
        text-align: center;
    }
    .hacked-pc-title {
        font-size: 2.5rem;
        color: #8b4513;
        margin-bottom: 20px;
        writing-mode: vertical-rl;
        text-orientation: upright;
        display: inline-block;
    }
    .hacked-pc-subtitle {
        font-size: 1.2rem;
        color: #5c3317;
    }
    .custom-alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .alert-content {
        background-color: #f2e8d5;
        border: 10px solid #8b4513;
        padding: 20px;
        text-align: center;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }
    .alert-content h2 {
        color: #8b4513;
        font-size: 1.8rem;
        margin-bottom: 10px;
    }
    .alert-content p {
        color: #5c3317;
        font-size: 1.2rem;
        margin-bottom: 20px;
    }
    .alert-content button {
        background-color: #8b4513;
        color: #f2e8d5;
        border: none;
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .alert-content button:hover {
        background-color: #5c3317;
    }
`;
document.head.appendChild(style);
