import Vue from 'vue';

const app = new Vue({
    el: '#app',
});

app.component('gohan-yobare', {
    template: `
        <div class="washoku-container">
            <h1 class="shoji-moji">ごはんでございます</h1>
            <div class="ozara">
                <div class="gohan"></div>
                <div class="okazu"></div>
                <div class="misoshiru"></div>
            </div>
        </div>
    `,
    mounted() {
        this.yobikakeGohan();
    },
    methods: {
        yobikakeGohan() {
            const audio = new Audio('/path/to/gong.mp3');
            audio.play();
            setTimeout(() => {
                alert('ごはんでございます。どうぞお召し上がりくださいませ。');
            }, 1000);
        }
    }
});

// 18時になると、ごはんの時間をお知らせする
const yobikakeInterval = 60000; // 1分ごとにチェック
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 18 && now.getMinutes() === 0) {
        app.$refs.gohanYobare.yobikakeGohan();
    }
}, yobikakeInterval);

// スタイルの追加
const style = document.createElement('style');
style.textContent = `
    .washoku-container {
        background-color: #f5e8d3;
        padding: 20px;
        border: 2px solid #8c6239;
    }
    .shoji-moji {
        font-family: "Yu Mincho", "MS Mincho", serif;
        color: #4a4a4a;
    }
    .ozara {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }
    .gohan, .okazu, .misoshiru {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .gohan { background-color: #ffffff; }
    .okazu { background-color: #8c6239; }
    .misoshiru { background-color: #e6d2b5; }
`;
document.head.appendChild(style);
