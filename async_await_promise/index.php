<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>Step8</title>
    <style>
    [v-cloak] {
      display: none;
    }
  </style>
  </head>
  <body>
    <div id="app" v-cloak>
        {{message}}
        <div>
            <span>
                <select v-model="selected_pref" @change="changePref">
                    <option value="" ></option>
                    <option :value="pref_code" v-for="(city, pref_code) in cities" >{{city}}</option>
                </select>
            </span>
            <span>
                <select v-model="selected_town">
                    <option value=""></option>
                    <option :value="town_code" v-for="(town, town_code) in towns" >{{town}}</option>
                </select>
            </span>
        </div>
    </div>
    <script src="./dist/main.js?key=<?php echo time();?>"></script>
  </body>
</html>