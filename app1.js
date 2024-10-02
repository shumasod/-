import { createApp } from 'vue';

const app = createApp({});
app.component('gohan-ok', {
    template: `
        <div>
            <h1>ごはんですよ！</h1>
        </div>
    `,
    mounted() {
        this.sayGohanOk();
    },
    methods: {
        sayGohanOk() {
            alert('ごはんですよ！');
        }
    }
});

// 18時になると、ごはんですよ！とアラートを表示する
setInterval(() => {
    if (new Date().getHours() === 18) {
        app.component('gohan-ok').sayGohanOk();
    }
}, 1000);

app.mount('#app');
