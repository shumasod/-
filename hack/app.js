resources/js/app.js
import Vue from 'vue';

const app = new Vue({
    el: '#app',
});

app.component('hacked-pc', {
    template: `
        <div>
            <h1>このPCハッキングされたよ！</h1>
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
                alert('このPCハッキングされたよ！');
            }
        }
    }
});
