var options = {
  url: "https://saravanamani1999.github.io/api/moduleInfo.json",

  getValue: function (element) {
    return element.moduleCode;
    // + '|' + element.title;
  },

  adjustWidth: false,

  template: {
    type: "description",
    fields: {
      description: "title",
    },

    // type: "custom",
    // method: function (value, item) {
    // 	return value.substr(0, value.indexOf('|'));
    // }
  },

  list: {
    maxNumberOfElements: 10,
    match: {
      enabled: true,
    },
    showAnimation: {
      type: "slide", //normal|slide|fade
      time: 300,
      callback: function () {},
    },

    hideAnimation: {
      type: "slide", //normal|slide|fade
      time: 300,
      callback: function () {},
    },
    onClickEvent: function () {
      var module = $("#search-bar").getSelectedItemData().moduleCode;
      // location.href = "http://localhost:3000/modules/" + module;
      location.href = "https://nocap-reviews.herokuapp.com/modules/" + module;
    },
    onKeyEnterEvent: function () {
      var selected = $("#search-bar").getSelectedItemData().moduleCode;
      // location.href = "http://localhost:3000/modules/" + selected;
      location.href = "https://nocap-reviews.herokuapp.com/modules/" + selected;
    },
  },
  theme: "round",
};

$("#search-bar").easyAutocomplete(options);
