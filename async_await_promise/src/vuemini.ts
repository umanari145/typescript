
import axios from "axios";
import { ref, onMounted } from 'vue';

type City = {
    // 11:東京、12:千葉など・・・
    [key: number]: string;
}

type Town = {
    // 1a:千葉市、1b:船橋市など・・・
    [key: string]: string;
}

type Hobby = {
    // a:野球、b:サッカーなど・・・
    [key: string]: string;
}

export const App = {
    setup: () => {
        const cities = ref({});
        const towns = ref({});
        const message = ref('hoge');
        const selected_pref = ref('');
        const selected_town = ref(undefined);

        onMounted(async () => {
            const pref_url:string = 'http://localhost/async_await_promise/city.php?type=city';
            const hobbies_url:string = 'http://localhost/async_await_promise/hobbies.php';

            try {
                // const res:AxiosResponse<City> = await axios.get(pref_url);

                // 両方取得確認
                const res = await Promise.all([
                    axios.get(pref_url),
                    axios.get(hobbies_url)
                ])

                const {data} =res[0];
                // const {data1} =res[1];
                cities.value = data;

            } catch(e) {
                console.log(e);
            }
        })

        const changePref = async()=> {
            try {
                const town_url:string = `http://localhost/async_await_promise/city.php?type=town&pref_code=${selected_pref.value}`;
                const res: { data: Town; status: number; } = await axios.get(town_url)
                const { data, status } = res;
                if (status === 200) {
                    towns.value = data;
                }
            } catch(e) {
                console.log(e);
            }

        }

        return {
            changePref,
            message,
            selected_pref,
            selected_town,
            cities,
            towns
        }
    }
}

