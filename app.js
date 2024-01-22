resources/js/app.js
import Vue from 'vue';

const app = new Vue({
    el: '#app',
});

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
        app.$refs.gohanOk.sayGohanOk();
    }
}, 1000);
