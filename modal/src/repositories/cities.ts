import axios from "axios";

export class Cities {

    getPrefs = async () => {
        const town_url:string = `http://57.182.154.123/api/prefs`;
        const {data,status} = await axios.get(town_url)
        if (status === 200)  {
            return data
        }
    }
}