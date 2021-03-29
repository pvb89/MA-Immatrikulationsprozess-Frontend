import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#CC0A2F',
                secondary: '#16cebc',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    }
});