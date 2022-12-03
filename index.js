
//import fetch from 'node-fetch';
"use strict";
//900260479535034400 900332902376689695
const express = require('express');
const app = express();
const port = 8888;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

app.all('/', (req, res) => {
  res.send('Your bot is alive!')
})

require('dotenv').config();
const { createCanvas, loadImage } = require('canvas')
var Chart = require('chart.js');
var TinyURL = require('tinyurl');
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
var mysql = require('mysql');
var makeShortUrl = require("@short-url/shorturl").makeShortUrl;
const QuickChart = require('quickchart-js');
let fetch = require('node-fetch');
let {
  Client,
  Intents
} = require('discord.js');
const Discord = require("discord.js");
//"iopjklnm44@"
const {
  input, dblist
} = require("./input.json")

const {
  token
} = process.env.DISCORD_TOKEN // use the require method

const ytdl = require('ytdl-core');//music bot
const { prefix } = require('./config.json');//music bot

const client = new Client({
  intents: [Intents.FLAGS.GUILDS]
});
const mySecret = process.env['password'];

const usr = process.env['USERNAME'];

const db = process.env['DATABASE'];


const host = process.env['HOST'];

let array = [];
// function to get the raw data
const getRawData = (URL) => {
  return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

// URL for data
let item = "乾淨滅龍";
let section = 0;
let blank = 0;
let bool = true
let URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
let maxrange = 7000;
let minrange = 2000;
let count = 0;
let map = new Map();
let result = "";
let msging = true;
// start of the program
client.on("ready", () => {
  client.login(token);
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("輸入help");
  //console.log(client.channels.cache.get("418076288625016834").send("login...."));
})

//取得單屬性的屬性相剋
const type=["一般","格鬥","飛行","毒","地面","岩石","蟲","幽靈","鋼","火","水","草","電","超能力","冰","龍","惡","妖精"];
function getType1(keywords){
    let q=[];
    if(keywords===type[0]){
        q=[1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];//一般
    }else if(keywords===type[1]){
        q=[1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 2];//格鬥
    }else if(keywords===type[2]){
        q=[1, 0.5, 1, 1, 0, 2, 0.5, 1, 1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1];//飛行
    }else if(keywords===type[3]){
        q=[1, 0.5, 1, 0.5, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 2, 1, 1, 1, 0.5];//毒
    }else if(keywords===type[4]){
        q=[1, 1, 1, 0.5, 1, 0.5, 1, 1, 1, 1, 2, 2, 0, 1, 2, 1, 1, 1];//地面
    }else if(keywords===type[5]){
        q=[0.5, 2, 0.5, 0.5, 2, 1, 1, 1, 2, 0.5, 2, 2, 1, 1, 1, 1, 1, 1];//岩石
    }else if(keywords===type[6]){
        q=[1, 0.5, 2, 1, 0.5, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 1, 1];//蟲
    }else if(keywords===type[7]){
        q=[0, 0, 1, 0.5, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1];//幽靈
    }else if(keywords===type[8]){
        q=[0.5, 2, 0.5, 0, 2, 0.5, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 1, 0.5];//鋼
    }else if(keywords===type[9]){
        q=[1, 1, 1, 1, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 0.5, 1, 1, 0.5];//火
    }else if(keywords===type[10]){
        q=[1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 2, 2, 1, 0.5, 1, 1, 1];//水
    }else if(keywords===type[11]){
        q=[1, 1, 2, 2, 0.5, 1, 2, 1, 1, 2, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1];//草
    }else if(keywords===type[12]){
        q=[1, 1, 0.5, 1, 2, 1, 1, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 1, 1, 1];//電
    }else if(keywords===type[13]){
        q=[1, 0.5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0.5, 1, 1, 2, 1];//超能力
    }else if(keywords===type[14]){
        q=[1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 0.5, 1, 1, 1];//冰
    }else if(keywords===type[15]){
        q=[1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 2, 2, 1, 2];//龍
    }else if(keywords===type[16]){
        q=[1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 0, 1, 1, 0.5, 2];//惡
    }else if(keywords===type[17]){
        q=[1, 0.5, 1, 2, 1, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0.5, 1];//妖精
    }else
        return;
    return q;
}

//取得雙屬性的屬性相剋
function getType2(keywords1,keywords2){
    let type1=getType1(keywords1);
    let type2=getType1(keywords2);
    if(type1!=null & type2!=null){
        let typeWeak=[];
        for(let i=0; i<type1.length; i++){
            typeWeak[i]=type1[i]*type2[i];
        }
        return typeWeak;
    }else
        return;
}

//找尋寶可夢百科該寶可夢的頁面
async function searchPokeWikiPage(keywords) {
  try{
      const wikiURL="https://wiki.52poke.com/zh-hant/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89";
      const constWikiData = await getRawData(wikiURL);
      let data = constWikiData;
      let index_top = data.search(`title="${keywords}"></span></a>`);
      data = data.substr(index_top);
      index_top = data.search('<a href="/wiki') + 14;
      let index_bottom = data.search('" title=');
      data = data.substr(index_top, index_bottom - index_top);
      if(data!=""){
      let URL= "https://wiki.52poke.com/zh-hant" + data;
      const constdata = await getRawData(URL);
      //<a href="/wiki/%E7%81%AB%E6%81%90%E9%BE%99" title="火恐龍">火恐龍</a>
      return constdata;
      }else
          return;
      
  }
  catch (e){
      console.log(e);
  }
  
}

//找尋種族值
async function searchBaseStats(keywords){
  let data = await searchPokeWikiPage(keywords);
  if( data != null){
      let blank=0;
      let i= 0;
      let q=[];
      let index_top="";
      let formChangeData=data;
      let index_bottom="";
      let formChangeType=[];
      let t="";
      while(blank<20){
          index_top=formChangeData.search(`<div class="tabbertab" title="`)+30;
          formChangeData=formChangeData.substr(index_top);
          index_bottom = formChangeData.search(`">\n<table class="bg`);
          if(index_bottom < 100 && index_top != 29){  
              formChangeType[i]= formChangeData.substr(0, index_bottom);
              i++;
          }else{
              blank++;
          }
      }
      if(formChangeType.length!=0){
          for(let i=0;i<formChangeType.length;i++){
              for(let j=0;j<7;j++){
                  index_top = data.search(`<div style="float:right">`)+25;
                  data = data.substr(index_top);
                  index_bottom = data.search('</div>');
                  let baseStats = data.substr(0, index_bottom);
                  q[j] = baseStats;
              }
              t+=`${formChangeType[i]} => HP:${q[0]}, 攻擊:${q[1]}, 防禦:${q[2]}, 特攻:${q[3]}, 特防:${q[4]}, 速度:${q[5]}, 總和:${q[6]}\n`;
          }
      }else{
          for(let i=0;i<7;i++){
              index_top = data.search(`<div style="float:right">`)+25;
              data = data.substr(index_top);
              index_bottom = data.search('</div>');
              let baseStats = data.substr(0, index_bottom);
              q[i] = baseStats;
          }
          t= `HP:${q[0]}, 攻擊:${q[1]}, 防禦:${q[2]}, 特攻:${q[3]}, 特防:${q[4]}, 速度:${q[5]}, 總和:${q[6]}`;
      }
      return t;

  }
  else{
      return;
  }
}

//找尋捕獲率
async function searchCatchPR(keywords){
  let data = await searchPokeWikiPage(keywords);
  if( data != null){
      let catchPR=[];
      let index_top = data.search(`">捕獲率</a>`);
      data = data.substr(index_top);
      index_top = data.search(`bw-1">`)+6; 
      let index_bottom = data.search(`<small>`);
      catchPR[0] = data.substr(index_top, index_bottom-index_top);
      index_top = data.search(`普通的精靈球在滿體力下的捕獲率">`)+17;
      index_bottom = data.search(`</span>`);
      catchPR[1] = data.substr(index_top, index_bottom-index_top);
      return catchPR;
  }
  else
      return;
}

//搜尋寶可夢的特性
async function searchAbility(keywords){
  let data = await searchPokeWikiPage(keywords);
  if( data != null){
      let abilityData=data;
      let index_top="";
      let index_top_last="";
      let index_bottom="";
      let formChangeData="";
      let formChange=[];
      //判斷該寶可夢有幾個型態變化
      for(let i=0;i<6;i++){
          index_top=data.search(`_toggler_hide-form6">`)+21;
          index_top_last=data.search(`_toggler_show-form6">`)+21;
          if(index_top!=20){
              data=data.substr(index_top);
              index_bottom=data.search("\n</th></tr>");
              formChangeData=data.substr(0,index_bottom);
              if(formChangeData!="")
                  formChange[i]=formChangeData;
          }else if(index_top_last!=20){
              data=data.substr(index_top_last);
              index_bottom=data.search("\n</th></tr>");
              formChangeData=data.substr(0,index_bottom);
              if(formChangeData!="")
                  formChange[i]=formChangeData;
          }
      }
      //如果有型態變化，就用迴圈把每個型態的特性都找出來
      if(formChange.length!=0){
          let title=`${keywords}有${formChange.length}種型態\n\n`;
          let t="";
          let t2="";
          let abilityCheak=[];
          let tempArray=[];
          for(let i=0;i<formChange.length;i++){
              let ability=[];
              index_top=abilityData.search(`title="特性">特性</a></b>`)+25;
              abilityData=abilityData.substr(index_top);
              index_bottom=abilityData.search(`</td></tr></tbody></table>`);
              let tempData=abilityData.substr(0,index_bottom);
              index_top=tempData.search(`（特性）">`)+6;
              let j=0;
              do{
                  tempData=tempData.substr(index_top);
                  index_bottom=tempData.search(`</a>`);
                  ability[j]=tempData.substr(0,index_bottom);
                  tempArray[j]=tempData.substr(0,index_bottom);
                  index_top=tempData.search(`（特性）">`)+6;
                  j++;
              }while(index_top!=5);
              t=`${formChange[i]} 特性為`;
              for(let i=0;i<ability.length;i++){
                  t+=ability[i]+"、";
              }
              t2+=t.substring(0, t.length-1);
              t2+="\n\n";
              for(let i=0;i<ability.length;i++){
                  //如果有重複，印一次就好
                  let temp=await searchAbilityDetail(ability[i]);
                  if(t2.search(temp)===-1)
                      t2+=temp+"\n";
              }
              abilityCheak[i]=ability;
          }
          return title+t2;
      }//如果該寶可夢沒有型態變化，就只找一次特性
      else{
          let ability=[];
          index_top=data.search(`title="特性">特性</a></b>`)+25;
          data=data.substr(index_top);
          index_bottom=data.search(`</td></tr></tbody></table>`);
          data=data.substr(0,index_bottom);
          index_top=data.search(`（特性）">`)+6;
          let i=0;
          do{
              data=data.substr(index_top);
              index_bottom=data.search(`</a>`);
              ability[i]=data.substr(0,index_bottom);
              index_top=data.search(`（特性）">`)+6;
              i++;
          }while(index_top!=5);
          let t=`${keywords}的特性為`;
          for(let i=0;i<ability.length;i++){
              t+=ability[i]+"、";
          }
          let t2=t.substring(0, t.length-1);
          t2+="\n\n";
          for(let i=0;i<ability.length;i++){
              t2+=await searchAbilityDetail(ability[i]);
          }
          return t2;
      }
  }else
      return;
}

//搜尋特性的詳細資料
async function searchAbilityDetail(keywords){
  let URL="https://wiki.52poke.com/zh-hant/"+keywords+"（特性）";
  let data=await getRawData(URL);
  let index_top=data.search(`對戰中</span></h3>`);
  let index_bottom="";
  let t="";
  if(index_top!=-1){
      t+="對戰中：";
      data=data.substr(index_top);
      index_top=data.search(`<p>`)+3;
      index_bottom=data.search(`<span id=`);
      let tempData=data.substr(index_top,index_bottom-index_top);
      index_bottom=tempData.search(`<a href=`);
      while(index_bottom!=-1){
          t+=tempData.substr(0,index_bottom);
          index_top=tempData.search(`">`)+2;
          tempData=tempData.substr(index_top);
          index_bottom=tempData.search(`</a>`);
          t+=tempData.substr(0,index_bottom);
          index_top=tempData.search(`</a>`)+4;
          tempData=tempData.substr(index_top);
          index_bottom=tempData.search(`<a href=`);
      }
      t+=tempData;
  }
  index_top=data.search(`對戰外</span></h3>`);
  if(index_top!=-1){
      t+="對戰外：";
      data=data.substr(index_top);
      index_top=data.search(`<p>`)+3;
      index_bottom=data.search(`<span id=`);
      let tempData=data.substr(index_top,index_bottom-index_top);
      index_bottom=tempData.search(`<a href=`);
      while(index_bottom!=-1){
          t+=tempData.substr(0,index_bottom);
          index_top=tempData.search(`">`)+2;
          tempData=tempData.substr(index_top);
          index_bottom=tempData.search(`</a>`);
          t+=tempData.substr(0,index_bottom);
          index_top=tempData.search(`</a>`)+4;
          tempData=tempData.substr(index_top);
          index_bottom=tempData.search(`<a href=`);
      }
      t+=tempData;
  }
  //把說明文裡面不必要的符號刪除
  for(let i=0;i<20;i++){
      t=t.replace("\n","");
      t=t.replace("<p>","");
      t=t.replace("</p>","");
      t=t.replace("<li>","");
      t=t.replace("</li>","");
      t=t.replace("<ul>","");
      t=t.replace("</ul>","");
      t=t.replace("<h3>","");
      t=t.replace("<h2>","");
      t=t.replace("</sup>&#8260;<sub>","/");
      t=t.replace("</sub>","");
      t=t.replace("<sup>","");
      t=t.replace("</sup>","");
      t=t.replace("<b>","");
      t=t.replace("</b>","");
      t=t.replace('<span class="t-绿宝石">E</span>',"（綠寶石）");
  }
  if(t!=""){
      return `${keywords}的效果\n${t}\n\n`;
  }else
      return;
}

//把官方寶可夢圖鑑上的簡易資料抓下來
async function searchPokedexNumber(keywords){
  const pokedexURL=`https://tw.portal-pokemon.com/play/pokedex/${keywords}`;
  let data=await getRawData(pokedexURL);
  let errJU=data.search(`<div class="page-other__heading">Page not found!</div>`);
  if(errJU ===-1){
      //取得寶可夢的名稱
      let index_top=data.search(`pokemon-slider__main-name size-35">`)+35;
      data=data.substr(index_top);
      let index_bottom=data.search(`</p>`);
      let pokeName=data.substr(0,index_bottom);

      //取得寶可夢的副名稱(如果有)
      index_top=data.search(`pokemon-slider__main-subname size-20">`)+38;
      data=data.substr(index_top);
      index_bottom=data.search(`</p>`);
      let pokeSubName=data.substr(0,index_bottom);
      if(pokeSubName!="")
          pokeSubName=`(${pokeSubName})`;

      //取得寶可夢形象圖的連結
      index_top=data.search('<img class="pokemon-img__front"')+37;
      data=data.substr(index_top);
      index_bottom=data.search(`">`);
      let imgURL=data.substr(0,index_bottom);
      imgURL=`https://tw.portal-pokemon.com${imgURL}`;

      //取得寶可夢的屬性
      index_top=data.search(`pokemon-type__title size-20">`);
      index_bottom=data.search(`<div class="pokemon-main__bottom-left">`);
      let typeData=data.substr(index_top,index_bottom-index_top);
      let pokeType="";
      index_top=typeData.search(`<span>`)+6;
      do{
          typeData=typeData.substr(index_top);
          index_bottom=typeData.search(`</span>`);
          pokeType+=typeData.substr(0,index_bottom)+"、";
          index_top=typeData.search(`<span>`)+6;
      }while(index_top!=5);
      let pokeType2=pokeType.substring(0, pokeType.length-1);
      /*if(index_top!=5){
          index_bottom=typeData.search(`</span>`);
          pokeType[1]=typeData.substr(index_top,index_bottom-index_top);
      }*/

      //取得寶可夢的弱點屬性
      index_top=data.search(`pokemon-weakness__title size-20">`);
      index_bottom=data.search(`<div class="pokemon-main__right">`);
      let typeWeakData=data.substr(index_top,index_bottom-index_top);
      let typeWeak="";
      index_top=typeWeakData.search(`<!-- <span>`)+11;
      do{
          typeWeakData=typeWeakData.substr(index_top);
          index_bottom=typeWeakData.search(`</span>`);
          typeWeak+=typeWeakData.substr(0,index_bottom)+"、";
          index_top=typeWeakData.search(`<!-- <span>`)+11;
      }while(index_top!=10);
      let typeWeak2=typeWeak.substring(0, typeWeak.length-1);

      //取得身高
      index_top=data.search(`pokemon-info__value size-14">`)+29;
      data=data.substr(index_top);
      index_bottom=data.search(`</span>`);
      let height=data.substr(0,index_bottom);

      //取得分類
      index_top=data.search(`pokemon-info__value size-14"><span>`)+35;
      data=data.substr(index_top);
      index_bottom=data.search(`</span></span>`);
      let pokeClass=data.substr(0,index_bottom);

      //取得體重
      index_top=data.search(`pokemon-info__value size-14">`)+29;
      data=data.substr(index_top);
      index_bottom=data.search(`</span>`);
      let weight=data.substr(0,index_bottom);

      //取得性別
      index_top=data.search(`pokemon-info__value size-14">`)+29;
      data=data.substr(index_top);
      index_bottom=data.search(`pokemon-info__title size-14">特性</span>`);
      let genderData=data.substr(0,index_bottom);
      let male=genderData.search(`icon_male.png`);
      let female=genderData.search(`icon_female.png`);
      if(female!=-1 && male!=-1)
          genderData="公／母";
      else if(female===-1 && male!=-1)
          genderData="只有公的";
      else if(female!=-1 && male===-1)
          genderData="只有母的";
      else
          genderData="無性別";

      //取得簡易特性
      index_top=data.search(`<transition name="pokemon-info__fade">`)+38;
      data=data.substr(index_top);
      index_bottom=data.search(`</transition>`);
      let AbilityData=data.substr(0,index_bottom);
      let Ability="";
      index_top=AbilityData.search(`pokemon-info__value--title size-18">`)+36;
      do{
          AbilityData=AbilityData.substr(index_top);
          index_bottom=AbilityData.search(`</span>`);
          Ability+=AbilityData.substr(0,index_bottom)+"、";
          index_top=AbilityData.search(`pokemon-info__value--title size-18">`)+36;
      }while(index_top!=35);
      let Ability2=Ability.substring(0, Ability.length-1);
      if(Ability2==="")
          Ability2="無";

      //取得圖鑑介紹(版本隨機)
      index_top=data.search(`pokemon-story__title size-20">圖鑑版本</span>`)+45;
      data=data.substr(index_top);
      index_bottom=data.search(`pokemon-stats__status-wrapper">`);
      let pokeStory=data.substr(0,index_bottom);
      index_top=pokeStory.search(`<span>`)+6;
      let storyA=[];
      let i=0;
      do{
          pokeStory=pokeStory.substr(index_top);
          index_bottom=pokeStory.search(`</span>`);
          storyA[i]=pokeStory.substr(0,index_bottom);
          index_top=pokeStory.search(`<span>`)+6;
          i++;
      }while(index_top!=5);
      let story="";
      let Random=Math.random()*100;
      if(storyA.length===3){
          if(Random >= 67)
              story=storyA[2];
          else if(Random>=33 && Random<67)
              story=storyA[1];
          else
              story=storyA[0];
      }else if(storyA.length===2){
          if(Random>50)
              story=storyA[1];
          else
              story=storyA[0];
      }else
          story=storyA[0];


      let t=`編號${keywords} ${pokeName}${pokeSubName}\n${imgURL}\n屬性：${pokeType2}\n弱點：${typeWeak2}\n分類：${pokeClass}\n身高：${height} ｜體重：${weight}\n特性：${Ability2} ｜性別：${genderData}\n簡介：${story}`;
      return t;
  }else
      return;
}

//搜尋同一隻寶可夢的不同樣子
async function searchStyle(keywords){
  const pokedexURL=`https://tw.portal-pokemon.com/play/pokedex/${keywords}`;
  let data=await getRawData(pokedexURL);
  let errJU=data.search(`<div class="page-other__heading">Page not found!</div>`);
  if(errJU===-1){
      let styleName=[];
      let countA=[];
      let i=0;
      let index_top=data.search(`pokemon-style-box__name size-16">`)+33;
      while(index_top!=32){
          data=data.substr(index_top);
          let index_bottom=data.search(`</span>`);
          let name=data.substr(0,index_bottom);
          index_top=data.search(`pokemon-style-box__subname size-14">`)+36;
          data=data.substr(index_top);
          index_bottom=data.search(`</span>`);
          let subName=data.substr(0,index_bottom);
          if(subName!="")
              name+=`（${subName}）`;
          styleName[i]=name;
          countA[i]=`${i}`;
          i++;
          index_top=data.search(`pokemon-style-box__name size-16">`)+33;
      }
      if(styleName.length!=0)
          return [styleName,countA];
      else
          return;
  }else
      return;
}

//用寶可夢百科的全國圖鑑當依據，搜尋寶可夢的圖鑑編號
async function pokeNameToNumber(keywords){
  const wikiURL="https://wiki.52poke.com/zh-hant/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89";
  let data = await getRawData(wikiURL);
  let index_top=data.search(`" title="${keywords}">`)-100;
  if(index_top!=-101){
      data=data.substr(index_top);
      index_top=data.search(`<td>#`)+5;
      let index_bottom=data.search(`\n</td>\n<td><a href`);
      data=data.substr(index_top,index_bottom-index_top);
      return data;
  }
  return;
}

//把名字轉換成編號，再丟回給官方圖鑑印下詳細資料
async function searchPokedexName(keywords){
  let data=await pokeNameToNumber(keywords);
  data=await searchPokedexNumber(data);
  return data;
}

//尋找寶可夢的屬性
async function getTypeName(keywords){
  let data=await pokeNameToNumber(keywords);
  if(data!=null){
      let URL="https://tw.portal-pokemon.com/play/pokedex/"+data;
      data=await getRawData(URL);
      let index_top=data.search(`pokemon-type__title size-20">`);
      if(index_top!=-1){
        let index_bottom=data.search(`<div class="pokemon-main__bottom-left">`);
        data=data.substr(index_top,index_bottom-index_top);
        let pokeType=[];
        index_top=data.search(`<span>`)+6;
        let i=0;
        do{
            data=data.substr(index_top);
            index_bottom=data.search(`</span>`);
            pokeType[i]=data.substr(0,index_bottom);
            index_top=data.search(`<span>`)+6;
            i++;
        }while(index_top!=5);
        return pokeType;
      }else
        return;
  }else{
    return;
  }
}



client.on("message", async msg => {

  if (msg.content === "!蒼彼"){
    msg.channel.send("《蒼之彼方的四重奏》是由sprite在2014年發售的一款成人向美少女遊戲。\n"+
    "劇情圍繞在名為「Flying Circus」（簡稱FC）的虛構運動上，這是一種使用反重力鞋在空中進行的競技運動。\n"+
    "遊戲講述了主角日向晶也與社團夥伴們在這個競技上交織成的一部熱血、青春的戀愛物語。\n"+
    "本作在2016年1月動畫化，並於2016年2月發售全年齡版本至PSV上，隨後也發售了PS4、NS等版本。\n"+
    "2019年9月登上steam，並且有日文、英文、繁中、簡中四種語言可以選擇。\n"+
    "steam發售頁面：https://store.steampowered.com/app/1044620/");
    msg.channel.send("???：我認為每個人都應該玩過一遍蒼彼，一起來感受真白有多麼可愛。\n"+
    "https://i.imgur.com/2jR5xEZ.jpg");
  }

  if (msg.content === "!韓職"){
    msg.channel.send(`Twitch: https://www.twitch.tv/kartrideresports`);
    msg.channel.send(`Youtube: https://www.youtube.com/@kartrideresports`);
  }

  if (msg.content === "!寶可夢指令"){
    msg.channel.send("以下為機器人支援的寶可夢相關指令\n"+
    "!寶可夢+名稱　!編號+圖鑑編號　=>　查詢寶可夢基本資料\n"+
    "!屬性(屬性名稱1,屬性名稱2)　!屬性+單屬性　!屬性+寶可夢　=>　查詢屬性相剋\n"+
    "!種族值+寶可夢　=>　查詢種族值\n!捕獲率+寶可夢　=>　查詢捕獲率\n"+
    "!特性+特性名稱　!特性+寶可夢　=>　查詢特性詳細資料（半成品）"+
    "以上指令'+'符號僅是為了方便閱讀，輸入時請無視\n\n"+
    "抓取的資料來源：寶可夢百科(https://wiki.52poke.com/)\n以及 寶可夢官網(https://tw.portal-pokemon.com/)\n"+
    "如果有查不到最新第九世代資料的問題，代表官網還沒更新，所以沒有資料\n\n");
  }

  if(msg.content.includes("!特性") && msg.content.includes("寶可夢相關指令")===false){
    let keywords=msg.content.replace("!特性","");
    let data=await searchAbility(keywords);
    if(data!=null){
        msg.channel.send(data);
    }else{
        data=await searchAbilityDetail(keywords);
        if(data!=null)
            msg.channel.send(data);
        else
            msg.channel.send("特性或是寶可夢名稱輸入錯誤！");
    }
  }

  if(msg.content.includes("!屬性(")  && msg.content.includes("格式輸入錯誤")===false && msg.content.includes("寶可夢相關指令")===false ){
    msg.content = msg.content.replace("!屬性(", "");
    msg.content = msg.content.replace(")", "");
    let q = msg.content.split(",");
    let typeWeak=[];
    let t=`這隻寶可夢的屬性相剋\n`;
    if(q.length!=2){
        msg.channel.send("格式輸入錯誤，格式為: !屬性(屬性名稱1,屬性名稱2) 或是在!屬性後面接單屬性");
    }else if(q[0]===q[1]){
        msg.channel.send("輸入屬性重複！");
    }else{
        typeWeak=getType2(q[0],q[1]);
        if(typeWeak!=null ){
            for(let i=0;i<type.length;i++){
                t+=`${type[i]}:${typeWeak[i]}倍, `;
            }
            msg.channel.send(t);
        }else
            msg.channel.send("屬性輸入錯誤，請檢查屬性名稱是否有誤（一般/格鬥/飛行/毒/地面/岩石/蟲/幽靈/鋼/火/水/草/電/超能力/冰/龍/惡/妖精）");
    }
  }

  if(msg.content.includes("!屬性") && msg.content.includes("!屬性(")===false && msg.content.includes("寶可夢相關指令")===false){
    let typeWeak = msg.content.replace("!屬性", "");
    let button=false;
    for(let i=0;i<type.length;i++){
        if(typeWeak===type[i]){
            button=true;
        }
    }
    if(button!=true){
        let q=[];
        let Name=typeWeak;
        q= await getTypeName(typeWeak);
        if(q!=null){
          if(q.length===2){
            typeWeak=getType2(q[0],q[1]);
            let t=`${Name}的屬性為${q[0]}和${q[1]} 屬性相剋如下\n`;
            for(let i=0;i<type.length;i++){
                t+=`${type[i]}:${typeWeak[i]}倍, `;
            }
            msg.channel.send(t);
          }else{
            typeWeak=getType1(q[0]);
            let t=`${Name}的屬性為${q[0]} 屬性相剋如下\n`;
            for(let i=0;i<type.length;i++){
                t+=`${type[i]}:${typeWeak[i]}倍, `;
            }
            msg.channel.send(t);
          }
        }else
          msg.channel.send("寶可夢名稱或是屬性輸入有誤！\n（一般/格鬥/飛行/毒/地面/岩石/蟲/幽靈/鋼/火/水/草/電/超能力/冰/龍/惡/妖精）");
    }else{
        let t=`這隻寶可夢的屬性相剋\n`;
        typeWeak=getType1(typeWeak);
        for(let i=0;i<type.length;i++){
            t+=`${type[i]}:${typeWeak[i]}倍, `;
        }
        msg.channel.send(t);
    }
  }

  if(msg.content.includes("!種族值") && msg.content.includes("寶可夢相關指令")===false){
    msg.content = msg.content.replace("!種族值", "");
    let keywords= msg.content;
    let t = await searchBaseStats(keywords);
    if( t != null){
        msg.channel.send(`${keywords}種族值如下\n${t}`);
    }
    else
        msg.channel.send("寶可夢名稱輸入有誤！");
  }

  if(msg.content.includes("!捕獲率") && msg.content.includes("寶可夢相關指令")===false){
    msg.content = msg.content.replace("!捕獲率", "");
    let keywords= msg.content;
    let catchPR = await searchCatchPR(keywords);
    if( catchPR != null){
        msg.channel.send(`捕獲率:${catchPR[0]}(${catchPR[1]})`);
        msg.channel.send("括號後的機率為一般精靈球在滿體力下的捕捉率");
    }
    else
        msg.channel.send("寶可夢名稱輸入有誤！");
  }

  if(msg.content.includes("!編號") && msg.content.includes("寶可夢相關指令")===false){
    msg.content = msg.content.replace("!編號", "");
    let keywords = msg.content;
    let pokeDex = await searchPokedexNumber(keywords);
    if(pokeDex!=null && msg.content.includes("_")===false){
        msg.channel.send(pokeDex);
        let styleData=await searchStyle(keywords);
        if(styleData!=null){
            const filter = (m) =>
                m.author.id === msg.author.id && styleData[1].indexOf(m.content)!=-1;
            let t=`這隻寶可夢還有${styleData[0].length-1}種型態，輸入對應編號可取得詳細資訊，若超過30秒未回應將自動終止。\n`;
            for(let i=1;i<styleData[0].length;i++){
                t+=`${styleData[1][i]}:${styleData[0][i]} `;
            }
            msg.channel.send(t);
            const collector = msg.channel.createMessageCollector(filter, {max: 1, time: 30000});
            collector.on("collect", async (msg2) => {
                if(msg2.content==="1"){
                    let data=await searchPokedexNumber(keywords+"_1");
                    msg.channel.send(data);
                }else if(msg2.content==="2"){
                    let data=await searchPokedexNumber(keywords+"_2");
                    msg.channel.send(data);
                }else if(msg2.content==="3"){
                    let data=await searchPokedexNumber(keywords+"_3");
                    msg.channel.send(data);
                }else if(msg2.content==="4"){
                    let data=await searchPokedexNumber(keywords+"_4");
                    msg.channel.send(data);
                }else if(msg2.content==="5"){
                    let data=await searchPokedexNumber(keywords+"_5");
                    msg.channel.send(data);
                }else 
                    collector.stop('time');
            });
            collector.on("end", (collected, reason) => {
                if ( reason === 'time') {
                    msg.channel.send("超過30秒，終止等待");
                }
                //console.log("stop");
            });

        }
    }
    else
        msg.channel.send("圖鑑編號輸入有誤！");
}

if(msg.content.includes("!寶可夢") && msg.content.includes("寶可夢相關指令")===false &&　msg.content!="!寶可夢指令"){
    msg.content = msg.content.replace("!寶可夢","");
    let keywords= msg.content;
    let pokeDex= await searchPokedexName(keywords);
    if(pokeDex!=null){
        msg.channel.send(pokeDex);
        let number=await pokeNameToNumber(keywords);
        let styleData=await searchStyle(number);
        if(styleData!=null){
            const filter = (m) =>
                m.author.id === msg.author.id && styleData[1].indexOf(m.content)!=-1;
            let t=`這隻寶可夢還有${styleData[0].length-1}種型態，輸入對應編號可取得詳細資訊，若超過30秒未回應將自動終止。\n`;
            for(let i=1;i<styleData[0].length;i++){
                t+=`${styleData[1][i]}:${styleData[0][i]} `;
            }
            msg.channel.send(t);
            const collector = msg.channel.createMessageCollector(filter, {max: 1, time: 30000});
            collector.on("collect", async (msg2) => {
                if(msg2.content==="1"){
                    let data=await searchPokedexNumber(number+"_1");
                    msg.channel.send(data);
                }else if(msg2.content==="2"){
                    let data=await searchPokedexNumber(number+"_2");
                    msg.channel.send(data);
                }else if(msg2.content==="3"){
                    let data=await searchPokedexNumber(number+"_3");
                    msg.channel.send(data);
                }else if(msg2.content==="4"){
                    let data=await searchPokedexNumber(number+"_4");
                    msg.channel.send(data);
                }else if(msg2.content==="5"){
                    let data=await searchPokedexNumber(number+"_5");
                    msg.channel.send(data);
                }else 
                    collector.stop('time');
            });
            collector.on("end", (collected, reason) => {
                if ( reason === 'time') {
                    msg.channel.send("超過30秒，終止等待");
                }
                //console.log("stop");
            });

        }
    }
    else
        msg.channel.send("寶可夢名稱輸入有誤！");
}

  const q = [3, 20, 100];
  // 如果訊息的內容包含 '!曬卡'
  if (msg.content.indexOf(`!曬卡`) > -1 && msg.content != "!曬卡機率" && msg.content != "!曬卡 作弊") {
    let e = ["<:anyapride:1043167915085672528>",
      "<:anyaGold:1043167887482945626>",
      "<:anya:967336847233679360>"];
    let t = "";
    let s = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        if (Math.random() * 100 < q[j]) {
          s += j;
          if (s == 20)
            t += e[1];
          else
            t += e[j];
          break;
        }
      }
    }
    // 處理字串，將 !曬卡 字串拿掉，只留下訊息內容
    let textDrawCard = msg.content.replace(`!曬卡`, '').trim();

    msg.channel.send(`${msg.member.displayName} -> ${textDrawCard}`);
    msg.channel.send(t);
    if (s > 18)
      msg.channel.send("(保底)");
  }

  if (msg.content === (`!曬卡 作弊`)){
    let e = "<:anyapride:1043167915085672528>";
    let t = "";
    for (let i = 0; i < 10; i++) {
      t += e;
    }

    msg.channel.send(`${msg.member.displayName} -> 作弊`);
    msg.channel.send(t);
    msg.channel.send("(保底十彩)");
  }

  if (msg.content === "!曬卡機率") {
    let pride = q[0];
    let gold = q[1] - q[0];
    let normal = q[2] - q[1];
    msg.channel.send(`彩色${pride}% 金色${gold}% 普通${normal}%`);
  }

  /*
  if(msg.content.includes("!編號")){
    msg.content = msg.content.replace("!編號", "");
    let pokedex=msg.content;
    let wikiURL="https://wiki.52poke.com/zh-hant/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89";
    let pokeURL="https://tw.portal-pokemon.com/play/pokedex/"+pokedex;
    const _constdata = await getRawData(wikiURL);
    const _constdata2 = await getRawData(pokeURL);
    let data = _constdata;
    let imgData = _constdata2;
    let errtop=imgData.search('<div class="page-other__heading">')+33;
    let errJU=imgData.substr(errtop,14);
    if(errJU != "Page not found"){
      let index_top=data.search("<td>#"+pokedex);
      data=data.substr(index_top);
      //<a href="/wiki/%E5%A6%99%E8%9B%99%E7%A7%8D%E5%AD%90" title="妙蛙種子"><span class="sprite-icon sprite-icon-001" title="妙蛙種子"></span></a>
      index_top=data.search('<a href="/wiki')+14;
      let index_bottom=data.search('" title=');
      data=data.substr(index_top,index_bottom-index_top);
    
      let wikiURL_2 = "https://wiki.52poke.com/zh-hant" + data;
      const _constdata3 = await getRawData(wikiURL_2);
      data = _constdata3;
      index_top=data.search('<span style="font-size:1.5em"><b>')+33;
      data = data.substr(index_top);
      index_bottom = data.search("</b>");
      let Name = data.substr(0, index_bottom);

      index_top= imgData.search('<img class="pokemon-img__front"')+37;
      let imgURL = imgData.substr(index_top);
      index_bottom = imgURL.search('">');
      imgURL = imgURL.substr(0, index_bottom);
      imgURL = "https://tw.portal-pokemon.com"+imgURL;
      msg.channel.send(Name+"\n"+imgURL);
      //console.log(imgURL);
    }
    else
      msg.channel.send("查無資料！請確認輸入編號是否正確");
  }

  if (msg.content.includes("!圖鍵編號")) {
    msg.content = msg.content.replace("!圖鍵編號", "");
    let pokedex=msg.content;
    let pokeURL="https://tw.portal-pokemon.com/play/pokedex/"+pokedex;
    const _constdata = await getRawData(pokeURL);
    let data = _constdata;
    
    let errtop=data.search('<div class="page-other__heading">')+33;
    let errJU=data.substr(errtop,14);
    if(errJU != "Page not found"){
      let index_top= data.search('<p class="pokemon-slider__main-name')+45;
      let Name = data.substr(index_top);
      let index_bottom = Name.search("</p>");
      Name = Name.substr(0, index_bottom);

      index_top= data.search('<img class="pokemon-img__front"')+37;
      let imgURL = data.substr(index_top);
      index_bottom = imgURL.search('">');
      imgURL = imgURL.substr(0, index_bottom);
      imgURL = "https://tw.portal-pokemon.com"+imgURL;

      msg.channel.send(Name+"\n"+imgURL);
    }
    else
      msg.channel.send("查無資料！請確認輸入編號是否正確");
      
  }*/

  if (msg.channel.id === "900260479535034400" ||
    msg.channel.id === "900332902376689695") {
    let item = "";
    let section = 0;
    let blank = 0;
    let bool = true
    let URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
    let maxrange = 50000;
    let minrange = 2000;
    let count = 0;
    let map = new Map();
    let result = "";
    var check = "&&1743";
    let search = false;

    function return_result() {
      return result;
    }
    const tyt = async function(item, maxrange, minrange) {
      result = "";

      // start of the program

      result = "";

      while (bool) {
        await sleep(200);
        const ttempp = "https://cors-anywhere.herokuapp.com/";
        URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
        //URL=ttempp.concat(URL);
        console.log(URL);
        const _constdata = await getRawData(URL);
        let data = _constdata;
        for (let i = 0; i < 26; i++) {
          let index_bottom = data.search("元</b>");
          data = data.substr(index_bottom - 10);
          let index_top = data.search("<b>") + 3;
          index_bottom = data.search("</b>") - 1;
          //console.log(data.substr(index_top, index_bottom - index_top));
          let temp = data.substr(index_top, index_bottom - index_top);

          temp = temp.replace(',', '');
          temp = parseInt(temp);

          if (temp > minrange && temp < maxrange && temp != 8591) {
            count++;
            if (data.substr(index_top, index_bottom - index_top) != "") array.push(temp);
          }
          if (data.substr(index_top, index_bottom - index_top) == "") blank++;
          data = data.substr(index_bottom + 100);

        }
        if (blank < 20) {
          section += 21;
          blank = 0;
        };
        if (blank >= 20) bool = false;
        if (section > 1200) bool = false;
      }
      array.sort(compareDecimals);
      console.log(array);
      let avg = 0;
      for (let i = 0; i < array.length; i++) {
        avg += array[i];
      }
      console.log(item + " 樣本數:" + count + " 平均價:" + (avg / count));
      result += item + " 樣本數:" + count + " 平均價格:" + (avg / count) + "\r";
      if (count < 50) {
        console.log("樣本數低於50 平均價格不夠準確");
        result += "樣本數低於50 平均價格不夠準確\r";
      }

      for (let i = 0; i < array.length; i++) {
        if (map.has(array[i])) {
          let num = map.get(array[i]);
          num++;
          map.set(array[i], num);
        }
        if (!map.has(array[i])) {
          map.set(array[i], 1);
        }

      }
      if (array.length > 0) {
        let time = parseInt(array.length / 15);
        let max = 0;
        let times = 0;
        let arr = [];


        let mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

        for (const [key, value] of mapSort1.entries()) {
          if (times != mapSort1.size && times <= time && value > 1) {
            arr.push(key);
            mapSort1.delete(key);
            times++;

          }

        }
        let arr_avg = 0;
        arr.sort(compareDecimals)
        //if (arr.length > 3) arr.pop();
        arr.reverse();
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          max += arr[i];
        }
        arr_avg = max / (arr.length);
        if (arr.length >= 3) {
          max = 0;
          let arrlen = arr.length;
          let ct = 0;

          let index = arr.length / 2;
          if (index < 2) {
            arr_avg = arr[1];

          } else if (index >= 2) {

            index = Math.floor(index);
            index = (index + arr.length - 1) / 2
            index = Math.floor(index)
            if (arr[index] / arr[index + 1] < 2) arr_avg = (arr[index] + arr[index + 1]) / 2;
            if (arr[index] / arr[index + 1] >= 2) arr_avg = arr[index];
          }
          if (arr.length > 25) {
            index = arr.length / 2;
            index = Math.floor(index);
            arr_avg = (arr[index] + arr[index + 1]) / 2;

          }

          //arr_avg=arr_avg/arr.length;
          console.log(arr_avg)
          for (let i = 0; i < 10; i++) {
            ct = 0;
            while (ct < arr.length) {

              if (arr[ct] / arr_avg >= 2) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg <= 0.5) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg < 2 || arr[ct] / arr_avg > 0.5) {
                if (i == 9) max += arr[ct]
                ct++;

              }



            }

          }
        }
        console.log(arr)

        mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
        let keys = Array.from(mapSort1.keys());
        keys.sort(compareDecimals);
        result += "\r\n建議最大最小價格設定值:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
        let possible_pr = 0;
        if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) * 0.9
        if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
        result += "\r\n可能最佳價格:\r\n" + possible_pr;
        // result += "\r\n最小可能價格:\r\n"
        /* if (keys.length >= 20) {
           for (let i = 0; i < 20; i++) {
             result += "\r\n" + keys[i];
           }
         } else if (keys.length < 20) {
           for (let i = 0; i < keys.length; i++) {
             result += "\r\n" + keys[i];
           }
         }*/
        array.length = 0

      }


      console.log(map)
      return map;

    };







    function reset() {
      section = 0;
      blank = 0;
      bool = true;
      map.clear();
      count = 0;
      result = "";

    }
    const fyi = async function(item, maxrange, minrange) {
      result = "";

      // start of the program
      let array = []
      result = "";

      while (bool) {
        await sleep(200);

        //URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
        URL = "https://www.8591.com.tw/mallList-list.html?searchGame=859&buyStatus=1&searchKey=" + item + "&firstRow=" + section;
        //URL=ttempp.concat(URL);
        console.log(URL);
        const _constdata = await getRawData(URL);
        let data = _constdata;
        for (let i = 0; i < 26; i++) {

          let index_bottom = data.search("元</b>");
          data = data.substr(index_bottom - 10);
          let index_top = data.search("<b>") + 3;
          index_bottom = data.search("</b>") - 1;
          //console.log(data.substr(index_top, index_bottom - index_top));
          let temp = data.substr(index_top, index_bottom - index_top);

          temp = temp.replace(',', '');
          temp = parseInt(temp);

          if (temp > minrange && temp < maxrange && temp != 8591) {
            count++;
            if (data.substr(index_top, index_bottom - index_top) != "") array.push(temp);
          }
          if (data.substr(index_top, index_bottom - index_top) == "") blank++;
          data = data.substr(index_bottom + 100);
        }
        if (blank < 20) {
          section += 21;
          blank = 0;
        };
        if (blank >= 20) bool = false;
        if (section > 1000) bool = false;
      }
      array.sort(compareDecimals);
      console.log(array);
      let avg = 0;
      for (let i = 0; i < array.length; i++) {
        avg += array[i];
      }
      console.log(item + " 樣本數:" + count + " 平均價:" + (avg / count));
      result += item + " 樣本數:" + count + " 平均價格:" + (avg / count) + "\r";
      if (count < 50) {
        console.log("樣本數低於50 平均價格不夠準確");
        result += "樣本數低於50 平均價格不夠準確\r";
      }

      for (let i = 0; i < array.length; i++) {
        if (map.has(array[i])) {
          let num = map.get(array[i]);
          num++;
          map.set(array[i], num);
        }
        if (!map.has(array[i])) {
          map.set(array[i], 1);
        }

      }
      if (array.length > 0) {
        let time = parseInt(array.length / 15);
        let max = 0;
        let times = 0;
        let arr = [];


        let mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

        for (const [key, value] of mapSort1.entries()) {
          if (times != mapSort1.size && times <= time && value > 1) {
            arr.push(key);
            mapSort1.delete(key);
            times++;

          }

        }
        let arr_avg = 0;
        arr.sort(compareDecimals)
        //if (arr.length > 3) arr.pop();
        arr.reverse();
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          max += arr[i];
        }
        arr_avg = max / (arr.length);
        if (arr.length >= 3) {
          max = 0;
          let arrlen = arr.length;
          let ct = 0;

          let index = arr.length / 2;
          if (index < 2) {
            arr_avg = arr[1];

          } else if (index >= 2) {

            index = arr.length / 2;
            index = Math.floor(index);
            arr_avg = (arr[index] + arr[index + 1]) / 2;
          }
          if (arr.length > 25) {
            index = arr.length / 2;
            index = Math.floor(index);
            arr_avg = (arr[index] + arr[index + 1]) / 2;

          }

          //arr_avg=arr_avg/arr.length;
          console.log(arr_avg)
          for (let i = 0; i < 10; i++) {
            ct = 0;
            while (ct < arr.length) {

              if (arr[ct] / arr_avg >= 1.5) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg <= 0.67) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg < 1.5 || arr[ct] / arr_avg > 0.67) {
                if (i == 9) max += arr[ct]
                ct++;

              }



            }

          }
        }
        console.log(arr)

        mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
        let keys = Array.from(mapSort1.keys());
        keys.sort(compareDecimals);
        result += "\r\n建議最大最小價格設定值:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
        let possible_pr = 0;
        if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) * 0.9
        if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
        result += "\r\n可能最佳價格:\r\n" + possible_pr;
        /* result += "\r\n最小可能價格:\r\n"
         if (keys.length >= 20) {
           for (let i = 0; i < 20; i++) {
             result += "\r\n" + keys[i];
           }
         } else if (keys.length < 20) {
           for (let i = 0; i < keys.length; i++) {
             result += "\r\n" + keys[i];
           }
         }*/
        array.length = 0

      }
      console.log(result)

      console.log(map)
      return map;
    };
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (msg.content === "乾淨滅龍") {
      item = "乾淨滅龍";
      maxrange = 7000;
      minrange = 2000;
      check = "乾淨滅龍";
      search = true;
    } else if (msg.content === "輪迴") {
      item = "輪迴";
      maxrange = 100000;
      minrange = 38000;
      check = "輪迴";
      search = true;
    } else if (msg.content === "武公寶珠") {
      item = "武公寶珠";
      maxrange = 7000;
      minrange = 3000;
      check = "武公寶珠";
      search = true;
    } else if (msg.content === "戰女") {
      item = "戰女";
      maxrange = 10000;
      minrange = 500;
      check = "戰女";
      search = true;
    } else if (msg.content === "戰男") {
      item = "戰男";
      maxrange = 10000;
      minrange = 500;
      check = "戰男";
      search = true;

    } else if (msg.content === "乾淨天上") {
      item = "乾淨天上";
      maxrange = 10000;
      minrange = 1000;
      check = "乾淨天上";
      search = true;
    } else if (msg.content === "燃燒戒指") {
      item = "燃燒戒指";
      maxrange = 10000;
      minrange = 1000;
      check = "燃燒戒指";
      search = true;
    } else if (msg.content === "艾戒") {
      item = "艾戒";
      maxrange = 10000;
      minrange = 1000;
      check = "艾戒";
      search = true;
    } else if (msg.content === "苦行") {
      item = "苦行";
      maxrange = 10000;
      minrange = 1000;
      check = "苦行";
      search = true;
    } else if (msg.content === "苦痛") {
      item = "苦痛";
      maxrange = 15000;
      minrange = 1000;
      check = "苦痛";
      search = true;
    } else if (msg.content === "巨大的恐怖") {
      item = "巨大的恐怖";
      maxrange = 15000;
      minrange = 1000;
      check = "巨大的恐怖";
      search = true;
    } else if (msg.content === "精靈墜飾") {
      item = "精靈墜飾";
      maxrange = 10000;
      minrange = 1000;
      check = "精靈墜飾";
      search = true;

    } else if (msg.content === "眼球") {
      item = "眼球";
      maxrange = 15000;
      minrange = 1000;
      check = "眼球";
      search = true;
    } else if (msg.content === "小筱") {
      item = "小筱";
      maxrange = 8000;
      minrange = 1000;
      check = "小筱";
      search = true;
    } else if (msg.content === "MX131") {
      item = "MX131";
      maxrange = 5000;
      minrange = 1000;
      check = "MX131";
      search = true;
    } else if (msg.content === "黑翼") {
      item = "黑翼";
      maxrange = 7000;
      minrange = 1000;
      check = "黑翼";
      search = true;
    } else if (msg.content === "乾淨死神") {
      item = "乾淨死神";
      maxrange = 2000;
      minrange = 100;
      check = "乾淨死神";
      search = true;
    } else if (msg.content === "內面耀光") {
      item = "內面耀光";
      maxrange = 4000;
      minrange = 500;
      check = "內面耀光";
      search = true;
    } else if (msg.content === "雙總魔") {
      item = "雙總魔";
      maxrange = 10000;
      minrange = 4500;
      check = "雙總魔";
      search = true;
    } else if (msg.content === "雙終魔") {
      item = "雙終魔";
      maxrange = 10000;
      minrange = 4500;
      check = "雙終魔";
      search = true;
    } else if (msg.content === "雙總物") {
      item = "雙總物";
      maxrange = 23000;
      minrange = 8500;
      check = "雙總物";
      search = true;
    } else if (msg.content === "雙終物") {
      item = "雙終物";
      maxrange = 23000;
      minrange = 8500;
      check = "雙終物";
      search = true;
    } else if (msg.content === "三加持") {
      item = "三加持";
      maxrange = 19000;
      minrange = 2500;
      check = "三加持";
      search = true;
    } else if (msg.content === "雙終") {
      item = "雙終";
      maxrange = 3000;
      minrange = 1000;
      check = "雙終";
      search = true;
    } else if (msg.content === "雙總") {
      item = "雙總";
      maxrange = 3000;
      minrange = 1000;
      check = "雙總";
      search = true;
    } else if (msg.content === "三總") {
      item = "三總";
      maxrange = 200000;
      minrange = 70000;
      check = "三總";
      search = true;
    } else if (msg.content === "三終") {
      item = "三終";
      maxrange = 200000;
      minrange = 70000;
      check = "三終";
      search = true;
    } else if (msg.content === "女武神") {
      item = "女武神";
      maxrange = 5000;
      minrange = 2500;
      check = "女武神";
      search = true;
    } else if (msg.content === "md") {
      item = "md";
      maxrange = 25000;
      minrange = 14000;
      check = "md";
      search = true;
    } else if (msg.content === "p寵") {
      item = "p寵";
      maxrange = 8000;
      minrange = 2000;
      check = "p寵";
      search = true;
    } else if (msg.content === "露耳") {
      item = "露耳";
      maxrange = 3000;
      minrange = 300;
      check = "露耳";
      search = true;
    } else if (msg.content === "20星") {
      item = "20星";
      maxrange = 5500;
      minrange = 2000;
      check = "20星";
      search = true;
    } else if (msg.content === "19星") {
      item = "19星";
      maxrange = 2000;
      minrange = 800;
      check = "19星";
      search = true;
    } else if (msg.content === "追加100") {
      item = "追加100";
      maxrange = 4000;
      minrange = 1800;
      check = "追加100";
      search = true;
    } else if (msg.content === "追加50") {
      item = "追加50";
      maxrange = 2000;
      minrange = 500;
      check = "追加50";
      search = true;
    } else if (msg.content === "追加30") {
      item = "追加30";
      maxrange = 1500;
      minrange = 200;
      check = "追加30";
      search = true;
    } else if (msg.content === "口紅") {
      item = "口紅";
      maxrange = 6000;
      minrange = 2000;
      check = "口紅";
      search = true;
    } else if (msg.content === "眼罩") {
      item = "眼罩";
      maxrange = 6000;
      minrange = 2000;
      check = "眼罩";
      search = true;
    } else if (msg.content === "魔導書") {
      item = "魔導書";
      maxrange = 6000;
      minrange = 2000;
      check = "魔導書";
      search = true;
    } else if (msg.content === "音樂蔥") {
      item = "音樂蔥";
      maxrange = 7000;
      minrange = 2000;
      check = "音樂蔥";
      search = true;
    } else if (msg.content === "幽暗") {
      item = "幽暗";
      maxrange = 8000;
      minrange = 1000;
      check = "幽暗";
      search = true;
    } else if (msg.content === "白槌") {
      item = "白槌";
      maxrange = 130;
      minrange = 40;
      check = "白槌";
      search = true;
    } else if (msg.content === "影子刀") {
      item = "影子刀";
      maxrange = 16000;
      minrange = 2000;
      check = "影子刀";
      search = true;
    } else if (msg.content === "血刀") {
      item = "血刀";
      maxrange = 19000;
      minrange = 5000;
      check = "血刀";
      search = true;
    } else if (msg.content === "紅武士之刃") {
      item = "紅武士之刃";
      maxrange = 5000;
      minrange = 1000;
      check = "紅武士之刃";
      search = true;
    } else if (msg.content === "懸賞葫蘆") {
      item = "懸賞葫蘆";
      maxrange = 1000;
      minrange = 300;
      check = "懸賞葫蘆";
      search = true;
    } else if (msg.content === "30%滅龍") {
      item = "30%滅龍";
      maxrange = 8000;
      minrange = 4000;
      check = "30%滅龍";
      search = true;
    } else if (msg.content === "33%滅龍") {
      item = "33%滅龍";
      maxrange = 8000;
      minrange = 4500;
      check = "33%滅龍";
      search = true;
    } else if (msg.content === "36%滅龍") {
      item = "36%滅龍";
      maxrange = 9000;
      minrange = 5000;
      check = "36%滅龍";
      search = true;
    } else if (msg.content === "39%滅龍") {
      item = "39%滅龍";
      maxrange = 14000;
      minrange = 6800;
      check = "39%滅龍";
      search = true;
    } else if (msg.content === "33%口紅") {
      item = "33%口紅";
      maxrange = 10000;
      minrange = 4000;
      check = "33%口紅";
      search = true;
    } else if (msg.content === "36%口紅") {
      item = "36%口紅";
      maxrange = 12000;
      minrange = 5000;
      check = "36%口紅";
      search = true;
    } else if (msg.content === "39%口紅") {
      item = "39%口紅";
      maxrange = 14000;
      minrange = 6000;
      check = "39%口紅";
      search = true;
    } else if (msg.content === "33%眼罩") {
      item = "33%眼罩";
      maxrange = 10000;
      minrange = 4000;
      check = "33%眼罩";
      search = true;
    } else if (msg.content === "36%眼罩") {
      item = "36%眼罩";
      maxrange = 12000;
      minrange = 5000;
      check = "36%眼罩";
      search = true;
    } else if (msg.content === "39%眼罩") {
      item = "39%眼罩";
      maxrange = 14000;
      minrange = 6000;
      check = "39%眼罩";
      search = true;
    } else if (msg.content === "36%頂培") {
      item = "36%頂培";
      maxrange = 6000;
      minrange = 2000;
      check = "36%頂培";
      search = true;
    } else if (msg.content === "33%頂培") {
      item = "33%頂培";
      maxrange = 3000;
      minrange = 500;
      check = "33%頂培";
      search = true;
    } else if (msg.content === "30%頂培") {
      item = "30%頂培";
      maxrange = 3000;
      minrange = 500;
      check = "30%頂培";
      search = true;
    } else if (msg.content === "39%大魔") {
      item = "39%大魔";
      maxrange = 8000;
      minrange = 3000;
      check = "39%大魔";
      search = true;
    } else if (msg.content === "36%大魔") {
      item = "36%大魔";
      maxrange = 6000;
      minrange = 1500;
      check = "36%大魔";
      search = true;
    } else if (msg.content === "33%大魔") {
      item = "33%大魔";
      maxrange = 2000;
      minrange = 500;
      check = "33%大魔";
      search = true;
    } else if (msg.content === "33%小魔") {
      item = "33%小魔";
      maxrange = 2000;
      minrange = 500;
      check = "33%小魔";
      search = true;
    } else if (msg.content === "36%小魔") {
      item = "36%小魔";
      maxrange = 4000;
      minrange = 1000;
      check = "36%小魔";
      search = true;
    } else if (msg.content === "39%小魔") {
      item = "39%小魔";
      maxrange = 6000;
      minrange = 1500;
      check = "39%小魔";
      search = true;
    } else if (msg.content === "覺醒刀片") {
      item = "覺醒刀片";
      maxrange = 30000;
      minrange = 10000;
      check = "覺醒刀片";
      search = true;
    } else if (msg.content === "36%女武神") {
      item = "36%女武神";
      maxrange = 12000;
      minrange = 4000;
      check = "36%女武神";
      search = true;
    } else if (msg.content === "33%女武神") {
      item = "33%女武神";
      maxrange = 7000;
      minrange = 3000;
      check = "33%女武神";
      search = true;
    } else if (msg.content === "30%女武神") {
      item = "30%女武神";
      maxrange = 5000;
      minrange = 3000;
      check = "30%女武神";
      search = true;
    } else if (msg.content === "三爆") {
      item = "三爆";
      maxrange = 40000;
      minrange = 10000;
      check = "三爆";
      search = true;
    } else if (msg.content === "傳說100%") {
      item = "傳說100%";
      maxrange = 1800;
      minrange = 300;
      check = "傳說100%";
      search = true;
    } else if (msg.content === "傳說50%") {
      item = "傳說50%";
      maxrange = 1000;
      minrange = 300;
      check = "傳說50%";
      search = true;
    } else if (msg.content === "HD傳說") {
      item = "HD傳說";
      maxrange = 600;
      minrange = 50;
      check = "HD傳說";
      search = true;
    } else if (msg.content === "30%天上") {
      item = "30%天上";
      maxrange = 8000;
      minrange = 4000;
      check = "30%天上";
      search = true;
    } else if (msg.content === "33%天上") {
      item = "33%天上";
      maxrange = 11000;
      minrange = 5000;
      check = "33%天上";
      search = true;
    } else if (msg.content === "36%天上") {
      item = "36%天上";
      maxrange = 15000;
      minrange = 6000;
      check = "36%天上";
      search = true;
    } else if (msg.content === "17星") {
      item = "17星";
      maxrange = 1000;
      minrange = 100;
      check = "17星";
      search = true;
    } else if (msg.content === "16星") {
      item = "16星";
      maxrange = 1000;
      minrange = 100;
      check = "16星";
      search = true;
    } else if (msg.content === "15星") {
      item = "15星";
      maxrange = 1000;
      minrange = 20;
      check = "15星";
      search = true;
    } else if (msg.content.includes("!!(") && msg.content.includes("物品名稱") === false) {
      msg.content = msg.content.replace("!!", "");
      msg.content = msg.content.replace("(", "");
      msg.content = msg.content.replace(")", "");
      let spl = msg.content.split(",")
      maxrange = parseInt(spl[1]);
      minrange = parseInt(spl[2]);
      item = spl[0];
      check = spl[0];
      msg.content = check;
      search = true;
      if (maxrange < minrange) {
        msg.reply("wrong format");
        msg.reply("!!(物品名稱,最大金額,最小金額)");
        search = false;
      }
      if (Number.isInteger(maxrange) != true || Number.isInteger(minrange) != true) {
        msg.reply("wrong format");
        msg.reply("!!(物品名稱,最大金額,最小金額)");
        search = false;
      }
      if (spl.length != 3) {
        msg.reply("wrong format");
        msg.reply("!!(物品名稱,最大金額,最小金額)");
        search = false;
      }
    } else {
      search = false;
    }
    if (msging == false) {
      msg.content = "";
      search = false;
      // msg.reply("bot searching other stuff");
    }
    if (msg.content === "mute my self") {
      msging = false;
      msg.content = "";
      search = false;

    }
    if (msg.content === "not mute my self") {
      msging = true;
      console.log("not mute my self")
    }

    if (msg.content === check && search == true && msg.content.length <= 30 && msging == true) {
      let labels = [];
      let data = {};
      let config = {};
      let temp = [];
      let temp_t = [];
      let output = "";
      msging = false;
      msg.reply("wait for it 搜尋中稍等 (請勿連續輸入，快速連續輸入會導致輸出錯誤)");
      msg.reply("mute my self");
      // start of the program
      msging = false;
      result = "";


      await tyt(item, maxrange, minrange);
      output += return_result();
      var mapAsc = new Map(
        Array
          .from(map)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )
      let map_temp1 = new Map();
      let map_temp2 = new Map();
      for (const [key, value] of mapAsc.entries()) {
        map_temp1.set(key, value);
        map_temp2.set(key, 0);
      }
      reset();
      await fyi(item, maxrange, minrange);
      output = "\r\n--成交價--\r\n" + return_result() + "\r\n\r\n--未成交價--\r\n" + output;

      var mapSale = new Map(
        Array
          .from(map)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )

      for (const [key, value] of mapSale.entries()) {
        if (!map_temp1.has(key)) map_temp1.set(key, 0);
        map_temp2.set(key, value);
      }
      var mapAsc_temp = new Map(
        Array
          .from(map_temp1)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )
      var mapSale_temp = new Map(
        Array
          .from(map_temp2)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )
      console.log("--------------------------------------------\n")
      console.log(mapAsc_temp)
      console.log(mapSale_temp)
      for (const [key, value] of mapAsc_temp.entries()) {
        labels.push(key);
        let iop = parseInt(value);
        temp.push(iop);
      }
      for (const [key, value] of mapSale_temp.entries()) {
        let iop = parseInt(value);
        temp_t.push(iop);
      }


      array.length = 0
      msging = true;
      await msg.reply(output)

      const chart = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: "未成交" + item,
            data: temp
          }, {
            label: "成交" + item,
            data: temp_t
          }]
        }
      }
      const encodedChart = encodeURIComponent(JSON.stringify(chart));
      const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
      console.log(chartUrl);
      const chartEmbed = {
        title: 'Latest Chart',
        description: '價格走線圖示',
        image: {
          url: chartUrl,
        },
      };

      TinyURL.shorten(chartUrl, function(res, err) {
        if (err)
          console.log(err)
        console.log(res);
        msg.channel.send(res);
      });
      await msg.channel.send({ embed: chartEmbed });
      //await msg.reply(chartUrl)


      if (count === 0) {
        await msg.reply("no result")
        msging = true;
      }


    }

    if (msg.content === "幣值" && msging === true) {
      msg.reply("wait for it 搜尋中稍等");
      msg.reply("mute my self");
      result = "";
      while (bool) {
        msging = false;
        await sleep(200);
        URL = "https://www.8591.com.tw/mallList-list.html?searchGame=859&searchType=0&searchKey=&firstRow=" + section;
        console.log(URL);
        const _constdata = await getRawData(URL);
        let data = _constdata;
        for (let i = 0; i < 26; i++) {
          if (data.includes("我收購的商品")) {
            let index_bottom = data.search("我收購的商品");
            data = data.substr(index_bottom + 1);
          }
          let index_bottom = data.search("元【1");
          data = data.substr(index_bottom - 15);
          index_bottom = data.search("\"") + 1;
          data = data.substr(index_bottom);
          let index_top = 0;
          index_bottom = data.search("】");
          let temp = data.substr(index_top, index_bottom - index_top + 1);
          //console.log(temp);
          if (temp != "") array.push(temp);
          if (temp == "") blank++
          data = data.substr(50);
        }
        if (blank < 20) {
          section += 20;
          blank = 0;
        };
        if (blank >= 20) bool = false;
        if (section > 1000) bool = false;
      }
      console.log(array)
      let arr = [];

      // console.log(temp)
      for (let i = 0; i < array.length; i++) {
        let id = array[i].search(":");
        let id_bottom = array[i].search("萬】");
        let temp = array[i].substr(id + 1, id_bottom - id - 1)
        let int = parseInt(temp);
        int = Math.round(int)
        arr.push(int)
      }
      arr.sort(compareDecimals);
      arr.reverse();
      console.log(arr)
      result += "最高可能價格:\n";
      for (var i = 0; i < 10; i++) {
        if (arr[i] <= 400000) result += "1:" + arr[i] + "萬\n";
      }
      msging = true;
      await msg.reply(result);
      array.length = 0
      arr.length = 0
    }


    if (msg.content === "help") {
      msg.reply("wait for it 請使用下列指令才會有回復");
      result = "";
      result = input;
      msg.channel.send("---------------------------");
      msg.reply("機器人問題輸入  作者資訊");
      msg.channel.send("---------------------------");
      msg.reply("指令沒有的請打  !!(物品名稱,最大金額,最小金額) ");
      msg.channel.send("---------------------------");
      msg.channel.send("以下查詢歷史價格 可查詢物件有限");
      msg.channel.send("可查詢物件:" + dblist);
      msg.channel.send("查詢歷史價格  history(物件,yy,mm,dd,yy,mm,dd) ");
      msg.channel.send("查詢歷史成交價格圖表  hischart(物件,yy,mm,dd,yy,mm,dd) ");
      msg.channel.send("查詢歷史未成交價格圖表  currentchart(物件,yy,mm,dd,yy,mm,dd) ");
      msg.channel.send("---------------------------");
      msg.reply("以下指令直接輸入即可不用加符號，一次只能查一個")
      msg.channel.send(result);
      msg.channel.send("---------------------------");
      msg.channel.send("有任何問題可以到巴哈留言");
      msg.channel.send("https://forum.gamer.com.tw/C.php?bsn=7650&snA=1018172&tnum=2");
      msg.channel.send("---------------------------");
      msg.channel.send("機器人當掉輸入 !logout");
      msg.channel.send("---------------------------");

      msg.channel.send("相關事宜輸入 免責聲明");


      result = "";

    }
    if (msg.content === "作者資訊") {


      msg.reply("巴哈 https://forum.gamer.com.tw/C.php?bsn=7650&snA=1018172&page=1&gothis=6379363#6379363");
      msg.channel.send("Discord Loordb#9562");
      msg.channel.send("Github/replit https://github.com/yuchinchenTW");
      msg.channel.send("楓之谷ID 艾麗雅:無叉叉無雙");



    }


    if (msg.content === "免責聲明") {


      msg.reply("他的免責聲明實在太長我刪掉了，想看的人去原作者伺服器看:)\n");


    }
    if (msg.content === "查詢網站") {
      msg.reply("wait for it");
      result = "";
      result = "注意!此網站建議跨vpn至日本執行\n勿多開該網站\n先安裝插鍵\n https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai\n   在進入https://bothtml.yuchinchentw.repl.co/ \n\n使用完畢請把插鍵關閉或者移除\n 忘記移除或關閉者後果自負"

      await msg.reply(result)
    }


    if (msg.content === "美好") {

      msg.reply("wait for it");

      // start of the program
      result = "";
      result = "查無此人";
      await msg.reply(result)


    }

    if (msg.content === "test") {
      //for testing
      msg.reply("wait for it");
      //let server = msg.guild.id;
      //console.log(server)
      client.guilds.cache.get(server).leave()
        .catch(err => {
          console.log(`there was an error leaving the guild: \n ${err.message}`);
        })



      // With async function



    }
    if (msg.content === "test2") {

      const canvasRenderService = new ChartJSNodeCanvas({
        width: 800, height: 600, chartCallback: (ChartJS) => {
          /** Add plugins here **/
          //ChartJS.global.defaultFontFamily = 'VTKS UNAMOUR';
          ChartJS.register(require('chartjs-plugin-datalabels'))
        }
      });
      canvasRenderService.registerFont('./fonts/NotoSansTC-Black.otf', { family: 'Montserrat', weight: '900' })

      let dates = [3.1, 7.2, 5, 6, 4];
      let cases = [1, 2, 6, 4, 7];
      let recovered = [3, 4, 0, 21, 1];

      const configuration = {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "測試",
              data: cases,
              backgroundColor: "rgba(255, 0, 0, 0.3)",
              borderColor: "rgba(255, 0, 0, 0.3)",
              borderWidth: 5,
              fill: true,
              pointRadius: 1
            },

            {
              label: "Recoveries",
              data: recovered,
              backgroundColor: "rgba(128, 173, 219, 0.3)",
              borderColor: "rgba(128, 173, 219, 0.3)",
              borderWidth: 5,
              fill: true,
              pointRadius: 1
            }
          ]
        },
        options: {
          legend: {
            position: "bottom",
            labels: {
              fontColor: "rgb(255, 255, 255,1)",
              fontSize: 5,

            }
          },
          scales: {
            xAxes: {
              grid: {
                display: false
              },
              ticks: {
                fontColor: "rgba(255, 255, 255, 1"
              }
            },
            yAxes: {
              grid: {
                lineWidth: 5,
                color: "rgba(255, 255, 255, 0.8)"
              },
              ticks: {
                fontColor: "rgba(255, 255, 255, 1"
              }
            }
          }

        }
      };
      const image = await canvasRenderService.renderToBuffer(configuration);

      let embed = new Discord.MessageEmbed();
      const attachment = new Discord.MessageAttachment(image, "image.png");
      embed.attachFiles(attachment);
      embed.setImage("attachment://image.png");
      msg.channel.send(embed);
    }










    if (msg.content.includes("history(") && msging === true && !msg.content.includes("錯誤") && msg.content.indexOf("h") == 0) {
      msg.reply("wait for it 搜尋中稍等");

      let endindex = msg.content.indexOf(")");
      let sub = msg.content.substring(8, endindex);
      console.log(sub)
      let spli = sub.split(',');
      if (spli.length != 7) {
        msg.reply("錯誤格式 history(物件,yy,mm,dd,yy,mm,dd)");
        return;
      }
      if (spli[0].length >= 6) {
        msg.reply("錯誤查詢物件輸入");
        return;
      }
      if (parseInt(spli[1]) < 2021) {
        msg.reply("起始必須大於2021年");
        return;
      }
      if (parseInt(spli[2]) > 12 || parseInt(spli[2]) < 1) {
        msg.reply("起始月份<=12&&>=1");
        return;
      }
      if (parseInt(spli[3]) > 31 || parseInt(spli[3]) < 1) {
        msg.reply("起始日<=31&&>=1");
        return;
      }
      if (parseInt(spli[4]) < 2021) {
        msg.reply("結束必須大於2021年");
        return;
      }
      if (parseInt(spli[5]) > 12 || parseInt(spli[5]) < 1) {
        msg.reply("結束月份<=12&&>=1");
        return;
      }

      if (parseInt(spli[6]) > 31 || parseInt(spli[6]) < 1) {

        msg.reply("結束日<=31&&>=1");
        return;
      }
      if (parseInt(spli[1]) > parseInt(spli[4])) {
        msg.reply("起始年份不可大於結束年分")
      }
      msg.reply("mute my self");
      await db_search(spli[0], spli[1], spli[2], spli[3], spli[4], spli[5], spli[6]);
      msging = true;


    }
    if (msg.content.includes("hischart(") && msging === true && !msg.content.includes("錯誤") && msg.content.indexOf("h") == 0) {
      msg.reply("wait for it 搜尋中稍等");

      let endindex = msg.content.indexOf(")");
      let sub = msg.content.substring(9, endindex);
      console.log(sub)
      let spli = sub.split(',');
      if (spli.length != 7) {
        msg.reply("錯誤格式 hischart(物件,yy,mm,dd,yy,mm,dd)");
        return;
      }
      if (spli[0].length >= 6) {
        msg.reply("錯誤查詢物件輸入");
        return;
      }
      if (parseInt(spli[1]) < 2021) {
        msg.reply("起始必須大於2021年");
        return;
      }
      if (parseInt(spli[2]) > 12 || parseInt(spli[2]) < 1) {
        msg.reply("起始月份<=12&&>=1");
        return;
      }
      if (parseInt(spli[3]) > 31 || parseInt(spli[3]) < 1) {
        msg.reply("起始日<=31&&>=1");
        return;
      }
      if (parseInt(spli[4]) < 2021) {
        msg.reply("結束必須大於2021年");
        return;
      }
      if (parseInt(spli[5]) > 12 || parseInt(spli[5]) < 1) {
        msg.reply("結束月份<=12&&>=1");
        return;
      }

      if (parseInt(spli[6]) > 31 || parseInt(spli[6]) < 1) {

        msg.reply("結束日<=31&&>=1");
        return;
      }
      if (parseInt(spli[1]) > parseInt(spli[4])) {
        msg.reply("起始年份不可大於結束年分")
      }
      msg.reply("mute my self");
      await chart_search(spli[0], spli[1], spli[2], spli[3], spli[4], spli[5], spli[6]);
      msging = true;


    }


    if (msg.content.includes("currentchart(") && msging === true && !msg.content.includes("錯誤") && msg.content.indexOf("c") == 0) {
      msg.reply("wait for it 搜尋中稍等");

      let endindex = msg.content.indexOf(")");
      let sub = msg.content.substring(13, endindex);
      console.log(sub)
      let spli = sub.split(',');
      if (spli.length != 7) {
        msg.reply("錯誤格式 currentchart(物件,yy,mm,dd,yy,mm,dd)");
        return;
      }
      if (spli[0].length >= 6) {
        msg.reply("錯誤查詢物件輸入");
        return;
      }
      if (parseInt(spli[1]) < 2021) {
        msg.reply("起始必須大於2021年");
        return;
      }
      if (parseInt(spli[2]) > 12 || parseInt(spli[2]) < 1) {
        msg.reply("起始月份<=12&&>=1");
        return;
      }
      if (parseInt(spli[3]) > 31 || parseInt(spli[3]) < 1) {
        msg.reply("起始日<=31&&>=1");
        return;
      }
      if (parseInt(spli[4]) < 2021) {
        msg.reply("結束必須大於2021年");
        return;
      }
      if (parseInt(spli[5]) > 12 || parseInt(spli[5]) < 1) {
        msg.reply("結束月份<=12&&>=1");
        return;
      }

      if (parseInt(spli[6]) > 31 || parseInt(spli[6]) < 1) {

        msg.reply("結束日<=31&&>=1");
        return;
      }
      if (parseInt(spli[1]) > parseInt(spli[4])) {
        msg.reply("起始年份不可大於結束年分")
      }
      msg.reply("mute my self");
      await current_chart_search(spli[0], spli[1], spli[2], spli[3], spli[4], spli[5], spli[6]);
      msging = true;


    }



    if (msg.content === '!logout' && msg.content.indexOf("l") == 1) {
      //process.exit(1);
      msg.channel.send('Resetting...')
        .then(msg => client.destroy())

        .then(function() {
          process.exit(1);
          return client.login(token)
        });


    }

    async function drawchart(obj, dates, best, avg, deal) {
      const canvasRenderService = new ChartJSNodeCanvas({
        width: 800, height: 600, chartCallback: (ChartJS) => {
          /** Add plugins here **/
          //ChartJS.global.defaultFontFamily = 'VTKS UNAMOUR';
          ChartJS.register(require('chartjs-plugin-datalabels'))
        }
      });
      canvasRenderService.registerFont('./fonts/NotoSansTC-Black.otf', { family: 'Montserrat', weight: '900' })

      console.log(dates)
      console.log(best)
      console.log(avg)
      let str_best = "";
      let str_avg = "";
      if (deal == true) {
        str_best = "歷史平均最佳成交價格";
        str_avg = "歷史平均成交價格";
      } else if (deal == false) {
        str_best = "歷史平均最佳未成交價格";
        str_avg = "歷史平均未成交價格";

      }
      const configuration = {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: obj + str_best,
              data: best,
              //backgroundColor: "rgba(238, 238, 87, 0.3)",
              borderColor: "rgba(238, 238,87, 0.3)",
              borderWidth: 5,
              fill: true,
              pointRadius: 1
            },

            {
              label: obj + str_avg,
              data: avg,
              // backgroundColor: "rgba(128, 173, 219, 0.3)",
              borderColor: "rgba(128, 173, 219, 0.3)",
              borderWidth: 5,
              fill: true,
              pointRadius: 1
            }
          ]
        },
        options: {

          scales: {
            xAxes: {
              grid: {
                display: false
              },
              ticks: {
                color: "green",
                font: {
                  size: 12,
                  family: 'vazir'
                }
              }

            },
            yAxes: {
              grid: {
                lineWidth: 1,
                color: "rgba(255, 255, 255, 0.8)"
              },
              ticks: {
                color: "green",
                font: {
                  size: 16,
                  family: 'vazir'
                }
              }
            }
          },
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'left',
              formatter: Math.round,
              color: "red",
              font: {

                weight: 'bold'
              }
            },
            legend: {
              labels: {
                color: "green",  // not 'fontColor:' anymore
                // fontSize: 18  // not 'fontSize:' anymore
                font: {
                  size: 20 // 'size' now within object 'font {}'
                }
              }
            }
          }

        }
      };
      const image = await canvasRenderService.renderToBuffer(configuration);

      let embed = new Discord.MessageEmbed();
      const attachment = new Discord.MessageAttachment(image, "image.png");
      embed.attachFiles(attachment);
      embed.setImage("attachment://image.png");
      msg.channel.send(embed);
    }


    async function db_search(obj, st_year, st_month, st_day, fin_year, fin_month, fin_day) {

      //if (obj.length >= 6) return
      var con = await mysql.createConnection({
        host: host,
        user: usr,
        password: mySecret,
        database: db
      });

      await con.connect(function(err) {
        if (err) {
          console.log(err)
          return
        }
        console.log("Connected to database!");
      });
      let quer = "SELECT CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime`,`objName`,`avgprize`,`bestprize`,`url` FROM `prizes` WHERE `objName`  ='" + obj + "' " + "AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " " + "00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + "  " + " 23:59:59'";
      console.log(quer)
      //SELECT * FROM `prizes` WHERE `objName`='幽暗' AND `currentTime` BETWEEN '2021-10-21 00:00:00' AND '2021-10-22 23:59:59'
      //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
      //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"
      let re = "empty";
      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)
        for (let i = 0; i < words.length; i++) {
          msg.channel.send(words[i])
        }
      })
      await con.end();
      await console.log("connection done");
      return re;
    }





    async function chart_search(obj, st_year, st_month, st_day, fin_year, fin_month, fin_day) {

      //if (obj.length >= 6) return
      var con = await mysql.createConnection({
        host: host,
        user: usr,
        password: mySecret,
        database: db
      });

      await con.connect(function(err) {
        if (err) {
          console.log(err)
          return
        }
        console.log("Connected to database!");
      });
      let quer = "";

      if (st_year === fin_year && st_month === fin_month) {
        quer = "SELECT AVG(`avgprize`) as avg, DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      if (st_year !== fin_year || st_month !== fin_month) {
        quer = "SELECT AVG(`avgprize`) as avg, MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      console.log(quer)
      //SELECT MONTH(`currentTime`), AVG(`avgprize`) FROM prizes WHERE `objName`='幽暗' GROUP BY MONTH(`currentTime`)
      //SELECT * FROM `prizes` WHERE `objName`='幽暗' AND `currentTime` BETWEEN '2021-10-21 00:00:00' AND '2021-10-22 23:59:59'
      //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
      //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"
      //SELECT `objName`,AVG(`avgprize`) as 'avgprice',AVG(`bestprize`) as 'avgprice'FROM `prizes` WHERE `objName`  ='幽暗' AND `currentTime` BETWEEN '2021-10-25 00:00:00' AND '2021-10-25   23:59:59'
      //SELECT AVG(`bestprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' GROUP BY DATE(`currentTime`)
      //SELECT AVG(`avgprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' AND `currentTime` BETWEEN '2021-10-23 00:00:00' AND '2021-10-24 23:59:59' GROUP BY DATE(`currentTime`)
      let re = "empty";
      let avg_price = [];
      let avg_time = [];
      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (words[i].includes("avg")) {
            avg_price.push(parseInt(words[i].substring(words[i].search("\":") + 2, words[i].search("\"date"))))
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_price)
          }
          if (words[i].includes("date")) {
            avg_time.push(words[i].substring(words[i].search("date") + 7, words[i].search("T")))
            //console.log( words[i].search("T"))
            if (words[i].search("T") < 0) {
              avg_time.pop();
              avg_time.push(words[i].substring(words[i].search("date") + 6, words[i].search("date") + 9))

            }
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_time)
          }
          // msg.channel.send(words[i])
        }
      })
      let best_price = [];
      let best_time = [];

      if (st_year === fin_year && st_month === fin_month) {
        quer = "SELECT AVG(`bestprize`) as avg, DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      if (st_year !== fin_year || st_month !== fin_month) {
        quer = "SELECT AVG(`bestprize`) as avg, MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      console.log(quer)

      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (words[i].includes("avg")) {
            best_price.push(parseInt(words[i].substring(words[i].search("\":") + 2, words[i].search("\"date"))))
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(best_price)
          }
          if (words[i].includes("date")) {
            best_time.push(words[i].substring(words[i].search("date") + 7, words[i].search("T")))
            if (words[i].search("T") < 0) {
              best_time.pop();
              best_time.push(words[i].substring(words[i].search("date") + 6, words[i].search("date") + 9))

            }
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(best_time)
          }
          // msg.channel.send(words[i])
        }
        await drawchart(obj, avg_time, best_price, avg_price, true)
      })

      //await drawchart(avg_time,best_price,avg_price)

      //await drawchart(avg_time,best_price,avg_price);




      await con.end();
      await console.log("connection done");
      return re;
    }



    async function current_chart_search(obj, st_year, st_month, st_day, fin_year, fin_month, fin_day) {

      //if (obj.length >= 6) return
      var con = await mysql.createConnection({
        host: host,
        user: usr,
        password: mySecret,
        database: db
      });

      await con.connect(function(err) {
        if (err) {
          console.log(err)
          return
        }
        console.log("Connected to database!");
      });
      let quer = "";

      if (st_year === fin_year && st_month === fin_month) {
        quer = "SELECT AVG(`avgprize`) as avg, DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `current_prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      if (st_year !== fin_year || st_month !== fin_month) {
        quer = "SELECT AVG(`avgprize`) as avg, MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `current_prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      console.log(quer)
      //SELECT MONTH(`currentTime`), AVG(`avgprize`) FROM prizes WHERE `objName`='幽暗' GROUP BY MONTH(`currentTime`)
      //SELECT * FROM `prizes` WHERE `objName`='幽暗' AND `currentTime` BETWEEN '2021-10-21 00:00:00' AND '2021-10-22 23:59:59'
      //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
      //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"
      //SELECT `objName`,AVG(`avgprize`) as 'avgprice',AVG(`bestprize`) as 'avgprice'FROM `prizes` WHERE `objName`  ='幽暗' AND `currentTime` BETWEEN '2021-10-25 00:00:00' AND '2021-10-25   23:59:59'
      //SELECT AVG(`bestprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' GROUP BY DATE(`currentTime`)
      //SELECT AVG(`avgprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' AND `currentTime` BETWEEN '2021-10-23 00:00:00' AND '2021-10-24 23:59:59' GROUP BY DATE(`currentTime`)
      let re = "empty";
      let avg_price = [];
      let avg_time = [];
      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (words[i].includes("avg")) {
            avg_price.push(parseInt(words[i].substring(words[i].search("\":") + 2, words[i].search("\"date"))))
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_price)
          }
          if (words[i].includes("date")) {
            avg_time.push(words[i].substring(words[i].search("date") + 7, words[i].search("T")))
            //console.log( words[i].search("T"))
            if (words[i].search("T") < 0) {
              avg_time.pop();
              avg_time.push(words[i].substring(words[i].search("date") + 6, words[i].search("date") + 9))

            }
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_time)
          }
          // msg.channel.send(words[i])
        }
      })
      let best_price = [];
      let best_time = [];

      if (st_year === fin_year && st_month === fin_month) {
        quer = "SELECT AVG(`bestprize`) as avg, DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `current_prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      if (st_year !== fin_year || st_month !== fin_month) {
        quer = "SELECT AVG(`bestprize`) as avg, MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `current_prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      console.log(quer)

      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (words[i].includes("avg")) {
            best_price.push(parseInt(words[i].substring(words[i].search("\":") + 2, words[i].search("\"date"))))
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(best_price)
          }
          if (words[i].includes("date")) {
            best_time.push(words[i].substring(words[i].search("date") + 7, words[i].search("T")))
            if (words[i].search("T") < 0) {
              best_time.pop();
              best_time.push(words[i].substring(words[i].search("date") + 6, words[i].search("date") + 9))

            }
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(best_time)
          }
          // msg.channel.send(words[i])
        }
        await drawchart(obj, avg_time, best_price, avg_price, false)
      })

      //await drawchart(avg_time,best_price,avg_price)

      //await drawchart(avg_time,best_price,avg_price);




      await con.end();
      await console.log("connection done");
      return re;
    }





  }
}

)

function compareDecimals(a, b) {
  if (a === b)
    return 0;

  return a < b ? -1 : 1;
}


////418076288625016834
//418076288625016832

client.on('guildMemberAdd', member => {
  //member.roles.add(member.guild.roles.cache.find(i => i.name === 'Among The Server'))

  const welcomeEmbed = new Discord.MessageEmbed()

  welcomeEmbed.setColor('#5cf000')
  welcomeEmbed.setTitle('歡迎 **' + member.user.username + '** 加入蒼蠅特攻隊 現在共有**' + member.guild.memberCount + '**個成員')
  welcomeEmbed.setImage('https://i.imgur.com/T0sf3Je.gif')
  const channel = member.guild.channels.cache.get('892298051388051459');
  if (!channel) return;

  channel.send(welcomeEmbed)
})

client.on('guildMemberRemove', member => {
  const goodbyeEmbed = new Discord.MessageEmbed()

  goodbyeEmbed.setColor('#f00000')
  goodbyeEmbed.setTitle('再見！**' + member.user.username + '**大家都會想你的 現在剩下**' + member.guild.memberCount + '**個成員')
  goodbyeEmbed.setImage('https://i.imgur.com/0ZDO5sq.gif')
  const channel = member.guild.channels.cache.get('892298051388051459');
  if (!channel) return;

  channel.send(goodbyeEmbed)

})

class Music {

  constructor() {
    /**
     * 下面的物件都是以 Discord guild id 當 key，例如：
     * this.isPlaying = {
     *     724145832802385970: false
     * }
     */

    /**
     * 機器人是否正在播放音樂
     * this.isPlaying = {
     *     724145832802385970: false
     * }
     */
    this.isPlaying = {};

    /**
     * 等待播放的音樂隊列，例如：
     * this.queue = {
     *     724145832802385970: [{
     *         name: 'G.E.M.鄧紫棋【好想好想你 Missing You】Official Music Video',
     *         url: 'https://www.youtube.com/watch?v=P6QXo88IG2c&ab_channel=GEM%E9%84%A7%E7%B4%AB%E6%A3%8B'
     *     }]
     * }
     */
    this.queue = {};

    // https://discord.js.org/#/docs/main/stable/class/VoiceConnection
    this.connection = {};

    // https://discord.js.org/#/docs/main/stable/class/StreamDispatcher
    this.dispatcher = {};
  }

  async join(msg) {

    // 如果使用者正在頻道中
    if (msg.member.voice.channel !== null) {
      // Bot 加入語音頻道
      this.connection[msg.guild.id] = await msg.member.voice.channel.join();
    } else {
      msg.channel.send('請先進入語音頻道');
    }

  }

  async play(msg) {

    // 語音群的 ID
    const guildID = msg.guild.id;

    // 如果 Bot 還沒加入該語音群的語音頻道
    if (!this.connection[guildID]) {
      msg.channel.send(`請先將機器人 ${prefix}join 加入頻道`);
      return;
    }

    // 如果 Bot leave 後又未加入語音頻道
    if (this.connection[guildID].status === 4) {
      msg.channel.send(`請先將機器人 ${prefix}join 重新加入頻道`);
      return;
    }

    // 處理字串，將 !!play 字串拿掉，只留下 YouTube 網址
    const musicURL = msg.content.replace(`${prefix}play`, '').trim();

    try {

      // 取得 YouTube 影片資訊
      const res = await ytdl.getInfo(musicURL);
      const info = res.videoDetails;

      // 將歌曲資訊加入隊列
      if (!this.queue[guildID]) {
        this.queue[guildID] = [];
      }

      this.queue[guildID].push({
        name: info.title,
        url: musicURL
      });

      // 如果目前正在播放歌曲就加入隊列，反之則播放歌曲
      if (this.isPlaying[guildID]) {
        msg.channel.send(`歌曲加入隊列：${info.title}`);
      } else {
        this.isPlaying[guildID] = true;
        this.playMusic(msg, guildID, this.queue[guildID][0]);
      }

    } catch (e) {
      console.log(e);
    }

  }

  playMusic(msg, guildID, musicInfo) {

    // 提示播放音樂
    msg.channel.send(`播放音樂：${musicInfo.name}`);

    // 播放音樂
    this.dispatcher[guildID] = this.connection[guildID].play(ytdl(musicInfo.url, { filter: 'audioonly' }));

    // 把音量降 50%，不然第一次容易被機器人的音量嚇到 QQ
    this.dispatcher[guildID].setVolume(0.5);

    // 移除 queue 中目前播放的歌曲
    this.queue[guildID].shift();

    // 歌曲播放結束時的事件
    this.dispatcher[guildID].on('finish', () => {

      // 如果隊列中有歌曲
      if (this.queue[guildID].length > 0) {
        this.playMusic(msg, guildID, this.queue[guildID][0]);
      } else {
        this.isPlaying[guildID] = false;
        msg.channel.send('目前沒有音樂了，請加入音樂 :D');
      }

    });

  }

  resume(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('恢復播放');

      // 恢復播放
      this.dispatcher[msg.guild.id].resume();
    }

  }

  pause(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('暫停播放');

      // 暫停播放
      this.dispatcher[msg.guild.id].pause();
    }

  }

  skip(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('跳過目前歌曲');

      // 跳過歌曲
      this.dispatcher[msg.guild.id].end();
    }

  }

  nowQueue(msg) {

    // 如果隊列中有歌曲就顯示
    if (this.queue[msg.guild.id] && this.queue[msg.guild.id].length > 0) {
      // 字串處理，將 Object 組成字串
      const queueString = this.queue[msg.guild.id].map((item, index) => `[${index + 1}] ${item.name}`).join();
      msg.channel.send(queueString);
    } else {
      msg.channel.send('目前隊列中沒有歌曲');
    }

  }

  leave(msg) {

    // 如果機器人在頻道中
    if (this.connection[msg.guild.id] && this.connection[msg.guild.id].status === 0) {

      // 如果機器人有播放過歌曲
      if (this.queue.hasOwnProperty(msg.guild.id)) {

        // 清空播放列表
        delete this.queue[msg.guild.id];

        // 改變 isPlaying 狀態為 false
        this.isPlaying[msg.guild.id] = false;
      }

      // 離開頻道
      this.connection[msg.guild.id].disconnect();
    } else {
      msg.channel.send('機器人未加入任何頻道');
    }

  }
}

const music = new Music();

// 當 Bot 接收到訊息時的事件
client.on('message', async (msg) => {

  // 如果發送訊息的地方不是語音群（可能是私人），就 return
  if (!msg.guild) return;

  // !!join
  if (msg.content === `${prefix}join`) {

    // 機器人加入語音頻道
    music.join(msg);
  }

  // 如果使用者輸入的內容中包含 !!play
  if (msg.content.indexOf(`${prefix}play`) > -1) {

    // 如果使用者在語音頻道中
    if (msg.member.voice.channel) {

      // 播放音樂
      await music.play(msg);
    } else {

      // 如果使用者不在任何一個語音頻道
      msg.reply('你必須先加入語音頻道');
    }
  }

  // !!resume
  if (msg.content === `${prefix}resume`) {

    // 恢復音樂
    music.resume(msg);
  }

  // !!pause
  if (msg.content === `${prefix}pause`) {

    // 暫停音樂
    music.pause(msg);
  }

  // !!skip
  if (msg.content === `${prefix}skip`) {

    // 跳過音樂
    music.skip(msg);
  }

  // !!queue
  if (msg.content === `${prefix}queue`) {

    // 查看隊列
    music.nowQueue(msg);
  }

  // !!leave
  if (msg.content === `${prefix}leave`) {

    // 機器人離開頻道
    music.leave(msg);
  }
});


client.login(token);

