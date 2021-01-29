// Was made by Pagas15
// My site - https://pagas15.github.io

let listArh = {
      "rebel": [17, 29, 41, 5, 53],
      "hero": [16, 28, 4, 40, 52],
      "caring": [10, 22, 34, 46, 58],
      "seeker": [14, 2, 26, 38, 50],
      "lover": [20, 32, 44, 56, 8],
      "mage": [18, 30, 42, 54, 6],
      "sage": [15, 27, 3, 39, 51],
      "ruler": [12, 24, 36, 48, 60],
      "ingenuous": [1, 13, 25, 37, 49],
      "gloriousSmall": [19, 31, 43, 55, 7],
      "creator": [11, 23, 35, 47, 59],
      "jester": [21, 33, 45, 57, 9]
    },
    // listArh = {
    //   "rebel": ['it6','it7','it8','it9','it10'],
    //   "hero": ['it6','it7','it8','it9','it10'],
    //   "caring": ['it6','it7','it8','it9','it10'],
    //   "seeker": ['it6','it7','it8','it9','it10'],
    //   "lover": ['it6','it7','it8','it9','it10'],
    //   "mage": ['it1','it2','it3','it4','it5'],
    //   "sage": ['it6','it7','it8','it9','it10'],
    //   "ruler": ['it6','it7','it8','it9','it10'],
    //   "ingenuous": ['it6','it7','it8','it9','it10'],
    //   "gloriousSmall": ['it6','it7','it8','it9','it10'],
    //   "creator": ['it6','it7','it8','it9','it10'],
    //   "jester": ['it6','it7','it8','it9','it10']
    // },
    nameArh = {
      "rebel": 'Бунтарь',
      "hero": 'Герой',
      "caring": 'Заботливый',
      "seeker": 'Искатель',
      "lover": 'Любовник',
      "mage": 'Маг',
      "sage": 'Мудрец',
      "ruler": 'Правитель',
      "ingenuous": 'Простодушный',
      "gloriousSmall": 'Славный Малый',
      "creator": 'Творец',
      "jester": 'Шут'
    },
    maxSum = 60;
const iterateOverTheArray = listName => {
  const sumSel = (itemList) => {
    let sum = 0;
    for (i=0; i < itemList.length; i++){
      sum += itemList[i]
    }
    return sum;
  };
  const givSum = (list) => {
    let lister = [];

    list.forEach(item => {
      $(`.t-input-group.t-input-group_rd[data-question-number='${item}']`)
    });
    // list.forEach(item => {
    //   lister.push(parseInt($('#' + item).text()))
    // })
    // console.log(sumSel(lister))
    return sumSel(lister)
  };
  const percentMax = (num, max) => {
    return num / (max / 100)
  };
  for (kay in listName){
    let howSum = givSum(listName[kay]);
    console.log(`Вы набрали ${howSum} из ${maxSum} и являетесь на ${percentMax(howSum, maxSum)}% ${nameArh[kay]}`)
  };
}

const init = () => {
  iterateOverTheArray(listArh)
};

init()
