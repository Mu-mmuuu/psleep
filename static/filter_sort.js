
const tabItem = document.querySelectorAll('.check');
const tabContent = document.querySelectorAll('.check-content');

for (let i = 0; i < tabItem.length; i++) {
    tabItem[i].addEventListener('click', changeTab);
}

function changeTab() {
    for (let i = 0; i < tabItem.length; i++) {
        tabItem[i].classList.remove('active');
    }
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
    }
    this.classList.add('active');

    const aryTabs = Array.prototype.slice.call(tabItem);
    const index = aryTabs.indexOf(this);

    tabContent[index].classList.add('show');
}
function clearall() {
    document.typefilter.reset();
    document.idolfilter.reset();
    goFilter();
}

function getAllFilterGroups(filters) {
    var result = [];
    var parts = Object.keys(filters);
    parts.forEach(function (part) {
        var itemGroups = Object.keys(filters[part]);
        result = result.concat(itemGroups);
    });
    return result;
}

function checkSelectedFilters(element, filters) {
    var checkElementPrefix = "chk";
    var itemCount = 0;
    var selected = {};
    // parts = ['part01','part02']
    var parts = Object.keys(filters);
    parts.forEach(function (part) {
        var itemGroups = Object.keys(filters[part]);
        // itemGroups = ['type','rarity','category','center','skill','interval']
        itemGroups.forEach(function (itemGroup) {
            // items = itemGroupsに対応する選択肢['physical','intelligence','mental']など
            var items = filters[part][itemGroup];
            var selectedItems = [];
            items.forEach(function (item) {
                var itemInput = $(element).find('#'+ checkElementPrefix + item);
                var checked = $(itemInput).prop('checked');
                if (checked){
                    selectedItems.push(item);
                    itemCount++;
                }
            });
            if (selectedItems.length > 0){
                selected[itemGroup] = selectedItems;
            }
        });
    });
    if (itemCount == 0) return false;
    return selected;
}

function goFilter(){

    var filters = {
        part01:{ //フォト情報
            type: ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"],
            good: ["berry","food","skill"],
            pokemonfood: ["egg","apple","herbs","meat","milk","honey","oil","ginger","tomato","cacao","soy"],
            pokemonskill: ["energys","energym","dreamget","yells","charges","alls","support","foods","cookings","random"],
        },
        part02:{ //セット
            unit: ["Jupiter","drasta","Altessimo","Beit","W","FRAME","sai","HighJoker","shinsoku","CafeParade","mofu","SEM","kogado","F-LAGS","Legenders","CFIRST"],
            idol: ['No_1','No_2','No_3','No_4','No_5','No_6','No_7','No_8','No_9','No_10','No_11','No_12','No_13','No_14','No_15','No_16','No_17','No_18','No_19','No_20','No_21','No_22','No_23','No_24','No_25','No_26','No_27','No_28','No_29','No_30','No_31','No_32','No_33','No_34','No_35','No_36','No_37','No_38','No_39','No_40','No_41','No_42','No_43','No_44','No_45','No_46','No_47','No_48','No_49']
        }
    };

    var wTable = ("#pokemonlist");
    var characterListTable = ('table.tablesorter');
    $(characterListTable).find("tr").removeClass(getAllFilterGroups(filters).concat(["last"]).join(" "));


    var selectedFilters = checkSelectedFilters(".filter-zone", filters);
    var selectedFilterItemGroups = filters && Object.keys(selectedFilters);
    if (selectedFilterItemGroups){
            var activeRowClass = selectedFilterItemGroups.map(function (itemGroup) {
                var itemGroupClass = "." + itemGroup;
                selectedFilters[itemGroup].forEach(function (item) {
                    $(characterListTable).find("tr." + item).addClass(itemGroup);
                });
                return itemGroupClass;
            }).join("");
            $(characterListTable).find("tr" + activeRowClass).addClass('last');
        }
    $(wTable).addClass('hidden result');
}
$(document).ready(function() 
    { 
        $(".tablesorter").tablesorter(); 
    } 
); 

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200){//上から200pxスクロールしたら
      $('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
      $('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
    }else{
      if($('#page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
        $('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
        $('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
      }
    }
  }
  
  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
  });
  
  // ページが読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function () {
    PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
  });
  
  // #page-topをクリックした際の設定
  $('#page-top a').click(function () {
      $('body,html').animate({
          scrollTop: 0//ページトップまでスクロール
      }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
      return false;//リンク自体の無効化
  });
  
